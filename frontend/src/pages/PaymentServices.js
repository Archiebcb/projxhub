// frontend/src/pages/PaymentServices.js
import React from 'react';
import { Container, Card, CardContent, Typography, Divider, Button } from '@mui/material';
import { motion } from 'framer-motion';

const PaymentServices = () => {
  return (
    <Container sx={{ mt: 4 }}>
      <Card sx={{ p: 2, borderRadius: 2, bgcolor: 'background.paper' }}>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            Integrated Wallet & Payment Services
          </Typography>
          <Typography variant="body1" sx={{ mb: 2 }}>
            Manage and send payments across XRPL with ease.
          </Typography>
          <Divider sx={{ mb: 2 }} />
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Button variant="contained" color="primary">
              Send Payment
            </Button>
          </motion.div>
        </CardContent>
      </Card>
    </Container>
  );
};

export default PaymentServices;
