
// import apiClient from "./apiClient";
// import { TRIP_API } from "@/api/trip.api";

// // ... Keep existing interfaces

// const mapBackendTrip = (t: any): Trip => {
//   return {
//     id: t._id,
//     tripId: t.tripNumber || `TRIP-${t._id.slice(-6).toUpperCase()}`,
//     truck: t.truck?.licensePlate || "-",
//     driver: t.driver ? `${t.driver.firstName} ${t.driver.lastName}` : "-",
//     origin: t.origin,
//     destination: t.destination,
//     status: mapStatus(t.status),
//     eta: t.aiEstimatedArrivalHuman || "-",
//     scheduledDate: t.schedule?.plannedStartTime 
//       ? new Date(t.schedule.plannedStartTime).toLocaleDateString() 
//       : "-",
//     distance: `${t.aiTotalDistanceCoveredKm || 0} km`,
//     progress: calculateProgress(t),
//     stops: t.gpsData?.slice(0, 5).map((gps: any) => ({
//       name: gps.address || "Waylink",
//       address: gps.address,
//       time: new Date(gps.timestamp).toLocaleTimeString(),
//       status: "Completed"
//     })) || [],
//     // Adding extra raw data for the Map
//     currentLocation: t.currentLocation
//   };
// };

// const mapStatus = (s: string): any => {
//   const map: Record<string, string> = {
//     scheduled: "Scheduled",
//     in_progress: "In Progress",
//     completed: "Completed",
//     cancelled: "Cancelled"
//   };
//   return map[s] || "Delayed";
// };

// const calculateProgress = (t: any) => {
//   if (t.status === 'completed') return 100;
//   if (t.status === 'scheduled') return 0;
//   // Simple logic: if in_progress, look at completed pickup
//   return t.pickup?.status === 'completed' ? 50 : 25;
// };

// export const tripService = {
//   // ... existing methods
//   async deleteTrip(id: string) {
//     return await apiClient.delete(TRIP_API.DELETE(id));
//   },
//   async updateTrip(id: string, data: any) {
//     const res = await apiClient.patch(TRUCK_API.UPDATE(id), data);
//     return mapBackendTrip(res.data.data);
//   }
// };



import apiClient from "./apiClient";
import { TRIP_API } from "@/api/trip.api";


export interface Trip {
  id: string;
  tripId: string;
  truck: string;
  driver: string;
  origin: string;
  destination: string;
  status: string;
  eta: string;
  progress: number;
  weight: number;
  estimatedHours: number;
  cargoDescription: string;
  currentLocation?: {
    latitude: number;
    longitude: number;
    address: string;
  };
  aiCurrentSpeed: number;
  // NEW METRICS FIELDS
  aiTotalDistanceCoveredKm: number;
  aiAverageSpeed: number;
  aiMovementDetected: boolean;
  driverStatus: string;
  drivingMetrics: {
    totalDrivingTime: number;
    averageSpeed: number;
    maxSpeed: number;
    totalDistanceCovered: number;
  };
}
// const mapBackendTrip = (t: any): Trip => {
//   const id = t._id || t.id;
  
//   return {
//     id: id,
//     tripId: t.tripNumber || `TRP-${id.slice(-6).toUpperCase()}`,
    
//     truck: t.truck?.licensePlate || "N/A", 
    
//     driver: t.driver ? `${t.driver.firstName} ${t.driver.lastName}` : "Unassigned",
//     origin: t.origin,
//     destination: t.destination,
//     status: t.status?.replace("_", " ") || "scheduled",
//     eta: t.aiEstimatedArrivalHuman || "N/A",
//     progress: t.status === "delivered" ? 100 : (t.status === "in_progress" ? 50 : 0),
//     currentLocation: t.currentLocation,
//     weight: t.weight || 0,
//     estimatedHours: t.estimatedHours || 0,
//     cargoDescription: t.cargoDescription || "N/A",
//     aiCurrentSpeed: t.aiCurrentSpeed || 0
//   };
// };
const mapBackendTrip = (t: any): Trip => {
  const id = t._id || t.id;
  
  return {
    id: id,
    tripId: t.tripNumber || `TRP-${id.slice(-6).toUpperCase()}`,
    truck: t.truck?.licensePlate || "N/A", 
    driver: t.driver ? `${t.driver.firstName} ${t.driver.lastName}` : "Unassigned",
    origin: t.origin,
    destination: t.destination,
    status: t.status?.replace("_", " ") || "scheduled",
    eta: t.aiEstimatedArrivalHuman || "N/A",
    progress: t.status === "delivered" ? 100 : (t.status === "in_progress" ? 50 : 0),
    currentLocation: t.currentLocation,
    weight: t.weight || 0,
    estimatedHours: t.estimatedHours || 0,
    cargoDescription: t.cargoDescription || "N/A",
    
    // AI Metrics
    aiCurrentSpeed: t.aiCurrentSpeed || 0,
    aiAverageSpeed: t.aiAverageSpeed || 0,
    aiTotalDistanceCoveredKm: t.aiTotalDistanceCoveredKm || 0,
    aiMovementDetected: t.aiMovementDetected || false,
    driverStatus: t.driverStatus || "unknown",

    // Native Driving Metrics
    drivingMetrics: {
      totalDrivingTime: t.drivingMetrics?.totalDrivingTime || 0,
      averageSpeed: t.drivingMetrics?.averageSpeed || 0,
      maxSpeed: t.drivingMetrics?.maxSpeed || 0,
      totalDistanceCovered: t.drivingMetrics?.totalDistanceCovered || 0,
    }
  };
};
export const tripService = {
  async getTrips(): Promise<Trip[]> {
    const res = await apiClient.get(TRIP_API.LIST);
    return (res.data.data || []).map(mapBackendTrip);
  },
  async createTrip(payload: any) {
    const res = await apiClient.post(TRIP_API.CREATE, payload);
    return mapBackendTrip(res.data.data[0] || res.data.data);
  },
  async updateTrip(id: string, payload: any) {
    const res = await apiClient.patch(TRIP_API.UPDATE(id), payload);
    return mapBackendTrip(res.data.data);
  },
  async deleteTrip(id: string) {
    return await apiClient.delete(TRIP_API.DELETE(id));
  }
};