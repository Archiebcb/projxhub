// src/pages/Projx.js
import React, { useState } from 'react';
import { Box, TextField, Button, Typography, FormControlLabel, Checkbox, Paper } from '@mui/material';

const Projx = () => {
  const [projectTitle, setProjectTitle] = useState('');
  const [projectDescription, setProjectDescription] = useState('');
  const [projectType, setProjectType] = useState('');
  const [platform, setPlatform] = useState('');
  const [crowdfunded, setCrowdfunded] = useState(false);
  const [investorPitch, setInvestorPitch] = useState('');
  const [starterCode, setStarterCode] = useState('');
  const [aiSuggestions, setAiSuggestions] = useState('');

  const generateStarterCode = async () => {
    // Simulate an API call to generate starter code and AI suggestions based on inputs.
    // This is just a placeholder.
    const code = `// Starter code for "${projectTitle}"\n// Project Type: ${projectType}\n// Target Platform: ${platform}\n\nfunction initProject() {\n  console.log("Project started!");\n}\n`;
    setStarterCode(code);
    setAiSuggestions('AI Suggestion: Consider integrating XRPL for secure transactions and smart contracts.');
  };

  const downloadStarterCode = () => {
    if (!starterCode) return;
    const blob = new Blob([starterCode], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${projectTitle || 'starter-code'}.js`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <Box p={2}>
      <Typography variant="h4" gutterBottom>
        PROJX - AI Project Partner
      </Typography>
      <Paper style={{ padding: '1rem', marginBottom: '1rem' }}>
        <Typography variant="h6" gutterBottom>
          Project Details
        </Typography>
        <TextField
          fullWidth
          label="Project Title"
          value={projectTitle}
          onChange={(e) => setProjectTitle(e.target.value)}
          margin="normal"
        />
        <TextField
          fullWidth
          label="Project Description"
          value={projectDescription}
          onChange={(e) => setProjectDescription(e.target.value)}
          margin="normal"
          multiline
          rows={3}
        />
        <TextField
          fullWidth
          label="Project Type (e.g., website, dapp, etc.)"
          value={projectType}
          onChange={(e) => setProjectType(e.target.value)}
          margin="normal"
        />
        <TextField
          fullWidth
          label="Target Platforms/Software (e.g., React, XRPL, etc.)"
          value={platform}
          onChange={(e) => setPlatform(e.target.value)}
          margin="normal"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={crowdfunded}
              onChange={(e) => setCrowdfunded(e.target.checked)}
            />
          }
          label="Include Crowdfunding"
        />
        {crowdfunded && (
          <TextField
            fullWidth
            label="Describe your project for potential investors"
            value={investorPitch}
            onChange={(e) => setInvestorPitch(e.target.value)}
            margin="normal"
            multiline
            rows={3}
          />
        )}
      </Paper>
      <Box mb={2}>
        <Button variant="contained" onClick={generateStarterCode}>
          Generate Starter Code & AI Suggestions
        </Button>
      </Box>
      {aiSuggestions && (
        <Paper style={{ padding: '1rem', marginBottom: '1rem' }}>
          <Typography variant="subtitle1" gutterBottom>
            AI Suggestions:
          </Typography>
          <Typography variant="body1">{aiSuggestions}</Typography>
        </Paper>
      )}
      {starterCode && (
        <Paper style={{ padding: '1rem', marginBottom: '1rem' }}>
          <Typography variant="subtitle1" gutterBottom>
            Starter Code:
          </Typography>
          <pre style={{ whiteSpace: 'pre-wrap' }}>{starterCode}</pre>
        </Paper>
      )}
      {starterCode && (
        <Button variant="outlined" onClick={downloadStarterCode}>
          Download Starter Code
        </Button>
      )}
    </Box>
  );
};

export default Projx;