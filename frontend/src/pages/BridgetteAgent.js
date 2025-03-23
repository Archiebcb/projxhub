import React, { useState } from 'react';
import {
  Container,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Grid,
  Divider,
  Paper,
} from '@mui/material';
import { motion } from 'framer-motion';

const BridgetteAgent = () => {
  const [source, setSource] = useState('');
  const [target, setTarget] = useState('');
  const [bridgeProgress, setBridgeProgress] = useState(0);
  const [quote, setQuote] = useState(null);
  const [swapCompleted, setSwapCompleted] = useState(false);
  const [tradeLog, setTradeLog] = useState([]);

  const handleGetQuote = () => {
    if (!source || !target) {
      alert('Please fill in both the source and target assets.');
      return;
    }
    // Simulate a quote: generate random fee and profit values.
    const fee = (Math.random() * 2 + 0.5).toFixed(2); // fee between 0.5% and 2.5%
    const profit = (Math.random() * 5).toFixed(2); // profit margin up to 5%
    setQuote({ fee, profit });
  };

  const handleStartBridge = () => {
    if (!quote) {
      alert('Please get a bridge quote first.');
      return;
    }
    setBridgeProgress(0);
    setSwapCompleted(false);
    let progress = 0;
    const interval = setInterval(() => {
      progress += 10;
      setBridgeProgress(progress);
      if (progress >= 100) {
        clearInterval(interval);
        setSwapCompleted(true);
        const tradeEntry = {
          source,
          target,
          quote,
          timestamp: new Date().toLocaleString(),
        };
        setTradeLog([tradeEntry, ...tradeLog]);
        alert(`Swap Executed: ${source} → ${target}\nFee: ${quote.fee}%, Profit: ${quote.profit}%`);
      }
    }, 300);
  };

  return (
    <Container sx={{ mt: 4 }}>
      <Card sx={{ p: 3, borderRadius: 2, bgcolor: 'background.paper' }}>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            Bridgette - The Future Bridge Agent
          </Typography>
          <Typography variant="body1" sx={{ mb: 2 }}>
            On the right, enter the asset you want to swap (source). On the left, enter the asset you want to receive (target).
            Bridgette will securely hold your funds until the optimal quote is found and the bridge is fully built.
          </Typography>
          <Grid container spacing={2} alignItems="center">
            {/* Left side: Target Asset */}
            <Grid item xs={5}>
              <TextField
                label="Target Asset"
                variant="outlined"
                fullWidth
                value={target}
                onChange={(e) => setTarget(e.target.value)}
              />
            </Grid>
            {/* Middle: Animated Bridge */}
            <Grid item xs={2} container justifyContent="center">
              <motion.div
                style={{
                  backgroundColor: '#00e5ff',
                  height: 10,
                  borderRadius: 5,
                  width: '0%',
                }}
                animate={{ width: `${bridgeProgress}%` }}
                transition={{ duration: 0.3 }}
              />
            </Grid>
            {/* Right side: Source Asset */}
            <Grid item xs={5}>
              <TextField
                label="Source Asset"
                variant="outlined"
                fullWidth
                value={source}
                onChange={(e) => setSource(e.target.value)}
              />
            </Grid>
          </Grid>
          <Grid container spacing={2} sx={{ mt: 2 }}>
            <Grid item xs={12} sm={6}>
              <Button variant="contained" color="primary" fullWidth onClick={handleGetQuote}>
                Get Bridge Quote
              </Button>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Button variant="contained" color="secondary" fullWidth onClick={handleStartBridge}>
                Build bridge
              </Button>
            </Grid>
          </Grid>
          {quote && (
            <Typography variant="body1" sx={{ mt: 2 }}>
              Quote: Swap {source} for {target}. Fee: {quote.fee}%, Expected Profit: {quote.profit}%.
            </Typography>
          )}
          {swapCompleted && (
            <Typography variant="h6" color="secondary" sx={{ mt: 2 }}>
              Swap Completed!
            </Typography>
          )}
        </CardContent>
      </Card>
      <Divider sx={{ my: 3 }} />
      <Typography variant="h6" gutterBottom>
        Trade Log
      </Typography>
      <Paper sx={{ p: 2, maxHeight: 200, overflowY: 'auto' }}>
        {tradeLog.length === 0 ? (
          <Typography variant="body2" color="text.secondary">
            No swaps executed yet.
          </Typography>
        ) : (
          tradeLog.map((trade, index) => (
            <div key={index}>
              <Typography variant="body2">
                {trade.timestamp}: {trade.source} → {trade.target} | Fee: {trade.quote.fee}%, Profit: {trade.quote.profit}%
              </Typography>
              <Divider />
            </div>
          ))
        )}
      </Paper>
    </Container>
  );
};

export default BridgetteAgent;
