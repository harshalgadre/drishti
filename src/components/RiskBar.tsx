import React from "react";

interface RiskBarProps {
  label: string;
  value: number; // 0 to 100
  colorVariant?: "high" | "primary" | "moderate" | "safe" | "danger" | "auto";
  unit?: string;
  className?: string;
}

export const RiskBar: React.FC<RiskBarProps> = ({
  label,
  value,
  colorVariant = "auto",
  unit = "%",
  className = "",
}) => {
  const getColorClass = () => {
    if (colorVariant !== "auto") {
      switch (colorVariant) {
        case "high":
          return "bg-high";
        case "primary":
          return "bg-primary";
        case "moderate":
          return "bg-moderate";
        case "safe":
          return "bg-safe";
        case "danger":
          return "bg-danger";
      }
    }

    if (value >= 75) return "bg-high";
    if (value >= 60) return "bg-moderate";
    if (value >= 40) return "bg-primary";
    return "bg-safe";
  };

  const clampedValue = Math.min(100, Math.max(0, value));

  return (
    <div
      className={`flex items-center gap-2 mb-1.5 group ${className}`}
      data-component="@components/RiskBar.jsx"
    >
      <div className="text-xs text-muted-foreground w-28 shrink-0 font-medium">
        {label}
      </div>
      <div className="flex-1 bg-secondary rounded-full h-1.5 overflow-hidden">
        <div
          className={`${getColorClass()} h-1.5 rounded-full transition-all duration-700 ease-out shadow-[0_0_8px_currentColor]`}
          style={{ width: `${clampedValue}%` }}
        />
      </div>
      <div className="text-xs text-foreground font-semibold w-9 text-right font-mono">
        {value}
        {unit}
      </div>
    </div>
  );
};

export default RiskBar;
