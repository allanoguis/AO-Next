import React, { useState, useEffect, useRef, useCallback } from "react";
import styles from "@/css/conway.module.css";
import GameControls from "./GameControls";

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
  isRunning: boolean;
  onGridUpdate: (grid: Grid) => void;
}

const GameOfLife: React.FC<GameOfLifeProps> = ({ onGridUpdate }) => {
  const [cellSize, setCellSize] = useState(3);
  const [width, setWidth] = useState(350);
  const [height, setHeight] = useState(400);
  const [grid, setGrid] = useState<Grid>({ cells: [] });
  const [isRunning, setIsRunning] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [showInputs, setShowInputs] = useState<boolean>(true); // Add state for input visibility
  const [darkModeColor, setDarkModeColor] = useState<string>("#00ff00"); // Set your desired dark mode color
  const [maxWidth, setMaxWidth] = useState<number>(window.innerWidth * 0.8); // Set max width to 80% of the viewport width
  const [maxHeight, setMaxHeight] = useState<number>(window.innerHeight * 0.8); // Set max height to 80% of the viewport height

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
          const fillColor = "black"; // Light mode color

          // Check if dark mode is enabled
          const isDarkMode = window.matchMedia(
            "(prefers-color-scheme: dark)"
          ).matches;
          ctx.fillStyle = isDarkMode ? darkModeColor : fillColor; // Use the manually set dark mode color

          currentGrid.cells.forEach((row, i) => {
            row.forEach((cell, j) => {
              if (cell.alive) {
                ctx.fillRect(j * cellSize, i * cellSize, cellSize, cellSize);
              }
            });
          });
        }
      }
    },
    [cellSize, width, height, darkModeColor] // Add darkModeColor to dependencies
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
      const newGrid = { cells: newCells };
      onGridUpdate(newGrid); // Call the callback with the new grid
      return newGrid;
    });
  }, [countNeighbors, onGridUpdate]); // Add onGridUpdate to dependencies

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

  useEffect(() => {
    const handleResize = () => {
      setMaxWidth(window.innerWidth * 0.8); // Update max width on resize
      setMaxHeight(window.innerHeight * 0.8); // Update max height on resize
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className={styles.grid}>
      <div>
        <GameControls
          cellSize={cellSize}
          setCellSize={setCellSize}
          width={Math.min(width, maxWidth)} // Set width to the lesser of current width or maxWidth
          setWidth={setWidth}
          height={Math.min(height, maxHeight)} // Set height to the lesser of current height or maxHeight
          setHeight={setHeight}
          initializeGrid={initializeGrid}
          isRunning={isRunning}
          setIsRunning={setIsRunning}
          showInputs={showInputs} // Pass visibility state
          setShowInputs={setShowInputs} // Pass setter for visibility
        />
      </div>
      <div className={`${styles.gridwrapper} border-b-4 border-black`}>
        <canvas
          ref={canvasRef}
          width={Math.min(width, maxWidth)}
          height={Math.min(height, maxHeight)}
        />
      </div>
    </div>
  );
};

export default GameOfLife;
