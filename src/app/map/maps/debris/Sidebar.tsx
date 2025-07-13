import React from "react";
import type { Feature } from "geojson";

const DebrisSidebar: React.FC<{ selectedZone?: Feature }> = ({
  selectedZone,
}) => (
  <div>
    <h2 className="text-lg font-semibold mb-2">
      Leaf and Yard Debris Collection
    </h2>
    <ul className="list-disc ml-4 mb-4">
      <li>Shows debris collection zones</li>
      <li>
        Based on data from{" "}
        <a
          href="https://www.townofbrighton.org/516/Leaf-and-Yard-Debris-Collection"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 underline hover:text-blue-800 transition-colors"
        >
          here
        </a>
      </li>
    </ul>
    {selectedZone && (
      <div className="mt-6 p-4 rounded bg-[var(--background)] text-[var(--foreground)] border border-[var(--foreground)]/10 shadow">
        <h3 className="text-md font-semibold mb-2">Selected Zone</h3>
        <div className="flex flex-col gap-2">
          <div>
            <span className="font-medium">Zone ID:</span>{" "}
            {selectedZone.properties?.OBJECTID}
          </div>
          <div>
            <span className="font-medium">Subarea:</span>{" "}
            {selectedZone.properties?.SUBAREA}
          </div>
          <div>
            <span className="font-medium">Area:</span>{" "}
            {selectedZone.properties?.Area}
          </div>
          <div className="italic text-sm opacity-70">
            (Placeholder for more details)
          </div>
        </div>
      </div>
    )}
  </div>
);

export default DebrisSidebar;
