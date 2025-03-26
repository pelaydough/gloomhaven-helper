import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
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
import { Button } from "@/components/ui/button";
import { Menu, ChevronDown } from "lucide-react";

type CommandMenuProps = {
  openMenus: Record<string, boolean>;
  onToggleMenu: (title: string) => void;
  onNextTurn: () => void;
  onCollectAllResources: () => void;
  onCollectAllXP: () => void;
  onCollectAllGold: () => void;
};

export const CommandMenu = ({
  openMenus,
  onToggleMenu,
  onNextTurn,
  onCollectAllResources,
  onCollectAllXP,
  onCollectAllGold,
}: CommandMenuProps) => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Menu className="cursor-pointer" />
      </SheetTrigger>
      <SheetContent side="left">
        <SheetHeader>
          <SheetTitle>Settings & Commands</SheetTitle>
          <SheetDescription>
            You could find all commands and settings here.
          </SheetDescription>
        </SheetHeader>
        <div className="p-4 flex flex-col gap-2">
          <div className="flex flex-col gap-2">
            <button
              onClick={() => onToggleMenu("Commands")}
              className="flex w-full items-center justify-between p-2 hover:bg-gray-100 rounded-md cursor-pointer"
            >
              <span>Commands</span>
              <ChevronDown
                className={`w-4 h-4 transition-transform ${
                  openMenus["Commands"] ? "rotate-180" : ""
                }`}
              />
            </button>
            <div
              className={`
                grid transition-all duration-200 ease-in-out
                ${
                  openMenus["Commands"]
                    ? "grid-rows-[1fr] opacity-100"
                    : "grid-rows-[0fr] opacity-0"
                }
              `}
            >
              <div className="overflow-hidden pl-3 flex flex-col gap-2">
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button
                      variant="outline"
                      className="cursor-pointer hover:text-gray-700 transition-colors"
                    >
                      Next Turn
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Next Turn</AlertDialogTitle>
                      <AlertDialogDescription>
                        Are you ready to end the current turn? This will remove
                        specific conditions from all characters and dwindle the
                        element states.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <SheetClose asChild>
                        <AlertDialogAction onClick={onNextTurn}>
                          Confirm
                        </AlertDialogAction>
                      </SheetClose>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>

                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button
                      variant="outline"
                      className="cursor-pointer hover:text-gray-700 transition-colors"
                    >
                      Collect All
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Collect All Resources</AlertDialogTitle>
                      <AlertDialogDescription>
                        Are you sure you want to collect all current XP and gold
                        for all characters? This will add their current XP to
                        overall XP, current gold to total gold, and reset both
                        to 0.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <SheetClose asChild>
                        <AlertDialogAction onClick={onCollectAllResources}>
                          Confirm
                        </AlertDialogAction>
                      </SheetClose>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>

                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button
                      variant="outline"
                      className="cursor-pointer hover:text-gray-700 transition-colors"
                    >
                      Collect All XP
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>
                        Collect All Experience Points
                      </AlertDialogTitle>
                      <AlertDialogDescription>
                        Are you sure you want to collect current XP for all
                        characters? This will add their current XP to overall XP
                        and reset current XP to 0.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <SheetClose asChild>
                        <AlertDialogAction onClick={onCollectAllXP}>
                          Confirm
                        </AlertDialogAction>
                      </SheetClose>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>

                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button
                      variant="outline"
                      className="cursor-pointer hover:text-gray-700 transition-colors"
                    >
                      Collect All Gold
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Collect All Gold</AlertDialogTitle>
                      <AlertDialogDescription>
                        Are you sure you want to collect current gold for all
                        characters? This will add their current gold to total
                        gold and reset current gold to 0.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <SheetClose asChild>
                        <AlertDialogAction onClick={onCollectAllGold}>
                          Confirm
                        </AlertDialogAction>
                      </SheetClose>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};
