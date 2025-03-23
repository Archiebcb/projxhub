// frontend/src/pages/SocialFi.js
import React from 'react';
import { Container, Card, CardContent, Typography, Divider, List, ListItem, ListItemText, Avatar } from '@mui/material';
import { motion } from 'framer-motion';

const samplePosts = [
  { user: 'Alice', content: 'Loving the XRPL ecosystem!', tokens: '+10' },
  { user: 'Bob', content: 'New NFT drop coming soon!', tokens: '+15' },
  { user: 'Carol', content: 'Yield farming is amazing!', tokens: '+20' },
];

const SocialFi = () => {
  return (
    <Container sx={{ mt: 4 }}>
      <Card sx={{ p: 2, borderRadius: 2, bgcolor: 'background.paper' }}>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            SocialFi & Tokenized Engagement
          </Typography>
          <Typography variant="body1" sx={{ mb: 2 }}>
            Engage with content and earn tokens.
          </Typography>
          <Divider sx={{ mb: 2 }} />
          <List>
            {samplePosts.map((post, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.3 }}
              >
                <ListItem alignItems="flex-start">
                  <Avatar>{post.user[0]}</Avatar>
                  <ListItemText
                    primary={`${post.user} - ${post.tokens} tokens`}
                    secondary={post.content}
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

export default SocialFi;
