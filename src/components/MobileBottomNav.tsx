"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Icon, { IconName } from "./Icon";

interface NavItem {
  name: string;
  href: string;
  icon: IconName;
  badge?: number;
}

const navItems: NavItem[] = [
  { name: "Home", href: "/", icon: "home" },
  { name: "Map", href: "/map", icon: "map" },
  { name: "Alerts", href: "/alerts", icon: "alert-triangle", badge: 3 },
  { name: "Profile", href: "/profile", icon: "user" },
];

export const MobileBottomNav: React.FC = () => {
  const pathname = usePathname();

  return (
    <nav
      className="sticky bottom-0 z-40 w-full bg-card/95 backdrop-blur-md border-t border-border flex items-center justify-around py-2 px-2"
      data-component="@components/MobileBottomNav.jsx"
      aria-label="Bottom Navigation"
    >
      {navItems.map((item) => {
        const isActive =
          item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);

        return (
          <Link
            key={item.name}
            href={item.href}
            className={`flex flex-col items-center gap-0.5 px-4 py-1 relative transition-all duration-200 rounded-lg group ${
              isActive
                ? "text-primary font-bold drop-shadow-[0_0_8px_rgba(0,200,255,0.4)]"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {/* Active top dot indicator */}
            {isActive && (
              <span className="absolute -top-2 w-5 h-0.5 bg-primary rounded-full shadow-[0_0_6px_#00c8ff]" />
            )}

            <div className="relative">
              <Icon
                name={item.icon}
                size={20}
                className={`transition-transform duration-200 group-hover:scale-110 ${
                  isActive ? "text-primary" : "text-muted-foreground"
                }`}
              />
              {item.badge !== undefined && item.badge > 0 && (
                <span
                  className="absolute -top-1 -right-2.5 bg-danger text-white rounded-full w-4 h-4 flex items-center justify-center font-bold text-[9px] shadow-[0_0_6px_rgba(255,61,61,0.6)] animate-pulse"
                >
                  {item.badge}
                </span>
              )}
            </div>
            <span className="text-[10px] tracking-wide mt-0.5">{item.name}</span>
          </Link>
        );
      })}
    </nav>
  );
};

export default MobileBottomNav;
