// src/components/GameThumbnail.js
import React from 'react';

const GameThumbnail = ({ gameName }) => {
  // These keys match your file names in public/images/
  // and the titles from your classicGames array.
  const gameImages = {
    'snake': '/images/snake.png',
    'tetris': '/images/tetris.png',
    'pong': '/images/pong.png',
    'breakout': '/images/breakout.png',
    'flappy bird': '/images/flappy.png',
    'frogger': '/images/frogger.png',
    'space invaders': '/images/space.png',
    'asteroids': '/images/asteroids.png',
    'memory game': '/images/memory.png',
    'simon says': '/images/simon.png',
  };

  // Convert the passed title to lowercase and use it as a key
  const imageSrc = gameImages[gameName.toLowerCase()] || '/images/default.png';

  return (
    <img
      src={imageSrc}
      alt={`${gameName} thumbnail`}
      style={{ width: '100%', height: 'auto' }}
    />
  );
};

export default GameThumbnail;