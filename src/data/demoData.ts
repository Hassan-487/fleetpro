export const kpiData = {
  totalTrucks: 24,
  activeTrips: 12,
  driversOnDuty: 18,
  criticalAlerts: 3,
};

export const drivers = [
  { 
    id: 1, 
    name: 'Mike Johnson', 
    status: 'Active', 
    truck: 'T-0012', 
    phone: '(555) 123-4567', 
    trips: 156,
    performanceScore: 94,
    email: 'mike.johnson@fleetpro.com',
    licenseNumber: 'CDL-8847521',
    licenseExpiry: '2025-08-15',
    hireDate: '2019-03-12',
    totalMiles: 245780,
    onTimeDelivery: 98,
    safetyScore: 96,
    fuelEfficiency: 92
  },
  { 
    id: 2, 
    name: 'Sarah Williams', 
    status: 'Active', 
    truck: 'T-0008', 
    phone: '(555) 234-5678', 
    trips: 203,
    performanceScore: 97,
    email: 'sarah.williams@fleetpro.com',
    licenseNumber: 'CDL-9923847',
    licenseExpiry: '2026-02-20',
    hireDate: '2018-07-08',
    totalMiles: 312450,
    onTimeDelivery: 99,
    safetyScore: 98,
    fuelEfficiency: 95
  },
  { 
    id: 3, 
    name: 'James Brown', 
    status: 'Active', 
    truck: 'T-0015', 
    phone: '(555) 345-6789', 
    trips: 189,
    performanceScore: 88,
    email: 'james.brown@fleetpro.com',
    licenseNumber: 'CDL-7712934',
    licenseExpiry: '2024-11-30',
    hireDate: '2020-01-15',
    totalMiles: 198340,
    onTimeDelivery: 91,
    safetyScore: 85,
    fuelEfficiency: 88
  },
  { 
    id: 4, 
    name: 'Emily Davis', 
    status: 'On Leave', 
    truck: 'T-0003', 
    phone: '(555) 456-7890', 
    trips: 134,
    performanceScore: 91,
    email: 'emily.davis@fleetpro.com',
    licenseNumber: 'CDL-6654123',
    licenseExpiry: '2025-05-10',
    hireDate: '2021-06-22',
    totalMiles: 145670,
    onTimeDelivery: 94,
    safetyScore: 92,
    fuelEfficiency: 89
  },
  { 
    id: 5, 
    name: 'Robert Wilson', 
    status: 'Active', 
    truck: 'T-0021', 
    phone: '(555) 567-8901', 
    trips: 178,
    performanceScore: 85,
    email: 'robert.wilson@fleetpro.com',
    licenseNumber: 'CDL-5543298',
    licenseExpiry: '2024-09-25',
    hireDate: '2019-11-03',
    totalMiles: 223890,
    onTimeDelivery: 87,
    safetyScore: 82,
    fuelEfficiency: 86
  },
  { 
    id: 6, 
    name: 'Lisa Martinez', 
    status: 'Active', 
    truck: 'T-0007', 
    phone: '(555) 678-9012', 
    trips: 167,
    performanceScore: 93,
    email: 'lisa.martinez@fleetpro.com',
    licenseNumber: 'CDL-4432187',
    licenseExpiry: '2026-01-15',
    hireDate: '2020-04-18',
    totalMiles: 189540,
    onTimeDelivery: 96,
    safetyScore: 94,
    fuelEfficiency: 91
  },
];

export const trucks = [
  { 
    id: 1, 
    truckId: 'T-0012', 
    model: 'Freightliner Cascadia', 
    year: 2022, 
    status: 'In Transit', 
    mileage: '125,430 mi', 
    lastService: '2024-01-15',
    driver: 'Mike Johnson',
    lastLocation: 'I-10 W, near Phoenix, AZ',
    fuelLevel: 72,
    nextService: '2024-02-15'
  },
  { 
    id: 2, 
    truckId: 'T-0008', 
    model: 'Peterbilt 579', 
    year: 2021, 
    status: 'In Transit', 
    mileage: '98,250 mi', 
    lastService: '2024-01-10',
    driver: 'Sarah Williams',
    lastLocation: 'I-5 S, near Portland, OR',
    fuelLevel: 45,
    nextService: '2024-02-10'
  },
  { 
    id: 3, 
    truckId: 'T-0015', 
    model: 'Kenworth T680', 
    year: 2023, 
    status: 'Maintenance', 
    mileage: '45,120 mi', 
    lastService: '2024-01-20',
    driver: 'James Brown',
    lastLocation: 'Denver Service Center, CO',
    fuelLevel: 30,
    nextService: '2024-01-25'
  },
  { 
    id: 4, 
    truckId: 'T-0003', 
    model: 'Volvo VNL', 
    year: 2020, 
    status: 'Idle', 
    mileage: '210,890 mi', 
    lastService: '2024-01-05',
    driver: 'Unassigned',
    lastLocation: 'Chicago Depot, IL',
    fuelLevel: 88,
    nextService: '2024-02-05'
  },
  { 
    id: 5, 
    truckId: 'T-0021', 
    model: 'International LT', 
    year: 2022, 
    status: 'In Transit', 
    mileage: '88,340 mi', 
    lastService: '2024-01-18',
    driver: 'Robert Wilson',
    lastLocation: 'I-35 N, near Dallas, TX',
    fuelLevel: 62,
    nextService: '2024-02-18'
  },
  { 
    id: 6, 
    truckId: 'T-0007', 
    model: 'Mack Anthem', 
    year: 2021, 
    status: 'Idle', 
    mileage: '156,780 mi', 
    lastService: '2024-01-12',
    driver: 'Lisa Martinez',
    lastLocation: 'Seattle Terminal, WA',
    fuelLevel: 95,
    nextService: '2024-02-12'
  },
];

export const trips = [
  { 
    id: 1, 
    tripId: 'TRP-2024-001', 
    driver: 'Mike Johnson', 
    truck: 'T-0012',
    origin: 'Los Angeles, CA', 
    destination: 'Phoenix, AZ', 
    status: 'In Progress', 
    eta: '2:30 PM',
    scheduledDate: '2024-01-20',
    distance: '372 miles',
    progress: 65,
    stops: [
      { name: 'Riverside Distribution Center', address: '1250 Commerce Dr, Riverside, CA', time: '8:45 AM', status: 'Completed' },
      { name: 'Palm Springs Fuel Stop', address: '450 N Indian Canyon Dr, Palm Springs, CA', time: '10:15 AM', status: 'Completed' },
      { name: 'Quartzsite Rest Area', address: 'I-10 Mile Marker 45, Quartzsite, AZ', time: '12:30 PM', status: 'In Progress' },
      { name: 'Phoenix Distribution Hub', address: '8800 W Buckeye Rd, Phoenix, AZ', time: '2:30 PM', status: 'Pending' }
    ]
  },
  { 
    id: 2, 
    tripId: 'TRP-2024-002', 
    driver: 'Sarah Williams',
    truck: 'T-0008', 
    origin: 'Seattle, WA', 
    destination: 'Portland, OR', 
    status: 'In Progress', 
    eta: '11:45 AM',
    scheduledDate: '2024-01-20',
    distance: '175 miles',
    progress: 82,
    stops: [
      { name: 'Tacoma Warehouse', address: '2100 Port of Tacoma Rd, Tacoma, WA', time: '7:30 AM', status: 'Completed' },
      { name: 'Olympia Distribution', address: '1800 Harrison Ave NW, Olympia, WA', time: '9:00 AM', status: 'Completed' },
      { name: 'Portland Central Hub', address: '3500 NW Yeon Ave, Portland, OR', time: '11:45 AM', status: 'Pending' }
    ]
  },
  { 
    id: 3, 
    tripId: 'TRP-2024-003', 
    driver: 'James Brown',
    truck: 'T-0015', 
    origin: 'Denver, CO', 
    destination: 'Salt Lake City, UT', 
    status: 'Delayed', 
    eta: '5:15 PM',
    scheduledDate: '2024-01-20',
    distance: '525 miles',
    progress: 45,
    stops: [
      { name: 'Denver Freight Terminal', address: '4900 Oakland St, Denver, CO', time: '6:00 AM', status: 'Completed' },
      { name: 'Grand Junction Fuel Stop', address: '2600 Hwy 6&50, Grand Junction, CO', time: '10:30 AM', status: 'Completed' },
      { name: 'Green River Rest Stop', address: 'I-70 Exit 164, Green River, UT', time: '1:45 PM', status: 'Delayed' },
      { name: 'Salt Lake Distribution', address: '5400 W 2100 S, Salt Lake City, UT', time: '5:15 PM', status: 'Pending' }
    ]
  },
  { 
    id: 4, 
    tripId: 'TRP-2024-004', 
    driver: 'Robert Wilson',
    truck: 'T-0021', 
    origin: 'Chicago, IL', 
    destination: 'Detroit, MI', 
    status: 'Scheduled', 
    eta: '3:00 PM',
    scheduledDate: '2024-01-21',
    distance: '282 miles',
    progress: 0,
    stops: [
      { name: 'Chicago Logistics Center', address: '2300 S Lumber St, Chicago, IL', time: '8:00 AM', status: 'Pending' },
      { name: 'Gary Transfer Point', address: '100 W 5th Ave, Gary, IN', time: '9:30 AM', status: 'Pending' },
      { name: 'Kalamazoo Fuel Stop', address: '3200 Stadium Dr, Kalamazoo, MI', time: '12:00 PM', status: 'Pending' },
      { name: 'Detroit Metro Hub', address: '1500 E McNichols Rd, Detroit, MI', time: '3:00 PM', status: 'Pending' }
    ]
  },
  { 
    id: 5, 
    tripId: 'TRP-2024-005', 
    driver: 'Lisa Martinez',
    truck: 'T-0007', 
    origin: 'Houston, TX', 
    destination: 'Dallas, TX', 
    status: 'Completed', 
    eta: 'Arrived',
    scheduledDate: '2024-01-19',
    distance: '239 miles',
    progress: 100,
    stops: [
      { name: 'Houston Distribution', address: '6500 Navigation Blvd, Houston, TX', time: '6:00 AM', status: 'Completed' },
      { name: 'Huntsville Rest Area', address: 'I-45 Mile 116, Huntsville, TX', time: '8:15 AM', status: 'Completed' },
      { name: 'Dallas Freight Center', address: '4500 Singleton Blvd, Dallas, TX', time: '11:00 AM', status: 'Completed' }
    ]
  },
];

export const alerts = [
  { 
    id: 1, 
    type: 'Delay Risk', 
    message: 'Traffic congestion detected on I-10 - Truck T-0012 may be delayed by 45 minutes',
    severity: 'High',
    timestamp: '5 min ago',
    truck: 'T-0012',
    driver: 'Mike Johnson',
    acknowledged: false,
    resolved: false
  },
  { 
    id: 2, 
    type: 'Extended Stop', 
    message: 'Truck T-0015 has been stationary for 2+ hours at unauthorized location',
    severity: 'High',
    timestamp: '23 min ago',
    truck: 'T-0015',
    driver: 'James Brown',
    acknowledged: false,
    resolved: false
  },
  { 
    id: 3, 
    type: 'Maintenance Due', 
    message: 'Scheduled maintenance overdue for Truck T-0003 by 5 days',
    severity: 'Medium',
    timestamp: '1 hour ago',
    truck: 'T-0003',
    driver: 'Unassigned',
    acknowledged: true,
    resolved: false
  },
  { 
    id: 4, 
    type: 'Fuel Level Low', 
    message: 'Truck T-0015 fuel level at 15% - nearest fuel station 28 miles',
    severity: 'Medium',
    timestamp: '2 hours ago',
    truck: 'T-0015',
    driver: 'James Brown',
    acknowledged: true,
    resolved: false
  },
  { 
    id: 5, 
    type: 'Route Deviation', 
    message: 'Truck T-0021 deviated from planned route by 12 miles',
    severity: 'Low',
    timestamp: '3 hours ago',
    truck: 'T-0021',
    driver: 'Robert Wilson',
    acknowledged: false,
    resolved: false
  },
  { 
    id: 6, 
    type: 'Speed Alert', 
    message: 'Truck T-0008 exceeded speed limit (78 mph in 65 mph zone)',
    severity: 'Medium',
    timestamp: '4 hours ago',
    truck: 'T-0008',
    driver: 'Sarah Williams',
    acknowledged: true,
    resolved: true
  },
];

export const reports = [
  {
    id: 1,
    name: 'Driver Performance Report',
    description: 'Comprehensive analysis of driver metrics including on-time delivery rates, safety scores, and fuel efficiency.',
    type: 'Performance',
    lastGenerated: '2024-01-19',
    frequency: 'Weekly',
    size: '2.4 MB'
  },
  {
    id: 2,
    name: 'Fleet Utilization Report',
    description: 'Overview of fleet usage, idle time analysis, and vehicle availability metrics.',
    type: 'Operations',
    lastGenerated: '2024-01-18',
    frequency: 'Weekly',
    size: '1.8 MB'
  },
  {
    id: 3,
    name: 'Compliance Summary',
    description: 'DOT compliance status, hours of service violations, and regulatory adherence report.',
    type: 'Compliance',
    lastGenerated: '2024-01-15',
    frequency: 'Monthly',
    size: '3.1 MB'
  },
  {
    id: 4,
    name: 'Fuel Consumption Analysis',
    description: 'Detailed breakdown of fuel usage by vehicle, route, and driver with cost projections.',
    type: 'Analytics',
    lastGenerated: '2024-01-17',
    frequency: 'Weekly',
    size: '1.5 MB'
  },
  {
    id: 5,
    name: 'Maintenance Cost Report',
    description: 'Vehicle maintenance expenses, service history, and predictive maintenance recommendations.',
    type: 'Maintenance',
    lastGenerated: '2024-01-14',
    frequency: 'Monthly',
    size: '2.2 MB'
  },
];

export const recentAlerts = alerts.slice(0, 5);

export const activeTrips = trips;
