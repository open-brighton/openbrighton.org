import React, { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import { MAPBOX_ACCESS_TOKEN } from "../config";

interface MapDisplayProps {
  mapData: any; // GeoJSON FeatureCollection
}

const INITIAL_CENTER: [number, number] = [-77.5734, 43.1223];
const INITIAL_ZOOM = 13;

const MapDisplay: React.FC<MapDisplayProps> = ({ mapData }) => {
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const mapContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    mapboxgl.accessToken = MAPBOX_ACCESS_TOKEN;
    if (mapContainerRef.current) {
      mapRef.current = new mapboxgl.Map({
        container: mapContainerRef.current,
        pitch: 45,
      });

      mapRef.current.on("load", () => {
        mapRef.current?.flyTo({
          center: INITIAL_CENTER,
          zoom: INITIAL_ZOOM,
          essential: true,
        });
        // Add GeoJSON source and layer
        if (mapRef.current && mapData) {
          mapRef.current.addSource("brighton", {
            type: "geojson",
            data: mapData,
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
  }, [mapData]);

  return <div ref={mapContainerRef} className="flex-1 h-full" />;
};

export default MapDisplay;
