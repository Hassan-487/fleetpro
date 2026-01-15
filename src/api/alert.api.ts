// Alert API Endpoints
export const ALERT_API = {
  LIST: "/alerts",
  DETAILS: (id: string) => `/alerts/${id}`,
  ACKNOWLEDGE: (id: string) => `/alerts/${id}/acknowledge`,
  RESOLVE: (id: string) => `/alerts/${id}/resolve`,
  DISMISS: (id: string) => `/alerts/${id}/dismiss`,
  STATS: "/alerts/stats",
} as const;
