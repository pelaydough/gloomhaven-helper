import { Button } from "@/components/ui/button";
import { elements, ElementKey } from "@/types";
import { Flame, Snowflake, Wind, Moon, Sun, Leaf } from "lucide-react";

type ElementsProps = {
  getElementStyle: (element: ElementKey) => string;
  handleElementClick: (element: ElementKey) => void;
};

const iconMap = {
  Flame,
  Snowflake,
  Wind,
  Moon,
  Sun,
  Leaf,
};

export const Elements = ({
  getElementStyle,
  handleElementClick,
}: ElementsProps) => {
  return (
    <div className="flex flex-row gap-2">
      {elements.map(({ key, icon }) => {
        const Icon = iconMap[icon as keyof typeof iconMap];
        return (
          <Button
            key={key}
            className={`rounded-full w-10 h-10 ${getElementStyle(
              key
            )} cursor-pointer`}
            variant="outline"
            onClick={() => handleElementClick(key)}
          >
            <Icon />
          </Button>
        );
      })}
    </div>
  );
};
