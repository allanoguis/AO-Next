"use client";
import React, { useState, useEffect, useRef, useCallback } from "react";
import styles from "./conway.module.css";

interface Cell {
  alive: boolean;
}

interface Grid {
  cells: Cell[][];
}

interface GameOfLifeProps {
  cellsize: number;
  width: number;
  height: number;
  // You can add props here if needed
}

const GameOfLife: React.FC<GameOfLifeProps> = () => {
  const [cellSize, setCellSize] = useState(5);
  const [width, setWidth] = useState(300);
  const [height, setHeight] = useState(600);
  const [grid, setGrid] = useState<Grid>({ cells: [] });
  const [isRunning, setIsRunning] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

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
  }, [initializeGrid, cellSize, width, height]);

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

  const handleInputChange = (
    setter: React.Dispatch<React.SetStateAction<number>>,
    value: number,
    minValue: number
  ) => {
    if (value >= minValue) {
      setter(value);
    }
  };

  const toggleFullScreen = () => {
    if (!document.fullscreenElement) {
      containerRef.current?.requestFullscreen();
      setIsFullScreen(true);
    } else {
      document.exitFullscreen();
      setIsFullScreen(false);
    }
  };

  useEffect(() => {
    const handleFullScreenChange = () => {
      setIsFullScreen(!!document.fullscreenElement);
    };

    document.addEventListener("fullscreenchange", handleFullScreenChange);
    return () => {
      document.removeEventListener("fullscreenchange", handleFullScreenChange);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={`${styles.container} ${isFullScreen ? styles.fullscreen : ""}`}
    >
      <div className={styles.grid}>
        <div>
          <div className={styles.inputs}>
            <p>Cell Size:</p>
            <input
              type="number"
              value={cellSize}
              onChange={(e) =>
                handleInputChange(setCellSize, Number(e.target.value), 1)
              }
              min="1"
            />
            <p>Input resolution (width):</p>
            <input
              type="number"
              value={width}
              onChange={(e) =>
                handleInputChange(setWidth, Number(e.target.value), 1)
              }
              min="100"
              max="9000"
            />
            <p>Input resolution (height):</p>
            <input
              type="number"
              value={height}
              onChange={(e) =>
                handleInputChange(setHeight, Number(e.target.value), 1)
              }
              min="100"
              max="9000"
            />
          </div>
          <div className={styles.buttons}>
            <button
              className={styles.start}
              onClick={() => setIsRunning(!isRunning)}
            >
              {isRunning ? "Stop" : "Start"}
            </button>
            <button className={styles.reset} onClick={initializeGrid}>
              Reset
            </button>
            <button className={styles.fullscreen} onClick={toggleFullScreen}>
              {isFullScreen ? "Exit Fullscreen" : "Fullscreen"}
            </button>
          </div>
        </div>
        <div className={styles.gridwrapper}>
          <canvas ref={canvasRef} width={width} height={height} />
        </div>
      </div>
    </div>
  );
};

export default GameOfLife;
