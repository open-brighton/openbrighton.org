import brightonGeoJSON from "./maps/brighton/data.json";
import debrisGeoJSON from "./maps/debris/data.json";
import type { ComponentType } from "react";
import BrightonSidebar from "./maps/brighton/Sidebar";
import DebrisSidebar from "./maps/debris/Sidebar";

export interface MapMeta {
  id: string;
  label: string;
  data: any;
  Sidebar?: ComponentType;
}

export const MAPS: MapMeta[] = [
  { id: "brighton", label: "Brighton Map", data: brightonGeoJSON, Sidebar: BrightonSidebar },
  { id: "debris", label: "Debris Map", data: debrisGeoJSON, Sidebar: DebrisSidebar },
]; 