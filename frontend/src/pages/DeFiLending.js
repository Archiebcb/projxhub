// src/pages/DeFiLending.js
import React, { useState } from 'react';
import {
  Box,
  Button,
  Typography,
  Paper,
  TextField,
  Grid,
  List,
  ListItem,
  ListItemText
} from '@mui/material';

const DeFiLending = () => {
  const [walletConnected, setWalletConnected] = useState(false);
  const [assets, setAssets] = useState([]);
  const [loanAmount, setLoanAmount] = useState('');
  const [loanRequestMsg, setLoanRequestMsg] = useState('');

  // Dummy data to simulate wallet assets once connected.
  const dummyAssets = [
    { id: 1, name: 'XRP', amount: 1500, valuePerUnit: 0.5 }, // 1500 XRP at $0.50 each → $750
    { id: 2, name: 'TokenA', amount: 200, valuePerUnit: 2 }, // 200 TokenA at $2 each → $400
    { id: 3, name: 'TokenB', amount: 100, valuePerUnit: 5 }  // 100 TokenB at $5 each → $500
  ];

  const collateralizationRate = 0.5; // Users can borrow up to 50% of their collateral value

  const connectWallet = () => {
    // In a real implementation, you would connect to the user's wallet (e.g., using xrpl.js or similar)
    setWalletConnected(true);
    setAssets(dummyAssets);
  };

  // Compute total collateral value from assets
  const totalCollateral = assets.reduce((total, asset) => {
    return total + asset.amount * asset.valuePerUnit;
  }, 0);

  const maxBorrowable = totalCollateral * collateralizationRate;

  const requestLoan = () => {
    const requested = parseFloat(loanAmount);
    if (isNaN(requested) || requested <= 0) {
      setLoanRequestMsg('Please enter a valid loan amount.');
      return;
    }
    if (requested > maxBorrowable) {
      setLoanRequestMsg(`Loan amount exceeds maximum borrowable ($${maxBorrowable.toFixed(2)}).`);
      return;
    }
    // Simulate successful loan request
    setLoanRequestMsg(`Loan request for $${requested.toFixed(2)} submitted successfully!`);
  };

  return (
    <Box p={2}>
      <Typography variant="h4" gutterBottom>
        DeFi Lending - Borrow Against Your Collateral
      </Typography>
      {!walletConnected ? (
        <Box mb={2}>
          <Button variant="contained" onClick={connectWallet}>
            Connect Wallet
          </Button>
        </Box>
      ) : (
        <>
          <Paper sx={{ p: 2, mb: 2 }}>
            <Typography variant="h6">Your Assets</Typography>
            {assets.length === 0 ? (
              <Typography>No assets found.</Typography>
            ) : (
              <List>
                {assets.map((asset) => (
                  <ListItem key={asset.id}>
                    <ListItemText
                      primary={`${asset.name}: ${asset.amount} units`}
                      secondary={`Value per unit: $${asset.valuePerUnit.toFixed(2)}`}
                    />
                  </ListItem>
                ))}
              </List>
            )}
            <Typography variant="body1" sx={{ mt: 2 }}>
              Total Collateral Value: ${totalCollateral.toFixed(2)}
            </Typography>
            <Typography variant="body1">
              Maximum Borrowable (at {collateralizationRate * 100}% collateralization): ${maxBorrowable.toFixed(2)}
            </Typography>
          </Paper>
          <Paper sx={{ p: 2, mb: 2 }}>
            <Typography variant="h6">Request a Loan</Typography>
            <TextField
              fullWidth
              label="Desired Loan Amount"
              value={loanAmount}
              onChange={(e) => setLoanAmount(e.target.value)}
              margin="normal"
              type="number"
            />
            <Box mt={1}>
              <Button variant="contained" onClick={requestLoan}>
                Request Loan
              </Button>
            </Box>
            {loanRequestMsg && (
              <Typography variant="body2" color="secondary" sx={{ mt: 1 }}>
                {loanRequestMsg}
              </Typography>
            )}
          </Paper>
        </>
      )}
      <Typography variant="body2" color="text.secondary">
        Connect your wallet to see your assets and get a borrowing limit based on your collateral. Borrow funds to scale your XRPL-enabled projects!
      </Typography>
    </Box>
  );
};

export default DeFiLending;