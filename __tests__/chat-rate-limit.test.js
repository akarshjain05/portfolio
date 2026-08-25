import { describe, it, expect, beforeEach, vi } from 'vitest';
import handler from '../api/chat.js';

vi.mock('@google/genai', () => ({
  GoogleGenAI: class {
    models = {
      generateContent: vi.fn().mockResolvedValue({
        text: 'mock response'
      })
    }
  }
}));

describe('Chat API Rate Limiting (Fallback Mode)', () => {
  beforeEach(() => {
    // We clear the fallback rate limit map for tests if we could, 
    // but it's internal to the module. We can use different IPs.
  });

  const mockReq = (ip) => ({
    method: 'POST',
    headers: { 'x-forwarded-for': ip },
    body: { message: 'hello' }
  });

  const mockRes = () => {
    const res = {};
    res.status = vi.fn().mockReturnValue(res);
    res.json = vi.fn().mockReturnValue(res);
    return res;
  };

  it('allows up to 5 requests per IP and blocks the 6th', async () => {
    // Must mock env key so we don't get 500 missing key error
    process.env.GEMINI_API_KEY = 'test';
    
    const ip = `192.168.1.${Math.floor(Math.random() * 1000)}`;
    
    // Send 5 successful requests
    for (let i = 0; i < 5; i++) {
      const req = mockReq(ip);
      const res = mockRes();
      await handler(req, res);
      // Wait, handler is written for Next.js / Vercel serverless.
      // 5 requests pass
      expect(res.status).not.toHaveBeenCalledWith(429);
    }
    
    // 6th should be blocked
    const req = mockReq(ip);
    const res = mockRes();
    await handler(req, res);
    
    expect(res.status).toHaveBeenCalledWith(429);
    expect(res.json).toHaveBeenCalledWith({ reply: "You're sending messages too fast! Please try again later." });
  });
});
