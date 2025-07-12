"use client";
import FeatureFlags from "../FeatureFlags";
import { useEffect, useState } from "react";
import { MAPS } from "./mapConfigs";
import MapSelector from "./MapSelector";
import MapDisplay from "./MapDisplay";
import type { MapMeta } from "./mapConfigs";
import { notFound, useParams } from "next/navigation";
import { useSwipeable } from "react-swipeable";

interface MapPageContentProps {
  initialMapId: string;
}

export default function MapPageContent({ initialMapId }: MapPageContentProps) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const params = useParams();
  const mapId = params?.mapId as string | undefined;
  const selectedMapId = mapId || initialMapId;
  const [chevronAnimate, setChevronAnimate] = useState(true);

  useEffect(() => {
    if (!sidebarOpen) {
      setChevronAnimate(true);
      const timeout = setTimeout(() => setChevronAnimate(false), 5000);
      return () => clearTimeout(timeout);
    }
  }, [sidebarOpen]);

  if (!FeatureFlags.map) {
    notFound();
  }

  const selectedMap: MapMeta | undefined = MAPS.find(
    (m: MapMeta) => m.id === selectedMapId
  );
  const SidebarComponent = selectedMap?.Sidebar;

  const swipeHandlers = useSwipeable({
    onSwipedDown: () => {
      setSidebarOpen(false);
    },
    delta: 50, // minimum distance(px) before a swipe is detected
    trackTouch: true,
    trackMouse: true,
    preventScrollOnSwipe: true,
  });

  return (
    <div className="relative w-full h-screen flex">
      {/* Sidebar: Desktop (left), Mobile (bottom tray) */}
      {SidebarComponent && (
        <>
          {/* Desktop/Tablet Sidebar */}
          <aside
            className={`hidden md:flex flex-col fixed top-0 left-0 h-full bg-[var(--background)] text-[var(--foreground)] shadow-lg z-30 p-6 border-r border-[var(--foreground)]/10 transition-transform duration-300 ease-in-out w-80 max-w-full
            ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}`}
            style={{ willChange: "transform" }}
          >
            <SidebarComponent />
          </aside>
          {/* Mobile Sidebar Tray */}
          <aside
            {...swipeHandlers}
            className={`md:hidden fixed left-0 bottom-0 w-full bg-[var(--background)] text-[var(--foreground)] shadow-2xl z-40 p-6 border-t border-[var(--foreground)]/10 transition-transform duration-300 ease-in-out
            ${sidebarOpen ? "translate-y-0" : "translate-y-full"}`}
            style={{
              willChange: "transform",
              minHeight: "40vh",
              maxHeight: "80vh",
              borderTopLeftRadius: "1rem",
              borderTopRightRadius: "1rem",
            }}
          >
            <div className="flex justify-between items-center mb-4">
              <span className="font-bold text-lg">Info</span>
              <button
                className="text-2xl px-2 py-1 rounded hover:bg-[var(--foreground)]/10"
                onClick={() => setSidebarOpen(false)}
                aria-label="Close info tray"
                type="button"
              >
                &times;
              </button>
            </div>
            <SidebarComponent />
          </aside>
        </>
      )}
      {/* Mobile: Floating open tray button */}
      <button
        className={`md:hidden fixed bottom-4 left-1/2 -translate-x-1/2 z-50 flex items-center justify-center w-10 h-10 rounded-full bg-[var(--background)] text-[var(--foreground)] shadow-lg border border-[var(--foreground)]/10 font-semibold ${
          sidebarOpen ? "hidden" : ""
        }`}
        style={{ willChange: "transform" }}
        onClick={() => setSidebarOpen(true)}
        aria-label="Show info tray"
        type="button"
      >
        {/* Animated up chevron icon */}
        <svg
          className={`w-6 h-6${chevronAnimate ? " animate-bounce-up" : ""}`}
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9 12l3-3 3 3"
          />
        </svg>
      </button>
      {/* Floating toggle button and map selector (desktop/tablet) */}
      <div className="flex fixed top-4 left-4 z-40 flex-row items-start gap-2">
        <button
          className={`hidden md:flex items-center justify-center w-10 h-10 rounded-full bg-[var(--background)] text-[var(--foreground)] shadow-lg border border-[var(--foreground)]/10 transition-transform duration-300 ease-in-out
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
      {selectedMap && <MapDisplay mapData={selectedMap?.data} />}
    </div>
  );
}
