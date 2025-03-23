// frontend/src/components/DigitalArtStudio.js
import React, { useRef, useEffect, useState } from 'react';
import { Box, Button, TextField, Typography } from '@mui/material';
import { fabric } from 'fabric'; // Use named import

const DigitalArtStudio = () => {
  const canvasRef = useRef(null);
  const [fabricCanvas, setFabricCanvas] = useState(null);
  const [brushColor, setBrushColor] = useState('#000000');
  const [brushWidth, setBrushWidth] = useState(5);

  // Initialize the Fabric canvas once when the component mounts
  useEffect(() => {
    const canvas = new fabric.Canvas(canvasRef.current, {
      width: 800,
      height: 600,
      backgroundColor: '#ffffff',
    });
    canvas.isDrawingMode = true;
    canvas.freeDrawingBrush.color = brushColor;
    canvas.freeDrawingBrush.width = brushWidth;
    setFabricCanvas(canvas);

    // Clean up on unmount
    return () => {
      canvas.dispose();
    };
  }, []); // Empty dependency array – runs only once

  // Update brush color when it changes
  useEffect(() => {
    if (fabricCanvas) {
      fabricCanvas.freeDrawingBrush.color = brushColor;
    }
  }, [brushColor, fabricCanvas]);

  // Update brush width when it changes
  useEffect(() => {
    if (fabricCanvas) {
      fabricCanvas.freeDrawingBrush.width = brushWidth;
    }
  }, [brushWidth, fabricCanvas]);

  // Clear the canvas and reset the background
  const clearCanvas = () => {
    if (fabricCanvas) {
      fabricCanvas.clear();
      // Reset the background color after clearing
      fabricCanvas.setBackgroundColor('#ffffff', fabricCanvas.renderAll.bind(fabricCanvas));
    }
  };

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h6" gutterBottom>
        Digital Art Studio
      </Typography>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
        <TextField
          label="Brush Color"
          type="color"
          value={brushColor}
          onChange={(e) => setBrushColor(e.target.value)}
          sx={{ mr: 2 }}
        />
        <TextField
          label="Brush Width"
          type="number"
          value={brushWidth}
          onChange={(e) => setBrushWidth(parseInt(e.target.value) || 1)}
          sx={{ width: 100, mr: 2 }}
        />
        <Button variant="contained" onClick={clearCanvas}>
          Clear Canvas
        </Button>
      </Box>
      <Box>
        {/* The canvas element where Fabric will mount the drawing area */}
        <canvas ref={canvasRef} style={{ border: '1px solid #ccc' }} />
      </Box>
    </Box>
  );
};

export default DigitalArtStudio;
