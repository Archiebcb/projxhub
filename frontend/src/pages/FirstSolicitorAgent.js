// frontend/src/pages/FirstSolicitorAgent.js
import React, { useState } from 'react';
import {
  Container,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Grid,
  Divider,
  Paper
} from '@mui/material';

const FirstSolicitorAgent = () => {
  const [projectDetails, setProjectDetails] = useState('');
  const [legalQuery, setLegalQuery] = useState('');
  const [legalAdvice, setLegalAdvice] = useState('');

  const handleGenerateAdvice = () => {
    // Simulate legal analysis. In production, replace with real AI/legal logic.
    const advice = `Legal Analysis for your project:
Project Details: ${projectDetails}
Key Legal Issues: ${legalQuery}

Recommended Actions:
1. Draft comprehensive Terms & Conditions.
2. Prepare a Privacy Policy compliant with GDPR/CCPA.
3. Review intellectual property rights and copyright issues.
4. Consult with legal professionals for contracts and regulatory compliance.

Disclaimer: This is a simulated advisory. Please consult a professional lawyer for actual legal advice.`;
    setLegalAdvice(advice);
  };

  return (
    <Container sx={{ mt: 4 }}>
      <Card sx={{ p: 3, borderRadius: 2, bgcolor: 'background.paper' }}>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            First Solicitor - Crypto Legal Assistant
          </Typography>
          <Typography variant="body1" sx={{ mb: 2 }}>
            Enter your project details and legal questions to receive preliminary legal advice and document recommendations.
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                label="Project Details"
                variant="outlined"
                fullWidth
                multiline
                rows={4}
                value={projectDetails}
                onChange={(e) => setProjectDetails(e.target.value)}
                sx={{ mb: 2 }}
                helperText="Describe your project (e.g., goals, technology, target audience)."
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Legal Questions / Requirements"
                variant="outlined"
                fullWidth
                multiline
                rows={3}
                value={legalQuery}
                onChange={(e) => setLegalQuery(e.target.value)}
                sx={{ mb: 2 }}
                helperText="For example: data privacy, contract terms, intellectual property, etc."
              />
            </Grid>
          </Grid>
          <Button variant="contained" color="primary" onClick={handleGenerateAdvice}>
            Generate Legal Advice
          </Button>
          {legalAdvice && (
            <>
              <Divider sx={{ my: 3 }} />
              <Typography variant="h6" gutterBottom>
                Legal Advice:
              </Typography>
              <Paper sx={{ p: 2, bgcolor: 'background.paper', whiteSpace: 'pre-line' }}>
                <Typography variant="body1">{legalAdvice}</Typography>
              </Paper>
            </>
          )}
        </CardContent>
      </Card>
    </Container>
  );
};

export default FirstSolicitorAgent;
