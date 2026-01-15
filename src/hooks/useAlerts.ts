import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { alertService, Alert, AlertStats } from '@/services/alert.service';

// Query keys
export const alertKeys = {
  all: ['alerts'] as const,
  lists: () => [...alertKeys.all, 'list'] as const,
  list: (filters: Record<string, unknown>) => [...alertKeys.lists(), filters] as const,
  details: () => [...alertKeys.all, 'detail'] as const,
  detail: (id: number) => [...alertKeys.details(), id] as const,
  stats: () => [...alertKeys.all, 'stats'] as const,
};

/**
 * Hook to fetch all alerts
 * Replaces: const alerts = [...] in components
 */
export function useAlerts() {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: alertKeys.lists(),
    queryFn: () => alertService.getAlerts(),
    staleTime: 1 * 60 * 1000, // 1 minute - alerts are time-sensitive
    refetchInterval: 30000, // Auto-refresh every 30 seconds
  });

  return {
    alerts: data ?? [],
    loading: isLoading,
    error: error?.message ?? null,
    refetch,
  };
}

/**
 * Hook to fetch a single alert by ID
 */
export function useAlert(id: number | null) {
  const { data, isLoading, error } = useQuery({
    queryKey: alertKeys.detail(id!),
    queryFn: () => alertService.getAlertById(id!),
    enabled: id !== null,
    staleTime: 1 * 60 * 1000,
  });

  return {
    alert: data ?? null,
    loading: isLoading,
    error: error?.message ?? null,
  };
}

/**
 * Hook to fetch alert statistics
 */
export function useAlertStats() {
  const { data, isLoading, error } = useQuery({
    queryKey: alertKeys.stats(),
    queryFn: () => alertService.getAlertStats(),
    staleTime: 1 * 60 * 1000,
    refetchInterval: 30000,
  });

  return {
    stats: data ?? null,
    loading: isLoading,
    error: error?.message ?? null,
  };
}

/**
 * Hook to acknowledge an alert
 */
export function useAcknowledgeAlert() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => alertService.acknowledgeAlert(id),
    onSuccess: (_, id) => {
      queryClient.invalidateQueries({ queryKey: alertKeys.detail(id) });
      queryClient.invalidateQueries({ queryKey: alertKeys.lists() });
      queryClient.invalidateQueries({ queryKey: alertKeys.stats() });
    },
  });
}

/**
 * Hook to resolve an alert
 */
export function useResolveAlert() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => alertService.resolveAlert(id),
    onSuccess: (_, id) => {
      queryClient.invalidateQueries({ queryKey: alertKeys.detail(id) });
      queryClient.invalidateQueries({ queryKey: alertKeys.lists() });
      queryClient.invalidateQueries({ queryKey: alertKeys.stats() });
    },
  });
}

/**
 * Hook to dismiss an alert
 */
export function useDismissAlert() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => alertService.dismissAlert(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: alertKeys.lists() });
      queryClient.invalidateQueries({ queryKey: alertKeys.stats() });
    },
  });
}
