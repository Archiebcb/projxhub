// frontend/src/pages/DAIF.js
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
  List,
  ListItem,
  ListItemText
} from '@mui/material';
import { motion } from 'framer-motion';

const DAIF = () => {
  const [deposit, setDeposit] = useState('');
  const [deposits, setDeposits] = useState([]);
  const [fundSummary, setFundSummary] = useState(null);

  const handleDeposit = () => {
    if (!deposit) {
      alert('Please enter an amount to deposit.');
      return;
    }
    const entry = {
      amount: deposit,
      timestamp: new Date().toLocaleString(),
    };
    setDeposits([entry, ...deposits]);
    setDeposit('');
  };

  const handleGenerateSummary = () => {
    // Simulate summary calculation (in production, compute actual fund performance)
    const total = deposits.reduce((sum, entry) => sum + parseFloat(entry.amount), 0);
    const summary = `Total Deposits: ${total} XRP
Estimated Fund Growth: ${(total * (Math.random() * 0.2 + 1)).toFixed(2)} XRP (simulated)`;
    setFundSummary(summary);
  };

  return (
    <Container sx={{ mt: 4 }}>
      <Card sx={{ p: 3, borderRadius: 2, bgcolor: 'background.paper' }}>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            DAIF - Decentralized Autonomous Investment Fund
          </Typography>
          <Typography variant="body1" sx={{ mb: 2 }}>
            Contribute to the community fund and benefit from collective investment strategies.
          </Typography>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} sm={8}>
              <TextField
                label="Deposit Amount (XRP)"
                variant="outlined"
                fullWidth
                value={deposit}
                onChange={(e) => setDeposit(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <Button variant="contained" color="primary" fullWidth onClick={handleDeposit}>
                Deposit
              </Button>
            </Grid>
          </Grid>
          <Button variant="outlined" color="secondary" sx={{ mt: 2 }} onClick={handleGenerateSummary}>
            Generate Fund Summary
          </Button>
          {fundSummary && (
            <>
              <Divider sx={{ my: 2 }} />
              <Typography variant="body1" sx={{ whiteSpace: 'pre-line' }}>
                {fundSummary}
              </Typography>
            </>
          )}
        </CardContent>
      </Card>
      <Divider sx={{ my: 3 }} />
      <Typography variant="h6" gutterBottom>
        Deposit Log
      </Typography>
      <Paper sx={{ p: 2, maxHeight: 200, overflowY: 'auto' }}>
        {deposits.length === 0 ? (
          <Typography variant="body2" color="text.secondary">
            No deposits made yet.
          </Typography>
        ) : (
          <List>
            {deposits.map((entry, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <ListItem>
                  <ListItemText primary={`${entry.timestamp}: ${entry.amount} XRP`} />
                </ListItem>
              </motion.div>
            ))}
          </List>
        )}
      </Paper>
    </Container>
  );
};

export default DAIF;
