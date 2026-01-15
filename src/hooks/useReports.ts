import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { reportService, Report, ReportData } from '@/services/report.service';

// Query keys
export const reportKeys = {
  all: ['reports'] as const,
  lists: () => [...reportKeys.all, 'list'] as const,
  list: (filters: Record<string, unknown>) => [...reportKeys.lists(), filters] as const,
  details: () => [...reportKeys.all, 'detail'] as const,
  detail: (id: number) => [...reportKeys.details(), id] as const,
};

/**
 * Hook to fetch all reports
 * Replaces: const reports = [...] in components
 */
export function useReports() {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: reportKeys.lists(),
    queryFn: () => reportService.getReports(),
    staleTime: 10 * 60 * 1000, // 10 minutes
  });

  return {
    reports: data ?? [],
    loading: isLoading,
    error: error?.message ?? null,
    refetch,
  };
}

/**
 * Hook to fetch a single report by ID
 */
export function useReport(id: number | null) {
  const { data, isLoading, error } = useQuery({
    queryKey: reportKeys.detail(id!),
    queryFn: () => reportService.getReportById(id!),
    enabled: id !== null,
    staleTime: 10 * 60 * 1000,
  });

  return {
    report: data ?? null,
    loading: isLoading,
    error: error?.message ?? null,
  };
}

/**
 * Hook to generate a report
 */
export function useGenerateReport() {
  return useMutation({
    mutationFn: ({ type, params }: { type: string; params?: Record<string, unknown> }) => 
      reportService.generateReport(type, params),
  });
}

/**
 * Hook to download a report
 */
export function useDownloadReport() {
  return useMutation({
    mutationFn: (id: number) => reportService.downloadReport(id),
    onSuccess: (blob, id) => {
      // Create download link
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `report-${id}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    },
  });
}
