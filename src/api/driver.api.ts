// Driver API Endpoints
export const DRIVER_API = {
  LIST: "/drivers",
  DETAILS: (id: string) => `/drivers/${id}`,
  CREATE: "/drivers",
  UPDATE: (id: string) => `/drivers/${id}`,
  DELETE: (id: string) => `/drivers/${id}`,
  PERFORMANCE: (id: string) => `/drivers/${id}/performance`,
  ASSIGN_TRUCK: (id: string) => `/drivers/${id}/assign-truck`,
} as const;
