"use client";
import React, { useState } from "react";
import { IssueDraftIcon, IssueClosedIcon } from "@primer/octicons-react";

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
    <div
      className={"bg-transparent flex items-center gap-2 cursor-"}
      onClick={toggleFullscreen}
    >
      <span className="flex items-center">fullscreen </span>
      {isFullScreen ? <IssueClosedIcon /> : <IssueDraftIcon />}
    </div>
  );
};

export default FullscreenMode;
