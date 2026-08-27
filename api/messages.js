let messages = [
  {
    id: 1,
    name: "System",
    email: "system@akarsh.local",
    subject: "Welcome to your inbox",
    message: "This is your local inbox. Messages sent from the contact form will appear here. Note: Since this is a serverless deployment without a database, messages are stored in memory and will reset when the server sleeps.",
    date: new Date().toISOString()
  }
];

export default function handler(req, res) {
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
    
    messages.unshift(newMessage); // add to top
    return res.status(200).json({ success: true });
  } else if (req.method === 'GET') {
    return res.status(200).json(messages);
  } else {
    return res.status(405).json({ error: 'Method not allowed' });
  }
}
