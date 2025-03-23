// frontend/src/pages/MusicStreaming.js
import React from 'react';
import { Container, Card, CardContent, Typography, Divider, Grid, Button } from '@mui/material';
import { motion } from 'framer-motion';

const sampleTracks = [
  { title: 'Track 1', artist: 'Artist A', price: '0.5 XRP', image: 'https://via.placeholder.com/200?text=Track+1' },
  { title: 'Track 2', artist: 'Artist B', price: '0.7 XRP', image: 'https://via.placeholder.com/200?text=Track+2' },
  { title: 'Track 3', artist: 'Artist C', price: '0.6 XRP', image: 'https://via.placeholder.com/200?text=Track+3' },
];

const MusicStreaming = () => {
  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h5" gutterBottom>
        Music Streaming & NFT Royalties
      </Typography>
      <Typography variant="body1" sx={{ mb: 2 }}>
        Stream music, support your favorite artists, and own NFT tracks.
      </Typography>
      <Divider sx={{ mb: 2 }} />
      <Grid container spacing={2}>
        {sampleTracks.map((track, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.3 }}
            >
              <Card sx={{ bgcolor: 'background.paper', borderRadius: 2 }}>
                <CardContent>
                  <img src={track.image} alt={track.title} style={{ width: '100%', borderRadius: 8 }} />
                  <Typography variant="h6">{track.title}</Typography>
                  <Typography variant="body2">By {track.artist}</Typography>
                  <Typography variant="body2">Price: {track.price}</Typography>
                  <Button variant="contained" color="primary" sx={{ mt: 1 }}>
                    Stream / Buy NFT
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default MusicStreaming;
