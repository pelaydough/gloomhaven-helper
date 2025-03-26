import { Elements } from "@/components/Elements";
import { CharacterCard } from "@/components/CharacterCard";
import { CommandMenu } from "@/components/CommandMenu";
import { useCharacters } from "@/hooks/useCharacters";
import { useElementStates } from "@/hooks/useElementStates";
import { useMenuState } from "@/hooks/useMenuState";

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

  const { openMenus, toggleMenu } = useMenuState();

  console.log(characters);

  const handleNextTurn = () => {
    handleElementNextTurn();
    removeTemporaryConditions();
  };

  return (
    <div className="bg-gray-100 min-h-screen w-screen p-4 md:p-8">
      <div className="max-w-5xl mx-auto mb-4 flex flex-row gap-2 justify-between items-center">
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
    </div>
  );
}

export default App;
