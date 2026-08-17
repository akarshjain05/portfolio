import { Groq } from 'groq-sdk';

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY
});

// Simple in-memory rate limiting map
// Maps IP to { count: number, resetTime: number }
const rateLimitMap = new Map();

// 20 requests per hour per IP
const RATE_LIMIT = 20;
const RATE_LIMIT_WINDOW = 60 * 60 * 1000; 

// The system prompt injecting context
const SYSTEM_PROMPT = `You are Akarsh's personal AI Copilot for his portfolio website.
Akarsh is a Computer Science undergraduate at SVNIT Surat who builds robust systems.
He works at the intersection of backend engineering, applied AI, and competitive programming.
He specializes in taking systems all the way to production.
Keep your answers brief, friendly, and professional. Use markdown.
Do not hallucinate facts not provided. If you don't know, say you don't know but mention they can contact him.
`;

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

    if (!process.env.GROQ_API_KEY) {
      return res.status(500).json({ reply: "The API key hasn't been configured yet! The owner needs to add GROQ_API_KEY to their Vercel dashboard." });
    }

    const completion = await groq.chat.completions.create({
      messages: [
        { role: 'system', content: SYSTEM_PROMPT },
        { role: 'user', content: message }
      ],
      model: 'llama-3.3-70b-versatile', // Fast, reliable Groq model
      temperature: 0.7,
      max_tokens: 500,
    });

    const reply = completion.choices[0]?.message?.content || "Sorry, I couldn't process that.";
    
    res.status(200).json({ reply });
  } catch (error) {
    console.error("Groq API Error:", error);
    
    // Check if it's an authentication/API key error
    if (error.status === 401) {
      return res.status(401).json({ reply: "My API key is invalid! Please check the GROQ_API_KEY in the Vercel dashboard." });
    }
    
    // Otherwise return the general error message
    res.status(500).json({ reply: `Server Error: ${error.message}` });
  }
}
