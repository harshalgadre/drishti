"use client";

import React, { useState } from "react";
import Link from "next/link";
import Icon from "@/components/Icon";
import RiskBadge from "@/components/RiskBadge";
import {
  initialMapLayers,
  mapMarkers,
  MapMarker,
} from "@/data/mapLayers";

type ActiveTab = "overview" | "events" | "analysis" | "timeline";

export default function MapPage() {
  const [layers, setLayers] = useState(initialMapLayers);
  const [showLayerPanel, setShowLayerPanel] = useState(true);
  const [activeTab, setActiveTab] = useState<ActiveTab>("overview");
  const [selectedMarker, setSelectedMarker] = useState<MapMarker | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [zoomLevel, setZoomLevel] = useState(1);
  const [region, setRegion] = useState("North Eastern Region");

  // Toggle a single layer
  const toggleLayer = (layerId: string) => {
    setLayers((prev) =>
      prev.map((l) => (l.id === layerId ? { ...l, enabled: !l.enabled } : l))
    );
  };

  // Determine which layers are active
  const isLayerActive = (type: string) => {
    const layer = layers.find((l) => l.type === type);
    return layer ? layer.enabled : true;
  };

  // Filter markers based on layer toggle and search query
  const visibleMarkers = mapMarkers.filter((m) => {
    if (!isLayerActive(m.type)) return false;
    if (searchQuery.trim() === "") return true;
    return (
      m.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.description.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  return (
    <div className="space-y-6" data-component="@screens/MobileMap.jsx">
      {/* Top GIS Toolbar Bar */}
      <div className="bg-card border border-border rounded-2xl p-4 sm:p-5 shadow-lg flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-lg sm:text-xl font-black text-foreground">
              GIS Intelligence & Terrain Risk Workbench
            </h1>
            <RiskBadge level="critical" pulse>
              LIVE HAZARDS
            </RiskBadge>
          </div>
          <p className="text-xs text-muted-foreground mt-0.5">
            Real-time geospatial hazard layers, IoT sensor telemetry, and historical landslide footprints.
          </p>
        </div>

        {/* Region & Search Bar */}
        <div className="flex items-center gap-2.5 w-full md:w-auto flex-wrap sm:flex-nowrap">
          {/* Region Dropdown */}
          <div className="flex items-center gap-1.5 border border-border bg-input rounded-xl px-3 py-2 text-xs text-foreground cursor-pointer shrink-0">
            <Icon name="map-pin" size={14} className="text-primary" />
            <span className="font-bold">{region}</span>
            <Icon name="chevron-down" size={12} className="text-muted-foreground" />
          </div>

          {/* Search Box */}
          <div className="flex-1 sm:w-72 bg-input border border-border rounded-xl px-3 py-2 flex items-center gap-2 text-xs shadow-inner">
            <Icon name="search" size={14} className="text-muted-foreground shrink-0" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search location, road, sensor..."
              className="bg-transparent flex-1 text-foreground placeholder:text-muted-foreground focus:outline-none text-xs"
            />
            {searchQuery && (
              <button onClick={() => setSearchQuery("")} className="text-muted-foreground hover:text-white">
                <Icon name="x" size={13} />
              </button>
            )}
          </div>

          {/* Layer Panel Toggle */}
          <button
            type="button"
            onClick={() => setShowLayerPanel(!showLayerPanel)}
            className={`px-3 py-2 rounded-xl border flex items-center gap-2 text-xs font-bold transition-all shrink-0 ${
              showLayerPanel
                ? "bg-primary text-primary-foreground border-primary shadow-[0_0_12px_rgba(0,200,255,0.4)]"
                : "bg-card border-border text-foreground hover:bg-muted"
            }`}
          >
            <Icon name="layers" size={16} />
            <span className="hidden sm:inline">GIS Layers</span>
          </button>
        </div>
      </div>

      {/* Main Map Canvas Card */}
      <div className="relative w-full rounded-2xl overflow-hidden border border-border shadow-2xl bg-card h-[460px] sm:h-[540px]">
        {/* Satellite Map Layer with zoom */}
        <div
          className="absolute inset-0 bg-cover bg-center transition-transform duration-500 ease-out"
          style={{
            backgroundImage:
              "url(https://storage.googleapis.com/banani-generated-images/generated-images/e3fb7207-3fa8-471d-aa8c-ea2e5bf5a3b5.jpg)",
            transform: `scale(${zoomLevel})`,
          }}
        />

        {/* Radial Hazard Risk Overlay */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at 55% 40%, rgba(255, 61, 61, 0.6) 0%, rgba(255, 122, 0, 0.4) 28%, rgba(255, 176, 32, 0.22) 52%, transparent 72%)",
          }}
        />

        {/* Active River Flow Path Layer */}
        {isLayerActive("river") && <div className="map-river-flow" />}

        {/* Blocked Road Debris Path Layer */}
        {isLayerActive("road") && <div className="map-route-blocked" />}

        {/* Top-Left: Live Rainfall Telemetry Card */}
        <div className="absolute top-4 left-4 bg-card/90 backdrop-blur-md border border-border rounded-xl p-3 shadow-2xl z-10 max-w-[200px]">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-primary/20 flex items-center justify-center text-primary shrink-0">
              <Icon name="cloud-rain" size={20} />
            </div>
            <div>
              <div className="text-[11px] text-muted-foreground font-medium">
                Current Rainfall
              </div>
              <div className="text-base font-black text-foreground font-mono leading-tight">
                72 mm
              </div>
              <div className="text-[11px] text-high font-bold">↑ 12% in 24h</div>
            </div>
          </div>
        </div>

        {/* Top-Right: GIS Layer Checkbox Panel */}
        {showLayerPanel && (
          <div
            className="absolute top-4 right-4 bg-card/95 backdrop-blur-md border border-border rounded-2xl p-3.5 shadow-2xl z-20 animate-in fade-in zoom-in-95 max-h-[380px] overflow-y-auto w-56"
          >
            <div className="flex items-center justify-between pb-2 mb-2 border-b border-border/60">
              <span className="text-xs font-bold text-foreground uppercase tracking-wider">
                Active GIS Layers
              </span>
              <button
                onClick={() => setShowLayerPanel(false)}
                className="text-muted-foreground hover:text-white"
                aria-label="Minimize layers"
              >
                <Icon name="x" size={14} />
              </button>
            </div>

            <div className="space-y-1.5">
              {layers.map((layer) => (
                <div
                  key={layer.id}
                  onClick={() => toggleLayer(layer.id)}
                  className="flex items-center justify-between py-1 px-2 rounded-lg hover:bg-muted cursor-pointer select-none transition-colors"
                >
                  <span
                    className={`text-xs transition-colors ${
                      layer.enabled
                        ? "text-foreground font-semibold"
                        : "text-muted-foreground/60 line-through"
                    }`}
                  >
                    {layer.name}
                  </span>
                  <div
                    className={`w-4 h-4 rounded flex items-center justify-center shrink-0 transition-all ${
                      layer.enabled
                        ? "bg-primary text-primary-foreground shadow-[0_0_8px_rgba(0,200,255,0.6)]"
                        : "border border-border bg-input"
                    }`}
                  >
                    {layer.enabled && <Icon name="check" size={10} strokeWidth={4} />}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Geographical Town Labels */}
        <div
          className="absolute text-white text-xs sm:text-sm font-black drop-shadow-[0_2px_6px_rgba(0,0,0,0.9)] bg-background/50 backdrop-blur-[2px] px-2.5 py-1 rounded-lg pointer-events-none select-none border border-white/20"
          style={{ top: "15%", left: "38%" }}
        >
          Cherrapunji
        </div>
        <div
          className="absolute text-white/90 text-xs sm:text-sm font-bold drop-shadow-[0_2px_6px_rgba(0,0,0,0.9)] bg-background/50 backdrop-blur-[2px] px-2.5 py-1 rounded-lg pointer-events-none select-none border border-white/20"
          style={{ top: "45%", left: "18%" }}
        >
          Mawphlang
        </div>
        <div
          className="absolute text-white/90 text-xs sm:text-sm font-bold drop-shadow-[0_2px_6px_rgba(0,0,0,0.9)] bg-background/50 backdrop-blur-[2px] px-2.5 py-1 rounded-lg pointer-events-none select-none border border-white/20"
          style={{ top: "75%", left: "60%" }}
        >
          Lumshnong
        </div>

        {/* Dynamic Interactive Marker Pins on Canvas */}
        {visibleMarkers.map((marker) => (
          <button
            key={marker.id}
            type="button"
            onClick={() => setSelectedMarker(marker)}
            style={{ left: `${marker.left}%`, top: `${marker.top}%` }}
            className={`risk-marker-pin ${marker.type} ${
              selectedMarker?.id === marker.id ? "scale-125 ring-2 ring-white" : ""
            }`}
            title={marker.title}
            aria-label={marker.title}
          >
            {marker.symbol}
          </button>
        ))}

        {/* Interactive Marker Details Drawer / Popup */}
        {selectedMarker && (
          <div className="absolute bottom-6 left-4 right-4 sm:left-auto sm:right-20 sm:w-96 bg-card/95 backdrop-blur-md border border-primary/50 rounded-2xl p-4 shadow-2xl z-30 animate-in slide-in-from-bottom-3 duration-200">
            <div className="flex items-start justify-between gap-3">
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <h4 className="text-sm font-bold text-foreground">
                    {selectedMarker.title}
                  </h4>
                  {selectedMarker.severity && (
                    <RiskBadge level={selectedMarker.severity}>
                      {selectedMarker.severity.toUpperCase()}
                    </RiskBadge>
                  )}
                </div>
                <p className="text-xs text-muted-foreground mt-1.5 leading-relaxed">
                  {selectedMarker.description}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setSelectedMarker(null)}
                className="text-muted-foreground hover:text-white p-1 rounded-lg hover:bg-muted"
                aria-label="Close pin info"
              >
                <Icon name="x" size={16} />
              </button>
            </div>
          </div>
        )}

        {/* Map Control Buttons: Zoom, Compass, Scale */}
        <div className="absolute right-4 bottom-24 flex flex-col gap-2 z-10">
          <button
            type="button"
            onClick={() => setZoomLevel((prev) => Math.min(prev + 0.2, 1.8))}
            className="bg-card/90 hover:bg-muted border border-border w-9 h-9 rounded-xl flex items-center justify-center text-foreground transition-all shadow-lg"
            title="Zoom In"
            aria-label="Zoom In"
          >
            <Icon name="plus" size={16} />
          </button>
          <button
            type="button"
            onClick={() => setZoomLevel((prev) => Math.max(prev - 0.2, 0.8))}
            className="bg-card/90 hover:bg-muted border border-border w-9 h-9 rounded-xl flex items-center justify-center text-foreground transition-all shadow-lg"
            title="Zoom Out"
            aria-label="Zoom Out"
          >
            <Icon name="minus" size={16} />
          </button>
          <button
            type="button"
            onClick={() => setZoomLevel(1)}
            className="bg-card/90 hover:bg-muted border border-border w-9 h-9 rounded-xl flex items-center justify-center text-foreground transition-all shadow-lg"
            title="Recenter Map"
            aria-label="Recenter"
          >
            <Icon name="crosshair" size={16} />
          </button>
        </div>

        {/* Compass & Distance Scale */}
        <div className="absolute left-4 bottom-6 flex items-center gap-3 z-10 select-none">
          <div className="w-10 h-10 rounded-xl bg-card/90 border border-border flex items-center justify-center shadow backdrop-blur-sm">
            <span className="text-sm font-black text-primary">N↑</span>
          </div>
          <div className="flex items-end gap-1.5 bg-card/90 border border-border px-3 py-1 rounded-xl backdrop-blur-sm shadow">
            <div className="border-b-2 border-l-2 border-r-2 border-primary w-16 h-2" />
            <span className="text-xs font-bold text-foreground font-mono">10 km</span>
          </div>
        </div>
      </div>

      {/* Analytics & Insights Workbench Tabs */}
      <section className="bg-card border border-border rounded-2xl overflow-hidden shadow-xl">
        {/* Navigation Tabs Header */}
        <div className="flex border-b border-border bg-muted/30 overflow-x-auto no-scrollbar">
          <button
            type="button"
            onClick={() => setActiveTab("overview")}
            className={`flex-1 min-w-[120px] py-3.5 text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all border-b-2 ${
              activeTab === "overview"
                ? "text-primary border-primary bg-primary/10"
                : "text-muted-foreground border-transparent hover:text-foreground"
            }`}
          >
            <Icon name="activity" size={16} />
            <span>Sensor Overview</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("events")}
            className={`flex-1 min-w-[120px] py-3.5 text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all border-b-2 ${
              activeTab === "events"
                ? "text-primary border-primary bg-primary/10"
                : "text-muted-foreground border-transparent hover:text-foreground"
            }`}
          >
            <Icon name="map" size={16} />
            <span>Hazard Events Log</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("analysis")}
            className={`flex-1 min-w-[120px] py-3.5 text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all border-b-2 ${
              activeTab === "analysis"
                ? "text-primary border-primary bg-primary/10"
                : "text-muted-foreground border-transparent hover:text-foreground"
            }`}
          >
            <Icon name="bar-chart-2" size={16} />
            <span>Geotechnical Analysis</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("timeline")}
            className={`flex-1 min-w-[120px] py-3.5 text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all border-b-2 ${
              activeTab === "timeline"
                ? "text-primary border-primary bg-primary/10"
                : "text-muted-foreground border-transparent hover:text-foreground"
            }`}
          >
            <Icon name="clock" size={16} />
            <span>Predictive 24h Timeline</span>
          </button>
        </div>

        {/* Tab 1: Sensor Overview (4-column responsive grid on desktop) */}
        {activeTab === "overview" && (
          <div className="p-5 space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-muted/60 rounded-xl p-4 border border-danger/30 shadow-lg">
                <div className="flex items-center gap-2 mb-1.5 text-danger">
                  <Icon name="alert-triangle" size={18} />
                  <span className="text-xs text-muted-foreground font-semibold">
                    Landslide Risk Level
                  </span>
                </div>
                <div className="text-2xl font-black text-danger">High Risk</div>
                <div className="text-xs text-muted-foreground font-mono mt-1">
                  72 / 100 Index Score
                </div>
              </div>

              <div className="bg-muted/60 rounded-xl p-4 border border-warning/30 shadow-lg">
                <div className="flex items-center gap-2 mb-1.5 text-warning">
                  <Icon name="waves" size={18} />
                  <span className="text-xs text-muted-foreground font-semibold">
                    Soil Moisture Saturation
                  </span>
                </div>
                <div className="text-2xl font-black text-warning">Moderate (65%)</div>
                <div className="text-xs text-muted-foreground font-mono mt-1">
                  Piezometer depth 2.4m
                </div>
              </div>

              <div className="bg-muted/60 rounded-xl p-4 border border-primary/30 shadow-lg">
                <div className="flex items-center gap-2 mb-1.5 text-primary">
                  <Icon name="cloud-rain" size={18} />
                  <span className="text-xs text-muted-foreground font-semibold">
                    Rainfall Accumulation (24h)
                  </span>
                </div>
                <div className="text-2xl font-black text-primary">+72 mm</div>
                <div className="text-xs text-muted-foreground font-mono mt-1">
                  ↑ 12% above daily threshold
                </div>
              </div>

              <div className="bg-muted/60 rounded-xl p-4 border border-success/30 shadow-lg">
                <div className="flex items-center gap-2 mb-1.5 text-success">
                  <Icon name="activity" size={18} />
                  <span className="text-xs text-muted-foreground font-semibold">
                    Inclinometer Ground Motion
                  </span>
                </div>
                <div className="text-2xl font-black text-success">Minor (2.4 mm)</div>
                <div className="text-xs text-muted-foreground font-mono mt-1">
                  Stabilizing on Mawphlang ridge
                </div>
              </div>
            </div>

            {/* Key Events Horizontal Scroll */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-bold text-foreground flex items-center gap-2">
                  <span>Major Key Events</span>
                  <span className="text-xs text-muted-foreground font-normal">
                    (Past 30 Days in North Eastern Region)
                  </span>
                </h3>
                <button
                  type="button"
                  onClick={() => setActiveTab("events")}
                  className="text-xs font-bold text-primary hover:underline"
                >
                  View Full Historical Log
                </button>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                {[
                  { title: "Major Landslide", date: "12 Sep", icon: "alert-triangle", color: "text-danger bg-danger/20 border-danger/40" },
                  { title: "Road Closure", date: "08 Sep", icon: "x-circle", color: "text-danger bg-danger/20 border-danger/40" },
                  { title: "M2.8 Earthquake", date: "03 Sep", icon: "circle", color: "text-purple-400 bg-purple-500/20 border-purple-500/40" },
                  { title: "Heavy Rainfall", date: "28 Aug", icon: "cloud-rain", color: "text-primary bg-primary/20 border-primary/40" },
                  { title: "Slope Failure", date: "21 Aug", icon: "alert-triangle", color: "text-warning bg-warning/20 border-warning/40" },
                ].map((item, i) => (
                  <div key={i} className="bg-input/60 border border-border p-3.5 rounded-xl text-center space-y-1.5">
                    <div className={`w-10 h-10 rounded-full border mx-auto flex items-center justify-center ${item.color}`}>
                      <Icon name={item.icon as any} size={18} />
                    </div>
                    <div className="text-xs font-bold text-foreground">{item.title}</div>
                    <div className="text-[11px] text-muted-foreground font-mono">{item.date}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Events List */}
        {activeTab === "events" && (
          <div className="p-5 space-y-3">
            <h3 className="text-xs font-bold text-foreground uppercase tracking-wider">
              Official Hazard Log & Highway Alerts
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {[
                { date: "12 Sep 2026 - 06:40 AM", title: "Major Landslide on NH-206", loc: "KM 18 near Umiew River Gorge", status: "Road Blocked", sev: "critical" },
                { date: "08 Sep 2026 - 02:15 PM", title: "Boulder Fall & Debris Accumulation", loc: "Cherrapunji Pass (SH-5 Link)", status: "Cleared by PWD", sev: "high" },
                { date: "03 Sep 2026 - 11:04 PM", title: "M2.8 Seismic Micro-Tremor", loc: "East Khasi Hills Fault Line", status: "Sensors Monitored", sev: "moderate" },
                { date: "28 Aug 2026 - 05:30 AM", title: "Flash Flood & Slope Erosion", loc: "Mawphlang Valley Feeder Track", status: "Restored", sev: "moderate" },
              ].map((evt, idx) => (
                <div
                  key={idx}
                  className="bg-muted/60 border border-border/80 rounded-xl p-4 flex items-start justify-between gap-3 shadow"
                >
                  <div>
                    <div className="text-[11px] text-muted-foreground font-mono">
                      {evt.date}
                    </div>
                    <div className="text-sm font-bold text-foreground mt-0.5">
                      {evt.title}
                    </div>
                    <div className="text-xs text-muted-foreground mt-1">
                      {evt.loc}
                    </div>
                  </div>
                  <RiskBadge level={evt.sev as any}>{evt.status}</RiskBadge>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 3: Risk Analysis */}
        {activeTab === "analysis" && (
          <div className="p-5 space-y-4">
            <h3 className="text-xs font-bold text-foreground uppercase tracking-wider">
              Geotechnical Parameter Breakdown (AI Model: XGBoost + SHAP)
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="bg-muted/60 border border-border rounded-xl p-4 space-y-3">
                <div className="flex justify-between items-center border-b border-border/60 pb-2">
                  <span className="text-muted-foreground">Slope Angle & Incline:</span>
                  <span className="font-bold text-high font-mono text-sm">54° (Critical &gt; 45°)</span>
                </div>
                <div className="flex justify-between items-center border-b border-border/60 pb-2">
                  <span className="text-muted-foreground">Subsurface Pore Water Pressure:</span>
                  <span className="font-bold text-danger font-mono text-sm">148 kPa (Critical)</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Cumulative 72h Precipitation:</span>
                  <span className="font-bold text-primary font-mono text-sm">214 mm (180% baseline)</span>
                </div>
              </div>

              <div className="bg-muted/60 border border-border rounded-xl p-4 space-y-3">
                <div className="flex justify-between items-center border-b border-border/60 pb-2">
                  <span className="text-muted-foreground">Bedrock Geological Fault:</span>
                  <span className="font-bold text-warning">Shillong Plateau Thrust Belt</span>
                </div>
                <div className="flex justify-between items-center border-b border-border/60 pb-2">
                  <span className="text-muted-foreground">Factor of Safety (FoS):</span>
                  <span className="font-bold text-danger font-mono text-sm">0.94 (Unstable &lt; 1.0)</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Satellite InSAR Displacement:</span>
                  <span className="font-bold text-foreground font-mono text-sm">-14.2 mm/yr line-of-sight</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 4: Timeline */}
        {activeTab === "timeline" && (
          <div className="p-5 space-y-3">
            <h3 className="text-xs font-bold text-foreground uppercase tracking-wider mb-2">
              Next 24-Hour Predictive Risk Forecast
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {[
                { time: "Next 3 Hours (13:00 - 16:00)", rain: "+32 mm expected", risk: "CRITICAL", alert: "Peak rain intensity" },
                { time: "Evening (16:00 - 21:00)", rain: "+18 mm expected", risk: "HIGH", alert: "Pore water pressure peaking" },
                { time: "Night (21:00 - 04:00)", rain: "+8 mm expected", risk: "MODERATE", alert: "Gradual surface drainage" },
                { time: "Tomorrow Morning", rain: "+2 mm expected", risk: "SAFE", alert: "PWD clearing crews active" },
              ].map((item, i) => (
                <div key={i} className="bg-muted/60 border border-border p-4 rounded-xl flex items-center justify-between text-xs shadow">
                  <div>
                    <div className="font-bold text-foreground text-sm">{item.time}</div>
                    <div className="text-xs text-muted-foreground mt-0.5">{item.rain} · {item.alert}</div>
                  </div>
                  <RiskBadge level={item.risk === "CRITICAL" ? "critical" : item.risk === "HIGH" ? "high" : item.risk === "MODERATE" ? "moderate" : "safe"}>
                    {item.risk}
                  </RiskBadge>
                </div>
              ))}
            </div>
          </div>
        )}
      </section>
    </div>
  );
}
