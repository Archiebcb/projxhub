// src/games/SimonSaysGame.js
import React, { useState, useEffect } from 'react';
import GameWrapper from '../components/GameWrapper';
import { Box, Button, Typography } from '@mui/material';

const colors = ["red", "green", "blue", "yellow"];

const SimonSaysGame = () => {
  const [sequence, setSequence] = useState([]);
  const [userInput, setUserInput] = useState([]);
  const [message, setMessage] = useState("Watch the sequence!");
  const [activeColor, setActiveColor] = useState(null);
  const [playingSequence, setPlayingSequence] = useState(false);
  
  useEffect(() => {
    startGame();
  }, []);
  
  const startGame = () => {
    const newSeq = [];
    for (let i = 0; i < 4; i++) {
      newSeq.push(colors[Math.floor(Math.random() * colors.length)]);
    }
    setSequence(newSeq);
    playSequence(newSeq);
    setUserInput([]);
  };
  
  const playSequence = (seq) => {
    setPlayingSequence(true);
    let i = 0;
    const interval = setInterval(() => {
      setActiveColor(seq[i]);
      setTimeout(() => {
        setActiveColor(null);
      }, 500);
      i++;
      if (i >= seq.length) {
        clearInterval(interval);
        setPlayingSequence(false);
        setMessage("Your turn!");
      }
    }, 1000);
  };
  
  const handleColorClick = (color) => {
    if (playingSequence) return;
    const newUserInput = [...userInput, color];
    setUserInput(newUserInput);
    if (sequence[newUserInput.length - 1] !== color) {
      setMessage("Wrong! Game Over.");
    } else if (newUserInput.length === sequence.length) {
      setMessage("Correct! You win!");
    }
  };
  
  return (
    <GameWrapper>
      <Box sx={{ p: 2, textAlign: "center" }}>
        <Typography variant="h4" color="secondary" gutterBottom>
          Simon Says
        </Typography>
        <Typography variant="body1" sx={{ mb: 2 }}>
          {message}
        </Typography>
        <Box sx={{ display: "flex", justifyContent: "center", gap: 2 }}>
          {colors.map((color) => (
            <Box
              key={color}
              onClick={() => handleColorClick(color)}
              sx={{
                width: 100,
                height: 100,
                backgroundColor: activeColor === color ? "white" : color,
                border: "2px solid #000",
                cursor: "pointer",
              }}
            />
          ))}
        </Box>
        <Button variant="contained" color="secondary" sx={{ mt: 2 }} onClick={startGame}>
          Restart
        </Button>
      </Box>
    </GameWrapper>
  );
};

export default SimonSaysGame;
