/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { Container, Card, CardContent, Typography, TextField, Button, Avatar, Chip, Grid } from '@mui/material';
import { motion } from 'framer-motion';
/* eslint-enable no-unused-vars */

const AdvancedProfiles = () => {
  const [bio, setBio] = useState('Blockchain enthusiast, XRPL advocate, and tech visionary.');
  const [editing, setEditing] = useState(false);
  const [username, setUsername] = useState('CryptoGuru');
  const reputation = { score: 87, badges: ['Top Trader', 'Innovator'] };

  const handleSave = () => {
    setEditing(false);
    // Add save logic here
  };

  return (
    <Container sx={{ mt: 4 }}>
      <Card sx={{ p: 2, borderRadius: 2, bgcolor: 'background.paper' }}>
        <CardContent>
          <Grid container spacing={2} alignItems="center">
            <Grid item>
              <Avatar sx={{ width: 80, height: 80 }}>{username.charAt(0)}</Avatar>
            </Grid>
            <Grid item xs>
              {editing ? (
                <>
                  <TextField
                    label="Username"
                    variant="outlined"
                    fullWidth
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    sx={{ mb: 1 }}
                  />
                  <TextField
                    label="Bio"
                    variant="outlined"
                    fullWidth
                    multiline
                    rows={3}
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                  />
                  <Button variant="contained" color="primary" sx={{ mt: 1 }} onClick={handleSave}>
                    Save Profile
                  </Button>
                </>
              ) : (
                <>
                  <Typography variant="h5" color="primary">
                    {username}
                  </Typography>
                  <Typography variant="body1" sx={{ mb: 1 }}>
                    {bio}
                  </Typography>
                  <Button variant="contained" color="secondary" onClick={() => setEditing(true)}>
                    Edit Profile
                  </Button>
                </>
              )}
            </Grid>
          </Grid>
          <Typography variant="h6" sx={{ mt: 3 }}>
            Reputation Score: {reputation.score}
          </Typography>
          <Grid container spacing={1} sx={{ mt: 1 }}>
            {reputation.badges.map((badge, index) => (
              <Grid item key={index}>
                <Chip label={badge} color="primary" />
              </Grid>
            ))}
          </Grid>
        </CardContent>
      </Card>
    </Container>
  );
};

export default AdvancedProfiles;
