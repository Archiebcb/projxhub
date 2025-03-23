// src/pages/Xstream.js
import React, { useState, useEffect, useRef } from 'react';
import {
  Container,
  Card,
  CardContent,
  Typography,
  Button,
  Grid,
  TextField,
  Divider,
  Paper,
  IconButton
} from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { motion } from 'framer-motion';

const Xstream = () => {
  const [streamTitle, setStreamTitle] = useState('');
  const [streamStarted, setStreamStarted] = useState(false);

  // Simulated stats
  const [viewerCount, setViewerCount] = useState(0);
  const [earnings, setEarnings] = useState(0);
  const [likes, setLikes] = useState(0);

  // Simulated comments
  const [comments, setComments] = useState([]);
  const commentIntervalRef = useRef(null);

  // Start streaming
  const handleStartStream = () => {
    if (!streamTitle.trim()) {
      alert('Please enter a stream title.');
      return;
    }
    setStreamStarted(true);

    // Reset stats
    setViewerCount(0);
    setEarnings(0);
    setLikes(0);
    setComments([]);

    // Simulate random interactions every 2 seconds
    commentIntervalRef.current = setInterval(() => {
      simulateInteractions();
    }, 2000);

    // Stop simulation after 1 minute (for demo)
    setTimeout(() => {
      clearInterval(commentIntervalRef.current);
    }, 60000);
  };

  // Simulate random interactions (viewer changes, likes, tips, comments)
  const simulateInteractions = () => {
    // Increase viewer count randomly
    const viewerChange = Math.floor(Math.random() * 5) - 1; // -1 to +4
    setViewerCount((prev) => Math.max(prev + viewerChange, 0));

    // Randomly add likes
    if (Math.random() > 0.6) {
      setLikes((prev) => prev + Math.floor(Math.random() * 3));
    }

    // Randomly add earnings (tips)
    if (Math.random() > 0.7) {
      const tip = parseFloat((Math.random() * 1).toFixed(2)); // up to 1 XRP
      setEarnings((prev) => parseFloat((prev + tip).toFixed(2)));
    }

    // Randomly add a comment
    if (Math.random() > 0.5) {
      const randomComment = getRandomComment();
      setComments((prev) => [
        { id: Date.now(), text: randomComment },
        ...prev,
      ]);
    }
  };

  // Example comment generator
  const getRandomComment = () => {
    const sampleComments = [
      'Great stream!',
      'This is awesome, keep it up!',
      'Hello from across the world!',
      'Can you talk about your setup?',
      'Loving the vibes here!',
      'Thanks for the tips, very helpful.',
      'Keep streaming, this is cool!',
    ];
    return sampleComments[Math.floor(Math.random() * sampleComments.length)];
  };

  // End the simulation if user leaves or reloads
  useEffect(() => {
    return () => {
      if (commentIntervalRef.current) {
        clearInterval(commentIntervalRef.current);
      }
    };
  }, []);

  return (
    <Container sx={{ mt: 4 }}>
      <Card
        component={motion.div}
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        sx={{ p: 3, borderRadius: 2, bgcolor: 'background.paper' }}
      >
        <CardContent>
          <Typography variant="h5" gutterBottom>
            Xstream - Live Streaming Rewards
          </Typography>

          {!streamStarted ? (
            <>
              <TextField
                label="Enter Stream Title"
                variant="outlined"
                fullWidth
                value={streamTitle}
                onChange={(e) => setStreamTitle(e.target.value)}
                sx={{ mb: 2 }}
              />
              <Button variant="contained" color="primary" onClick={handleStartStream}>
                Start Stream
              </Button>
            </>
          ) : (
            <>
              <Typography variant="h6" color="primary">
                {streamTitle}
              </Typography>
              <Divider sx={{ my: 2 }} />

              <Grid container spacing={2}>
                <Grid item xs={4}>
                  <Typography variant="body1">
                    <strong>Live Viewers:</strong> {viewerCount}
                  </Typography>
                </Grid>
                <Grid item xs={4}>
                  <Typography variant="body1">
                    <strong>Likes:</strong> {likes}
                  </Typography>
                </Grid>
                <Grid item xs={4}>
                  <Typography variant="body1">
                    <strong>Earnings:</strong> {earnings} XRP
                  </Typography>
                </Grid>
              </Grid>

              <Paper sx={{ mt: 2, p: 2, bgcolor: 'rgba(0,229,255,0.1)' }}>
                <Typography variant="subtitle1" gutterBottom>
                  Live Chat
                </Typography>
                {comments.length === 0 ? (
                  <Typography variant="body2" color="text.secondary">
                    No comments yet...
                  </Typography>
                ) : (
                  comments.map((c) => (
                    <Typography key={c.id} variant="body2" sx={{ mb: 1 }}>
                      {c.text}
                    </Typography>
                  ))
                )}
              </Paper>
            </>
          )}
        </CardContent>
      </Card>
    </Container>
  );
};

export default Xstream;