"use client";
import React from "react";
import GameOfLife from "@/projects/conway/ConwayEngine3";
import styles from "@/css/conway.module.css";

const ConwayPage: React.FC = () => {
  return (
    <>
      <h1 className="text-center p-3">Conway Game of Life v3.0</h1>

      <div className={styles.conwayPage}>
        <GameOfLife
          cellsize={5}
          width={300}
          height={600}
          onGridUpdate={() => {}} // not using this for now
        />
      </div>
    </>
  );
};

export default ConwayPage;
