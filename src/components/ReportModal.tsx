"use client";

import React, { useState } from "react";
import Icon from "./Icon";

interface ReportModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const hazardTypes = [
  { id: "landslide", label: "Landslide Debris", icon: "mountain" as const },
  { id: "rockfall", label: "Falling Rocks", icon: "alert-triangle" as const },
  { id: "cracks", label: "Ground Cracks", icon: "activity" as const },
  { id: "blockage", label: "Road Blocked", icon: "x-circle" as const },
  { id: "water", label: "Mudflow / Flood", icon: "droplets" as const },
];

export const ReportModal: React.FC<ReportModalProps> = ({ isOpen, onClose }) => {
  const [selectedType, setSelectedType] = useState("landslide");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("Shillong-Cherrapunji Highway (KM 42)");
  const [hasPhoto, setHasPhoto] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 2200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className="w-full max-w-md bg-card border border-border sm:rounded-2xl rounded-t-2xl p-5 shadow-2xl animate-in slide-in-from-bottom-6 duration-300 max-h-[90vh] overflow-y-auto"
        role="dialog"
        aria-modal="true"
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-border mb-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center text-primary">
              <Icon name="camera" size={18} />
            </div>
            <div>
              <h3 className="font-bold text-foreground text-base">Report Hazard Incident</h3>
              <p className="text-xs text-muted-foreground">Crowdsourced Citizen Sentinel</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-secondary hover:bg-muted text-muted-foreground hover:text-white flex items-center justify-center transition-colors"
            aria-label="Close modal"
          >
            <Icon name="x" size={16} />
          </button>
        </div>

        {submitted ? (
          <div className="py-8 text-center space-y-3">
            <div className="w-14 h-14 bg-success/20 text-success rounded-full flex items-center justify-center mx-auto shadow-[0_0_20px_rgba(0,230,118,0.4)]">
              <Icon name="check" size={28} />
            </div>
            <h4 className="text-lg font-bold text-foreground">Report Successfully Transmitted</h4>
            <p className="text-xs text-muted-foreground max-w-xs mx-auto">
              Incident logged to BhuRakshak AI Sentinel Node. State Disaster Management Authority (SDMA) & nearby motorists have been notified.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Hazard Type Selector */}
            <div>
              <label className="block text-xs font-bold text-foreground uppercase tracking-wider mb-2">
                1. Select Incident Type
              </label>
              <div className="grid grid-cols-2 gap-2">
                {hazardTypes.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setSelectedType(item.id)}
                    className={`flex items-center gap-2 p-2.5 rounded-lg border text-xs font-semibold transition-all ${
                      selectedType === item.id
                        ? "bg-primary/20 border-primary text-primary shadow-[0_0_10px_rgba(0,200,255,0.25)]"
                        : "bg-input/60 border-border text-foreground hover:bg-muted"
                    }`}
                  >
                    <Icon name={item.icon} size={15} />
                    <span>{item.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* GPS Location Tag */}
            <div>
              <label className="block text-xs font-bold text-foreground uppercase tracking-wider mb-1.5">
                2. Location Tag
              </label>
              <div className="flex items-center gap-2 bg-input border border-border rounded-lg px-3 py-2 text-xs">
                <Icon name="map-pin" size={15} className="text-primary" />
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="bg-transparent flex-1 text-foreground focus:outline-none text-xs"
                  placeholder="Enter specific road or landmark..."
                  required
                />
              </div>
            </div>

            {/* Photo Capture Simulation */}
            <div>
              <label className="block text-xs font-bold text-foreground uppercase tracking-wider mb-1.5">
                3. Photo Evidence
              </label>
              <div
                onClick={() => setHasPhoto(!hasPhoto)}
                className={`border-2 border-dashed rounded-lg p-3 text-center cursor-pointer transition-all ${
                  hasPhoto
                    ? "border-success bg-success/10 text-success"
                    : "border-border hover:border-primary/60 bg-input/40 text-muted-foreground"
                }`}
              >
                <div className="flex flex-col items-center gap-1">
                  <Icon name="camera" size={20} />
                  <span className="text-xs font-medium">
                    {hasPhoto ? "Photo Attached (1 file: debris_slope_cam.jpg)" : "Tap to capture or upload slope photo"}
                  </span>
                </div>
              </div>
            </div>

            {/* Additional Remarks */}
            <div>
              <label className="block text-xs font-bold text-foreground uppercase tracking-wider mb-1.5">
                4. Field Observation (Optional)
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="E.g., Rocks rolling onto lane, heavy water runoff from cliffside..."
                rows={2}
                className="w-full bg-input border border-border rounded-lg p-2.5 text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary resize-none"
              />
            </div>

            {/* Submit Action */}
            <div className="pt-2 flex gap-2">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 py-2.5 rounded-lg border border-border text-xs font-bold text-muted-foreground hover:text-foreground transition-colors"
              >
                CANCEL
              </button>
              <button
                type="submit"
                className="flex-1 py-2.5 rounded-lg bg-primary hover:bg-primary/90 text-primary-foreground text-xs font-bold shadow-[0_0_15px_rgba(0,200,255,0.4)] flex items-center justify-center gap-1.5 transition-all"
              >
                <Icon name="check" size={14} />
                <span>TRANSMIT REPORT</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default ReportModal;
