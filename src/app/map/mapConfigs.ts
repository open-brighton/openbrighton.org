import type { FeatureCollection, Polygon } from "geojson";
import brightonGeoJSONData from "./maps/brighton/data.json";
import debrisGeoJSONData from "./maps/debris/data.json";
import type { ComponentType } from "react";
import BrightonSidebar from "./maps/brighton/Sidebar";
import DebrisSidebar from "./maps/debris/Sidebar";

const brightonGeoJSON = brightonGeoJSONData as FeatureCollection<Polygon>;
const debrisGeoJSON = debrisGeoJSONData as FeatureCollection<Polygon>;

export interface MapMeta {
  id: string;
  label: string;
  data: FeatureCollection;
  Sidebar?: ComponentType;
}

export const MAPS: MapMeta[] = [
  { id: "brighton", label: "Brighton Map", data: brightonGeoJSON, Sidebar: BrightonSidebar },
  { id: "debris", label: "Leaf and Yard Debris Map", data: debrisGeoJSON, Sidebar: DebrisSidebar },
]; 