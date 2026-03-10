import React, { useState, useEffect } from 'react';
import { GoogleMap, useJsApiLoader, Marker, InfoWindow } from '@react-google-maps/api';
import { Loader2 } from 'lucide-react';

const containerStyle = {
  width: '100%',
  height: '100%',
  borderRadius: '1rem',
};

const center = {
  lat: 40.7128,
  lng: -74.0060,
};

const Map = ({ markers, onMarkerClick }) => {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.VITE_GOOGLE_MAPS_API_KEY || '',
  });

  const [map, setMap] = React.useState(null);
  const [selectedMarker, setSelectedMarker] = useState(null);

  const onLoad = React.useCallback(function callback(map) {
    const bounds = new window.google.maps.LatLngBounds(center);
    map.fitBounds(bounds);
    setMap(map);
  }, []);

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null);
  }, []);

  if (!isLoaded) {
    return (
      <div className="flex items-center justify-center h-full w-full bg-muted rounded-xl">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <span className="ml-2 text-muted-foreground">Loading Map...</span>
      </div>
    );
  }

  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={12}
      onLoad={onLoad}
      onUnmount={onUnmount}
      options={{
        disableDefaultUI: true,
        zoomControl: true,
        styles: [
          {
            featureType: "poi",
            elementType: "labels",
            stylers: [{ visibility: "off" }],
          },
        ],
      }}
    >
      {markers && markers.map((marker) => (
        <Marker
          key={marker.id}
          position={marker.position}
          onClick={() => {
            setSelectedMarker(marker);
            onMarkerClick && onMarkerClick(marker);
          }}
        />
      ))}

      {selectedMarker && (
        <InfoWindow
          position={selectedMarker.position}
          onCloseClick={() => setSelectedMarker(null)}
        >
          <div className="p-2">
            <h3 className="font-serif font-bold">{selectedMarker.title}</h3>
            <p className="text-sm text-muted-foreground">{selectedMarker.description}</p>
          </div>
        </InfoWindow>
      )}
    </GoogleMap>
  );
};

export default React.memo(Map);
