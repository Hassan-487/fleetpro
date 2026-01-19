import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useUpdateTrip } from "@/hooks/useTrips";

export function UpdateTripDialog({ open, onClose, trip }: any) {
  const { mutateAsync, isPending } = useUpdateTrip();
  const [form, setForm] = useState({
    origin: trip.origin,
    destination: trip.destination,
    weight: trip.weight,
    estimatedHours: trip.estimatedHours
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await mutateAsync({
      id: trip.id,
      payload: { ...form, weight: Number(form.weight), estimatedHours: Number(form.estimatedHours) }
    });
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader><DialogTitle>Update Trip Details</DialogTitle></DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 pt-2">
          <div className="space-y-1"><Label>Origin</Label><Input value={form.origin} onChange={e => setForm({...form, origin: e.target.value})} /></div>
          <div className="space-y-1"><Label>Destination</Label><Input value={form.destination} onChange={e => setForm({...form, destination: e.target.value})} /></div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1"><Label>Weight</Label><Input type="number" value={form.weight} onChange={e => setForm({...form, weight: e.target.value})} /></div>
            <div className="space-y-1"><Label>Hours</Label><Input type="number" value={form.estimatedHours} onChange={e => setForm({...form, estimatedHours: e.target.value})} /></div>
          </div>
          <DialogFooter className="pt-4"><Button type="submit" disabled={isPending}>Save Changes</Button></DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}