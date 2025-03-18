import { useState, useEffect } from "react";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

const conditions = [
  {
    name: "Disarm",
    imageUrl:
      "https://static.wikia.nocookie.net/gloohaven/images/1/13/ICON-Condition-Disarm.png/revision/latest/scale-to-width-down/30?cb=20221007204656",
  },
  {
    name: "Immobilize",
    imageUrl:
      "https://static.wikia.nocookie.net/gloohaven/images/1/19/ICON-Condition-Immobilize.png/revision/latest/scale-to-width-down/30?cb=20221007204811",
  },
  {
    name: "Invisible",
    imageUrl:
      "https://static.wikia.nocookie.net/gloohaven/images/f/f9/ICON-Condition-Invisible.png/revision/latest/scale-to-width-down/30?cb=20221007204911",
  },
  {
    name: "Muddle",
    imageUrl:
      "https://static.wikia.nocookie.net/gloohaven/images/9/98/ICON-Condition-Muddle.png/revision/latest/scale-to-width-down/30?cb=20221007204936",
  },
  {
    name: "Poison",
    imageUrl:
      "https://static.wikia.nocookie.net/gloohaven/images/a/ae/ICON-Condition-Poison.png/revision/latest/scale-to-width-down/30?cb=20221007205004",
  },
  {
    name: "Strengthen",
    imageUrl:
      "https://static.wikia.nocookie.net/gloohaven/images/a/a0/ICON-Condition-Strengthen.png/revision/latest/scale-to-width-down/30?cb=20221007205135",
  },
  {
    name: "Stunned",
    imageUrl:
      "https://static.wikia.nocookie.net/gloohaven/images/b/b2/ICON-Condition-Stun.png/revision/latest/scale-to-width-down/30?cb=20221007205102",
  },
  {
    name: "Wound",
    imageUrl:
      "https://static.wikia.nocookie.net/gloohaven/images/4/42/ICON-Condition-Wound.png/revision/latest/scale-to-width-down/30?cb=20221007205520",
  },
];

type Character = {
  name: string;
  health: number;
  level: number;
  conditions: string[];
  color: string;
  maxHealth: number;
};

function App() {
  const [characters, setCharacters] = useState<Character[]>(() => {
    const saved = localStorage.getItem("characters");
    if (saved) {
      return JSON.parse(saved);
    }

    return [
      {
        name: "Hatchet",
        health: 8,
        level: 1,
        conditions: [],
        color: "blue",
        maxHealth: 8,
      },
      {
        name: "Red Guard",
        health: 10,
        level: 1,
        conditions: [],
        color: "red",
        maxHealth: 10,
      },
      {
        name: "Void Warden",
        health: 6,
        level: 1,
        conditions: [],
        color: "slate",
        maxHealth: 6,
      },
      {
        name: "Demolitionist",
        health: 8,
        level: 1,
        conditions: [],
        color: "orange",
        maxHealth: 8,
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
    }
  };

  const handleHealthChange = (characterName: string, delta: number) => {
    setCharacters((prevCharacters) =>
      prevCharacters.map((char) =>
        char.name === characterName
          ? char.health + delta > char.maxHealth
            ? { ...char, health: char.maxHealth }
            : { ...char, health: char.health + delta }
          : char
      )
    );
  };

  const handleMaxHealthChange = (characterName: string, delta: number) => {
    setCharacters((prevCharacters) =>
      prevCharacters.map((char) =>
        char.name === characterName
          ? { ...char, maxHealth: char.maxHealth + delta }
          : char
      )
    );
  };

  const handleLevelChange = (characterName: string, delta: number) => {
    setCharacters((prevCharacters) =>
      prevCharacters.map((char) =>
        char.name === characterName
          ? { ...char, level: char.level + delta }
          : char
      )
    );
  };

  const handleConditionAdd = (characterName: string, condition: string) => {
    setCharacters((prevCharacters) =>
      prevCharacters.map((char) =>
        char.name === characterName
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

  return (
    <div className="bg-gray-100 min-h-screen w-screen p-4 md:p-8">
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-4">
        {characters.map((character) => (
          <div
            key={character.name}
            className={`${characterColor(
              character
            )} rounded-lg shadow-lg overflow-hidden transition-transform hover:scale-[1.02]`}
          >
            <div className="p-6 w-full">
              <div className="flex justify-between items-center mb-6">
                <h1 className="text-white text-2xl font-medium">
                  {character.name}
                </h1>

                <div className="flex items-center gap-2">
                  <span className="text-white text-sm font-thin">
                    Max Health ({character.maxHealth})
                  </span>
                  <button
                    onClick={() => handleMaxHealthChange(character.name, 1)}
                    className="text-white bg-white/20 rounded-full w-8 h-8 flex items-center justify-center transition-colors"
                  >
                    +
                  </button>
                  <button
                    onClick={() => handleMaxHealthChange(character.name, -1)}
                    className="text-white bg-white/20 rounded-full w-8 h-8 flex items-center justify-center transition-colors"
                  >
                    -
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6 mb-6">
                <div className="bg-white/10 rounded-lg p-4">
                  <div className="flex justify-between items-center mb-2">
                    <p className="text-white text-sm">Health</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-white text-2xl font-medium">
                      {character.health}
                    </span>
                    <div className="flex gap-1">
                      <button
                        onClick={() => handleHealthChange(character.name, 1)}
                        className="text-white hover:bg-white/20 rounded-full w-8 h-8 flex items-center justify-center transition-colors"
                      >
                        +
                      </button>
                      <button
                        onClick={() => handleHealthChange(character.name, -1)}
                        className="text-white hover:bg-white/20 rounded-full w-8 h-8 flex items-center justify-center transition-colors"
                      >
                        -
                      </button>
                    </div>
                  </div>
                </div>

                <div className="bg-white/10 rounded-lg p-4">
                  <p className="text-white text-sm mb-2">Level</p>
                  <div className="flex items-center gap-2">
                    <span className="text-white text-2xl font-medium">
                      {character.level}
                    </span>
                    <div className="flex gap-1">
                      <button
                        onClick={() => handleLevelChange(character.name, 1)}
                        className="text-white hover:bg-white/20 rounded-full w-8 h-8 flex items-center justify-center transition-colors"
                      >
                        +
                      </button>
                      <button
                        onClick={() => handleLevelChange(character.name, -1)}
                        className="text-white hover:bg-white/20 rounded-full w-8 h-8 flex items-center justify-center transition-colors"
                      >
                        -
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white/10 rounded-lg p-4">
                <p className="text-white text-sm mb-2">Conditions</p>
                <div className="flex flex-wrap gap-2 mb-3">
                  {character.conditions.map((condition, index) => (
                    <span
                      key={index}
                      onClick={() =>
                        handleConditionRemove(character.name, condition)
                      }
                      className="bg-white/20 text-white px-3 py-1 rounded-full text-sm cursor-pointer hover:bg-white/30 transition-colors"
                    >
                      {condition} ×
                    </span>
                  ))}
                </div>
                <Drawer>
                  <DrawerTrigger asChild>
                    <button className="w-full bg-white/20 text-white rounded-lg px-3 py-2 text-left hover:bg-white/30 transition-colors">
                      Add condition...
                    </button>
                  </DrawerTrigger>
                  <DrawerContent>
                    <div className="mx-auto w-full max-w-sm">
                      <DrawerHeader>
                        <DrawerTitle>Add Condition</DrawerTitle>
                        <DrawerDescription>
                          Select a condition to add to {character.name}
                        </DrawerDescription>
                      </DrawerHeader>
                      <div className="p-4 flex flex-col gap-2">
                        {conditions.map((condition) => (
                          <DrawerClose key={condition.name} asChild>
                            <button
                              onClick={() => {
                                handleConditionAdd(
                                  character.name,
                                  condition.name
                                );
                              }}
                              className="w-full text-left px-4 py-2 hover:bg-gray-100 rounded-lg"
                            >
                              {condition.name}
                            </button>
                          </DrawerClose>
                        ))}
                      </div>
                      <DrawerFooter>
                        <DrawerClose asChild>
                          <button className="w-full bg-gray-100 px-4 py-2 rounded-lg">
                            Cancel
                          </button>
                        </DrawerClose>
                      </DrawerFooter>
                    </div>
                  </DrawerContent>
                </Drawer>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
