export interface AlertItem {
  id: string;
  title: string;
  location: string;
  description: string;
  severity: "critical" | "high" | "moderate" | "safe";
  time: string;
  rainfall: string;
  impactRoads: string[];
  recommendedAction: string;
}

export interface EvacuationShelter {
  id: string;
  name: string;
  location: string;
  distance: string;
  capacity: string;
  status: "Open" | "Standby" | "Full";
  contact: string;
}

export interface RoadStatusItem {
  id: string;
  roadName: string;
  section: string;
  status: "Closed" | "Partially Blocked" | "Clear";
  reason: string;
  clearingEta: string;
}

export const activeAlerts: AlertItem[] = [
  {
    id: "alert-1",
    title: "HIGH LANDSLIDE RISK",
    location: "Shillong–Cherrapunji Road (NH-206)",
    description:
      "Heavy rainfall detected near Shillong–Cherrapunji Road. Avoid Route NH-206 due to active boulder displacement and 88% soil pore saturation.",
    severity: "critical",
    time: "Updated 4 min ago",
    rainfall: "128 mm / 12h",
    impactRoads: ["NH-206 (KM 14-22)", "Umiew River Link"],
    recommendedAction: "Divert via Mawphlang Sacred Forest Bypass (SH-5). Do not enter gorge section.",
  },
  {
    id: "alert-2",
    title: "SOIL SATURATION WARNING",
    location: "Mawphlang Sacred Grove Valley",
    description:
      "Subsoil saturation has reached 86%. Minor mudflow reported across unpaved local village bypass by Sentinel Responder #310.",
    severity: "high",
    time: "Updated 18 min ago",
    rainfall: "74 mm / 24h",
    impactRoads: ["SH-5 Feeder Road", "Mawphlang Village Approach"],
    recommendedAction: "Drive with extreme caution. Watch for tree lean and fresh mud springs.",
  },
  {
    id: "alert-3",
    title: "MICRO-TREMOR DETECTED",
    location: "East Khasi Hills Fault Line",
    description:
      "Seismic sensor cluster registered a 2.8 magnitude micro-tremor. Structural slope sensors recalibrating in Lumshnong sector.",
    severity: "moderate",
    time: "Updated 1h ago",
    rainfall: "45 mm / 24h",
    impactRoads: ["Lumshnong Access Lane"],
    recommendedAction: "Monitor local slope telemetry. Report new rock crevices via app.",
  },
];

export const evacuationShelters: EvacuationShelter[] = [
  {
    id: "sh-1",
    name: "Mawphlang Community Relief Hall",
    location: "Mawphlang Upper Ridge, SH-5",
    distance: "3.2 km",
    capacity: "240 / 300 spaces available",
    status: "Open",
    contact: "+91 364 223 9011",
  },
  {
    id: "sh-2",
    name: "Shillong Civil Defense Shelter A",
    location: "Laban Sports Complex, Shillong",
    distance: "7.8 km",
    capacity: "520 / 600 spaces available",
    status: "Open",
    contact: "+91 364 222 5555",
  },
  {
    id: "sh-3",
    name: "Cherrapunji Sub-Divisional Camp",
    location: "Sohra Government College Ground",
    distance: "14.5 km",
    capacity: "180 / 250 spaces available",
    status: "Open",
    contact: "+91 363 723 4402",
  },
];

export const roadConditions: RoadStatusItem[] = [
  {
    id: "road-1",
    roadName: "NH-206",
    section: "KM 18 (Umiew Gorge)",
    status: "Closed",
    reason: "250m³ Rockfall & Debris across both lanes",
    clearingEta: "Est. 6 hours (PWD earthmovers active)",
  },
  {
    id: "road-2",
    roadName: "SH-5 (Mawphlang Route)",
    section: "Mawphlang to Sohra Link",
    status: "Clear",
    reason: "Slope integrity verified 98% stable by IoT array",
    clearingEta: "Normal transit (Recommended Detour)",
  },
  {
    id: "road-3",
    roadName: "Lumshnong Feeder Track",
    section: "Sector 4 Junction",
    status: "Partially Blocked",
    reason: "Shoulder erosion, single-lane alternating flow",
    clearingEta: "Caution required",
  },
];
