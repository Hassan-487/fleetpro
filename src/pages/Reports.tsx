import { useState } from 'react';
import { reports } from '@/data/demoData';
import { Button } from '@/components/ui/button';
import { FileText, Download, Calendar, Clock, CheckCircle, BarChart3, Shield, Fuel, Wrench, TrendingUp } from 'lucide-react';
import { toast } from 'sonner';

const getTypeIcon = (type: string) => {
  switch (type) {
    case 'Performance':
      return TrendingUp;
    case 'Operations':
      return BarChart3;
    case 'Compliance':
      return Shield;
    case 'Analytics':
      return Fuel;
    case 'Maintenance':
      return Wrench;
    default:
      return FileText;
  }
};

const getTypeBadgeClass = (type: string) => {
  switch (type) {
    case 'Performance':
      return 'bg-success/10 text-success';
    case 'Operations':
      return 'bg-primary/10 text-primary';
    case 'Compliance':
      return 'bg-warning/10 text-warning';
    case 'Analytics':
      return 'bg-info/10 text-info';
    case 'Maintenance':
      return 'bg-accent/10 text-accent';
    default:
      return 'bg-muted text-muted-foreground';
  }
};

export default function Reports() {
  const [downloadingId, setDownloadingId] = useState<number | null>(null);

  const handleDownload = async (reportId: number, reportName: string) => {
    setDownloadingId(reportId);
    
    // Simulate download delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setDownloadingId(null);
    toast.success(`${reportName} downloaded successfully`, {
      description: 'The report has been saved to your downloads folder.'
    });
  };

  const handleGenerateReport = () => {
    toast.info('Report Generation', {
      description: 'This feature is available in the full version.'
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Reports</h2>
          <p className="text-muted-foreground">Generate and download fleet reports</p>
        </div>
        <Button className="gap-2" onClick={handleGenerateReport}>
          <FileText className="h-4 w-4" />
          Generate New Report
        </Button>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="kpi-card">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <FileText className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">12</p>
              <p className="text-sm text-muted-foreground">Reports this month</p>
            </div>
          </div>
        </div>
        <div className="kpi-card">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-success/10 flex items-center justify-center">
              <Download className="h-5 w-5 text-success" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">48</p>
              <p className="text-sm text-muted-foreground">Total downloads</p>
            </div>
          </div>
        </div>
        <div className="kpi-card">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-info/10 flex items-center justify-center">
              <Calendar className="h-5 w-5 text-info" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">Weekly</p>
              <p className="text-sm text-muted-foreground">Auto-generation</p>
            </div>
          </div>
        </div>
      </div>

      {/* Report Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {reports.map((report) => {
          const TypeIcon = getTypeIcon(report.type);
          const isDownloading = downloadingId === report.id;
          
          return (
            <div key={report.id} className="bg-card rounded-xl border border-border overflow-hidden hover:shadow-lg transition-shadow">
              {/* Card Header */}
              <div className="p-6 space-y-4">
                <div className="flex items-start justify-between">
                  <div className={`h-12 w-12 rounded-lg ${getTypeBadgeClass(report.type)} flex items-center justify-center`}>
                    <TypeIcon className="h-6 w-6" />
                  </div>
                  <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${getTypeBadgeClass(report.type)}`}>
                    {report.type}
                  </span>
                </div>
                
                <div>
                  <h3 className="font-semibold text-foreground text-lg mb-2">{report.name}</h3>
                  <p className="text-sm text-muted-foreground line-clamp-2">{report.description}</p>
                </div>

                {/* Meta Info */}
                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Calendar className="h-3.5 w-3.5" />
                    {report.lastGenerated}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="h-3.5 w-3.5" />
                    {report.frequency}
                  </span>
                </div>
              </div>

              {/* Card Footer */}
              <div className="px-6 py-4 bg-muted/30 border-t border-border flex items-center justify-between">
                <span className="text-sm text-muted-foreground">
                  {report.size}
                </span>
                <Button 
                  size="sm" 
                  className="gap-2"
                  onClick={() => handleDownload(report.id, report.name)}
                  disabled={isDownloading}
                >
                  {isDownloading ? (
                    <>
                      <div className="h-4 w-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                      Downloading...
                    </>
                  ) : (
                    <>
                      <Download className="h-4 w-4" />
                      Download PDF
                    </>
                  )}
                </Button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Recent Downloads */}
      <div className="bg-card rounded-xl border border-border overflow-hidden">
        <div className="px-6 py-4 border-b border-border">
          <h3 className="text-lg font-semibold text-foreground">Recent Downloads</h3>
        </div>
        <div className="divide-y divide-border">
          {[
            { name: 'Driver Performance Report', date: 'Today, 2:30 PM', user: 'John Administrator' },
            { name: 'Fleet Utilization Report', date: 'Yesterday, 4:15 PM', user: 'John Administrator' },
            { name: 'Compliance Summary', date: 'Jan 15, 10:00 AM', user: 'John Administrator' },
          ].map((download, index) => (
            <div key={index} className="px-6 py-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-lg bg-muted flex items-center justify-center">
                  <FileText className="h-5 w-5 text-muted-foreground" />
                </div>
                <div>
                  <p className="font-medium text-foreground">{download.name}</p>
                  <p className="text-sm text-muted-foreground">{download.user}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-sm text-muted-foreground">{download.date}</span>
                <CheckCircle className="h-5 w-5 text-success" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
