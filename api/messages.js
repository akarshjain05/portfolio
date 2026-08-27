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
  // Check if user has connected Upstash Redis in Vercel
  const hasRedis = !!process.env.UPSTASH_REDIS_REST_URL;
  let redis;
  
  if (hasRedis) {
    redis = new Redis({
      url: process.env.UPSTASH_REDIS_REST_URL,
      token: process.env.UPSTASH_REDIS_REST_TOKEN,
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
