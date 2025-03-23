// frontend/src/pages/XVault.js
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
import { motion } from 'framer-motion';

const sampleHoldings = [
  { name: 'XRP', balance: '5000', icon: '💧' },
  { name: 'Token A', balance: '1500', icon: '🪙' },
  { name: 'NFT B', balance: '3', icon: '🎨' },
  { name: 'Token C', balance: '750', icon: '💎' },
];

const XVault = () => {
  const [vaultOpen, setVaultOpen] = useState(false);
  const [fileName, setFileName] = useState('');
  const [vaultMessage, setVaultMessage] = useState('');
  const [uploadedFiles, setUploadedFiles] = useState([]);

  const handleUpload = () => {
    if (!fileName) {
      alert('Please enter a file name or description.');
      return;
    }
    const newFile = {
      name: fileName,
      message: vaultMessage,
      timestamp: new Date().toLocaleString(),
    };
    setUploadedFiles([newFile, ...uploadedFiles]);
    setFileName('');
    setVaultMessage('');
  };

  const openVault = () => {
    setVaultOpen(true);
  };

  return (
    <Container sx={{ mt: 4 }}>
      {!vaultOpen ? (
        // Vault door (closed state)
        <Card
          sx={{
            p: 3,
            borderRadius: 2,
            bgcolor: 'background.paper',
            textAlign: 'center',
            backgroundImage: 'url(https://via.placeholder.com/800x200?text=Vault+Door)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            height: 200,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <CardContent>
            <Typography variant="h4" color="primary">
              Your Vault is Closed
            </Typography>
            <Typography variant="body1" sx={{ mt: 1, mb: 2 }}>
              Press the button below to open your vault and view your holdings.
            </Typography>
            <Button variant="contained" color="primary" onClick={openVault}>
              Open Vault
            </Button>
          </CardContent>
        </Card>
      ) : (
        // Vault open state
        <>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Typography variant="h4" color="primary" align="center" gutterBottom>
              Welcome to Your Vault
            </Typography>
          </motion.div>
          <Divider sx={{ my: 3 }} />
          <Typography variant="h6" gutterBottom>
            Your Holdings
          </Typography>
          <Grid container spacing={3}>
            {sampleHoldings.map((holding, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card
                    sx={{
                      p: 2,
                      borderRadius: 2,
                      bgcolor: 'rgba(255,255,255,0.05)',
                      textAlign: 'center',
                    }}
                  >
                    <Typography variant="h3">{holding.icon}</Typography>
                    <Typography variant="h6" color="primary">
                      {holding.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Balance: {holding.balance}
                    </Typography>
                  </Card>
                </motion.div>
              </Grid>
            ))}
          </Grid>
          <Divider sx={{ my: 3 }} />
          <Typography variant="h6" gutterBottom>
            Upload a Document to Your Vault
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                label="File Name/Description"
                variant="outlined"
                fullWidth
                value={fileName}
                onChange={(e) => setFileName(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Optional Message"
                variant="outlined"
                fullWidth
                multiline
                rows={3}
                value={vaultMessage}
                onChange={(e) => setVaultMessage(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <Button variant="contained" color="primary" fullWidth onClick={handleUpload}>
                Upload to Vault
              </Button>
            </Grid>
          </Grid>
          <Divider sx={{ my: 3 }} />
          <Typography variant="h6" gutterBottom>
            Vault Contents
          </Typography>
          <Paper sx={{ p: 2, maxHeight: 300, overflowY: 'auto' }}>
            {uploadedFiles.length === 0 ? (
              <Typography variant="body2" color="text.secondary">
                No files uploaded yet.
              </Typography>
            ) : (
              uploadedFiles.map((file, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Typography variant="body1">
                    {file.timestamp}: {file.name} {file.message && `- ${file.message}`}
                  </Typography>
                  <Divider sx={{ my: 1 }} />
                </motion.div>
              ))
            )}
          </Paper>
        </>
      )}
    </Container>
  );
};

export default XVault;
