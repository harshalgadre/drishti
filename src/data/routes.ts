export interface RouteComparison {
  id: string;
  name: string;
  routeTitle: string;
  isSafe: boolean;
  statusText: string;
  statusDescription: string;
  distanceDelta: string;
  eta: string;
  badge: "SAFE" | "UNSAFE";
}

export const routesComparisonData: RouteComparison[] = [
  {
    id: "route-a",
    name: "Route A",
    routeTitle: "Route A – Via NH-206",
    isSafe: false,
    statusText: "UNSAFE",
    statusDescription: "Landslide detected · Currently blocked",
    distanceDelta: "+14 km",
    eta: "ETA: 1h 45m",
    badge: "UNSAFE",
  },
  {
    id: "route-b",
    name: "Route B",
    routeTitle: "Route B – Mawphlang Route",
    isSafe: true,
    statusText: "SAFE",
    statusDescription: "Alternative route certified clear",
    distanceDelta: "+18 min",
    eta: "ETA: 2h 03m",
    badge: "SAFE",
  },
];
