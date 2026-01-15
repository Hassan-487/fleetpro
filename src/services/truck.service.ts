import apiClient from './apiClient';
import { TRUCK_API } from '@/api/truck.api';
import { trucks as mockTrucks } from '@/data/demoData';

// Types - aligned with demoData structure
export interface Truck {
  id: number;
  truckId: string;
  model: string;
  year: number;
  status: 'In Transit' | 'Idle' | 'Maintenance';
  mileage: string;
  lastService: string;
  driver: string;
  lastLocation: string;
  fuelLevel: number;
  nextService: string;
}

export interface TruckLocation {
  lat: number;
  lng: number;
  address: string;
  timestamp: string;
}

// Helper to convert mock data
const mapMockTruck = (truck: typeof mockTrucks[0]): Truck => ({
  ...truck,
  status: truck.status as Truck['status'],
});

// Truck Service
export const truckService = {
  /**
   * Get all trucks
   */
  async getTrucks(): Promise<Truck[]> {
    // TODO: Replace with real API when backend is ready
    // PENDING BACKEND - Currently using mock data
    
    await new Promise(resolve => setTimeout(resolve, 500));
    return mockTrucks.map(mapMockTruck);
    
    // When backend is ready, use this:
    // const response = await apiClient.get<Truck[]>(TRUCK_API.LIST);
    // return response.data;
  },

  /**
   * Get truck by ID
   */
  async getTruckById(id: number): Promise<Truck> {
    // TODO: Replace with real API when backend is ready
    // PENDING BACKEND - Currently using mock data
    
    await new Promise(resolve => setTimeout(resolve, 300));
    const truck = mockTrucks.find(t => t.id === id);
    if (!truck) throw new Error('Truck not found');
    return mapMockTruck(truck);
    
    // When backend is ready, use this:
    // const response = await apiClient.get<Truck>(TRUCK_API.DETAILS(String(id)));
    // return response.data;
  },

  /**
   * Create new truck
   */
  async createTruck(data: Omit<Truck, 'id'>): Promise<Truck> {
    const response = await apiClient.post<Truck>(TRUCK_API.CREATE, data);
    return response.data;
  },

  /**
   * Update truck
   */
  async updateTruck(id: number, data: Partial<Truck>): Promise<Truck> {
    const response = await apiClient.put<Truck>(TRUCK_API.UPDATE(String(id)), data);
    return response.data;
  },

  /**
   * Delete truck
   */
  async deleteTruck(id: number): Promise<void> {
    await apiClient.delete(TRUCK_API.DELETE(String(id)));
  },

  /**
   * Update truck status
   */
  async updateStatus(id: number, status: Truck['status']): Promise<Truck> {
    const response = await apiClient.patch<Truck>(TRUCK_API.STATUS(String(id)), { status });
    return response.data;
  },

  /**
   * Get truck location
   */
  async getTruckLocation(id: number): Promise<TruckLocation> {
    // TODO: Replace with real API when backend is ready
    // PENDING BACKEND - Currently using mock data
    
    await new Promise(resolve => setTimeout(resolve, 200));
    const truck = mockTrucks.find(t => t.id === id);
    return {
      lat: 40.7128 + Math.random() * 0.1,
      lng: -74.0060 + Math.random() * 0.1,
      address: truck?.lastLocation || 'Unknown',
      timestamp: new Date().toISOString(),
    };
    
    // When backend is ready, use this:
    // const response = await apiClient.get<TruckLocation>(TRUCK_API.LOCATION(String(id)));
    // return response.data;
  },

  /**
   * Schedule maintenance
   */
  async scheduleMaintenance(id: number, date: string, notes: string): Promise<void> {
    await apiClient.post(TRUCK_API.MAINTENANCE(String(id)), { date, notes });
  },
};
