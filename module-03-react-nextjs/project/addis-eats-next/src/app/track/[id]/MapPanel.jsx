'use client';

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

const customIcon = L.icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});

export default function MapPanel() {
  const destination = [8.9917, 38.7845];

  return (
    <div className="space-y-4">
      <div className="h-80 w-full rounded-lg overflow-hidden border border-slate-200">
        <MapContainer
          center={destination}
          zoom={14}
          scrollWheelZoom={false}
          className="h-full w-full"
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={destination} icon={customIcon}>
            <Popup>
              <div className="text-center font-sans">
                <p className="font-bold text-slate-900">Delivery Destination</p>
                <p className="text-xs text-slate-600">Bole, Near Atlas Hotel</p>
              </div>
            </Popup>
          </Marker>
        </MapContainer>
      </div>

      <div className="bg-slate-50 border border-slate-200 rounded-lg p-4 space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="font-bold text-slate-900 text-sm">Delivery Location Details</h3>
          <span className="text-xs bg-blue-100 text-blue-700 font-semibold px-2.5 py-0.5 rounded-full">
            Driver en route
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-600">
          <div>
            <p className="font-semibold text-slate-800">Drop-off Address:</p>
            <p>Bole Sub-City, Near Atlas Hotel, Addis Ababa</p>
          </div>
          <div>
            <p className="font-semibold text-slate-800">Delivery Instructions:</p>
            <p>Call upon arrival at the compound gate.</p>
          </div>
        </div>
      </div>
    </div>
  );
}