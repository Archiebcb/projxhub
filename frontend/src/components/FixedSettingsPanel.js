// src/components/FixedSettingsPanel.js
import React, { useState } from 'react';
import {
  Paper,
  Tabs,
  Tab,
  Box,
  Typography,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Slider,
  IconButton
} from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';
import CloseIcon from '@mui/icons-material/Close';

function TabPanel(props) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`settings-tabpanel-${index}`}
      aria-labelledby={`settings-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 2 }}>{children}</Box>}
    </div>
  );
}

const FixedSettingsPanel = () => {
  const [tabValue, setTabValue] = useState(0);
  const [expanded, setExpanded] = useState(false);

  // Profile state
  const [profileName, setProfileName] = useState('');
  const [profileEmail, setProfileEmail] = useState('');
  // Settings state
  const [language, setLanguage] = useState('en');
  const [fontSize, setFontSize] = useState(14);
  // Support state
  const [supportEmail, setSupportEmail] = useState('');
  const [supportMessage, setSupportMessage] = useState('');

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleSupportSubmit = () => {
    console.log('Support Request:', { supportEmail, supportMessage });
    alert('Your support request has been submitted. We will contact you soon!');
    setSupportEmail('');
    setSupportMessage('');
  };

  return (
    <>
      {/* Collapsed view: Only a settings cog icon */}
      {!expanded && (
        <Paper
          sx={{
            position: 'fixed',
            top: 16,
            right: 16,
            width: 56,
            height: 56,
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1500,
            cursor: 'pointer'
          }}
          elevation={4}
          onClick={() => setExpanded(true)}
        >
          <SettingsIcon sx={{ fontSize: 32, color: '#00e5ff' }} />
        </Paper>
      )}

      {/* Expanded view: Full settings panel */}
      {expanded && (
        <Paper
          sx={{
            position: 'fixed',
            top: 16,
            right: 16,
            width: 320,
            zIndex: 1500,
            borderRadius: 2,
            overflow: 'hidden',
            backgroundColor: '#002040' // Solid background (adjust as needed)
          }}
          elevation={4}
        >
          {/* Top bar with close button */}
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'flex-end',
              backgroundColor: '#002040',
              p: 1
            }}
          >
            <IconButton onClick={() => setExpanded(false)} size="small">
              <CloseIcon sx={{ color: '#00e5ff' }} />
            </IconButton>
          </Box>
          <Tabs value={tabValue} onChange={handleTabChange} variant="fullWidth">
            <Tab label="Profile" />
            <Tab label="Settings" />
            <Tab label="Support" />
          </Tabs>
          <TabPanel value={tabValue} index={0}>
            <Typography variant="h6">Profile</Typography>
            <TextField
              fullWidth
              label="Name"
              variant="outlined"
              size="small"
              value={profileName}
              onChange={(e) => setProfileName(e.target.value)}
              sx={{ my: 1 }}
            />
            <TextField
              fullWidth
              label="Email"
              variant="outlined"
              size="small"
              value={profileEmail}
              onChange={(e) => setProfileEmail(e.target.value)}
              sx={{ my: 1 }}
            />
            <Button variant="contained" fullWidth sx={{ mt: 1 }}>
              Save Profile
            </Button>
          </TabPanel>
          <TabPanel value={tabValue} index={1}>
            <Typography variant="h6">Settings</Typography>
            <FormControl fullWidth size="small" sx={{ my: 1 }}>
              <InputLabel>Language</InputLabel>
              <Select
                label="Language"
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
              >
                <MenuItem value="en">English</MenuItem>
                <MenuItem value="es">Spanish</MenuItem>
                <MenuItem value="fr">French</MenuItem>
                {/* Add additional languages as needed */}
              </Select>
            </FormControl>
            <Typography gutterBottom>Font Size</Typography>
            <Slider
              value={fontSize}
              onChange={(e, val) => setFontSize(val)}
              min={10}
              max={24}
              valueLabelDisplay="auto"
              sx={{ my: 1 }}
            />
            <Button variant="contained" fullWidth sx={{ mt: 1 }}>
              Save Settings
            </Button>
          </TabPanel>
          <TabPanel value={tabValue} index={2}>
            <Typography variant="h6">Support</Typography>
            <TextField
              fullWidth
              label="Your Email"
              variant="outlined"
              size="small"
              value={supportEmail}
              onChange={(e) => setSupportEmail(e.target.value)}
              sx={{ my: 1 }}
            />
            <TextField
              fullWidth
              label="Message"
              variant="outlined"
              size="small"
              multiline
              rows={3}
              value={supportMessage}
              onChange={(e) => setSupportMessage(e.target.value)}
              sx={{ my: 1 }}
            />
            <Button variant="contained" fullWidth onClick={handleSupportSubmit} sx={{ mt: 1 }}>
              Submit Request
            </Button>
          </TabPanel>
        </Paper>
      )}
    </>
  );
};

export default FixedSettingsPanel;