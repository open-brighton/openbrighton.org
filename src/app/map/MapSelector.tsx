import React, { useState } from "react";

interface MapMeta {
  id: string;
  label: string;
}
interface MapSelectorProps {
  maps: MapMeta[];
  selectedMapId: string;
  onSelect: (id: string) => void;
  sidebarOpen: boolean;
}

const MapSelector: React.FC<MapSelectorProps> = ({
  maps,
  selectedMapId,
  onSelect,
  sidebarOpen,
}) => {
  const [open, setOpen] = useState(false);
  const selectedMap = maps.find((m: MapMeta) => m.id === selectedMapId);

  return (
    <div
      className={`relative transition-transform duration-300 ${
        sidebarOpen ? "translate-x-80" : "translate-x-0"
      }`}
      style={{ willChange: "transform" }}
    >
      <button
        className="flex items-center gap-2 px-4 h-10 rounded bg-[var(--background)] text-[var(--foreground)] shadow-lg border border-[var(--foreground)]/10 font-semibold"
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
          className="absolute left-0 mt-2 w-40 bg-[var(--background)] text-[var(--foreground)] shadow-lg rounded border border-[var(--foreground)]/10 z-50"
        >
          {maps.map((map: MapMeta) => (
            <li key={map.id}>
              <button
                className={`w-full text-left px-4 py-2 hover:bg-[var(--foreground)]/10 rounded ${
                  selectedMapId === map.id ? "font-bold" : ""
                }`}
                onClick={() => {
                  onSelect(map.id);
                  setOpen(false);
                }}
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
