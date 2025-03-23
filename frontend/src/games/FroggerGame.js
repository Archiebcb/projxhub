// src/games/FroggerGame.js
import React, { useRef, useEffect, useState } from 'react';
import GameWrapper from '../components/GameWrapper';

const FroggerGame = () => {
  const canvasRef = useRef(null);
  const [gameOver, setGameOver] = useState(false);
  let frog = { x: 280, y: 380, width: 20, height: 20, speed: 20 };
  let cars = [];
  
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const cw = canvas.width, ch = canvas.height;
    
    // Create cars on 3 lanes
    for(let i = 0; i < 3; i++){
      cars.push({
        x: Math.random() * cw,
        y: 100 + i * 80,
        width: 50,
        height: 20,
        speed: 2 + i
      });
    }
    
    const handleKeyDown = (e) => {
      if(e.key === "ArrowUp") frog.y -= frog.speed;
      else if(e.key === "ArrowDown") frog.y += frog.speed;
      else if(e.key === "ArrowLeft") frog.x -= frog.speed;
      else if(e.key === "ArrowRight") frog.x += frog.speed;
    };
    
    document.addEventListener("keydown", handleKeyDown);
    
    const update = () => {
      cars.forEach(car => {
        car.x += car.speed;
        if(car.x > cw) car.x = -car.width;
      });
      
      cars.forEach(car => {
        if(
          frog.x < car.x + car.width &&
          frog.x + frog.width > car.x &&
          frog.y < car.y + car.height &&
          frog.y + frog.height > car.y
        ) {
          setGameOver(true);
        }
      });
      
      if(frog.y < 0){
        alert("You win!");
        setGameOver(true);
      }
    };
    
    const draw = () => {
      ctx.clearRect(0, 0, cw, ch);
      ctx.fillStyle = "lime";
      ctx.fillRect(frog.x, frog.y, frog.width, frog.height);
      ctx.fillStyle = "red";
      cars.forEach(car => ctx.fillRect(car.x, car.y, car.width, car.height));
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

export default FroggerGame;
