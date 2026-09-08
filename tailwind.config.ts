import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#0d1b2e",
        foreground: "#e8f4fd",
        border: "#1e3a5f",
        input: "#112240",
        primary: {
          DEFAULT: "#00c8ff",
          foreground: "#0d1b2e",
        },
        secondary: {
          DEFAULT: "#1a3a5c",
          foreground: "#e8f4fd",
        },
        muted: {
          DEFAULT: "#162e4a",
          foreground: "#6b9ab8",
        },
        card: {
          DEFAULT: "#0f2035",
          foreground: "#e8f4fd",
        },
        danger: "#ff3d3d",
        warning: "#ffb020",
        success: "#00e676",
        critical: "#ff3d3d",
        high: "#ff7a00",
        moderate: "#ffb020",
        safe: "#00e676",
      },
      fontFamily: {
        body: ["var(--font-space-grotesk)", "sans-serif"],
        headings: ["var(--font-space-grotesk)", "sans-serif"],
        sans: ["var(--font-space-grotesk)", "sans-serif"],
      },
      keyframes: {
        pulseGlow: {
          "0%, 100%": { opacity: "1", transform: "scale(1)" },
          "50%": { opacity: "0.5", transform: "scale(1.08)" },
        },
        radarSweep: {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
      },
      animation: {
        "pulse-glow": "pulseGlow 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "radar-sweep": "radarSweep 4s linear infinite",
      },
    },
  },
  plugins: [],
};

export default config;
