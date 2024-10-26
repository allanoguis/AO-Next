"use client";
import React, { useEffect } from "react";
import { MoonIcon, SunIcon } from "@primer/octicons-react";
import { useTheme } from "next-themes";

const DarkMode: React.FC = () => {
  const { theme, setTheme } = useTheme();

  const toggleDarkMode = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
  };

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme) {
      setTheme(storedTheme);
    } else {
      setTheme(
        window.matchMedia("(prefers-color-scheme: dark)").matches
          ? "dark"
          : "light"
      );
    }
  }, [setTheme]);

  return (
    <div className="mr-4 flex items-center gap-2 bg-transparent cursor-context-menu">
      <button className="flex items-center gap-2" onClick={toggleDarkMode}>
        <span>Toggle Theme</span>
        {theme === "dark" ? (
          <MoonIcon className="octicon octicon-moon" />
        ) : (
          <SunIcon className="octicon octicon-sun" />
        )}
      </button>
    </div>
  );
};

export default DarkMode;
