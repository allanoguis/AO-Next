"use client";
import React from "react";
import GameOfLife from "@/projects/conway/ConwayEngine3";
import styles from "@/projects/conway/conway.module.css";

const ConwayPage: React.FC = () => {
  return (
    <div className={styles.conwayPage}>
      <GameOfLife
        cellsize={5}
        width={300}
        height={600}
        onGridUpdate={() => {}} // We're not using this for now
      />
    </div>
  );
};

export default ConwayPage;
