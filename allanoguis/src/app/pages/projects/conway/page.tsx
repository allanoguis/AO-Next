"use client";
import React from "react";
import GameOfLife from "@/projects/conway/ConwayEngine3";

const gameProps = {
  cellsize: 5,
  width: 300,
  height: 400,
  isRunning: false,
};

const ConwayPage: React.FC = () => {
  return (
    <div className="min-h-dvh overflow-hidden">
      <h1 className="text-center p-11 text-2xl font-bold">
        Conway Game of Life v3.0
      </h1>
      <GameOfLife {...gameProps} onGridUpdate={() => {}} />
    </div>
  );
};

export default ConwayPage;
