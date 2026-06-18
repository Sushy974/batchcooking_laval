"use client";

import { useEffect } from "react";
import {
  Circle,
  CircleMarker,
  MapContainer,
  Popup,
  TileLayer,
  Tooltip,
  useMap,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";

import type { CommuneGeo } from "@/lib/communes-geo";

// Couleur primaire de la marque (cf. globals.css --color-primary).
const PRIMARY = "#e65f2b";

/** Recentre la carte (animation fluide) quand la commune sélectionnée change. */
function Recentrer({ centre, zoom }: { centre: [number, number]; zoom: number }) {
  const carte = useMap();
  useEffect(() => {
    carte.flyTo(centre, zoom, { duration: 0.8 });
  }, [carte, centre, zoom]);
  return null;
}

export interface ZoneCarteMapProps {
  communes: CommuneGeo[];
  selection: CommuneGeo;
  rayonKm: number;
  onSelect: (commune: CommuneGeo) => void;
}

export default function ZoneCarteMap({
  communes,
  selection,
  rayonKm,
  onSelect,
}: ZoneCarteMapProps) {
  const centre: [number, number] = [selection.lat, selection.lng];

  return (
    <MapContainer
      center={centre}
      zoom={11}
      scrollWheelZoom={false}
      className="h-full w-full"
      style={{ background: "#f7ede2" }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {/* Cercle du rayon d'intervention, centré sur la commune sélectionnée. */}
      <Circle
        center={centre}
        radius={rayonKm * 1000}
        pathOptions={{
          color: PRIMARY,
          fillColor: PRIMARY,
          fillOpacity: 0.12,
          weight: 2,
        }}
      />

      {communes.map((commune) => {
        const active = commune.nom === selection.nom;
        return (
          <CircleMarker
            key={commune.nom}
            center={[commune.lat, commune.lng]}
            radius={active ? 10 : 7}
            pathOptions={{
              color: "#ffffff",
              weight: 2,
              fillColor: PRIMARY,
              fillOpacity: active ? 1 : 0.65,
            }}
            eventHandlers={{ click: () => onSelect(commune) }}
          >
            <Tooltip direction="top" offset={[0, -8]}>
              {commune.nom}
            </Tooltip>
            <Popup>{commune.nom}</Popup>
          </CircleMarker>
        );
      })}

      <Recentrer centre={centre} zoom={11} />
    </MapContainer>
  );
}
