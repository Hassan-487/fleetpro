export function TripMap({ lat, lng }: { lat: number; lng: number }) {
  const mapUrl = `https://maps.google.com/maps?q=${lat},${lng}&z=15&output=embed`;
  
  return (
    <div className="w-full h-48 rounded-lg overflow-hidden border border-border mt-4">
      <iframe
        width="100%"
        height="100%"
        src={mapUrl}
        className="grayscale contrast-125"
      ></iframe>
    </div>
  );
}
