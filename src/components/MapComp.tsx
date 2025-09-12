import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { type LatLngExpression } from "leaflet";
import "@/assets/styles/map.css";
export default function TrackingMap() {
  const center: LatLngExpression = [36.7528, 3.0422]; // Algiers example coords

  return (
    <MapContainer center={center} zoom={13} className="leaflet-container">
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="&copy; OpenStreetMap contributors"
      />
      <Marker position={center}>
        <Popup>Shipment here 🚚</Popup>
      </Marker>
    </MapContainer>
  );
}
