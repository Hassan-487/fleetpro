// Report API Endpoints
export const REPORT_API = {
  LIST: "/reports",
  DETAILS: (id: string) => `/reports/${id}`,
  GENERATE: "/reports/generate",
  DOWNLOAD: (id: string) => `/reports/${id}/download`,
  DRIVER_PERFORMANCE: "/reports/driver-performance",
  FLEET_UTILIZATION: "/reports/fleet-utilization",
  COMPLIANCE_SUMMARY: "/reports/compliance-summary",
} as const;
