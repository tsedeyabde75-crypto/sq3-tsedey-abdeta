"use client";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const BOLE = [8.9950, 38.7896];

export default function DeliveryMap({ courierPosition = BOLE, destination = BOLE }) {
  return (
    <MapContainer center={courierPosition} zoom={14} style={{ height: "320px", width: "100%" }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; OpenStreetMap contributors'
      />
      <Marker position={courierPosition}>
        <Popup>Courier is on the way</Popup>
      </Marker>
      <Marker position={destination}>
        <Popup>Delivery Address</Popup>
      </Marker>
    </MapContainer>
  );
}