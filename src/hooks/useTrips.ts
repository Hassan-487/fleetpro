


import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { tripService, Trip } from '@/services/trip.service';

export const tripKeys = {
  all: ['trips'] as const,
  lists: () => [...tripKeys.all, 'list'] as const,
  detail: (id: string) => [...tripKeys.all, 'detail', id] as const,
};


export function useTrips() {
  return useQuery<Trip[]>({
    queryKey: tripKeys.lists(),
    queryFn: tripService.getTrips,
    staleTime: 5 * 60 * 1000, // Data stays fresh for 5 minutes
    gcTime: 10 * 60 * 1000,    // Keep in garbage collection for 10 minutes
    refetchOnWindowFocus: false,
    refetchOnMount: false,     // Critical: prevents sidebar clicks from re-triggering API
  });
}

/**
 * Hook to create a new trip
 */
export function useCreateTrip() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: Partial<Trip>) => tripService.createTrip(payload),
    onSuccess: () => {
      // Refresh the list immediately after a new trip is created
      queryClient.invalidateQueries({ queryKey: tripKeys.lists() });
    },
  });
}

/**
 * Hook to update an existing trip (e.g., Progress or Details)
 */
export function useUpdateTrip() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: Partial<Trip> }) => 
      tripService.updateTrip(id, payload),
    onSuccess: (_, { id }) => {
      // Invalidate both the list and the specific detail view
      queryClient.invalidateQueries({ queryKey: tripKeys.lists() });
      queryClient.invalidateQueries({ queryKey: tripKeys.detail(id) });
    },
  });
}

/**
 * Hook to delete a trip
 */
export function useDeleteTrip() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => tripService.deleteTrip(id),
    onSuccess: () => {
      // Refresh list after deletion
      queryClient.invalidateQueries({ queryKey: tripKeys.lists() });
    },
  });
}



