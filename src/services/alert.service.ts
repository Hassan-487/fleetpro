import apiClient from './apiClient';
import { ALERT_API } from '@/api/alert.api';
import { alerts as mockAlerts } from '@/data/demoData';

// Types - aligned with demoData structure
export interface Alert {
  id: number;
  type: string;
  severity: 'Low' | 'Medium' | 'High';
  message: string;
  truck: string;
  driver: string;
  timestamp: string;
  acknowledged: boolean;
  resolved: boolean;
}

export interface AlertStats {
  total: number;
  active: number;
  acknowledged: number;
  resolved: number;
  bySeverity: {
    low: number;
    medium: number;
    high: number;
  };
}

// Helper to convert mock data
const mapMockAlert = (alert: typeof mockAlerts[0]): Alert => ({
  ...alert,
  severity: alert.severity as Alert['severity'],
});

// Alert Service
export const alertService = {
  /**
   * Get all alerts
   */
  async getAlerts(): Promise<Alert[]> {
    // TODO: Replace with real API when backend is ready
    // PENDING BACKEND - Currently using mock data
    
    await new Promise(resolve => setTimeout(resolve, 500));
    return mockAlerts.map(mapMockAlert);
    
    // When backend is ready, use this:
    // const response = await apiClient.get<Alert[]>(ALERT_API.LIST);
    // return response.data;
  },

  /**
   * Get alert by ID
   */
  async getAlertById(id: number): Promise<Alert> {
    // TODO: Replace with real API when backend is ready
    // PENDING BACKEND - Currently using mock data
    
    await new Promise(resolve => setTimeout(resolve, 300));
    const alert = mockAlerts.find(a => a.id === id);
    if (!alert) throw new Error('Alert not found');
    return mapMockAlert(alert);
    
    // When backend is ready, use this:
    // const response = await apiClient.get<Alert>(ALERT_API.DETAILS(String(id)));
    // return response.data;
  },

  /**
   * Acknowledge an alert
   */
  async acknowledgeAlert(id: number): Promise<Alert> {
    // TODO: Replace with real API when backend is ready
    // PENDING BACKEND - Currently using mock response
    
    await new Promise(resolve => setTimeout(resolve, 300));
    const alert = mockAlerts.find(a => a.id === id);
    if (!alert) throw new Error('Alert not found');
    return { ...mapMockAlert(alert), acknowledged: true };
    
    // When backend is ready, use this:
    // const response = await apiClient.post<Alert>(ALERT_API.ACKNOWLEDGE(String(id)));
    // return response.data;
  },

  /**
   * Resolve an alert
   */
  async resolveAlert(id: number): Promise<Alert> {
    // TODO: Replace with real API when backend is ready
    // PENDING BACKEND - Currently using mock response
    
    await new Promise(resolve => setTimeout(resolve, 300));
    const alert = mockAlerts.find(a => a.id === id);
    if (!alert) throw new Error('Alert not found');
    return { ...mapMockAlert(alert), resolved: true };
    
    // When backend is ready, use this:
    // const response = await apiClient.post<Alert>(ALERT_API.RESOLVE(String(id)));
    // return response.data;
  },

  /**
   * Dismiss an alert
   */
  async dismissAlert(id: number): Promise<void> {
    await apiClient.delete(ALERT_API.DISMISS(String(id)));
  },

  /**
   * Get alert statistics
   */
  async getAlertStats(): Promise<AlertStats> {
    // TODO: Replace with real API when backend is ready
    // PENDING BACKEND - Currently using mock data
    
    await new Promise(resolve => setTimeout(resolve, 300));
    return {
      total: mockAlerts.length,
      active: mockAlerts.filter(a => !a.acknowledged && !a.resolved).length,
      acknowledged: mockAlerts.filter(a => a.acknowledged && !a.resolved).length,
      resolved: mockAlerts.filter(a => a.resolved).length,
      bySeverity: {
        low: mockAlerts.filter(a => a.severity === 'Low').length,
        medium: mockAlerts.filter(a => a.severity === 'Medium').length,
        high: mockAlerts.filter(a => a.severity === 'High').length,
      },
    };
    
    // When backend is ready, use this:
    // const response = await apiClient.get<AlertStats>(ALERT_API.STATS);
    // return response.data;
  },
};
