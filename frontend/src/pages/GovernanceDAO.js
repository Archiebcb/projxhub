// frontend/src/pages/GovernanceDAO.js
import React from 'react';
import { Container, Card, CardContent, Typography, Divider, List, ListItem, ListItemText, Button } from '@mui/material';
import { motion } from 'framer-motion';

const sampleProposals = [
  { title: 'Increase token supply', votes: '1200', status: 'Active' },
  { title: 'Integrate cross-chain bridge', votes: '800', status: 'Active' },
];

const GovernanceDAO = () => {
  return (
    <Container sx={{ mt: 4 }}>
      <Card sx={{ p: 2, borderRadius: 2, bgcolor: 'background.paper' }}>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            Decentralized Governance & DAO
          </Typography>
          <Typography variant="body1" sx={{ mb: 2 }}>
            Vote on key platform decisions and shape the future of XRPL.
          </Typography>
          <Divider sx={{ mb: 2 }} />
          <List>
            {sampleProposals.map((proposal, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.3 }}
              >
                <ListItem>
                  <ListItemText primary={`${proposal.title} - Votes: ${proposal.votes}`} secondary={`Status: ${proposal.status}`} />
                  <Button variant="contained" color="primary" size="small">
                    Vote
                  </Button>
                </ListItem>
              </motion.div>
            ))}
          </List>
        </CardContent>
      </Card>
    </Container>
  );
};

export default GovernanceDAO;
