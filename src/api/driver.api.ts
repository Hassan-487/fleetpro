
import apiClient from "@/services/apiClient";

/* ================= TYPES ================= */

export interface Driver {
  _id: string;
  firstName: string;
  lastName: string;
  email?: string;
  phoneNumber: string;
  licenseNumber: string;
  licenseExpiry?: string;
  employmentStatus: "active" | "inactive" | "on_leave";
  assignedTruck?: {
    _id: string;
    truckNumber: string;
    licensePlate: string;
  } | null;
  status: string;
  performanceMetrics?: {
    totalTrips: number;
    safetyScore?: number;
  };
  createdAt: string;
}


export const DRIVER_API = {
  LIST: "/drivers",
  DETAILS: (id: string) => `/drivers/${id}`,
  CREATE: "/drivers",
  UPDATE: (id: string) => `/drivers/${id}`,
  DELETE: (id: string) => `/drivers/${id}`,
};

export const driverApi = {
  getDrivers: (params?: Record<string, any>) =>
    apiClient.get(DRIVER_API.LIST, { params }),

  getDriver: (id: string) =>
    apiClient.get(DRIVER_API.DETAILS(id)),

  createDriver: (payload: Partial<Driver>) =>
    apiClient.post(DRIVER_API.CREATE, payload),

  updateDriver: (id: string, payload: Partial<Driver>) =>
    apiClient.patch(DRIVER_API.UPDATE(id), payload),

  deleteDriver: (id: string) =>
    apiClient.delete(DRIVER_API.DELETE(id)),
};
