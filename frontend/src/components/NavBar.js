// frontend/src/components/NavBar.js
import React from 'react';
import { AppBar, Toolbar, Typography, Button, IconButton } from '@mui/material';
// NOTE: The correct import for the "Menu" icon is below:
import MenuIcon from '@mui/icons-material/Menu'; 
import { Link } from 'react-router-dom';

const NavBar = () => {
  return (
    <AppBar position="sticky" elevation={3}>
      <Toolbar>
        {/* The IconButton uses the "MenuIcon" from @mui/icons-material/Menu */}
        <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
          <MenuIcon />
        </IconButton>
        
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          XRPL Everything
        </Typography>
        
        <Button color="inherit" component={Link} to="/">
          Dashboard
        </Button>
        <Button color="inherit" component={Link} to="/token-issuance">
          Token Issuance
        </Button>
        <Button color="inherit" component={Link} to="/social-media">
          Social Media
        </Button>
        {/* Add more buttons for additional dapps as needed */}
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
