// src/pages/ProjxSocial.js
import React, { useState } from 'react';
import {
  Box,
  Tabs,
  Tab,
  TextField,
  Button,
  Typography,
  Paper,
  Card,
  CardContent,
  CardActions,
  IconButton,
  Grid,
  Avatar,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Checkbox,
  FormControlLabel
} from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';

// Helper component for Tab panels
function TabPanel(props) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`projx-social-tabpanel-${index}`}
      aria-labelledby={`projx-social-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 2 }}>{children}</Box>}
    </div>
  );
}

const ProjxSocial = () => {
  const [tabValue, setTabValue] = useState(0);

  // Social Media Tab State
  const [posts, setPosts] = useState([]);
  const [postInput, setPostInput] = useState('');
  const [imageFile, setImageFile] = useState(null);

  // Social FI Tab State: simulated feed
  const marketFeeds = [
    {
      id: 1,
      title: 'XRPL Dapp Trend',
      description: 'New XRPL dapp in fintech is gaining traction.',
      timestamp: '2025-03-21 10:00'
    },
    {
      id: 2,
      title: 'Token Launch',
      description: 'A new XRPL token is set to launch next week.',
      timestamp: '2025-03-21 09:30'
    },
    {
      id: 3,
      title: 'Investment Opportunity',
      description: 'Blockchain startup receives $5M in funding.',
      timestamp: '2025-03-21 08:45'
    }
  ];

  // Social Trading Tab State: simulate list of traders/builders
  const [traders, setTraders] = useState([
    { id: 1, name: 'Trader Alpha', trusted: false, followers: 45 },
    { id: 2, name: 'Builder Beta', trusted: false, followers: 32 },
    { id: 3, name: 'Investor Gamma', trusted: false, followers: 78 }
  ]);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  // Social Media: add post with optional image
  const addPost = () => {
    if (!postInput.trim() && !imageFile) return;
    const newPost = {
      id: Date.now(),
      text: postInput,
      image: imageFile ? URL.createObjectURL(imageFile) : null,
      timestamp: new Date().toLocaleTimeString()
    };
    setPosts([newPost, ...posts]);
    setPostInput('');
    setImageFile(null);
  };

  // Social Trading: toggle trust & simulate follower change
  const toggleTrust = (id) => {
    setTraders(traders.map(trader => {
      if (trader.id === id) {
        return {
          ...trader,
          trusted: !trader.trusted,
          followers: trader.trusted ? trader.followers - 1 : trader.followers + 1
        };
      }
      return trader;
    }));
  };

  // Handler for image selection (for Social Media posts)
  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setImageFile(e.target.files[0]);
    }
  };

  return (
    <Box p={2}>
      <Typography variant="h4" gutterBottom>
        PROJX Social
      </Typography>
      <Tabs value={tabValue} onChange={handleTabChange} aria-label="projx social tabs">
        <Tab label="Social Media" />
        <Tab label="Social FI" />
        <Tab label="Social Trading" />
      </Tabs>

      {/* Social Media Tab */}
      <TabPanel value={tabValue} index={0}>
        <Box mb={2}>
          <TextField
            fullWidth
            label="What's on your mind?"
            value={postInput}
            onChange={(e) => setPostInput(e.target.value)}
            multiline
            rows={2}
            helperText={`${postInput.length} / 280`}
            inputProps={{ maxLength: 280 }}
          />
          <Box mt={1} display="flex" alignItems="center" gap={1}>
            <Button variant="contained" component="label">
              <PhotoCameraIcon />
              <input type="file" hidden onChange={handleImageChange} accept="image/*" />
            </Button>
            <Button variant="contained" onClick={addPost}>
              Post
            </Button>
          </Box>
        </Box>
        <Paper style={{ maxHeight: 400, overflowY: 'auto', padding: '1rem' }}>
          {posts.length === 0 ? (
            <Typography variant="body1">No posts yet. Be the first to post!</Typography>
          ) : (
            posts.map((post) => (
              <Card key={post.id} sx={{ mb: 1 }}>
                <CardContent>
                  <Typography variant="body2" color="text.secondary">
                    {post.timestamp}
                  </Typography>
                  <Typography variant="body1">{post.text}</Typography>
                  {post.image && (
                    <Box mt={1}>
                      <img src={post.image} alt="Post attachment" style={{ maxWidth: '100%' }} />
                    </Box>
                  )}
                </CardContent>
              </Card>
            ))
          )}
        </Paper>
      </TabPanel>

      {/* Social FI Tab */}
      <TabPanel value={tabValue} index={1}>
        <Typography variant="h6" gutterBottom>
          Market & Opportunity Feed
        </Typography>
        <Paper style={{ maxHeight: 400, overflowY: 'auto', padding: '1rem' }}>
          {marketFeeds.map((feed) => (
            <Card key={feed.id} sx={{ mb: 1 }}>
              <CardContent>
                <Typography variant="h6">{feed.title}</Typography>
                <Typography variant="body2" color="text.secondary">
                  {feed.timestamp}
                </Typography>
                <Typography variant="body1">{feed.description}</Typography>
              </CardContent>
            </Card>
          ))}
        </Paper>
      </TabPanel>

      {/* Social Trading Tab */}
      <TabPanel value={tabValue} index={2}>
        <Typography variant="h6" gutterBottom>
          Follow & Trust Traders/Builders
        </Typography>
        <Grid container spacing={2}>
          {traders.map((trader) => (
            <Grid item xs={12} md={4} key={trader.id}>
              <Card>
                <CardContent>
                  <Box display="flex" alignItems="center" gap={1}>
                    <Avatar>{trader.name.charAt(0)}</Avatar>
                    <Typography variant="h6">{trader.name}</Typography>
                  </Box>
                  <Typography variant="body2" color="text.secondary">
                    Followers: {trader.followers}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button size="small" onClick={() => toggleTrust(trader.id)}>
                    {trader.trusted ? 'Untrust' : 'Trust'}
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </TabPanel>
    </Box>
  );
};

export default ProjxSocial;