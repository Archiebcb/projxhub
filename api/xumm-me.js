// api/xumm-me.js
import axios from 'axios';

export default async function handler(req, res) {
  const { user_token } = req.query;
  if (!user_token) {
    return res.status(400).json({ error: 'Missing user_token query parameter' });
  }
  try {
    const response = await axios.get('https://xumm.app/api/v1/platform/me', {
      headers: {
        Authorization: `Bearer ${user_token}`,
        'Content-Type': 'application/json'
      }
    });
    res.status(200).json(response.data);
  } catch (error) {
    console.error('Error fetching user info:', error.message);
    res.status(500).json({ error: error.toString() });
  }
}