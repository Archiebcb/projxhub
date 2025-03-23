// src/pages/Crowdfunding.js
import React, { useState } from 'react';
import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  Grid,
  Card,
  CardContent,
  CardActions,
} from '@mui/material';

const Crowdfunding = () => {
  const [projects, setProjects] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [threshold, setThreshold] = useState('');
  const [notification, setNotification] = useState('');

  // Adds a new project based on the form inputs.
  const addProject = () => {
    if (!title.trim() || !description.trim() || !threshold.trim()) return;
    const newProject = {
      id: Date.now(),
      title,
      description,
      threshold: parseFloat(threshold),
      currentAmount: 0,
      status: 'Active', // or 'Funded' when threshold reached
    };
    setProjects([...projects, newProject]);
    setNotification(`New project added: ${title}`);
    setTitle('');
    setDescription('');
    setThreshold('');
  };

  // Simulate investing in a project: increments currentAmount by a fixed value.
  const investInProject = (id, amount = 10) => {
    setProjects(projects.map(project => {
      if (project.id === id) {
        const newAmount = project.currentAmount + amount;
        return {
          ...project,
          currentAmount: newAmount,
          status: newAmount >= project.threshold ? 'Funded' : project.status,
        };
      }
      return project;
    }));
  };

  return (
    <Box p={2}>
      <Typography variant="h4" gutterBottom>
        Crowdfunding Projects
      </Typography>

      {notification && (
        <Paper sx={{ p: 2, mb: 2, backgroundColor: '#e0f7fa' }}>
          <Typography variant="body1">{notification}</Typography>
        </Paper>
      )}

      <Paper sx={{ p: 2, mb: 4 }}>
        <Typography variant="h6" gutterBottom>
          Submit Your Project
        </Typography>
        <TextField
          fullWidth
          label="Project Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          margin="normal"
        />
        <TextField
          fullWidth
          label="Project Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          margin="normal"
          multiline
          rows={3}
        />
        <TextField
          fullWidth
          label="Funding Threshold (e.g., in tokens or USD)"
          value={threshold}
          onChange={(e) => setThreshold(e.target.value)}
          margin="normal"
          type="number"
        />
        <Box mt={2}>
          <Button variant="contained" onClick={addProject}>
            Submit Project
          </Button>
        </Box>
      </Paper>

      <Typography variant="h5" gutterBottom>
        Active Projects
      </Typography>
      {projects.length === 0 ? (
        <Typography variant="body1">No crowdfunding projects yet. Submit one above!</Typography>
      ) : (
        <Grid container spacing={2}>
          {projects.map((project) => (
            <Grid item xs={12} md={6} key={project.id}>
              <Card>
                <CardContent>
                  <Typography variant="h6">{project.title}</Typography>
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    {project.description}
                  </Typography>
                  <Typography variant="body2">
                    Funding: {project.currentAmount} / {project.threshold} ({project.status})
                  </Typography>
                </CardContent>
                <CardActions>
                  {project.status !== 'Funded' && (
                    <Button size="small" onClick={() => investInProject(project.id)}>
                      Invest $10
                    </Button>
                  )}
                  {project.status === 'Funded' && (
                    <Button size="small" variant="contained" color="success">
                      View Project
                    </Button>
                  )}
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
};

export default Crowdfunding;