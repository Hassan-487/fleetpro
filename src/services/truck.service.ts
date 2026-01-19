
// import apiClient from './apiClient';
// import { TRUCK_API } from '@/api/truck.api';

// export interface Truck {
//   _id: string;
//   truckNumber?: string;
//   licensePlate: string;
//   make: string;
//   model: string;
//   year: number;
//   status: "available" | "assigned" | "in_transit" | "stopped" | "maintenance" | "out_of_service";
//   fuelLevel: number;
//   odometer: number;
//   samsaraDeviceId: string;
//   weight_capacity: number;
//   currentDriver?: {
//     firstName: string;
//     lastName: string;
//   };
//   lastKnownLocation?: {
//     address: string;
//     coordinates: number[];
//     updatedAt: string;
//   };
// }

// export const truckService = {
//   async getTrucks(): Promise<Truck[]> {
//     try {
//       const response = await apiClient.get(TRUCK_API.LIST);
//       // Citing the backend log: data is inside response.data.data
//       return response.data?.data || [];
//     } catch (error) {
//       console.error("Error fetching trucks:", error);
//       return [];
//     }
//   },

//   async createTruck(payload: Partial<Truck>): Promise<Truck> {
//     const response = await apiClient.post(TRUCK_API.CREATE, payload);
//     return response.data?.data;
//   }
// };

import apiClient from "@/services/apiClient";
import { TRUCK_API } from "@/api/truck.api";

export interface Truck {
  _id: string;
  licensePlate: string;
  make: string;
  model: string;
  year: number;
  weight_capacity: number;
  samsaraDeviceId: string;
  fuelType: string;
  status: string;
  odometer?: number;
  fuelLevel?: number;
  currentDriver?: {
    firstName: string;
    lastName: string;
  };
  lastKnownLocation?: {
    address?: string;
    updatedAt?: string;
  };
}

export const truckService = {
  async getTrucks(): Promise<Truck[]> {
    const res = await apiClient.get(TRUCK_API.LIST);

    console.log("Full API Response:", res.data);

    if (res.data && Array.isArray(res.data.data)) {
      return res.data.data;
    }
    if (res.data?.data?.trucks) {
      return res.data.data.trucks;
    }
    return [];
  },
  async createTruck(payload: Partial<Truck>): Promise<Truck> {
    const res = await apiClient.post(TRUCK_API.CREATE, payload);
    return res.data.data;
  },
  async updateTruck(id: string, payload: Partial<Truck>): Promise<Truck> {
    const res = await apiClient.patch(TRUCK_API.UPDATE(id), payload);
    return res.data.data;
  },
  async deleteTruck(id: string): Promise<void> {
    await apiClient.delete(TRUCK_API.DELETE(id));
  },
};