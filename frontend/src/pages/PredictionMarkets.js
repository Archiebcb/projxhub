// src/pages/PredictionMarkets.js
import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Button,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody
} from '@mui/material';

// List of top 5 cryptocurrencies for predictions
const topCryptos = [
  { symbol: 'BTC', name: 'Bitcoin' },
  { symbol: 'ETH', name: 'Ethereum' },
  { symbol: 'XRP', name: 'Ripple' },
  { symbol: 'ADA', name: 'Cardano' },
  { symbol: 'SOL', name: 'Solana' },
];

const PredictionMarkets = () => {
  const [predictions, setPredictions] = useState([]);
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false);

  // Dummy function to simulate fetching current prices
  const fetchCurrentPrices = () => {
    const prices = {};
    topCryptos.forEach((coin) => {
      // For simulation, generate a random price between $50 and $1050
      prices[coin.symbol] = parseFloat((Math.random() * 1000 + 50).toFixed(2));
    });
    return prices;
  };

  const generatePredictions = () => {
    const currentPrices = fetchCurrentPrices();
    const newPredictions = topCryptos.map((coin) => {
      const current = currentPrices[coin.symbol];
      // Simulate a 24-hour prediction: current price adjusted by a random percentage (-10% to +10%)
      const percentageChange = Math.random() * 20 - 10;
      const predicted = parseFloat((current * (1 + percentageChange / 100)).toFixed(2));
      return {
        symbol: coin.symbol,
        name: coin.name,
        currentPrice: current,
        predictedPrice: predicted,
      };
    });
    setPredictions(newPredictions);
  };

  // On mount, generate initial predictions
  useEffect(() => {
    generatePredictions();
  }, []);

  const handleRefresh = () => {
    // For simulation, record the current predictions in history with a random outcome
    const outcome = Math.random() > 0.5 ? 'Accurate' : 'Missed';
    const timestamp = new Date().toLocaleString();
    setHistory((prev) => [
      ...prev,
      { predictions, outcome, timestamp }
    ]);
    // Generate new predictions
    setLoading(true);
    setTimeout(() => {
      generatePredictions();
      setLoading(false);
    }, 2000);
  };

  return (
    <Box p={2}>
      <Typography variant="h4" gutterBottom>
        Prediction Markets
      </Typography>
      
      {/* Prediction Table */}
      <Paper sx={{ p: 2, mb: 2 }}>
        <Typography variant="h6" gutterBottom>
          Top 5 Crypto Price Predictions (24H)
        </Typography>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Coin</TableCell>
              <TableCell align="right">Current Price (USD)</TableCell>
              <TableCell align="right">Predicted Price (24H) (USD)</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {predictions.map((pred) => (
              <TableRow key={pred.symbol}>
                <TableCell>{pred.name} ({pred.symbol})</TableCell>
                <TableCell align="right">{pred.currentPrice}</TableCell>
                <TableCell align="right">{pred.predictedPrice}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <Box mt={2}>
          <Button variant="contained" onClick={handleRefresh} disabled={loading}>
            {loading ? 'Refreshing...' : 'Refresh Predictions'}
          </Button>
        </Box>
      </Paper>

      {/* History Section */}
      <Paper sx={{ p: 2 }}>
        <Typography variant="h6" gutterBottom>
          Prediction History
        </Typography>
        {history.length === 0 ? (
          <Typography variant="body1">No prediction history yet.</Typography>
        ) : (
          history.map((record, idx) => (
            <Box key={idx} sx={{ mb: 1, p: 1, border: '1px solid #ccc', borderRadius: 1 }}>
              <Typography variant="body2">
                <strong>{record.timestamp}</strong> - Outcome: {record.outcome}
              </Typography>
            </Box>
          ))
        )}
      </Paper>
    </Box>
  );
};

export default PredictionMarkets;