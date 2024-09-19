import React, { useEffect } from "react";
import styles from "./conway.module.css"
import GameOfLife from "./conwaynew";

const InputForm: React.FC = () => {
export const handleInputChange = useCallback(
    (
      setter: React.Dispatch<React.SetStateAction<number>>,
      value: number,
      minValue: number
    ) => {
      if (value >= minValue) {
        setter(value);
        debouncedInitializeGrid();
      }
    },
    [debouncedInitializeGrid]
  );

 //listeners from inputs when a value has changed, initialize
 useEffect(() => {
    initializeGrid();
  }, [initializeGrid, cellSize, width, height]);


  return (
    <div className={styles.grid}>
      <div>
        <div className={styles.inputs}>
          <p>Cell Size:</p>
          <input
            type="number"
            value={cellSize}
            onChange={(e) =>
              handleInputChange(setCellSize, Number(e.target.value), 1)
            }
            min="1"
          />
          <p>Input resolution (width):</p>
          <input
            type="number"
            value={width}
            onChange={(e) =>
              handleInputChange(setWidth, Number(e.target.value), 1)
            }
            min="1"
          />
          <p>Input resolution (height):</p>
          <input
            type="number"
            value={height}
            onChange={(e) =>
              handleInputChange(setHeight, Number(e.target.value), 1)
            }
            min="1"
          />
        </div>
        );
        };

        export default InputForm;