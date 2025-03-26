import { Button } from "@/components/ui/button";

type CharacterHealthProps = {
  characterName: string;
  health: number;
  maxHealth: number;
  onHealthChange: (characterName: string, delta: number) => void;
};

export const CharacterHealth = ({
  characterName,
  health,
  maxHealth,
  onHealthChange,
}: CharacterHealthProps) => {
  return (
    <div className="bg-white/10 rounded-lg col-span-2 flex flex-col items-center justify-center">
      <div className="flex flex-col items-center justify-center my-2">
        <p className="text-white text-sm text-center">Health</p>
        <span className="text-white/70 text-xs font-thin">
          Max ({maxHealth})
        </span>
      </div>

      <span className="text-white text-2xl font-medium text-center">
        {health}
      </span>
      <div className="flex w-full md:mt-2">
        <Button
          variant="ghost"
          onClick={() => onHealthChange(characterName, -1)}
          className="text-white hover:bg-white/20 w-1/2 rounded-bl-lg rounded-br-none rounded-t-none flex items-center justify-center transition-colors cursor-pointer"
        >
          -
        </Button>
        <Button
          variant="ghost"
          onClick={() => onHealthChange(characterName, 1)}
          className="text-white hover:bg-white/20 w-1/2 bg rounded-br-lg rounded-bl-none rounded-t-none flex items-center justify-center transition-colors cursor-pointer"
        >
          +
        </Button>
      </div>
    </div>
  );
};
