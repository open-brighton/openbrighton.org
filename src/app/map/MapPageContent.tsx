"use client";
import FeatureFlags from "../FeatureFlags";
import { useState } from "react";
import { MAPS } from "./mapConfigs";
import MapSelector from "./MapSelector";
import MapDisplay from "./MapDisplay";
import type { MapMeta } from "./mapConfigs";
import { notFound, useParams } from "next/navigation";

interface MapPageContentProps {
  initialMapId: string;
}

export default function MapPageContent({ initialMapId }: MapPageContentProps) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const params = useParams();
  const mapId = params?.mapId as string | undefined;
  const selectedMapId = mapId || initialMapId;

  if (!FeatureFlags.map) {
    notFound();
  }

  const selectedMap: MapMeta | undefined = MAPS.find(
    (m: MapMeta) => m.id === selectedMapId
  );
  const SidebarComponent = selectedMap?.Sidebar;

  return (
    <div className="relative w-full h-screen flex">
      {/* Sidebar (toggleable, slides in/out, only on md+) */}
      <aside
        className={`hidden md:flex flex-col fixed top-0 left-0 h-full bg-[var(--background)] text-[var(--foreground)] shadow-lg z-30 p-6 border-r border-[var(--foreground)]/10 transition-transform duration-300 ease-in-out w-80 max-w-full
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}`}
        style={{ willChange: "transform" }}
      >
        {SidebarComponent ? (
          <SidebarComponent />
        ) : (
          <div className="text-base opacity-80">
            No extra info for this map.
          </div>
        )}
      </aside>
      {/* Floating toggle button and map selector */}
      <div className="hidden md:flex fixed top-6 left-4 z-40 flex-row items-start gap-2">
        <button
          className={`flex items-center justify-center w-10 h-10 rounded-full bg-[var(--background)] text-[var(--foreground)] shadow-lg border border-[var(--foreground)]/10 transition-transform duration-300 ease-in-out
          ${sidebarOpen ? "translate-x-80" : "translate-x-0"}`}
          style={{ willChange: "transform" }}
          onClick={() => setSidebarOpen((open) => !open)}
          aria-label={sidebarOpen ? "Hide sidebar" : "Show sidebar"}
          type="button"
        >
          {/* Icon: chevron left/right */}
          <span className="flex items-center justify-center w-full h-full">
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
          </span>
        </button>
        <MapSelector
          maps={MAPS}
          selectedMapId={selectedMapId}
          sidebarOpen={sidebarOpen}
        />
      </div>
      {/* Map container (full width, but sidebar overlays on md+) */}
      <MapDisplay mapData={selectedMap?.data} />
    </div>
  );
}
