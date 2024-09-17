"use client";
import React, { useState, useEffect, useRef, useCallback } from "react";
const CELL_SIZE = 5;
const WIDTH = 500;
const HEIGHT = 500;

interface Cell {
  alive: boolean;
}

interface Grid {
  cells: Cell[][];
}

interface GameOfLifeProps {
  // You can add props here if needed
}

const GameOfLife: React.FC<GameOfLifeProps> = () => {
  const [grid, setGrid] = useState<Grid>({ cells: [] });
  const [isRunning, setIsRunning] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const initializeGrid = useCallback(() => {
    const newCells: Cell[][] = [];
    for (let i = 0; i < HEIGHT / CELL_SIZE; i++) {
      newCells[i] = [];
      for (let j = 0; j < WIDTH / CELL_SIZE; j++) {
        newCells[i][j] = { alive: Math.random() > 0.7 };
      }
    }
    setGrid({ cells: newCells });
  }, []);

  const drawGrid = useCallback((currentGrid: Grid) => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.clearRect(0, 0, WIDTH, HEIGHT);
        currentGrid.cells.forEach((row, i) => {
          row.forEach((cell, j) => {
            if (cell.alive) {
              ctx.fillStyle = "black";
              ctx.fillRect(j * CELL_SIZE, i * CELL_SIZE, CELL_SIZE, CELL_SIZE);
            }
          });
        });
      }
    }
  }, []);

  const countNeighbors = useCallback(
    (grid: Grid, row: number, col: number): number => {
      let count = 0;
      for (let i = -1; i <= 1; i++) {
        for (let j = -1; j <= 1; j++) {
          const r = row + i;
          const c = col + j;
          if (
            r >= 0 &&
            r < grid.cells.length &&
            c >= 0 &&
            c < grid.cells[0].length &&
            !(i === 0 && j === 0)
          ) {
            count += grid.cells[r][c].alive ? 1 : 0;
          }
        }
      }
      return count;
    },
    []
  );

  const updateGrid = useCallback(() => {
    setGrid((prevGrid) => {
      const newCells = prevGrid.cells.map((row, i) =>
        row.map((cell, j) => {
          const neighbors = countNeighbors(prevGrid, i, j);
          if (cell.alive && (neighbors < 2 || neighbors > 3))
            return { alive: false };
          if (!cell.alive && neighbors === 3) return { alive: true };
          return cell;
        })
      );
      return { cells: newCells };
    });
  }, [countNeighbors]);

  useEffect(() => {
    initializeGrid();
  }, [initializeGrid]);

  useEffect(() => {
    drawGrid(grid);
  }, [grid, drawGrid]);

  useEffect(() => {
    let intervalId: NodeJS.Timeout;
    if (isRunning) {
      intervalId = setInterval(updateGrid, 100);
    }
    return () => clearInterval(intervalId);
  }, [isRunning, updateGrid]);

  return (
    <div>
      <canvas ref={canvasRef} width={WIDTH} height={HEIGHT} />
      <div>
        <button onClick={() => setIsRunning(!isRunning)}>
          {isRunning ? "Stop" : "Start"}
        </button>
        <button onClick={initializeGrid}>Reset</button>
      </div>
    </div>
  );
};

export default GameOfLife;
