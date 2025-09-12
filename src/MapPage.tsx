import { useState } from "react";
import { useTracking } from "@/hooks/useTracking";
import TrackingMap from "@/components/MapComp";

export default function ShipmentMap({
  shipmentId = 1,
}: {
  shipmentId: number;
}) {
  const [coords, setCoords] = useState<{ lat: number; lng: number } | null>(
    null
  );

  useTracking(shipmentId, setCoords);

  return (
    <>
      <h2>Shipment {shipmentId} Tracking</h2>
      {coords ? (
        <p>
          Lat: {coords.lat}, Lng: {coords.lng}
        </p>
      ) : (
        <p>Waiting for updates…</p>
      )}

      <div className=" w-full h-full">
        <TrackingMap />
      </div>
    </>
  );
}
