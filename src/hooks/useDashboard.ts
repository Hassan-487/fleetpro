import { useQuery } from '@tanstack/react-query';
import { dashboardService, KPIData, DashboardAlert, DashboardTrip } from '@/services/dashboard.service';

// Query keys
export const dashboardKeys = {
  all: ['dashboard'] as const,
  kpi: () => [...dashboardKeys.all, 'kpi'] as const,
  recentAlerts: () => [...dashboardKeys.all, 'recentAlerts'] as const,
  activeTrips: () => [...dashboardKeys.all, 'activeTrips'] as const,
  stats: () => [...dashboardKeys.all, 'stats'] as const,
};

/**
 * Hook to fetch dashboard KPI data
 * Replaces: const kpiData = {...} in Dashboard component
 */
export function useDashboardKPI() {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: dashboardKeys.kpi(),
    queryFn: () => dashboardService.getKPIData(),
    staleTime: 2 * 60 * 1000, // 2 minutes
    refetchInterval: 60000, // Auto-refresh every minute
  });

  return {
    kpiData: data ?? null,
    loading: isLoading,
    error: error?.message ?? null,
    refetch,
  };
}

/**
 * Hook to fetch recent alerts for dashboard
 * Replaces: const recentAlerts = alerts.slice(0, 5) in Dashboard
 */
export function useDashboardAlerts(limit: number = 5) {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: [...dashboardKeys.recentAlerts(), limit],
    queryFn: () => dashboardService.getRecentAlerts(limit),
    staleTime: 1 * 60 * 1000,
    refetchInterval: 30000,
  });

  return {
    alerts: data ?? [],
    loading: isLoading,
    error: error?.message ?? null,
    refetch,
  };
}

/**
 * Hook to fetch active trips for dashboard
 * Replaces: const activeTrips = trips.filter(...) in Dashboard
 */
export function useDashboardTrips(limit: number = 5) {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: [...dashboardKeys.activeTrips(), limit],
    queryFn: () => dashboardService.getActiveTrips(limit),
    staleTime: 2 * 60 * 1000,
    refetchInterval: 60000,
  });

  return {
    trips: data ?? [],
    loading: isLoading,
    error: error?.message ?? null,
    refetch,
  };
}

/**
 * Combined hook for all dashboard data
 * Use this for the main dashboard page
 */
export function useDashboard() {
  const { kpiData, loading: kpiLoading, error: kpiError } = useDashboardKPI();
  const { alerts, loading: alertsLoading, error: alertsError } = useDashboardAlerts();
  const { trips, loading: tripsLoading, error: tripsError } = useDashboardTrips();

  return {
    kpiData,
    alerts,
    trips,
    loading: kpiLoading || alertsLoading || tripsLoading,
    error: kpiError || alertsError || tripsError,
  };
}
