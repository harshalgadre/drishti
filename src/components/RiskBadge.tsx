import React from "react";

export type RiskLevel =
  | "safe"
  | "moderate"
  | "high"
  | "critical"
  | "unsafe"
  | "warning";

interface RiskBadgeProps {
  level?: RiskLevel;
  children?: React.ReactNode;
  className?: string;
  pulse?: boolean;
}

export const RiskBadge: React.FC<RiskBadgeProps> = ({
  level = "safe",
  children,
  className = "",
  pulse = false,
}) => {
  const normalizedLevel = level.toLowerCase() as RiskLevel;

  const getStyle = () => {
    switch (normalizedLevel) {
      case "safe":
        return "bg-safe text-primary-foreground border-emerald-400/30";
      case "moderate":
      case "warning":
        return "bg-moderate text-background border-amber-400/30";
      case "high":
        return "bg-high text-white border-orange-500/30";
      case "critical":
      case "unsafe":
        return "bg-critical text-white border-red-500/30 shadow-[0_0_10px_rgba(255,61,61,0.35)]";
      default:
        return "bg-secondary text-foreground border-border";
    }
  };

  const text =
    children ||
    (normalizedLevel === "unsafe" || normalizedLevel === "critical"
      ? "UNSAFE"
      : normalizedLevel.toUpperCase());

  return (
    <span
      className={`inline-flex items-center justify-center text-xs font-bold px-2 py-0.5 rounded-sm uppercase tracking-wide border transition-all ${getStyle()} ${
        pulse ? "animate-pulse" : ""
      } ${className}`}
      data-component="@components/RiskBadge.jsx"
    >
      {text}
    </span>
  );
};

export default RiskBadge;
