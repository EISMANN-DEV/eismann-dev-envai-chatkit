require('dotenv').config();
const express = require('express');
const OpenAI = require('openai');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

app.post('/api/chatkit/session', async (req, res) => {
  const session = await openai.beta.chatkit.sessions.create({
    workflow: { id: process.env.CHATKIT_WORKFLOW_ID },
    user: req.body.userId || 'anonymous'
  });
  
  res.json({ client_secret: session.client_secret });
});

app.listen(3000, () => console.log('Running on http://localhost:3000'));