export const kpiData = {
  totalTrucks: 24,
  activeTrips: 12,
  driversOnDuty: 18,
  criticalAlerts: 3,
};

export const recentAlerts = [
  { id: 1, type: 'Critical', message: 'Engine temperature warning - Truck #T-0012', time: '5 min ago', truck: 'T-0012' },
  { id: 2, type: 'Warning', message: 'Scheduled maintenance due - Truck #T-0008', time: '1 hour ago', truck: 'T-0008' },
  { id: 3, type: 'Critical', message: 'Route deviation detected - Driver Mike Johnson', time: '2 hours ago', truck: 'T-0015' },
  { id: 4, type: 'Info', message: 'Fuel level low - Truck #T-0003', time: '3 hours ago', truck: 'T-0003' },
  { id: 5, type: 'Critical', message: 'Speed limit exceeded - Truck #T-0021', time: '4 hours ago', truck: 'T-0021' },
];

export const activeTrips = [
  { id: 1, tripId: 'TRP-2024-001', driver: 'Mike Johnson', origin: 'Los Angeles, CA', destination: 'Phoenix, AZ', status: 'Active', eta: '2:30 PM', progress: 65 },
  { id: 2, tripId: 'TRP-2024-002', driver: 'Sarah Williams', origin: 'Seattle, WA', destination: 'Portland, OR', status: 'Active', eta: '11:45 AM', progress: 82 },
  { id: 3, tripId: 'TRP-2024-003', driver: 'James Brown', origin: 'Denver, CO', destination: 'Salt Lake City, UT', status: 'Delayed', eta: '5:15 PM', progress: 45 },
  { id: 4, tripId: 'TRP-2024-004', driver: 'Emily Davis', origin: 'Chicago, IL', destination: 'Detroit, MI', status: 'Active', eta: '3:00 PM', progress: 30 },
  { id: 5, tripId: 'TRP-2024-005', driver: 'Robert Wilson', origin: 'Houston, TX', destination: 'Dallas, TX', status: 'Completed', eta: 'Arrived', progress: 100 },
];

export const drivers = [
  { id: 1, name: 'Mike Johnson', status: 'On Duty', truck: 'T-0012', phone: '(555) 123-4567', trips: 156 },
  { id: 2, name: 'Sarah Williams', status: 'On Duty', truck: 'T-0008', phone: '(555) 234-5678', trips: 203 },
  { id: 3, name: 'James Brown', status: 'On Duty', truck: 'T-0015', phone: '(555) 345-6789', trips: 189 },
  { id: 4, name: 'Emily Davis', status: 'Off Duty', truck: 'T-0003', phone: '(555) 456-7890', trips: 134 },
  { id: 5, name: 'Robert Wilson', status: 'On Duty', truck: 'T-0021', phone: '(555) 567-8901', trips: 178 },
];

export const trucks = [
  { id: 1, truckId: 'T-0012', model: 'Freightliner Cascadia', year: 2022, status: 'Active', mileage: '125,430 mi', lastService: '2024-01-15' },
  { id: 2, truckId: 'T-0008', model: 'Peterbilt 579', year: 2021, status: 'Active', mileage: '98,250 mi', lastService: '2024-01-10' },
  { id: 3, truckId: 'T-0015', model: 'Kenworth T680', year: 2023, status: 'Maintenance', mileage: '45,120 mi', lastService: '2024-01-20' },
  { id: 4, truckId: 'T-0003', model: 'Volvo VNL', year: 2020, status: 'Active', mileage: '210,890 mi', lastService: '2024-01-05' },
  { id: 5, truckId: 'T-0021', model: 'International LT', year: 2022, status: 'Active', mileage: '88,340 mi', lastService: '2024-01-18' },
];
