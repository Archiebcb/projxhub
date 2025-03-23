import React, { useState } from 'react';
import { Box, Typography, Button, Slider } from '@mui/material';

const BullBearScale = () => {
  // For now, we simulate the AI analysis with a random number between 1 and 100
  const [scaleValue, setScaleValue] = useState(Math.floor(Math.random() * 100) + 1);

  const handleRefresh = () => {
    // In a real scenario, you'd replace this with an API call or AI analysis function.
    setScaleValue(Math.floor(Math.random() * 100) + 1);
  };

  return (
    <Box
      sx={{
        mt: 2,
        p: 2,
        border: '1px solid #00e5ff',
        borderRadius: 2,
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
      }}
    >
      <Typography variant="h6" align="center" sx={{ color: '#00e5ff', mb: 1 }}>
        Bull/Bear Scale
      </Typography>
      <Typography variant="body1" align="center" sx={{ color: '#fff', mb: 2 }}>
        {scaleValue <= 50 ? 'Bearish' : 'Bullish'} ({scaleValue})
      </Typography>
      <Slider
        value={scaleValue}
        min={1}
        max={100}
        valueLabelDisplay="auto"
        disabled
        sx={{
          color: scaleValue <= 50 ? 'red' : 'green',
        }}
      />
      <Box textAlign="center" sx={{ mt: 2 }}>
        <Button variant="contained" onClick={handleRefresh} sx={{ backgroundColor: '#00e5ff' }}>
          Refresh Scale
        </Button>
      </Box>
    </Box>
  );
};

export default BullBearScale;
