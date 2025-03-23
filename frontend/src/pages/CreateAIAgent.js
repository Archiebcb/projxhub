// frontend/src/pages/CreateAIAgent.js
import React, { useState } from 'react';
import { Container, Typography, TextField, Button, Box, Grid, Paper, FormGroup, FormControlLabel, Checkbox } from '@mui/material';

const availableFeatures = [
  { id: 'technicalAnalysis', label: 'Technical Analysis' },
  { id: 'tradingSignals', label: 'Trading Signals' },
  { id: 'portfolioManagement', label: 'Portfolio Management' },
  { id: 'riskManagement', label: 'Risk Management' },
  { id: 'dataVisualization', label: 'Data Visualization' },
  { id: 'sentimentAnalysis', label: 'Sentiment Analysis' },
  { id: 'marketNews', label: 'Market News Aggregation' },
];

const availableIntegrations = [
  { id: 'coinGecko', label: 'CoinGecko API' },
  { id: 'dexScreener', label: 'Dex Screener Integration' },
  { id: 'historicalData', label: 'Historical Data API' },
  { id: 'realTimeStreaming', label: 'Real-Time Streaming' },
];

const CreateAIAgent = () => {
  // Basic agent info
  const [agentName, setAgentName] = useState('');
  const [agentType, setAgentType] = useState('');
  const [agentDescription, setAgentDescription] = useState('');

  // Feature selections
  const [selectedFeatures, setSelectedFeatures] = useState([]);
  const [selectedIntegrations, setSelectedIntegrations] = useState([]);

  // Generated code preview
  const [generatedCode, setGeneratedCode] = useState('');
  const [copied, setCopied] = useState(false);

  // Handle feature checkbox changes
  const handleFeatureChange = (event) => {
    const { name, checked } = event.target;
    setSelectedFeatures(prev =>
      checked ? [...prev, name] : prev.filter(f => f !== name)
    );
  };

  const handleIntegrationChange = (event) => {
    const { name, checked } = event.target;
    setSelectedIntegrations(prev =>
      checked ? [...prev, name] : prev.filter(i => i !== name)
    );
  };

  // Generate agent code based on user input
  const generateCode = () => {
    const className = agentName.replace(/\s+/g, '') || 'MyAgent';
    const featureModules = selectedFeatures.map(feature => {
      switch (feature) {
        case 'technicalAnalysis':
          return `// Module for technical analysis
function technicalAnalysis(data) {
  // Analyze price charts and patterns...
  console.log("Performing technical analysis...");
}`;
        case 'tradingSignals':
          return `// Module for trading signals
function tradingSignals(data) {
  // Generate buy/sell signals...
  console.log("Generating trading signals...");
}`;
        case 'portfolioManagement':
          return `// Module for portfolio management
function portfolioManagement(portfolio) {
  // Manage portfolio rebalancing and allocation...
  console.log("Managing portfolio...");
}`;
        case 'riskManagement':
          return `// Module for risk management
function riskManagement(data) {
  // Calculate risk metrics...
  console.log("Calculating risk...");
}`;
        case 'dataVisualization':
          return `// Module for data visualization
function dataVisualization(data) {
  // Render charts and graphs...
  console.log("Visualizing data...");
}`;
        case 'sentimentAnalysis':
          return `// Module for sentiment analysis
function sentimentAnalysis(news) {
  // Analyze market sentiment...
  console.log("Analyzing sentiment...");
}`;
        case 'marketNews':
          return `// Module for market news aggregation
function marketNews() {
  // Fetch and aggregate news articles...
  console.log("Fetching market news...");
}`;
        default:
          return '';
      }
    }).join('\n\n');

    const integrationModules = selectedIntegrations.map(integration => {
      switch (integration) {
        case 'coinGecko':
          return `// Integration with CoinGecko API
async function fetchCoinGeckoData(token) {
  // Fetch token price data from CoinGecko...
  console.log("Fetching CoinGecko data for", token);
}`;
        case 'dexScreener':
          return `// Integration with Dex Screener
async function fetchDexScreenerData(token) {
  // Fetch real-time token data from Dex Screener...
  console.log("Fetching Dex Screener data for", token);
}`;
        case 'historicalData':
          return `// Integration with Historical Data API
async function fetchHistoricalData(token, timestamp) {
  // Fetch historical price data...
  console.log("Fetching historical data for", token, "at", timestamp);
}`;
        case 'realTimeStreaming':
          return `// Real-Time Streaming Integration
function subscribeToRealTimeData(token) {
  // Subscribe to real-time market data...
  console.log("Subscribing to real-time data for", token);
}`;
        default:
          return '';
      }
    }).join('\n\n');

    const code = `/**
 * ${agentName || 'My AI Agent'}
 * Type: ${agentType}
 * Description: ${agentDescription}
 *
 * Features:
 * - ${selectedFeatures.join('\n * - ')}
 *
 * Integrations:
 * - ${selectedIntegrations.join('\n * - ')}
 */

${featureModules}

${integrationModules}

// Main Agent Class
class ${className}Agent {
  constructor() {
    this.name = "${agentName}";
    this.type = "${agentType}";
    this.description = "${agentDescription}";
    // Initialize modules if necessary
  }

  run(data) {
    console.log("Running ${agentName || 'My AI Agent'}...");
    ${selectedFeatures.map(feature => {
      switch (feature) {
        case 'technicalAnalysis':
          return 'technicalAnalysis(data);';
        case 'tradingSignals':
          return 'tradingSignals(data);';
        case 'portfolioManagement':
          return 'portfolioManagement(data);';
        case 'riskManagement':
          return 'riskManagement(data);';
        case 'dataVisualization':
          return 'dataVisualization(data);';
        case 'sentimentAnalysis':
          return 'sentimentAnalysis(data);';
        case 'marketNews':
          return 'marketNews();';
        default:
          return '';
      }
    }).join('\n    ')}
  }
}

module.exports = ${className}Agent;

// To use this agent, import and instantiate it in your application.
`;
    setGeneratedCode(code);
  };

  // Download the generated code as a file using Blob
  const downloadCode = () => {
    const blob = new Blob([generatedCode], { type: 'text/javascript;charset=utf-8' });
    const fileName = `${agentName.replace(/\s+/g, '_') || 'agent'}.js`;
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = fileName;
    link.click();
  };

  // Copy code to clipboard using the Clipboard API
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
        Create Your Own AI Agent
      </Typography>
      <Typography variant="body1" gutterBottom>
        Customize your AI agent by entering its details and selecting the features and integrations you need.
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Agent Name"
            variant="outlined"
            fullWidth
            value={agentName}
            onChange={(e) => setAgentName(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Agent Type"
            variant="outlined"
            fullWidth
            placeholder="e.g. Analysis, Trading, Portfolio Management"
            value={agentType}
            onChange={(e) => setAgentType(e.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Agent Description"
            variant="outlined"
            fullWidth
            multiline
            rows={4}
            value={agentDescription}
            onChange={(e) => setAgentDescription(e.target.value)}
          />
        </Grid>
      </Grid>

      <Box mt={4}>
        <Typography variant="h6">Select Features:</Typography>
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

export default CreateAIAgent;