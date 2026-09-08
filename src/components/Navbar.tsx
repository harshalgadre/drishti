"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import AppLogo from "./AppLogo";
import Icon, { IconName } from "./Icon";

interface NavLink {
  name: string;
  href: string;
  icon: IconName;
  badge?: number;
}

const navLinks: NavLink[] = [
  { name: "Overview", href: "/", icon: "home" },
  { name: "GIS Risk Map", href: "/map", icon: "map" },
  { name: "Active Alerts", href: "/alerts", icon: "alert-triangle", badge: 3 },
  { name: "File Report", href: "/report", icon: "camera" },
  { name: "Profile & SOS", href: "/profile", icon: "user" },
];

export const Navbar: React.FC = () => {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full bg-[#0b1523]/95 backdrop-blur-md border-b border-border shadow-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand Logo */}
          <div className="flex items-center gap-3">
            <AppLogo subtitle="AI Early Warning & Landslide Monitoring" size="md" href="/" />
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2" aria-label="Main Navigation">
            {navLinks.map((item) => {
              const isActive =
                item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);

              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs lg:text-sm font-semibold transition-all relative ${
                    isActive
                      ? "text-primary bg-primary/15 shadow-[0_0_12px_rgba(0,200,255,0.25)] border border-primary/40"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted/60"
                  }`}
                >
                  <Icon
                    name={item.icon}
                    size={16}
                    className={isActive ? "text-primary" : "text-muted-foreground"}
                  />
                  <span>{item.name}</span>
                  {item.badge !== undefined && item.badge > 0 && (
                    <span className="bg-danger text-white text-[10px] font-bold px-1.5 py-0.2 rounded-full animate-pulse shadow-[0_0_6px_rgba(255,61,61,0.6)]">
                      {item.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Right Action Group */}
          <div className="flex items-center gap-3">
            {/* Live Monitoring Badge */}
            <div className="hidden sm:flex items-center gap-2 bg-success/15 border border-success/40 rounded-full px-3 py-1 shadow-[0_0_10px_rgba(0,230,118,0.2)]">
              <span className="w-2 h-2 rounded-full bg-success animate-ping" />
              <span className="text-success text-[11px] font-black tracking-wider">
                LIVE MONITORING
              </span>
            </div>

            {/* Quick Report Action Button on Desktop */}
            <Link
              href="/report"
              className="hidden lg:flex items-center gap-1.5 bg-primary hover:bg-primary/90 active:scale-95 text-primary-foreground font-black text-xs px-4 py-2 rounded-lg shadow-[0_0_14px_rgba(0,200,255,0.35)] transition-all"
            >
              <Icon name="plus" size={13} strokeWidth={3} />
              <span>SUBMIT REPORT</span>
            </Link>

            {/* Emergency SOS Dialer */}
            <a
              href="tel:112"
              className="flex items-center gap-1.5 bg-danger/20 hover:bg-danger/30 border border-danger/50 text-danger text-xs font-bold px-3 py-1.5 rounded-lg transition-all shadow-[0_0_10px_rgba(255,61,61,0.3)]"
              title="Emergency SOS Call"
            >
              <Icon name="phone" size={13} />
              <span>SOS: 112</span>
            </a>

            {/* Mobile Hamburger Toggle Button */}
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-lg bg-secondary hover:bg-muted text-foreground transition-colors"
              aria-label="Toggle Menu"
            >
              <Icon name={isMobileMenuOpen ? "x" : "layers"} size={20} />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Dropdown Menu Drawer */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-card border-b border-border px-4 pt-2 pb-4 space-y-1.5 animate-in slide-in-from-top-2 duration-200">
          {navLinks.map((item) => {
            const isActive =
              item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);

            return (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`flex items-center justify-between p-2.5 rounded-lg text-xs font-bold transition-all ${
                  isActive
                    ? "bg-primary/20 text-primary border border-primary/40"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Icon name={item.icon} size={16} />
                  <span>{item.name}</span>
                </div>
                {item.badge !== undefined && item.badge > 0 && (
                  <span className="bg-danger text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}

          <div className="pt-2">
            <Link
              href="/report"
              onClick={() => setIsMobileMenuOpen(false)}
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg bg-primary text-primary-foreground font-black text-xs uppercase shadow"
            >
              <Icon name="camera" size={15} />
              <span>UPLOAD HAZARD PHOTO</span>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
