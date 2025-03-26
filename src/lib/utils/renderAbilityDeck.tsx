import { BASE_URL } from "../../constants";

export const renderAbilityDeck = (
  character: string,
  cards: { name: string }[]
) => {
  return cards.map((card) => {
    const formattedCardName = card.name.split(" ").join("-").toLowerCase();
    const imageUrl = `${BASE_URL}${character}/jl-${formattedCardName}.jpeg`;

    return (
      <img
        key={card.name}
        src={imageUrl}
        alt={`${card.name} ability card`}
        className="ability-card"
      />
    );
  });
};
