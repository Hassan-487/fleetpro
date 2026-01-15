import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { truckService, Truck, TruckLocation } from '@/services/truck.service';

// Query keys
export const truckKeys = {
  all: ['trucks'] as const,
  lists: () => [...truckKeys.all, 'list'] as const,
  list: (filters: Record<string, unknown>) => [...truckKeys.lists(), filters] as const,
  details: () => [...truckKeys.all, 'detail'] as const,
  detail: (id: number) => [...truckKeys.details(), id] as const,
  location: (id: number) => [...truckKeys.all, 'location', id] as const,
};

/**
 * Hook to fetch all trucks
 * Replaces: const trucks = [...] in components
 */
export function useTrucks() {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: truckKeys.lists(),
    queryFn: () => truckService.getTrucks(),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  return {
    trucks: data ?? [],
    loading: isLoading,
    error: error?.message ?? null,
    refetch,
  };
}

/**
 * Hook to fetch a single truck by ID
 */
export function useTruck(id: number | null) {
  const { data, isLoading, error } = useQuery({
    queryKey: truckKeys.detail(id!),
    queryFn: () => truckService.getTruckById(id!),
    enabled: id !== null,
    staleTime: 5 * 60 * 1000,
  });

  return {
    truck: data ?? null,
    loading: isLoading,
    error: error?.message ?? null,
  };
}

/**
 * Hook to fetch truck location
 */
export function useTruckLocation(id: number | null) {
  const { data, isLoading, error } = useQuery({
    queryKey: truckKeys.location(id!),
    queryFn: () => truckService.getTruckLocation(id!),
    enabled: id !== null,
    refetchInterval: 30000, // Refresh every 30 seconds for location updates
  });

  return {
    location: data ?? null,
    loading: isLoading,
    error: error?.message ?? null,
  };
}

/**
 * Hook to create a new truck
 */
export function useCreateTruck() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: Omit<Truck, 'id'>) => truckService.createTruck(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: truckKeys.lists() });
    },
  });
}

/**
 * Hook to update a truck
 */
export function useUpdateTruck() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: Partial<Truck> }) => 
      truckService.updateTruck(id, data),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: truckKeys.detail(id) });
      queryClient.invalidateQueries({ queryKey: truckKeys.lists() });
    },
  });
}

/**
 * Hook to delete a truck
 */
export function useDeleteTruck() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => truckService.deleteTruck(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: truckKeys.lists() });
    },
  });
}

/**
 * Hook to update truck status
 */
export function useUpdateTruckStatus() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, status }: { id: number; status: Truck['status'] }) => 
      truckService.updateStatus(id, status),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: truckKeys.detail(id) });
      queryClient.invalidateQueries({ queryKey: truckKeys.lists() });
    },
  });
}

/**
 * Hook to schedule truck maintenance
 */
export function useScheduleMaintenance() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, date, notes }: { id: number; date: string; notes: string }) => 
      truckService.scheduleMaintenance(id, date, notes),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: truckKeys.detail(id) });
      queryClient.invalidateQueries({ queryKey: truckKeys.lists() });
    },
  });
}
