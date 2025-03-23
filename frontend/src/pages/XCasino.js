// src/pages/XCasino.js
import React, { useState } from 'react';
import { Container, Tabs, Tab, Box, Typography, Grid, Card, CardContent, Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { createGlobalStyle } from 'styled-components';
import GameThumbnail from '../components/GameThumbnail';
import CryptoQuestGame from './CryptoQuestGame'; // Import the advanced game

// Global styles for animations
const GlobalStyles = createGlobalStyle`
  @keyframes spin {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
`;

// Casino-themed container with a new color palette
const CasinoStyledContainer = styled(Container)(({ theme }) => ({
  background: 'linear-gradient(135deg, #000000, #1a1a2e, #e94560, #0f3460)', 
  backgroundBlendMode: 'overlay',
  minHeight: '100vh',
  color: '#fff',
  position: 'relative',
  padding: theme.spacing(4)
}));

// Animated Dart Board Component
const AnimatedDartBoard = styled('div')(({ theme }) => ({
  position: 'absolute',
  top: '15%',
  right: '5%',
  width: '150px',
  height: '150px',
  backgroundImage: 'url(/assets/dartboard.png)', // ensure this file exists in your public/assets folder
  backgroundSize: 'contain',
  backgroundRepeat: 'no-repeat',
  animation: 'spin 20s linear infinite',
  opacity: 0.6,
  zIndex: 0,
}));

const CasinoHeading = styled(Typography)(({ theme }) => ({
  fontFamily: '"Bebas Neue", cursive',
  fontSize: '3rem',
  textShadow: '2px 2px 8px rgba(0,0,0,0.7)',
  marginBottom: theme.spacing(4),
  position: 'relative',
  zIndex: 1 // Ensure heading is above the background animation
}));

const TabPanel = (props) => {
  const { children, value, index, ...other } = props;
  return (
    <div role="tabpanel" hidden={value !== index} {...other}>
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
};

function a11yProps(index) {
  return {
    id: `casino-tab-${index}`,
    'aria-controls': `casino-tabpanel-${index}`
  };
}

// Casino game card with neon glow effects
const CasinoGameCard = styled(Card)(({ theme }) => ({
  background: 'rgba(0,0,0,0.8)',
  borderRadius: '16px',
  backdropFilter: 'blur(10px)',
  boxShadow: '0 0 10px rgba(229,57,96,0.8)', // using a red tone for neon effect
  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
  cursor: 'pointer',
  border: '2px solid #e94560',
  '&:hover': {
    transform: 'scale(1.05)',
    boxShadow: '0 0 20px rgba(229,57,96,1)'
  },
  position: 'relative',
  zIndex: 1 // ensure cards appear above the animated background
}));

const classicGames = [
  { id: 1, title: 'Snake', route: '/games/snake' },
  { id: 2, title: 'Tetris', route: '/games/tetris' },
  { id: 3, title: 'Pong', route: '/games/pong' },
  { id: 4, title: 'Breakout', route: '/games/breakout' },
  { id: 5, title: 'Flappy Bird', route: '/games/flappy-bird' },
  { id: 6, title: 'Frogger', route: '/games/frogger' },
  { id: 7, title: 'Space Invaders', route: '/games/space-invaders' },
  { id: 8, title: 'Asteroids', route: '/games/asteroids' },
  { id: 9, title: 'Memory Game', route: '/games/memory' },
  { id: 10, title: 'Simon Says', route: '/games/simon-says' }
];

const XCasino = () => {
  const [tabValue, setTabValue] = useState(0);
  const navigate = useNavigate();

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handlePlayGame = (route) => {
    navigate(route);
  };

  // Function to navigate to the CreateGame page
  const handleCreateGame = () => {
    navigate('/create-game');
  };

  return (
    <>
      <GlobalStyles />
      <CasinoStyledContainer maxWidth="lg">
        {/* Animated Dart Board in the background */}
        <AnimatedDartBoard />
        <CasinoHeading variant="h4" align="center">
          Welcome to X Casino
        </CasinoHeading>
        <Tabs
          value={tabValue}
          onChange={handleTabChange}
          indicatorColor="secondary"
          textColor="inherit"
          centered
          sx={{ position: 'relative', zIndex: 1 }}
        >
          <Tab label="Advanced Gaming" {...a11yProps(0)} />
          <Tab label="Classic Games" {...a11yProps(1)} />
          <Tab label="Create a Game" {...a11yProps(2)} />
        </Tabs>

        {/* Advanced Gaming Tab: Render the Crypto Quest game */}
        <TabPanel value={tabValue} index={0}>
          <CryptoQuestGame />
        </TabPanel>

        <TabPanel value={tabValue} index={1}>
          <Typography variant="h6" color="secondary" gutterBottom>
            Classic Games
          </Typography>
          <Grid container spacing={3}>
            {classicGames.map((game) => (
              <Grid item xs={12} sm={6} md={4} key={game.id}>
                <motion.div whileHover={{ scale: 1.03 }} transition={{ duration: 0.3 }}>
                  <CasinoGameCard onClick={() => handlePlayGame(game.route)}>
                    {/* Display the game thumbnail */}
                    <GameThumbnail gameName={game.title} />
                    <CardContent>
                      <Typography variant="h6" color="secondary">
                        {game.title}
                      </Typography>
                      <Button variant="outlined" color="secondary" sx={{ mt: 2 }}>
                        Play
                      </Button>
                    </CardContent>
                  </CasinoGameCard>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </TabPanel>

        <TabPanel value={tabValue} index={2}>
          <Typography variant="body1" sx={{ mb: 2 }}>
            Create a Game Section – use our AI-assisted game builder to create your own game.
          </Typography>
          <Button variant="contained" color="primary" onClick={handleCreateGame}>
            Launch Game Builder
          </Button>
        </TabPanel>
      </CasinoStyledContainer>
    </>
  );
};

export default XCasino;