
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useUpdateTruck } from "@/hooks/useTrucks";

export function UpdateTruckDialog({ open, onClose, truck }: any) {
  const updateMutation = useUpdateTruck();

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);

    await updateMutation.mutateAsync({
      id: truck._id,
      payload: {
        licensePlate: fd.get("licensePlate"),
        make: fd.get("make"),
        model: fd.get("model"),
        year: Number(fd.get("year")),
        weight_capacity: Number(fd.get("weight_capacity")),
        fuelLevel: Number(fd.get("fuelLevel")),
        odometer: Number(fd.get("odometer")),
        color: fd.get("color"),
      },
    });

    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Update Truck</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input name="licensePlate" defaultValue={truck.licensePlate} />
          <Input name="make" defaultValue={truck.make} />
          <Input name="model" defaultValue={truck.model} />
          <Input name="year" type="number" defaultValue={truck.year} />
          <Input name="weight_capacity" type="number" defaultValue={truck.weight_capacity} />
          <Input name="fuelLevel" type="number" defaultValue={truck.fuelLevel} />
          <Input name="odometer" type="number" defaultValue={truck.odometer} />
          <Input name="color" defaultValue={truck.color} />

          <Button type="submit" className="w-full">
            Update Truck
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
