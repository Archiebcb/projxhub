// src/games/SpaceInvadersGame.js
import React, { useRef, useEffect, useState } from 'react';
import GameWrapper from '../components/GameWrapper';

const SpaceInvadersGame = () => {
  const canvasRef = useRef(null);
  const [gameOver, setGameOver] = useState(false);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const width = canvas.width, height = canvas.height;
    
    let player = { x: width / 2 - 15, y: height - 30, width: 30, height: 20, speed: 5 };
    let bullets = [];
    let enemies = [];
    const enemyRows = 3, enemyCols = 6, enemyWidth = 30, enemyHeight = 20;
    const enemyPadding = 10, enemyOffsetTop = 30, enemyOffsetLeft = 30;
    let enemyDirection = 1;
    
    // Create enemy array
    for (let r = 0; r < enemyRows; r++) {
      for (let c = 0; c < enemyCols; c++) {
        enemies.push({
          x: enemyOffsetLeft + c * (enemyWidth + enemyPadding),
          y: enemyOffsetTop + r * (enemyHeight + enemyPadding),
          width: enemyWidth,
          height: enemyHeight,
          alive: true
        });
      }
    }
    
    let rightPressed = false, leftPressed = false, spacePressed = false;
    
    const keyDownHandler = (e) => {
      if (e.key === "ArrowRight") rightPressed = true;
      else if (e.key === "ArrowLeft") leftPressed = true;
      else if (e.key === " ") spacePressed = true;
    };
    
    const keyUpHandler = (e) => {
      if (e.key === "ArrowRight") rightPressed = false;
      else if (e.key === "ArrowLeft") leftPressed = false;
      else if (e.key === " ") spacePressed = false;
    };
    
    document.addEventListener("keydown", keyDownHandler);
    document.addEventListener("keyup", keyUpHandler);
    
    const update = () => {
      if (rightPressed && player.x < width - player.width) player.x += player.speed;
      if (leftPressed && player.x > 0) player.x -= player.speed;
      
      if (spacePressed) {
        bullets.push({ x: player.x + player.width / 2 - 2, y: player.y, width: 4, height: 10, speed: 7 });
      }
      
      bullets = bullets.filter(b => b.y + b.height > 0);
      bullets.forEach(b => b.y -= b.speed);
      
      let changeDir = false;
      enemies.forEach(enemy => {
        if (enemy.alive) {
          enemy.x += enemyDirection;
          if (enemy.x <= 0 || enemy.x + enemy.width >= width) changeDir = true;
        }
      });
      if (changeDir) {
        enemyDirection = -enemyDirection;
        enemies.forEach(enemy => {
          enemy.y += 10;
          if (enemy.y + enemy.height > player.y) {
            setGameOver(true);
          }
        });
      }
      
      bullets.forEach(bullet => {
        enemies.forEach(enemy => {
          if (enemy.alive &&
              bullet.x < enemy.x + enemy.width &&
              bullet.x + bullet.width > enemy.x &&
              bullet.y < enemy.y + enemy.height &&
              bullet.y + bullet.height > enemy.y) {
            enemy.alive = false;
          }
        });
      });
    };
    
    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      // Draw player
      ctx.fillStyle = "green";
      ctx.fillRect(player.x, player.y, player.width, player.height);
      
      // Draw bullets
      ctx.fillStyle = "red";
      bullets.forEach(bullet => {
        ctx.fillRect(bullet.x, bullet.y, bullet.width, bullet.height);
      });
      
      // Draw enemies
      ctx.fillStyle = "blue";
      enemies.forEach(enemy => {
        if (enemy.alive) {
          ctx.fillRect(enemy.x, enemy.y, enemy.width, enemy.height);
        }
      });
      
      if(gameOver) {
        ctx.font = "30px Arial";
        ctx.fillStyle = "white";
        ctx.fillText("Game Over", width/2 - 70, height/2);
      }
    };
    
    const gameLoop = () => {
      if(!gameOver) update();
      draw();
      requestAnimationFrame(gameLoop);
    };
    
    gameLoop();
    
    return () => {
      document.removeEventListener("keydown", keyDownHandler);
      document.removeEventListener("keyup", keyUpHandler);
    };
  }, []);
  
  return (
    <GameWrapper>
      <canvas ref={canvasRef} width={600} height={400} style={{ border: "1px solid #fff" }} />
    </GameWrapper>
  );
};

export default SpaceInvadersGame;
