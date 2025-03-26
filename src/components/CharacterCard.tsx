import { Character } from "@/types";
import { CharacterHealth } from "./CharacterHealth";
import { CharacterXP } from "./CharacterXP";
import { CharacterGold } from "./CharacterGold";
import { CharacterConditions } from "./CharacterConditions";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { renderAbilityDeck } from "@/lib/utils/renderAbilityDeck";
import { useState, useRef } from "react";
import { X } from "lucide-react";

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
  const [open, setOpen] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const handleCardClick = (e: React.MouseEvent) => {
    const target = e.target as Element;

    const isInteractive =
      target.closest("button") !== null ||
      target.closest("input") !== null ||
      target.closest("[data-interactive]") !== null;

    if (!isInteractive && cardRef.current && cardRef.current.contains(target)) {
      setOpen(true);
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

      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogContent className="max-w-4xl max-h-[90vh] overflow-auto">
          <AlertDialogHeader>
            <div className="flex justify-between items-center">
              <AlertDialogTitle>
                {character.name}'s Ability Deck
              </AlertDialogTitle>
              <AlertDialogCancel className="h-6 w-6 rounded-sm opacity-70 p-0 hover:opacity-100">
                <X className="h-4 w-4" />
              </AlertDialogCancel>
            </div>
          </AlertDialogHeader>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {renderAbilityDeck(character.abbreviation, character.abilityDeck)}
          </div>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};
