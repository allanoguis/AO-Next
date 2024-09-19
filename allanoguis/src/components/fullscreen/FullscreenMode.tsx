"use client";
import React, { useState, useEffect } from "react";
import styles from "@/css/fullscreen.module.css";

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

  useEffect(() => {
    const gridInput = document.getElementById("gridinput");

    if (gridInput) {
      if (isFullScreen) {
        gridInput.style.display = "none";
      } else {
        gridInput.style.display = "";
      }
    }
  }, [isFullScreen]);

  return (
    <div className={isFullScreen ? styles.fullscreen : ""}>
      <p
        className={`${styles.fullscreenButton} font-mono font-semibold`}
        onClick={toggleFullscreen}
      >
        {isFullScreen ? "Fullscreen: on" : "Fullscreen: off"}
      </p>
    </div>
  );
};

export default FullscreenMode;
