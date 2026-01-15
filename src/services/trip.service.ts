import apiClient from './apiClient';
import { TRIP_API } from '@/api/trip.api';
import { trips as mockTrips } from '@/data/demoData';

// Types - aligned with demoData structure
export interface TripStop {
  name: string;
  address: string;
  time: string;
  status: 'Completed' | 'In Progress' | 'Pending' | 'Delayed';
}

export interface Trip {
  id: number;
  tripId: string;
  truck: string;
  driver: string;
  origin: string;
  destination: string;
  status: 'Scheduled' | 'In Progress' | 'Delayed' | 'Completed';
  eta: string;
  scheduledDate: string;
  distance: string;
  progress: number;
  stops: TripStop[];
}

// Helper to convert mock data
const mapMockTrip = (trip: typeof mockTrips[0]): Trip => ({
  ...trip,
  status: trip.status as Trip['status'],
  stops: trip.stops.map(stop => ({
    ...stop,
    status: stop.status as TripStop['status'],
  })),
});

// Trip Service
export const tripService = {
  /**
   * Get all trips
   */
  async getTrips(): Promise<Trip[]> {
    // TODO: Replace with real API when backend is ready
    // PENDING BACKEND - Currently using mock data
    
    await new Promise(resolve => setTimeout(resolve, 500));
    return mockTrips.map(mapMockTrip);
    
    // When backend is ready, use this:
    // const response = await apiClient.get<Trip[]>(TRIP_API.LIST);
    // return response.data;
  },

  /**
   * Get trip by ID
   */
  async getTripById(id: number): Promise<Trip> {
    // TODO: Replace with real API when backend is ready
    // PENDING BACKEND - Currently using mock data
    
    await new Promise(resolve => setTimeout(resolve, 300));
    const trip = mockTrips.find(t => t.id === id);
    if (!trip) throw new Error('Trip not found');
    return mapMockTrip(trip);
    
    // When backend is ready, use this:
    // const response = await apiClient.get<Trip>(TRIP_API.DETAILS(String(id)));
    // return response.data;
  },

  /**
   * Create new trip
   */
  async createTrip(data: Omit<Trip, 'id' | 'tripId'>): Promise<Trip> {
    const response = await apiClient.post<Trip>(TRIP_API.CREATE, data);
    return response.data;
  },

  /**
   * Update trip
   */
  async updateTrip(id: number, data: Partial<Trip>): Promise<Trip> {
    const response = await apiClient.put<Trip>(TRIP_API.UPDATE(String(id)), data);
    return response.data;
  },

  /**
   * Delete trip
   */
  async deleteTrip(id: number): Promise<void> {
    await apiClient.delete(TRIP_API.DELETE(String(id)));
  },

  /**
   * Start a trip
   */
  async startTrip(id: number): Promise<Trip> {
    const response = await apiClient.post<Trip>(TRIP_API.START(String(id)));
    return response.data;
  },

  /**
   * Complete a trip
   */
  async completeTrip(id: number): Promise<Trip> {
    const response = await apiClient.post<Trip>(TRIP_API.COMPLETE(String(id)));
    return response.data;
  },

  /**
   * Cancel a trip
   */
  async cancelTrip(id: number, reason: string): Promise<void> {
    await apiClient.post(TRIP_API.CANCEL(String(id)), { reason });
  },

  /**
   * Get trip stops
   */
  async getTripStops(id: number): Promise<TripStop[]> {
    // TODO: Replace with real API when backend is ready
    // PENDING BACKEND - Currently using mock data
    
    await new Promise(resolve => setTimeout(resolve, 300));
    const trip = mockTrips.find(t => t.id === id);
    if (!trip) return [];
    return trip.stops.map(stop => ({
      ...stop,
      status: stop.status as TripStop['status'],
    }));
    
    // When backend is ready, use this:
    // const response = await apiClient.get<TripStop[]>(TRIP_API.STOPS(String(id)));
    // return response.data;
  },

  /**
   * Update trip progress
   */
  async updateProgress(id: number, progress: number): Promise<Trip> {
    const response = await apiClient.patch<Trip>(TRIP_API.UPDATE_PROGRESS(String(id)), { progress });
    return response.data;
  },
};
