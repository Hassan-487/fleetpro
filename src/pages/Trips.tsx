import { useState } from 'react';
import { trips } from '@/data/demoData';
import { Button } from '@/components/ui/button';
import { Plus, Search, X, MapPin, Clock, CheckCircle2, Circle, Loader2 } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';

type Trip = typeof trips[0];

const getStatusBadgeClass = (status: string) => {
  switch (status) {
    case 'In Progress':
      return 'status-badge status-active';
    case 'Scheduled':
      return 'status-badge status-info';
    case 'Delayed':
      return 'status-badge status-delayed';
    case 'Completed':
      return 'status-badge status-completed';
    default:
      return 'status-badge';
  }
};

const getStopIcon = (status: string) => {
  switch (status) {
    case 'Completed':
      return <CheckCircle2 className="h-5 w-5 text-success" />;
    case 'In Progress':
      return <Loader2 className="h-5 w-5 text-primary animate-spin" />;
    case 'Delayed':
      return <Clock className="h-5 w-5 text-warning" />;
    default:
      return <Circle className="h-5 w-5 text-muted-foreground" />;
  }
};

export default function Trips() {
  const [selectedTrip, setSelectedTrip] = useState<Trip | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredTrips = trips.filter(trip =>
    trip.tripId.toLowerCase().includes(searchTerm.toLowerCase()) ||
    trip.driver.toLowerCase().includes(searchTerm.toLowerCase()) ||
    trip.truck.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
        <Input 
          placeholder="Search trips..." 
          className="pl-10"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Table */}
      <div className="bg-card rounded-xl border border-border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="data-table">
            <thead>
              <tr>
                <th>Trip ID</th>
                <th>Truck</th>
                <th>Driver</th>
                <th>Route</th>
                <th>Status</th>
                <th>Progress</th>
                <th>ETA</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredTrips.map((trip) => (
                <tr key={trip.id} className="cursor-pointer" onClick={() => setSelectedTrip(trip)}>
                  <td className="font-medium text-foreground">{trip.tripId}</td>
                  <td className="text-foreground">{trip.truck}</td>
                  <td className="text-foreground">{trip.driver}</td>
                  <td className="text-muted-foreground">
                    <div className="flex flex-col text-sm">
                      <span>{trip.origin}</span>
                      <span className="text-xs">→ {trip.destination}</span>
                    </div>
                  </td>
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
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={(e) => { e.stopPropagation(); setSelectedTrip(trip); }}
                    >
                      View
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Trip Details Drawer */}
      <Sheet open={!!selectedTrip} onOpenChange={() => setSelectedTrip(null)}>
        <SheetContent className="sm:max-w-lg overflow-y-auto">
          <SheetHeader>
            <SheetTitle className="flex items-center justify-between">
              <span>Trip Details</span>
              <Button variant="ghost" size="icon" onClick={() => setSelectedTrip(null)}>
                <X className="h-4 w-4" />
              </Button>
            </SheetTitle>
          </SheetHeader>

          {selectedTrip && (
            <div className="space-y-6 mt-6">
              {/* Trip Header */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-bold text-foreground">{selectedTrip.tripId}</h3>
                  <span className={getStatusBadgeClass(selectedTrip.status)}>
                    {selectedTrip.status}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-muted-foreground">Driver</span>
                    <p className="font-medium text-foreground">{selectedTrip.driver}</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Truck</span>
                    <p className="font-medium text-foreground">{selectedTrip.truck}</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Distance</span>
                    <p className="font-medium text-foreground">{selectedTrip.distance}</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Scheduled</span>
                    <p className="font-medium text-foreground">{selectedTrip.scheduledDate}</p>
                  </div>
                </div>
              </div>

              {/* Route Info */}
              <div className="bg-muted/50 rounded-lg p-4 space-y-3">
                <div className="flex items-start gap-3">
                  <div className="h-8 w-8 rounded-full bg-success/20 flex items-center justify-center mt-0.5">
                    <MapPin className="h-4 w-4 text-success" />
                  </div>
                  <div>
                    <span className="text-xs text-muted-foreground">Origin</span>
                    <p className="font-medium text-foreground">{selectedTrip.origin}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center mt-0.5">
                    <MapPin className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <span className="text-xs text-muted-foreground">Destination</span>
                    <p className="font-medium text-foreground">{selectedTrip.destination}</p>
                  </div>
                </div>
                <div className="flex items-center justify-between pt-2 border-t border-border">
                  <span className="text-muted-foreground">ETA</span>
                  <span className="font-semibold text-foreground">{selectedTrip.eta}</span>
                </div>
              </div>

              {/* Progress */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Trip Progress</span>
                  <span className="font-medium text-foreground">{selectedTrip.progress}%</span>
                </div>
                <Progress value={selectedTrip.progress} className="h-3" />
              </div>

              {/* Stops Timeline */}
              <div className="space-y-4">
                <h4 className="font-semibold text-foreground">Stops</h4>
                <div className="space-y-0">
                  {selectedTrip.stops.map((stop, index) => (
                    <div key={index} className="relative flex gap-4">
                      {/* Timeline line */}
                      {index < selectedTrip.stops.length - 1 && (
                        <div className="absolute left-[10px] top-8 bottom-0 w-0.5 bg-border" />
                      )}
                      
                      {/* Icon */}
                      <div className="relative z-10 bg-card">
                        {getStopIcon(stop.status)}
                      </div>
                      
                      {/* Content */}
                      <div className="flex-1 pb-6">
                        <div className="flex items-start justify-between">
                          <div>
                            <p className="font-medium text-foreground">{stop.name}</p>
                            <p className="text-xs text-muted-foreground mt-0.5">{stop.address}</p>
                          </div>
                          <div className="text-right">
                            <p className="text-sm font-medium text-foreground">{stop.time}</p>
                            <span className={`text-xs ${
                              stop.status === 'Completed' ? 'text-success' :
                              stop.status === 'In Progress' ? 'text-primary' :
                              stop.status === 'Delayed' ? 'text-warning' :
                              'text-muted-foreground'
                            }`}>
                              {stop.status}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
}
