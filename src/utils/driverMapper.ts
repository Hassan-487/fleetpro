import { Driver } from "@/api/driver.api";
import { UIDriver } from "@/types/uiDriver";

export function mapDriverToUI(driver: Driver): UIDriver {
  return {
    id: driver._id,
    name: `${driver.firstName} ${driver.lastName}`,
    phone: driver.phoneNumber,
    email: driver.email,
    status:
      driver.employmentStatus === "on_leave"
        ? "On Leave"
        : driver.employmentStatus === "inactive"
        ? "Inactive"
        : "Active",
    truck: driver.assignedTruck?.truckNumber ?? "Unassigned",
    trips: driver.performanceMetrics?.totalTrips ?? 0,
    performanceScore: driver.performanceMetrics?.safetyScore ?? 0,
    licenseNumber: driver.licenseNumber,
    licenseExpiry: driver.licenseExpiry
      ? new Date(driver.licenseExpiry).toLocaleDateString()
      : "-",
    hireDate: new Date(driver.createdAt).toLocaleDateString(),
    totalMiles: driver.performanceMetrics?.totalDrivingHours ?? 0,
    onTimeDelivery: driver.performanceMetrics?.completedOnTime ?? 0,
    safetyScore: driver.performanceMetrics?.safetyScore ?? 0,
   
  };
}
