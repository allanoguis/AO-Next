import React from "react";
import GameOfLife from "@/projects/conway/conwayres";

const ConwayPage = () => {
  return (
    <>
      <h1 className="text-center">Game of Life 2.0</h1>

      <GameOfLife cellsize={5} width={300} height={600} />
    </>
  );
};

export default ConwayPage;
