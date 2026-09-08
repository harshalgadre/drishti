"use client";

import React, { useState, useEffect } from "react";
import Icon from "./Icon";
import RiskBadge from "./RiskBadge";

interface NavigationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const NavigationModal: React.FC<NavigationModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    {
      instruction: "Head South towards Mawphlang Bypass on SH-5",
      distance: "1.2 km",
      sub: "Bypassing NH-206 landslide zone ahead",
      status: "safe",
    },
    {
      instruction: "Continue along Mawphlang Sacred Forest Road",
      distance: "8.4 km",
      sub: "Sensor Array #12 confirms slope stability: 98% safe",
      status: "safe",
    },
    {
      instruction: "Keep right toward Sohra / Cherrapunji Link",
      distance: "14.1 km",
      sub: "Pavement dry, visibility 8 km",
      status: "safe",
    },
    {
      instruction: "Arrive safely at Cherrapunji Central Terminal",
      distance: "Destination",
      sub: "All debris sectors bypassed with zero risk",
      status: "destination",
    },
  ];

  useEffect(() => {
    if (!isOpen) {
      setCurrentStep(0);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className="w-full max-w-md bg-card border border-success/40 sm:rounded-2xl rounded-t-2xl p-5 shadow-[0_0_40px_rgba(0,230,118,0.25)] animate-in slide-in-from-bottom-6 duration-300 max-h-[90vh] overflow-y-auto"
        role="dialog"
        aria-modal="true"
      >
        {/* Navigation Banner */}
        <div className="flex items-center justify-between pb-3 border-b border-border mb-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-success/20 border border-success/40 flex items-center justify-center text-success">
              <Icon name="navigation" size={18} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-foreground text-sm">Active Safe Routing</h3>
                <RiskBadge level="safe">GPS LOCKED</RiskBadge>
              </div>
              <p className="text-[11px] text-muted-foreground">Mawphlang Bypass Detour</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-secondary hover:bg-muted text-muted-foreground hover:text-white flex items-center justify-center"
            aria-label="Close navigation"
          >
            <Icon name="x" size={16} />
          </button>
        </div>

        {/* Live HUD Banner */}
        <div className="bg-muted/80 border border-border rounded-xl p-3.5 mb-4">
          <div className="flex items-center justify-between mb-2">
            <div>
              <span className="text-[10px] text-muted-foreground uppercase font-bold tracking-wider">
                Safe Route ETA
              </span>
              <div className="text-2xl font-black text-success font-mono">2h 03m</div>
            </div>
            <div className="text-right">
              <span className="text-[10px] text-muted-foreground uppercase font-bold tracking-wider">
                Remaining Distance
              </span>
              <div className="text-lg font-bold text-foreground font-mono">54.2 km</div>
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs text-foreground/90 bg-background/60 p-2 rounded-lg border border-border/50">
            <span className="w-2 h-2 rounded-full bg-success animate-ping" />
            <span>Avoided Hazard: <strong>NH-206 Landslide Blockage (Zone MH-204)</strong></span>
          </div>
        </div>

        {/* Turn-by-Turn Instruction Card */}
        <div className="bg-input border-2 border-primary/40 rounded-xl p-4 mb-4">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-lg bg-primary text-primary-foreground flex items-center justify-center font-bold text-lg shrink-0 shadow-[0_0_12px_rgba(0,200,255,0.5)]">
              <Icon name="navigation" size={20} />
            </div>
            <div className="flex-1">
              <div className="text-xs text-primary font-bold tracking-wide uppercase">
                Step {currentStep + 1} of {steps.length} ({steps[currentStep].distance})
              </div>
              <div className="text-sm font-bold text-foreground mt-0.5">
                {steps[currentStep].instruction}
              </div>
              <div className="text-xs text-muted-foreground mt-1">
                {steps[currentStep].sub}
              </div>
            </div>
          </div>
        </div>

        {/* Step Controls */}
        <div className="flex gap-2 mb-2">
          <button
            type="button"
            disabled={currentStep === 0}
            onClick={() => setCurrentStep((prev) => Math.max(0, prev - 1))}
            className="flex-1 py-2 rounded-lg border border-border text-xs font-bold text-muted-foreground hover:text-foreground disabled:opacity-40 transition-colors"
          >
            PREVIOUS STEP
          </button>
          <button
            type="button"
            disabled={currentStep === steps.length - 1}
            onClick={() => setCurrentStep((prev) => Math.min(steps.length - 1, prev + 1))}
            className="flex-1 py-2 rounded-lg bg-primary hover:bg-primary/90 text-primary-foreground text-xs font-bold disabled:opacity-40 shadow-[0_0_10px_rgba(0,200,255,0.3)] transition-all"
          >
            NEXT TURN
          </button>
        </div>

        {/* End Nav */}
        <button
          type="button"
          onClick={onClose}
          className="w-full py-2.5 rounded-lg bg-secondary/80 hover:bg-secondary text-xs font-bold text-foreground border border-border transition-colors mt-2"
        >
          STOP NAVIGATION PREVIEW
        </button>
      </div>
    </div>
  );
};

export default NavigationModal;
