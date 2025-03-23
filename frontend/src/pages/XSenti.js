// src/pages/XSenti.js
import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Button,
  Paper
} from '@mui/material';
import TradingViewDynamic from '../components/TradingViewDynamic';

const XSenti = () => {
  const [market, setMarket] = useState('');
  const [symbolInput, setSymbolInput] = useState('');  // user-typed symbol/pair
  const [tradingViewSymbol, setTradingViewSymbol] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [sentimentResult, setSentimentResult] = useState(null);

  // Reset symbol and submission state when market changes
  useEffect(() => {
    setSymbolInput('');
    setTradingViewSymbol('');
    setSubmitted(false);
    setSentimentResult(null);
  }, [market]);

  const handleMarketChange = (e) => {
    setMarket(e.target.value);
  };

  const handleSymbolInputChange = (e) => {
    setSymbolInput(e.target.value);
  };

  // Called when user clicks "Show Chart & Sentiment"
  const handleSubmit = async () => {
    if (!market || !symbolInput.trim()) return;
    setLoading(true);

    // Convert user-friendly input (e.g., "ADA/USDT") into TradingView's symbol format
    let tvSymbol = '';
    if (market === 'crypto') {
      // e.g. user typed "ADA/USDT" => "BINANCE:ADAUSDT"
      const pair = symbolInput.replace('/', '').toUpperCase();
      tvSymbol = `BINANCE:${pair}`;
    } else if (market === 'forex') {
      // e.g. user typed "USD/JPY" => "FX_IDC:USDJPY"
      const pair = symbolInput.replace('/', '').toUpperCase();
      tvSymbol = `FX_IDC:${pair}`;
    } else if (market === 'stocks') {
      // e.g. user typed "TSLA" => "NASDAQ:TSLA"
      // If you want a specific exchange, you can parse user input or show a dropdown
      tvSymbol = `NASDAQ:${symbolInput.toUpperCase()}`;
    } else if (market === 'property') {
      // For property, you might not have a direct TradingView chart. We'll skip
      // or just set tvSymbol to something placeholder.
      tvSymbol = 'property-market';
    }

    // Simulate an AI sentiment check
    await new Promise((resolve) => setTimeout(resolve, 2000));
    const responses = {
      bullish: 'The market is roaringly bullish today!',
      bearish: 'The market appears bearish—maybe a day to chill out.'
    };
    const randomKey = Math.random() > 0.5 ? 'bullish' : 'bearish';
    const sentimentMsg = responses[randomKey];

    setSentimentResult({
      sentiment: randomKey === 'bullish' ? 'Bullish' : 'Bearish',
      message: sentimentMsg
    });
    setTradingViewSymbol(tvSymbol);
    setSubmitted(true);
    setLoading(false);
  };

  return (
    <Box p={2} sx={{ border: '1px solid #00e5ff', borderRadius: 2, mb: 2 }}>
      <Typography variant="h4" gutterBottom>
        XSENTI
      </Typography>

      {/* Step 1: Choose Market */}
      <FormControl fullWidth variant="outlined" sx={{ mb: 2 }}>
        <InputLabel id="market-select-label">Select Market</InputLabel>
        <Select
          labelId="market-select-label"
          id="market-select"
          value={market}
          onChange={handleMarketChange}
          label="Select Market"
        >
          <MenuItem value="crypto">Crypto</MenuItem>
          <MenuItem value="forex">Forex</MenuItem>
          <MenuItem value="stocks">Stocks</MenuItem>
          <MenuItem value="property">Property</MenuItem>
        </Select>
      </FormControl>

      {/* Step 2: Enter or pick a symbol (except property) */}
      {market && market !== 'property' && (
        <Box mb={2}>
          <TextField
            fullWidth
            label={
              market === 'crypto' ? 'Enter Crypto Pair (e.g. ADA/USDT)' :
              market === 'forex' ? 'Enter Forex Pair (e.g. USD/JPY)' :
              'Enter Stock Symbol (e.g. TSLA)'
            }
            value={symbolInput}
            onChange={handleSymbolInputChange}
            sx={{ mb: 1 }}
          />
        </Box>
      )}

      {/* If property is chosen, we might skip direct symbol input */}
      {market === 'property' && (
        <Typography variant="body1" sx={{ mb: 2 }}>
          We'll show property market data or advice here, rather than a direct chart.
        </Typography>
      )}

      <Button
        variant="contained"
        onClick={handleSubmit}
        disabled={!market || (!symbolInput.trim() && market !== 'property') || loading}
        sx={{ mb: 2 }}
      >
        {loading ? 'Scouring...' : 'Show Chart & Sentiment'}
      </Button>

      {/* Step 3: Display Sentiment + TradingView Chart once submitted */}
      {submitted && sentimentResult && (
        <Paper elevation={3} sx={{ p: 2 }}>
          <Typography variant="h5" gutterBottom>
            {sentimentResult.sentiment}
          </Typography>
          <Typography variant="body1" gutterBottom>
            {sentimentResult.message}
          </Typography>
          {market !== 'property' && (
            <Box mt={2}>
              <Typography variant="subtitle1">
                TradingView Chart for {symbolInput.toUpperCase()}:
              </Typography>
              {tradingViewSymbol !== 'property-market' && (
                <TradingViewDynamic symbol={tradingViewSymbol} />
              )}
            </Box>
          )}
        </Paper>
      )}

      <Box mt={2}>
        <Typography variant="body2" color="text.secondary">
          XSENTI uses AI to scour the web for market sentiment in crypto, forex, stocks, and property.
          It also lets you view a TradingView chart for the chosen symbol. 
        </Typography>
      </Box>
    </Box>
  );
};

export default XSenti;