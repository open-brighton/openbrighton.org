import React, { useState } from "react";
import { useRouter, usePathname } from "next/navigation";

interface MapMeta {
  id: string;
  label: string;
}
interface MapSelectorProps {
  maps: MapMeta[];
  selectedMapId: string;
  sidebarOpen: boolean;
}

const MapSelector: React.FC<MapSelectorProps> = ({
  maps,
  selectedMapId,
  sidebarOpen,
}) => {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const selectedMap = maps.find((m: MapMeta) => m.id === selectedMapId);

  const handleSelect = (id: string) => {
    if (pathname.startsWith("/map/")) {
      router.replace(`/map/${id}`);
    } else {
      router.push(`/map/${id}`);
    }
    setOpen(false);
  };

  return (
    <div
      className={`relative transition-transform duration-300 ${
        sidebarOpen ? "md:translate-x-80" : "md:translate-x-0"
      }`}
      style={{ willChange: "transform" }}
    >
      <button
        className="flex items-center gap-2 px-4 h-10 rounded bg-[var(--background)] text-[var(--foreground)] shadow-lg border border-[var(--foreground)]/10 font-semibold whitespace-nowrap"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-controls="map-selector-list"
        type="button"
      >
        {selectedMap?.label || "Select Map"}
        <svg
          className={`w-4 h-4 transition-transform ${open ? "rotate-180" : ""}`}
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
      {open && (
        <ul
          id="map-selector-list"
          className="absolute left-0 mt-2 bg-[var(--background)] text-[var(--foreground)] shadow-lg rounded border border-[var(--foreground)]/10 z-50 min-w-full whitespace-nowrap"
        >
          {maps.map((map: MapMeta) => (
            <li key={map.id}>
              <button
                className={`w-full text-left px-4 py-2 hover:bg-[var(--foreground)]/10 rounded whitespace-nowrap ${
                  selectedMapId === map.id ? "font-bold" : ""
                }`}
                onClick={() => handleSelect(map.id)}
              >
                {map.label}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MapSelector;
