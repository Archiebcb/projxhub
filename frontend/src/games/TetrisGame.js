// src/games/TetrisGame.js
import React, { useRef, useEffect, useState, useCallback } from 'react';
import GameWrapper from '../components/GameWrapper';

// Dimensions and block size
const ROWS = 20;
const COLS = 10;
const BLOCK_SIZE = 30;

// Basic shapes
const TETROMINOES = {
  I: {
    shape: [
      [0, 0, 0, 0],
      [1, 1, 1, 1],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ],
    color: 'cyan',
  },
  O: {
    shape: [
      [1, 1],
      [1, 1],
    ],
    color: 'yellow',
  },
  T: {
    shape: [
      [0, 1, 0],
      [1, 1, 1],
      [0, 0, 0],
    ],
    color: 'purple',
  },
  // Add J, L, S, Z similarly if you wish:
  // ...
};

const createEmptyBoard = () =>
  Array.from({ length: ROWS }, () => Array(COLS).fill(0));

const randomTetromino = () => {
  const keys = Object.keys(TETROMINOES);
  const randKey = keys[Math.floor(Math.random() * keys.length)];
  return { ...TETROMINOES[randKey], type: randKey };
};

function rotateMatrix(matrix) {
  // rotate 90 deg clockwise
  return matrix[0].map((_, idx) => matrix.map(row => row[idx]).reverse());
}

// Check collision
function collision(piece, pos, board) {
  const { shape } = piece;
  for (let r = 0; r < shape.length; r++) {
    for (let c = 0; c < shape[r].length; c++) {
      if (shape[r][c]) {
        const x = pos.x + c;
        const y = pos.y + r;
        // outside board?
        if (x < 0 || x >= COLS || y >= ROWS) {
          return true;
        }
        // collide with existing block?
        if (y >= 0 && board[y][x]) {
          return true;
        }
      }
    }
  }
  return false;
}

// Merge piece into board
function mergePiece(board, piece, pos) {
  const newBoard = board.map(row => row.slice());
  const { shape, color } = piece;
  for (let r = 0; r < shape.length; r++) {
    for (let c = 0; c < shape[r].length; c++) {
      if (shape[r][c] && pos.y + r >= 0) {
        newBoard[pos.y + r][pos.x + c] = color;
      }
    }
  }
  return newBoard;
}

// Clear full lines
function clearLines(board) {
  const newBoard = board.filter(row => row.some(cell => cell === 0));
  const clearedLines = ROWS - newBoard.length;
  const emptyRows = Array.from({ length: clearedLines }, () =>
    Array(COLS).fill(0)
  );
  return emptyRows.concat(newBoard);
}

const TetrisGame = () => {
  const canvasRef = useRef(null);

  // Refs to store board/piece/position, so we don't cause re-renders
  const boardRef = useRef(createEmptyBoard());
  const pieceRef = useRef(randomTetromino());
  const posRef = useRef({ x: 3, y: 0 });
  const gameOverRef = useRef(false);

  // We force re-render after each update, so the canvas can redraw
  const [, forceRender] = useState(0);

  // Draw everything
  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw board
    for (let r = 0; r < ROWS; r++) {
      for (let c = 0; c < COLS; c++) {
        const cell = boardRef.current[r][c];
        ctx.fillStyle = cell ? cell : 'black';
        ctx.fillRect(c * BLOCK_SIZE, r * BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE);
        ctx.strokeStyle = 'grey';
        ctx.strokeRect(c * BLOCK_SIZE, r * BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE);
      }
    }

    // Draw current piece
    const { shape, color } = pieceRef.current;
    for (let r = 0; r < shape.length; r++) {
      for (let c = 0; c < shape[r].length; c++) {
        if (shape[r][c]) {
          ctx.fillStyle = color;
          ctx.fillRect(
            (posRef.current.x + c) * BLOCK_SIZE,
            (posRef.current.y + r) * BLOCK_SIZE,
            BLOCK_SIZE,
            BLOCK_SIZE
          );
          ctx.strokeStyle = 'grey';
          ctx.strokeRect(
            (posRef.current.x + c) * BLOCK_SIZE,
            (posRef.current.y + r) * BLOCK_SIZE,
            BLOCK_SIZE,
            BLOCK_SIZE
          );
        }
      }
    }
  }, []);

  // Single tick
  const tick = useCallback(() => {
    if (gameOverRef.current) return;

    const newPos = { x: posRef.current.x, y: posRef.current.y + 1 };
    if (collision(pieceRef.current, newPos, boardRef.current)) {
      // Merge piece
      const merged = mergePiece(boardRef.current, pieceRef.current, posRef.current);
      const cleared = clearLines(merged);
      boardRef.current = cleared;

      const newPiece = randomTetromino();
      const startPos = { x: 3, y: 0 };
      if (collision(newPiece, startPos, boardRef.current)) {
        gameOverRef.current = true;
      } else {
        pieceRef.current = newPiece;
        posRef.current = startPos;
      }
    } else {
      posRef.current = newPos;
    }
    forceRender(n => n + 1);
  }, []);

  // Setup setInterval for the falling logic
  useEffect(() => {
    const intervalId = setInterval(() => {
      tick();
    }, 500);

    const handleKeyDown = (e) => {
      if (gameOverRef.current) return;
      const newPos = { ...posRef.current };
      if (e.key === 'ArrowLeft') {
        newPos.x -= 1;
        if (!collision(pieceRef.current, newPos, boardRef.current)) {
          posRef.current = newPos;
          forceRender(n => n + 1);
        }
      } else if (e.key === 'ArrowRight') {
        newPos.x += 1;
        if (!collision(pieceRef.current, newPos, boardRef.current)) {
          posRef.current = newPos;
          forceRender(n => n + 1);
        }
      } else if (e.key === 'ArrowDown') {
        newPos.y += 1;
        if (!collision(pieceRef.current, newPos, boardRef.current)) {
          posRef.current = newPos;
          forceRender(n => n + 1);
        }
      } else if (e.key === 'ArrowUp') {
        // rotate piece
        const rotated = rotateMatrix(pieceRef.current.shape);
        const newPiece = { ...pieceRef.current, shape: rotated };
        if (!collision(newPiece, posRef.current, boardRef.current)) {
          pieceRef.current = newPiece;
          forceRender(n => n + 1);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      clearInterval(intervalId);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [tick]);

  // On every re-render, redraw
  useEffect(() => {
    draw();
  });

  return (
    <GameWrapper>
      {gameOverRef.current && (
        <h2 style={{ color: 'red' }}>Game Over</h2>
      )}
      <canvas
        ref={canvasRef}
        width={COLS * BLOCK_SIZE}
        height={ROWS * BLOCK_SIZE}
        style={{ border: '1px solid white' }}
      />
    </GameWrapper>
  );
};

export default TetrisGame;