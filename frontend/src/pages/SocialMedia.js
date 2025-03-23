// frontend/src/pages/SocialMedia.js
import React from 'react';
import { Container, Typography } from '@mui/material';

const SocialMedia = () => {
  return (
    <Container sx={{ padding: 2 }}>
      <Typography variant="h4" gutterBottom>
        Social Media with Tokenized Engagement
      </Typography>
      <Typography variant="body1">
        This module will let users create profiles, post content, and earn tokens for engagement.
        (Coming soon...)
      </Typography>
    </Container>
  );
};

export default SocialMedia;
