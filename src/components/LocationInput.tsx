// import React, { useRef, useEffect } from "react";
// import { Input } from "@/components/ui/input";

// declare global {
//   interface Window {
//     google: any;
//   }
// }

// interface LocationData {
//   address: string;
//   latitude: number;
//   longitude: number;
// }

// interface Props {
//   placeholder: string;
//   onLocationSelect: (data: LocationData) => void;
//   defaultValue?: string;
// }

// export function LocationInput({ placeholder, onLocationSelect, defaultValue }: Props) {
//   const inputRef = useRef<HTMLInputElement>(null);

//  useEffect(() => {
//   // Function to initialize autocomplete
//   const initAutocomplete = () => {
//     if (!window.google || !inputRef.current) return;

//     const autocomplete = new window.google.maps.places.Autocomplete(inputRef.current, {
//       types: ["address", "geocode"],
//     });

//     autocomplete.addListener("place_changed", () => {
//       const place = autocomplete.getPlace();
//       if (!place.geometry || !place.geometry.location) return;

//       onLocationSelect({
//         address: place.formatted_address || place.name || "",
//         latitude: place.geometry.location.lat(),
//         longitude: place.geometry.location.lng(),
//       });
//     });
//   };

//   // If google is already loaded, init; otherwise, wait for the window load event
//   if (window.google) {
//     initAutocomplete();
//   } else {
//     window.addEventListener('load', initAutocomplete);
//     return () => window.removeEventListener('load', initAutocomplete);
//   }
// }, [onLocationSelect]);
//   return <Input ref={inputRef} placeholder={placeholder} defaultValue={defaultValue} required />;
// }


import React, { useRef, useEffect, useState } from "react";
import { Input } from "@/components/ui/input";

// Define the global window interface to satisfy TypeScript
declare global {
  interface Window {
    google: any;
    initMapCallback?: () => void;
  }
}

interface LocationData {
  address: string;
  latitude: number;
  longitude: number;
}

interface Props {
  placeholder: string;
  onLocationSelect: (data: LocationData) => void;
  defaultValue?: string;
}

export function LocationInput({ placeholder, onLocationSelect, defaultValue }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // 1. Function to initialize the Autocomplete logic once the script is ready
    const initAutocomplete = () => {
      if (!window.google || !inputRef.current) return;
      
      const autocomplete = new window.google.maps.places.Autocomplete(inputRef.current, {
        types: ["address", "geocode"],
      });

      autocomplete.addListener("place_changed", () => {
        const place = autocomplete.getPlace();
        if (!place.geometry || !place.geometry.location) return;

        onLocationSelect({
          address: place.formatted_address || place.name || "",
          latitude: place.geometry.location.lat(),
          longitude: place.geometry.location.lng(),
        });
      });
      setIsLoaded(true);
    };

    // 2. Dynamic Script Injection (Prevents Vite Preamble Errors)
    if (!window.google) {
      const scriptId = "google-maps-script";
      
      // Check if another instance of this component already started the download
      if (!document.getElementById(scriptId)) {
        const script = document.createElement("script");
        script.id = scriptId;
        // Uses the recommended loading=async and callback pattern
        script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyDdoEK5Fkuee0WnosCH5PoUspKrLDkFqIk&libraries=places&loading=async&callback=initMapCallback`;
        script.async = true;
        script.defer = true;
        
        // This callback is triggered by the Google script once it is finished downloading
        window.initMapCallback = () => {
          initAutocomplete();
          delete window.initMapCallback; // Clean up the global callback
        };
        
        document.head.appendChild(script);
      } else {
        // If the script tag exists but window.google isn't ready, wait for it
        const checkInterval = setInterval(() => {
          if (window.google) {
            initAutocomplete();
            clearInterval(checkInterval);
          }
        }, 100);
        return () => clearInterval(checkInterval);
      }
    } else {
      // If google is already available (e.g., navigated back to this page), init immediately
      initAutocomplete();
    }
  }, [onLocationSelect]);

  return (
    <Input 
      ref={inputRef} 
      placeholder={isLoaded ? placeholder : "Loading Maps..."} 
      defaultValue={defaultValue} 
      disabled={!isLoaded}
      required 
    />
  );
}