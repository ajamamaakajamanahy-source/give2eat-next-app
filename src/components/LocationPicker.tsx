"use client";

import { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const icon = L.icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

function MapEvents({ onLocationSelect }: { onLocationSelect: (lat: number, lng: number) => void }) {
  useMapEvents({
    click(e) {
      onLocationSelect(e.latlng.lat, e.latlng.lng);
    },
  });
  return null;
}

export default function LocationPicker({ onAddressSelect }: { onAddressSelect: (address: string) => void }) {
  const [position, setPosition] = useState<[number, number] | null>(null);
  const [loading, setLoading] = useState(false);

  const handleLocationSelect = async (lat: number, lng: number) => {
    setPosition([lat, lng]);
    setLoading(true);
    try {
      const resp = await fetch(`https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lng}`);
      const data = await resp.json();
      if (data && data.display_name) {
        onAddressSelect(data.display_name);
      }
    } catch (err) {
      console.error("Reverse geocoding error:", err);
    }
    setLoading(false);
  };

  return (
    <div className="h-[300px] w-full rounded-2xl overflow-hidden border border-white/10 relative z-0">
      <MapContainer 
        center={[10.0152, 76.3419]} 
        zoom={12} 
        className="h-full w-full"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
        />
        <MapEvents onLocationSelect={handleLocationSelect} />
        {position && <Marker position={position} icon={icon} />}
      </MapContainer>
      
      {loading && (
        <div className="absolute inset-0 bg-black/40 backdrop-blur-sm z-[1001] flex items-center justify-center">
           <div className="h-8 w-8 border-4 border-emerald-500/20 border-t-emerald-500 animate-spin rounded-full" />
        </div>
      )}
      
      <div className="absolute top-2 right-2 z-[1000] bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10 text-[10px] font-bold text-white/60">
        Click to Place Pin
      </div>
    </div>
  );
}
