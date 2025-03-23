// frontend/src/pages/MakeAMeme.js
import React, { useState } from 'react';
import { Container, Typography, TextField, Button, Grid, Paper } from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledContainer = styled(Container)(({ theme }) => ({
  background: 'linear-gradient(135deg, #141E30, #243B55)',
  minHeight: '100vh',
  color: '#fff',
  padding: theme.spacing(4),
}));

const LogoPreview = styled(Paper)(({ theme }) => ({
  height: 150,
  width: 150,
  backgroundColor: '#fff',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  marginTop: theme.spacing(2),
}));

const MakeAMeme = () => {
  const [coinName, setCoinName] = useState('');
  const [initialSupply, setInitialSupply] = useState('');
  const [buyTax, setBuyTax] = useState('');
  const [sellTax, setSellTax] = useState('');
  const [logoUrl, setLogoUrl] = useState('');

  const handleGenerateLogo = () => {
    // Simulate logo generation with a placeholder image.
    // Replace this with a real logo generator integration when ready.
    setLogoUrl('https://placehold.co/150x150?text=Logo');
  };

  const handleCreateMemeCoin = () => {
    const coinData = {
      coinName,
      initialSupply,
      buyTax,
      sellTax,
      logoUrl,
    };
    console.log('Creating Meme Coin with data:', coinData);
    // Insert your XRPL integration or backend call for meme coin creation here.
    alert('Meme coin created (simulation)! Check console for details.');
  };

  return (
    <StyledContainer maxWidth="sm">
      <Typography variant="h4" align="center" gutterBottom>
        Create Your Meme Coin
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            label="Meme Coin Name"
            variant="outlined"
            fullWidth
            value={coinName}
            onChange={(e) => setCoinName(e.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Initial Supply"
            variant="outlined"
            fullWidth
            type="number"
            value={initialSupply}
            onChange={(e) => setInitialSupply(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Buy Tax (%)"
            variant="outlined"
            fullWidth
            type="number"
            value={buyTax}
            onChange={(e) => setBuyTax(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Sell Tax (%)"
            variant="outlined"
            fullWidth
            type="number"
            value={sellTax}
            onChange={(e) => setSellTax(e.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleGenerateLogo}
            fullWidth
          >
            Generate Logo
          </Button>
          {logoUrl && (
            <LogoPreview elevation={3}>
              <img
                src={logoUrl}
                alt="Generated Logo"
                style={{ maxWidth: '100%', maxHeight: '100%' }}
              />
            </LogoPreview>
          )}
        </Grid>
        <Grid item xs={12}>
          <Button
            variant="contained"
            color="secondary"
            onClick={handleCreateMemeCoin}
            fullWidth
          >
            Create Meme Coin
          </Button>
        </Grid>
      </Grid>
    </StyledContainer>
  );
};

export default MakeAMeme;
