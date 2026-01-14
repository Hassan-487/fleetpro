import { useState } from 'react';
import { trucks } from '@/data/demoData';
import { Button } from '@/components/ui/button';
import { Plus, Search, MapPin, Fuel } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';

const getStatusBadgeClass = (status: string) => {
  switch (status) {
    case 'In Transit':
      return 'status-badge status-active';
    case 'Idle':
      return 'status-badge status-warning';
    case 'Maintenance':
      return 'status-badge status-maintenance';
    default:
      return 'status-badge status-completed';
  }
};

export default function Trucks() {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredTrucks = trucks.filter(truck =>
    truck.truckId.toLowerCase().includes(searchTerm.toLowerCase()) ||
    truck.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
    truck.driver.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
        <Input 
          placeholder="Search trucks..." 
          className="pl-10"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Table */}
        <div className="xl:col-span-2 bg-card rounded-xl border border-border overflow-hidden">
          <div className="overflow-x-auto">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Truck Number</th>
                  <th>Driver</th>
                  <th>Status</th>
                  <th>Last Location</th>
                  <th>Fuel</th>
                </tr>
              </thead>
              <tbody>
                {filteredTrucks.map((truck) => (
                  <tr key={truck.id}>
                    <td>
                      <div>
                        <p className="font-medium text-foreground">{truck.truckId}</p>
                        <p className="text-xs text-muted-foreground">{truck.model}</p>
                      </div>
                    </td>
                    <td className="text-foreground">{truck.driver}</td>
                    <td>
                      <span className={getStatusBadgeClass(truck.status)}>
                        {truck.status}
                      </span>
                    </td>
                    <td>
                      <div className="flex items-center gap-1 text-muted-foreground text-sm">
                        <MapPin className="h-3 w-3" />
                        <span className="max-w-[200px] truncate">{truck.lastLocation}</span>
                      </div>
                    </td>
                    <td>
                      <div className="flex items-center gap-2">
                        <Fuel className="h-4 w-4 text-muted-foreground" />
                        <Progress value={truck.fuelLevel} className="h-2 w-16" />
                        <span className="text-xs text-muted-foreground">{truck.fuelLevel}%</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Map Placeholder */}
        <div className="bg-card rounded-xl border border-border overflow-hidden">
          <div className="px-6 py-4 border-b border-border">
            <h3 className="text-lg font-semibold text-foreground">Fleet Map</h3>
            <p className="text-sm text-muted-foreground">Real-time vehicle locations</p>
          </div>
          <div className="h-[400px] bg-muted/30 flex flex-col items-center justify-center p-6">
            <div className="relative w-full h-full rounded-lg bg-gradient-to-br from-muted/50 to-muted overflow-hidden">
              {/* Simulated map grid */}
              <div className="absolute inset-0 opacity-20">
                {[...Array(10)].map((_, i) => (
                  <div key={`h-${i}`} className="absolute border-t border-border/50 w-full" style={{ top: `${i * 10}%` }} />
                ))}
                {[...Array(10)].map((_, i) => (
                  <div key={`v-${i}`} className="absolute border-l border-border/50 h-full" style={{ left: `${i * 10}%` }} />
                ))}
              </div>
              
              {/* Truck markers */}
              <div className="absolute top-[25%] left-[30%] flex flex-col items-center animate-pulse">
                <div className="h-4 w-4 rounded-full bg-success border-2 border-card" />
                <span className="text-[10px] font-medium bg-card px-1 rounded mt-1">T-0012</span>
              </div>
              <div className="absolute top-[15%] left-[20%] flex flex-col items-center animate-pulse">
                <div className="h-4 w-4 rounded-full bg-success border-2 border-card" />
                <span className="text-[10px] font-medium bg-card px-1 rounded mt-1">T-0008</span>
              </div>
              <div className="absolute top-[45%] left-[55%] flex flex-col items-center">
                <div className="h-4 w-4 rounded-full bg-warning border-2 border-card" />
                <span className="text-[10px] font-medium bg-card px-1 rounded mt-1">T-0015</span>
              </div>
              <div className="absolute top-[60%] left-[70%] flex flex-col items-center">
                <div className="h-4 w-4 rounded-full bg-muted-foreground border-2 border-card" />
                <span className="text-[10px] font-medium bg-card px-1 rounded mt-1">T-0003</span>
              </div>
              <div className="absolute top-[75%] left-[45%] flex flex-col items-center animate-pulse">
                <div className="h-4 w-4 rounded-full bg-success border-2 border-card" />
                <span className="text-[10px] font-medium bg-card px-1 rounded mt-1">T-0021</span>
              </div>
              <div className="absolute top-[20%] left-[15%] flex flex-col items-center">
                <div className="h-4 w-4 rounded-full bg-muted-foreground border-2 border-card" />
                <span className="text-[10px] font-medium bg-card px-1 rounded mt-1">T-0007</span>
              </div>

              {/* Legend */}
              <div className="absolute bottom-4 left-4 bg-card/90 backdrop-blur-sm rounded-lg p-3 text-xs space-y-2">
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-success" />
                  <span>In Transit</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-warning" />
                  <span>Maintenance</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-muted-foreground" />
                  <span>Idle</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
