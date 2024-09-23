"use client";
import React, { useState } from "react";
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

  return (
    <div className={isFullScreen ? styles.fullscreen : ""}>
      <div
        className={`${styles.fullscreenButton} font-mono text-xl font-regular bg-transparent flex items-center`}
        onClick={toggleFullscreen}
      >
        <span className="items-center">fullscreen : &nbsp;</span>
        {isFullScreen ? <ZoomOutIcon size={16} /> : <ZoomInIcon size={16} />}
      </div>
    </div>
  );
};

export default FullscreenMode;
