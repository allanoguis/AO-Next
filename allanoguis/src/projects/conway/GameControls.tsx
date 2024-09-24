import React from "react";
import styles from "@/css/conway.module.css";

interface GameControlsProps {
  cellSize: number;
  setCellSize: React.Dispatch<React.SetStateAction<number>>;
  width: number;
  setWidth: React.Dispatch<React.SetStateAction<number>>;
  height: number;
  setHeight: React.Dispatch<React.SetStateAction<number>>;
  initializeGrid: () => void;
  isRunning: boolean;
  setIsRunning: React.Dispatch<React.SetStateAction<boolean>>;
  showInputs: boolean; // Add prop for input visibility
  setShowInputs: React.Dispatch<React.SetStateAction<boolean>>; // Add setter for visibility
}

const GameControls: React.FC<GameControlsProps> = ({
  cellSize,
  setCellSize,
  width,
  setWidth,
  height,
  setHeight,
  initializeGrid,
  isRunning,
  setIsRunning,
  showInputs,
  setShowInputs,
}) => {
  const handleInputChange = (
    setter: React.Dispatch<React.SetStateAction<number>>,
    value: number,
    minValue: number
  ) => {
    if (value >= minValue) {
      setter(value);
      // Call debouncedInitializeGrid if needed
    }
  };

  return (
    <div className={styles.inputs}>
      <div className={styles.buttons}>
        <button
          onClick={() => {
            setCellSize(5); // Reset to default cell size
            setWidth(350); // Reset to default width
            setHeight(400); // Reset to default height
            setIsRunning(false); // Stop the grid if running
          }}
        >
          Reset Grid Default
        </button>

        <button onClick={() => setShowInputs(!showInputs)}>
          Toggle Inputs
        </button>
      </div>
      {showInputs && ( //inputs section
        <div className={styles.input}>
          <p>Cell Size: {cellSize}</p>
          <input
            type="range"
            value={cellSize}
            onChange={(e) =>
              handleInputChange(setCellSize, Number(e.target.value), 1)
            }
            min="1"
            max="10"
          />
          <p>Resolution (width): {width}</p>
          <input
            type="range"
            value={width}
            onChange={(e) =>
              handleInputChange(setWidth, Number(e.target.value), 1)
            }
            min="1"
            max="1000"
          />
          <p>Resolution (height): {height}</p>
          <input
            type="range"
            value={height}
            onChange={(e) =>
              handleInputChange(setHeight, Number(e.target.value), 1)
            }
            min="1"
            max="1000"
          />
        </div>
      )}

      <div className={styles.buttons}>
        <button onClick={initializeGrid}>Randomize Cells</button>
        <button onClick={() => setIsRunning(!isRunning)}>
          {isRunning ? "Stop" : "Start"}
        </button>
      </div>
    </div>
  );
};

export default GameControls;
