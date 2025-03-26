import { useState } from "react";

export const useMenuState = () => {
  const [openMenus, setOpenMenus] = useState<Record<string, boolean>>({});

  const toggleMenu = (title: string) => {
    setOpenMenus((prev) => {
      const newState = { ...prev };
      Object.keys(newState).forEach((key) => {
        newState[key] = key === title ? !prev[title] : false;
      });
      if (!(title in newState)) {
        newState[title] = true;
      }
      return newState;
    });
  };

  return {
    openMenus,
    toggleMenu,
  };
};
