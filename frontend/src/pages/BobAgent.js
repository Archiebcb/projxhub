// frontend/src/pages/BobAgent.js
/* eslint-disable no-unused-vars */
import { motion } from 'framer-motion';
/* eslint-enable no-unused-vars */

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

const BobAgent = () => {
  const [projectIdea, setProjectIdea] = useState('');
  const [projectCategory, setProjectCategory] = useState('');
  const [projectPlan, setProjectPlan] = useState('');

  const handleGeneratePlan = () => {
    // Simulated project plan generation. Replace with real AI logic later.
    const plan = `Project Idea: ${projectIdea}
Category: ${projectCategory}

--- Project Plan ---
1. Research & Ideation: Gather market insights and define the core value proposition.
2. Requirements & Scope: Outline project goals, features, and target audience.
3. Design: Create wireframes, UI prototypes, and technical architecture.
4. Development: Build the MVP using agile sprints.
5. Testing: Perform QA, user testing, and iterate on feedback.
6. Launch: Deploy the product and implement marketing strategies.
7. Scale & Optimize: Monitor performance, optimize features, and plan future updates.

Recommendation: Prioritize scalability and user engagement throughout development.`;
    setProjectPlan(plan);
  };

  return (
    <Container sx={{ mt: 4 }}>
      <Card sx={{ p: 3, borderRadius: 2, bgcolor: 'background.paper' }}>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            Bob the Builder - AI Project Creator
          </Typography>
          <Typography variant="body1" sx={{ mb: 2 }}>
            Enter your project idea and category to generate a comprehensive project plan.
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                label="Project Idea"
                variant="outlined"
                fullWidth
                value={projectIdea}
                onChange={(e) => setProjectIdea(e.target.value)}
                sx={{ mb: 2 }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Project Category"
                variant="outlined"
                fullWidth
                value={projectCategory}
                onChange={(e) => setProjectCategory(e.target.value)}
                sx={{ mb: 2 }}
                helperText="For example: Web Development, Mobile App, AI, Finance, Healthcare, etc."
              />
            </Grid>
          </Grid>
          <Button variant="contained" color="primary" onClick={handleGeneratePlan}>
            Generate Project Plan
          </Button>
          {projectPlan && (
            <>
              <Divider sx={{ my: 3 }} />
              <Typography variant="h6" gutterBottom>
                Generated Project Plan:
              </Typography>
              <Paper sx={{ p: 2, bgcolor: 'background.paper', whiteSpace: 'pre-line' }}>
                <Typography variant="body1">{projectPlan}</Typography>
              </Paper>
            </>
          )}
        </CardContent>
      </Card>
    </Container>
  );
};

export default BobAgent;
