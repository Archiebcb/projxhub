// api/xumm-me.js
require('dotenv').config();
const axios = require('axios');

export default async function handler(req, res) {
  try {
    // Extract user_token from the query string
    const { user_token } = req.query;
    if (!user_token) {
      console.error('Missing user_token in request query');
      return res.status(400).json({ error: 'Missing user_token query parameter' });
    }

    console.log('Received user_token:', user_token);

    // Call XUMM's /me endpoint using the provided user token.
    // Note: The /me endpoint uses the token for authorization and does not need your API keys.
    const response = await axios.get('https://xumm.app/api/v1/platform/me', {
      headers: {
        'Authorization': `Bearer ${user_token}`,
        'Content-Type': 'application/json'
      }
    });

    console.log('Response from XUMM /me:', response.data);
    res.status(200).json(response.data);
  } catch (error) {
    console.error('Error fetching user info:', error.message);
    if (error.response) {
      console.error('Error response data:', error.response.data);
    }
    res.status(500).json({ error: error.toString() });
  }
}