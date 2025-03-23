// frontend/src/pages/TokenIssuance.js
import React from 'react';
import { Container, Typography } from '@mui/material';

const TokenIssuance = () => {
  return (
    <Container sx={{ padding: 2 }}>
      <Typography variant="h4" gutterBottom>
        Token Issuance
      </Typography>
      <Typography variant="body1">
        This module will allow you to manage token creation, trust lines, and distribution.
        (Coming soon...)
      </Typography>
    </Container>
  );
};

export default TokenIssuance;
