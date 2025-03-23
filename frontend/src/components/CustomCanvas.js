import React, { useRef, useEffect, useState } from 'react';

function CustomCanvas({
  width = 800,
  height = 600,
  currentTool = 'brush',      // 'brush' | 'rect' | 'circle' | 'text' etc.
  brushColor = '#000000',
  brushSize = 4,
  onExportImage,              // callback for exporting the final image
}) {
  const canvasRef = useRef(null);
  const [objects, setObjects] = useState([]); 
  // Example of "objects" shape: 
  // [
  //   { type: 'line', points: [...], color: ..., size: ... },
  //   { type: 'rect', x: 10, y: 20, w: 100, h: 60, color: ... },
  //   { type: 'circle', x: 100, y: 100, r: 30, color: ... },
  //   { type: 'text', x: 200, y: 200, text: 'Hello', color: ... },
  // ]

  // For freehand drawing (brush):
  const [isDrawing, setIsDrawing] = useState(false);
  const [currentLine, setCurrentLine] = useState(null);

  // Re-render on changes
  useEffect(() => {
    drawCanvas();
  }, [objects]);

  // Draw everything on the canvas
  function drawCanvas() {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    // Clear
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Re-draw each object in 'objects'
    objects.forEach(obj => {
      switch (obj.type) {
        case 'line':
          drawLine(ctx, obj);
          break;
        case 'rect':
          drawRect(ctx, obj);
          break;
        case 'circle':
          drawCircle(ctx, obj);
          break;
        case 'text':
          drawText(ctx, obj);
          break;
        default:
          break;
      }
    });
  }

  // HELPER DRAW FUNCTIONS
  function drawLine(ctx, lineObj) {
    ctx.strokeStyle = lineObj.color;
    ctx.lineWidth = lineObj.size;
    ctx.lineJoin = 'round';
    ctx.lineCap = 'round';

    const points = lineObj.points;
    ctx.beginPath();
    ctx.moveTo(points[0].x, points[0].y);
    for (let i = 1; i < points.length; i++) {
      ctx.lineTo(points[i].x, points[i].y);
    }
    ctx.stroke();
  }

  function drawRect(ctx, rectObj) {
    ctx.fillStyle = rectObj.color;
    ctx.fillRect(rectObj.x, rectObj.y, rectObj.w, rectObj.h);
  }

  function drawCircle(ctx, circleObj) {
    ctx.fillStyle = circleObj.color;
    ctx.beginPath();
    ctx.arc(circleObj.x, circleObj.y, circleObj.r, 0, Math.PI * 2);
    ctx.fill();
  }

  function drawText(ctx, textObj) {
    ctx.fillStyle = textObj.color;
    ctx.font = '20px Arial';
    ctx.fillText(textObj.text, textObj.x, textObj.y);
  }

  // EVENT HANDLERS
  function handleMouseDown(e) {
    const rect = e.target.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    if (currentTool === 'brush') {
      setIsDrawing(true);
      setCurrentLine({
        type: 'line',
        color: brushColor,
        size: brushSize,
        points: [{ x, y }]
      });
    } else if (currentTool === 'rect') {
      // Example: create a rectangle
      // In a real system, you'd drag to define width/height
      const newRect = {
        type: 'rect',
        color: brushColor,
        x,
        y,
        w: 60,
        h: 40
      };
      setObjects(prev => [...prev, newRect]);
    } else if (currentTool === 'circle') {
      const newCircle = {
        type: 'circle',
        color: brushColor,
        x,
        y,
        r: 30
      };
      setObjects(prev => [...prev, newCircle]);
    } else if (currentTool === 'text') {
      const newText = {
        type: 'text',
        color: brushColor,
        x,
        y,
        text: 'Sample Text'
      };
      setObjects(prev => [...prev, newText]);
    }
  }

  function handleMouseMove(e) {
    if (!isDrawing || currentTool !== 'brush') return;

    const rect = e.target.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setCurrentLine(line => {
      if (!line) return null;
      return {
        ...line,
        points: [...line.points, { x, y }]
      };
    });
  }

  function handleMouseUp(e) {
    if (isDrawing && currentTool === 'brush') {
      // finalize the line
      if (currentLine) {
        setObjects(prev => [...prev, currentLine]);
      }
      setCurrentLine(null);
      setIsDrawing(false);
    }
  }

  // Called whenever we want to re-draw while freehand drawing
  useEffect(() => {
    if (!isDrawing || !currentLine) return;
    drawCanvas(); // re-draw existing objects
    // draw the line in progress
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    drawLine(ctx, currentLine);
  }, [currentLine]);

  // EXPORT
  function handleExport() {
    // Convert canvas to dataURL
    const canvas = canvasRef.current;
    const dataURL = canvas.toDataURL('image/png');
    if (onExportImage) {
      onExportImage(dataURL);
    }
  }

  return (
    <div style={{ border: '1px solid #ccc' }}>
      <canvas
        ref={canvasRef}
        width={width}
        height={height}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        style={{ cursor: 'crosshair' }}
      />
      <button onClick={handleExport}>Export Image</button>
    </div>
  );
}

export default CustomCanvas;
