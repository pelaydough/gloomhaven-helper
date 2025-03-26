import React from "react";
import Hexagon from "./Hexagon";

interface AOEProps {
  matrix: number[][];
}

const AOE: React.FC<AOEProps> = ({ matrix }) => {
  return (
    <div className="flex flex-col items-center">
      {matrix.map((row, rowIndex) => (
        <div
          key={rowIndex}
          className="flex"
          style={{
            marginTop: rowIndex > 0 ? "-3px" : "0",
          }}
        >
          {row.map((cell, cellIndex) => (
            <Hexagon key={cellIndex} filled={cell === 1} />
          ))}
        </div>
      ))}
    </div>
  );
};

export default AOE;
