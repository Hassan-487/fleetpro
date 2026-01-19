import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useDrivers } from "@/hooks/useDrivers";
import { Loader2 } from "lucide-react";

export function AddDriverDialog({ open, onClose }: any) {
  const { createDriver } = useDrivers();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState<any>({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    licenseNumber: "",
    employmentStatus: "active",
    emergencyContact: { name: "", phoneNumber: "", relationship: "" },
  });

  const submit = async () => {
    try {
      setLoading(true);
      await createDriver(form);
      setForm({}); // Reset form
      onClose();
    } catch (error) {
      console.error("Failed to create driver:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-xl">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">Register New Driver</DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-2 gap-4 py-4">
          {/* Personal Info */}
          <div className="space-y-2">
            <Label htmlFor="firstName">First Name</Label>
            <Input
              id="firstName"
              placeholder="John"
              value={form.firstName || ""}
              onChange={(e) => setForm({ ...form, firstName: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="lastName">Last Name</Label>
            <Input
              id="lastName"
              placeholder="Doe"
              value={form.lastName || ""}
              onChange={(e) => setForm({ ...form, lastName: e.target.value })}
            />
          </div>

          <div className="space-y-2 col-span-2 sm:col-span-1">
            <Label htmlFor="email">Email Address</Label>
            <Input
              id="email"
              type="email"
              placeholder="john@example.com"
              value={form.email || ""}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
          </div>

          <div className="space-y-2 col-span-2 sm:col-span-1">
            <Label htmlFor="phone">Phone Number</Label>
            <Input
              id="phone"
              placeholder="+1 (555) 000-0000"
              value={form.phoneNumber || ""}
              onChange={(e) => setForm({ ...form, phoneNumber: e.target.value })}
            />
          </div>

          <div className="space-y-2 col-span-2">
            <Label htmlFor="license">CDL / License Number</Label>
            <Input
              id="license"
              placeholder="E.g. A1234567"
              value={form.licenseNumber || ""}
              onChange={(e) => setForm({ ...form, licenseNumber: e.target.value })}
            />
          </div>

          {/* Emergency Contact Section */}
          <div className="col-span-2 pt-4 border-t mt-2">
            <h4 className="text-sm font-semibold mb-3">Emergency Contact</h4>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Input
                  placeholder="Contact Name"
                  value={form.emergencyContact?.name || ""}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      emergencyContact: { ...form.emergencyContact, name: e.target.value },
                    })
                  }
                />
              </div>
              <div className="space-y-2">
                <Input
                  placeholder="Contact Phone"
                  value={form.emergencyContact?.phoneNumber || ""}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      emergencyContact: { ...form.emergencyContact, phoneNumber: e.target.value },
                    })
                  }
                />
              </div>
            </div>
          </div>
        </div>

        <DialogFooter className="gap-2 sm:gap-0">
          <Button variant="outline" onClick={onClose} disabled={loading}>
            Cancel
          </Button>
          <Button onClick={submit} disabled={loading}>
            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Create Driver Profile
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}