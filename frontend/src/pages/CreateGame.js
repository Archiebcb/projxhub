// frontend/src/pages/CreateGame.js
import React, { useState } from 'react';
import { Container, Typography, TextField, Button, Box, Grid, Paper, FormGroup, FormControlLabel, Checkbox } from '@mui/material';

const availableFeatures = [
  { id: '2d', label: '2D' },
  { id: '3d', label: '3D' },
  { id: 'multiplayer', label: 'Multiplayer' },
  { id: 'singlePlayer', label: 'Single Player' },
  { id: 'arcade', label: 'Arcade' },
  { id: 'puzzle', label: 'Puzzle' },
  { id: 'physics', label: 'Physics Engine' },
];

const availableIntegrations = [
  { id: 'phaser', label: 'Phaser Framework' },
  { id: 'threejs', label: 'Three.js' },
  { id: 'customEngine', label: 'Custom Engine' },
];

const CreateGame = () => {
  // Basic game info
  const [gameName, setGameName] = useState('');
  const [gameGenre, setGameGenre] = useState('');
  const [gameDescription, setGameDescription] = useState('');

  // Feature and integration selections
  const [selectedFeatures, setSelectedFeatures] = useState([]);
  const [selectedIntegrations, setSelectedIntegrations] = useState([]);

  // Generated code preview and copy state
  const [generatedCode, setGeneratedCode] = useState('');
  const [copied, setCopied] = useState(false);

  // Handle feature checkbox changes
  const handleFeatureChange = (event) => {
    const { name, checked } = event.target;
    setSelectedFeatures(prev =>
      checked ? [...prev, name] : prev.filter(f => f !== name)
    );
  };

  // Handle integration checkbox changes
  const handleIntegrationChange = (event) => {
    const { name, checked } = event.target;
    setSelectedIntegrations(prev =>
      checked ? [...prev, name] : prev.filter(i => i !== name)
    );
  };

  // Generate game starter code template
  const generateCode = () => {
    const className = gameName.replace(/\s+/g, '') || 'MyGame';
    const featureModules = selectedFeatures.map(feature => {
      switch (feature) {
        case '2d':
          return `// 2D Game module: set up a 2D canvas and basic sprite handling
function init2DCanvas() {
  const canvas = document.getElementById('gameCanvas');
  const ctx = canvas.getContext('2d');
  console.log("2D Canvas initialized");
}`;
        case '3d':
          return `// 3D Game module: initialize Three.js scene
function init3DScene() {
  // Initialize your Three.js scene here...
  console.log("3D Scene initialized");
}`;
        case 'multiplayer':
          return `// Multiplayer module: handle network communication
function setupMultiplayer() {
  // Setup WebSocket connections or use a multiplayer framework...
  console.log("Multiplayer setup complete");
}`;
        case 'singlePlayer':
          return `// Single Player module: basic game loop for single-player mode
function startSinglePlayer() {
  console.log("Single Player mode started");
}`;
        case 'arcade':
          return `// Arcade module: implement arcade-style scoring and mechanics
function initArcadeMode() {
  console.log("Arcade mode initialized");
}`;
        case 'puzzle':
          return `// Puzzle module: configure puzzle mechanics and level generation
function initPuzzleGame() {
  console.log("Puzzle game initialized");
}`;
        case 'physics':
          return `// Physics Engine module: integrate physics calculations (e.g., using Matter.js)
function initPhysics() {
  console.log("Physics engine initialized");
}`;
        default:
          return '';
      }
    }).join('\n\n');

    const integrationModules = selectedIntegrations.map(integration => {
      switch (integration) {
        case 'phaser':
          return `// Phaser integration: Initialize Phaser game instance
function initPhaserGame() {
  console.log("Phaser game initialized");
}`;
        case 'threejs':
          return `// Three.js integration: Set up Three.js renderer and camera
function initThreeJS() {
  console.log("Three.js initialized");
}`;
        case 'customEngine':
          return `// Custom Engine: Initialize your custom game engine logic
function initCustomEngine() {
  console.log("Custom game engine initialized");
}`;
        default:
          return '';
      }
    }).join('\n\n');

    const code = `/**
 * ${gameName || 'My Game'}
 * Genre: ${gameGenre}
 * Description: ${gameDescription}
 *
 * Selected Features:
 * - ${selectedFeatures.join('\n * - ')}
 *
 * Integrations:
 * - ${selectedIntegrations.join('\n * - ')}
 */

${featureModules}

${integrationModules}

// Main Game Class
class ${className} {
  constructor() {
    this.name = "${gameName}";
    this.genre = "${gameGenre}";
    this.description = "${gameDescription}";
    // Initialize game modules as needed
  }

  init() {
    // Initialize the game canvas or scene
    console.log("Initializing game:", this.name);
    ${selectedFeatures.includes('2d') ? 'init2DCanvas();' : ''}
    ${selectedFeatures.includes('3d') ? 'init3DScene();' : ''}
    ${selectedIntegrations.includes('phaser') ? 'initPhaserGame();' : ''}
    ${selectedIntegrations.includes('threejs') ? 'initThreeJS();' : ''}
    ${selectedIntegrations.includes('customEngine') ? 'initCustomEngine();' : ''}
  }

  start() {
    console.log("Starting game loop for", this.name);
    // Start game loop
    // For example, using requestAnimationFrame:
    const gameLoop = () => {
      this.update();
      this.render();
      requestAnimationFrame(gameLoop);
    };
    gameLoop();
  }

  update() {
    // Update game logic
  }

  render() {
    // Render game on the canvas or 3D scene
  }
}

// Example usage: instantiate and start the game when the window loads
window.onload = function() {
  const game = new ${className}();
  game.init();
  game.start();
};
`;
    setGeneratedCode(code);
  };

  // Download generated code using native Blob API
  const downloadCode = () => {
    const blob = new Blob([generatedCode], { type: 'text/javascript;charset=utf-8' });
    const fileName = `${gameName.replace(/\s+/g, '_') || 'game'}.js`;
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = fileName;
    link.click();
  };

  // Copy code to clipboard using Clipboard API
  const copyCodeToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(generatedCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Create Your Own Game
      </Typography>
      <Typography variant="body1" gutterBottom>
        Use the form below to build starter code for your game. Customize details and select features
        and integrations, then generate and download the code.
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Game Name"
            variant="outlined"
            fullWidth
            value={gameName}
            onChange={(e) => setGameName(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Game Genre"
            variant="outlined"
            fullWidth
            placeholder="e.g. Arcade, Puzzle, RPG"
            value={gameGenre}
            onChange={(e) => setGameGenre(e.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Game Description"
            variant="outlined"
            fullWidth
            multiline
            rows={4}
            value={gameDescription}
            onChange={(e) => setGameDescription(e.target.value)}
          />
        </Grid>
      </Grid>

      <Box mt={4}>
        <Typography variant="h6">Select Game Features:</Typography>
        <FormGroup row>
          {availableFeatures.map((feature) => (
            <FormControlLabel
              key={feature.id}
              control={
                <Checkbox
                  name={feature.id}
                  onChange={handleFeatureChange}
                  checked={selectedFeatures.includes(feature.id)}
                />
              }
              label={feature.label}
            />
          ))}
        </FormGroup>
      </Box>

      <Box mt={2}>
        <Typography variant="h6">Select Integrations:</Typography>
        <FormGroup row>
          {availableIntegrations.map((integration) => (
            <FormControlLabel
              key={integration.id}
              control={
                <Checkbox
                  name={integration.id}
                  onChange={handleIntegrationChange}
                  checked={selectedIntegrations.includes(integration.id)}
                />
              }
              label={integration.label}
            />
          ))}
        </FormGroup>
      </Box>

      <Box mt={4}>
        <Button variant="contained" color="primary" onClick={generateCode}>
          Generate Code
        </Button>
      </Box>

      {generatedCode && (
        <Box mt={4}>
          <Typography variant="h6">Generated Code Preview:</Typography>
          <Paper
            variant="outlined"
            sx={{
              p: 2,
              backgroundColor: '#f5f5f5',
              whiteSpace: 'pre-wrap',
              fontFamily: 'monospace',
            }}
          >
            {generatedCode}
          </Paper>
          <Box mt={2} display="flex" gap={2}>
            <Button variant="contained" color="secondary" onClick={downloadCode}>
              Download Code
            </Button>
            <Button variant="outlined" color="primary" onClick={copyCodeToClipboard}>
              {copied ? 'Copied!' : 'Copy to Clipboard'}
            </Button>
          </Box>
        </Box>
      )}
    </Container>
  );
};

export default CreateGame;