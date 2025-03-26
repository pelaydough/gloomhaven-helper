import { useParams, useNavigate } from "react-router-dom";
import { useCharacters } from "@/hooks/useCharacters";
import { renderAbilityDeck } from "@/lib/utils/renderAbilityDeck";
import { useAbilityCardStates } from "@/hooks/useAbilityCardStates";
import { useEffect } from "react";

const CharacterDetails = () => {
  const { name } = useParams();
  const navigate = useNavigate();
  const { characters } = useCharacters();
  const {
    initializeCardStates,
    toggleCardHalf,
    getCardState,
    resetCharacterCards,
  } = useAbilityCardStates();

  const character = characters.find((c) => c.name === name);

  useEffect(() => {
    if (character) {
      // Initialize card states for this character's ability deck
      initializeCardStates(character.name, character.abilityDeck);
    }
  }, [character, initializeCardStates]);

  if (!character) {
    return <div>Character not found</div>;
  }

  const handleResetCards = () => {
    if (character) {
      resetCharacterCards(character.name);
    }
  };

  return (
    <div className="max-w-5xl mx-auto">
      <div className="flex justify-between items-center mb-4">
        <button
          className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
          onClick={() => navigate("/")}
        >
          Back to Characters
        </button>
        <h1 className="text-2xl">{character.name}'s Ability Cards</h1>
        <button
          className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded"
          onClick={handleResetCards}
        >
          Reset All Cards
        </button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
        {renderAbilityDeck({
          character: character.abbreviation,
          characterName: character.name,
          cards: character.abilityDeck,
          getCardState,
          onCardHalfClick: toggleCardHalf,
        })}
      </div>
    </div>
  );
};

export default CharacterDetails;
