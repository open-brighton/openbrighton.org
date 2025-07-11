"use client";
import FeatureFlags from "../FeatureFlags";
import mapboxgl from "mapbox-gl";

import "mapbox-gl/dist/mapbox-gl.css";
import { useEffect, useRef, useState } from "react";
import { MAPBOX_ACCESS_TOKEN } from "../config";

const INITIAL_CENTER: [number, number] = [-77.5734, 43.1223];
const INITIAL_ZOOM = 13;

export default function MapPage() {
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const [center, setCenter] = useState<[number, number]>(INITIAL_CENTER);
  const [zoom, setZoom] = useState(INITIAL_ZOOM);

  useEffect(() => {
    mapboxgl.accessToken = MAPBOX_ACCESS_TOKEN;
    if (mapContainerRef.current) {
      mapRef.current = new mapboxgl.Map({
        container: mapContainerRef.current,
        pitch: 45,
      });

      mapRef.current.on("load", () => {
        mapRef.current?.flyTo({
          center: center,
          zoom: zoom,
          essential: true,
        });
      });
    }

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
      }
    };
  }, []);

  if (!FeatureFlags.map) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl font-bold">Map is currently disabled.</div>
      </div>
    );
  }

  return <div ref={mapContainerRef} className="w-full h-screen" />;
}
