// src/App.js
import React, { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Box, Container } from '@mui/material';

// Import your existing components and pages
import Sidebar from './components/Sidebar';
import MultiLingualButton from './components/MultiLingualButton';
import LoginCard from './components/LoginCard';

// Page components
import Dashboard from './pages/Dashboard';
import TokenIssuance from './pages/TokenIssuance';
import ProjxSocial from './pages/ProjxSocial';
import TradingAssistant from './pages/TradingAssistant';
import YieldFarming from './pages/YieldFarming';
import NFTCreator from './pages/NFTCreator';
import SentimentAnalyzer from './pages/SentimentAnalyzer';
import WalletDashboard from './pages/WalletDashboard';
import DeFiLending from './pages/DeFiLending';
import NFTMarketplace from './pages/NFTMarketplace';
import SupplyChain from './pages/SupplyChain';
import PredictionMarkets from './pages/PredictionMarkets';
// REMOVED PaymentServices
// REMOVED PaymentNetworks
import VoiceGestureControls from './pages/VoiceGestureControls';
import DashboardWidgets from './pages/DashboardWidgets';
import Crowdfunding from './pages/Crowdfunding';
import MusicStreaming from './pages/MusicStreaming';
import InnovationChallenges from './pages/InnovationChallenges';
import SocialTradingInfluencers from './pages/SocialTradingInfluencers';
import AIAgents from './pages/AIAgents';
import ElliotAgent from './pages/ElliotAgent';
import BridgetteAgent from './pages/BridgetteAgent';
import WastemanAgent from './pages/WastemanAgent';
import BobAgent from './pages/BobAgent';
import FirstSolicitorAgent from './pages/FirstSolicitorAgent';
import Xdex from './pages/xdex';
import XCasino from './pages/XCasino';
import Xstream from './pages/Xstream';
import XVault from './pages/XVault';
import DAIFComponent from './pages/DAIF';
import MakeAMeme from './pages/MakeAMeme';
import CreateAIAgent from './pages/CreateAIAgent';
import CreateGame from './pages/CreateGame';

// Game components
import SnakeGame from './games/SnakeGame';
import TetrisGame from './games/TetrisGame';
import PongGame from './games/PongGame';
import FroggerGame from './games/FroggerGame';
import SpaceInvadersGame from './games/SpaceInvadersGame';
import AsteroidsGame from './games/AsteroidsGame';
import SimonSaysGame from './games/SimonSaysGame';
import FlappyBirdGame from './games/FlappyBirdGame';
import BreakoutGame from './games/BreakoutGame';
import MemoryGame from './games/MemoryGame';

// NEW: Import the PROJX page
import Projx from './pages/Projx';
// NEW: Import the FixedSettingsPanel component
import FixedSettingsPanel from './components/FixedSettingsPanel';

function App() {
  // === Digital Rain Effect ===
  useEffect(() => {
    const canvas = document.getElementById('digitalRainCanvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const letters = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lettersArray = letters.split('');
    const fontSize = 16;
    const columns = canvas.width / fontSize;
    const drops = Array.from({ length: columns }).fill(1);
    function draw() {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = '#0F0';
      ctx.font = `${fontSize}px monospace`;
      for (let i = 0; i < drops.length; i++) {
        const text = lettersArray[Math.floor(Math.random() * lettersArray.length)];
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
    }
    const intervalId = setInterval(draw, 33);
    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return (
    <>
      <Box
        sx={{
          position: 'fixed',
          top: 0,
          left: 0,
          zIndex: -1,
          width: '100vw',
          height: '100vh',
          overflow: 'hidden',
          backgroundColor: '#000'
        }}
      >
        <canvas id="digitalRainCanvas" style={{ display: 'block' }} />
      </Box>
      <Box display="flex" sx={{ position: 'relative', zIndex: 1 }}>
        <Sidebar />
        <Box flexGrow={1} p={2}>
          <Routes>
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/token-issuance" element={<TokenIssuance />} />
            <Route path="/projx-social" element={<ProjxSocial />} />
            <Route path="/trading-assistant" element={<TradingAssistant />} />
            <Route path="/yield-farming" element={<YieldFarming />} />
            <Route path="/nft-creator" element={<NFTCreator />} />
            <Route path="/sentiment-analyzer" element={<SentimentAnalyzer />} />
            <Route path="/wallet" element={<WalletDashboard />} />
            <Route path="/defi-lending" element={<DeFiLending />} />
            <Route path="/nft-marketplace" element={<NFTMarketplace />} />
            <Route path="/supply-chain" element={<SupplyChain />} />
            <Route path="/prediction-markets" element={<PredictionMarkets />} />
            {/* REMOVED PaymentServices and PaymentNetworks */}
            <Route path="/voice-gesture-controls" element={<VoiceGestureControls />} />
            <Route path="/dashboard-widgets" element={<DashboardWidgets />} />
            <Route path="/crowdfunding" element={<Crowdfunding />} />
            <Route path="/music-streaming" element={<Xstream />} />
            <Route path="/innovation-challenges" element={<InnovationChallenges />} />
            <Route path="/social-trading-influencers" element={<SocialTradingInfluencers />} />
            <Route path="/ai-agents" element={<AIAgents />} />
            <Route path="/elliot-agent" element={<ElliotAgent />} />
            <Route path="/bridgette-agent" element={<BridgetteAgent />} />
            <Route path="/wasteman-agent" element={<WastemanAgent />} />
            <Route path="/bob-agent" element={<BobAgent />} />
            <Route path="/first-solicitor-agent" element={<FirstSolicitorAgent />} />
            <Route path="/xdex" element={<Xdex />} />
            <Route path="/x-casino" element={<XCasino />} />
            <Route path="/xstream" element={<Xstream />} />
            <Route path="/xvault" element={<XVault />} />
            <Route path="/daif" element={<DAIFComponent />} />
            <Route path="/create-ai-agent" element={<CreateAIAgent />} />
            <Route path="/create-game" element={<CreateGame />} />
            <Route path="/make-a-meme" element={<MakeAMeme />} />
            <Route path="/nft-creator" element={<NFTCreator />} />
            {/* Game Routes */}
            <Route path="/games/snake" element={<SnakeGame />} />
            <Route path="/games/tetris" element={<TetrisGame />} />
            <Route path="/games/pong" element={<PongGame />} />
            <Route path="/games/breakout" element={<BreakoutGame />} />
            <Route path="/games/space-invaders" element={<SpaceInvadersGame />} />
            <Route path="/games/flappy-bird" element={<FlappyBirdGame />} />
            <Route path="/games/frogger" element={<FroggerGame />} />
            <Route path="/games/asteroids" element={<AsteroidsGame />} />
            <Route path="/games/memory" element={<MemoryGame />} />
            <Route path="/games/simon-says" element={<SimonSaysGame />} />
            {/* NEW: Route for PROJX page */}
            <Route path="/projx" element={<Projx />} />
          </Routes>
          <Container sx={{ mt: 4 }}>
            <MultiLingualButton />
            <LoginCard />
          </Container>
        </Box>
        {/* Fixed Settings Panel in the Top Right */}
        <FixedSettingsPanel />
      </Box>
    </>
  );
}

export default App;