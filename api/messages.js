import { Redis } from '@upstash/redis';

let memoryMessages = [
  {
    id: 1,
    name: "System",
    email: "system@akarsh.local",
    subject: "Welcome to your inbox",
    message: "This is your local inbox. Since no database is connected yet, messages are stored in memory and will reset. To make this permanent, connect Upstash Redis in Vercel!",
    date: new Date().toISOString()
  }
];

export default async function handler(req, res) {
  // Check if user has connected Upstash Redis in Vercel (or Vercel KV)
  const redisUrl = process.env.UPSTASH_REDIS_REST_URL || process.env.KV_REST_API_URL;
  const redisToken = process.env.UPSTASH_REDIS_REST_TOKEN || process.env.KV_REST_API_TOKEN;
  
  const hasRedis = !!redisUrl && !!redisToken;
  let redis;
  
  if (hasRedis) {
    redis = new Redis({
      url: redisUrl,
      token: redisToken,
    });
  }

  if (req.method === 'POST') {
    const { name, email, subject, message } = req.body;
    if (!name || !email || !message) {
      return res.status(400).json({ error: 'Missing required fields' });
    }
    
    const newMessage = {
      id: Date.now(),
      name,
      email,
      subject: subject || 'No Subject',
      message,
      date: new Date().toISOString()
    };
    
    if (hasRedis) {
      // Basic rate limiting: max 3 messages per hour per IP
      const ip = req.headers['x-forwarded-for'] || 'unknown';
      if (ip !== 'unknown') {
        const rlKey = `rate_limit:${ip}`;
        const requests = await redis.incr(rlKey);
        
        if (requests === 1) {
          await redis.expire(rlKey, 3600); // expire after 1 hour
        }
        
        if (requests > 3) {
          return res.status(429).json({ error: 'Rate limit exceeded. Please try again later.' });
        }
      }
      
      await redis.lpush('portfolio_messages', newMessage);
    } else {
      memoryMessages.unshift(newMessage);
    }
    
    return res.status(200).json({ success: true });
  } else if (req.method === 'GET') {
    if (hasRedis) {
      const dbMessages = await redis.lrange('portfolio_messages', 0, -1);
      return res.status(200).json(dbMessages || []);
    } else {
      return res.status(200).json(memoryMessages);
    }
  } else {
    return res.status(405).json({ error: 'Method not allowed' });
  }
}
