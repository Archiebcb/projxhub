// frontend/src/pages/XPopProofOfPhysical.js
import React, { useState } from 'react';
import {
  Container,
  Typography,
  Button,
  TextField,
  Box,
  Grid,
  Card,
  CardContent,
} from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledContainer = styled(Container)(({ theme }) => ({
  background: 'linear-gradient(135deg, #141E30, #243B55)',
  minHeight: '100vh',
  padding: theme.spacing(4),
  color: '#fff',
}));

const UploadCard = styled(Card)(({ theme }) => ({
  background: 'rgba(255, 255, 255, 0.1)',
  borderRadius: '16px',
  padding: theme.spacing(2),
  marginBottom: theme.spacing(2),
}));

const XPopProofOfPhysical = () => {
  const [files, setFiles] = useState([]);
  const [description, setDescription] = useState('');

  // Handle file selection
  const handleFileChange = (event) => {
    const selectedFiles = Array.from(event.target.files);
    const filePreviews = selectedFiles.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
    }));
    setFiles(filePreviews);
  };

  // Handle submission (replace with your own logic)
  const handleSubmit = () => {
    console.log('Submitting Proof of Physical:', { description, files });
    // TODO: Implement your logic to upload the images (e.g. to IPFS)
    // and mint an NFT or generate the proof-of-physical record.
  };

  return (
    <StyledContainer maxWidth="md">
      <Typography variant="h4" gutterBottom>
        XPOP: Proof of Physical Ownership
      </Typography>
      <Typography variant="body1" gutterBottom>
        Upload images of your physical item and provide a description to generate a digital proof of ownership.
      </Typography>

      <Box component="form" noValidate autoComplete="off" sx={{ mb: 3 }}>
        <TextField
          label="Item Description"
          variant="outlined"
          fullWidth
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          sx={{ mb: 2 }}
        />
        <Button variant="contained" component="label" sx={{ mb: 2 }}>
          Upload Images
          <input
            type="file"
            hidden
            multiple
            accept="image/*"
            onChange={handleFileChange}
          />
        </Button>
      </Box>

      {files.length > 0 && (
        <Grid container spacing={2} sx={{ mb: 3 }}>
          {files.map((imgObj, idx) => (
            <Grid item xs={12} sm={6} md={4} key={idx}>
              <UploadCard>
                <img
                  src={imgObj.preview}
                  alt={`Physical Item ${idx + 1}`}
                  style={{ width: '100%', borderRadius: '8px' }}
                />
                <CardContent>
                  <Typography variant="caption">Image {idx + 1}</Typography>
                </CardContent>
              </UploadCard>
            </Grid>
          ))}
        </Grid>
      )}

      <Button variant="contained" color="primary" onClick={handleSubmit}>
        Submit Proof
      </Button>
    </StyledContainer>
  );
};

export default XPopProofOfPhysical;
