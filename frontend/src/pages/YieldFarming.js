// frontend/src/pages/YieldFarming.js
import React from 'react';
import { Container, Card, CardContent, Typography, Divider, LinearProgress } from '@mui/material';
import { motion } from 'framer-motion';

const sampleVaults = [
  { name: 'Vault A', deposited: 1000, yield: '15%' },
  { name: 'Vault B', deposited: 500, yield: '20%' },
  { name: 'Vault C', deposited: 2000, yield: '10%' },
];

const YieldFarming = () => {
  return (
    <Container sx={{ mt: 4 }}>
      <Card sx={{ p: 2, borderRadius: 2, bgcolor: 'background.paper' }}>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            Automated Yield Farming & Vaults
          </Typography>
          <Typography variant="body1" sx={{ mb: 2 }}>
            Monitor your vaults and optimize yields using AI-driven strategies.
          </Typography>
          <Divider sx={{ mb: 2 }} />
          {sampleVaults.map((vault, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.3 }}
            >
              <Typography variant="h6">{vault.name}</Typography>
              <Typography variant="body2">Deposited: {vault.deposited} tokens</Typography>
              <Typography variant="body2">Yield: {vault.yield}</Typography>
              <LinearProgress
                variant="determinate"
                value={(vault.deposited / 2000) * 100}
                sx={{ my: 1 }}
              />
            </motion.div>
          ))}
        </CardContent>
      </Card>
    </Container>
  );
};

export default YieldFarming;
