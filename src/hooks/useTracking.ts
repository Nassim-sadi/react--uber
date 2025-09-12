import { useEffect } from "react";
import { io } from "socket.io-client";

const socket = io("http://localhost:3000"); // backend URL

export function useTracking(
  shipmentId: number,
  onUpdate: (coords: { lat: number; lng: number }) => void
) {
  useEffect(() => {
    // Listen for updates for this shipment
    socket.on(`shipment:${shipmentId}:location`, (data) => {
      onUpdate({ lat: data.lat, lng: data.lng });
    });

    return () => {
      socket.off(`shipment:${shipmentId}:location`);
    };
  }, [shipmentId, onUpdate]);
}
