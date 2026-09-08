export interface MapLayerItem {
  id: string;
  name: string;
  type: string;
  enabled: boolean;
}

export interface MapMarker {
  id: string;
  type: "risk" | "rain" | "hospital" | "village" | "road" | "quake" | "soil";
  symbol: string;
  left: number; // percentage
  top: number; // percentage
  title: string;
  description: string;
  severity?: "critical" | "high" | "moderate" | "safe";
}

export const initialMapLayers: MapLayerItem[] = [
  { id: "risk", name: "Landslide Risk", type: "risk", enabled: true },
  { id: "rain", name: "Rainfall", type: "rain", enabled: true },
  { id: "soil", name: "Soil Erosion", type: "soil", enabled: true },
  { id: "geology", name: "Geology / Fault Lines", type: "geology", enabled: true },
  { id: "ground", name: "Ground Movement", type: "ground", enabled: true },
  { id: "quake", name: "Earthquake", type: "quake", enabled: true },
  { id: "road", name: "Roads & Closures", type: "road", enabled: true },
  { id: "river", name: "Rivers & Water Flow", type: "river", enabled: true },
  { id: "village", name: "Villages & Towns", type: "village", enabled: true },
  { id: "hospital", name: "Hospitals", type: "hospital", enabled: true },
  { id: "history", name: "Historical Events", type: "history", enabled: true },
  { id: "satellite", name: "Satellite Imagery", type: "satellite", enabled: true },
];

export const mapMarkers: MapMarker[] = [
  {
    id: "m1",
    type: "risk",
    symbol: "!",
    left: 22,
    top: 43,
    title: "Zone MH-204: High Landslide Risk",
    description: "Slope angle 54°, moisture saturation 88%. Immediate evacuation advisory.",
    severity: "critical",
  },
  {
    id: "m2",
    type: "risk",
    symbol: "!",
    left: 58,
    top: 36,
    title: "Landslide Warning Sector B",
    description: "Creep motion of 4.2mm detected in last 6 hours.",
    severity: "high",
  },
  {
    id: "m3",
    type: "risk",
    symbol: "!",
    left: 72,
    top: 61,
    title: "Critical Slope Failure (Lumshnong)",
    description: "Limestone bedrock fracturing with active rubble movement.",
    severity: "critical",
  },
  {
    id: "m4",
    type: "risk",
    symbol: "!",
    left: 42,
    top: 77,
    title: "Landslide Debris Track",
    description: "Mud and rock displacement over lower culvert.",
    severity: "high",
  },
  {
    id: "m5",
    type: "rain",
    symbol: "☂",
    left: 30,
    top: 28,
    title: "Heavy Rainfall Station (Sohra-West)",
    description: "Precipitation: 72 mm in 24h. Intensity: 18mm/hr.",
    severity: "moderate",
  },
  {
    id: "m6",
    type: "rain",
    symbol: "☂",
    left: 67,
    top: 24,
    title: "Cherrapunji Meteorological Sensor",
    description: "Precipitation: 114 mm. Sensor health: 100% active.",
    severity: "moderate",
  },
  {
    id: "m7",
    type: "hospital",
    symbol: "H",
    left: 52,
    top: 49,
    title: "Shillong Civil Hospital",
    description: "Emergency trauma ward active, 24/7 ambulance readiness.",
    severity: "safe",
  },
  {
    id: "m8",
    type: "hospital",
    symbol: "H",
    left: 29,
    top: 64,
    title: "Mawphlang Emergency Clinic",
    description: "Primary triage center and first-aid shelter.",
    severity: "safe",
  },
  {
    id: "m9",
    type: "village",
    symbol: "⌂",
    left: 19,
    top: 39,
    title: "Mawphlang Village",
    description: "Elevation 1,820m. Community emergency shelter open at Community Hall.",
    severity: "safe",
  },
  {
    id: "m10",
    type: "village",
    symbol: "⌂",
    left: 63,
    top: 84,
    title: "Lumshnong Village",
    description: "Safe staging ground for relief transport convoy.",
    severity: "safe",
  },
  {
    id: "m11",
    type: "road",
    symbol: "×",
    left: 53,
    top: 55,
    title: "NH-206 Road Closure",
    description: "Carriageway blocked by 250m³ rockfall. Clear time est: 6 hours.",
    severity: "critical",
  },
  {
    id: "m12",
    type: "road",
    symbol: "×",
    left: 39,
    top: 50,
    title: "Secondary Bypass Partial Restriction",
    description: "Single-lane alternating traffic due to roadside trench erosion.",
    severity: "moderate",
  },
  {
    id: "m13",
    type: "quake",
    symbol: "◉",
    left: 48,
    top: 69,
    title: "Historical Micro-Tremor Epicenter",
    description: "M2.8 event recorded on 03 Sep. Minor subterranean fault shifting.",
    severity: "moderate",
  },
  {
    id: "m14",
    type: "soil",
    symbol: "!",
    left: 26,
    top: 73,
    title: "Soil Erosion Warning Zone",
    description: "Severe topsoil wash off on unpaved agricultural terrace.",
    severity: "moderate",
  },
];
