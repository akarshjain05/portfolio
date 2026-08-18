import { GoogleGenAI } from '@google/genai';
import { profile, projects, skillGroups, socials, education } from '../src/data/portfolioData.js';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

// Simple in-memory rate limiting map
// Maps IP to { count: number, resetTime: number }
const rateLimitMap = new Map();

// 20 requests per hour per IP
const RATE_LIMIT = 20;
const RATE_LIMIT_WINDOW = 60 * 60 * 1000; 

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
  const now = Date.now();
  
  if (!rateLimitMap.has(ip)) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW });
  } else {
    const data = rateLimitMap.get(ip);
    if (now > data.resetTime) {
      // Reset window
      rateLimitMap.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW });
    } else {
      data.count++;
      if (data.count > RATE_LIMIT) {
        return res.status(429).json({ reply: "You're sending messages too fast! Please try again later." });
      }
    }
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
      model: 'gemini-1.5-flash',
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
