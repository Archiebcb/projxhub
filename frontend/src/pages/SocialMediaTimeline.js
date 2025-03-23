// frontend/src/pages/SocialMediaTimeline.js
import React, { useState } from 'react';
import {
  Container,
  Card,
  CardContent,
  Typography,
  Divider,
  TextField,
  Button,
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText
} from '@mui/material';
import { motion } from 'framer-motion';

const SocialMediaTimeline = () => {
  const [username, setUsername] = useState('');
  const [isProfileSet, setIsProfileSet] = useState(false);
  const [postContent, setPostContent] = useState('');
  const [posts, setPosts] = useState([
    { username: 'Alice', content: 'Welcome to XRPL Social!', timestamp: new Date().toLocaleString() },
    { username: 'Bob', content: 'XRPL is revolutionizing finance!', timestamp: new Date().toLocaleString() },
  ]);

  const handleCreateProfile = () => {
    if (username.trim() !== '') {
      setIsProfileSet(true);
    }
  };

  const handlePost = () => {
    if (postContent.trim() !== '') {
      const newPost = {
        username,
        content: postContent,
        timestamp: new Date().toLocaleString()
      };
      setPosts([newPost, ...posts]);
      setPostContent('');
    }
  };

  return (
    <Container sx={{ mt: 4 }}>
      {!isProfileSet ? (
        <Card sx={{ p: 2, borderRadius: 2, bgcolor: 'background.paper', mb: 4 }}>
          <CardContent>
            <Typography variant="h5" gutterBottom>
              Create Your Profile
            </Typography>
            <Typography variant="body1" sx={{ mb: 2 }}>
              Enter a username to join XRPL Social.
            </Typography>
            <TextField
              label="Username"
              variant="outlined"
              fullWidth
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              sx={{ mb: 2 }}
            />
            <Button variant="contained" color="primary" onClick={handleCreateProfile}>
              Create Profile
            </Button>
          </CardContent>
        </Card>
      ) : (
        <Card sx={{ p: 2, borderRadius: 2, bgcolor: 'background.paper', mb: 4 }}>
          <CardContent>
            <Typography variant="h5" gutterBottom>
              Welcome, {username}!
            </Typography>
            <Typography variant="body1" sx={{ mb: 2 }}>
              Share your thoughts with the XRPL community.
            </Typography>
            <TextField
              label="What's on your mind?"
              variant="outlined"
              fullWidth
              multiline
              rows={3}
              value={postContent}
              onChange={(e) => setPostContent(e.target.value)}
              sx={{ mb: 2 }}
            />
            <Button variant="contained" color="secondary" onClick={handlePost}>
              Post
            </Button>
          </CardContent>
        </Card>
      )}
      <Divider sx={{ mb: 2 }} />
      <Typography variant="h6" gutterBottom>
        Timeline
      </Typography>
      <List>
        {posts.map((post, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <ListItem alignItems="flex-start">
              <ListItemAvatar>
                <Avatar>{post.username.charAt(0)}</Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={`${post.username} - ${post.timestamp}`}
                secondary={post.content}
              />
            </ListItem>
          </motion.div>
        ))}
      </List>
    </Container>
  );
};

export default SocialMediaTimeline;
