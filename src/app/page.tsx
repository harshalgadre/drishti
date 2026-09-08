"use client";

import React, { useState } from "react";
import Link from "next/link";
import Icon from "@/components/Icon";
import RiskBar from "@/components/RiskBar";
import RiskBadge from "@/components/RiskBadge";
import MapViewCard from "@/components/MapViewCard";
import AlertDetailsModal from "@/components/AlertDetailsModal";
import NavigationModal from "@/components/NavigationModal";

export default function HomePage() {
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [isNavOpen, setIsNavOpen] = useState(false);

  return (
    <div className="space-y-6" data-component="@screens/MobileHome.jsx">
      {/* Top Telemetry & Location Subheader Bar */}
      <div className="bg-card border border-border rounded-2xl p-4 sm:p-5 shadow-lg flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-primary/20 border border-primary/40 flex items-center justify-center text-primary shrink-0 shadow-[0_0_12px_rgba(0,200,255,0.3)]">
            <Icon name="map-pin" size={20} className="animate-bounce" />
          </div>
          <div>
            <div className="text-base sm:text-lg font-black text-foreground flex items-center gap-2">
              <span>Shillong, Meghalaya</span>
              <RiskBadge level="moderate">Zone MH-204 Vicinity</RiskBadge>
            </div>
            <div className="text-xs text-muted-foreground mt-0.5">
              Telemetry synchronized 2 min ago · East Khasi Hills IoT Cluster
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
          <div className="flex items-center gap-2 bg-success/15 border border-success/40 rounded-full px-3 py-1 shadow-[0_0_10px_rgba(0,230,118,0.2)]">
            <span className="w-2 h-2 rounded-full bg-success animate-ping" />
            <span className="text-success text-xs font-black tracking-wider">
              REAL-TIME SENTINEL ACTIVE
            </span>
          </div>

          <Link
            href="/alerts"
            className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-input border border-border text-xs font-bold text-foreground hover:border-primary/50 transition-colors"
          >
            <Icon name="bell" size={14} className="text-danger" />
            <span>3 Active Alerts</span>
          </Link>
        </div>
      </div>

      {/* Critical Emergency Banner (Spanning Full Width) */}
      <section className="bg-card border-2 border-danger/80 rounded-2xl p-4 sm:p-5 shadow-[0_0_30px_rgba(255,61,61,0.15)] relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-danger/5 rounded-full -mr-10 -mt-10 pointer-events-none" />

        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-start gap-3.5">
            <div className="w-12 h-12 bg-danger/20 border border-danger/40 rounded-xl flex items-center justify-center shrink-0 text-danger shadow-[0_0_15px_rgba(255,61,61,0.3)]">
              <Icon name="alert-triangle" size={26} />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-xs sm:text-sm font-black text-danger uppercase tracking-wider">
                  HIGH LANDSLIDE RISK BULLETIN
                </span>
                <span className="w-2 h-2 rounded-full bg-danger animate-ping" />
                <span className="text-[11px] text-muted-foreground font-medium">
                  Updated 4 min ago
                </span>
              </div>
              <p className="text-xs sm:text-sm text-foreground mt-1 leading-snug font-medium max-w-3xl">
                Torrential rainfall detected along Shillong–Cherrapunji arterial corridor. Major boulder displacement blocked NH-206 near Umiew Gorge. Take certified Mawphlang diversion.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2.5 w-full md:w-auto shrink-0">
            <button
              type="button"
              onClick={() => setIsAlertOpen(true)}
              className="flex-1 md:flex-none bg-danger hover:bg-danger/90 active:scale-95 text-white text-xs font-black px-5 py-3 rounded-xl flex items-center justify-center gap-2 shadow-[0_0_15px_rgba(255,61,61,0.4)] transition-all uppercase tracking-wider"
            >
              <span>VIEW ALERT BULLETIN</span>
              <Icon name="arrow-right" size={14} />
            </button>
            <button
              type="button"
              onClick={() => setIsNavOpen(true)}
              className="flex-1 md:flex-none bg-success hover:bg-success/90 active:scale-95 text-primary-foreground text-xs font-black px-5 py-3 rounded-xl flex items-center justify-center gap-2 shadow-[0_0_15px_rgba(0,230,118,0.4)] transition-all uppercase tracking-wider"
            >
              <Icon name="navigation" size={14} />
              <span>DETOUR MAP</span>
            </button>
          </div>
        </div>
      </section>

      {/* Main Responsive Dashboard Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Interactive Radar GIS Map & Safe Route Navigation (Col 1-7) */}
        <div className="lg:col-span-7 space-y-6">
          {/* Map Preview Card */}
          <div className="bg-card border border-border rounded-2xl p-4 shadow-xl space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Icon name="map" size={18} className="text-primary" />
                <h2 className="text-sm sm:text-base font-bold text-foreground">
                  Regional GIS Radar Map
                </h2>
              </div>
              <span className="text-xs text-muted-foreground">
                InSAR & Ground Radar Active
              </span>
            </div>

            <MapViewCard />
          </div>

          {/* Route to Cherrapunji Comparison Card */}
          <section className="bg-card border border-border rounded-2xl p-5 shadow-xl space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-sm sm:text-base font-bold text-foreground">
                  Safe Route Navigation to Cherrapunji
                </h2>
                <p className="text-xs text-muted-foreground">
                  Comparing direct highway vs AI-recommended stable detour
                </p>
              </div>
              <span className="text-[11px] text-success font-bold bg-success/10 border border-success/30 px-2 py-0.5 rounded-full">
                AI OPTIMIZED
              </span>
            </div>

            {/* Route A - Blocked */}
            <div className="flex items-center gap-3 bg-muted/60 rounded-xl p-3.5 border-l-4 border-danger hover:bg-muted transition-colors">
              <div className="w-10 h-10 bg-danger/20 rounded-xl flex items-center justify-center shrink-0 text-danger">
                <Icon name="alert-triangle" size={18} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-xs sm:text-sm font-bold text-foreground">
                    Route A – Via NH-206 Direct
                  </span>
                  <RiskBadge level="critical">UNSAFE</RiskBadge>
                </div>
                <div className="text-xs text-muted-foreground mt-0.5">
                  Landslide detected at KM 18 · Carriageway completely blocked by rock debris
                </div>
              </div>
              <div className="text-right shrink-0 pl-2">
                <div className="text-xs sm:text-sm font-bold text-foreground font-mono">+14 km</div>
                <div className="text-xs text-muted-foreground">ETA: 1h 45m</div>
              </div>
            </div>

            {/* Route B - Safe Alternative */}
            <div className="flex items-center gap-3 bg-muted/60 rounded-xl p-3.5 border-l-4 border-success hover:bg-muted transition-colors">
              <div className="w-10 h-10 bg-success/20 rounded-xl flex items-center justify-center shrink-0 text-success">
                <Icon name="check-circle" size={18} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-xs sm:text-sm font-bold text-foreground">
                    Route B – Via Mawphlang Bypass (SH-5)
                  </span>
                  <RiskBadge level="safe">RECOMMENDED</RiskBadge>
                </div>
                <div className="text-xs text-muted-foreground mt-0.5">
                  Stable bedrock pass · Certified clear by PWD & Sensor Cluster telemetry
                </div>
              </div>
              <div className="text-right shrink-0 pl-2">
                <div className="text-xs sm:text-sm font-bold text-foreground font-mono">+18 min</div>
                <div className="text-xs text-muted-foreground">ETA: 2h 03m</div>
              </div>
            </div>

            {/* Start Safe Route Button */}
            <button
              type="button"
              onClick={() => setIsNavOpen(true)}
              className="w-full bg-success hover:bg-success/90 active:scale-[0.99] text-primary-foreground py-3.5 rounded-xl text-xs sm:text-sm font-black flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(0,230,118,0.35)] transition-all uppercase tracking-wider"
            >
              <Icon name="navigation" size={18} />
              <span>LAUNCH TURN-BY-TURN SAFE NAVIGATION</span>
            </button>
          </section>
        </div>

        {/* Right Column: Your Area Risk Gauges & Citizen Hazard Report (Col 8-12) */}
        <div className="lg:col-span-5 space-y-6">
          {/* Your Area Risk Card */}
          <section className="bg-card border border-border rounded-2xl p-5 shadow-xl space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Icon name="alert-triangle" size={18} className="text-warning" />
                <h2 className="text-sm sm:text-base font-bold text-foreground">
                  Your Area Risk Assessment
                </h2>
              </div>
              <span className="text-xs text-warning font-bold">Shillong Sector</span>
            </div>

            {/* Score & Gauge Row */}
            <div className="flex items-center gap-4 bg-muted/40 p-4 rounded-xl border border-border/60">
              <div className="flex-1">
                <div className="text-base sm:text-lg font-black text-warning tracking-wide">
                  MODERATE RISK
                </div>
                <div className="mt-3 space-y-1.5">
                  <RiskBar label="Rainfall Intensity" value={78} colorVariant="high" />
                  <RiskBar label="Soil Moisture Sat." value={65} colorVariant="primary" />
                  <RiskBar label="Slope Incline (54°)" value={72} colorVariant="moderate" />
                </div>
              </div>

              {/* Radial Circular Meter */}
              <div className="flex flex-col items-center shrink-0 pl-2">
                <div className="w-20 h-20 rounded-full border-4 border-warning flex items-center justify-center shadow-[0_0_20px_rgba(255,176,32,0.4)] bg-background/80">
                  <div className="text-center">
                    <div className="text-2xl font-black text-foreground leading-none font-mono">
                      62
                    </div>
                    <div className="text-[11px] text-muted-foreground font-bold">
                      /100
                    </div>
                  </div>
                </div>
                <span className="text-xs text-muted-foreground mt-1.5 font-semibold">
                  Risk Score
                </span>
              </div>
            </div>

            {/* Factor Breakdown (SHAP Attribution) */}
            <div className="border-t border-border/80 pt-3">
              <div className="text-xs text-muted-foreground font-bold mb-2.5 uppercase tracking-wider flex items-center justify-between">
                <span>Geotechnical Risk Attribution</span>
                <span className="text-[10px] text-primary">SHAP Analysis</span>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between py-1.5 px-2 rounded-lg bg-input/40 border border-border/40 text-xs">
                  <div className="flex items-center gap-2 text-foreground font-medium">
                    <Icon name="cloud-rain" size={15} className="text-primary" />
                    <span>Heavy rainfall (+72mm / 24h)</span>
                  </div>
                  <span className="font-bold text-high font-mono text-sm">+18</span>
                </div>

                <div className="flex items-center justify-between py-1.5 px-2 rounded-lg bg-input/40 border border-border/40 text-xs">
                  <div className="flex items-center gap-2 text-foreground font-medium">
                    <Icon name="droplets" size={15} className="text-primary" />
                    <span>High soil moisture saturation</span>
                  </div>
                  <span className="font-bold text-high font-mono text-sm">+14</span>
                </div>

                <div className="flex items-center justify-between py-1.5 px-2 rounded-lg bg-input/40 border border-border/40 text-xs">
                  <div className="flex items-center gap-2 text-foreground font-medium">
                    <Icon name="mountain" size={15} className="text-muted-foreground" />
                    <span>Steep mountain terrain (54°)</span>
                  </div>
                  <span className="font-bold text-high font-mono text-sm">+11</span>
                </div>

                <div className="flex items-center justify-between py-1.5 px-2 rounded-lg bg-input/40 border border-border/40 text-xs">
                  <div className="flex items-center gap-2 text-foreground font-medium">
                    <Icon name="history" size={15} className="text-muted-foreground" />
                    <span>Historical slide recurrence</span>
                  </div>
                  <span className="font-bold text-high font-mono text-sm">+9</span>
                </div>
              </div>

              {/* AI Confidence Meter */}
              <div className="flex items-center gap-2.5 mt-3 pt-2.5 border-t border-border/60 bg-input/60 p-2.5 rounded-xl">
                <Icon name="cpu" size={16} className="text-primary" />
                <span className="text-xs text-muted-foreground font-medium">
                  AI Model Confidence
                </span>
                <div className="flex-1 bg-secondary rounded-full h-2 ml-1 overflow-hidden">
                  <div
                    className="bg-primary h-2 rounded-full shadow-[0_0_10px_#00c8ff]"
                    style={{ width: "87%" }}
                  />
                </div>
                <span className="text-xs font-bold text-primary font-mono">87%</span>
              </div>
            </div>
          </section>

          {/* Citizen Hazard Report Action Card */}
          <section className="bg-card border border-primary/40 rounded-2xl p-5 shadow-xl space-y-3 relative overflow-hidden group">
            <div className="flex items-start gap-3.5">
              <div className="w-12 h-12 bg-primary/20 rounded-2xl flex items-center justify-center shrink-0 text-primary shadow-[0_0_14px_rgba(0,200,255,0.3)] group-hover:scale-105 transition-transform">
                <Icon name="camera" size={24} />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-sm sm:text-base font-bold text-foreground">
                  See something dangerous on the road?
                </h3>
                <p className="text-xs text-muted-foreground leading-relaxed mt-1">
                  Upload photo evidence of fresh landslides, slope tension cracks, falling rocks, or debris blockages to update emergency services.
                </p>
              </div>
            </div>

            <Link
              href="/report"
              className="w-full bg-primary hover:bg-primary/90 active:scale-[0.99] text-primary-foreground font-black text-xs sm:text-sm py-3 rounded-xl flex items-center justify-center gap-2 shadow-[0_0_15px_rgba(0,200,255,0.4)] transition-all uppercase tracking-wider"
            >
              <Icon name="camera" size={16} strokeWidth={2.5} />
              <span>GO TO PHOTO REPORT PAGE</span>
            </Link>
          </section>
        </div>
      </div>

      {/* Modals */}
      <AlertDetailsModal
        isOpen={isAlertOpen}
        onClose={() => setIsAlertOpen(false)}
        onStartSafeRoute={() => setIsNavOpen(true)}
      />
      <NavigationModal isOpen={isNavOpen} onClose={() => setIsNavOpen(false)} />
    </div>
  );
}
