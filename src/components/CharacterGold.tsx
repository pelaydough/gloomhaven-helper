import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

type CharacterGoldProps = {
  characterName: string;
  currentGold: number;
  onGoldChange: (characterName: string, delta: number) => void;
  onCollectGold: (characterName: string) => void;
};

export const CharacterGold = ({
  characterName,
  currentGold,
  onGoldChange,
  onCollectGold,
}: CharacterGoldProps) => {
  if (currentGold === 0) {
    return (
      <div className="bg-white/10 rounded-lg col-span-2 flex flex-col items-center justify-start">
        <div className="flex flex-col items-center justify-center my-2">
          <p className="text-white text-sm text-center">Current Gold</p>
          <span className="text-white/70 text-xs font-thin">
            Click gold to set
          </span>
        </div>
        <span className="text-white text-2xl font-medium text-center">
          {currentGold}
        </span>
        <div className="flex w-full md:mt-2">
          <Button
            variant="ghost"
            onClick={() => onGoldChange(characterName, -1)}
            className="text-white hover:bg-white/20 w-1/2 rounded-bl-lg rounded-br-none rounded-t-none flex items-center justify-center transition-colors cursor-pointer"
          >
            -
          </Button>
          <Button
            variant="ghost"
            onClick={() => onGoldChange(characterName, 1)}
            className="text-white hover:bg-white/20 w-1/2 bg rounded-br-lg rounded-bl-none rounded-t-none flex items-center justify-center transition-colors cursor-pointer"
          >
            +
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white/10 rounded-lg col-span-2 flex flex-col items-center justify-start">
      <div className="flex flex-col items-center justify-center my-2">
        <p className="text-white text-sm text-center">Current Gold</p>
        <span className="text-white/70 text-xs font-thin">
          Click gold to set
        </span>
      </div>
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <button className="text-white text-2xl font-medium text-center hover:text-white/80 transition-colors">
            {currentGold}
          </button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Collect Gold</AlertDialogTitle>
            <AlertDialogDescription>
              Are you ready to add {currentGold} gold to {characterName}
              's total gold? This will reset current gold to 0.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={() => onCollectGold(characterName)}>
              Confirm
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      <div className="flex w-full md:mt-2">
        <Button
          variant="ghost"
          onClick={() => onGoldChange(characterName, -1)}
          className="text-white hover:bg-white/20 w-1/2 rounded-bl-lg rounded-br-none rounded-t-none flex items-center justify-center transition-colors cursor-pointer"
        >
          -
        </Button>
        <Button
          variant="ghost"
          onClick={() => onGoldChange(characterName, 1)}
          className="text-white hover:bg-white/20 w-1/2 bg rounded-br-lg rounded-bl-none rounded-t-none flex items-center justify-center transition-colors cursor-pointer"
        >
          +
        </Button>
      </div>
    </div>
  );
};
