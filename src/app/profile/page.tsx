"use client";

import React, { useState } from "react";
import Link from "next/link";
import Icon from "@/components/Icon";
import RiskBadge from "@/components/RiskBadge";

const languages = [
  { id: "en", name: "English (Standard)" },
  { id: "hi", name: "हिन्दी (Hindi)" },
  { id: "kha", name: "Ka Ktien Khasi (Khasi)" },
  { id: "gar", name: "A·chik Ku·sik (Garo)" },
  { id: "as", name: "অসমীয়া (Assamese)" },
];

export default function ProfilePage() {
  const [offlinePack, setOfflinePack] = useState(true);
  const [smsAlerts, setSmsAlerts] = useState(true);
  const [autoGps, setAutoGps] = useState(true);
  const [selectedLang, setSelectedLang] = useState("en");
  const [sosActive, setSosActive] = useState(false);
  const [sosCount, setSosCount] = useState<number | null>(null);

  // Trigger SOS countdown sequence
  const handleSosClick = () => {
    if (sosActive) {
      setSosActive(false);
      setSosCount(null);
      return;
    }

    setSosCount(3);
    const interval = setInterval(() => {
      setSosCount((prev) => {
        if (prev === null || prev <= 1) {
          clearInterval(interval);
          setSosActive(true);
          return null;
        }
        return prev - 1;
      });
    }, 1000);
  };

  return (
    <div className="space-y-6" data-component="@screens/MobileProfile.jsx">
      {/* Top Header Card */}
      <div className="bg-card border border-border rounded-2xl p-4 sm:p-5 shadow-lg flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-lg sm:text-xl font-black text-foreground">
              Citizen Sentinel Responder Profile
            </h1>
            <RiskBadge level="safe">VERIFIED SENTINEL</RiskBadge>
          </div>
          <p className="text-xs text-muted-foreground mt-0.5">
            Decentralized community responder credentials and emergency distress beacon.
          </p>
        </div>

        <Link
          href="/report"
          className="bg-primary hover:bg-primary/90 text-primary-foreground font-black text-xs px-4 py-2 rounded-xl shadow flex items-center gap-2 shrink-0 transition-all"
        >
          <Icon name="camera" size={14} />
          <span>FILE HAZARD REPORT</span>
        </Link>
      </div>

      {/* Main Responsive 2-Column Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column (Col 1-6): Profile Card, Stats, SOS, ICE */}
        <div className="lg:col-span-6 space-y-6">
          {/* User Identity Card */}
          <div className="bg-card border border-border rounded-2xl p-5 shadow-xl flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-primary/20 border-2 border-primary flex items-center justify-center text-primary font-black text-2xl shadow-[0_0_20px_rgba(0,200,255,0.4)] shrink-0">
              <Icon name="user" size={32} />
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <h2 className="font-bold text-foreground text-lg">Avdhoot K.</h2>
                <span className="text-xs text-primary font-mono bg-primary/10 px-2 py-0.5 rounded-md border border-primary/30 font-bold">
                  ID: #BK-4912
                </span>
              </div>
              <div className="text-xs text-muted-foreground mt-0.5">
                Verified Field Responder · Level 2 Sentinel
              </div>
              <div className="text-xs text-foreground/90 mt-1 flex items-center gap-1 font-semibold">
                <Icon name="map-pin" size={13} className="text-primary" />
                <span>East Khasi Hills District, Meghalaya</span>
              </div>
            </div>
          </div>

          {/* Activity Quick Stats */}
          <div className="grid grid-cols-3 gap-3">
            <div className="bg-muted/60 border border-border rounded-2xl p-3.5 text-center shadow-lg">
              <div className="text-2xl font-black text-primary font-mono">8</div>
              <div className="text-xs text-muted-foreground font-bold mt-0.5">Reports Filed</div>
            </div>
            <div className="bg-muted/60 border border-border rounded-2xl p-3.5 text-center shadow-lg">
              <div className="text-2xl font-black text-success font-mono">100%</div>
              <div className="text-xs text-muted-foreground font-bold mt-0.5">Verified Rate</div>
            </div>
            <div className="bg-muted/60 border border-border rounded-2xl p-3.5 text-center shadow-lg">
              <div className="text-2xl font-black text-warning font-mono">650</div>
              <div className="text-xs text-muted-foreground font-bold mt-0.5">Impact Score</div>
            </div>
          </div>

          {/* Emergency SOS Distress Beacon */}
          <div className="bg-danger/10 border-2 border-danger/60 rounded-2xl p-5 shadow-[0_0_30px_rgba(255,61,61,0.2)] text-center space-y-3">
            <div className="flex items-center justify-center gap-2 text-danger font-black text-xs uppercase tracking-wider">
              <Icon name="alert-triangle" size={16} />
              <span>One-Touch Disaster Distress Beacon</span>
            </div>

            <p className="text-xs text-muted-foreground max-w-md mx-auto leading-relaxed">
              Instantly transmits high-precision GPS coordinates, battery level, and medical ICE card to NDRF 1st Battalion Guwahati and Meghalaya SDMA command center.
            </p>

            <button
              type="button"
              onClick={handleSosClick}
              className={`w-full py-4 rounded-xl font-black text-xs sm:text-sm tracking-wider uppercase transition-all shadow-xl flex items-center justify-center gap-2 ${
                sosActive
                  ? "bg-danger text-white animate-pulse shadow-[0_0_35px_rgba(255,61,61,0.9)]"
                  : sosCount !== null
                  ? "bg-danger text-white scale-105"
                  : "bg-danger/90 hover:bg-danger text-white active:scale-98"
              }`}
            >
              <Icon name="phone" size={18} />
              <span>
                {sosActive
                  ? "BEACON ACTIVE & TRANSMITTING (CLICK TO CANCEL)"
                  : sosCount !== null
                  ? `TRANSMITTING SOS IN ${sosCount} SECONDS...`
                  : "HOLD FOR EMERGENCY SOS (112)"}
              </span>
            </button>
          </div>

          {/* Medical ICE Card */}
          <div className="bg-card border border-border rounded-2xl p-5 shadow-xl space-y-3">
            <h3 className="text-xs font-bold text-foreground uppercase tracking-wider flex items-center gap-2">
              <Icon name="shield" size={16} className="text-primary" />
              <span>In Case of Emergency (ICE) Profile</span>
            </h3>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="bg-input/60 p-3 rounded-xl border border-border/60">
                <span className="text-muted-foreground text-xs block">Blood Group</span>
                <strong className="text-danger font-mono text-base">O +ve</strong>
              </div>
              <div className="bg-input/60 p-3 rounded-xl border border-border/60">
                <span className="text-muted-foreground text-xs block">Known Allergies</span>
                <strong className="text-foreground text-sm">None Reported</strong>
              </div>
            </div>

            <div className="bg-input/60 p-3.5 rounded-xl border border-border/60 flex items-center justify-between text-xs">
              <div>
                <span className="text-muted-foreground text-xs block">Primary Kin Contact</span>
                <span className="font-bold text-foreground text-sm">Deepak K. (Brother)</span>
              </div>
              <a
                href="tel:+919876543210"
                className="text-primary font-mono font-bold hover:underline bg-primary/10 px-3 py-1.5 rounded-lg border border-primary/30"
              >
                +91 98765 43210
              </a>
            </div>
          </div>
        </div>

        {/* Right Column (Col 7-12): Offline Cache, Language, Emergency Directory */}
        <div className="lg:col-span-6 space-y-6">
          {/* Offline GIS & Resilience Settings */}
          <div className="bg-card border border-border rounded-2xl p-5 shadow-xl space-y-4">
            <h3 className="text-xs font-bold text-foreground uppercase tracking-wider">
              Resilience & Zero-Network Capabilities
            </h3>

            <div className="flex items-center justify-between py-2 border-b border-border/60">
              <div>
                <div className="text-sm font-bold text-foreground">
                  Offline High-Res GIS Tile Cache
                </div>
                <div className="text-xs text-muted-foreground">
                  Meghalaya & Assam valley topographic layers (142 MB cached)
                </div>
              </div>
              <input
                type="checkbox"
                checked={offlinePack}
                onChange={() => setOfflinePack(!offlinePack)}
                className="w-5 h-5 accent-primary cursor-pointer"
              />
            </div>

            <div className="flex items-center justify-between py-2 border-b border-border/60">
              <div>
                <div className="text-sm font-bold text-foreground">
                  Zero-Internet SMS Alert Gateway
                </div>
                <div className="text-xs text-muted-foreground">
                  Auto-switches to GSM telemetry when 4G/5G drops
                </div>
              </div>
              <input
                type="checkbox"
                checked={smsAlerts}
                onChange={() => setSmsAlerts(!smsAlerts)}
                className="w-5 h-5 accent-primary cursor-pointer"
              />
            </div>

            <div className="flex items-center justify-between py-2">
              <div>
                <div className="text-sm font-bold text-foreground">
                  Background Geofence Proximity Warning
                </div>
                <div className="text-xs text-muted-foreground">
                  Audible alarm when vehicle approaches active landslide zone
                </div>
              </div>
              <input
                type="checkbox"
                checked={autoGps}
                onChange={() => setAutoGps(!autoGps)}
                className="w-5 h-5 accent-primary cursor-pointer"
              />
            </div>
          </div>

          {/* Regional NER Languages */}
          <div className="bg-card border border-border rounded-2xl p-5 shadow-xl space-y-3">
            <h3 className="text-xs font-bold text-foreground uppercase tracking-wider">
              Regional Language / भाषा (NER Supported)
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {languages.map((lang) => (
                <label
                  key={lang.id}
                  className={`flex items-center justify-between p-3 rounded-xl cursor-pointer border transition-all ${
                    selectedLang === lang.id
                      ? "border-primary bg-primary/10 text-primary"
                      : "border-border bg-input/40 text-foreground hover:bg-muted"
                  }`}
                >
                  <span className="text-xs font-bold">{lang.name}</span>
                  <input
                    type="radio"
                    name="language"
                    value={lang.id}
                    checked={selectedLang === lang.id}
                    onChange={() => setSelectedLang(lang.id)}
                    className="accent-primary"
                  />
                </label>
              ))}
            </div>
          </div>

          {/* Emergency Response Directory */}
          <div className="bg-card border border-border rounded-2xl p-5 shadow-xl space-y-3">
            <h3 className="text-xs font-bold text-foreground uppercase tracking-wider">
              Emergency Response Direct Contacts
            </h3>
            <div className="space-y-2.5">
              {[
                { name: "Meghalaya State Disaster Management (SDMA)", phone: "1077", loc: "Shillong HQ" },
                { name: "National Disaster Response Force (NDRF)", phone: "011-24363260", loc: "1st Bn Guwahati" },
                { name: "Emergency Trauma & Ambulance", phone: "108", loc: "24/7 Dispatch" },
              ].map((c, i) => (
                <div
                  key={i}
                  className="bg-muted/60 border border-border p-3 rounded-xl flex items-center justify-between text-xs"
                >
                  <div>
                    <div className="font-bold text-foreground">{c.name}</div>
                    <div className="text-[11px] text-muted-foreground">{c.loc}</div>
                  </div>
                  <a
                    href={`tel:${c.phone}`}
                    className="font-mono text-primary font-bold bg-primary/10 px-3 py-1.5 rounded-lg border border-primary/30 hover:bg-primary hover:text-primary-foreground transition-all"
                  >
                    {c.phone}
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
