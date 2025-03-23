// frontend/src/pages/SentimentAnalyzer.js
import React from 'react';
import { Container, Card, CardContent, Typography, Divider, List, ListItem, ListItemText } from '@mui/material';
import { motion } from 'framer-motion';

const sampleSentiments = [
  { source: 'Twitter', sentiment: 'Positive', score: '75%' },
  { source: 'Reddit', sentiment: 'Neutral', score: '50%' },
  { source: 'News', sentiment: 'Negative', score: '30%' },
];

const SentimentAnalyzer = () => {
  return (
    <Container sx={{ mt: 4 }}>
      <Card sx={{ p: 2, borderRadius: 2, bgcolor: 'background.paper' }}>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            AI-Powered Sentiment Analyzer
          </Typography>
          <Typography variant="body1" sx={{ mb: 2 }}>
            Aggregate and analyze social sentiment across multiple sources.
          </Typography>
          <Divider sx={{ mb: 2 }} />
          <List>
            {sampleSentiments.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.3 }}
              >
                <ListItem>
                  <ListItemText primary={`${item.source}: ${item.sentiment} (${item.score})`} />
                </ListItem>
              </motion.div>
            ))}
          </List>
        </CardContent>
      </Card>
    </Container>
  );
};

export default SentimentAnalyzer;

