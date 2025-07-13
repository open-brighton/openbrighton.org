import React, { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import { MAPBOX_ACCESS_TOKEN } from "../config";
import type { FeatureCollection, Feature, Polygon } from "geojson";
import "mapbox-gl/dist/mapbox-gl.css";

interface MapDisplayProps {
  mapData: FeatureCollection;
  selectedZoneId?: number | string | null;
  onZoneSelect?: (feature: Feature) => void;
}

const INITIAL_CENTER: [number, number] = [-77.5734, 43.1223];
const INITIAL_ZOOM = 13;

function getPolygonCentroid(coordinates: number[][][]): [number, number] {
  const coords = coordinates[0];
  if (!coords || coords.length === 0) return [0, 0];
  let area = 0,
    x = 0,
    y = 0;
  for (let i = 0, len = coords.length, j = len - 1; i < len; j = i++) {
    const [x0, y0] = coords[j];
    const [x1, y1] = coords[i];
    const f = x0 * y1 - x1 * y0;
    area += f;
    x += (x0 + x1) * f;
    y += (y0 + y1) * f;
  }
  area *= 0.5;
  if (area === 0) return coords[0] as [number, number];
  x /= 6 * area;
  y /= 6 * area;
  return [x, y];
}

const MapDisplay: React.FC<MapDisplayProps> = ({
  mapData,
  selectedZoneId,
  onZoneSelect,
}) => {
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const prevSelectedZoneId = useRef<string | number | null | undefined>(null);
  const markersRef = useRef<mapboxgl.Marker[]>([]);

  // Prepare centroids for custom markers
  const centroids = (mapData.features as Feature<Polygon>[]).map((feature) => {
    const coords = feature.geometry.coordinates;
    const centroid = getPolygonCentroid(coords);
    return {
      id:
        feature.id ?? feature.properties?.OBJECTID ?? feature.properties?.Area,
      label:
        feature.properties?.Area || feature.properties?.OBJECTID || feature.id,
      coordinates: centroid,
    };
  });

  // Only create the map once
  useEffect(() => {
    mapboxgl.accessToken = MAPBOX_ACCESS_TOKEN;
    if (mapContainerRef.current) {
      mapRef.current = new mapboxgl.Map({
        container: mapContainerRef.current,
        pitch: 45,
      });

      mapRef.current.on("load", () => {
        // Initial fly in
        mapRef.current?.flyTo({
          center: INITIAL_CENTER,
          zoom: INITIAL_ZOOM,
          essential: true,
        });
        mapRef.current?.addSource("brighton", {
          type: "geojson",
          data: mapData,
        });
        mapRef.current?.addLayer({
          id: "brighton-fill",
          type: "fill",
          source: "brighton",
          paint: {
            "fill-color": [
              "case",
              ["boolean", ["feature-state", "selected"], false],
              "#f59e42",
              "#088",
            ],
            "fill-opacity": 0.4,
          },
        });
        mapRef.current?.addLayer({
          id: "brighton-outline",
          type: "line",
          source: "brighton",
          paint: {
            "line-color": "#000",
            "line-width": 2,
          },
        });

        // Click handler for polygons
        if (mapRef.current) {
          mapRef.current.on("click", "brighton-fill", (e) => {
            const map = mapRef.current;
            const feature = e.features?.[0];
            if (feature && onZoneSelect) {
              onZoneSelect(feature);
              // Fly to the selected feature
              const polygon = feature.geometry;
              if (polygon.type === "Polygon" && map) {
                const bounds = polygon.coordinates[0].reduce(
                  (b, coord) => b.extend(coord as [number, number]),
                  new mapboxgl.LngLatBounds(
                    polygon.coordinates[0][0] as [number, number],
                    polygon.coordinates[0][0] as [number, number]
                  )
                );
                map.fitBounds(bounds, { padding: 60, maxZoom: 16 });
              }
            }
          });
          mapRef.current.on("mouseenter", "brighton-fill", () => {
            mapRef.current?.getCanvas().style.setProperty("cursor", "pointer");
          });
          mapRef.current.on("mouseleave", "brighton-fill", () => {
            mapRef.current?.getCanvas().style.setProperty("cursor", "");
          });
        }
      });
    }
    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
      }
      // Remove all markers
      markersRef.current.forEach((marker) => marker.remove());
      markersRef.current = [];
    };
    // Only run on mount/unmount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mapData]);

  // Add custom centroid markers after map is loaded and when centroids change
  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;
    // Remove old markers
    markersRef.current.forEach((marker) => marker.remove());
    markersRef.current = [];
    // Add new markers
    centroids.forEach((centroid) => {
      const el = document.createElement("div");
      el.className = "zone-centroid-label";
      el.style.display = "flex";
      el.style.alignItems = "center";
      el.style.justifyContent = "center";
      el.style.width = "36px";
      el.style.height = "36px";
      el.style.borderRadius = "50%";
      el.style.background = "#2563eb"; // Tailwind blue-600
      el.style.color = "#fff";
      el.style.fontWeight = "bold";
      el.style.fontSize = "18px";
      el.style.boxShadow = "0 2px 8px rgba(0,0,0,0.15)";
      el.style.border = "2px solid #fff";
      el.innerText = centroid.label;
      markersRef.current.push(
        new mapboxgl.Marker({ element: el, anchor: "center" })
          .setLngLat(centroid.coordinates)
          .addTo(map)
      );
    });
    // Clean up on unmount or centroids change
    return () => {
      markersRef.current.forEach((marker) => marker.remove());
      markersRef.current = [];
    };
  }, [centroids]);

  // Update feature state for fill color when selectedZoneId changes
  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;
    // Remove previous selection
    if (prevSelectedZoneId.current != null) {
      map.setFeatureState(
        { source: "brighton", id: prevSelectedZoneId.current },
        { selected: false }
      );
    }
    // Set new selection
    if (selectedZoneId != null) {
      map.setFeatureState(
        { source: "brighton", id: selectedZoneId },
        { selected: true }
      );
    }
    prevSelectedZoneId.current = selectedZoneId;
  }, [selectedZoneId]);

  return <div ref={mapContainerRef} className="flex-1 h-full" />;
};

export default MapDisplay;
