import { trucks } from '@/data/demoData';
import { Button } from '@/components/ui/button';
import { Plus, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';

const getStatusBadgeClass = (status: string) => {
  switch (status) {
    case 'Active':
      return 'status-badge status-active';
    case 'Maintenance':
      return 'status-badge status-maintenance';
    case 'Inactive':
      return 'status-badge status-completed';
    default:
      return 'status-badge';
  }
};

export default function Trucks() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Trucks</h2>
          <p className="text-muted-foreground">Fleet inventory and status</p>
        </div>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          Add Truck
        </Button>
      </div>

      {/* Search */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input placeholder="Search trucks..." className="pl-10" />
      </div>

      {/* Table */}
      <div className="bg-card rounded-xl border border-border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="data-table">
            <thead>
              <tr>
                <th>Truck ID</th>
                <th>Model</th>
                <th>Year</th>
                <th>Status</th>
                <th>Mileage</th>
                <th>Last Service</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {trucks.map((truck) => (
                <tr key={truck.id}>
                  <td className="font-medium text-foreground">{truck.truckId}</td>
                  <td className="text-foreground">{truck.model}</td>
                  <td className="text-muted-foreground">{truck.year}</td>
                  <td>
                    <span className={getStatusBadgeClass(truck.status)}>
                      {truck.status}
                    </span>
                  </td>
                  <td className="text-muted-foreground">{truck.mileage}</td>
                  <td className="text-muted-foreground">{truck.lastService}</td>
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
