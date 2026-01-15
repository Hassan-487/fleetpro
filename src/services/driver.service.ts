import apiClient from './apiClient';
import { DRIVER_API } from '@/api/driver.api';
import { drivers as mockDrivers } from '@/data/demoData';

// Types - aligned with demoData structure
export interface Driver {
  id: number;
  name: string;
  phone: string;
  email: string;
  status: 'Active' | 'On Leave' | 'Inactive';
  truck: string;
  trips: number;
  performanceScore: number;
  licenseNumber: string;
  licenseExpiry: string;
  hireDate: string;
  totalMiles: number;
  onTimeDelivery: number;
  safetyScore: number;
  fuelEfficiency: number;
}

export interface DriverPerformance {
  onTimeDelivery: number;
  safetyScore: number;
  fuelEfficiency: number;
  customerRating: number;
}

// Helper to convert mock data
const mapMockDriver = (driver: typeof mockDrivers[0]): Driver => ({
  ...driver,
  status: driver.status as Driver['status'],
});

// Driver Service
export const driverService = {
  /**
   * Get all drivers
   */
  async getDrivers(): Promise<Driver[]> {
    // TODO: Replace with real API when backend is ready
    // PENDING BACKEND - Currently using mock data
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    return mockDrivers.map(mapMockDriver);
    
    // When backend is ready, use this:
    // const response = await apiClient.get<Driver[]>(DRIVER_API.LIST);
    // return response.data;
  },

  /**
   * Get driver by ID
   */
  async getDriverById(id: number): Promise<Driver> {
    // TODO: Replace with real API when backend is ready
    // PENDING BACKEND - Currently using mock data
    
    await new Promise(resolve => setTimeout(resolve, 300));
    const driver = mockDrivers.find(d => d.id === id);
    if (!driver) throw new Error('Driver not found');
    return mapMockDriver(driver);
    
    // When backend is ready, use this:
    // const response = await apiClient.get<Driver>(DRIVER_API.DETAILS(String(id)));
    // return response.data;
  },

  /**
   * Create new driver
   */
  async createDriver(data: Omit<Driver, 'id'>): Promise<Driver> {
    const response = await apiClient.post<Driver>(DRIVER_API.CREATE, data);
    return response.data;
  },

  /**
   * Update driver
   */
  async updateDriver(id: number, data: Partial<Driver>): Promise<Driver> {
    const response = await apiClient.put<Driver>(DRIVER_API.UPDATE(String(id)), data);
    return response.data;
  },

  /**
   * Delete driver
   */
  async deleteDriver(id: number): Promise<void> {
    await apiClient.delete(DRIVER_API.DELETE(String(id)));
  },

  /**
   * Get driver performance metrics
   */
  async getDriverPerformance(id: number): Promise<DriverPerformance> {
    // TODO: Replace with real API when backend is ready
    // PENDING BACKEND - Currently using mock data
    
    await new Promise(resolve => setTimeout(resolve, 300));
    const driver = mockDrivers.find(d => d.id === id);
    if (!driver) throw new Error('Driver not found');
    
    return {
      onTimeDelivery: driver.onTimeDelivery,
      safetyScore: driver.safetyScore,
      fuelEfficiency: driver.fuelEfficiency,
      customerRating: 4.8,
    };
    
    // When backend is ready, use this:
    // const response = await apiClient.get<DriverPerformance>(DRIVER_API.PERFORMANCE(String(id)));
    // return response.data;
  },

  /**
   * Assign truck to driver
   */
  async assignTruck(driverId: number, truckId: string): Promise<void> {
    await apiClient.post(DRIVER_API.ASSIGN_TRUCK(String(driverId)), { truckId });
  },
};
