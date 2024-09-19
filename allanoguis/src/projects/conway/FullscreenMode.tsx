import React, { useState, useEffect } from "react";
import styles from "./conway.module.css";

const FullscreenMode: React.FC = () => {
  const [isFullScreen, setIsFullScreen] = useState(false);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      setIsFullScreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
        setIsFullScreen(false);
      }
    }
  };


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

  return (
    <div className={isFullScreen ? styles.fullscreen : ""}>
      <button className={styles.fullscreenButton} onClick={toggleFullscreen}>
        {isFullScreen ? "Exit Fullscreen" : "Enter Fullscreen"}
      </button>
    </div>
    <div className={styles.buttons}>
    <button className={styles.reset} onClick={initializeGrid}>
      Set / Reset
    </button>
    <button
      className={styles.start}
      onClick={() => setIsRunning(!isRunning)}
    >
      {isRunning ? "Stop" : "Start"}
    </button>
  </div>
  );
};

export default FullscreenMode;
