"use client";

import React, { useState, useRef } from "react";
import Link from "next/link";
import Icon from "@/components/Icon";
import RiskBadge from "@/components/RiskBadge";

interface HazardCategory {
  id: string;
  name: string;
  desc: string;
  icon: "mountain" | "alert-triangle" | "activity" | "x-circle" | "droplets" | "waves";
  color: string;
}

const hazardCategories: HazardCategory[] = [
  {
    id: "landslide",
    name: "Landslide / Rockfall",
    desc: "Active boulder fall or slope earth displacement",
    icon: "mountain",
    color: "text-danger border-danger/40 bg-danger/10",
  },
  {
    id: "blockage",
    name: "Road Blockage",
    desc: "Debris, collapsed berm, or mud preventing vehicle transit",
    icon: "x-circle",
    color: "text-high border-high/40 bg-high/10",
  },
  {
    id: "cracks",
    name: "Tension Cracks",
    desc: "Fresh fissures widening in asphalt, retaining wall, or slope",
    icon: "activity",
    color: "text-warning border-warning/40 bg-warning/10",
  },
  {
    id: "mudflow",
    name: "Mudflow / Sludge",
    desc: "Rapid slurry of rain, sediment, and organic soil runoff",
    icon: "droplets",
    color: "text-primary border-primary/40 bg-primary/10",
  },
];

export default function ReportPage() {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [category, setCategory] = useState("landslide");
  const [severity, setSeverity] = useState<"low" | "moderate" | "high" | "critical">("critical");
  const [passability, setPassability] = useState<"blocked" | "partial" | "warning">("blocked");
  const [locationText, setLocationText] = useState("Shillong–Cherrapunji Highway (NH-206, KM 18.4)");
  const [coords, setCoords] = useState("25.5788° N, 91.8933° E");
  const [isDetectingGps, setIsDetectingGps] = useState(false);
  const [notes, setNotes] = useState("");
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [photoName, setPhotoName] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [ticketData, setTicketData] = useState<{
    id: string;
    time: string;
    status: string;
  } | null>(null);

  // Handle local photo upload
  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setPhotoPreview(url);
      setPhotoName(file.name);
    }
  };

  // Load field sample demo image for hackathon testing
  const loadDemoPhoto = () => {
    setPhotoPreview(
      "https://storage.googleapis.com/banani-generated-images/generated-images/7655a177-1f32-4007-9bd3-c222569dc70a.jpg"
    );
    setPhotoName("field_debris_shillong_sector.jpg (Sample Demo Capture)");
  };

  const removePhoto = () => {
    setPhotoPreview(null);
    setPhotoName("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  // Simulate GPS acquisition
  const detectGPS = () => {
    setIsDetectingGps(true);
    setTimeout(() => {
      setCoords("25.5642° N, 91.8790° E (Accuracy: ±3.8m)");
      setLocationText("Umiew Gorge Pass, NH-206 Milepost 18.4");
      setIsDetectingGps(false);
    }, 1200);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setTicketData({
        id: `BK-2026-${Math.floor(1000 + Math.random() * 9000)}`,
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        status: "VERIFIED & BROADCAST TO SDMA MEGHALAYA",
      });
    }, 1500);
  };

  return (
    <div className="space-y-6" data-component="@screens/MobileReport.jsx">
      {/* Top Header Card */}
      <div className="bg-card border border-border rounded-2xl p-4 sm:p-5 shadow-lg flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <Link
            href="/"
            className="p-2 rounded-xl bg-secondary hover:bg-muted text-foreground transition-colors"
            aria-label="Back to Overview"
          >
            <Icon name="arrow-right" size={18} className="rotate-180" />
          </Link>
          <div>
            <h1 className="text-lg sm:text-xl font-black text-foreground">
              Submit Citizen Hazard Photo Report
            </h1>
            <p className="text-xs text-muted-foreground mt-0.5">
              Crowdsourced Sentinel Verification for North Eastern Region (SIH 2026)
            </p>
          </div>
        </div>

        <RiskBadge level="safe" pulse>
          OFFLINE CACHING READY
        </RiskBadge>
      </div>

      {/* Main Form Content */}
      {ticketData ? (
        /* Verified Incident Certificate on Submission */
        <div className="max-w-2xl mx-auto bg-card border-2 border-success rounded-3xl p-6 sm:p-8 shadow-[0_0_40px_rgba(0,230,118,0.2)] text-center space-y-5 animate-in zoom-in-95 duration-300">
          <div className="w-20 h-20 bg-success/20 border-2 border-success text-success rounded-full flex items-center justify-center mx-auto shadow-[0_0_25px_rgba(0,230,118,0.4)]">
            <Icon name="check" size={40} />
          </div>

          <div>
            <div className="text-xs text-success font-bold uppercase tracking-wider">
              OFFICIAL INCIDENT CERTIFICATE
            </div>
            <h2 className="text-2xl font-black text-foreground mt-1">
              Field Hazard Report Transmitted
            </h2>
            <p className="text-xs sm:text-sm text-muted-foreground mt-1.5 max-w-md mx-auto">
              Your geotagged photographic report has been ingested into BhuRakshak AI and forwarded directly to Meghalaya State Disaster Management Authority (SDMA).
            </p>
          </div>

          {/* Ticket Metadata Card */}
          <div className="bg-muted/70 border border-border rounded-2xl p-4 sm:p-5 text-left text-xs sm:text-sm space-y-2.5 font-mono">
            <div className="flex justify-between border-b border-border/60 pb-2">
              <span className="text-muted-foreground">Incident Ticket ID:</span>
              <span className="font-black text-primary text-base">{ticketData.id}</span>
            </div>
            <div className="flex justify-between border-b border-border/60 pb-2">
              <span className="text-muted-foreground">Timestamp:</span>
              <span className="font-bold text-foreground">{ticketData.time} IST</span>
            </div>
            <div className="flex justify-between border-b border-border/60 pb-2">
              <span className="text-muted-foreground">GPS Location:</span>
              <span className="font-bold text-foreground">{coords}</span>
            </div>
            <div className="flex justify-between border-b border-border/60 pb-2">
              <span className="text-muted-foreground">Hazard Category:</span>
              <span className="font-bold text-danger uppercase">{category}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Dispatch Status:</span>
              <span className="font-bold text-success text-xs">{ticketData.status}</span>
            </div>
          </div>

          {/* Photo Thumbnail */}
          {photoPreview && (
            <div className="rounded-2xl overflow-hidden border border-border/80 relative shadow-lg">
              <img
                src={photoPreview}
                alt="Hazard Report"
                className="w-full h-56 object-cover"
              />
              <div className="absolute bottom-3 left-3 bg-background/85 px-3 py-1 rounded-lg text-xs text-white backdrop-blur-sm">
                Geo-tagged & Cryptographically Signed
              </div>
            </div>
          )}

          {/* Action Links */}
          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <Link
              href="/map"
              className="flex-1 py-3.5 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground font-black text-xs uppercase flex items-center justify-center gap-2 shadow-[0_0_15px_rgba(0,200,255,0.4)]"
            >
              <Icon name="map" size={16} />
              <span>VIEW PIN ON GIS MAP</span>
            </Link>
            <button
              type="button"
              onClick={() => {
                setTicketData(null);
                setPhotoPreview(null);
                setNotes("");
              }}
              className="flex-1 py-3.5 rounded-xl bg-secondary hover:bg-muted text-foreground font-bold text-xs border border-border uppercase"
            >
              SUBMIT ANOTHER REPORT
            </button>
          </div>
        </div>
      ) : (
        /* Responsive 2-Column Form */
        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column (Col 1-6): Category & Photo Upload */}
          <div className="lg:col-span-6 space-y-6">
            {/* 1. Category Selection */}
            <div className="bg-card border border-border rounded-2xl p-5 shadow-xl space-y-3">
              <label className="block text-xs font-bold text-foreground uppercase tracking-wider">
                1. Select Observed Hazard Category
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {hazardCategories.map((cat) => (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => setCategory(cat.id)}
                    className={`flex flex-col items-start p-3.5 rounded-xl border text-left transition-all ${
                      category === cat.id
                        ? "border-primary bg-primary/15 text-primary shadow-[0_0_12px_rgba(0,200,255,0.25)] ring-1 ring-primary"
                        : "border-border bg-input/60 text-foreground hover:bg-muted"
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-1.5">
                      <Icon name={cat.icon} size={18} />
                      <span className="text-xs sm:text-sm font-bold">{cat.name}</span>
                    </div>
                    <span className="text-xs text-muted-foreground leading-snug">
                      {cat.desc}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* 2. Photo Upload Evidence (Core Requirement) */}
            <div className="bg-card border border-border rounded-2xl p-5 shadow-xl space-y-3">
              <div className="flex items-center justify-between">
                <label className="block text-xs font-bold text-foreground uppercase tracking-wider">
                  2. Upload Hazard Photo Evidence
                </label>
                <span className="text-xs text-primary font-bold">Camera or Local Files</span>
              </div>

              {/* Hidden File Input */}
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                capture="environment"
                onChange={handlePhotoUpload}
                className="hidden"
                id="hazard-photo-input"
              />

              {photoPreview ? (
                /* Photo Preview Box with Controls */
                <div className="relative rounded-xl overflow-hidden border-2 border-primary shadow-xl group">
                  <img
                    src={photoPreview}
                    alt="Hazard Preview"
                    className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105"
                  />

                  {/* Header Overlay */}
                  <div className="absolute top-3 left-3 right-3 flex items-center justify-between bg-black/70 backdrop-blur-md px-3 py-1.5 rounded-xl">
                    <span className="text-xs font-bold text-white truncate max-w-[280px]">
                      {photoName || "Photo Captured"}
                    </span>
                    <button
                      type="button"
                      onClick={removePhoto}
                      className="text-white hover:text-danger p-1 rounded-lg hover:bg-black/50"
                      aria-label="Remove photo"
                    >
                      <Icon name="x" size={16} />
                    </button>
                  </div>

                  <div className="absolute bottom-3 left-3 right-3 flex gap-2">
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="flex-1 py-2 rounded-xl bg-black/75 hover:bg-black/90 text-white text-xs font-bold backdrop-blur-md flex items-center justify-center gap-1.5 border border-white/20"
                    >
                      <Icon name="camera" size={14} />
                      <span>Retake / Change Photo</span>
                    </button>
                  </div>
                </div>
              ) : (
                /* Empty Upload Dropzone */
                <div className="space-y-3">
                  <div
                    onClick={() => fileInputRef.current?.click()}
                    className="border-2 border-dashed border-border hover:border-primary/80 bg-input/40 rounded-2xl p-8 text-center cursor-pointer transition-all hover:bg-primary/5 flex flex-col items-center justify-center gap-3 group"
                  >
                    <div className="w-14 h-14 rounded-2xl bg-primary/20 flex items-center justify-center text-primary group-hover:scale-110 transition-transform shadow-[0_0_15px_rgba(0,200,255,0.3)]">
                      <Icon name="camera" size={28} />
                    </div>
                    <div>
                      <div className="text-sm font-bold text-foreground">
                        Click to Upload Hazard Photo or Snap Live
                      </div>
                      <div className="text-xs text-muted-foreground mt-1">
                        JPEG, PNG, HEIC from field camera or local storage
                      </div>
                    </div>
                  </div>

                  {/* Demo Helper Shortcut Button */}
                  <div className="flex items-center justify-between pt-1 text-xs">
                    <span className="text-muted-foreground">Hackathon Demonstration:</span>
                    <button
                      type="button"
                      onClick={loadDemoPhoto}
                      className="font-bold text-primary hover:underline flex items-center gap-1"
                    >
                      <span>Load Sample Field Debris Photo</span>
                      <Icon name="plus" size={13} />
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right Column (Col 7-12): Location, Severity, Notes, Submit */}
          <div className="lg:col-span-6 space-y-6">
            {/* 3. Location & GPS Geo-Tagging */}
            <div className="bg-card border border-border rounded-2xl p-5 shadow-xl space-y-3">
              <div className="flex items-center justify-between">
                <label className="block text-xs font-bold text-foreground uppercase tracking-wider">
                  3. Location & GPS Geo-Coordinates
                </label>
                <button
                  type="button"
                  onClick={detectGPS}
                  disabled={isDetectingGps}
                  className="text-xs font-bold text-primary hover:underline flex items-center gap-1.5"
                >
                  <Icon name="crosshair" size={14} className={isDetectingGps ? "animate-spin" : ""} />
                  <span>{isDetectingGps ? "Acquiring GPS Telemetry..." : "Auto-Detect GPS"}</span>
                </button>
              </div>

              {/* Coordinates Pill */}
              <div className="flex items-center gap-2 bg-input border border-border rounded-xl px-3.5 py-2.5 text-xs font-mono text-primary">
                <Icon name="map-pin" size={16} className="text-primary shrink-0" />
                <span className="flex-1 truncate">{coords}</span>
                <span className="text-[10px] text-success font-bold bg-success/15 px-2 py-0.5 rounded">
                  GPS LOCKED
                </span>
              </div>

              {/* Road / Landmark manual description */}
              <input
                type="text"
                value={locationText}
                onChange={(e) => setLocationText(e.target.value)}
                placeholder="Specific road milestone or nearby village..."
                className="w-full bg-input border border-border rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary"
                required
              />
            </div>

            {/* 4. Hazard Severity & Road Passability */}
            <div className="bg-card border border-border rounded-2xl p-5 shadow-xl space-y-4">
              <label className="block text-xs font-bold text-foreground uppercase tracking-wider">
                4. Hazard Severity & Transit Passability
              </label>

              {/* Severity Pill Selector */}
              <div>
                <span className="text-xs text-muted-foreground font-semibold block mb-2">
                  Assessed Severity Level:
                </span>
                <div className="grid grid-cols-4 gap-2">
                  {(["low", "moderate", "high", "critical"] as const).map((sev) => (
                    <button
                      key={sev}
                      type="button"
                      onClick={() => setSeverity(sev)}
                      className={`py-2 rounded-xl text-xs font-bold uppercase transition-all ${
                        severity === sev
                          ? sev === "critical"
                            ? "bg-danger text-white shadow-[0_0_12px_rgba(255,61,61,0.5)]"
                            : sev === "high"
                            ? "bg-high text-white shadow-[0_0_12px_rgba(255,122,0,0.5)]"
                            : sev === "moderate"
                            ? "bg-warning text-background"
                            : "bg-safe text-primary-foreground"
                          : "bg-input border border-border text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      {sev}
                    </button>
                  ))}
                </div>
              </div>

              {/* Passability State */}
              <div>
                <span className="text-xs text-muted-foreground font-semibold block mb-2">
                  Highway Passability:
                </span>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: "blocked", label: "Fully Blocked" },
                    { id: "partial", label: "1-Lane Passable" },
                    { id: "warning", label: "Clear w/ Caution" },
                  ].map((p) => (
                    <button
                      key={p.id}
                      type="button"
                      onClick={() => setPassability(p.id as any)}
                      className={`py-2.5 px-2 rounded-xl border text-center text-xs font-bold transition-all ${
                        passability === p.id
                          ? "bg-primary/20 border-primary text-primary shadow-[0_0_10px_rgba(0,200,255,0.3)]"
                          : "bg-input/60 border-border text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      {p.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* 5. Field Notes */}
            <div className="bg-card border border-border rounded-2xl p-5 shadow-xl space-y-3">
              <label className="block text-xs font-bold text-foreground uppercase tracking-wider">
                5. Field Observations & Additional Notes
              </label>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={3}
                placeholder="E.g., Rocks actively tumbling down slope; mud depth approx 1 meter across culvert..."
                className="w-full bg-input border border-border rounded-xl p-3 text-xs sm:text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary resize-none"
              />
            </div>

            {/* Offline Resilience Guarantee */}
            <div className="bg-muted/60 border border-border rounded-xl p-4 flex items-start gap-3 text-xs text-muted-foreground">
              <Icon name="shield" size={18} className="text-primary shrink-0 mt-0.5" />
              <p className="leading-relaxed text-xs">
                <strong>Offline Sentinel Relay:</strong> If remote mountain valleys lose 4G/5G coverage, your report is securely stored locally and auto-transmits via SMS / Satellite relay upon network recovery.
              </p>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-4 rounded-xl bg-primary hover:bg-primary/90 active:scale-[0.99] text-primary-foreground font-black text-xs sm:text-sm uppercase tracking-wider shadow-[0_0_20px_rgba(0,200,255,0.4)] flex items-center justify-center gap-2 transition-all disabled:opacity-50"
            >
              <Icon name="check" size={18} strokeWidth={3} />
              <span>{isSubmitting ? "TRANSMITTING TO SENTINEL NODE..." : "SUBMIT VERIFIED INCIDENT REPORT"}</span>
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
