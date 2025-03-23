import React, { useState } from 'react';
import { Container, Card, CardContent, Typography, Divider, TextField, Button, List, ListItem, ListItemText } from '@mui/material';
import { motion } from 'framer-motion';

const sampleChallenges = [
  { title: 'New DeFi Dapp Idea', description: 'Submit an innovative DeFi idea.', status: 'Open' },
  { title: 'NFT Art Challenge', description: 'Create a unique NFT art concept.', status: 'Closed' },
];

const InnovationChallenges = () => {
  const [submission, setSubmission] = useState('');
  const [challenges, setChallenges] = useState(sampleChallenges);

  const handleSubmit = () => {
    if (submission) {
      const newChallenge = {
        title: submission,
        description: 'User submitted challenge',
        status: 'Open',
      };
      setChallenges([...challenges, newChallenge]);
      setSubmission('');
    }
  };

  return (
    <Container sx={{ mt: 4 }}>
      <Card sx={{ p: 2, borderRadius: 2, bgcolor: 'background.paper' }}>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            AI-Driven Crowdsourced Innovation Challenges
          </Typography>
          <Typography variant="body1" sx={{ mb: 2 }}>
            Submit your innovative ideas for new dapps or features. Winners get funded and earn revenue shares.
          </Typography>
          <Divider sx={{ mb: 2 }} />
          <TextField
            label="Your Challenge Idea"
            variant="outlined"
            fullWidth
            value={submission}
            onChange={(e) => setSubmission(e.target.value)}
            sx={{ mb: 2 }}
          />
          <Button variant="contained" color="primary" onClick={handleSubmit}>
            Submit Idea
          </Button>
          <Divider sx={{ my: 2 }} />
          <Typography variant="h6">Current Challenges</Typography>
          <List>
            {challenges.map((challenge, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
              >
                <ListItem>
                  <ListItemText
                    primary={`${challenge.title} (${challenge.status})`}
                    secondary={challenge.description}
                  />
                </ListItem>
              </motion.div>
            ))}
          </List>
        </CardContent>
      </Card>
    </Container>
  );
};

export default InnovationChallenges;
