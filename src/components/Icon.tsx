import React from "react";

export type IconName =
  | "bell"
  | "map-pin"
  | "alert-triangle"
  | "arrow-right"
  | "layers"
  | "crosshair"
  | "plus"
  | "minus"
  | "cloud-rain"
  | "droplets"
  | "mountain"
  | "history"
  | "cpu"
  | "check-circle"
  | "check"
  | "navigation"
  | "camera"
  | "home"
  | "map"
  | "user"
  | "chevron-down"
  | "search"
  | "waves"
  | "activity"
  | "x-circle"
  | "circle"
  | "bar-chart-2"
  | "clock"
  | "phone"
  | "shield"
  | "x";

interface IconProps {
  name: IconName;
  size?: number | string;
  className?: string;
  strokeWidth?: number;
}

export const Icon: React.FC<IconProps> = ({
  name,
  size = 20,
  className = "",
  strokeWidth = 2.2,
}) => {
  const pixelSize = typeof size === "number" ? `${size}px` : size;

  const renderPath = () => {
    switch (name) {
      case "bell":
        return (
          <>
            <path d="M10.268 21a2 2 0 0 0 3.464 0" />
            <path d="M3.262 15.326A1 1 0 0 0 4 17h16a1 1 0 0 0 .74-1.673C19.41 13.956 18 12.499 18 8A6 6 0 0 0 6 8c0 4.499-1.411 5.956-2.738 7.326" />
          </>
        );
      case "map-pin":
        return (
          <>
            <path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0" />
            <circle cx="12" cy="10" r="3" />
          </>
        );
      case "alert-triangle":
        return (
          <path d="m21.73 18l-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3M12 9v4m0 4h.01" />
        );
      case "arrow-right":
        return <path d="M5 12h14m-7-7l7 7l-7 7" />;
      case "layers":
        return (
          <>
            <path d="M12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83z" />
            <path d="M2 12a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 12" />
            <path d="M2 17a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 17" />
          </>
        );
      case "crosshair":
        return (
          <>
            <circle cx="12" cy="12" r="10" />
            <path d="M22 12h-4M6 12H2m10-6V2m0 20v-4" />
          </>
        );
      case "plus":
        return <path d="M5 12h14m-7-7v14" />;
      case "minus":
        return <path d="M5 12h14" />;
      case "cloud-rain":
        return (
          <path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242M16 14v6m-8-6v6m4-4v6" />
        );
      case "droplets":
        return (
          <>
            <path d="M7 16.3c2.2 0 4-1.83 4-4.05c0-1.16-.57-2.26-1.71-3.19S7.29 6.75 7 5.3c-.29 1.45-1.14 2.84-2.29 3.76S3 11.1 3 12.25c0 2.22 1.8 4.05 4 4.05" />
            <path d="M12.56 6.6A11 11 0 0 0 14 3.02c.5 2.5 2 4.9 4 6.5s3 3.5 3 5.5a6.98 6.98 0 0 1-11.91 4.97" />
          </>
        );
      case "mountain":
        return <path d="m8 3l4 8l5-5l5 15H2z" />;
      case "history":
        return (
          <>
            <path d="M3 12a9 9 0 1 0 9-9a9.75 9.75 0 0 0-6.74 2.74L3 8" />
            <path d="M3 3v5h5m4-1v5l4 2" />
          </>
        );
      case "cpu":
        return (
          <>
            <path d="M12 20v2m0-20v2m5 16v2m0-20v2M2 12h2m-2 5h2M2 7h2m16 5h2m-2 5h2M20 7h2M7 20v2M7 2v2" />
            <rect width="16" height="16" x="4" y="4" rx="2" />
            <rect width="8" height="8" x="8" y="8" rx="1" />
          </>
        );
      case "check-circle":
        return (
          <>
            <path d="M21.801 10A10 10 0 1 1 17 3.335" />
            <path d="m9 11l3 3L22 4" />
          </>
        );
      case "check":
        return <path d="M20 6L9 17l-5-5" />;
      case "navigation":
        return <path d="m3 11l19-9l-9 19l-2-8z" />;
      case "camera":
        return (
          <>
            <path d="M13.997 4a2 2 0 0 1 1.76 1.05l.486.9A2 2 0 0 0 18.003 7H20a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h1.997a2 2 0 0 0 1.759-1.048l.489-.904A2 2 0 0 1 10.004 4z" />
            <circle cx="12" cy="13" r="3" />
          </>
        );
      case "home":
        return (
          <>
            <path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8" />
            <path d="M3 10a2 2 0 0 1 .709-1.528l7-6a2 2 0 0 1 2.582 0l7 6A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
          </>
        );
      case "map":
        return (
          <>
            <path d="M14.106 5.553a2 2 0 0 0 1.788 0l3.659-1.83A1 1 0 0 1 21 4.619v12.764a1 1 0 0 1-.553.894l-4.553 2.277a2 2 0 0 1-1.788 0l-4.212-2.106a2 2 0 0 0-1.788 0l-3.659 1.83A1 1 0 0 1 3 19.381V6.618a1 1 0 0 1 .553-.894l4.553-2.277a2 2 0 0 1 1.788 0z" />
            <path d="M15 5.764v15M9 3.236v15" />
          </>
        );
      case "user":
        return (
          <>
            <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
            <circle cx="12" cy="7" r="4" />
          </>
        );
      case "chevron-down":
        return <path d="m6 9l6 6l6-6" />;
      case "search":
        return (
          <>
            <path d="m21 21l-4.34-4.34" />
            <circle cx="11" cy="11" r="8" />
          </>
        );
      case "waves":
        return (
          <path d="M2 6c.6.5 1.2 1 2.5 1C7 7 7 5 9.5 5c2.6 0 2.4 2 5 2c2.5 0 2.5-2 5-2c1.3 0 1.9.5 2.5 1M2 12c.6.5 1.2 1 2.5 1c2.5 0 2.5-2 5-2c2.6 0 2.4 2 5 2c2.5 0 2.5-2 5-2c1.3 0 1.9.5 2.5 1M2 18c.6.5 1.2 1 2.5 1c2.5 0 2.5-2 5-2c2.6 0 2.4 2 5 2c2.5 0 2.5-2 5-2c1.3 0 1.9.5 2.5 1" />
        );
      case "activity":
        return (
          <path d="M22 12h-2.48a2 2 0 0 0-1.93 1.46l-2.35 8.36a.25.25 0 0 1-.48 0L9.24 2.18a.25.25 0 0 0-.48 0l-2.35 8.36A2 2 0 0 1 4.49 12H2" />
        );
      case "x-circle":
        return (
          <>
            <circle cx="12" cy="12" r="10" />
            <path d="m15 9l-6 6m0-6l6 6" />
          </>
        );
      case "circle":
        return <circle cx="12" cy="12" r="10" />;
      case "bar-chart-2":
        return <path d="M5 21v-6m7 6V3m7 18V9" />;
      case "clock":
        return (
          <>
            <circle cx="12" cy="12" r="10" />
            <path d="M12 6v6l4 2" />
          </>
        );
      case "phone":
        return (
          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
        );
      case "shield":
        return <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />;
      case "x":
        return <path d="M18 6L6 18M6 6l12 12" />;
      default:
        return <circle cx="12" cy="12" r="10" />;
    }
  };

  return (
    <span
      className={`inline-flex items-center justify-center shrink-0 ${className}`}
      style={{ width: pixelSize, height: pixelSize }}
      data-icon={name}
      data-component="@globalComponents/Icon.jsx"
    >
      <svg
        width={pixelSize}
        height={pixelSize}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-full h-full"
      >
        {renderPath()}
      </svg>
    </span>
  );
};

export default Icon;
