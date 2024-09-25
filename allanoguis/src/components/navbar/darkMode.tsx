"use client";
import React, { useEffect } from "react";
import { MoonIcon, SunIcon } from "@primer/octicons-react";
import { useState } from "react";

const DarkMode: React.FC = () => {
  const [darkMode, setDarkMode] = useState(Boolean);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    if (darkMode) {
      document.body.classList.add("dark");
      document.body.classList.remove("light");
      localStorage.setItem("theme", "dark");
    } else {
      document.body.classList.add("light");
      document.body.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  };

  useEffect(() => {
    const theme = localStorage.getItem("theme");
    switch (theme) {
      case "light":
        document.body.classList.add("light");
        break;
      case "dark":
        document.body.classList.add("dark");
        break;
      default:
        if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
          document.body.classList.add("dark");
        } else {
          document.body.classList.add("light");
        }
        break;
    }
  }, []);

  return (
    <div className="mr-4 flex items-center gap-2 bg-transparent cursor-context-menu">
      <button className="flex items-center gap-2" onClick={toggleDarkMode}>
        <span>lights</span>
        {darkMode ? <MoonIcon /> : <SunIcon />}
      </button>
    </div>
  );
};

export default DarkMode;
