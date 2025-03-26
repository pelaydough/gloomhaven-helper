import React from "react";

interface HexagonProps {
  filled: boolean;
}

const Hexagon: React.FC<HexagonProps> = ({ filled }) => {
  return (
    <div
      className={`w-10 h-9 ${
        filled ? "bg-red-500" : "bg-transparent"
      } relative rotate-90`}
      style={{
        clipPath:
          "polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)",
        margin: "0 -1px", // Negative horizontal margin to make hexagons connect
      }}
    />
  );
};

export default Hexagon;
