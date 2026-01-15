import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { driverService, Driver, DriverPerformance } from '@/services/driver.service';

// Query keys
export const driverKeys = {
  all: ['drivers'] as const,
  lists: () => [...driverKeys.all, 'list'] as const,
  list: (filters: Record<string, unknown>) => [...driverKeys.lists(), filters] as const,
  details: () => [...driverKeys.all, 'detail'] as const,
  detail: (id: number) => [...driverKeys.details(), id] as const,
  performance: (id: number) => [...driverKeys.all, 'performance', id] as const,
};

/**
 * Hook to fetch all drivers
 * Replaces: const drivers = [...] in components
 */
export function useDrivers() {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: driverKeys.lists(),
    queryFn: () => driverService.getDrivers(),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  return {
    drivers: data ?? [],
    loading: isLoading,
    error: error?.message ?? null,
    refetch,
  };
}

/**
 * Hook to fetch a single driver by ID
 */
export function useDriver(id: number | null) {
  const { data, isLoading, error } = useQuery({
    queryKey: driverKeys.detail(id!),
    queryFn: () => driverService.getDriverById(id!),
    enabled: id !== null,
    staleTime: 5 * 60 * 1000,
  });

  return {
    driver: data ?? null,
    loading: isLoading,
    error: error?.message ?? null,
  };
}

/**
 * Hook to fetch driver performance metrics
 */
export function useDriverPerformance(id: number | null) {
  const { data, isLoading, error } = useQuery({
    queryKey: driverKeys.performance(id!),
    queryFn: () => driverService.getDriverPerformance(id!),
    enabled: id !== null,
    staleTime: 5 * 60 * 1000,
  });

  return {
    performance: data ?? null,
    loading: isLoading,
    error: error?.message ?? null,
  };
}

/**
 * Hook to create a new driver
 */
export function useCreateDriver() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: Omit<Driver, 'id'>) => driverService.createDriver(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: driverKeys.lists() });
    },
  });
}

/**
 * Hook to update a driver
 */
export function useUpdateDriver() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: Partial<Driver> }) => 
      driverService.updateDriver(id, data),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: driverKeys.detail(id) });
      queryClient.invalidateQueries({ queryKey: driverKeys.lists() });
    },
  });
}

/**
 * Hook to delete a driver
 */
export function useDeleteDriver() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => driverService.deleteDriver(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: driverKeys.lists() });
    },
  });
}

/**
 * Hook to assign truck to driver
 */
export function useAssignTruck() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ driverId, truckId }: { driverId: number; truckId: string }) => 
      driverService.assignTruck(driverId, truckId),
    onSuccess: (_, { driverId }) => {
      queryClient.invalidateQueries({ queryKey: driverKeys.detail(driverId) });
      queryClient.invalidateQueries({ queryKey: driverKeys.lists() });
    },
  });
}
