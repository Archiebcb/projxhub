import React, { useState } from 'react';
import { Box, Typography, Button } from '@mui/material';
import SnakeGame from './SnakeGame';

const SnakeGameContainer = () => {
  const [gameStarted, setGameStarted] = useState(false);

  const handleStartGame = () => {
    setGameStarted(true);
  };

  return (
    <Box>
      {!gameStarted ? (
        <Box sx={{ textAlign: 'center', my: 4 }}>
          <Typography variant="h6" color="secondary" gutterBottom>
            Ready to Play Snake?
          </Typography>
          <Button variant="contained" color="secondary" onClick={handleStartGame}>
            Play
          </Button>
        </Box>
      ) : (
        <SnakeGame />
      )}
    </Box>
  );
};

export default SnakeGameContainer;
