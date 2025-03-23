/* eslint-disable no-unused-vars */
import React from 'react';
import { Container, Card, CardContent, Typography, Divider } from '@mui/material';
import { motion } from 'framer-motion';
/* eslint-enable no-unused-vars */

const VoiceGestureControls = () => {
  return (
    <Container sx={{ mt: 4 }}>
      <Card sx={{ p: 2, borderRadius: 2, bgcolor: 'background.paper' }}>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            Voice & Gesture Controls
          </Typography>
          <Typography variant="body1" sx={{ mb: 2 }}>
            Experience immersive navigation with voice commands and gesture controls.
          </Typography>
          <Divider sx={{ mb: 2 }} />
          <Typography variant="body2">
            (Feature coming soon...)
          </Typography>
        </CardContent>
      </Card>
    </Container>
  );
};

export default VoiceGestureControls;
