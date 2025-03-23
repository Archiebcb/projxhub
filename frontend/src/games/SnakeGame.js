// src/games/SnakeGame.js
import React, { useEffect, useRef } from 'react';
import Phaser from 'phaser';

const SnakeGame = () => {
  const gameContainer = useRef(null);

  useEffect(() => {
    const config = {
      type: Phaser.AUTO,
      width: 400,
      height: 400,
      backgroundColor: '#000000',
      parent: gameContainer.current,
      scene: {
        preload,
        create,
        update
      }
    };

    let game = new Phaser.Game(config);
    let snake = [];
    let cursors;
    let food;
    let score = 0;
    let scoreText;
    let direction = 'right';

    function preload() {
      this.load.image('food', 'https://labs.phaser.io/assets/sprites/apple.png');
    }

    function create() {
      // Enable keyboard input – also add pointerdown listener to request focus.
      this.input.keyboard.enabled = true;
      this.input.on('pointerdown', () => {
        this.input.keyboard.enabled = true;
      });

      // Create snake head (starting with one block)
      const head = this.add.rectangle(200, 200, 16, 16, 0x00ff00);
      snake.push(head);

      cursors = this.input.keyboard.createCursorKeys();

      // Create food at a random position
      food = this.add.image(Phaser.Math.Between(20, 380), Phaser.Math.Between(20, 380), 'food').setScale(0.5);
      scoreText = this.add.text(10, 10, 'Score: 0', { fontSize: '16px', fill: '#ffffff' });

      this.time.addEvent({
        delay: 150,
        callback: moveSnake,
        callbackScope: this,
        loop: true
      });
    }

    function moveSnake() {
      // Determine direction based on keyboard input
      if (cursors.left.isDown && direction !== 'right') {
        direction = 'left';
      } else if (cursors.right.isDown && direction !== 'left') {
        direction = 'right';
      } else if (cursors.up.isDown && direction !== 'down') {
        direction = 'up';
      } else if (cursors.down.isDown && direction !== 'up') {
        direction = 'down';
      }

      // Calculate new head position
      let newX = snake[0].x;
      let newY = snake[0].y;
      if (direction === 'left') newX -= 16;
      if (direction === 'right') newX += 16;
      if (direction === 'up') newY -= 16;
      if (direction === 'down') newY += 16;

      // Wrap-around boundaries
      if (newX < 0) newX = config.width;
      if (newX > config.width) newX = 0;
      if (newY < 0) newY = config.height;
      if (newY > config.height) newY = 0;

      const newHead = this.add.rectangle(newX, newY, 16, 16, 0x00ff00);
      snake.unshift(newHead);

      // Check collision with food
      if (Phaser.Math.Distance.Between(newHead.x, newHead.y, food.x, food.y) < 16) {
        score += 10;
        scoreText.setText('Score: ' + score);
        // Move food to a new random position
        food.x = Phaser.Math.Between(20, 380);
        food.y = Phaser.Math.Between(20, 380);
      } else {
        // Remove the tail if no food is eaten
        const tail = snake.pop();
        tail.destroy();
      }
    }

    function update() {
      // Additional update logic (self-collision, etc.) can be added here.
    }

    return () => {
      game.destroy(true);
    };
  }, []);

  return <div ref={gameContainer} />;
};

export default SnakeGame;
