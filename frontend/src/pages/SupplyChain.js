// frontend/src/pages/SupplyChain.js
import React from 'react';
import { Container, Card, CardContent, Typography, Divider, List, ListItem, ListItemText } from '@mui/material';
import { motion } from 'framer-motion';

const sampleTracking = [
  { item: 'Product A', status: 'In Transit' },
  { item: 'Product B', status: 'Delivered' },
  { item: 'Product C', status: 'Pending' },
];

const SupplyChain = () => {
  return (
    <Container sx={{ mt: 4 }}>
      <Card sx={{ p: 2, borderRadius: 2, bgcolor: 'background.paper' }}>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            Supply Chain & Asset Tracking
          </Typography>
          <Typography variant="body1" sx={{ mb: 2 }}>
            Track the provenance and journey of real-world assets on XRPL.
          </Typography>
          <Divider sx={{ mb: 2 }} />
          <List>
            {sampleTracking.map((track, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.3 }}
              >
                <ListItem>
                  <ListItemText primary={`${track.item} - ${track.status}`} />
                </ListItem>
              </motion.div>
            ))}
          </List>
        </CardContent>
      </Card>
    </Container>
  );
};

export default SupplyChain;
