import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';

export default function Settings() {
  return (
    <div className="space-y-6 max-w-4xl">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-foreground">Settings</h2>
        <p className="text-muted-foreground">Manage your account and preferences</p>
      </div>

      {/* Profile Section */}
      <div className="bg-card rounded-xl border border-border p-6 space-y-6">
        <div>
          <h3 className="text-lg font-semibold text-foreground">Profile Information</h3>
          <p className="text-sm text-muted-foreground">Update your account details</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="fullName">Full Name</Label>
            <Input id="fullName" defaultValue="John Administrator" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" defaultValue="admin@demo.com" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone">Phone</Label>
            <Input id="phone" defaultValue="(555) 123-4567" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="role">Role</Label>
            <Input id="role" defaultValue="Administrator" disabled />
          </div>
        </div>

        <Button>Save Changes</Button>
      </div>

      {/* Notifications Section */}
      <div className="bg-card rounded-xl border border-border p-6 space-y-6">
        <div>
          <h3 className="text-lg font-semibold text-foreground">Notifications</h3>
          <p className="text-sm text-muted-foreground">Configure how you receive alerts</p>
        </div>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-foreground">Email Notifications</p>
              <p className="text-sm text-muted-foreground">Receive alerts via email</p>
            </div>
            <Switch defaultChecked />
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-foreground">Critical Alerts</p>
              <p className="text-sm text-muted-foreground">Get notified for critical issues</p>
            </div>
            <Switch defaultChecked />
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-foreground">Daily Summary</p>
              <p className="text-sm text-muted-foreground">Receive daily fleet summary</p>
            </div>
            <Switch />
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-foreground">Driver Updates</p>
              <p className="text-sm text-muted-foreground">Notifications for driver status changes</p>
            </div>
            <Switch defaultChecked />
          </div>
        </div>
      </div>

      {/* System Section */}
      <div className="bg-card rounded-xl border border-border p-6 space-y-6">
        <div>
          <h3 className="text-lg font-semibold text-foreground">System</h3>
          <p className="text-sm text-muted-foreground">Application settings</p>
        </div>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-foreground">Timezone</p>
              <p className="text-sm text-muted-foreground">America/Los_Angeles (PST)</p>
            </div>
            <Button variant="outline" size="sm">Change</Button>
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-foreground">Language</p>
              <p className="text-sm text-muted-foreground">English (US)</p>
            </div>
            <Button variant="outline" size="sm">Change</Button>
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-foreground">Version</p>
              <p className="text-sm text-muted-foreground">FleetPro v2.1.0</p>
            </div>
            <span className="status-badge status-active">Up to date</span>
          </div>
        </div>
      </div>
    </div>
  );
}
