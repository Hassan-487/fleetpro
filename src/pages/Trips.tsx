import { activeTrips } from '@/data/demoData';
import { Button } from '@/components/ui/button';
import { Plus, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';

const getStatusBadgeClass = (status: string) => {
  switch (status) {
    case 'Active':
      return 'status-badge status-active';
    case 'Delayed':
      return 'status-badge status-delayed';
    case 'Completed':
      return 'status-badge status-completed';
    default:
      return 'status-badge';
  }
};

export default function Trips() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Trips</h2>
          <p className="text-muted-foreground">Track all shipments and deliveries</p>
        </div>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          Create Trip
        </Button>
      </div>

      {/* Search */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input placeholder="Search trips..." className="pl-10" />
      </div>

      {/* Table */}
      <div className="bg-card rounded-xl border border-border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="data-table">
            <thead>
              <tr>
                <th>Trip ID</th>
                <th>Driver</th>
                <th>Origin</th>
                <th>Destination</th>
                <th>Status</th>
                <th>Progress</th>
                <th>ETA</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {activeTrips.map((trip) => (
                <tr key={trip.id}>
                  <td className="font-medium text-foreground">{trip.tripId}</td>
                  <td className="text-foreground">{trip.driver}</td>
                  <td className="text-muted-foreground">{trip.origin}</td>
                  <td className="text-muted-foreground">{trip.destination}</td>
                  <td>
                    <span className={getStatusBadgeClass(trip.status)}>
                      {trip.status}
                    </span>
                  </td>
                  <td className="min-w-[120px]">
                    <div className="flex items-center gap-2">
                      <Progress value={trip.progress} className="h-2 flex-1" />
                      <span className="text-xs text-muted-foreground w-10">{trip.progress}%</span>
                    </div>
                  </td>
                  <td className="text-muted-foreground">{trip.eta}</td>
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
