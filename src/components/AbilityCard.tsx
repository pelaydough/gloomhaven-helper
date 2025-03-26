import React from "react";
import { ActionText } from "./ActionText";
import { Separator } from "./ui/separator";
import { Sword, Footprints, SquareX } from "lucide-react";
import { Card, Character } from "@/types";
import AOE from "./AOE";
import { useCharacters } from "@/hooks/useCharacters";

interface AbilityCardProps {
  card: Card;
}

export const AbilityCard: React.FC<AbilityCardProps> = ({ card }) => {
  const { characters } = useCharacters();
  const character = characters.find((c) => c.id === card.characterId);

  // Color mapping based on character color
  const getColorClass = (type: string, shade: number) => {
    if (!character)
      return type === "bg" ? `bg-orange-${shade}` : `text-orange-${shade}`;

    switch (character.color) {
      case "blue":
        return type === "bg" ? `bg-blue-${shade}` : `text-blue-${shade}`;
      case "red":
        return type === "bg" ? `bg-red-${shade}` : `text-red-${shade}`;
      case "slate":
        return type === "bg" ? `bg-slate-${shade}` : `text-slate-${shade}`;
      case "orange":
        return type === "bg" ? `bg-orange-${shade}` : `text-orange-${shade}`;
      default:
        return type === "bg" ? `bg-gray-${shade}` : `text-gray-${shade}`;
    }
  };

  // Apply dynamic color classes based on character color
  const bgDark = getColorClass("bg", 950);
  const bgMedium = getColorClass("bg", 900);
  const border = getColorClass("border", 500);
  const textLight = getColorClass("text", 100);
  const bgLight = getColorClass("bg", 400);
  const textDark = getColorClass("text", 950);
  const textHighlight = getColorClass("text", 50);

  return (
    <div
      className={`${bgDark} rounded-xl p-2 shadow-lg overflow-hidden w-[360px] flex flex-col transition-all duration-300 hover:scale-[1.02] hover:shadow-xl border-2 border-black/20`}
    >
      <div className={`border ${border} rounded-xl relative`}>
        <div
          className={`${bgDark} absolute px-3 py-1 -top-3 left-1/2 -translate-x-1/2 z-10 flex rounded-md whitespace-nowrap w-fit`}
        >
          <h2
            className={`${textLight} text-xl font-thin tracking-wide text-center`}
          >
            {card.name}
          </h2>
          <span
            className={`${textDark} ${bgLight} px-3 py-1 rounded-sm text-xs font-medium absolute top-8 left-1/2 -translate-x-1/2`}
          >
            {card.level}
          </span>
        </div>

        {/* Card Body */}
        <div className="flex flex-col flex-1">
          {/* Top Action */}
          <div className={`p-2 relative h-[250px] ${bgDark} rounded-t-xl`}>
            <div
              className={`${bgMedium} rounded-md pt-11 pb-7 px-3 h-full w-full shadow-inner text-center flex flex-col justify-center items-center overflow-auto`}
            >
              <div className={`${textHighlight} w-full flex justify-around`}>
                <div className="flex w-fit flex-col justify-center">
                  <ActionText text={card.topAction.text} />
                </div>
                {card.topAction.aoe && <AOE matrix={card.topAction.aoe} />}
              </div>
            </div>
            {card.topAction.lost && (
              <SquareX className="w-8 h-8 absolute bottom-3 right-3 text-red-200" />
            )}
          </div>

          {/* Initiative Divider */}
          <div className="relative">
            <span
              className={`${textHighlight} text-sm ${bgDark} font-medium px-2 py-1 rounded-tr-md absolute -top-7.5 left-1 flex items-center gap-2`}
            >
              <Sword className="w-4 h-4" />2
            </span>
            <span
              className={`absolute left-1/2 -translate-x-1/2 flex items-center justify-center -top-6 ${textHighlight} w-fit text-3xl ${bgDark} font-medium rounded-md px-3 py-2 z-10`}
            >
              {card.initiative}
            </span>
            <Separator className={border} />
            <span
              className={`${textHighlight} text-sm ${bgDark} font-medium px-2 py-1 rounded-br-md absolute top-1.5 left-1 flex items-center gap-2 z-10`}
            >
              <Footprints className="w-4 h-4" />2
            </span>
          </div>

          {/* Bottom Action */}
          <div className={`p-2 relative h-[250px] ${bgDark} rounded-b-xl`}>
            <div
              className={`${bgMedium} rounded-md pt-8 pb-2 px-3 h-full w-full text-center flex flex-col justify-center items-center overflow-auto`}
            >
              <div className={`${textHighlight} w-full`}>
                <ActionText text={card.bottomAction.text} />
              </div>
            </div>
            {card.bottomAction.lost && (
              <SquareX className="w-8 h-8 absolute bottom-3 right-3 text-red-200" />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
