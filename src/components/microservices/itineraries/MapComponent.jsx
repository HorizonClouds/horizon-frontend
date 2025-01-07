import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from 'lucide-react';

const MapComponent = ({ onLocationSelect, initialLocation }) => {
  const mapRef = useRef(null);
  const markerRef = useRef(null);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    if (!mapRef.current) {
      mapRef.current = L.map('map').setView([initialLocation?.latitude || 0, initialLocation?.longitude || 0], initialLocation ? 13 : 2);

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
      }).addTo(mapRef.current);

      if (initialLocation) {
        markerRef.current = L.marker([initialLocation.latitude, initialLocation.longitude]).addTo(mapRef.current);
        
        // Add a popup with an image to the marker
        const popupContent = `
          <div>
            <img src="https://picsum.photos/200/300" alt="Location image" style="width:100%;max-width:200px;height:auto;">
            <p>${initialLocation.address}</p>
          </div>
        `;
        markerRef.current.bindPopup(popupContent).openPopup();
      }

      mapRef.current.on('click', handleMapClick);
    }

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, [initialLocation]);

  const handleMapClick = async (e) => {
    const { lat, lng } = e.latlng;
    updateMarkerAndNotify(lat, lng);
  };

  const updateMarkerAndNotify = async (lat, lng) => {
    try {
      const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`);
      const data = await response.json();
      const address = data.display_name;

      if (markerRef.current) {
        markerRef.current.setLatLng([lat, lng]);
      } else {
        markerRef.current = L.marker([lat, lng]).addTo(mapRef.current);
      }

      onLocationSelect(lat, lng, address);
    } catch (error) {
      console.error('Error fetching address:', error);
    }
  };

  const handleSearch = async () => {
    try {
      const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(searchQuery)}`);
      const data = await response.json();
      if (data.length > 0) {
        const { lat, lon, display_name } = data[0];
        mapRef.current?.setView([lat, lon], 13);
        updateMarkerAndNotify(parseFloat(lat), parseFloat(lon));
        setSearchQuery(display_name);
      }
    } catch (error) {
      console.error('Error searching for location:', error);
    }
  };

  return (
    <div>
      <div className="flex mb-2">
        <Input
          type="text"
          placeholder="Search for a location"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="flex-grow mr-2"
        />
        <Button onClick={handleSearch}><Search className="w-4 h-4" /></Button>
      </div>
      <div id="map" style={{ height: '300px', width: '100%' }} />
    </div>
  );
};

export default MapComponent;

