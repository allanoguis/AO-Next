"use client";
import React, { useState } from "react";
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

  return (
    <div className={isFullScreen ? styles.fullscreen : ""}>
      <button className={styles.fullscreenButton} onClick={toggleFullscreen}>
        {isFullScreen ? "Exit Fullscreen" : "Enter Fullscreen"}
      </button>
    </div>
  );
};

export default FullscreenMode;
