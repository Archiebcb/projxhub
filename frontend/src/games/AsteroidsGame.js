// src/games/AsteroidsGame.js
import React, { useRef, useEffect, useState } from 'react';
import GameWrapper from '../components/GameWrapper';

const AsteroidsGame = () => {
  const canvasRef = useRef(null);
  const [gameOver, setGameOver] = useState(false);
  let ship = { x: 300, y: 350, angle: 0, speed: 0 };
  let asteroids = [];
  
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const cw = canvas.width, ch = canvas.height;
    
    // Initialize asteroids
    for(let i = 0; i < 5; i++){
      asteroids.push({
        x: Math.random() * cw,
        y: Math.random() * ch / 2,
        radius: 20 + Math.random() * 30,
        speedX: Math.random() * 2 - 1,
        speedY: Math.random() * 2 - 1
      });
    }
    
    const keyDownHandler = (e) => {
      if(e.key === "ArrowLeft") ship.angle -= 0.1;
      else if(e.key === "ArrowRight") ship.angle += 0.1;
      else if(e.key === "ArrowUp") ship.speed = 2;
      else if(e.key === "ArrowDown") ship.speed = -2;
    };
    
    const keyUpHandler = (e) => {
      if(e.key === "ArrowUp" || e.key === "ArrowDown") ship.speed = 0;
    };
    
    document.addEventListener("keydown", keyDownHandler);
    document.addEventListener("keyup", keyUpHandler);
    
    const update = () => {
      ship.x += ship.speed * Math.cos(ship.angle);
      ship.y += ship.speed * Math.sin(ship.angle);
      if(ship.x < 0) ship.x = cw;
      else if(ship.x > cw) ship.x = 0;
      if(ship.y < 0) ship.y = ch;
      else if(ship.y > ch) ship.y = 0;
      
      asteroids.forEach(a => {
        a.x += a.speedX;
        a.y += a.speedY;
        if(a.x < 0) a.x = cw;
        else if(a.x > cw) a.x = 0;
        if(a.y < 0) a.y = ch;
        else if(a.y > ch) a.y = 0;
        
        const dx = ship.x - a.x;
        const dy = ship.y - a.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        if(distance < a.radius + 10) { // 10 ~ half ship width
          setGameOver(true);
        }
      });
    };
    
    const draw = () => {
      ctx.clearRect(0, 0, cw, ch);
      // Draw ship
      ctx.save();
      ctx.translate(ship.x, ship.y);
      ctx.rotate(ship.angle);
      ctx.beginPath();
      ctx.moveTo(15, 0);
      ctx.lineTo(-10, 10);
      ctx.lineTo(-10, -10);
      ctx.closePath();
      ctx.fillStyle = "white";
      ctx.fill();
      ctx.restore();
      
      // Draw asteroids
      ctx.fillStyle = "gray";
      asteroids.forEach(a => {
        ctx.beginPath();
        ctx.arc(a.x, a.y, a.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.closePath();
      });
      
      if(gameOver) {
        ctx.font = "30px Arial";
        ctx.fillStyle = "red";
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
      document.removeEventListener("keydown", keyDownHandler);
      document.removeEventListener("keyup", keyUpHandler);
    };
  }, [gameOver]);
  
  return (
    <GameWrapper>
      <canvas ref={canvasRef} width={600} height={400} style={{ border: "1px solid #fff" }} />
    </GameWrapper>
  );
};

export default AsteroidsGame;
