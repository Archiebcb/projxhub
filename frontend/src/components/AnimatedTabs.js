// src/components/AnimatedTabs.js
import React from 'react';
import { Tabs, Tab, Box } from '@mui/material';
import { motion } from 'framer-motion';

const MotionTab = motion.create(Tab);

const AnimatedTabs = ({ value, handleChange, tabs }) => {
  return (
    <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 2 }}>
      <Tabs value={value} onChange={handleChange} variant="scrollable" scrollButtons="auto">
        {tabs.map((tab, index) => (
          <MotionTab
            key={index}
            label={tab.label}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          />
        ))}
      </Tabs>
    </Box>
  );
};

export default AnimatedTabs;
