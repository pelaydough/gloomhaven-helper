import { Character } from "@/types";
import { CharacterHealth } from "./CharacterHealth";
import { CharacterXP } from "./CharacterXP";
import { CharacterGold } from "./CharacterGold";
import { CharacterConditions } from "./CharacterConditions";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";

type CharacterCardProps = {
  character: Character;
  characterColor: (character: Character) => string;
  onHealthChange: (characterName: string, delta: number) => void;
  onXPChange: (characterName: string, delta: number) => void;
  onGoldChange: (characterName: string, delta: number) => void;
  onCollectXP: (characterName: string) => void;
  onCollectGold: (characterName: string) => void;
  onConditionAdd: (characterName: string, condition: string) => void;
  onConditionRemove: (characterName: string, condition: string) => void;
};

export const CharacterCard = ({
  character,
  characterColor,
  onHealthChange,
  onXPChange,
  onGoldChange,
  onCollectXP,
  onCollectGold,
  onConditionAdd,
  onConditionRemove,
}: CharacterCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const handleCardClick = (e: React.MouseEvent) => {
    const target = e.target as Element;

    const isInteractive =
      target.closest("button") !== null ||
      target.closest("input") !== null ||
      target.closest("[data-interactive]") !== null;

    if (!isInteractive && cardRef.current && cardRef.current.contains(target)) {
      navigate(`/character/${character.name}`);
    }
  };

  return (
    <>
      <div
        ref={cardRef}
        onClick={handleCardClick}
        className={`${characterColor(
          character
        )} rounded-lg shadow-lg overflow-hidden transition-transform hover:scale-[1.02] cursor-pointer`}
      >
        <div className="p-6 w-full">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-white text-2xl font-medium">
              {character.name}
            </h1>
            <div className="flex flex-row gap-2 items-center">
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

          <div data-interactive className="grid grid-cols-6 gap-3 mb-6">
            <CharacterHealth
              characterName={character.name}
              health={character.health}
              maxHealth={character.maxHealth}
              onHealthChange={onHealthChange}
            />

            <CharacterXP
              characterName={character.name}
              currentXP={character.currentXP}
              onXPChange={onXPChange}
              onCollectXP={onCollectXP}
            />

            <CharacterGold
              characterName={character.name}
              currentGold={character.currentGold}
              onGoldChange={onGoldChange}
              onCollectGold={onCollectGold}
            />
          </div>

          <div data-interactive>
            <CharacterConditions
              characterName={character.name}
              conditions={character.conditions}
              onConditionAdd={onConditionAdd}
              onConditionRemove={onConditionRemove}
            />
          </div>
        </div>
      </div>
    </>
  );
};
