// src/components/XRPLMemecoinTracker.js
import React, { useEffect, useState } from 'react';
import { Client } from 'xrpl';
import { Box, Typography, Paper } from '@mui/material';

const XRPLMemecoinTracker = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    let client;
    const connectAndSubscribe = async () => {
      try {
        // Connect to XRPL Mainnet
        client = new Client('wss://s1.ripple.com');
        await client.connect();
        console.log('Connected to XRPL Mainnet');

        // Subscribe to ledger events
        await client.request({
          command: 'subscribe',
          streams: ['ledger']
        });

        client.on('message', (message) => {
          console.log('Ledger event received:', message);

          // Process transaction events only
          if (message.type === 'transaction' && message.transaction) {
            const txn = message.transaction;

            // Filter for NFT Mint events
            if (txn.TransactionType === 'NFTokenMint') {
              console.log('NFT Mint Detected:', txn);
              setEvents((prev) => [
                ...prev,
                { type: 'NFT Mint', details: txn }
              ]);
            }
            // Filter for token issuance events: Payment to self with non-XRP amount
            else if (
              txn.TransactionType === 'Payment' &&
              typeof txn.Amount === 'object' &&
              txn.Account === txn.Destination
            ) {
              console.log('Token Issuance Detected:', txn);
              setEvents((prev) => [
                ...prev,
                { type: 'Token Issuance', details: txn }
              ]);
            }
          }
        });
      } catch (error) {
        console.error('XRPL connection error:', error);
      }
    };

    connectAndSubscribe();

    return () => {
      if (client) {
        client.disconnect();
      }
    };
  }, []);

  return (
    <Box mt={4}>
      <Typography variant="h6">XRPL Live Mint Events</Typography>
      {events.length === 0 ? (
        <Typography variant="body2">No mint events yet...</Typography>
      ) : (
        events.map((evt, index) => (
          <Paper key={index} sx={{ p: 1, my: 1 }}>
            <Typography variant="subtitle2" color="primary">
              {evt.type}
            </Typography>
            <Typography variant="body2">
              {JSON.stringify(evt.details, null, 2)}
            </Typography>
          </Paper>
        ))
      )}
    </Box>
  );
};

export default XRPLMemecoinTracker;
