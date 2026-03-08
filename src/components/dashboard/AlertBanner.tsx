import { AlertCircle } from "lucide-react";

const AlertBanner = () => (
  <div className="flex items-center gap-3 p-4 rounded-lg bg-secondary/10 border border-secondary/20">
    <AlertCircle size={20} className="text-secondary shrink-0" />
    <div>
      <p className="font-semibold text-foreground text-sm">3 Active Alerts</p>
      <p className="text-xs text-muted-foreground">Irrigation, pest risk, and weather advisory require attention</p>
    </div>
  </div>
);

export default AlertBanner;
