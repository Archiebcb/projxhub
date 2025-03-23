// frontend/src/pages/WalletDashboard.js
import React from 'react';
import { Container, Card, CardContent, Typography, Divider, List, ListItem, ListItemText } from '@mui/material';
import { motion } from 'framer-motion';

const sampleWallet = [
  { asset: 'XRP', balance: '5000' },
  { asset: 'Token A', balance: '1500' },
  { asset: 'NFT B', balance: '3' },
];

const WalletDashboard = () => {
  return (
    <Container sx={{ mt: 4 }}>
      <Card sx={{ p: 2, borderRadius: 2, bgcolor: 'background.paper' }}>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            Wallet Dashboard
          </Typography>
          <Typography variant="body1" sx={{ mb: 2 }}>
            Manage all your XRPL assets in one unified dashboard.
          </Typography>
          <Divider sx={{ mb: 2 }} />
          <List>
            {sampleWallet.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.2 }}
              >
                <ListItem>
                  <ListItemText primary={`${item.asset}: ${item.balance}`} />
                </ListItem>
              </motion.div>
            ))}
          </List>
        </CardContent>
      </Card>
    </Container>
  );
};

export default WalletDashboard;
