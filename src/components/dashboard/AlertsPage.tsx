import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Bell, CheckCircle, Clock, AlertTriangle, Droplets, Bug, Thermometer } from "lucide-react";
import ActionDialog from "./ActionDialog";

interface Alert {
  id: number;
  type: string;
  icon: typeof Droplets;
  title: string;
  description: string;
  severity: "High" | "Medium" | "Low";
  confidence: string;
  action: string;
  time: string;
  resolved: boolean;
  dialogContent: {
    title: string;
    description: string;
    details: { label: string; value: string }[];
  };
}

const initialAlerts: Alert[] = [
  {
    id: 1, type: "Irrigation", icon: Droplets,
    title: "Plot A needs irrigation in 4 hours",
    description: "Soil moisture has dropped to 32% — below the 40% threshold for Alphonso mangoes. Forecast shows no rain for 48 hours. Recommend scheduling drip irrigation for early morning.",
    severity: "High", confidence: "94%", action: "Schedule irrigation", time: "2 hours ago", resolved: false,
    dialogContent: {
      title: "Schedule Irrigation — Plot A",
      description: "Drip irrigation will be scheduled for tomorrow at 05:30 AM. Estimated duration: 45 minutes. Soil moisture target: 60%.",
      details: [
        { label: "Plot", value: "Plot A — Alphonso" },
        { label: "Current Moisture", value: "32%" },
        { label: "Target Moisture", value: "60%" },
        { label: "Scheduled Time", value: "Tomorrow, 05:30 AM" },
        { label: "Duration", value: "~45 minutes" },
      ],
    },
  },
  {
    id: 2, type: "Pest", icon: Bug,
    title: "Fruit fly activity detected near Plot B",
    description: "Climate pattern analysis shows 87% probability of Bactrocera dorsalis activity based on temperature (33°C) and humidity (68%). Neem-based traps recommended as organic-compliant solution.",
    severity: "Medium", confidence: "87%", action: "Deploy traps", time: "5 hours ago", resolved: false,
    dialogContent: {
      title: "Deploy Neem-Based Traps — Plot B",
      description: "Organic-compliant fruit fly traps will be deployed at 6 strategic locations around Plot B perimeter.",
      details: [
        { label: "Trap Type", value: "Neem-based pheromone traps" },
        { label: "Quantity", value: "6 units" },
        { label: "Coverage", value: "Plot B full perimeter" },
        { label: "Follow-up", value: "Auto-scheduled in 72 hours" },
      ],
    },
  },
  {
    id: 3, type: "Weather", icon: Thermometer,
    title: "Heatwave expected — 38°C for 3 days",
    description: "Extended heat forecast for your region. UV index expected to reach 10+. Shade nets on Plot C and increased irrigation frequency recommended to prevent sunburn damage on fruit.",
    severity: "High", confidence: "91%", action: "Activate shade nets", time: "Today, 06:00", resolved: false,
    dialogContent: {
      title: "Activate Shade Nets — Plot C",
      description: "Automated shade nets will be deployed to protect fruit from sun damage during the forecasted heatwave.",
      details: [
        { label: "Coverage", value: "Plot C — 3.2 ha" },
        { label: "UV Protection", value: "70% reduction" },
        { label: "Duration", value: "3 days (auto-retract)" },
        { label: "Irrigation Boost", value: "+20% frequency" },
      ],
    },
  },
  {
    id: 4, type: "Irrigation", icon: Droplets,
    title: "Plot C irrigation completed successfully",
    description: "Automated drip irrigation ran for 45 minutes. Soil moisture restored to 65%. GPS-stamped and verified for insurance log.",
    severity: "Low", confidence: "100%", action: "View log", time: "Yesterday", resolved: true,
    dialogContent: {
      title: "Irrigation Log — Plot C",
      description: "Completed irrigation session details and verification status.",
      details: [
        { label: "Duration", value: "45 minutes" },
        { label: "Moisture Before", value: "38%" },
        { label: "Moisture After", value: "65%" },
        { label: "GPS Verified", value: "Yes ✓" },
        { label: "Insurance Logged", value: "Yes ✓" },
      ],
    },
  },
  {
    id: 5, type: "Pest", icon: Bug,
    title: "Organic spray applied — Plot B cleared",
    description: "Neem-based treatment applied successfully. Follow-up scan in 72 hours recommended. Action verified and logged.",
    severity: "Low", confidence: "100%", action: "Schedule follow-up", time: "2 days ago", resolved: true,
    dialogContent: {
      title: "Schedule Follow-Up Scan — Plot B",
      description: "A follow-up pest scan will be scheduled to verify treatment effectiveness.",
      details: [
        { label: "Scan Type", value: "Visual + pheromone trap check" },
        { label: "Scheduled", value: "In 72 hours" },
        { label: "Plot", value: "Plot B — Kent" },
      ],
    },
  },
];

const severityColor: Record<string, string> = {
  High: "bg-destructive/10 text-destructive border-destructive/20",
  Medium: "bg-secondary/10 text-secondary border-secondary/20",
  Low: "bg-primary/10 text-primary border-primary/20",
};

const AlertsPage = () => {
  const [tab, setTab] = useState("All");
  const [alerts, setAlerts] = useState<Alert[]>(initialAlerts);
  const [dialogAlert, setDialogAlert] = useState<Alert | null>(null);

  const activeAlerts = alerts.filter((a) => !a.resolved);
  const resolvedAlerts = alerts.filter((a) => a.resolved);
  const filtered = tab === "All" ? alerts : alerts.filter((a) => a.type === tab);
  const filteredActive = filtered.filter((a) => !a.resolved);
  const filteredResolved = filtered.filter((a) => a.resolved);

  const handleResolveAlert = (id: number) => {
    setAlerts((prev) =>
      prev.map((a) =>
        a.id === id
          ? { ...a, resolved: true, severity: "Low" as const, time: "Just now", action: "View log" }
          : a
      )
    );
  };

  const renderAlertCard = (a: Alert, isResolved: boolean) => (
    <Card key={a.id} className={isResolved ? "opacity-75" : "border-l-4"} style={!isResolved ? { borderLeftColor: a.severity === "High" ? "hsl(var(--destructive))" : "hsl(var(--secondary))" } : undefined}>
      <CardContent className="p-4 space-y-3">
        <div className="flex items-start justify-between gap-2">
          <div className="flex items-start gap-3">
            <div className="mt-0.5 p-1.5 rounded-md bg-muted">
              {isResolved ? <CheckCircle size={16} className="text-primary" /> : <a.icon size={16} className="text-muted-foreground" />}
            </div>
            <div className="space-y-1">
              <p className="text-sm font-medium text-foreground">{a.title}</p>
              <p className="text-xs text-muted-foreground">{a.description}</p>
            </div>
          </div>
          {!isResolved && (
            <Badge variant="outline" className={`text-xs shrink-0 ${severityColor[a.severity]}`}>
              {a.severity}
            </Badge>
          )}
        </div>
        <div className="flex items-center justify-between pt-1">
          <div className="flex items-center gap-3">
            <span className="text-xs text-muted-foreground flex items-center gap-1">
              <Clock size={12} /> {a.time}
            </span>
            <span className="text-xs text-muted-foreground">Confidence: {a.confidence}</span>
          </div>
          <Button size="sm" variant="outline" className="h-7 text-xs" onClick={() => setDialogAlert(a)}>
            {a.action}
          </Button>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
          <Bell size={20} className="text-secondary" /> Smart Alerts
        </h2>
        <p className="text-sm text-muted-foreground">AI-powered recommendations with full reasoning</p>
      </div>

      <div className="grid grid-cols-3 gap-3">
        <Card><CardContent className="p-4 text-center"><p className="text-2xl font-bold text-destructive">{activeAlerts.length}</p><p className="text-xs text-muted-foreground">Active</p></CardContent></Card>
        <Card><CardContent className="p-4 text-center"><p className="text-2xl font-bold text-primary">{resolvedAlerts.length}</p><p className="text-xs text-muted-foreground">Resolved</p></CardContent></Card>
        <Card><CardContent className="p-4 text-center"><p className="text-2xl font-bold text-foreground">91%</p><p className="text-xs text-muted-foreground">Avg Confidence</p></CardContent></Card>
      </div>

      <Tabs value={tab} onValueChange={setTab}>
        <TabsList className="w-full justify-start h-auto flex-wrap gap-1 p-1">
          {["All", "Irrigation", "Pest", "Weather"].map((t) => (
            <TabsTrigger key={t} value={t} className="text-xs gap-1">
              {t === "Irrigation" && "💧"} {t === "Pest" && "🐛"} {t === "Weather" && "🌡️"} {t}
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value={tab} className="mt-4 space-y-6">
          {filteredActive.length > 0 && (
            <div className="space-y-3">
              <h3 className="text-sm font-semibold text-foreground flex items-center gap-2">
                <AlertTriangle size={14} className="text-secondary" /> Active Alerts
              </h3>
              {filteredActive.map((a) => renderAlertCard(a, false))}
            </div>
          )}
          {filteredResolved.length > 0 && (
            <div className="space-y-3">
              <h3 className="text-sm font-semibold text-foreground flex items-center gap-2">
                <CheckCircle size={14} className="text-primary" /> Resolved Today
              </h3>
              {filteredResolved.map((a) => renderAlertCard(a, true))}
            </div>
          )}
        </TabsContent>
      </Tabs>

      {dialogAlert && (
        <ActionDialog
          open={!!dialogAlert}
          onOpenChange={(open) => !open && setDialogAlert(null)}
          title={dialogAlert.dialogContent.title}
          description={dialogAlert.dialogContent.description}
          confirmLabel={dialogAlert.resolved ? "Done" : dialogAlert.action}
          variant={dialogAlert.resolved ? "view" : "action"}
          onConfirm={() => {
            if (!dialogAlert.resolved) {
              handleResolveAlert(dialogAlert.id);
            }
          }}
        >
          <div className="space-y-2">
            {dialogAlert.dialogContent.details.map((d) => (
              <div key={d.label} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                <span className="text-sm text-muted-foreground">{d.label}</span>
                <span className="text-sm font-medium text-foreground">{d.value}</span>
              </div>
            ))}
          </div>
        </ActionDialog>
      )}
    </div>
  );
};

export default AlertsPage;
