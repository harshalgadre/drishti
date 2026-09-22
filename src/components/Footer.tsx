import React from "react";
import Link from "next/link";
import Icon from "./Icon";

export const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-card border-t border-border mt-auto pt-10 pb-8 text-xs text-muted-foreground">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand & Purpose */}
          <div className="space-y-3 md:col-span-1">
            <div className="flex items-center gap-2 text-foreground font-black text-base">
              <span className="w-2.5 h-2.5 rounded-full bg-primary" />
              <span>BhuRakshak AI</span>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">
              AI-driven early warning and landslide risk monitoring platform for the North Eastern Region of India.
            </p>
            <div className="text-[11px] text-muted-foreground/80">
              Smart India Hackathon 2026 · Problem ID 26001 · Team Drishti
            </div>
          </div>

          {/* Quick Navigation */}
          <div className="space-y-2.5">
            <h4 className="font-bold text-foreground uppercase tracking-wider text-[11px]">
              Platform Modules
            </h4>
            <ul className="space-y-1.5 text-xs">
              <li>
                <Link href="/" className="hover:text-primary transition-colors">
                  Risk Overview & Sensors
                </Link>
              </li>
              <li>
                <Link href="/map" className="hover:text-primary transition-colors">
                  Interactive GIS Workbench
                </Link>
              </li>
              <li>
                <Link href="/alerts" className="hover:text-primary transition-colors">
                  Live Emergency Bulletins
                </Link>
              </li>
              <li>
                <Link href="/report" className="hover:text-primary transition-colors">
                  Submit Hazard Incident
                </Link>
              </li>
              <li>
                <Link href="/profile" className="hover:text-primary transition-colors">
                  Offline Maps & Sentinel Profile
                </Link>
              </li>
            </ul>
          </div>

          {/* Disaster Management Lines */}
          <div className="space-y-2.5">
            <h4 className="font-bold text-foreground uppercase tracking-wider text-[11px]">
              Emergency Helplines
            </h4>
            <ul className="space-y-1.5 text-xs font-mono">
              <li className="flex items-center justify-between">
                <span>Meghalaya SDMA:</span>
                <strong className="text-primary">1077</strong>
              </li>
              <li className="flex items-center justify-between">
                <span>National Emergency:</span>
                <strong className="text-danger">112</strong>
              </li>
              <li className="flex items-center justify-between">
                <span>Ambulance & Trauma:</span>
                <strong className="text-success">108</strong>
              </li>
              <li className="flex items-center justify-between">
                <span>NDRF Control Room:</span>
                <strong className="text-foreground">011-24363260</strong>
              </li>
            </ul>
          </div>

          {/* Technology & Data Sources */}
          <div className="space-y-2.5">
            <h4 className="font-bold text-foreground uppercase tracking-wider text-[11px]">
              Telemetry & GIS Sources
            </h4>
            <p className="text-[11px] text-muted-foreground leading-relaxed">
              Integrated with IMD automated weather stations, ISRO Landslide Atlas, Sentinel-1 InSAR surface deformation, and IoT soil moisture probes.
            </p>
            <div className="flex items-center gap-2 pt-1 text-[11px] text-success">
              <span className="w-2 h-2 rounded-full bg-success animate-ping" />
              <span>All Sentinel telemetry nodes operational</span>
            </div>
          </div>
        </div>

        {/* Bottom copyright line */}
        <div className="pt-6 border-t border-border/60 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px]">
          <span>
            © 2026 BhuRakshak AI — Developed by Team Drishti for SIH 2026 Disaster Management.
          </span>
          <div className="flex items-center gap-4 text-muted-foreground">
            <span>Privacy & Data Sovereignty</span>
            <span>Meghalaya State GIS Node</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
