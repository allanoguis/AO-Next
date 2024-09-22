"use client";
import React from "react";
import GameOfLife from "@/projects/conway/ConwayEngine3";
import styles from "@/css/conway.module.css";

const gameProps = {
  cellsize: 5,
  width: 300,
  height: 400,
  isRunning: true,
};

const ConwayPage: React.FC = () => {
  return (
    <>
      <div className={styles.conwayPage}>
        <h1 className="text-center p-3">Conway Game of Life v3.0</h1>
        <GameOfLife {...gameProps} onGridUpdate={() => {}} />
      </div>
    </>
  );
};

export default ConwayPage;
