// @/lib/google-loader.ts
export const loadGoogleMaps = () => {
  const existingScript = document.getElementById('google-maps-script');
  if (existingScript) return;

  const script = document.createElement('script');
  script.id = 'google-maps-script';
  // Note the loading=async parameter added here
  script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyDdoEK5Fkuee0WnosCH5PoUspKrLDkFqIk&libraries=places&loading=async&callback=initMap`;
  script.async = true;
  script.defer = true;
  document.head.appendChild(script);

  // Define a dummy callback to satisfy the API
  (window as any).initMap = () => {
    console.log("Google Maps Initialized");
  };
};