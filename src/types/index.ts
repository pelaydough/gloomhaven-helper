export type ElementKey = "fire" | "ice" | "air" | "dark" | "light" | "earth";

export type ElementStates = Record<ElementKey, number>;

export type Character = {
  id: number;
  name: string;
  abbreviation: string;
  health: number;
  level: number;
  conditions: string[];
  color: string;
  maxHealth: number;
  currentXP: number;
  overallXP: number;
  currentGold: number;
  totalGold: number;
  abilityDeck: AbilityCard[];
};

export type AbilityCard = {
  name: string;
};

export type Condition = {
  name: string;
  imageUrl: string;
};

export const elements = [
  { key: "fire" as const, icon: "Flame" },
  { key: "ice" as const, icon: "Snowflake" },
  { key: "air" as const, icon: "Wind" },
  { key: "dark" as const, icon: "Moon" },
  { key: "light" as const, icon: "Sun" },
  { key: "earth" as const, icon: "Leaf" },
] as const;

export const conditions: Condition[] = [
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
