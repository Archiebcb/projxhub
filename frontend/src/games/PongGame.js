// src/games/PongGame.js
import React, { useRef, useEffect, useState } from 'react';
import GameWrapper from '../components/GameWrapper';

const PongGame = () => {
  const canvasRef = useRef(null);
  const [gameOver, setGameOver] = useState(false);
  const canvasWidth = 600;
  const canvasHeight = 400;
  const paddleWidth = 10;
  const paddleHeight = 80;
  // Use refs for mutable values that change during gameplay:
  const leftPaddleY = useRef(160);
  const rightPaddleY = useRef(160);
  const ballX = useRef(canvasWidth / 2);
  const ballY = useRef(canvasHeight / 2);
  const ballSpeedX = useRef(4);
  const ballSpeedY = useRef(2);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    const handleKeyDown = (e) => {
      if (e.key === 'w') {
        leftPaddleY.current = Math.max(0, leftPaddleY.current - 5);
      } else if (e.key === 's') {
        leftPaddleY.current = Math.min(canvasHeight - paddleHeight, leftPaddleY.current + 5);
      } else if (e.key === 'ArrowUp') {
        rightPaddleY.current = Math.max(0, rightPaddleY.current - 5);
      } else if (e.key === 'ArrowDown') {
        rightPaddleY.current = Math.min(canvasHeight - paddleHeight, rightPaddleY.current + 5);
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    const update = () => {
      ballX.current += ballSpeedX.current;
      ballY.current += ballSpeedY.current;

      // Bounce off top and bottom
      if (ballY.current - 10 < 0 || ballY.current + 10 > canvasHeight) {
        ballSpeedY.current = -ballSpeedY.current;
      }

      // Left paddle collision
      if (ballX.current - 10 < paddleWidth) {
        if (ballY.current > leftPaddleY.current && ballY.current < leftPaddleY.current + paddleHeight) {
          ballSpeedX.current = -ballSpeedX.current;
        } else {
          setGameOver(true);
        }
      }

      // Right paddle collision
      if (ballX.current + 10 > canvasWidth - paddleWidth) {
        if (ballY.current > rightPaddleY.current && ballY.current < rightPaddleY.current + paddleHeight) {
          ballSpeedX.current = -ballSpeedX.current;
        } else {
          setGameOver(true);
        }
      }
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvasWidth, canvasHeight);
      // Draw ball
      ctx.beginPath();
      ctx.arc(ballX.current, ballY.current, 10, 0, Math.PI * 2);
      ctx.fillStyle = 'white';
      ctx.fill();
      ctx.closePath();
      // Draw left paddle
      ctx.fillStyle = 'white';
      ctx.fillRect(0, leftPaddleY.current, paddleWidth, paddleHeight);
      // Draw right paddle
      ctx.fillRect(canvasWidth - paddleWidth, rightPaddleY.current, paddleWidth, paddleHeight);
      if (gameOver) {
        ctx.font = '30px Arial';
        ctx.fillStyle = 'red';
        ctx.fillText('Game Over', canvasWidth / 2 - 70, canvasHeight / 2);
      }
    };

    const gameLoop = () => {
      if (!gameOver) {
        update();
      }
      draw();
      requestAnimationFrame(gameLoop);
    };

    gameLoop();

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [gameOver]);

  return (
    <GameWrapper>
      {gameOver && <h2 style={{ color: 'red' }}>Game Over</h2>}
      <canvas
        ref={canvasRef}
        width={canvasWidth}
        height={canvasHeight}
        style={{ border: '1px solid white' }}
      />
    </GameWrapper>
  );
};

export default PongGame;
