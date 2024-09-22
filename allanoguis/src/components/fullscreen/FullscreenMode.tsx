"use client";
import React, { useState, useEffect } from "react";
import styles from "@/css/fullscreen.module.css";
import { ZoomOutIcon, ZoomInIcon } from "@primer/octicons-react";

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
      <div
        className={`${styles.fullscreenButton} font-mono text-xl font-regular flex items-center`}
        onClick={toggleFullscreen}
      >
        <span className="mr-4 items-center">fullscreen:</span>
        {isFullScreen ? <ZoomOutIcon size={16} /> : <ZoomInIcon size={16} />}
      </div>
    </div>
  );
};

export default FullscreenMode;
