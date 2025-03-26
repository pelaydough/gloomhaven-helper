import { useState, useEffect } from "react";
import { ElementKey, ElementStates } from "@/types";

export const useElementStates = () => {
  const [elementStates, setElementStates] = useState<ElementStates>(() => {
    const saved = localStorage.getItem("elementStates");
    if (saved) {
      return JSON.parse(saved);
    }
    return {
      fire: 0,
      ice: 0,
      air: 0,
      earth: 0,
      dark: 0,
      light: 0,
    };
  });

  useEffect(() => {
    localStorage.setItem("elementStates", JSON.stringify(elementStates));
  }, [elementStates]);

  const handleElementClick = (element: ElementKey) => {
    setElementStates((prev) => ({
      ...prev,
      [element]: (prev[element] + 1) % 3,
    }));
  };

  const getElementStyle = (element: ElementKey) => {
    const colorMap = {
      fire: "bg-red-500 hover:bg-red-600",
      ice: "bg-blue-500 hover:bg-blue-600",
      air: "bg-slate-500 hover:bg-slate-600",
      earth: "bg-green-500 hover:bg-green-600",
      dark: "bg-purple-500 hover:bg-purple-600",
      light: "bg-yellow-500 hover:bg-yellow-600",
    };

    switch (elementStates[element]) {
      case 1:
        return colorMap[element];
      case 2:
        return `${colorMap[element]} opacity-50`;
      default:
        return "";
    }
  };

  const handleNextTurn = () => {
    setElementStates((prev) => {
      const newState = { ...prev };
      Object.entries(newState).forEach(([element, value]) => {
        if (value > 0) {
          newState[element as ElementKey] = value === 2 ? 0 : 2;
        }
      });
      return newState;
    });
  };

  return {
    elementStates,
    handleElementClick,
    getElementStyle,
    handleNextTurn,
  };
};
