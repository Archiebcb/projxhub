// frontend/src/pages/DraggableDashboard.js
import React from 'react';
import RGL, { WidthProvider } from 'react-grid-layout';
import TradingViewEmbed from '../components/TradingViewEmbed';
import BullBearScaleWeighing from '../components/BullBearScaleWeighing';
import AdvancedProfiles from './AdvancedProfiles';
import { Box, Typography, Grid, Card, CardContent, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { styled } from '@mui/material/styles';
import { motion } from 'framer-motion';

import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';

const ReactGridLayout = WidthProvider(RGL);

const StyledContainer = styled('div')(({ theme }) => ({
  background: 'linear-gradient(135deg, rgba(0,0,0,0.95), rgba(18,18,18,0.95))',
  padding: theme.spacing(2),
  minHeight: '100vh',
}));

// Example dashboard modules – you can expand or adjust these as needed.
const dashboardModules = [
  { title: 'Token Issuance', description: 'Manage token creation and distribution.' },
  { title: 'Social Media', description: 'Engage with a futuristic social platform.' },
  { title: 'Trading Assistant', description: 'Get real-time trading signals.' },
  { title: 'Yield Farming', description: 'Optimize yields with smart vaults.' },
  // ... add additional modules as needed
];

const CardItem = styled(Card)(({ theme }) => ({
  background: 'rgba(255, 255, 255, 0.05)',
  borderRadius: '16px',
  backdropFilter: 'blur(5px)',
  boxShadow: '0 4px 12px rgba(0,0,0,0.5)',
  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
  cursor: 'pointer',
  '&:hover': {
    transform: 'scale(1.03)',
    boxShadow: '0 6px 16px rgba(0,0,0,0.7)',
  },
}));

const DraggableDashboard = () => {
  // Layout for react-grid-layout. Adjust as needed.
  const layout = [
    { i: 'tradingView', x: 0, y: 0, w: 12, h: 10 },
    { i: 'bullBear', x: 0, y: 10, w: 6, h: 4 },
    { i: 'modules', x: 6, y: 10, w: 6, h: 10 },
    { i: 'advancedProfiles', x: 0, y: 14, w: 12, h: 6 },
  ];

  return (
    <StyledContainer>
      <Typography variant="h4" color="primary" align="center" gutterBottom>
        XRPL Everything Dashboard
      </Typography>
      
      <ReactGridLayout
        className="layout"
        layout={layout}
        cols={12}
        rowHeight={30}
        width={1200}
        draggableHandle=".drag-handle"
      >
        <div key="tradingView">
          <TradingViewEmbed />
        </div>
        <div key="bullBear">
          <BullBearScaleWeighing />
        </div>
        <div key="modules">
          <Grid container spacing={3}>
            {dashboardModules.map((module, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <CardItem className="drag-handle">
                    <CardContent>
                      <Typography variant="h6" color="primary" gutterBottom>
                        {module.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {module.description}
                      </Typography>
                    </CardContent>
                  </CardItem>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </div>
        <div key="advancedProfiles">
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
        </div>
      </ReactGridLayout>
    </StyledContainer>
  );
};

export default DraggableDashboard;
