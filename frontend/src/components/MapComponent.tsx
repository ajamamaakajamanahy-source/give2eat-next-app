"use client";

import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Fix for default marker icons in Leaflet with Next.js
const icon = L.icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

type Listing = {
  id: string;
  food_name: string;
  location: string;
  quantity: number;
  status: string;
  coords?: [number, number]; // [lat, lng]
};

// Help map adjust view when coordinates change
function ChangeView({ center }: { center: [number, number] }) {
  const map = useMap();
  useEffect(() => {
    map.setView(center, map.getZoom());
  }, [center, map]);
  return null;
}

export default function MapComponent({ listings, activeId }: { listings: Listing[], activeId?: string }) {
  const [center, setCenter] = useState<[number, number]>([10.0152, 76.3419]); // Default Kochi
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    setIsSearching(true);
    try {
      const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(searchQuery)}`);
      const data = await response.json();
      if (data && data.length > 0) {
        const { lat, lon } = data[0];
        setCenter([parseFloat(lat), parseFloat(lon)]);
      }
    } catch (err) {
      console.error("Geocoding error:", err);
    }
    setIsSearching(false);
  };

  // Mock coordinates for demo listings if they don't have real ones
  const listingsWithCoords = listings.map((l, i) => ({
    ...l,
    coords: l.coords || [10.0152 + (i * 0.01), 76.3419 + (i * 0.01)] as [number, number]
  }));

  return (
    <div className="h-full w-full rounded-[2.5rem] overflow-hidden border border-white/10 shadow-2xl relative z-0">
      {/* Search Overlay */}
      <div className="absolute top-4 left-4 right-4 z-[1000] flex justify-center pointer-events-none">
        <form 
          onSubmit={handleSearch}
          className="w-full max-w-sm flex gap-1 bg-black/40 backdrop-blur-xl border border-white/10 p-1.5 rounded-full pointer-events-auto shadow-2xl"
        >
          <input 
            type="text" 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search city or area..." 
            className="flex-1 bg-transparent border-none focus:ring-0 text-xs text-white placeholder-white/40 px-4 outline-none"
          />
          <button 
            type="submit"
            disabled={isSearching}
            className="bg-emerald-500 text-black p-2 rounded-full hover:bg-emerald-400 transition-colors disabled:opacity-50"
          >
            {isSearching ? (
               <div className="h-4 w-4 border-2 border-black/20 border-t-black animate-spin rounded-full" />
            ) : (
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
            )}
          </button>
        </form>
      </div>

      <MapContainer 
        center={center} 
        zoom={12} 
        scrollWheelZoom={true}
        className="h-full w-full"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
        />
        <ChangeView center={center} />
        
        {listingsWithCoords.map((listing) => (
          <Marker 
            key={listing.id} 
            position={listing.coords} 
            icon={icon}
            eventHandlers={{
              click: () => setCenter(listing.coords)
            }}
          >
            <Popup className="custom-popup">
              <div className="p-2 space-y-1">
                <h3 className="font-bold text-sm text-black">{listing.food_name}</h3>
                <p className="text-xs text-zinc-600 truncate">{listing.location}</p>
                <div className="flex items-center justify-between pt-1">
                   <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">Qty: {listing.quantity}</span>
                   <a href={`#${listing.id}`} className="text-[10px] font-bold text-sky-600 hover:underline">View Details</a>
                </div>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
      
      {/* Legend / Overlay UI */}
      <div className="absolute bottom-4 left-4 z-[1000] bg-black/60 backdrop-blur-md border border-white/10 p-4 rounded-2xl pointer-events-none transition-opacity">
        <p className="text-[10px] font-bold text-white/40 uppercase tracking-widest mb-1.5 leading-none">Global Nodes</p>
        <div className="flex items-center gap-2">
          <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.8)]" />
          <p className="text-xs font-semibold">{listings.length} nodes active</p>
        </div>
      </div>
    </div>
  );
}
