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

type CharacterXPProps = {
  characterName: string;
  currentXP: number;
  onXPChange: (characterName: string, delta: number) => void;
  onCollectXP: (characterName: string) => void;
};

export const CharacterXP = ({
  characterName,
  currentXP,
  onXPChange,
  onCollectXP,
}: CharacterXPProps) => {
  if (currentXP === 0) {
    return (
      <div className="bg-white/10 rounded-lg col-span-2 flex flex-col items-center justify-between">
        <div className="flex flex-col items-center justify-center my-2">
          <p className="text-white text-sm text-center">Current XP</p>
          <span className="text-white/70 text-xs font-thin">
            Click XP to set
          </span>
        </div>
        <span className="text-white text-2xl font-medium text-center">
          {currentXP}
        </span>
        <div className="flex w-full md:mt-2">
          <Button
            variant="ghost"
            onClick={() => onXPChange(characterName, -1)}
            className="text-white hover:bg-white/20 w-1/2 rounded-bl-lg rounded-br-none rounded-t-none flex items-center justify-center transition-colors cursor-pointer"
          >
            -
          </Button>
          <Button
            variant="ghost"
            onClick={() => onXPChange(characterName, 1)}
            className="text-white hover:bg-white/20 w-1/2 bg rounded-br-lg rounded-bl-none rounded-t-none flex items-center justify-center transition-colors cursor-pointer"
          >
            +
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white/10 rounded-lg col-span-2 flex flex-col items-center justify-between">
      <div className="flex flex-col items-center justify-center my-2">
        <p className="text-white text-sm text-center">Current XP</p>
        <span className="text-white/70 text-xs font-thin">Click XP to set</span>
      </div>
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <button className="text-white text-2xl font-medium text-center hover:text-white/80 transition-colors">
            {currentXP}
          </button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Collect Experience Points</AlertDialogTitle>
            <AlertDialogDescription>
              Are you ready to add {currentXP} XP to {characterName}
              's overall XP? This will reset current XP to 0.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={() => onCollectXP(characterName)}>
              Confirm
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      <div className="flex w-full md:mt-2">
        <Button
          variant="ghost"
          onClick={() => onXPChange(characterName, -1)}
          className="text-white hover:bg-white/20 w-1/2 rounded-bl-lg rounded-br-none rounded-t-none flex items-center justify-center transition-colors cursor-pointer"
        >
          -
        </Button>
        <Button
          variant="ghost"
          onClick={() => onXPChange(characterName, 1)}
          className="text-white hover:bg-white/20 w-1/2 bg rounded-br-lg rounded-bl-none rounded-t-none flex items-center justify-center transition-colors cursor-pointer"
        >
          +
        </Button>
      </div>
    </div>
  );
};
