// src/components/GameWrapper.js
import React from 'react';
import { Box, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useNavigate } from 'react-router-dom';

const GameWrapper = ({ children }) => {
  const navigate = useNavigate();

  const handleExit = () => {
    navigate('/gaming-metaverse');
  };

  return (
    <Box position="relative" width="100%" height="100%">
      <IconButton
        onClick={handleExit}
        sx={{
          position: 'absolute',
          top: 10,
          right: 10,
          zIndex: 1000,
          color: 'white',
        }}
      >
        <CloseIcon />
      </IconButton>
      {children}
    </Box>
  );
};

export default GameWrapper;
