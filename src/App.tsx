import { Elements } from "@/components/Elements";
import { CharacterCard } from "@/components/CharacterCard";
import { CommandMenu } from "@/components/CommandMenu";
import { useCharacters } from "@/hooks/useCharacters";
import { useElementStates } from "@/hooks/useElementStates";
import { useMenuState } from "@/hooks/useMenuState";
import { useAbilityCardStates } from "@/hooks/useAbilityCardStates";
import { Routes, Route } from "react-router-dom";
import CharacterDetails from "./components/CharacterDetails";

function App() {
  const {
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
  } = useCharacters();

  const {
    handleElementClick,
    getElementStyle,
    handleNextTurn: handleElementNextTurn,
  } = useElementStates();

  const abilityCardStates = useAbilityCardStates();

  const { openMenus, toggleMenu } = useMenuState();

  console.log(characters);

  const handleNextTurn = () => {
    console.log("Next turn triggered");

    handleElementNextTurn();
    console.log("Element states updated");

    removeTemporaryConditions();
    console.log("Temporary conditions removed");

    abilityCardStates.handleNextTurn();
    console.log("Ability cards updated");
  };

  return (
    <div className="bg-gray-100 min-h-screen p-4 md:p-8">
      <div className="max-w-5xl mx-auto mb-4 md:mb-8 flex flex-row gap-2 justify-between items-center">
        <CommandMenu
          openMenus={openMenus}
          onToggleMenu={toggleMenu}
          onNextTurn={handleNextTurn}
          onCollectAllResources={handleCollectAllResources}
          onCollectAllXP={handleCollectAllXP}
          onCollectAllGold={handleCollectAllGold}
        />
        <Elements
          getElementStyle={getElementStyle}
          handleElementClick={handleElementClick}
        />
      </div>
      <Routes>
        <Route
          path="/"
          element={
            <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-4">
              {characters.map((character) => (
                <CharacterCard
                  key={character.name}
                  character={character}
                  characterColor={characterColor}
                  onHealthChange={handleHealthChange}
                  onXPChange={handleXPChange}
                  onGoldChange={handleGoldChange}
                  onCollectXP={handleCollectXP}
                  onCollectGold={handleCollectGold}
                  onConditionAdd={handleConditionAdd}
                  onConditionRemove={handleConditionRemove}
                />
              ))}
            </div>
          }
        />
        <Route path="/character/:name" element={<CharacterDetails />} />
      </Routes>
    </div>
  );
}

export default App;
