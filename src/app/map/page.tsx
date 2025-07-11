"use client";
import FeatureFlags from "../FeatureFlags";
import mapboxgl from "mapbox-gl";

import "mapbox-gl/dist/mapbox-gl.css";
import { useEffect, useRef, useState } from "react";
import { MAPBOX_ACCESS_TOKEN } from "../config";
import brightonGeoJSON from "./brighton.json" assert { type: "json" };
// https://maps.monroecounty.gov/server/rest/services/Base_Map/Monroe_Basemap_911/MapServer/148/query?where=NAME=%27Brighton%27&outFields=*&returnGeometry=true&f=geojson
import type { FeatureCollection } from "geojson";

const INITIAL_CENTER: [number, number] = [-77.5734, 43.1223];
const INITIAL_ZOOM = 13;

export default function MapPage() {
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const [center] = useState<[number, number]>(INITIAL_CENTER);
  const [zoom] = useState(INITIAL_ZOOM);

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
        // Add GeoJSON source and layer for Brighton
        if (mapRef.current && brightonGeoJSON) {
          mapRef.current.addSource("brighton", {
            type: "geojson",
            data: brightonGeoJSON as FeatureCollection,
          });
          mapRef.current.addLayer({
            id: "brighton-fill",
            type: "fill",
            source: "brighton",
            paint: {
              "fill-color": "#088",
              "fill-opacity": 0.4,
            },
          });
          mapRef.current.addLayer({
            id: "brighton-outline",
            type: "line",
            source: "brighton",
            paint: {
              "line-color": "#000",
              "line-width": 2,
            },
          });
        }
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
