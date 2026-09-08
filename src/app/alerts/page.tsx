"use client";

import React, { useState } from "react";
import Link from "next/link";
import Icon from "@/components/Icon";
import RiskBadge from "@/components/RiskBadge";
import AlertDetailsModal from "@/components/AlertDetailsModal";
import NavigationModal from "@/components/NavigationModal";
import { activeAlerts, evacuationShelters, roadConditions } from "@/data/alerts";

type AlertTab = "bulletins" | "roads" | "shelters" | "guidelines";

export default function AlertsPage() {
  const [activeTab, setActiveTab] = useState<AlertTab>("bulletins");
  const [selectedAlert, setSelectedAlert] = useState<string | null>(null);
  const [filter, setFilter] = useState<"all" | "critical" | "high" | "moderate">("all");
  const [isNavOpen, setIsNavOpen] = useState(false);

  const filteredAlerts = activeAlerts.filter((a) => {
    if (filter === "all") return true;
    return a.severity === filter;
  });

  return (
    <div className="space-y-6" data-component="@screens/MobileAlerts.jsx">
      {/* Top Header & Tab Switcher Bar */}
      <div className="bg-card border border-border rounded-2xl p-4 sm:p-5 shadow-lg flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-lg sm:text-xl font-black text-foreground">
              Emergency Alerts & Safety Directives
            </h1>
            <RiskBadge level="critical" pulse>
              3 ACTIVE BULLETINS
            </RiskBadge>
          </div>
          <p className="text-xs text-muted-foreground mt-0.5">
            Verified bulletins issued by Meghalaya State Disaster Management Authority & IMD.
          </p>
        </div>

        {/* Quick Report Link */}
        <Link
          href="/report"
          className="bg-primary hover:bg-primary/90 active:scale-95 text-primary-foreground font-black text-xs px-4 py-2 rounded-xl shadow flex items-center gap-2 shrink-0 transition-all"
        >
          <Icon name="camera" size={14} />
          <span>REPORT HAZARD INCIDENT</span>
        </Link>
      </div>

      {/* Navigation Sub-Tabs */}
      <div className="bg-card border border-border rounded-xl p-1.5 flex gap-1.5 overflow-x-auto no-scrollbar shadow">
        {[
          { id: "bulletins", label: "Active Warnings (3)", icon: "alert-triangle" },
          { id: "roads", label: "Live Road Status", icon: "map" },
          { id: "shelters", label: "Relief Camps & Shelters", icon: "home" },
          { id: "guidelines", label: "Landslide Protocols", icon: "shield" },
        ].map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActiveTab(tab.id as AlertTab)}
            className={`flex-1 min-w-[140px] py-2.5 px-3 rounded-lg text-xs font-bold flex items-center justify-center gap-2 transition-all ${
              activeTab === tab.id
                ? "bg-primary text-primary-foreground shadow-[0_0_12px_rgba(0,200,255,0.3)]"
                : "text-muted-foreground hover:text-foreground hover:bg-muted"
            }`}
          >
            <Icon name={tab.icon as any} size={15} />
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Tab 1: Warnings */}
      {activeTab === "bulletins" && (
        <div className="space-y-4">
          {/* Severity Filter Bar */}
          <div className="flex items-center gap-2">
            <span className="text-xs text-muted-foreground font-semibold">Filter by Severity:</span>
            {(["all", "critical", "high", "moderate"] as const).map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-3 py-1 rounded-lg text-xs font-bold uppercase tracking-wider transition-all ${
                  filter === f
                    ? "bg-primary text-primary-foreground shadow-[0_0_10px_rgba(0,200,255,0.4)]"
                    : "bg-input border border-border text-muted-foreground hover:text-foreground"
                }`}
              >
                {f}
              </button>
            ))}
          </div>

          {/* Responsive Grid of Alert Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredAlerts.map((alert) => (
              <div
                key={alert.id}
                className={`bg-card border-2 rounded-2xl p-4 shadow-xl flex flex-col justify-between transition-all ${
                  alert.severity === "critical"
                    ? "border-danger shadow-[0_0_20px_rgba(255,61,61,0.15)]"
                    : alert.severity === "high"
                    ? "border-high shadow-[0_0_20px_rgba(255,122,0,0.15)]"
                    : "border-warning/60"
                }`}
              >
                <div className="space-y-3">
                  <div className="flex items-start justify-between gap-2">
                    <div
                      className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                        alert.severity === "critical"
                          ? "bg-danger/20 text-danger border border-danger/40"
                          : alert.severity === "high"
                          ? "bg-high/20 text-high border border-high/40"
                          : "bg-warning/20 text-warning border border-warning/40"
                      }`}
                    >
                      <Icon name="alert-triangle" size={20} />
                    </div>
                    <RiskBadge level={alert.severity}>
                      {alert.severity.toUpperCase()}
                    </RiskBadge>
                  </div>

                  <div>
                    <h3 className="text-sm font-black uppercase text-foreground">
                      {alert.title}
                    </h3>
                    <div className="text-xs text-primary font-bold mt-1 flex items-center gap-1">
                      <Icon name="map-pin" size={13} />
                      <span>{alert.location}</span>
                    </div>
                  </div>

                  <p className="text-xs text-foreground/90 leading-relaxed">
                    {alert.description}
                  </p>

                  <div className="bg-input/60 rounded-xl p-2.5 text-xs text-foreground border border-border/60">
                    <strong className="text-primary">Safety Directive:</strong> {alert.recommendedAction}
                  </div>
                </div>

                <div className="pt-4 border-t border-border/60 mt-4 space-y-2.5">
                  <div className="flex items-center justify-between text-[11px] text-muted-foreground">
                    <span>Rain: <strong className="text-foreground">{alert.rainfall}</strong></span>
                    <span className="font-mono">{alert.time}</span>
                  </div>

                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => setSelectedAlert(alert.id)}
                      className="flex-1 py-2 rounded-xl bg-secondary hover:bg-muted text-foreground text-xs font-bold border border-border transition-colors flex items-center justify-center gap-1.5"
                    >
                      <span>DETAILS</span>
                      <Icon name="arrow-right" size={13} />
                    </button>
                    {alert.severity === "critical" && (
                      <button
                        type="button"
                        onClick={() => setIsNavOpen(true)}
                        className="flex-1 py-2 rounded-xl bg-success hover:bg-success/90 text-primary-foreground text-xs font-bold transition-colors flex items-center justify-center gap-1.5 shadow-[0_0_10px_rgba(0,230,118,0.3)]"
                      >
                        <Icon name="navigation" size={13} />
                        <span>DETOUR</span>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 2: Road Status Grid */}
      {activeTab === "roads" && (
        <div className="space-y-4">
          <p className="text-xs text-muted-foreground">
            Current passability status of major transportation corridors in Meghalaya:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {roadConditions.map((road) => (
              <div
                key={road.id}
                className="bg-card border border-border rounded-2xl p-4 shadow-xl space-y-3 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-base font-bold text-foreground">{road.roadName}</h3>
                    <RiskBadge
                      level={
                        road.status === "Closed"
                          ? "critical"
                          : road.status === "Partially Blocked"
                          ? "warning"
                          : "safe"
                      }
                    >
                      {road.status.toUpperCase()}
                    </RiskBadge>
                  </div>
                  <div className="text-xs text-primary font-medium mb-2">{road.section}</div>
                  <p className="text-xs text-foreground/90 bg-input/60 p-3 rounded-xl border border-border/50">
                    {road.reason}
                  </p>
                </div>

                <div className="pt-2 border-t border-border/60 text-xs">
                  <span className="text-muted-foreground block text-[11px]">Clearing Estimate:</span>
                  <strong className={road.status === "Closed" ? "text-danger" : "text-success"}>
                    {road.clearingEta}
                  </strong>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 3: Evacuation Shelters */}
      {activeTab === "shelters" && (
        <div className="space-y-4">
          <p className="text-xs text-muted-foreground">
            Designated disaster relief shelters equipped with first aid, generators, and potable water:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {evacuationShelters.map((shelter) => (
              <div
                key={shelter.id}
                className="bg-card border border-border rounded-2xl p-4 shadow-xl space-y-3 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="text-sm font-bold text-foreground">{shelter.name}</h3>
                    <RiskBadge level="safe">{shelter.status}</RiskBadge>
                  </div>
                  <div className="text-xs text-primary flex items-center gap-1 mt-1">
                    <Icon name="map-pin" size={13} />
                    <span>{shelter.location} ({shelter.distance})</span>
                  </div>

                  <div className="bg-input/60 rounded-xl p-2.5 mt-3 text-xs text-foreground flex items-center justify-between border border-border/50">
                    <span>Available Capacity:</span>
                    <strong className="text-success font-mono">{shelter.capacity}</strong>
                  </div>
                </div>

                <div className="flex gap-2 pt-2">
                  <a
                    href={`tel:${shelter.contact}`}
                    className="flex-1 py-2.5 rounded-xl bg-secondary hover:bg-muted border border-border text-xs font-bold text-foreground text-center flex items-center justify-center gap-1.5"
                  >
                    <Icon name="phone" size={13} className="text-primary" />
                    <span>CALL</span>
                  </a>
                  <Link
                    href="/map"
                    className="flex-1 py-2.5 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground text-xs font-bold text-center flex items-center justify-center gap-1.5 shadow"
                  >
                    <Icon name="navigation" size={13} />
                    <span>MAP NAV</span>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 4: Guidelines */}
      {activeTab === "guidelines" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
          <div className="bg-card border border-border rounded-2xl p-5 shadow-xl space-y-3">
            <h3 className="text-sm font-bold text-danger uppercase tracking-wider flex items-center gap-2">
              <Icon name="alert-triangle" size={18} />
              <span>Warning Signs of Imminent Slide</span>
            </h3>
            <ul className="space-y-2 text-foreground/90 pl-3 list-disc leading-relaxed">
              <li>Sudden trickles of muddy water bursting through rock crevices.</li>
              <li>Fences, utility poles, or hillside pine trees tilting downhill.</li>
              <li>New structural tension cracks widening rapidly along asphalt pavements.</li>
              <li>Subterranean rumbling sounds that increase in intensity as debris slides.</li>
            </ul>
          </div>

          <div className="bg-card border border-border rounded-2xl p-5 shadow-xl space-y-3">
            <h3 className="text-sm font-bold text-success uppercase tracking-wider flex items-center gap-2">
              <Icon name="check-circle" size={18} />
              <span>Action Steps While Travelling</span>
            </h3>
            <ul className="space-y-2 text-foreground/90 pl-3 list-disc leading-relaxed">
              <li>Do not attempt to drive through road sections covered in fresh rock debris.</li>
              <li>Observe cliffside shoulders and watch for tumbling boulders ahead.</li>
              <li>If trapped in a slide track, turn vehicle around immediately and head to high ridge ground.</li>
              <li>Follow BhuRakshak AI broadcast or SMS gateway for verified diversion instructions.</li>
            </ul>
          </div>
        </div>
      )}

      {/* Modals */}
      <AlertDetailsModal
        isOpen={Boolean(selectedAlert)}
        onClose={() => setSelectedAlert(null)}
        onStartSafeRoute={() => setIsNavOpen(true)}
      />
      <NavigationModal isOpen={isNavOpen} onClose={() => setIsNavOpen(false)} />
    </div>
  );
}
