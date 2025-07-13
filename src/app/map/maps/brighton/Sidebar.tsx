import React from "react";
import type { Feature } from "geojson";

const BrightonSidebar: React.FC<{ selectedZone?: Feature }> = ({
  selectedZone,
}) => (
  <div>
    <h3 className="text-lg font-semibold mb-2">Town of Brighton</h3>
    <p>
      Brighton, NY is a vibrant suburban town located just southeast of
      Rochester in Monroe County. Known for its tree-lined neighborhoods, strong
      public schools, and diverse community, Brighton blends small-town charm
      with urban convenience. The town features beautiful parks, easy access to
      the Erie Canal trail system, and a variety of local shops, restaurants,
      and cultural offerings. Home to portions of the University of Rochester
      and close to major medical centers, Brighton attracts families,
      professionals, and students alike. Its commitment to sustainability,
      historic preservation, and community engagement make it one of the most
      desirable places to live in the Rochester area.
    </p>
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

export default BrightonSidebar;
