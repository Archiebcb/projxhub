// frontend/src/pages/WastemanAgent.js
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
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  List,
  ListItem,
  ListItemText,
} from '@mui/material';
import { motion } from 'framer-motion';

const WastemanAgent = () => {
  const [addresses, setAddresses] = useState('');
  const [mode, setMode] = useState('Crypto'); // "Crypto" or "Business"
  const [analysisResult, setAnalysisResult] = useState(null);

  // Simulated analysis function
  const simulateWasteAnalysis = (addrList, mode) => {
    if (mode === 'Business') {
      return {
        totalFees: (Math.random() * 1000).toFixed(2), // higher fees for business spending
        wastedSpend: (Math.random() * 5000).toFixed(2), // total spending that is inefficient
        suspiciousPatterns: [
          { desc: 'Multiple unapproved transactions', cost: (Math.random() * 200).toFixed(2) },
          { desc: 'Excessive subscription renewals', cost: (Math.random() * 150).toFixed(2) },
        ],
        suggestion: 'Review expense reports and consolidate recurring costs.',
      };
    } else {
      return {
        totalFees: (Math.random() * 500).toFixed(2), // for crypto fees
        worthlessTokens: Math.floor(Math.random() * 10),
        losingTrades: Math.floor(Math.random() * 5),
        suspiciousPatterns: [
          { desc: 'Repeated micro-swaps within 1 hour', cost: (Math.random() * 100).toFixed(2) },
          { desc: 'Large gas fees from small transfers', cost: (Math.random() * 50).toFixed(2) },
        ],
        suggestion: 'Consider consolidating micro-balances and avoid frequent small swaps.',
      };
    }
  };

  const handleScan = () => {
    if (!addresses.trim()) {
      alert('Please enter at least one wallet or account address.');
      return;
    }
    const addrList = addresses.split(',').map(a => a.trim());
    const result = simulateWasteAnalysis(addrList, mode);
    setAnalysisResult(result);
  };

  return (
    <Container sx={{ mt: 4 }}>
      <Card sx={{ p: 3, borderRadius: 2, bgcolor: 'background.paper' }}>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            Wasteman - Wallet & Spending Analyzer
          </Typography>
          <Typography variant="body1" sx={{ mb: 2 }}>
            Analyze any wallet or business account to detect inefficiencies and wasted spending.
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                label="Wallet/Account Address(es)"
                variant="outlined"
                fullWidth
                value={addresses}
                onChange={(e) => setAddresses(e.target.value)}
                helperText="Enter one or more addresses separated by commas."
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Mode</InputLabel>
                <Select
                  value={mode}
                  label="Mode"
                  onChange={(e) => setMode(e.target.value)}
                >
                  <MenuItem value="Crypto">Crypto</MenuItem>
                  <MenuItem value="Business">Business</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Button variant="contained" color="primary" fullWidth onClick={handleScan}>
                Scan Wallet(s)
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
      {analysisResult && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Divider sx={{ my: 3 }} />
          <Typography variant="h6" gutterBottom>
            Analysis Results
          </Typography>
          <Paper sx={{ p: 2, mb: 2 }}>
            {mode === 'Business' ? (
              <>
                <Typography variant="body1">
                  <strong>Total Inefficient Spending:</strong> ${analysisResult.wastedSpend}
                </Typography>
                <Typography variant="body1">
                  <strong>Fees or Extra Costs:</strong> ${analysisResult.totalFees}
                </Typography>
              </>
            ) : (
              <>
                <Typography variant="body1">
                  <strong>Total Fees Wasted:</strong> ${analysisResult.totalFees}
                </Typography>
                <Typography variant="body1">
                  <strong>Worthless Tokens:</strong> {analysisResult.worthlessTokens}
                </Typography>
                <Typography variant="body1">
                  <strong>Losing Trades:</strong> {analysisResult.losingTrades}
                </Typography>
              </>
            )}
            <Divider sx={{ my: 2 }} />
            <Typography variant="subtitle1" gutterBottom>
              Suspicious Patterns:
            </Typography>
            <List>
              {analysisResult.suspiciousPatterns.map((p, idx) => (
                <ListItem key={idx}>
                  <ListItemText primary={p.desc} secondary={`Estimated Cost: $${p.cost}`} />
                </ListItem>
              ))}
            </List>
            <Divider sx={{ my: 2 }} />
            <Typography variant="body1" sx={{ fontStyle: 'italic' }}>
              Suggestion: {analysisResult.suggestion}
            </Typography>
          </Paper>
        </motion.div>
      )}
    </Container>
  );
};

export default WastemanAgent;
