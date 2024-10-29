"use client";
import React from "react";
import GameOfLife from "@/games/conway/ConwayEngine3";

const gameProps = {
  cellSize: 5,
  width: 300,
  height: 400,
  isRunning: false,
};

const ConwayPage: React.FC = () => {
  return (
    <div className="min-h-dvh overflow-hidden">
      <h1 className="text-center p-3 pb-0 text-2xl font-bold">
        Conway Game of Life v3.0
      </h1>
      <GameOfLife {...gameProps} onGridUpdate={() => {}} />
    </div>
  );
};

export default ConwayPage;
