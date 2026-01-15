// Trip API Endpoints
export const TRIP_API = {
  LIST: "/trips",
  DETAILS: (id: string) => `/trips/${id}`,
  CREATE: "/trips",
  UPDATE: (id: string) => `/trips/${id}`,
  DELETE: (id: string) => `/trips/${id}`,
  START: (id: string) => `/trips/${id}/start`,
  COMPLETE: (id: string) => `/trips/${id}/complete`,
  CANCEL: (id: string) => `/trips/${id}/cancel`,
  STOPS: (id: string) => `/trips/${id}/stops`,
  UPDATE_PROGRESS: (id: string) => `/trips/${id}/progress`,
} as const;
