"use client";

import React, { useState } from "react";
import Link from "next/link";
import Icon from "./Icon";

export const MapViewCard: React.FC = () => {
  const [zoomLevel, setZoomLevel] = useState(1);
  const [showRadar, setShowRadar] = useState(true);
  const [selectedPoint, setSelectedPoint] = useState<string | null>(null);

  const handleZoomIn = (e: React.MouseEvent) => {
    e.preventDefault();
    setZoomLevel((prev) => Math.min(prev + 0.2, 1.6));
  };

  const handleZoomOut = (e: React.MouseEvent) => {
    e.preventDefault();
    setZoomLevel((prev) => Math.max(prev - 0.2, 0.8));
  };

  const handleReset = (e: React.MouseEvent) => {
    e.preventDefault();
    setZoomLevel(1);
  };

  return (
    <div
      className="relative rounded-2xl overflow-hidden border border-border/80 shadow-2xl bg-card transition-all duration-300 group h-[280px] sm:h-[340px] w-full"
      data-component="@components/MapViewCard.jsx"
    >
      {/* Map Satellite Image Layer with zoom transformation */}
      <div
        className="absolute inset-0 bg-cover bg-center transition-transform duration-500 ease-out"
        style={{
          backgroundImage:
            "url(https://storage.googleapis.com/banani-generated-images/generated-images/7655a177-1f32-4007-9bd3-c222569dc70a.jpg)",
          transform: `scale(${zoomLevel})`,
        }}
      />

      {/* Hazard Risk Radial Heatmap Overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 60% 45%, rgba(255, 61, 61, 0.65) 0%, rgba(255, 122, 0, 0.45) 32%, rgba(255, 176, 32, 0.25) 58%, transparent 75%)",
        }}
      />

      {/* Dynamic Radar Sweep Animation */}
      {showRadar && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-40">
          <div
            className="absolute w-[500px] h-[500px] -top-[100px] -left-[50px] rounded-full border border-primary/20 animate-radar-sweep"
            style={{
              background:
                "conic-gradient(from 0deg at 50% 50%, rgba(0, 200, 255, 0.25) 0deg, transparent 60deg, transparent 360deg)",
            }}
          />
        </div>
      )}

      {/* Compass Header & Fullscreen Map Action */}
      <div className="absolute top-3 left-3 right-3 flex items-center justify-between z-10">
        <div className="text-xs text-white font-bold bg-background/85 backdrop-blur-md px-2.5 py-1 rounded-lg border border-white/20 shadow drop-shadow flex items-center gap-1.5">
          <span className="text-primary font-black">N↑</span>
          <span className="text-[11px] text-muted-foreground font-semibold">GIS Radar Layer</span>
        </div>

        <Link
          href="/map"
          className="text-xs font-bold text-primary bg-background/90 hover:bg-background backdrop-blur-md px-3 py-1.5 rounded-lg border border-primary/40 shadow-xl flex items-center gap-1.5 transition-all hover:border-primary hover:shadow-[0_0_12px_rgba(0,200,255,0.4)]"
        >
          <span>OPEN FULL GIS WORKBENCH</span>
          <Icon name="arrow-right" size={13} />
        </Link>
      </div>

      {/* Geographical Labels */}
      <div
        className="absolute pointer-events-none select-none"
        style={{ top: "24%", left: "45%" }}
      >
        <span className="text-white text-xs font-bold drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)] bg-background/40 px-2 py-0.5 rounded backdrop-blur-[2px]">
          Shillong
        </span>
      </div>
      <div
        className="absolute pointer-events-none select-none"
        style={{ top: "66%", left: "20%" }}
      >
        <span className="text-white/90 text-xs drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)] bg-background/40 px-2 py-0.5 rounded backdrop-blur-[2px]">
          Mawphlang
        </span>
      </div>
      <div
        className="absolute pointer-events-none select-none"
        style={{ top: "78%", left: "44%" }}
      >
        <span className="text-white/90 text-xs drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)] bg-background/40 px-2 py-0.5 rounded backdrop-blur-[2px]">
          Cherrapunji
        </span>
      </div>

      {/* Critical Risk Zone Indicator */}
      <button
        type="button"
        onClick={() =>
          setSelectedPoint(
            selectedPoint === "zone"
              ? null
              : "Zone MH-204: Active Landslide Threat - Immediate Avoidance Advised"
          )
        }
        className="absolute flex flex-col items-center cursor-pointer transition-transform hover:scale-110 active:scale-95 z-10"
        style={{ top: "40%", left: "54%" }}
        aria-label="Zone MH-204 Details"
      >
        <div className="bg-critical text-white text-[11px] font-bold px-2 py-0.5 rounded-md flex items-center gap-1 shadow-[0_0_15px_rgba(255,61,61,0.8)] border border-white/40 animate-pulse">
          <Icon name="alert-triangle" size={12} />
          <span>Zone MH-204</span>
        </div>
        <span className="w-2 h-2 bg-critical rounded-full mt-0.5 shadow-[0_0_8px_#ff3d3d]" />
      </button>

      {/* User Location Pin */}
      <button
        type="button"
        onClick={() =>
          setSelectedPoint(
            selectedPoint === "you"
              ? null
              : "Your GPS Location: Shillong Outskirts (Moderate Safe Zone)"
          )
        }
        className="absolute cursor-pointer transition-transform hover:scale-110 z-10"
        style={{ top: "52%", left: "37%" }}
        aria-label="Your location"
      >
        <div className="bg-primary text-primary-foreground text-[11px] font-bold px-2 py-0.5 rounded-md shadow-[0_0_12px_rgba(0,200,255,0.7)] border border-white/60 flex items-center gap-1">
          <span className="w-1.5 h-1.5 bg-primary-foreground rounded-full animate-ping" />
          <span>You</span>
        </div>
      </button>

      {/* Blocked Road Warning Marker */}
      <button
        type="button"
        onClick={() =>
          setSelectedPoint(
            selectedPoint === "nh206"
              ? null
              : "NH-206: Road Blocked by Debris - Road Closure Active"
          )
        }
        className="absolute cursor-pointer transition-transform hover:scale-110 z-10"
        style={{ top: "58%", left: "50%" }}
        aria-label="NH-206 status"
      >
        <div className="bg-danger text-white text-[11px] font-bold px-2 py-0.5 rounded shadow-[0_0_10px_rgba(255,61,61,0.7)] border border-white/30">
          NH-206
        </div>
      </button>

      {/* Interactive Point Tooltip Popup */}
      {selectedPoint && (
        <div className="absolute top-12 left-3 right-12 bg-background/95 border border-primary/50 rounded-xl p-2.5 text-xs text-foreground shadow-2xl backdrop-blur-md z-20 flex items-center justify-between animate-in fade-in zoom-in-95">
          <span className="pr-2 font-medium">{selectedPoint}</span>
          <button
            onClick={() => setSelectedPoint(null)}
            className="text-muted-foreground hover:text-white p-1 rounded-lg hover:bg-muted"
            aria-label="Close message"
          >
            <Icon name="x" size={14} />
          </button>
        </div>
      )}

      {/* Floating Quick Action Controls */}
      <div className="absolute right-3 top-14 flex flex-col gap-1.5 z-10">
        <button
          type="button"
          onClick={() => setShowRadar(!showRadar)}
          className={`w-8 h-8 rounded-lg flex items-center justify-center border transition-all ${
            showRadar
              ? "bg-primary text-primary-foreground border-primary shadow-[0_0_10px_rgba(0,200,255,0.5)]"
              : "bg-card/90 text-foreground border-border hover:bg-muted"
          }`}
          title="Toggle Radar Sweep"
          aria-label="Toggle Radar"
        >
          <Icon name="layers" size={15} />
        </button>
        <button
          type="button"
          onClick={handleReset}
          className="bg-card/90 hover:bg-muted border border-border w-8 h-8 rounded-lg flex items-center justify-center text-foreground transition-all shadow"
          title="Reset Center"
          aria-label="Reset Map"
        >
          <Icon name="crosshair" size={15} />
        </button>
        <button
          type="button"
          onClick={handleZoomIn}
          className="bg-card/90 hover:bg-muted border border-border w-8 h-8 rounded-lg flex items-center justify-center text-foreground transition-all shadow"
          title="Zoom In"
          aria-label="Zoom In"
        >
          <Icon name="plus" size={15} />
        </button>
        <button
          type="button"
          onClick={handleZoomOut}
          className="bg-card/90 hover:bg-muted border border-border w-8 h-8 rounded-lg flex items-center justify-center text-foreground transition-all shadow"
          title="Zoom Out"
          aria-label="Zoom Out"
        >
          <Icon name="minus" size={15} />
        </button>
      </div>

      {/* Risk Legend Footer Bar */}
      <div className="absolute bottom-3 left-3 bg-card/90 backdrop-blur-md border border-border/80 rounded-lg px-2.5 py-1.5 flex items-center gap-3 z-10 shadow-lg">
        <div className="flex items-center gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-safe shadow-[0_0_6px_#00e676]" />
          <span className="text-foreground text-[11px] font-semibold">Safe</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-moderate shadow-[0_0_6px_#ffb020]" />
          <span className="text-foreground text-[11px] font-semibold">Moderate</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-high shadow-[0_0_6px_#ff7a00]" />
          <span className="text-foreground text-[11px] font-semibold">High</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-critical shadow-[0_0_6px_#ff3d3d]" />
          <span className="text-foreground text-[11px] font-semibold">Critical</span>
        </div>
      </div>
    </div>
  );
};

export default MapViewCard;
