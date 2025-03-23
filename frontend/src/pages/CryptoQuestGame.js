// src/pages/CryptoQuestGame.js
import React, { useEffect, useRef } from 'react';
import Phaser from 'phaser';

//
// MenuScene: Preloads assets and displays a Start button.
//
class MenuScene extends Phaser.Scene {
  constructor() {
    super({ key: 'MenuScene' });
  }
  
  preload() {
    // Load assets from public/assets/ – filenames are case-sensitive.
    this.load.image('player', '/assets/player.png');
    this.load.image('ground', '/assets/ground.png');
    this.load.image('door', '/assets/door.png');
    this.load.image('obstacle', '/assets/obstacle.png');
    this.load.image('spike', '/assets/spike.png');
  }
  
  create() {
    this.add.text(100, 100, 'Crypto Quest', { fontSize: '48px', fill: '#fff' });
    const startButton = this.add.text(100, 200, 'Start', { fontSize: '32px', fill: '#0f0' }).setInteractive();
    startButton.on('pointerdown', () => {
      this.scene.start('LevelScene', { level: 1 });
    });
  }
}

//
// LevelScene: A platformer level with a longer floor and increasing hazards.
//
class LevelScene extends Phaser.Scene {
  constructor() {
    super({ key: 'LevelScene' });
  }
  
  init(data) {
    this.level = data.level || 1;
    // Decrease safe landing threshold as level increases (harder landing).
    this.safeThreshold = Math.max(10 - (this.level - 1), 3);
  }
  
  create() {
    // Set world bounds: 2400px wide, 600px high.
    this.physics.world.setBounds(0, 0, 2400, 600);
    this.cameras.main.setBounds(0, 0, 2400, 600);
    this.cameras.main.setBackgroundColor('#1d1d1d');
    
    // Create platforms group (the floor and floating platforms).
    this.platforms = this.physics.add.staticGroup();
    // Three ground segments with scaling (assuming ground.png is 128×32 scaled by 2 → 256×64).
    const ground1 = this.platforms.create(400, 584, 'ground').setScale(2);
    ground1.refreshBody();
    ground1.body.setSize(256, 64).setOffset(0, 0);
    const ground2 = this.platforms.create(1200, 584, 'ground').setScale(2);
    ground2.refreshBody();
    ground2.body.setSize(256, 64).setOffset(0, 0);
    const ground3 = this.platforms.create(2000, 584, 'ground').setScale(2);
    ground3.refreshBody();
    ground3.body.setSize(256, 64).setOffset(0, 0);
    
    // Optionally add a couple of floating platforms
    const float1 = this.platforms.create(600, 450, 'ground').setScale(2);
    float1.refreshBody();
    float1.body.setSize(256, 64).setOffset(0, 0);
    const float2 = this.platforms.create(50, 350, 'ground').setScale(2);
    float2.refreshBody();
    float2.body.setSize(256, 64).setOffset(0, 0);
    const float3 = this.platforms.create(750, 300, 'ground').setScale(2);
    float3.refreshBody();
    float3.body.setSize(256, 64).setOffset(0, 0);
    
    // Create obstacles group.
    this.obstacles = this.physics.add.staticGroup();
    // Increase number of obstacles with level: base 5 obstacles plus one per level, capped at 10.
    const numObstacles = Math.min(5 + this.level, 10);
    const startX = 600, endX = 2100;
    const spacing = (endX - startX) / (numObstacles - 1);
    let obstaclePositions = [];
    for (let i = 0; i < numObstacles; i++) {
      obstaclePositions.push(startX + i * spacing);
    }
    obstaclePositions.forEach((xPos) => {
      const obst = this.obstacles.create(xPos, 540, 'obstacle');
      // For a 32×32 obstacle, use a 16×16 collision box at bottom-center.
      obst.body.setSize(16, 16);
      obst.body.setOffset(8, 16);
    });
    
    // If level >= 3, add spikes for additional hazards.
    if (this.level >= 3) {
      this.spikes = this.physics.add.staticGroup();
      // Place spikes at predetermined positions. You can modify or randomize these.
      const spikePositions = [800, 1600];
      spikePositions.forEach((xPos) => {
        const sp = this.spikes.create(xPos, 550, 'spike');
        // Assume spike.png is 32×32; use default collision or adjust if needed.
      });
      // Collide with spikes: any contact resets level.
      this.physics.add.collider(this.player, this.spikes, this.hitSpike, null, this);
    }
    
    // Create the player sprite at a starting position.
    this.player = this.physics.add.sprite(100, 450, 'player');
    this.player.setBounce(0.1);
    this.player.setCollideWorldBounds(true);
    // Use default collision bounds for the player. (Adjust if needed later.)
    
    // Set up collisions.
    this.physics.add.collider(this.player, this.platforms);
    this.physics.add.collider(this.player, this.obstacles, this.hitObstacle, null, this);
    
    // Place the exit door near the far right.
    this.door = this.physics.add.sprite(2300, 520, 'door');
    this.door.body.setAllowGravity(false);
    this.door.setImmovable(true);
    this.physics.add.overlap(this.player, this.door, this.reachDoor, null, this);
    
    // Set up controls: arrow keys and space bar for jumping.
    this.cursors = this.input.keyboard.createCursorKeys();
    this.spaceBar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    
    // Display current level text.
    this.add.text(16, 16, `Level ${this.level}`, { fontSize: '32px', fill: '#fff' });
    
    // Camera follows the player.
    this.cameras.main.startFollow(this.player, true, 0.05, 0.05);
  }
  
  update() {
    // Horizontal movement.
    if (this.cursors.left.isDown) {
      this.player.setVelocityX(-160);
    } else if (this.cursors.right.isDown) {
      this.player.setVelocityX(160);
    } else {
      this.player.setVelocityX(0);
    }
    
    // Jump if up arrow or space is pressed and the player is on the ground.
    if (
      (this.cursors.up.isDown || this.spaceBar.isDown) &&
      (this.player.body.blocked.down || this.player.body.touching.down)
    ) {
      this.player.setVelocityY(-330);
    }
  }
  
  reachDoor(player, door) {
    this.scene.start('LevelCompleteScene', { level: this.level });
  }
  
  hitObstacle(player, obstacle) {
    const threshold = this.safeThreshold; // safe landing threshold decreases with level.
    const playerBottom = player.body.y + player.body.height;
    const obstacleTop = obstacle.body.y;
    // If the player's bottom is at or slightly above the obstacle's top, allow safe landing.
    if (playerBottom <= obstacleTop + threshold) {
      return;
    } else {
      this.scene.restart();
    }
  }
  
  hitSpike(player, spike) {
    // Hitting a spike restarts the level.
    this.scene.restart();
  }
}

//
// LevelCompleteScene: Displays level completion with Next, Save, and Exit options.
//
class LevelCompleteScene extends Phaser.Scene {
  constructor() {
    super({ key: 'LevelCompleteScene' });
  }
  
  init(data) {
    this.level = data.level || 1;
  }
  
  create() {
    this.add.text(100, 50, `Level ${this.level} Complete!`, { fontSize: '32px', fill: '#fff' });
    
    const nextButton = this.add.text(100, 150, 'Next Level', { fontSize: '24px', fill: '#0f0' }).setInteractive();
    nextButton.on('pointerdown', () => {
      if (this.level < 10) {
        this.scene.start('LevelScene', { level: this.level + 1 });
      } else {
        this.add.text(100, 250, 'Game Completed!', { fontSize: '24px', fill: '#ff0' });
      }
    });
    
    const saveButton = this.add.text(100, 200, 'Save', { fontSize: '24px', fill: '#0f0' }).setInteractive();
    saveButton.on('pointerdown', () => {
      console.log('Game saved at level', this.level);
      this.add.text(100, 300, 'Game Saved!', { fontSize: '24px', fill: '#0ff' });
    });
    
    const exitButton = this.add.text(100, 250, 'Exit', { fontSize: '24px', fill: '#0f0' }).setInteractive();
    exitButton.on('pointerdown', () => {
      this.scene.start('MenuScene');
    });
  }
}

//
// CryptoQuestGame Component: Initializes Phaser and mounts the game.
//
const CryptoQuestGame = () => {
  const gameContainer = useRef(null);
  
  useEffect(() => {
    const config = {
      type: Phaser.AUTO,
      width: 800,
      height: 600,
      parent: gameContainer.current,
      physics: {
        default: 'arcade',
        arcade: {
          gravity: { y: 300 },
          debug: true, // Enable debug mode to see collision boxes.
        },
      },
      audio: { noAudio: true },
      scene: [MenuScene, LevelScene, LevelCompleteScene],
    };
    
    const game = new Phaser.Game(config);
    
    return () => {
      game.destroy(true);
    };
  }, []);
  
  return <div ref={gameContainer} style={{ margin: '0 auto' }} />;
};

export default CryptoQuestGame;