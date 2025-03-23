// frontend/src/pages/PortfolioTracker.js
import React from 'react';
import { Container, Card, CardContent, Typography, Divider, Grid } from '@mui/material';
import { motion } from 'framer-motion';

const samplePortfolio = [
  { asset: 'XRP', value: '5000', change: '+5%' },
  { asset: 'Token A', value: '1500', change: '-2%' },
  { asset: 'NFT B', value: '300', change: '+10%' },
];

const PortfolioTracker = () => {
  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h5" gutterBottom>
        AI-Powered Portfolio Tracker
      </Typography>
      <Typography variant="body1" sx={{ mb: 2 }}>
        Monitor your XRPL assets with real-time analytics and AI insights.
      </Typography>
      <Divider sx={{ mb: 2 }} />
      <Grid container spacing={2}>
        {samplePortfolio.map((item, index) => (
          <Grid item xs={12} sm={4} key={index}>
            <motion.div
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.3 }}
            >
              <Card sx={{ p: 2, bgcolor: 'background.paper', borderRadius: 2 }}>
                <CardContent>
                  <Typography variant="h6">{item.asset}</Typography>
                  <Typography variant="body2">Value: {item.value}</Typography>
                  <Typography variant="body2">Change: {item.change}</Typography>
                </CardContent>
              </Card>
            </motion.div>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default PortfolioTracker;
