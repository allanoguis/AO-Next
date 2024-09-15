"use client";
import React, { useState } from "react";

const ButtonCount: React.FC = () => {
  const [count, setCount] = useState<number>(0);
  const [colors, setColors] = useState<[string, string]>(["orange", "red"]);

  const generateColor = (): string => {
    return `rgb(${Math.floor(Math.random() * 256)}, 
            ${Math.floor(Math.random() * 256)}, 
            ${Math.floor(Math.random() * 256)})`;
  };

  const handleClick = (): void => {
    setCount((prevCount) => prevCount + 1);
    setColors([generateColor(), generateColor()]);
  };

  return (
    <>
      <button
        onClick={handleClick}
        className="button"
        id="submit"
        style={{
          background: `linear-gradient(to right, ${colors[0]}, ${colors[1]})`,
        }}
      >
        Click ME
      </button>
      <h1>CLICKED TIMES {count}</h1>
      {/* <h4>COLOR {colors[0]}</h4>
      <h4>COLOR {colors[1]}</h4> */}
    </>
  );
};

export default ButtonCount;
