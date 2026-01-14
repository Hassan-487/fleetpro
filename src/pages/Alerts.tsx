import { useState } from 'react';
import { alerts as initialAlerts } from '@/data/demoData';
import { Button } from '@/components/ui/button';
import { Search, Filter, AlertTriangle, Clock, Truck, User, CheckCircle, XCircle } from 'lucide-react';
import { Input } from '@/components/ui/input';

const getSeverityStyles = (severity: string) => {
  switch (severity) {
    case 'High':
      return {
        badge: 'bg-destructive/10 text-destructive border-destructive/20',
        border: 'border-l-destructive',
        icon: 'text-destructive'
      };
    case 'Medium':
      return {
        badge: 'bg-warning/10 text-warning border-warning/20',
        border: 'border-l-warning',
        icon: 'text-warning'
      };
    case 'Low':
      return {
        badge: 'bg-info/10 text-info border-info/20',
        border: 'border-l-info',
        icon: 'text-info'
      };
    default:
      return {
        badge: 'bg-muted text-muted-foreground',
        border: 'border-l-muted',
        icon: 'text-muted-foreground'
      };
  }
};

const getTypeIcon = (type: string) => {
  switch (type) {
    case 'Delay Risk':
      return Clock;
    case 'Extended Stop':
      return AlertTriangle;
    default:
      return AlertTriangle;
  }
};

export default function Alerts() {
  const [alertsList, setAlertsList] = useState(initialAlerts);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState<'all' | 'active' | 'acknowledged' | 'resolved'>('all');

  const handleAcknowledge = (id: number) => {
    setAlertsList(prev => prev.map(alert => 
      alert.id === id ? { ...alert, acknowledged: true } : alert
    ));
  };

  const handleResolve = (id: number) => {
    setAlertsList(prev => prev.map(alert => 
      alert.id === id ? { ...alert, resolved: true, acknowledged: true } : alert
    ));
  };

  const filteredAlerts = alertsList.filter(alert => {
    const matchesSearch = 
      alert.message.toLowerCase().includes(searchTerm.toLowerCase()) ||
      alert.truck.toLowerCase().includes(searchTerm.toLowerCase()) ||
      alert.type.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (filter === 'all') return matchesSearch;
    if (filter === 'active') return matchesSearch && !alert.acknowledged && !alert.resolved;
    if (filter === 'acknowledged') return matchesSearch && alert.acknowledged && !alert.resolved;
    if (filter === 'resolved') return matchesSearch && alert.resolved;
    return matchesSearch;
  });

  const activeCount = alertsList.filter(a => !a.acknowledged && !a.resolved).length;
  const acknowledgedCount = alertsList.filter(a => a.acknowledged && !a.resolved).length;
  const resolvedCount = alertsList.filter(a => a.resolved).length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Alerts</h2>
          <p className="text-muted-foreground">Monitor fleet warnings and notifications</p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <button 
          onClick={() => setFilter('all')}
          className={`kpi-card text-left transition-all ${filter === 'all' ? 'ring-2 ring-primary' : ''}`}
        >
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-muted flex items-center justify-center">
              <span className="text-lg font-bold text-foreground">{alertsList.length}</span>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Total Alerts</p>
              <p className="font-semibold text-foreground">All</p>
            </div>
          </div>
        </button>
        <button 
          onClick={() => setFilter('active')}
          className={`kpi-card text-left transition-all ${filter === 'active' ? 'ring-2 ring-destructive' : ''}`}
        >
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-destructive/10 flex items-center justify-center">
              <span className="text-lg font-bold text-destructive">{activeCount}</span>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Active</p>
              <p className="font-semibold text-foreground">Requires action</p>
            </div>
          </div>
        </button>
        <button 
          onClick={() => setFilter('acknowledged')}
          className={`kpi-card text-left transition-all ${filter === 'acknowledged' ? 'ring-2 ring-warning' : ''}`}
        >
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-warning/10 flex items-center justify-center">
              <span className="text-lg font-bold text-warning">{acknowledgedCount}</span>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Acknowledged</p>
              <p className="font-semibold text-foreground">In progress</p>
            </div>
          </div>
        </button>
        <button 
          onClick={() => setFilter('resolved')}
          className={`kpi-card text-left transition-all ${filter === 'resolved' ? 'ring-2 ring-success' : ''}`}
        >
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-success/10 flex items-center justify-center">
              <span className="text-lg font-bold text-success">{resolvedCount}</span>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Resolved</p>
              <p className="font-semibold text-foreground">Completed</p>
            </div>
          </div>
        </button>
      </div>

      {/* Search */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input 
          placeholder="Search alerts..." 
          className="pl-10"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Alert Cards */}
      <div className="space-y-4">
        {filteredAlerts.map((alert) => {
          const styles = getSeverityStyles(alert.severity);
          const TypeIcon = getTypeIcon(alert.type);
          
          return (
            <div 
              key={alert.id} 
              className={`bg-card rounded-xl border border-border border-l-4 ${styles.border} p-5 transition-all ${
                alert.resolved ? 'opacity-60' : ''
              }`}
            >
              <div className="flex flex-col lg:flex-row lg:items-start gap-4">
                {/* Icon & Content */}
                <div className="flex items-start gap-4 flex-1">
                  <div className={`h-10 w-10 rounded-lg ${styles.badge} flex items-center justify-center flex-shrink-0`}>
                    <TypeIcon className={`h-5 w-5 ${styles.icon}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap mb-1">
                      <span className="font-semibold text-foreground">{alert.type}</span>
                      <span className={`px-2 py-0.5 rounded text-xs font-medium border ${styles.badge}`}>
                        {alert.severity}
                      </span>
                      {alert.acknowledged && !alert.resolved && (
                        <span className="px-2 py-0.5 rounded text-xs font-medium bg-warning/10 text-warning">
                          Acknowledged
                        </span>
                      )}
                      {alert.resolved && (
                        <span className="px-2 py-0.5 rounded text-xs font-medium bg-success/10 text-success">
                          Resolved
                        </span>
                      )}
                    </div>
                    <p className="text-foreground mb-2">{alert.message}</p>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Truck className="h-3.5 w-3.5" />
                        {alert.truck}
                      </span>
                      <span className="flex items-center gap-1">
                        <User className="h-3.5 w-3.5" />
                        {alert.driver}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-3.5 w-3.5" />
                        {alert.timestamp}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 lg:flex-shrink-0">
                  {!alert.acknowledged && !alert.resolved && (
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="gap-2"
                      onClick={() => handleAcknowledge(alert.id)}
                    >
                      <CheckCircle className="h-4 w-4" />
                      Acknowledge
                    </Button>
                  )}
                  {!alert.resolved && (
                    <Button 
                      variant="default" 
                      size="sm" 
                      className="gap-2"
                      onClick={() => handleResolve(alert.id)}
                    >
                      <XCircle className="h-4 w-4" />
                      Resolve
                    </Button>
                  )}
                  {alert.resolved && (
                    <span className="text-sm text-success flex items-center gap-1">
                      <CheckCircle className="h-4 w-4" />
                      Resolved
                    </span>
                  )}
                </div>
              </div>
            </div>
          );
        })}

        {filteredAlerts.length === 0 && (
          <div className="text-center py-12 text-muted-foreground">
            <AlertTriangle className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p>No alerts found matching your criteria</p>
          </div>
        )}
      </div>
    </div>
  );
}
