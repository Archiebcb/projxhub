// frontend/src/pages/Dashboard.js
import React from 'react';
import { Container, Box, Typography, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { styled } from '@mui/material/styles';

// Import your custom components
import TradingViewEmbed from '../components/TradingViewEmbed'; // Your live chart component
import BullBearScaleWeighing from '../components/BullBearScaleWeighing'; // Bull/Bear scale component
// NEW: Replace old SentimentAnalyzer with the updated XSenti component
import XSenti from './XSenti';
import AdvancedProfiles from './AdvancedProfiles'; // Advanced profiles section
import LoginCard from '../components/LoginCard'; // Login card component

// Styled container for a futuristic look
const StyledContainer = styled(Container)(({ theme }) => ({
  background: 'linear-gradient(135deg, rgba(0,0,0,0.95), rgba(18,18,18,0.95))',
  paddingTop: theme.spacing(4),
  paddingBottom: theme.spacing(4),
  minHeight: '100vh',
}));

const Dashboard = () => {
  return (
    <StyledContainer maxWidth="lg">
      <Typography variant="h4" color="primary" align="center" gutterBottom>
        XRPL Everything Dashboard
      </Typography>

      {/* Chart Section */}
      <Box sx={{ mb: 4 }}>
        <TradingViewEmbed />
      </Box>

      {/* Bull/Bear Scale Section */}
      <Box sx={{ mb: 4 }}>
        <BullBearScaleWeighing />
      </Box>

      {/* XSENTI Sentiment Analyzer Section */}
      <Box sx={{ mb: 4 }}>
        <XSenti />
      </Box>

      {/* Advanced Profiles Collapsible Section */}
      <Box sx={{ mb: 4 }}>
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="h6" color="primary">
              Advanced User Profiles
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <AdvancedProfiles />
          </AccordionDetails>
        </Accordion>
      </Box>

      {/* Login Card Section */}
      <Box sx={{ mt: 4 }}>
        <LoginCard />
      </Box>
    </StyledContainer>
  );
};

export default Dashboard;