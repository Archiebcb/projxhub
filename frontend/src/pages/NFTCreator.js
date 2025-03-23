import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Button,
  Drawer,
  Box,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemButton,
  ListSubheader,
  Slider,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import BrushIcon from '@mui/icons-material/Brush';
import CropSquareIcon from '@mui/icons-material/CropSquare';
import CircleIcon from '@mui/icons-material/Circle';
import TextFieldsIcon from '@mui/icons-material/TextFields';

import CustomCanvas from '../components/CustomCanvas'; // Our custom canvas from prior snippet

export default function NFTCreator() {
  const [leftDrawerOpen, setLeftDrawerOpen] = useState(true);
  const [rightDrawerOpen, setRightDrawerOpen] = useState(false);

  // Tools
  const [tool, setTool] = useState('brush'); // 'brush' | 'rect' | 'circle' | 'text' etc.
  const [color, setColor] = useState('#ff0000');
  const [brushSize, setBrushSize] = useState(5);

  // Example: track an “NFT name” or “description” if you want
  const [nftTitle, setNftTitle] = useState('');
  const [nftDescription, setNftDescription] = useState('');

  // When user clicks “Export NFT”
  function handleExportedImage(dataURL) {
    console.log('Exported image dataURL:', dataURL);
    // TODO: upload to IPFS, mint logic, etc.
  }

  return (
    <Box sx={{ display: 'flex', height: '100vh' }}>
      {/* Top AppBar */}
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar sx={{ backgroundColor: '#222' }}>
          <IconButton
            color="inherit"
            edge="start"
            onClick={() => setLeftDrawerOpen(!leftDrawerOpen)}
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Custom NFT Creator
          </Typography>
          <Button color="inherit" onClick={() => setRightDrawerOpen(!rightDrawerOpen)}>
            Resources
          </Button>
        </Toolbar>
      </AppBar>

      {/* Left Drawer: Tools Panel */}
      <Drawer
        variant="persistent"
        open={leftDrawerOpen}
        sx={{
          width: 240,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: 240,
            boxSizing: 'border-box',
            backgroundColor: '#333',
            color: '#fff',
            mt: '64px', // push below AppBar
          },
        }}
      >
        <Toolbar />
        <Divider />
        <List subheader={<ListSubheader sx={{ bgcolor: 'inherit', color: '#fff' }}>Tools</ListSubheader>}>
          <ListItemButton onClick={() => setTool('brush')}>
            <BrushIcon sx={{ mr: 1 }} />
            <ListItemText primary="Brush" />
          </ListItemButton>
          <ListItemButton onClick={() => setTool('rect')}>
            <CropSquareIcon sx={{ mr: 1 }} />
            <ListItemText primary="Rectangle" />
          </ListItemButton>
          <ListItemButton onClick={() => setTool('circle')}>
            <CircleIcon sx={{ mr: 1 }} />
            <ListItemText primary="Circle" />
          </ListItemButton>
          <ListItemButton onClick={() => setTool('text')}>
            <TextFieldsIcon sx={{ mr: 1 }} />
            <ListItemText primary="Text" />
          </ListItemButton>
        </List>
        <Divider />
        <List subheader={<ListSubheader sx={{ bgcolor: 'inherit', color: '#fff' }}>Brush Settings</ListSubheader>}>
          <Box sx={{ p: 2 }}>
            <Typography variant="body2">Color</Typography>
            <input
              type="color"
              value={color}
              onChange={(e) => setColor(e.target.value)}
              style={{ width: '100%', height: '40px', border: 'none', cursor: 'pointer' }}
            />
            <Box sx={{ mt: 2 }}>
              <Typography variant="body2">Size</Typography>
              <Slider
                value={brushSize}
                onChange={(e, val) => setBrushSize(val)}
                min={1}
                max={50}
                step={1}
              />
            </Box>
          </Box>
        </List>
        <Divider />
        <List subheader={<ListSubheader sx={{ bgcolor: 'inherit', color: '#fff' }}>NFT Info</ListSubheader>}>
          <Box sx={{ p: 2 }}>
            <TextField
              label="NFT Title"
              variant="outlined"
              size="small"
              fullWidth
              value={nftTitle}
              onChange={(e) => setNftTitle(e.target.value)}
              sx={{ mb: 2 }}
            />
            <TextField
              label="Description"
              variant="outlined"
              size="small"
              multiline
              rows={2}
              fullWidth
              value={nftDescription}
              onChange={(e) => setNftDescription(e.target.value)}
            />
          </Box>
        </List>
      </Drawer>

      {/* Main Canvas Area */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 2,
          mt: '64px', // push below AppBar
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          backgroundColor: '#222',
        }}
      >
        <Toolbar />
        <Typography variant="h5" sx={{ color: '#fff', mb: 2 }}>
          Draw, Design & Mint
        </Typography>
        <Box sx={{ border: '2px solid #444' }}>
          <CustomCanvas
            width={800}
            height={600}
            currentTool={tool}
            brushColor={color}
            brushSize={brushSize}
            onExportImage={handleExportedImage}
          />
        </Box>
        <Button
          variant="contained"
          sx={{ mt: 2 }}
          onClick={() => {
            // Trigger the "Export" function inside CustomCanvas
            // We can do this by using a ref or passing down a callback
            // For simplicity, let's just do a simple approach:
            const canvasEl = document.querySelector('canvas');
            if (canvasEl) {
              const dataURL = canvasEl.toDataURL('image/png');
              handleExportedImage(dataURL);
            }
          }}
        >
          Export NFT
        </Button>
      </Box>

      {/* Right Drawer: Resources / Advanced Tools */}
      <Drawer
        anchor="right"
        variant="temporary"
        open={rightDrawerOpen}
        onClose={() => setRightDrawerOpen(false)}
        sx={{
          '& .MuiDrawer-paper': {
            width: 300,
            boxSizing: 'border-box',
            backgroundColor: '#222',
            color: '#fff',
            mt: '64px',
          },
        }}
      >
        <Toolbar />
        <Divider />
        <List subheader={<ListSubheader sx={{ bgcolor: 'inherit', color: '#fff' }}>Resources</ListSubheader>}>
          {/* 1) STOCK SHAPES / TEMPLATES */}
          <ListItem>
            <ListItemText primary="Shape Library" />
          </ListItem>
          <ListItemButton>
            <ListItemText primary="Star Shape" />
          </ListItemButton>
          <ListItemButton>
            <ListItemText primary="Heart Shape" />
          </ListItemButton>
          <ListItemButton>
            <ListItemText primary="Lightning Bolt" />
          </ListItemButton>

          <Divider sx={{ my: 2 }} />

          {/* 2) BACKGROUND REMOVAL / AI */}
          <ListItem>
            <ListItemText primary="Advanced AI Tools" />
          </ListItem>
          <ListItemButton>
            <AutoFixHighIcon sx={{ mr: 1 }} />
            <ListItemText primary="AI Generate Artwork" />
          </ListItemButton>
          <ListItemButton>
            <CloudUploadIcon sx={{ mr: 1 }} />
            <ListItemText primary="Remove Background" />
          </ListItemButton>

          <Divider sx={{ my: 2 }} />

          {/* 3) PHYGITALS / QR / UPLOADS */}
          <ListItem>
            <ListItemText primary="Phygital Tools" />
          </ListItem>
          <ListItemButton>
            <AddPhotoAlternateIcon sx={{ mr: 1 }} />
            <ListItemText primary="Upload Physical Item Photo" />
          </ListItemButton>
          <ListItemButton>
            <ListItemText primary="Generate QR for Physical Link" />
          </ListItemButton>
        </List>
      </Drawer>
    </Box>
  );
}
