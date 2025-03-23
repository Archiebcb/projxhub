// src/xdex.js
import React, { useState } from 'react';
import { Container, Card, CardContent, Typography, TextField, Button, Grid, Divider } from '@mui/material';
import { styled } from '@mui/material/styles';
import { motion } from 'framer-motion';
import XRPLMemecoinTracker from '../components/XRPLMemecoinTracker';
import XummXApp from './XummXApp'; // Updated import – ensure XummXApp.js is in src/ folder

const FuturisticContainer = styled(Container)(({ theme }) => ({
  background: 'linear-gradient(135deg, #1e1e2f, #27293d)',
  minHeight: '100vh',
  padding: theme.spacing(4),
  color: '#fff',
}));

const GlassCard = styled(Card)(({ theme }) => ({
  background: 'rgba(255, 255, 255, 0.1)',
  backdropFilter: 'blur(10px)',
  borderRadius: 16,
  border: '1px solid rgba(255,255,255,0.2)',
  boxShadow: '0 8px 32px rgba(0,0,0,0.37)',
  padding: theme.spacing(3),
}));

const SwapButton = styled(Button)(({ theme }) => ({
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'scale(1.05)',
    boxShadow: '0 0 15px rgba(255, 0, 150, 0.8)',
  },
}));

const XDEX = () => {
  const [fromToken, setFromToken] = useState('');
  const [toToken, setToToken] = useState('');
  const [amount, setAmount] = useState('');
  const [swapResult, setSwapResult] = useState(null);

  const handleSwap = () => {
    if (!fromToken || !toToken || !amount) {
      alert('Please fill in all fields.');
      return;
    }
    // Simulate a token swap – replace with real integration later
    const result = {
      from: fromToken,
      to: toToken,
      amount,
      rate: (Math.random() * 2 + 0.5).toFixed(4),
    };
    setSwapResult(result);
  };

  return (
    <FuturisticContainer>
      {/* Token Swap Interface */}
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <GlassCard>
          <CardContent>
            <Typography variant="h4" gutterBottom sx={{ fontFamily: 'Orbitron, sans-serif' }}>
              XDEX - Decentralized Exchange
            </Typography>
            <Typography variant="body1" sx={{ mb: 2 }}>
              Swap your tokens seamlessly with XRPL’s ultra-fast, low-fee DEX.
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={4}>
                <TextField
                  label="From Token"
                  variant="outlined"
                  fullWidth
                  value={fromToken}
                  onChange={(e) => setFromToken(e.target.value)}
                  InputLabelProps={{ style: { color: '#fff' } }}
                  InputProps={{ style: { color: '#fff' } }}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  label="To Token"
                  variant="outlined"
                  fullWidth
                  value={toToken}
                  onChange={(e) => setToToken(e.target.value)}
                  InputLabelProps={{ style: { color: '#fff' } }}
                  InputProps={{ style: { color: '#fff' } }}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  label="Amount"
                  variant="outlined"
                  fullWidth
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  InputLabelProps={{ style: { color: '#fff' } }}
                  InputProps={{ style: { color: '#fff' } }}
                />
              </Grid>
            </Grid>
            <SwapButton variant="contained" color="primary" sx={{ mt: 2 }} onClick={handleSwap}>
              Execute Swap
            </SwapButton>
            {swapResult && (
              <>
                <Divider sx={{ my: 2, borderColor: 'rgba(255,255,255,0.3)' }} />
                <Typography variant="body1">
                  Swap Result: {swapResult.amount} {swapResult.from} → {swapResult.to} at an exchange rate of {swapResult.rate}
                </Typography>
              </>
            )}
          </CardContent>
        </GlassCard>
      </motion.div>

      {/* Wallet Connection using the new XummXApp component */}
      <XummXApp />

      {/* XRPL Live Mint Tracker */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.3 }}>
        <XRPLMemecoinTracker />
      </motion.div>
    </FuturisticContainer>
  );
};

export default XDEX;