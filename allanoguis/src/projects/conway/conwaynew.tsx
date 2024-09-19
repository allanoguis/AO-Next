"use client";
import React, { useState, useEffect, useRef, useCallback } from "react";
import styles from "./conway.module.css";
import debounce from "lodash/debounce";
import FullscreenMode from "./FullscreenMode";

interface Cell {
  alive: boolean;
}

interface Grid {
  cells: Cell[][];
}

interface GameOfLifeProps {
  //grid prop
  cellsize: number;
  width: number;
  height: number;
}

export const GameOfLife: React.FC<GameOfLifeProps> = () => {
  const [cellSize, setCellSize] = useState(5);
  const [width, setWidth] = useState(300);
  const [height, setHeight] = useState(400);
  const [grid, setGrid] = useState<Grid>({ cells: [] });
  const [isRunning, setIsRunning] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  //onReset randomize generation of cells
  const initializeGrid = useCallback(() => {
    const newCells: Cell[][] = [];
    for (let i = 0; i < height / cellSize; i++) {
      newCells[i] = [];
      for (let j = 0; j < width / cellSize; j++) {
        newCells[i][j] = { alive: Math.random() > 0.7 };
      }
    }
    setGrid({ cells: newCells });
  }, [cellSize, width, height]);

  //debounce?
  const debouncedInitializeGrid = useCallback(
    debounce(() => {
      initializeGrid();
    }, 300),
    [initializeGrid]
  );

  //checking grid state
  const drawGrid = useCallback(
    (currentGrid: Grid) => {
      const canvas = canvasRef.current;
      if (canvas) {
        const ctx = canvas.getContext("2d");
        if (ctx) {
          ctx.clearRect(0, 0, width, height);
          currentGrid.cells.forEach((row, i) => {
            row.forEach((cell, j) => {
              if (cell.alive) {
                ctx.fillStyle = "black";
                ctx.fillRect(j * cellSize, i * cellSize, cellSize, cellSize);
              }
            });
          });
        }
      }
    },
    [cellSize, width, height]
  );

  //grid engine
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

  //listeners from reset: when a user clicks, initialize

  useEffect(() => {
    drawGrid(grid);
  }, [grid, drawGrid]);

  // listener from start: set timeout if a user is interacting with the inputs, give the user time to set the grid, checks if the grid is running ? resume engine: !running
  useEffect(() => {
    let intervalId: NodeJS.Timeout;
    if (isRunning) {
      intervalId = setInterval(updateGrid, 100);
    }
    return () => clearInterval(intervalId);
  }, [isRunning, updateGrid]);

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

  return (
    //grid
    <div className={styles.gridwrapper}>
      <canvas ref={canvasRef} width={width} height={height} />
    </div>
  );
};

export default GameOfLife;
