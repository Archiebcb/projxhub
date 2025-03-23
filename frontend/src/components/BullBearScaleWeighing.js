// frontend/src/components/BullBearScaleWeighing.js
import React, { useState } from 'react';
import { Box, Typography, Button } from '@mui/material';

const BullBearScaleWeighing = () => {
  // Simulate an AI-generated value between 1 (very bearish) and 100 (very bullish)
  const [scaleValue, setScaleValue] = useState(Math.floor(Math.random() * 100) + 1);

  const handleRefresh = () => {
    // Replace with your real AI analysis later on
    setScaleValue(Math.floor(Math.random() * 100) + 1);
  };

  // Compute pointer position and tilt: pointer rotates (scaleValue - 50) / 2 degrees.
  const pointerPercent = ((scaleValue - 1) / 99) * 100;
  const pointerRotation = (scaleValue - 50) / 2; // e.g., 100 gives 25°, 1 gives -24.5°

  return (
    <Box sx={{ p: 2, backgroundColor: '#111', borderRadius: 2, boxShadow: 3 }}>
      <Typography variant="h6" align="center" sx={{ mb: 1, color: '#00e5ff' }}>
        Bull/Bear Scale
      </Typography>
      <Box
        sx={{
          position: 'relative',
          height: 60,
          background: 'linear-gradient(to right, #ff4136, #2ecc40)',
          borderRadius: 1,
        }}
      >
        {/* Bear label */}
        <Typography variant="caption" sx={{ position: 'absolute', left: 8, top: 8, color: '#fff' }}>
          🐻 Bearish
        </Typography>
        {/* Bull label */}
        <Typography variant="caption" sx={{ position: 'absolute', right: 8, top: 8, color: '#fff' }}>
          Bullish 🐂
        </Typography>
        {/* Pointer that tilts */}
        <Box
          sx={{
            position: 'absolute',
            left: `${pointerPercent}%`,
            top: '50%',
            transform: `translate(-50%, -50%) rotate(${pointerRotation}deg)`,
            width: 4,
            height: 60,
            backgroundColor: '#000',
            borderRadius: 1,
          }}
        />
      </Box>
      <Typography variant="body1" align="center" sx={{ mt: 1, color: '#fff' }}>
        {scaleValue} / 100
      </Typography>
      <Box textAlign="center" sx={{ mt: 2 }}>
        <Button variant="contained" onClick={handleRefresh} sx={{ backgroundColor: '#00e5ff' }}>
          Refresh Scale
        </Button>
      </Box>
    </Box>
  );
};

export default BullBearScaleWeighing;
