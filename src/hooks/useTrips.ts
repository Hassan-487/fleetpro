import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { tripService, Trip, TripStop } from '@/services/trip.service';

// Query keys
export const tripKeys = {
  all: ['trips'] as const,
  lists: () => [...tripKeys.all, 'list'] as const,
  list: (filters: Record<string, unknown>) => [...tripKeys.lists(), filters] as const,
  details: () => [...tripKeys.all, 'detail'] as const,
  detail: (id: number) => [...tripKeys.details(), id] as const,
  stops: (id: number) => [...tripKeys.all, 'stops', id] as const,
};

/**
 * Hook to fetch all trips
 * Replaces: const trips = [...] in components
 */
export function useTrips() {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: tripKeys.lists(),
    queryFn: () => tripService.getTrips(),
    staleTime: 2 * 60 * 1000, // 2 minutes - trips change more frequently
  });

  return {
    trips: data ?? [],
    loading: isLoading,
    error: error?.message ?? null,
    refetch,
  };
}

/**
 * Hook to fetch a single trip by ID
 */
export function useTrip(id: number | null) {
  const { data, isLoading, error } = useQuery({
    queryKey: tripKeys.detail(id!),
    queryFn: () => tripService.getTripById(id!),
    enabled: id !== null,
    staleTime: 2 * 60 * 1000,
  });

  return {
    trip: data ?? null,
    loading: isLoading,
    error: error?.message ?? null,
  };
}

/**
 * Hook to fetch trip stops
 */
export function useTripStops(id: number | null) {
  const { data, isLoading, error } = useQuery({
    queryKey: tripKeys.stops(id!),
    queryFn: () => tripService.getTripStops(id!),
    enabled: id !== null,
    staleTime: 2 * 60 * 1000,
  });

  return {
    stops: data ?? [],
    loading: isLoading,
    error: error?.message ?? null,
  };
}

/**
 * Hook to create a new trip
 */
export function useCreateTrip() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: Omit<Trip, 'id' | 'tripId'>) => tripService.createTrip(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: tripKeys.lists() });
    },
  });
}

/**
 * Hook to update a trip
 */
export function useUpdateTrip() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: Partial<Trip> }) => 
      tripService.updateTrip(id, data),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: tripKeys.detail(id) });
      queryClient.invalidateQueries({ queryKey: tripKeys.lists() });
    },
  });
}

/**
 * Hook to delete a trip
 */
export function useDeleteTrip() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => tripService.deleteTrip(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: tripKeys.lists() });
    },
  });
}

/**
 * Hook to start a trip
 */
export function useStartTrip() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => tripService.startTrip(id),
    onSuccess: (_, id) => {
      queryClient.invalidateQueries({ queryKey: tripKeys.detail(id) });
      queryClient.invalidateQueries({ queryKey: tripKeys.lists() });
    },
  });
}

/**
 * Hook to complete a trip
 */
export function useCompleteTrip() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => tripService.completeTrip(id),
    onSuccess: (_, id) => {
      queryClient.invalidateQueries({ queryKey: tripKeys.detail(id) });
      queryClient.invalidateQueries({ queryKey: tripKeys.lists() });
    },
  });
}

/**
 * Hook to cancel a trip
 */
export function useCancelTrip() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, reason }: { id: number; reason: string }) => 
      tripService.cancelTrip(id, reason),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: tripKeys.detail(id) });
      queryClient.invalidateQueries({ queryKey: tripKeys.lists() });
    },
  });
}

/**
 * Hook to update trip progress
 */
export function useUpdateTripProgress() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, progress }: { id: number; progress: number }) => 
      tripService.updateProgress(id, progress),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: tripKeys.detail(id) });
      queryClient.invalidateQueries({ queryKey: tripKeys.lists() });
    },
  });
}
