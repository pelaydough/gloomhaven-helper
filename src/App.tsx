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
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import {
  Flame,
  Droplet,
  Wind,
  Moon,
  Sun,
  Menu,
  ChevronDown,
} from "lucide-react";

const elements = [
  { key: "fire" as const, icon: Flame },
  { key: "water" as const, icon: Droplet },
  { key: "air" as const, icon: Wind },
  { key: "moon" as const, icon: Moon },
  { key: "sun" as const, icon: Sun },
] as const;

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
    name: "Stun",
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
  currentXP: number;
  overallXP: number;
  currentGold: number;
  totalGold: number;
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
        currentXP: 0,
        overallXP: 0,
        currentGold: 0,
        totalGold: 0,
      },
      {
        name: "Red Guard",
        health: 10,
        level: 1,
        conditions: [],
        color: "red",
        maxHealth: 10,
        currentXP: 0,
        overallXP: 0,
        currentGold: 0,
        totalGold: 0,
      },
      {
        name: "Void Warden",
        health: 6,
        level: 1,
        conditions: [],
        color: "slate",
        maxHealth: 6,
        currentXP: 0,
        overallXP: 0,
        currentGold: 0,
        totalGold: 0,
      },
      {
        name: "Demolitionist",
        health: 8,
        level: 1,
        conditions: [],
        color: "orange",
        maxHealth: 8,
        currentXP: 0,
        overallXP: 0,
        currentGold: 0,
        totalGold: 0,
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

  const handleNextTurn = () => {
    Object.entries(elementStates).forEach(([element, value]) => {
      if ((value as number) > 0) {
        handleElementClick(element as keyof typeof elementStates);
      }
    });

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

  const handleCollectXPWithConfirmation = (characterName: string) => {
    const character = characters.find((char) => char.name === characterName);
    if (!character || character.currentXP === 0) {
      return (
        <span className="text-white text-2xl font-medium text-center">
          {character?.currentXP || 0}
        </span>
      );
    }

    return (
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <button className="text-white text-2xl font-medium text-center hover:text-white/80 transition-colors">
            {character.currentXP}
          </button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Collect Experience Points</AlertDialogTitle>
            <AlertDialogDescription>
              Are you ready to add {character.currentXP} XP to {character.name}
              's overall XP? This will reset current XP to 0.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={() => handleCollectXP(character.name)}>
              Confirm
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    );
  };

  const handleCollectGoldWithConfirmation = (characterName: string) => {
    const character = characters.find((char) => char.name === characterName);
    if (!character || character.currentGold === 0) {
      return (
        <span className="text-white text-2xl font-medium text-center">
          {character?.currentGold || 0}
        </span>
      );
    }

    return (
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <button className="text-white text-2xl font-medium text-center hover:text-white/80 transition-colors">
            {character.currentGold}
          </button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Collect Gold</AlertDialogTitle>
            <AlertDialogDescription>
              Are you ready to add {character.currentGold} gold to{" "}
              {character.name}
              's total gold? This will reset current gold to 0.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => handleCollectGold(character.name)}
            >
              Confirm
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    );
  };

  const [elementStates, setElementStates] = useState(() => {
    const saved = localStorage.getItem("elementStates");
    if (saved) {
      return JSON.parse(saved);
    }
    return {
      fire: 0,
      water: 0,
      air: 0,
      moon: 0,
      sun: 0,
    };
  });

  useEffect(() => {
    localStorage.setItem("elementStates", JSON.stringify(elementStates));
  }, [elementStates]);

  const handleElementClick = (element: keyof typeof elementStates) => {
    setElementStates((prev: typeof elementStates) => ({
      ...prev,
      [element]: (prev[element] + 1) % 3,
    }));
  };

  const getElementStyle = (element: keyof typeof elementStates) => {
    const colorMap = {
      fire: "bg-red-500 hover:bg-red-600",
      water: "bg-blue-500 hover:bg-blue-600",
      air: "bg-slate-500 hover:bg-slate-600",
      moon: "bg-purple-500 hover:bg-purple-600",
      sun: "bg-yellow-500 hover:bg-yellow-600",
    };

    switch (elementStates[element]) {
      case 1:
        return colorMap[element as keyof typeof colorMap];
      case 2:
        return `${colorMap[element as keyof typeof colorMap]} opacity-50`;
      default:
        return "";
    }
  };

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

  return (
    <div className="bg-gray-100 min-h-screen w-screen p-4 md:p-8">
      <div className="max-w-5xl mx-auto mb-4 flex flex-row gap-2 justify-between items-center">
        <Sheet>
          <SheetTrigger asChild>
            <Menu className="cursor-pointer" />
          </SheetTrigger>
          <SheetContent side="left">
            <SheetHeader>
              <SheetTitle>Settings & Commands</SheetTitle>
              <SheetDescription>
                You could find all commands and settings here.
              </SheetDescription>
            </SheetHeader>
            <div className="p-4 flex flex-col gap-2">
              <div className="flex flex-col gap-2">
                <button
                  onClick={() => toggleMenu("Commands")}
                  className="flex w-full items-center justify-between p-2 hover:bg-gray-100 rounded-md cursor-pointer"
                >
                  <span>Commands</span>
                  <ChevronDown
                    className={`w-4 h-4 transition-transform ${
                      openMenus["Commands"] ? "rotate-180" : ""
                    }`}
                  />
                </button>
                <div
                  className={`
                    grid transition-all duration-200 ease-in-out
                    ${
                      openMenus["Commands"]
                        ? "grid-rows-[1fr] opacity-100"
                        : "grid-rows-[0fr] opacity-0"
                    }
                  `}
                >
                  <div className="overflow-hidden pl-3 flex flex-col gap-2">
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button
                          variant="outline"
                          className="cursor-pointer hover:text-gray-700 transition-colors"
                        >
                          Next Turn
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Next Turn</AlertDialogTitle>
                          <AlertDialogDescription>
                            Are you ready to end the current turn? This will
                            remove specific conditions from all characters and
                            dwindle the element states.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <SheetClose asChild>
                            <AlertDialogAction onClick={() => handleNextTurn()}>
                              Confirm
                            </AlertDialogAction>
                          </SheetClose>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>

                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button
                          variant="outline"
                          className="cursor-pointer hover:text-gray-700 transition-colors"
                        >
                          Collect All
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>
                            Collect All Resources
                          </AlertDialogTitle>
                          <AlertDialogDescription>
                            Are you sure you want to collect all current XP and
                            gold for all characters? This will add their current
                            XP to overall XP, current gold to total gold, and
                            reset both to 0.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <SheetClose asChild>
                            <AlertDialogAction
                              onClick={() => {
                                characters.forEach((char) => {
                                  handleCollectXP(char.name);
                                  handleCollectGold(char.name);
                                });
                              }}
                            >
                              Confirm
                            </AlertDialogAction>
                          </SheetClose>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>

                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button
                          variant="outline"
                          className="cursor-pointer hover:text-gray-700 transition-colors"
                        >
                          Collect All XP
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>
                            Collect All Experience Points
                          </AlertDialogTitle>
                          <AlertDialogDescription>
                            Are you sure you want to collect current XP for all
                            characters? This will add their current XP to
                            overall XP and reset current XP to 0.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <SheetClose asChild>
                            <AlertDialogAction
                              onClick={() =>
                                characters.forEach((char) =>
                                  handleCollectXP(char.name)
                                )
                              }
                            >
                              Confirm
                            </AlertDialogAction>
                          </SheetClose>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>

                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button
                          variant="outline"
                          className="cursor-pointer hover:text-gray-700 transition-colors"
                        >
                          Collect All Gold
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Collect All Gold</AlertDialogTitle>
                          <AlertDialogDescription>
                            Are you sure you want to collect current gold for
                            all characters? This will add their current gold to
                            total gold and reset current gold to 0.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <SheetClose asChild>
                            <AlertDialogAction
                              onClick={() =>
                                characters.forEach((char) =>
                                  handleCollectGold(char.name)
                                )
                              }
                            >
                              Confirm
                            </AlertDialogAction>
                          </SheetClose>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </div>
              </div>
            </div>
          </SheetContent>
        </Sheet>
        <div className="flex flex-row gap-2">
          {elements.map(({ key, icon: Icon }) => (
            <Button
              key={key}
              className={`rounded-full w-10 h-10 ${getElementStyle(
                key
              )} cursor-pointer`}
              variant="outline"
              onClick={() => handleElementClick(key)}
            >
              <Icon />
            </Button>
          ))}
        </div>
      </div>
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
                <div className="flex flex-row gap-2">
                  <span className="text-white text-xs font-thin">
                    Level: <b>{character.level}</b>
                  </span>
                  <span className="text-white text-xs font-thin">
                    XP: <b>{character.overallXP}</b>
                  </span>
                  <span className="text-white text-xs font-thin">
                    Gold: <b>{character.totalGold}</b>
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-6 gap-3 mb-6">
                <div className="bg-white/10 rounded-lg col-span-2 flex flex-col items-center justify-center">
                  <div className="flex flex-col items-center justify-center my-2">
                    <p className="text-white text-sm text-center">Health</p>
                    <span className="text-white/70 text-xs font-thin">
                      Max ({character.maxHealth})
                    </span>
                  </div>

                  <span className="text-white text-2xl font-medium text-center">
                    {character.health}
                  </span>
                  <div className="flex w-full md:mt-2">
                    <Button
                      variant="ghost"
                      onClick={() => handleHealthChange(character.name, -1)}
                      className="text-white hover:bg-white/20 w-1/2 rounded-bl-lg rounded-br-none rounded-t-none flex items-center justify-center transition-colors cursor-pointer"
                    >
                      -
                    </Button>
                    <Button
                      variant="ghost"
                      onClick={() => handleHealthChange(character.name, 1)}
                      className="text-white hover:bg-white/20 w-1/2 bg rounded-br-lg rounded-bl-none rounded-t-none flex items-center justify-center transition-colors cursor-pointer"
                    >
                      +
                    </Button>
                  </div>
                </div>

                <div className="bg-white/10 rounded-lg col-span-2 flex flex-col items-center justify-between">
                  <div className="flex flex-col items-center justify-center my-2">
                    <p className="text-white text-sm text-center">Current XP</p>
                    <span className="text-white/70 text-xs font-thin">
                      Click XP to set
                    </span>
                  </div>
                  {handleCollectXPWithConfirmation(character.name)}
                  <div className="flex w-full md:mt-2">
                    <Button
                      variant="ghost"
                      onClick={() => handleXPChange(character.name, -1)}
                      className="text-white hover:bg-white/20 w-1/2 rounded-bl-lg rounded-br-none rounded-t-none flex items-center justify-center transition-colors cursor-pointer"
                    >
                      -
                    </Button>
                    <Button
                      variant="ghost"
                      onClick={() => handleXPChange(character.name, 1)}
                      className="text-white hover:bg-white/20 w-1/2 bg rounded-br-lg rounded-bl-none rounded-t-none flex items-center justify-center transition-colors cursor-pointer"
                    >
                      +
                    </Button>
                  </div>
                </div>

                <div className="bg-white/10 rounded-lg col-span-2 flex flex-col items-center justify-start">
                  <div className="flex flex-col items-center justify-center my-2">
                    <p className="text-white text-sm text-center">
                      Current Gold
                    </p>
                    <span className="text-white/70 text-xs font-thin">
                      Click gold to set
                    </span>
                  </div>
                  {handleCollectGoldWithConfirmation(character.name)}
                  <div className="flex w-full md:mt-2">
                    <Button
                      variant="ghost"
                      onClick={() => handleGoldChange(character.name, -1)}
                      className="text-white hover:bg-white/20 w-1/2 rounded-bl-lg rounded-br-none rounded-t-none flex items-center justify-center transition-colors cursor-pointer"
                    >
                      -
                    </Button>
                    <Button
                      variant="ghost"
                      onClick={() => handleGoldChange(character.name, 1)}
                      className="text-white hover:bg-white/20 w-1/2 bg rounded-br-lg rounded-bl-none rounded-t-none flex items-center justify-center transition-colors cursor-pointer"
                    >
                      +
                    </Button>
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
                    <button className="w-full bg-white/20 text-white rounded-lg px-3 py-2 text-left hover:bg-white/30 transition-colors cursor-pointer">
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
                              className="w-full text-left px-4 py-2 hover:bg-gray-100 rounded-lg cursor-pointer"
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
