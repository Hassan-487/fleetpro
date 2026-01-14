import { drivers } from '@/data/demoData';
import { Button } from '@/components/ui/button';
import { Plus, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';

const getStatusBadgeClass = (status: string) => {
  switch (status) {
    case 'On Duty':
      return 'status-badge status-active';
    case 'Off Duty':
      return 'status-badge status-completed';
    default:
      return 'status-badge';
  }
};

export default function Drivers() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Drivers</h2>
          <p className="text-muted-foreground">Manage your driver workforce</p>
        </div>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          Add Driver
        </Button>
      </div>

      {/* Search */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input placeholder="Search drivers..." className="pl-10" />
      </div>

      {/* Table */}
      <div className="bg-card rounded-xl border border-border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="data-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Status</th>
                <th>Assigned Truck</th>
                <th>Phone</th>
                <th>Total Trips</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {drivers.map((driver) => (
                <tr key={driver.id}>
                  <td className="font-medium text-foreground">{driver.name}</td>
                  <td>
                    <span className={getStatusBadgeClass(driver.status)}>
                      {driver.status}
                    </span>
                  </td>
                  <td className="text-muted-foreground">{driver.truck}</td>
                  <td className="text-muted-foreground">{driver.phone}</td>
                  <td className="text-muted-foreground">{driver.trips}</td>
                  <td>
                    <Button variant="ghost" size="sm">View</Button>
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
