import { useState, useEffect } from "react";
import { Character } from "@/types";
// import abilityDeck from "@/data.json";

// const getAbilityDeck = (character: string) => {
//   return abilityDeck
//     .filter((obj) => obj.character === character)
//     .flatMap((obj) => obj.cards)
//     .map((card) => ({
//       name: card.name,
//     }));
// };

export const useCharacters = () => {
  const [characters, setCharacters] = useState<Character[]>(() => {
    const saved = localStorage.getItem("characters");
    if (saved) {
      return JSON.parse(saved);
    }

    return [
      {
        id: 2,
        name: "Hatchet",
        abbreviation: "HA",
        health: 8,
        level: 1,
        conditions: [],
        color: "blue",
        maxHealth: 8,
        currentXP: 0,
        overallXP: 0,
        currentGold: 0,
        totalGold: 0,
        abilityDeck: [
          { name: "Center Mass" },
          { name: "Close Cuts" },
          { name: "Disorienting Barrage" },
          { name: "Double Throw" },
          { name: "Follow Through" },
          { name: "Power Pitch" },
          { name: "Retrieval" },
          { name: "Second Wind" },
          { name: "Stopping Power" },
          { name: "The Favorite" },
        ],
      },
      {
        id: 3,
        name: "Red Guard",
        abbreviation: "RG",
        health: 10,
        level: 1,
        conditions: [],
        color: "red",
        maxHealth: 10,
        currentXP: 0,
        overallXP: 0,
        currentGold: 0,
        totalGold: 0,
        abilityDeck: [
          { name: "Blinding Sickle" },
          { name: "Desert Night" },
          { name: "Flame Shroud" },
          { name: "Flaming Sickle" },
          { name: "Healing Sands" },
          { name: "Shield of the Desert" },
          { name: "Shield Spikes" },
          { name: "Shocking Advance" },
          { name: "Swift Strength" },
          { name: "Twirling Stabs" },
        ],
      },
      {
        id: 4,
        name: "Void Warden",
        abbreviation: "VW",
        health: 6,
        level: 1,
        conditions: [],
        color: "slate",
        maxHealth: 6,
        currentXP: 0,
        overallXP: 0,
        currentGold: 0,
        totalGold: 0,
        abilityDeck: [
          { name: "Black Boon" },
          { name: "Close to the Abyss" },
          { name: "Freeze the Soul" },
          { name: "Gift of the Void" },
          { name: "Grasp of Doom" },
          { name: "Lure of the Void" },
          { name: "Master Influence" },
          { name: "Signs of the Void" },
          { name: "Suggestion" },
          { name: "Turn Out the Lights" },
          { name: "Wicked Scratch" },
        ],
      },
      {
        id: 1,
        name: "Demolitionist",
        abbreviation: "DE",
        health: 8,
        level: 1,
        conditions: [],
        color: "orange",
        maxHealth: 8,
        currentXP: 0,
        overallXP: 0,
        currentGold: 0,
        totalGold: 0,
        abilityDeck: [
          { name: "Crushing Weight" },
          { name: "Explode" },
          { name: "Explosive Blitz" },
          { name: "Implode" },
          { name: "Knock Out the Support" },
          { name: "One-Two Punch" },
          { name: "Piston Punch" },
          { name: "The Big One" },
          { name: "Windup" },
        ],
      },
    ];
  });

  useEffect(() => {
    localStorage.setItem("characters", JSON.stringify(characters));
  }, [characters]);

  const characterColor = (character: Character) => {
    switch (character.color) {
      case "blue":
        return "bg-blue-500";
      case "red":
        return "bg-red-500";
      case "slate":
        return "bg-slate-500";
      case "orange":
        return "bg-orange-500";
      default:
        return "bg-gray-500";
    }
  };

  const calculateMaxHealth = (characterName: string, level: number): number => {
    switch (characterName) {
      case "Hatchet":
      case "Demolitionist":
        const hatchetHealth = [8, 9, 11, 12, 14, 15, 17, 18, 20];
        return hatchetHealth[level - 1] || hatchetHealth[0];
      case "Red Guard":
        return 8 + level * 2;
      case "Void Warden":
        return 5 + level;
      default:
        return 8;
    }
  };

  const calculateLevelFromXP = (xp: number): number => {
    const xpBreakpoints = [0, 45, 95, 150, 210, 275, 345, 420, 500];
    for (let i = xpBreakpoints.length - 1; i >= 0; i--) {
      if (xp >= xpBreakpoints[i]) {
        return i + 1;
      }
    }
    return 1;
  };

  const handleHealthChange = (characterName: string, delta: number) => {
    setCharacters((prevCharacters) =>
      prevCharacters.map((char) =>
        char.name === characterName
          ? char.health + delta > char.maxHealth
            ? { ...char, health: char.maxHealth }
            : { ...char, health: Math.max(0, char.health + delta) }
          : char
      )
    );
  };

  const handleXPChange = (characterName: string, delta: number) => {
    setCharacters((prevCharacters) =>
      prevCharacters.map((char) =>
        char.name === characterName
          ? { ...char, currentXP: Math.max(0, char.currentXP + delta) }
          : char
      )
    );
  };

  const handleGoldChange = (characterName: string, delta: number) => {
    setCharacters((prevCharacters) =>
      prevCharacters.map((char) =>
        char.name === characterName
          ? { ...char, currentGold: Math.max(0, char.currentGold + delta) }
          : char
      )
    );
  };

  const handleCollectXP = (characterName: string) => {
    setCharacters((prevCharacters) =>
      prevCharacters.map((char) => {
        if (char.name === characterName) {
          const updatedChar = { ...char };
          updatedChar.overallXP = char.overallXP + char.currentXP;
          updatedChar.currentXP = 0;
          const newLevel = calculateLevelFromXP(updatedChar.overallXP);
          updatedChar.level = newLevel;
          updatedChar.maxHealth = calculateMaxHealth(char.name, newLevel);
          updatedChar.health = Math.min(
            updatedChar.health,
            updatedChar.maxHealth
          );
          return updatedChar;
        }
        return char;
      })
    );
  };

  const handleCollectGold = (characterName: string) => {
    setCharacters((prevCharacters) =>
      prevCharacters.map((char) =>
        char.name === characterName
          ? {
              ...char,
              totalGold: char.totalGold + char.currentGold,
              currentGold: 0,
            }
          : char
      )
    );
  };

  const handleCollectAllResources = () => {
    characters.forEach((char) => {
      handleCollectXP(char.name);
      handleCollectGold(char.name);
    });
  };

  const handleCollectAllXP = () => {
    characters.forEach((char) => handleCollectXP(char.name));
  };

  const handleCollectAllGold = () => {
    characters.forEach((char) => handleCollectGold(char.name));
  };

  const handleConditionAdd = (characterName: string, condition: string) => {
    setCharacters((prevCharacters) =>
      prevCharacters.map((char) =>
        char.name === characterName && !char.conditions.includes(condition)
          ? { ...char, conditions: [...char.conditions, condition] }
          : char
      )
    );
  };

  const handleConditionRemove = (characterName: string, condition: string) => {
    setCharacters((prevCharacters) =>
      prevCharacters.map((char) =>
        char.name === characterName
          ? {
              ...char,
              conditions: char.conditions.filter((c) => c !== condition),
            }
          : char
      )
    );
  };

  const removeTemporaryConditions = () => {
    const conditionsToRemove = [
      "Disarm",
      "Immobilize",
      "Invisible",
      "Strengthen",
      "Stun",
    ];
    setCharacters((prevCharacters) =>
      prevCharacters.map((char) => ({
        ...char,
        conditions: char.conditions.filter(
          (condition) => !conditionsToRemove.includes(condition)
        ),
      }))
    );
  };

  return {
    characters,
    characterColor,
    handleHealthChange,
    handleXPChange,
    handleGoldChange,
    handleCollectXP,
    handleCollectGold,
    handleCollectAllResources,
    handleCollectAllXP,
    handleCollectAllGold,
    handleConditionAdd,
    handleConditionRemove,
    removeTemporaryConditions,
  };
};
