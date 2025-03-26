import { useState, useCallback, useEffect } from "react";

export type CardHalfState = {
  top: boolean;
  bottom: boolean;
};

// Create a key to uniquely identify each card
const createCardKey = (characterName: string, cardName: string) =>
  `${characterName}-${cardName}`;

export const useAbilityCardStates = () => {
  // Load existing states from localStorage if available
  const [cardStates, setCardStates] = useState<Record<string, CardHalfState>>(
    () => {
      const savedStates = localStorage.getItem("abilityCardStates");
      return savedStates ? JSON.parse(savedStates) : {};
    }
  );

  // Save card states to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("abilityCardStates", JSON.stringify(cardStates));
  }, [cardStates]);

  // Initialize or update card states for a character's ability deck
  const initializeCardStates = useCallback(
    (characterName: string, cards: { name: string }[]) => {
      setCardStates((prevStates) => {
        const newStates = { ...prevStates };

        // Generate key for each card that includes the character name for uniqueness
        cards.forEach((card) => {
          const cardKey = createCardKey(characterName, card.name);
          if (!newStates[cardKey]) {
            newStates[cardKey] = { top: false, bottom: false };
          }
        });

        return newStates;
      });
    },
    []
  );

  // Toggle a specific half of a card
  const toggleCardHalf = useCallback(
    (characterName: string, cardName: string, half: "top" | "bottom") => {
      const cardKey = createCardKey(characterName, cardName);

      setCardStates((prevStates) => {
        // Ensure the card exists in state
        const currentState = prevStates[cardKey] || {
          top: false,
          bottom: false,
        };

        return {
          ...prevStates,
          [cardKey]: {
            ...currentState,
            [half]: !currentState[half],
          },
        };
      });
    },
    []
  );

  // Get the state for a specific card
  const getCardState = useCallback(
    (characterName: string, cardName: string): CardHalfState => {
      const cardKey = createCardKey(characterName, cardName);
      return cardStates[cardKey] || { top: false, bottom: false };
    },
    [cardStates]
  );

  // Handle next turn - make both halves opaque for any card with at least one half selected
  const handleNextTurn = useCallback(() => {
    console.log("Ability cards next turn handler triggered");
    console.log("Current card states:", cardStates);

    setCardStates((prevStates) => {
      const newStates = { ...prevStates };
      let changes = false;

      Object.keys(newStates).forEach((cardKey) => {
        const state = newStates[cardKey];
        if ((state.top || state.bottom) && !(state.top && state.bottom)) {
          newStates[cardKey] = { top: true, bottom: true };
          changes = true;
        }
      });

      console.log("Updated card states:", newStates);
      console.log("Changes made:", changes);

      return newStates;
    });
  }, [cardStates]);

  // Reset all card states for a character
  const resetCharacterCards = useCallback((characterName: string) => {
    setCardStates((prevStates) => {
      const newStates = { ...prevStates };

      Object.keys(newStates).forEach((cardKey) => {
        if (cardKey.startsWith(`${characterName}-`)) {
          newStates[cardKey] = { top: false, bottom: false };
        }
      });

      return newStates;
    });
  }, []);

  return {
    initializeCardStates,
    toggleCardHalf,
    getCardState,
    handleNextTurn,
    resetCharacterCards,
  };
};
