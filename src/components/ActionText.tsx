import React from "react";
import {
  Sword,
  Footprints,
  Dumbbell,
  OctagonX,
  CircleHelp,
  ArrowUpRight,
  Target,
  ArrowBigLeftDash,
  CircleArrowUp,
  Star,
  Flame,
  X,
  Circle,
} from "lucide-react";

// New component for status effects
interface StatusEffectProps {
  icon: React.ReactNode;
  text: string;
  color: string;
  lineIndex: number;
  index: number;
  showText?: boolean;
}

const StatusEffect: React.FC<StatusEffectProps> = ({
  icon,
  text,
  color,
  lineIndex,
  index,
  showText = true,
}) => {
  return (
    <span
      key={`${lineIndex}-${index}`}
      className="inline-flex items-center gap-1"
      style={{ verticalAlign: "middle", color }}
    >
      {icon}
      {showText && <span className="font-bold">{text}</span>}
    </span>
  );
};

// Component for elemental cost display - icon in a circle with an X overlay
interface ElementalCostProps {
  IconComponent: React.ComponentType<{
    className?: string;
    style?: React.CSSProperties;
  }>;
  color: string;
  size?: string;
}

const ElementalCost: React.FC<ElementalCostProps> = ({
  IconComponent,
  color,
  size = "h-7 w-7",
}) => {
  return (
    <div className="relative inline-block bg-white rounded-full">
      {/* Circle container */}
      <Circle
        className={`inline ${size}`}
        style={{ color: "black", opacity: 0.8 }}
      />

      {/* Element icon */}
      <div
        className="absolute inset-0 flex items-center justify-center"
        style={{ transform: "scale(0.6)" }}
      >
        <IconComponent className={`inline ${size}`} style={{ color }} />
      </div>

      {/* X overlay */}
      <div className="absolute inset-0 flex items-center justify-center">
        <X
          className={`inline ${size}`}
          style={{ color: "black", opacity: 0.9, strokeWidth: 1 }}
        />
      </div>
    </div>
  );
};

// Types for our configuration system
type IconConfig = {
  type: "icon";
  icon: React.ComponentType<{
    className?: string;
    style?: React.CSSProperties;
  }>;
  color: string;
  showText?: boolean;
  isElementalCost?: boolean;
};

type DividerConfig = {
  type: "divider";
  className: string;
};

type GameElementConfig = IconConfig | DividerConfig;

const gameElements: Record<string, GameElementConfig> = {
  ATTACK: {
    type: "icon",
    icon: Sword,
    color: "#F2F2F2",
    showText: false,
  },
  MOVE: {
    type: "icon",
    icon: Footprints,
    color: "#F2F2F2",
    showText: false,
  },
  RANGE: {
    type: "icon",
    icon: ArrowUpRight,
    color: "#F2F2F2",
    showText: false,
  },
  TARGET: {
    type: "icon",
    icon: Target,
    color: "#F2F2F2",
    showText: false,
  },
  PUSH: {
    type: "icon",
    icon: ArrowBigLeftDash,
    color: "oklch(0.673 0.182 276.935)",
    showText: true,
  },
  LOOT: {
    type: "icon",
    icon: CircleArrowUp,
    color: "#F2F2F2",
    showText: false,
  },
  STRENGTHEN: {
    type: "icon",
    icon: Dumbbell,
    color: "oklch(0.707 0.165 254.624)",
  },
  FIRE: {
    type: "icon",
    icon: Flame,
    color: "oklch(0.577 0.245 27.325)",
    showText: false,
  },
  FIRECOST: {
    type: "icon",
    icon: Flame,
    color: "oklch(0.577 0.245 27.325)",
    showText: false,
    isElementalCost: true,
  },
  EXPERIENCE: {
    type: "icon",
    icon: Star,
    color: "#F2F2F2",
    showText: false,
  },
  MUDDLE: {
    type: "icon",
    icon: CircleHelp,
    color: "oklch(0.945 0.129 101.54)",
    showText: true,
  },
  STUN: {
    type: "icon",
    icon: OctagonX,
    color: "oklch(0.827 0.119 306.383)",
  },
  "---": {
    type: "divider",
    className: "my-1 border-1 border-t border-dashed border-[#f2f2f2] h-0",
  },
};

interface ActionTextProps {
  text: string;
}

export const ActionText: React.FC<ActionTextProps> = ({ text }) => {
  const lines = text.split("\n");

  const elementsPattern = Object.keys(gameElements)
    .map((key) => (key === "---" ? "\\-\\-\\-" : `\\b${key}\\b`))
    .join("|");
  const pattern = new RegExp(
    `(${elementsPattern}|\\bJump\\b|\\bexperience\\b)`
  );

  return (
    <div className="flex flex-col items-center text-center">
      {lines.map((line, lineIndex) => {
        const parts = line.split(pattern);

        return (
          <div
            key={`line-${lineIndex}`}
            className="flex justify-center flex-wrap w-full"
          >
            {parts.map((part, index) => {
              const element = gameElements[part];

              if (element) {
                if (element.type === "divider") {
                  return (
                    <hr
                      key={`divider-${lineIndex}-${index}`}
                      className={element.className}
                      style={{ width: "40px", margin: "6px 0" }}
                    />
                  );
                } else {
                  const IconComponent = element.icon;
                  return (
                    <span
                      key={`effect-wrapper-${lineIndex}-${index}`}
                      className="mx-1"
                    >
                      <StatusEffect
                        key={`effect-${lineIndex}-${index}`}
                        icon={
                          element.isElementalCost || part.endsWith("COST") ? (
                            <ElementalCost
                              IconComponent={IconComponent}
                              color={element.color}
                            />
                          ) : (
                            <IconComponent
                              className="inline h-5 w-5"
                              style={{ color: element.color }}
                            />
                          )
                        }
                        text={part}
                        color={element.color}
                        lineIndex={lineIndex}
                        index={index}
                        showText={element.showText !== false}
                      />
                    </span>
                  );
                }
              }

              return <span key={`${lineIndex}-${index}`}>{part}</span>;
            })}
          </div>
        );
      })}
    </div>
  );
};
