import React from "react";
import Link from "next/link";

interface AppLogoProps {
  subtitle?: string;
  size?: "sm" | "md" | "lg";
  href?: string;
}

export const AppLogo: React.FC<AppLogoProps> = ({
  subtitle = "Your Safety. Our Priority.",
  size = "md",
  href = "/",
}) => {
  const iconSize = size === "sm" ? 24 : size === "lg" ? 38 : 32;
  const svgSize = size === "sm" ? 17 : size === "lg" ? 26 : 22.4;
  const titleClass =
    size === "sm"
      ? "text-lg"
      : size === "lg"
      ? "text-2xl tracking-tight"
      : "text-xl";

  const Content = (
    <div
      className="flex items-center gap-2.5 select-none cursor-pointer group"
      data-component="@components/AppLogo.jsx"
    >
      <div
        style={{ width: `${iconSize}px`, height: `${iconSize}px` }}
        className="bg-primary shadow-[0_0_15px_rgba(0,200,255,0.4)] rounded-md flex items-center justify-center flex-shrink-0 transition-transform duration-300 group-hover:scale-105"
      >
        <svg
          width={svgSize}
          height={svgSize}
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Shield outline */}
          <path
            d="M12 2L3 8v8l9 6 9-6V8L12 2z"
            stroke="#0d1b2e"
            strokeWidth="1.8"
            strokeLinejoin="round"
            fill="none"
          />
          {/* Mountain ridge representing terrain analysis */}
          <path
            d="M6 14l4-5 3 3 3-4 4 4"
            stroke="#0d1b2e"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
      <div>
        <div
          className={`font-headings font-bold text-foreground ${titleClass} leading-tight flex items-center gap-1.5`}
        >
          <span>BhuRakshak</span>
          <span className="text-primary font-black">AI</span>
        </div>
        {subtitle && (
          <div className="text-muted-foreground text-xs leading-tight font-medium">
            {subtitle}
          </div>
        )}
      </div>
    </div>
  );

  return href ? <Link href={href}>{Content}</Link> : Content;
};

export default AppLogo;
