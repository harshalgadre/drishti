"use client";

import React from "react";
import Icon from "./Icon";
import RiskBadge from "./RiskBadge";

interface AlertDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onStartSafeRoute?: () => void;
}

export const AlertDetailsModal: React.FC<AlertDetailsModalProps> = ({
  isOpen,
  onClose,
  onStartSafeRoute,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/75 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className="w-full max-w-md bg-card border border-danger/40 sm:rounded-2xl rounded-t-2xl p-5 shadow-[0_0_40px_rgba(255,61,61,0.25)] animate-in slide-in-from-bottom-6 duration-300 max-h-[90vh] overflow-y-auto"
        role="dialog"
        aria-modal="true"
      >
        {/* Modal Header */}
        <div className="flex items-start justify-between pb-3 border-b border-border mb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-lg bg-danger/20 border border-danger/40 flex items-center justify-center text-danger shrink-0">
              <Icon name="alert-triangle" size={20} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold text-danger uppercase tracking-wide">
                  CRITICAL HAZARD BULLETIN
                </span>
                <RiskBadge level="critical">SEV 1</RiskBadge>
              </div>
              <p className="text-xs text-muted-foreground">Issued by IMD & BhuRakshak AI Sensor Array</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-secondary hover:bg-muted text-muted-foreground hover:text-white flex items-center justify-center transition-colors"
            aria-label="Close alert modal"
          >
            <Icon name="x" size={16} />
          </button>
        </div>

        {/* Hazard Summary Card */}
        <div className="bg-muted/70 rounded-xl p-3.5 border border-border mb-4 space-y-2">
          <div className="text-xs text-foreground font-bold flex items-center gap-1.5">
            <Icon name="map-pin" size={14} className="text-danger" />
            <span>Target Zone: Shillong – Cherrapunji Corridor (NH-206, MP 14-22)</span>
          </div>
          <p className="text-xs text-foreground/90 leading-relaxed">
            Severe landslide and slope instability triggered by continuous torrential rainfall (128mm / 12h). Subsurface pore pressure exceeded structural shear limits at 06:40 AM IST.
          </p>
          <div className="flex items-center justify-between pt-1 border-t border-border/60 text-[11px] text-muted-foreground">
            <span>Probability of Mass Movement: <strong className="text-danger">92%</strong></span>
            <span>Radius: <strong>4.8 km</strong></span>
          </div>
        </div>

        {/* Actionable Directives */}
        <div className="space-y-2 mb-4">
          <h4 className="text-xs font-bold text-foreground uppercase tracking-wider">
            Mandatory Citizen Directives
          </h4>
          <ul className="space-y-1.5 text-xs text-foreground/90">
            <li className="flex items-start gap-2 bg-input/40 p-2 rounded-md border border-border">
              <span className="text-danger font-black mt-0.5">•</span>
              <span><strong>Halt all transit via NH-206:</strong> Both lanes blocked near Umiew River gorge.</span>
            </li>
            <li className="flex items-start gap-2 bg-input/40 p-2 rounded-md border border-border">
              <span className="text-success font-black mt-0.5">•</span>
              <span><strong>Use Mawphlang Bypass:</strong> Divert via SH-5 Mawphlang; route certified clear.</span>
            </li>
            <li className="flex items-start gap-2 bg-input/40 p-2 rounded-md border border-border">
              <span className="text-warning font-black mt-0.5">•</span>
              <span><strong>Watch for Muddy Runoff:</strong> Sudden muddy trickles indicate imminent slope release.</span>
            </li>
          </ul>
        </div>

        {/* Emergency Contacts */}
        <div className="grid grid-cols-2 gap-2 mb-4">
          <a
            href="tel:1077"
            className="flex items-center justify-center gap-2 p-2.5 rounded-lg bg-secondary/80 hover:bg-secondary border border-border text-xs font-bold text-foreground transition-all"
          >
            <Icon name="phone" size={14} className="text-primary" />
            <span>SDMA: 1077</span>
          </a>
          <a
            href="tel:112"
            className="flex items-center justify-center gap-2 p-2.5 rounded-lg bg-secondary/80 hover:bg-secondary border border-border text-xs font-bold text-foreground transition-all"
          >
            <Icon name="phone" size={14} className="text-danger" />
            <span>Disaster SOS: 112</span>
          </a>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 py-2.5 rounded-lg border border-border text-xs font-bold text-muted-foreground hover:text-foreground"
          >
            DISMISS
          </button>
          <button
            type="button"
            onClick={() => {
              onClose();
              if (onStartSafeRoute) onStartSafeRoute();
            }}
            className="flex-1 py-2.5 rounded-lg bg-success hover:bg-success/90 text-primary-foreground text-xs font-bold shadow-[0_0_15px_rgba(0,230,118,0.4)] flex items-center justify-center gap-1.5"
          >
            <Icon name="navigation" size={14} />
            <span>TAKE SAFE ROUTE</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default AlertDetailsModal;
