import apiClient from './apiClient';
import { DASHBOARD_API } from '@/api/dashboard.api';
import { kpiData, alerts as mockAlerts, activeTrips as mockActiveTrips } from '@/data/demoData';

// Types
export interface KPIData {
  totalTrucks: number;
  activeTrips: number;
  driversOnDuty: number;
  criticalAlerts: number;
}

export interface DashboardAlert {
  id: number;
  type: string;
  severity: 'Low' | 'Medium' | 'High';
  message: string;
  timestamp: string;
  truck: string;
  driver: string;
}

export interface DashboardTrip {
  id: number;
  tripId: string;
  driver: string;
  origin: string;
  destination: string;
  status: string;
  progress: number;
  eta: string;
}

// Dashboard Service
export const dashboardService = {
  /**
   * Get KPI data
   */
  async getKPIData(): Promise<KPIData> {
    // TODO: Replace with real API when backend is ready
    // PENDING BACKEND - Currently using mock data
    
    await new Promise(resolve => setTimeout(resolve, 500));
    return kpiData;
    
    // When backend is ready, use this:
    // const response = await apiClient.get<KPIData>(DASHBOARD_API.KPI);
    // return response.data;
  },

  /**
   * Get recent alerts for dashboard
   */
  async getRecentAlerts(limit: number = 5): Promise<DashboardAlert[]> {
    // TODO: Replace with real API when backend is ready
    // PENDING BACKEND - Currently using mock data
    
    await new Promise(resolve => setTimeout(resolve, 400));
    return mockAlerts.slice(0, limit).map(alert => ({
      id: alert.id,
      type: alert.type,
      severity: alert.severity as DashboardAlert['severity'],
      message: alert.message,
      timestamp: alert.timestamp,
      truck: alert.truck,
      driver: alert.driver,
    }));
    
    // When backend is ready, use this:
    // const response = await apiClient.get<DashboardAlert[]>(DASHBOARD_API.RECENT_ALERTS, {
    //   params: { limit },
    // });
    // return response.data;
  },

  /**
   * Get active trips for dashboard
   */
  async getActiveTrips(limit: number = 5): Promise<DashboardTrip[]> {
    // TODO: Replace with real API when backend is ready
    // PENDING BACKEND - Currently using mock data
    
    await new Promise(resolve => setTimeout(resolve, 400));
    return mockActiveTrips.slice(0, limit).map(trip => ({
      id: trip.id,
      tripId: trip.tripId,
      driver: trip.driver,
      origin: trip.origin,
      destination: trip.destination,
      status: trip.status,
      progress: trip.progress,
      eta: trip.eta,
    }));
    
    // When backend is ready, use this:
    // const response = await apiClient.get<DashboardTrip[]>(DASHBOARD_API.ACTIVE_TRIPS, {
    //   params: { limit },
    // });
    // return response.data;
  },

  /**
   * Get dashboard statistics
   */
  async getStats(): Promise<Record<string, number>> {
    const response = await apiClient.get<Record<string, number>>(DASHBOARD_API.STATS);
    return response.data;
  },
};
