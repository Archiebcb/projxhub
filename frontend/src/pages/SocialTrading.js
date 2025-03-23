import React from 'react';
import { Container, Card, CardContent, Typography, Grid, Avatar, Button } from '@mui/material';
import { motion } from 'framer-motion';

const influencers = [
  { name: 'AlphaTrader', performance: '+35%', followers: 10000, description: 'Leading DeFi trader with a proven track record.' },
  { name: 'XRPWhale', performance: '+45%', followers: 15000, description: 'Major market mover on XRPL.' },
  { name: 'TrendSetter', performance: '+20%', followers: 8000, description: 'Identifies trends early and executes timely trades.' },
];

const SocialTrading = () => {
  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h5" color="primary" gutterBottom>
        Social Trading & Influencer Insights
      </Typography>
      <Typography variant="body1" gutterBottom>
        Follow top influencers, analyze their performance, and invest in trending tokens.
      </Typography>
      <Grid container spacing={3}>
        {influencers.map((influencer, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
            >
              <Card sx={{ p: 2, borderRadius: 2, bgcolor: 'background.paper' }}>
                <CardContent>
                  <Grid container spacing={2} alignItems="center">
                    <Grid item>
                      <Avatar sx={{ width: 60, height: 60 }}>{influencer.name.charAt(0)}</Avatar>
                    </Grid>
                    <Grid item xs>
                      <Typography variant="h6" color="primary">{influencer.name}</Typography>
                      <Typography variant="body2">
                        Performance: {influencer.performance}
                      </Typography>
                      <Typography variant="body2">
                        Followers: {influencer.followers}
                      </Typography>
                    </Grid>
                  </Grid>
                  <Typography variant="body1" sx={{ mt: 1 }}>
                    {influencer.description}
                  </Typography>
                  <Button variant="contained" color="secondary" sx={{ mt: 2 }}>
                    Follow
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

export default SocialTrading;
