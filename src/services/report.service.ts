import apiClient from './apiClient';
import { REPORT_API } from '@/api/report.api';
import { reports as mockReports } from '@/data/demoData';

// Types - aligned with demoData structure
export interface Report {
  id: number;
  name: string;
  type: string;
  description: string;
  frequency: string;
  lastGenerated: string;
  size: string;
}

export interface ReportData {
  id: string;
  generatedAt: string;
  data: Record<string, unknown>;
}

// Helper to convert mock data
const mapMockReport = (report: typeof mockReports[0]): Report => ({
  ...report,
});

// Report Service
export const reportService = {
  /**
   * Get all reports
   */
  async getReports(): Promise<Report[]> {
    // TODO: Replace with real API when backend is ready
    // PENDING BACKEND - Currently using mock data
    
    await new Promise(resolve => setTimeout(resolve, 500));
    return mockReports.map(mapMockReport);
    
    // When backend is ready, use this:
    // const response = await apiClient.get<Report[]>(REPORT_API.LIST);
    // return response.data;
  },

  /**
   * Get report by ID
   */
  async getReportById(id: number): Promise<Report> {
    // TODO: Replace with real API when backend is ready
    // PENDING BACKEND - Currently using mock data
    
    await new Promise(resolve => setTimeout(resolve, 300));
    const report = mockReports.find(r => r.id === id);
    if (!report) throw new Error('Report not found');
    return mapMockReport(report);
    
    // When backend is ready, use this:
    // const response = await apiClient.get<Report>(REPORT_API.DETAILS(String(id)));
    // return response.data;
  },

  /**
   * Generate a report
   */
  async generateReport(type: string, params?: Record<string, unknown>): Promise<ReportData> {
    // TODO: Replace with real API when backend is ready
    // PENDING BACKEND - Currently using mock response
    
    await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate generation time
    return {
      id: `report_${Date.now()}`,
      generatedAt: new Date().toISOString(),
      data: { message: 'Report generated successfully' },
    };
    
    // When backend is ready, use this:
    // const response = await apiClient.post<ReportData>(REPORT_API.GENERATE, { type, ...params });
    // return response.data;
  },

  /**
   * Download report as PDF
   */
  async downloadReport(id: number): Promise<Blob> {
    // TODO: Replace with real API when backend is ready
    // PENDING BACKEND - Currently using mock response
    
    await new Promise(resolve => setTimeout(resolve, 1000));
    // Return mock blob for demo
    return new Blob(['Mock PDF content'], { type: 'application/pdf' });
    
    // When backend is ready, use this:
    // const response = await apiClient.get(REPORT_API.DOWNLOAD(String(id)), {
    //   responseType: 'blob',
    // });
    // return response.data;
  },

  /**
   * Get driver performance report data
   */
  async getDriverPerformanceReport(): Promise<ReportData> {
    const response = await apiClient.get<ReportData>(REPORT_API.DRIVER_PERFORMANCE);
    return response.data;
  },

  /**
   * Get fleet utilization report data
   */
  async getFleetUtilizationReport(): Promise<ReportData> {
    const response = await apiClient.get<ReportData>(REPORT_API.FLEET_UTILIZATION);
    return response.data;
  },

  /**
   * Get compliance summary report data
   */
  async getComplianceSummaryReport(): Promise<ReportData> {
    const response = await apiClient.get<ReportData>(REPORT_API.COMPLIANCE_SUMMARY);
    return response.data;
  },
};
