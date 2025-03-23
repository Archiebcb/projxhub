// frontend/src/pages/TradingAssistant.js
import React from 'react';
import { Container, Card, CardContent, Typography, Divider, List, ListItem, ListItemText } from '@mui/material';
import { motion } from 'framer-motion';

const sampleSignals = [
  { time: '10:00 AM', signal: 'Buy XRP at $0.30' },
  { time: '10:05 AM', signal: 'Sell XRP at $0.32' },
  { time: '10:10 AM', signal: 'Hold position' },
];

const TradingAssistant = () => {
  return (
    <Container sx={{ mt: 4 }}>
      <Card sx={{ p: 2, borderRadius: 2, bgcolor: 'background.paper' }}>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            AI-Powered Trading Assistant
          </Typography>
          <Typography variant="body1" sx={{ mb: 2 }}>
            Get real-time market signals and predictions.
          </Typography>
          <Divider sx={{ mb: 2 }} />
          <List>
            {sampleSignals.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.3 }}
              >
                <ListItem>
                  <ListItemText primary={`${item.time} - ${item.signal}`} />
                </ListItem>
              </motion.div>
            ))}
          </List>
        </CardContent>
      </Card>
    </Container>
  );
};

export default TradingAssistant;
