import { Truck, Route, Users, AlertTriangle } from 'lucide-react';
import { KPICard } from '@/components/dashboard/KPICard';
import { AlertsTable } from '@/components/dashboard/AlertsTable';
import { TripsTable } from '@/components/dashboard/TripsTable';
import { kpiData } from '@/data/demoData';

export default function Dashboard() {
  return (
    <div className="space-y-6">
      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <KPICard
          title="Total Trucks"
          value={kpiData.totalTrucks}
          icon={Truck}
          variant="primary"
          trend={{ value: 8, isPositive: true }}
        />
        <KPICard
          title="Active Trips"
          value={kpiData.activeTrips}
          icon={Route}
          variant="success"
          trend={{ value: 12, isPositive: true }}
        />
        <KPICard
          title="Drivers On Duty"
          value={kpiData.driversOnDuty}
          icon={Users}
          variant="default"
          trend={{ value: 5, isPositive: true }}
        />
        <KPICard
          title="Critical Alerts"
          value={kpiData.criticalAlerts}
          icon={AlertTriangle}
          variant="danger"
          trend={{ value: 2, isPositive: false }}
        />
      </div>

      {/* Tables */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <AlertsTable />
        <TripsTable />
      </div>
    </div>
  );
}
