import React from 'react';
import { Container, Card, CardContent, Typography, Divider, Button } from '@mui/material';
import { motion } from 'framer-motion';

const PaymentNetworks = () => {
  return (
    <Container sx={{ mt: 4 }}>
      <Card sx={{ p: 2, borderRadius: 2, bgcolor: 'background.paper' }}>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            Payment Networks Integration
          </Typography>
          <Typography variant="body1" sx={{ mb: 2 }}>
            Easily convert between XRPL assets and traditional currencies. Simulated on-ramps and off-ramps are available.
          </Typography>
          <Divider sx={{ mb: 2 }} />
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }}>
            <Button variant="contained" color="primary">
              Connect Payment Gateway
            </Button>
          </motion.div>
          <Typography variant="body2" sx={{ mt: 2 }}>
            (Integration with established payment networks coming soon...)
          </Typography>
        </CardContent>
      </Card>
    </Container>
  );
};

export default PaymentNetworks;
