// src/games/FlappyBirdGame.js
import React, { useRef, useEffect, useState } from 'react';
import GameWrapper from '../components/GameWrapper';

const FlappyBirdGame = () => {
  const canvasRef = useRef(null);
  const [gameOver, setGameOver] = useState(false);
  const gravity = 0.5, jumpStrength = -8;
  let bird = { x: 50, y: 150, radius: 10, velocity: 0 };
  let pipes = [];
  const pipeGap = 100, pipeWidth = 40;
  let frameCount = 0;
  
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const cw = canvas.width, ch = canvas.height;
    
    const handleKeyDown = (e) => {
      if (e.code === "Space") {
        bird.velocity = jumpStrength;
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    
    const update = () => {
      bird.velocity += gravity;
      bird.y += bird.velocity;
      
      if(bird.y + bird.radius > ch || bird.y - bird.radius < 0) {
        setGameOver(true);
      }
      
      frameCount++;
      if(frameCount % 90 === 0) {
        const topHeight = Math.random() * (ch - pipeGap);
        pipes.push({ x: cw, top: topHeight, bottom: topHeight + pipeGap });
      }
      
      pipes.forEach(pipe => {
        pipe.x -= 2;
        if(
          bird.x + bird.radius > pipe.x &&
          bird.x - bird.radius < pipe.x + pipeWidth &&
          (bird.y - bird.radius < pipe.top || bird.y + bird.radius > pipe.bottom)
        ) {
          setGameOver(true);
        }
      });
      
      pipes = pipes.filter(pipe => pipe.x + pipeWidth > 0);
    };
    
    const draw = () => {
      ctx.clearRect(0, 0, cw, ch);
      // Draw bird
      ctx.beginPath();
      ctx.arc(bird.x, bird.y, bird.radius, 0, Math.PI * 2);
      ctx.fillStyle = "yellow";
      ctx.fill();
      ctx.closePath();
      
      // Draw pipes
      ctx.fillStyle = "green";
      pipes.forEach(pipe => {
        ctx.fillRect(pipe.x, 0, pipeWidth, pipe.top);
        ctx.fillRect(pipe.x, pipe.bottom, pipeWidth, ch - pipe.bottom);
      });
      
      if(gameOver) {
        ctx.font = "30px Arial";
        ctx.fillStyle = "white";
        ctx.fillText("Game Over", cw/2 - 70, ch/2);
      }
    };
    
    const gameLoop = () => {
      if(!gameOver) update();
      draw();
      requestAnimationFrame(gameLoop);
    };
    
    gameLoop();
    
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [gameOver]);
  
  return (
    <GameWrapper>
      <canvas ref={canvasRef} width={600} height={400} style={{ border: "1px solid #fff" }} />
    </GameWrapper>
  );
};

export default FlappyBirdGame;
