import { GoogleGenAI } from '@google/genai';
import { Redis } from '@upstash/redis';
import { profile, projects, skillGroups, socials, education } from '../src/data/portfolioData.js';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

// Vercel KV / Upstash Redis for persistent rate limiting
const redis = (process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN) 
  ? new Redis({
      url: process.env.KV_REST_API_URL,
      token: process.env.KV_REST_API_TOKEN,
    })
  : null;

// Fallback in-memory map (will leak/reset in serverless, but keeps app alive without KV)
const fallbackRateLimitMap = new Map();

// 5 requests per 24 hours per IP
const RATE_LIMIT = 5;
const RATE_LIMIT_WINDOW_SEC = 24 * 60 * 60; // 24 hours in seconds

const buildSystemPrompt = () => {
  const projectList = projects.map((p, i) => `${i + 1}. ${p.title} (${p.status}): ${p.description} Tech: ${p.tech.join(", ")}. (Live: ${p.live || p.github})`).join("\n");
  const skillsList = skillGroups.map(g => `- ${g.title}: ${g.skills.map(s => s.name).join(", ")}`).join("\n");
  const socialLinks = socials.map(s => `- ${s.name}: ${s.url}`).join("\n");
  const eduList = education.map(e => `- ${e.degree} at ${e.school} (${e.period}). ${e.notes}`).join("\n");

  return `You are ${profile.name}'s personal AI Copilot for his portfolio website.
${profile.bio}

Here are his main projects:
${projectList}

Key Skills:
${skillsList}

Education:
${eduList}

Contact & Links:
${socialLinks}

Keep your answers brief, friendly, and professional. Use markdown.
When asked about his tech stack, mention his backend/AI focus and point them to the skills.json tab.
Do not hallucinate facts not provided. If you don't know, say you don't know but mention they can contact him at ${socials.find(s => s.name === 'Email')?.url || 'his email'}.`;
};

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  // Rate Limiting Logic
  const ip = req.headers['x-forwarded-for'] || req.socket?.remoteAddress || 'unknown';
  let rateLimited = false;

  if (redis && ip !== 'unknown') {
    const key = `ratelimit:${ip}`;
    try {
      const current = await redis.incr(key);
      if (current === 1) {
        await redis.expire(key, RATE_LIMIT_WINDOW_SEC);
      }
      if (current > RATE_LIMIT) {
        rateLimited = true;
      }
    } catch (e) {
      console.error("Redis rate limit error:", e);
    }
  } else {
    // Fallback logic for local dev or missing KV
    const now = Date.now();
    const RATE_LIMIT_WINDOW_MS = RATE_LIMIT_WINDOW_SEC * 1000;
    
    if (fallbackRateLimitMap.size > 1000) fallbackRateLimitMap.clear(); // Leak prevention
    
    if (!fallbackRateLimitMap.has(ip)) {
      fallbackRateLimitMap.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW_MS });
    } else {
      const data = fallbackRateLimitMap.get(ip);
      if (now > data.resetTime) {
        fallbackRateLimitMap.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW_MS });
      } else {
        data.count++;
        if (data.count > RATE_LIMIT) rateLimited = true;
      }
    }
  }

  if (rateLimited) {
    return res.status(429).json({ reply: "You're sending messages too fast! Please try again later." });
  }

  try {
    const { message } = req.body;
    
    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }

    if (!process.env.GEMINI_API_KEY) {
      return res.status(500).json({ reply: "The API key hasn't been configured yet! The owner needs to add GEMINI_API_KEY to their Vercel dashboard." });
    }

    const response = await ai.models.generateContent({
      model: 'gemini-3.6-flash',
      contents: message,
      config: {
        systemInstruction: buildSystemPrompt(),
        temperature: 0.7,
      }
    });

    const reply = response.text || "Sorry, I couldn't process that.";
    
    res.status(200).json({ reply });
  } catch (error) {
    console.error("Gemini API Error:", error);
    
    // Check if it's an authentication/API key error
    if (error.status === 401 || error.message?.includes('API key not valid')) {
      return res.status(401).json({ reply: "My API key is invalid! Please check the GEMINI_API_KEY in the Vercel dashboard." });
    }
    
    // Otherwise return the general error message
    res.status(500).json({ reply: `Server Error: ${error.message}` });
  }
}
