// src/games/MemoryGame.js
import React, { useState, useEffect } from 'react';
import GameWrapper from '../components/GameWrapper';
import { Box, Button, Typography } from '@mui/material';

const generateCards = () => {
  const cards = [];
  for (let i = 0; i < 8; i++) {
    cards.push({ id: i * 2, value: i, flipped: false, matched: false });
    cards.push({ id: i * 2 + 1, value: i, flipped: false, matched: false });
  }
  return shuffle(cards);
};

const shuffle = (array) => {
  let currentIndex = array.length, randomIndex;
  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
  }
  return array;
};

const MemoryGame = () => {
  const [cards, setCards] = useState(generateCards());
  const [firstCard, setFirstCard] = useState(null);
  const [secondCard, setSecondCard] = useState(null);
  const [disabled, setDisabled] = useState(false);

  useEffect(() => {
    if (firstCard && secondCard) {
      setDisabled(true);
      if (firstCard.value === secondCard.value) {
        setCards(prev =>
          prev.map(card =>
            card.value === firstCard.value ? { ...card, matched: true } : card
          )
        );
        resetTurn();
      } else {
        setTimeout(() => {
          setCards(prev =>
            prev.map(card =>
              card.id === firstCard.id || card.id === secondCard.id
                ? { ...card, flipped: false }
                : card
            )
          );
          resetTurn();
        }, 1000);
      }
    }
  }, [firstCard, secondCard]);

  const handleCardClick = (card) => {
    if (disabled || card.flipped || card.matched) return;
    setCards(prev =>
      prev.map(c => (c.id === card.id ? { ...c, flipped: true } : c))
    );
    if (!firstCard) {
      setFirstCard(card);
    } else if (!secondCard) {
      setSecondCard(card);
    }
  };

  const resetTurn = () => {
    setFirstCard(null);
    setSecondCard(null);
    setDisabled(false);
  };

  const allMatched = cards.every(card => card.matched);

  return (
    <GameWrapper>
      <Box sx={{ p: 2, textAlign: "center" }}>
        <Typography variant="h4" color="secondary" gutterBottom>
          Memory Game
        </Typography>
        {allMatched && (
          <Typography variant="h6" color="green" align="center">
            You Win!
          </Typography>
        )}
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: 2,
            mt: 2,
          }}
        >
          {cards.map((card) => (
            <Box
              key={card.id}
              sx={{
                width: 100,
                height: 100,
                backgroundColor: card.flipped || card.matched ? "#0095DD" : "#555",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                fontSize: "24px",
                color: "#fff",
              }}
              onClick={() => handleCardClick(card)}
            >
              {(card.flipped || card.matched) && card.value}
            </Box>
          ))}
        </Box>
        <Button variant="contained" color="secondary" sx={{ mt: 2 }} onClick={() => setCards(generateCards())}>
          Restart
        </Button>
      </Box>
    </GameWrapper>
  );
};

export default MemoryGame;
