"use client";
import React from "react";
import { Fragment } from "react";
import GameOfLife from "@/projects/conway/Conway";

const ConwayPage = () => {
  return (
    <Fragment>
      <h1>ConwayPage</h1>

      <GameOfLife />
    </Fragment>
  );
};

export default ConwayPage;
