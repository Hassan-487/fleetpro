import { useState, useMemo } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useTrucks } from "@/hooks/useTrucks";
import { useDrivers } from "@/hooks/useDrivers";
import { useCreateTrip } from "@/hooks/useTrips";

export function CreateTripDialog({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { trucks } = useTrucks();
  const { drivers } = useDrivers();
  const { mutateAsync, isPending } = useCreateTrip();

  const availableTrucks = useMemo(() => trucks.filter((t: any) => t.status === "available"), [trucks]);
  const availableDrivers = useMemo(() => drivers.filter((d: any) => d.isActive && d.employmentStatus === "active"), [drivers]);

  const [form, setForm] = useState({
    origin: "", destination: "", truckId: "", driverId: "",
    weight: "", estimatedHours: "", cargoDescription: ""
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      driverId: form.driverId, // Match tripController.createTrip
      truckId: form.truckId,   // Match tripController.createTrip
      origin: form.origin,
      destination: form.destination,
      weight: Number(form.weight),
      estimatedHours: Number(form.estimatedHours),
      cargoDescription: form.cargoDescription
    };

    try {
      await mutateAsync(payload);
      onClose();
      setForm({ origin: "", destination: "", truckId: "", driverId: "", weight: "", estimatedHours: "", cargoDescription: "" });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-xl">
        <DialogHeader><DialogTitle>Create New Trip</DialogTitle></DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 pt-2">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1"><Label>Origin</Label><Input value={form.origin} onChange={e => setForm({...form, origin: e.target.value})} required /></div>
            <div className="space-y-1"><Label>Destination</Label><Input value={form.destination} onChange={e => setForm({...form, destination: e.target.value})} required /></div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <Label>Truck</Label>
              <Select onValueChange={v => setForm({...form, truckId: v})} required>
                <SelectTrigger><SelectValue placeholder="Select Truck" /></SelectTrigger>
                <SelectContent>{availableTrucks.map((t:any) => <SelectItem key={t._id} value={t._id}>{t.licensePlate}</SelectItem>)}</SelectContent>
              </Select>
            </div>
            <div className="space-y-1">
              <Label>Driver</Label>
              <Select onValueChange={v => setForm({...form, driverId: v})} required>
                <SelectTrigger><SelectValue placeholder="Select Driver" /></SelectTrigger>
                <SelectContent>{availableDrivers.map((d:any) => <SelectItem key={d._id} value={d._id}>{d.firstName} {d.lastName}</SelectItem>)}</SelectContent>
              </Select>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1"><Label>Weight (kg)</Label><Input type="number" value={form.weight} onChange={e => setForm({...form, weight: e.target.value})} required /></div>
            <div className="space-y-1"><Label>Duration (Hours)</Label><Input type="number" value={form.estimatedHours} onChange={e => setForm({...form, estimatedHours: e.target.value})} required /></div>
          </div>
          <div className="space-y-1">
    <Label>Cargo Description</Label>
    <Input 
      placeholder="e.g. Frozen poultry, Industrial parts" 
      value={form.cargoDescription} 
      onChange={e => setForm({...form, cargoDescription: e.target.value})} 
      required 
    />
  </div>
          <DialogFooter className="pt-4"><Button type="submit" disabled={isPending}>{isPending ? "Creating..." : "Schedule Trip"}</Button></DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}