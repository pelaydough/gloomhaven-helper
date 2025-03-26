import { BASE_URL } from "../../constants";
import { CardHalfState } from "@/hooks/useAbilityCardStates";

export type AbilityDeckRendererProps = {
  character: string;
  characterName: string;
  cards: { name: string }[];
  getCardState: (characterName: string, cardName: string) => CardHalfState;
  onCardHalfClick: (
    characterName: string,
    cardName: string,
    half: "top" | "bottom"
  ) => void;
};

export const renderAbilityDeck = ({
  character,
  characterName,
  cards,
  getCardState,
  onCardHalfClick,
}: AbilityDeckRendererProps) => {
  return cards.map((card) => {
    const formattedCardName = card.name.split(" ").join("-").toLowerCase();
    const imageUrl = `${BASE_URL}${character}/jl-${formattedCardName}.jpeg`;
    const cardState = getCardState(characterName, card.name);

    return (
      <div key={card.name} className="relative rounded-lg w-full">
        <img
          src={imageUrl}
          alt={`${card.name} ability card`}
          className="rounded-lg w-full"
        />
        {/* Top half overlay */}
        <div
          className={`absolute top-0 left-0 w-full h-[54%] rounded-t-lg cursor-pointer transition-opacity ${
            cardState?.top
              ? "bg-black opacity-80"
              : "opacity-0 hover:bg-black hover:opacity-10"
          }`}
          onClick={(e) => {
            e.stopPropagation();
            onCardHalfClick(characterName, card.name, "top");
          }}
        />
        {/* Bottom half overlay */}
        <div
          className={`absolute bottom-0 left-0 w-full h-[46%] rounded-b-lg cursor-pointer transition-opacity ${
            cardState?.bottom
              ? "bg-black opacity-80"
              : "opacity-0 hover:bg-black hover:opacity-10"
          }`}
          onClick={(e) => {
            e.stopPropagation();
            onCardHalfClick(characterName, card.name, "bottom");
          }}
        />
      </div>
    );
  });
};
