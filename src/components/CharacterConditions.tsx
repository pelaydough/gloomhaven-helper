import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { conditions } from "@/types";

type CharacterConditionsProps = {
  characterName: string;
  conditions: string[];
  onConditionRemove: (characterName: string, condition: string) => void;
  onConditionAdd: (characterName: string, condition: string) => void;
};

export const CharacterConditions = ({
  characterName,
  conditions: characterConditions,
  onConditionRemove,
  onConditionAdd,
}: CharacterConditionsProps) => {
  return (
    <div className="bg-white/10 rounded-lg p-4">
      <p className="text-white text-sm mb-2">Conditions</p>
      <div className="flex flex-wrap gap-2 mb-3">
        {characterConditions.map((condition, index) => (
          <span
            key={index}
            onClick={() => onConditionRemove(characterName, condition)}
            className="bg-white/20 text-white px-3 py-1 rounded-full text-sm cursor-pointer hover:bg-white/30 transition-colors"
          >
            {condition} ×
          </span>
        ))}
      </div>
      <Drawer>
        <DrawerTrigger asChild>
          <button className="w-full bg-white/20 text-white rounded-lg px-3 py-2 text-left hover:bg-white/30 transition-colors cursor-pointer">
            Add condition...
          </button>
        </DrawerTrigger>
        <DrawerContent>
          <div className="mx-auto w-full max-w-sm">
            <DrawerHeader>
              <DrawerTitle>Add Condition</DrawerTitle>
              <DrawerDescription>
                Select a condition to add to {characterName}
              </DrawerDescription>
            </DrawerHeader>
            <div className="p-4 flex flex-col gap-2">
              {conditions.map((condition) => (
                <DrawerClose key={condition.name} asChild>
                  <button
                    onClick={() => {
                      onConditionAdd(characterName, condition.name);
                    }}
                    className="w-full text-left px-4 py-2 hover:bg-gray-100 rounded-lg cursor-pointer"
                  >
                    {condition.name}
                  </button>
                </DrawerClose>
              ))}
            </div>
            <DrawerFooter>
              <DrawerClose asChild>
                <button className="w-full bg-gray-100 px-4 py-2 rounded-lg">
                  Cancel
                </button>
              </DrawerClose>
            </DrawerFooter>
          </div>
        </DrawerContent>
      </Drawer>
    </div>
  );
};
