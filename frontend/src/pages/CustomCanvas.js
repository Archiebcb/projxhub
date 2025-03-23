import React, { useRef, useEffect, useState } from 'react';

export default function CustomCanvas({
  width = 800,
  height = 600,
  currentTool = 'brush',
  brushColor = '#000000',
  brushSize = 4,
  onExportImage
}) {
  const canvasRef = useRef(null);
  const [objects, setObjects] = useState([]);

  // For freehand drawing
  const [isDrawing, setIsDrawing] = useState(false);
  const [currentLine, setCurrentLine] = useState(null);

  useEffect(() => {
    drawCanvas();
  }, [objects]);

  function drawCanvas() {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    objects.forEach((obj) => {
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

  function drawLine(ctx, lineObj) {
    ctx.strokeStyle = lineObj.color;
    ctx.lineWidth = lineObj.size;
    ctx.lineJoin = 'round';
    ctx.lineCap = 'round';
    const pts = lineObj.points;
    ctx.beginPath();
    ctx.moveTo(pts[0].x, pts[0].y);
    for (let i = 1; i < pts.length; i++) {
      ctx.lineTo(pts[i].x, pts[i].y);
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
        points: [{ x, y }],
      });
    } else if (currentTool === 'rect') {
      const newRect = {
        type: 'rect',
        color: brushColor,
        x,
        y,
        w: 60,
        h: 40,
      };
      setObjects((prev) => [...prev, newRect]);
    } else if (currentTool === 'circle') {
      const newCircle = {
        type: 'circle',
        color: brushColor,
        x,
        y,
        r: 30,
      };
      setObjects((prev) => [...prev, newCircle]);
    } else if (currentTool === 'text') {
      const newText = {
        type: 'text',
        color: brushColor,
        x,
        y,
        text: 'Sample Text',
      };
      setObjects((prev) => [...prev, newText]);
    }
  }

  function handleMouseMove(e) {
    if (!isDrawing || currentTool !== 'brush') return;
    const rect = e.target.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setCurrentLine((line) => {
      if (!line) return null;
      return {
        ...line,
        points: [...line.points, { x, y }]
      };
    });
  }

  function handleMouseUp() {
    if (isDrawing && currentTool === 'brush') {
      if (currentLine) {
        setObjects((prev) => [...prev, currentLine]);
      }
      setCurrentLine(null);
      setIsDrawing(false);
    }
  }

  // Re-draw in-progress line
  useEffect(() => {
    if (!isDrawing || !currentLine) return;
    drawCanvas();
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    drawLine(ctx, currentLine);
  }, [currentLine]);

  function handleExport() {
    if (onExportImage) {
      const canvas = canvasRef.current;
      const dataURL = canvas.toDataURL('image/png');
      onExportImage(dataURL);
    }
  }

  return (
    <div>
      <canvas
        ref={canvasRef}
        width={width}
        height={height}
        style={{ background: '#fff' }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
      />
      {/* Example export button if you want it here:
      <button onClick={handleExport}>Export</button> 
      */}
    </div>
  );
}
