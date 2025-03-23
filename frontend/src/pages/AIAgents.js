// frontend/src/pages/AIAgents.js
import React from 'react';
import { Container, Grid, Card, CardContent, Typography, Button } from '@mui/material';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import DeleteSweepIcon from '@mui/icons-material/DeleteSweep';
import ConstructionIcon from '@mui/icons-material/Construction';
import GavelIcon from '@mui/icons-material/Gavel';
import CreateIcon from '@mui/icons-material/Create';

const agents = [
  {
    name: 'ELLIOT',
    description: 'Performs a full Elliott Wave breakdown and technical analysis.',
    path: '/elliot-agent',
    icon: <SmartToyIcon fontSize="large" />,
  },
  {
    name: 'Bridgette',
    description: 'Bridges anything to anything, finding optimal quotes and earning fees.',
    path: '/bridgette-agent',
    icon: <SwapHorizIcon fontSize="large" />,
  },
  {
    name: 'Wasteman',
    description: 'Analyzes any wallet to find bad trades or inefficiencies in portfolios.',
    path: '/wasteman-agent',
    icon: <DeleteSweepIcon fontSize="large" />,
  },
  {
    name: 'Bob the Builder',
    description: 'Helps bring any project idea to life with AI-driven building strategies.',
    path: '/bob-agent',
    icon: <ConstructionIcon fontSize="large" />,
  },
  {
    name: 'First Solicitor',
    description: 'Provides legal assistance to ensure compliance and readiness for launch.',
    path: '/first-solicitor-agent',
    icon: <GavelIcon fontSize="large" />,
  },
];

// Extra card for creating your own AI agent
const createAgentCard = {
  name: 'Create Your Own AI Agent',
  description: 'Leverage AI to build a custom agent. Download all the code for your personalized agent and integrate it on your website.',
  path: '/create-ai-agent', // New route for the custom agent builder
  icon: <CreateIcon fontSize="large" />,
};

const allAgents = [...agents, createAgentCard];

const AIAgents = () => {
  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        AI Agents
      </Typography>
      <Typography variant="body1" sx={{ mb: 3 }}>
        Select an AI assistant to perform advanced analysis, bridging, or building services.
      </Typography>
      <Grid container spacing={3}>
        {allAgents.map((agent, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card sx={{ p: 2, borderRadius: 2, bgcolor: 'background.paper', textAlign: 'center' }}>
                {agent.icon && <div style={{ marginBottom: 8 }}>{agent.icon}</div>}
                <CardContent>
                  <Typography variant="h6" color="primary" gutterBottom>
                    {agent.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    {agent.description}
                  </Typography>
                  <Button component={Link} to={agent.path} variant="contained" color="primary">
                    Launch
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default AIAgents;