import React, { useState, useCallback, useRef } from "react";
import "../styles/ConwayGol.css";

const numRows = 25;
const numCols = 25;

const GameOfLife: React.FC = () => {
  const [grid, setGrid] = useState<boolean[][]>(() => {
    return Array(numRows)
      .fill(null)
      .map(() => Array(numCols).fill(false));
  });

  const [running, setRunning] = useState(false);
  const runningRef = useRef(running);
  runningRef.current = running;

  const setRandomGrid = () => {
    const newGrid = Array(numRows)
      .fill(null)
      .map(() =>
        Array(numCols)
          .fill(false)
          .map(() => Math.random() > 0.4)
      );
    setGrid(newGrid);
  };

  const runSimulation = useCallback(() => {
    if (!runningRef.current) return;
    setGrid((g) => {
      const newGrid = g.map((row) => [...row]);
      for (let i = 0; i < numRows; i++) {
        for (let j = 0; j < numCols; j++) {
          let neighbors = 0;
          [
            [-1, -1],
            [-1, 0],
            [-1, 1],
            [0, -1],
            [0, 1],
            [1, -1],
            [1, 0],
            [1, 1],
          ].forEach(([x, y]) => {
            const newI = i + x;
            const newJ = j + y;
            if (newI >= 0 && newI < numRows && newJ >= 0 && newJ < numCols) {
              neighbors += g[newI][newJ] ? 1 : 0;
            }
          });

          if (neighbors < 2 || neighbors > 3) {
            newGrid[i][j] = false;
          } else if (!g[i][j] && neighbors === 3) {
            newGrid[i][j] = true;
          }
        }
      }
      return newGrid;
    });

    setTimeout(runSimulation, 100);
  }, []);

  return (
    <div className="conway-container">
      <h3>Conway's Game of Life: </h3>
      <div className="conwaybtns">
        <button
          onClick={() => {
            setRunning(!running);
            if (!running) {
              runningRef.current = true;
              runSimulation();
            }
          }}
          className={running ? "stop" : "start"}
        >
          {running ? "Stop" : "Start"}
        </button>
        <button className="random" onClick={setRandomGrid}>
          Randomize
        </button>
      </div>
      <div
        style={{
          display: "grid",
          border: "2px",
          gridTemplateColumns: `repeat(${numCols}, 20px)`,
        }}
      >
        {grid.map((rows, i) =>
          rows.map((col, k) => (
            <div
              key={`${i}-${k}`}
              onClick={() => {
                const newGrid = grid.map((row, rowIndex) =>
                  rowIndex === i
                    ? row.map((cell, colIndex) =>
                        colIndex === k ? !cell : cell
                      )
                    : row
                );
                setGrid(newGrid);
              }}
              style={{
                width: 20,
                height: 20,
                backgroundColor: grid[i][k] ? "white" : undefined,
                border: "solid 1px black",
              }}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default GameOfLife;
