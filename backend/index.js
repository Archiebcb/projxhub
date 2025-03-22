// backend/index.js
const { RippleAPI } = require('ripple-lib');

async function main() {
  const api = new RippleAPI({ server: 'wss://s.altnet.rippletest.net:51233' });
  await api.connect();
  console.log('Connected to XRPL Testnet');
  const info = await api.getServerInfo();
  console.log('Server Info:', info);
  await api.disconnect();
  console.log('Disconnected from XRPL Testnet');
}

main().catch(console.error);
