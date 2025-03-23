// frontend/src/pages/MemeCoinCreator.js
import React, { useState } from 'react';
import { Container, TextField, Button, Typography, Box } from '@mui/material';
import * as xrpl from 'xrpl';

const MemeCoinCreator = () => {
  const [coinName, setCoinName] = useState('');
  const [coinSymbol, setCoinSymbol] = useState('');
  const [initialSupply, setInitialSupply] = useState('');
  const [status, setStatus] = useState('');

  const handleCreateCoin = async () => {
    try {
      setStatus('Connecting to XRPL Testnet...');
      const client = new xrpl.Client('wss://s.altnet.rippletest.net:51233');
      await client.connect();

      setStatus('Connected. Preparing transaction...');
      // WARNING: For demo purposes only. Replace with a secure wallet in production.
      const wallet = xrpl.Wallet.fromSeed('s████████████████████████████'); // Replace with a valid testnet seed

      // Prepare a token issuance transaction.
      // In XRPL, issuing a token can be done via a Payment to self with a custom currency.
      const preparedTx = await client.autofill({
        TransactionType: 'Payment',
        Account: wallet.address,
        Amount: {
          currency: coinSymbol.toUpperCase(),
          value: initialSupply,
          issuer: wallet.address,
        },
        Destination: wallet.address,
      });

      const signedTx = wallet.sign(preparedTx);
      setStatus('Submitting transaction...');
      const result = await client.submitAndWait(signedTx.tx_blob);
      setStatus(`Transaction result: ${result.result.meta.TransactionResult}`);
      await client.disconnect();
    } catch (error) {
      console.error(error);
      setStatus(`Error: ${error.message}`);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Typography variant="h4" align="center" gutterBottom>
        Create XRPL Meme Coin
      </Typography>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <TextField
          label="Coin Name"
          variant="outlined"
          value={coinName}
          onChange={(e) => setCoinName(e.target.value)}
        />
        <TextField
          label="Coin Symbol"
          variant="outlined"
          value={coinSymbol}
          onChange={(e) => setCoinSymbol(e.target.value)}
        />
        <TextField
          label="Initial Supply"
          variant="outlined"
          value={initialSupply}
          onChange={(e) => setInitialSupply(e.target.value)}
        />
        <Button variant="contained" color="primary" onClick={handleCreateCoin}>
          Create Meme Coin
        </Button>
        <Typography variant="body1" color="secondary">
          {status}
        </Typography>
      </Box>
    </Container>
  );
};

export default MemeCoinCreator;
