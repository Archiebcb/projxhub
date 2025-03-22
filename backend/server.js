// server.js
require('dotenv').config();
const express = require('express');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 5004;

// For your XUMM environment (Mainnet or Testnet), place your API keys in .env if needed
// But strictly speaking, /me calls only need the user token from the client, so the XUMM SDK isn't mandatory here.

app.use(express.json());

// --- CORS Middleware ---
const allowedOrigin = 'http://localhost:3000'; // or your xApp's hosted domain
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', allowedOrigin);
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  next();
});
app.options('*', (req, res) => {
  res.header('Access-Control-Allow-Origin', allowedOrigin);
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  res.sendStatus(200);
});

// Minimal "ping" to confirm server is running
app.get('/api/ping', (req, res) => {
  res.json({ message: 'Server alive' });
});

// --- GET /api/xumm/me?user_token=... ---
// Takes a user token from the xApp environment and calls XUMM's /me endpoint
app.get('/api/xumm/me', async (req, res) => {
  const { user_token } = req.query;
  if (!user_token) {
    return res.status(400).json({ error: 'Missing user_token' });
  }
  try {
    // Call XUMM's /me endpoint with the user token
    const response = await axios.get('https://xumm.app/api/v1/platform/me', {
      headers: {
        Authorization: `Bearer ${user_token}`,
        'Content-Type': 'application/json'
      }
    });
    // The returned object typically contains { account: 'r...', ... }
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching user info:', error.message);
    res.status(500).json({ error: error.toString() });
  }
});

app.listen(PORT, () => {
  console.log(`Backend server running on port ${PORT}`);
});