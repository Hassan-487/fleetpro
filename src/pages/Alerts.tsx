import { recentAlerts } from '@/data/demoData';
import { Button } from '@/components/ui/button';
import { Search, Filter } from 'lucide-react';
import { Input } from '@/components/ui/input';

const getAlertBadgeClass = (type: string) => {
  switch (type) {
    case 'Critical':
      return 'status-badge status-critical';
    case 'Warning':
      return 'status-badge status-warning';
    case 'Info':
      return 'status-badge status-info';
    default:
      return 'status-badge';
  }
};

export default function Alerts() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Alerts</h2>
          <p className="text-muted-foreground">Monitor fleet warnings and notifications</p>
        </div>
        <Button variant="outline" className="gap-2">
          <Filter className="h-4 w-4" />
          Filter
        </Button>
      </div>

      {/* Search */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input placeholder="Search alerts..." className="pl-10" />
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="kpi-card">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-destructive/10 flex items-center justify-center">
              <span className="text-lg font-bold text-destructive">3</span>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Critical</p>
              <p className="font-semibold text-foreground">Requires attention</p>
            </div>
          </div>
        </div>
        <div className="kpi-card">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-warning/10 flex items-center justify-center">
              <span className="text-lg font-bold text-warning">1</span>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Warnings</p>
              <p className="font-semibold text-foreground">Monitor closely</p>
            </div>
          </div>
        </div>
        <div className="kpi-card">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-info/10 flex items-center justify-center">
              <span className="text-lg font-bold text-info">1</span>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Info</p>
              <p className="font-semibold text-foreground">For your reference</p>
            </div>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-card rounded-xl border border-border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="data-table">
            <thead>
              <tr>
                <th>Type</th>
                <th>Message</th>
                <th>Truck</th>
                <th>Time</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {recentAlerts.map((alert) => (
                <tr key={alert.id}>
                  <td>
                    <span className={getAlertBadgeClass(alert.type)}>
                      {alert.type}
                    </span>
                  </td>
                  <td className="text-foreground">{alert.message}</td>
                  <td className="text-muted-foreground">{alert.truck}</td>
                  <td className="text-muted-foreground">{alert.time}</td>
                  <td>
                    <div className="flex gap-2">
                      <Button variant="ghost" size="sm">View</Button>
                      <Button variant="ghost" size="sm">Dismiss</Button>
                    </div>
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
