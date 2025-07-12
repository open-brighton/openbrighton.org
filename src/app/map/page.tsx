"use client";
import FeatureFlags from "../FeatureFlags";
import mapboxgl from "mapbox-gl";

import "mapbox-gl/dist/mapbox-gl.css";
import { useEffect, useRef, useState } from "react";
import { MAPBOX_ACCESS_TOKEN } from "../config";
import brightonGeoJSON from "./brighton.json" assert { type: "json" };
import debris from "./debris.json";
// https://maps.monroecounty.gov/server/rest/services/Base_Map/Monroe_Basemap_911/MapServer/148/query?where=NAME=%27Brighton%27&outFields=*&returnGeometry=true&f=geojson
import type { FeatureCollection } from "geojson";

const INITIAL_CENTER: [number, number] = [-77.5734, 43.1223];
const INITIAL_ZOOM = 13;

export default function MapPage() {
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const [center] = useState<[number, number]>(INITIAL_CENTER);
  const [zoom] = useState(INITIAL_ZOOM);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [selectorOpen, setSelectorOpen] = useState(false);
  const [selectedMap, setSelectedMap] = useState<"brighton" | "debris">(
    "debris"
  );

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
        // Add GeoJSON source and layer for Brighton or Debris
        if (mapRef.current) {
          mapRef.current.addSource("brighton", {
            type: "geojson",
            data:
              selectedMap === "debris"
                ? (debris as FeatureCollection)
                : (brightonGeoJSON as FeatureCollection),
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
  }, [selectedMap]);

  if (!FeatureFlags.map) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl font-bold">Map is currently disabled.</div>
      </div>
    );
  }

  return (
    <div className="relative w-full h-screen flex">
      {/* Sidebar (toggleable, slides in/out, only on md+) */}
      <aside
        className={`hidden md:flex flex-col fixed top-0 left-0 h-full bg-[var(--background)] text-[var(--foreground)] shadow-lg z-30 p-6 border-r border-[var(--foreground)]/10 transition-transform duration-300 ease-in-out w-80 max-w-full
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}`}
        style={{ willChange: "transform" }}
      >
        <h2 className="text-2xl font-bold mb-4">Map Sidebar</h2>
        <div className="text-base opacity-80">
          Sidebar content goes here. You can display information about the map,
          selected features, legends, etc.
        </div>
      </aside>
      {/* Floating toggle button and map selector */}
      <div className="hidden md:flex fixed top-6 left-4 z-40 flex-row items-start gap-2">
        <button
          className={`items-center justify-center w-10 h-10 rounded-full bg-[var(--background)] text-[var(--foreground)] shadow-lg border border-[var(--foreground)]/10 transition-transform duration-300 ease-in-out
          ${sidebarOpen ? "translate-x-80" : "translate-x-0"}`}
          style={{ willChange: "transform" }}
          onClick={() => setSidebarOpen((open) => !open)}
          aria-label={sidebarOpen ? "Hide sidebar" : "Show sidebar"}
          type="button"
        >
          {/* Icon: chevron left/right */}
          <svg
            className={`w-6 h-6 transition-transform duration-300 ${
              sidebarOpen ? "" : "rotate-180"
            }`}
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>
        {/* Map Selector Accordion */}
        <div
          className={`relative transition-transform duration-300 ${
            sidebarOpen ? "translate-x-80" : "translate-x-0"
          }`}
          style={{ willChange: "transform" }}
        >
          <button
            className="flex items-center gap-2 px-4 h-10 rounded bg-[var(--background)] text-[var(--foreground)] shadow-lg border border-[var(--foreground)]/10 font-semibold"
            onClick={() => setSelectorOpen((open) => !open)}
            aria-expanded={selectorOpen}
            aria-controls="map-selector-list"
            type="button"
          >
            {selectedMap === "debris" ? "Debris Map" : "Brighton Map"}
            <svg
              className={`w-4 h-4 transition-transform ${
                selectorOpen ? "rotate-180" : ""
              }`}
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>
          {selectorOpen && (
            <ul
              id="map-selector-list"
              className="absolute left-0 mt-2 w-40 bg-[var(--background)] text-[var(--foreground)] shadow-lg rounded border border-[var(--foreground)]/10 z-50"
            >
              <li>
                <button
                  className={`w-full text-left px-4 py-2 hover:bg-[var(--foreground)]/10 rounded ${
                    selectedMap === "brighton" ? "font-bold" : ""
                  }`}
                  onClick={() => {
                    setSelectedMap("brighton");
                    setSelectorOpen(false);
                  }}
                >
                  Brighton Map
                </button>
              </li>
              <li>
                <button
                  className={`w-full text-left px-4 py-2 hover:bg-[var(--foreground)]/10 rounded ${
                    selectedMap === "debris" ? "font-bold" : ""
                  }`}
                  onClick={() => {
                    setSelectedMap("debris");
                    setSelectorOpen(false);
                  }}
                >
                  Debris Map
                </button>
              </li>
            </ul>
          )}
        </div>
      </div>
      {/* Map container (full width, but sidebar overlays on md+) */}
      <div ref={mapContainerRef} className="flex-1 h-full" />
    </div>
  );
}
