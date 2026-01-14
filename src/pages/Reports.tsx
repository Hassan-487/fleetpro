import { Button } from '@/components/ui/button';
import { FileText, Download, Calendar } from 'lucide-react';

const reports = [
  { id: 1, name: 'Monthly Fleet Performance', type: 'Performance', date: '2024-01-15', status: 'Ready' },
  { id: 2, name: 'Driver Hours Summary', type: 'Compliance', date: '2024-01-14', status: 'Ready' },
  { id: 3, name: 'Fuel Consumption Report', type: 'Operations', date: '2024-01-13', status: 'Ready' },
  { id: 4, name: 'Maintenance Schedule', type: 'Maintenance', date: '2024-01-12', status: 'Ready' },
  { id: 5, name: 'Trip Efficiency Analysis', type: 'Analytics', date: '2024-01-11', status: 'Processing' },
];

const getTypeBadgeClass = (type: string) => {
  switch (type) {
    case 'Performance':
      return 'status-badge status-active';
    case 'Compliance':
      return 'status-badge status-warning';
    case 'Operations':
      return 'status-badge status-info';
    case 'Maintenance':
      return 'status-badge status-maintenance';
    case 'Analytics':
      return 'status-badge status-completed';
    default:
      return 'status-badge';
  }
};

export default function Reports() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Reports</h2>
          <p className="text-muted-foreground">Generate and download fleet reports</p>
        </div>
        <Button className="gap-2">
          <FileText className="h-4 w-4" />
          Generate Report
        </Button>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="kpi-card">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <FileText className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">12</p>
              <p className="text-sm text-muted-foreground">Reports this month</p>
            </div>
          </div>
        </div>
        <div className="kpi-card">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-success/10 flex items-center justify-center">
              <Download className="h-5 w-5 text-success" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">48</p>
              <p className="text-sm text-muted-foreground">Total downloads</p>
            </div>
          </div>
        </div>
        <div className="kpi-card">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-info/10 flex items-center justify-center">
              <Calendar className="h-5 w-5 text-info" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">Weekly</p>
              <p className="text-sm text-muted-foreground">Auto-generation</p>
            </div>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-card rounded-xl border border-border overflow-hidden">
        <div className="px-6 py-4 border-b border-border">
          <h3 className="text-lg font-semibold text-foreground">Recent Reports</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="data-table">
            <thead>
              <tr>
                <th>Report Name</th>
                <th>Type</th>
                <th>Generated</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {reports.map((report) => (
                <tr key={report.id}>
                  <td className="font-medium text-foreground">{report.name}</td>
                  <td>
                    <span className={getTypeBadgeClass(report.type)}>
                      {report.type}
                    </span>
                  </td>
                  <td className="text-muted-foreground">{report.date}</td>
                  <td className="text-muted-foreground">{report.status}</td>
                  <td>
                    <Button variant="ghost" size="sm" className="gap-2" disabled={report.status !== 'Ready'}>
                      <Download className="h-4 w-4" />
                      Download
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
