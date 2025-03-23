// src/games/BreakoutGame.js
import React, { useRef, useEffect } from 'react';
import GameWrapper from '../components/GameWrapper';

const BreakoutGame = () => {
  const canvasRef = useRef(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const cw = canvas.width;
    const ch = canvas.height;

    // Ball settings
    let ballX = cw / 2, ballY = ch - 30, ballRadius = 10;
    let dx = 2, dy = -2;
    
    // Paddle settings
    const paddleHeight = 10, paddleWidth = 75;
    let paddleX = (cw - paddleWidth) / 2;
    
    // Brick settings
    const brickRowCount = 3, brickColumnCount = 5;
    const brickWidth = 75, brickHeight = 20, brickPadding = 10;
    const brickOffsetTop = 30, brickOffsetLeft = 30;
    let bricks = [];
    for (let c = 0; c < brickColumnCount; c++) {
      bricks[c] = [];
      for (let r = 0; r < brickRowCount; r++) {
        bricks[c][r] = { x: 0, y: 0, status: 1 };
      }
    }
    
    // Control variables
    let rightPressed = false, leftPressed = false;
    document.addEventListener("keydown", (e) => {
      if (e.key === "Right" || e.key === "ArrowRight") rightPressed = true;
      else if (e.key === "Left" || e.key === "ArrowLeft") leftPressed = true;
    });
    document.addEventListener("keyup", (e) => {
      if (e.key === "Right" || e.key === "ArrowRight") rightPressed = false;
      else if (e.key === "Left" || e.key === "ArrowLeft") leftPressed = false;
    });
    
    const drawBricks = () => {
      for (let c = 0; c < brickColumnCount; c++) {
        for (let r = 0; r < brickRowCount; r++) {
          if (bricks[c][r].status === 1) {
            const brickX = c * (brickWidth + brickPadding) + brickOffsetLeft;
            const brickY = r * (brickHeight + brickPadding) + brickOffsetTop;
            bricks[c][r].x = brickX;
            bricks[c][r].y = brickY;
            ctx.beginPath();
            ctx.rect(brickX, brickY, brickWidth, brickHeight);
            ctx.fillStyle = "#0095DD";
            ctx.fill();
            ctx.closePath();
          }
        }
      }
    };
    
    const drawBall = () => {
      ctx.beginPath();
      ctx.arc(ballX, ballY, ballRadius, 0, Math.PI * 2);
      ctx.fillStyle = "#0095DD";
      ctx.fill();
      ctx.closePath();
    };
    
    const drawPaddle = () => {
      ctx.beginPath();
      ctx.rect(paddleX, ch - paddleHeight, paddleWidth, paddleHeight);
      ctx.fillStyle = "#0095DD";
      ctx.fill();
      ctx.closePath();
    };
    
    const collisionDetection = () => {
      for (let c = 0; c < brickColumnCount; c++) {
        for (let r = 0; r < brickRowCount; r++) {
          let b = bricks[c][r];
          if (b.status === 1) {
            if (
              ballX > b.x &&
              ballX < b.x + brickWidth &&
              ballY > b.y &&
              ballY < b.y + brickHeight
            ) {
              dy = -dy;
              b.status = 0;
            }
          }
        }
      }
    };
    
    const draw = () => {
      ctx.clearRect(0, 0, cw, ch);
      drawBricks();
      drawBall();
      drawPaddle();
      collisionDetection();
      
      // Bounce off walls
      if (ballX + dx > cw - ballRadius || ballX + dx < ballRadius) dx = -dx;
      if (ballY + dy < ballRadius) dy = -dy;
      else if (ballY + dy > ch - ballRadius) {
        if (ballX > paddleX && ballX < paddleX + paddleWidth) {
          dy = -dy;
        } else {
          // Game over
          document.location.reload();
        }
      }
      
      if (rightPressed && paddleX < cw - paddleWidth) paddleX += 7;
      else if (leftPressed && paddleX > 0) paddleX -= 7;
      
      ballX += dx;
      ballY += dy;
      requestAnimationFrame(draw);
    };
    
    draw();
    
    return () => {
      document.removeEventListener("keydown", () => {});
      document.removeEventListener("keyup", () => {});
    };
  }, []);
  
  return (
    <GameWrapper>
      <canvas ref={canvasRef} width={480} height={320} style={{ border: "1px solid #fff" }} />
    </GameWrapper>
  );
};

export default BreakoutGame;
