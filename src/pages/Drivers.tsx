import { useState } from 'react';
import { drivers } from '@/data/demoData';
import { Button } from '@/components/ui/button';
import { Plus, Search, X, Phone, Mail, Award, Truck, Calendar, Gauge } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Progress } from '@/components/ui/progress';

type Driver = typeof drivers[0];

const getStatusBadgeClass = (status: string) => {
  switch (status) {
    case 'Active':
      return 'status-badge status-active';
    case 'On Leave':
      return 'status-badge status-delayed';
    default:
      return 'status-badge status-completed';
  }
};

const getScoreColor = (score: number) => {
  if (score >= 90) return 'text-success';
  if (score >= 75) return 'text-warning';
  return 'text-destructive';
};

export default function Drivers() {
  const [selectedDriver, setSelectedDriver] = useState<Driver | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredDrivers = drivers.filter(driver =>
    driver.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    driver.truck.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
        <Input 
          placeholder="Search drivers..." 
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
                <th>Name</th>
                <th>Phone</th>
                <th>Assigned Truck</th>
                <th>Status</th>
                <th>Performance Score</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredDrivers.map((driver) => (
                <tr 
                  key={driver.id} 
                  className="cursor-pointer"
                  onClick={() => setSelectedDriver(driver)}
                >
                  <td className="font-medium text-foreground">{driver.name}</td>
                  <td className="text-muted-foreground">{driver.phone}</td>
                  <td className="text-muted-foreground">{driver.truck}</td>
                  <td>
                    <span className={getStatusBadgeClass(driver.status)}>
                      {driver.status}
                    </span>
                  </td>
                  <td>
                    <div className="flex items-center gap-2">
                      <span className={`font-semibold ${getScoreColor(driver.performanceScore)}`}>
                        {driver.performanceScore}%
                      </span>
                      <Progress value={driver.performanceScore} className="h-2 w-16" />
                    </div>
                  </td>
                  <td>
                    <Button variant="ghost" size="sm" onClick={(e) => { e.stopPropagation(); setSelectedDriver(driver); }}>
                      View Details
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Driver Details Modal */}
      <Dialog open={!!selectedDriver} onOpenChange={() => setSelectedDriver(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center justify-between">
              <span>Driver Details</span>
              <Button variant="ghost" size="icon" onClick={() => setSelectedDriver(null)}>
                <X className="h-4 w-4" />
              </Button>
            </DialogTitle>
          </DialogHeader>
          
          {selectedDriver && (
            <div className="space-y-6">
              {/* Header Info */}
              <div className="flex items-start gap-4">
                <div className="h-16 w-16 rounded-full bg-primary flex items-center justify-center">
                  <span className="text-xl font-bold text-primary-foreground">
                    {selectedDriver.name.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3">
                    <h3 className="text-xl font-semibold text-foreground">{selectedDriver.name}</h3>
                    <span className={getStatusBadgeClass(selectedDriver.status)}>
                      {selectedDriver.status}
                    </span>
                  </div>
                  <div className="flex items-center gap-4 mt-2 text-muted-foreground text-sm">
                    <span className="flex items-center gap-1">
                      <Phone className="h-4 w-4" />
                      {selectedDriver.phone}
                    </span>
                    <span className="flex items-center gap-1">
                      <Mail className="h-4 w-4" />
                      {selectedDriver.email}
                    </span>
                  </div>
                </div>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="kpi-card">
                  <div className="flex items-center gap-2 text-muted-foreground mb-1">
                    <Award className="h-4 w-4" />
                    <span className="text-xs">Performance</span>
                  </div>
                  <p className={`text-2xl font-bold ${getScoreColor(selectedDriver.performanceScore)}`}>
                    {selectedDriver.performanceScore}%
                  </p>
                </div>
                <div className="kpi-card">
                  <div className="flex items-center gap-2 text-muted-foreground mb-1">
                    <Truck className="h-4 w-4" />
                    <span className="text-xs">Total Trips</span>
                  </div>
                  <p className="text-2xl font-bold text-foreground">{selectedDriver.trips}</p>
                </div>
                <div className="kpi-card">
                  <div className="flex items-center gap-2 text-muted-foreground mb-1">
                    <Gauge className="h-4 w-4" />
                    <span className="text-xs">Total Miles</span>
                  </div>
                  <p className="text-2xl font-bold text-foreground">{selectedDriver.totalMiles.toLocaleString()}</p>
                </div>
                <div className="kpi-card">
                  <div className="flex items-center gap-2 text-muted-foreground mb-1">
                    <Calendar className="h-4 w-4" />
                    <span className="text-xs">Hire Date</span>
                  </div>
                  <p className="text-lg font-bold text-foreground">{selectedDriver.hireDate}</p>
                </div>
              </div>

              {/* Performance Metrics */}
              <div className="space-y-4">
                <h4 className="font-semibold text-foreground">Performance Metrics</h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">On-Time Delivery</span>
                    <div className="flex items-center gap-2">
                      <Progress value={selectedDriver.onTimeDelivery} className="h-2 w-32" />
                      <span className="font-medium text-foreground w-12 text-right">{selectedDriver.onTimeDelivery}%</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Safety Score</span>
                    <div className="flex items-center gap-2">
                      <Progress value={selectedDriver.safetyScore} className="h-2 w-32" />
                      <span className="font-medium text-foreground w-12 text-right">{selectedDriver.safetyScore}%</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Fuel Efficiency</span>
                    <div className="flex items-center gap-2">
                      <Progress value={selectedDriver.fuelEfficiency} className="h-2 w-32" />
                      <span className="font-medium text-foreground w-12 text-right">{selectedDriver.fuelEfficiency}%</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* License Info */}
              <div className="bg-muted/50 rounded-lg p-4">
                <h4 className="font-semibold text-foreground mb-3">License Information</h4>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-muted-foreground">License Number</span>
                    <p className="font-medium text-foreground">{selectedDriver.licenseNumber}</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Expiry Date</span>
                    <p className="font-medium text-foreground">{selectedDriver.licenseExpiry}</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Assigned Truck</span>
                    <p className="font-medium text-foreground">{selectedDriver.truck}</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
