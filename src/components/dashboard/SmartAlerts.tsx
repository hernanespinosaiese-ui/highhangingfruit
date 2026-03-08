import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";
import ActionDialog from "./ActionDialog";

interface SmartAlert {
  id: number;
  type: string;
  title: string;
  severity: string;
  confidence: string;
  action: string;
  dialogTitle: string;
  dialogDesc: string;
  dialogDetails: { label: string; value: string }[];
  resolved: boolean;
}

const initialAlerts: SmartAlert[] = [
  {
    id: 1, type: "Irrigation", title: "Plot A needs irrigation in 4 hours",
    severity: "High", confidence: "94%", action: "Schedule irrigation",
    dialogTitle: "Schedule Irrigation — Plot A",
    dialogDesc: "Drip irrigation will run tomorrow at 05:30 AM for ~45 minutes.",
    dialogDetails: [
      { label: "Plot", value: "Plot A — Alphonso" },
      { label: "Current Moisture", value: "32%" },
      { label: "Target", value: "60%" },
      { label: "Time", value: "Tomorrow, 05:30 AM" },
    ],
    resolved: false,
  },
  {
    id: 2, type: "Pest", title: "Fruit fly activity detected near Plot B",
    severity: "Medium", confidence: "87%", action: "Deploy traps",
    dialogTitle: "Deploy Traps — Plot B",
    dialogDesc: "Neem-based pheromone traps at 6 perimeter locations.",
    dialogDetails: [
      { label: "Trap Type", value: "Neem-based pheromone" },
      { label: "Quantity", value: "6 units" },
      { label: "Follow-up", value: "72 hours" },
    ],
    resolved: false,
  },
  {
    id: 3, type: "Weather", title: "Heatwave expected — 38°C for 3 days",
    severity: "High", confidence: "91%", action: "Activate shade nets",
    dialogTitle: "Activate Shade Nets — Plot C",
    dialogDesc: "Shade nets will deploy for 3 days with auto-retract.",
    dialogDetails: [
      { label: "Coverage", value: "Plot C — 3.2 ha" },
      { label: "UV Reduction", value: "70%" },
      { label: "Duration", value: "3 days" },
    ],
    resolved: false,
  },
];

const severityColor: Record<string, string> = {
  High: "bg-destructive/10 text-destructive",
  Medium: "bg-secondary/10 text-secondary",
  Low: "bg-primary/10 text-primary",
};

const SmartAlerts = () => {
  const [tab, setTab] = useState("All");
  const [alerts, setAlerts] = useState<SmartAlert[]>(initialAlerts);
  const [dialogAlert, setDialogAlert] = useState<SmartAlert | null>(null);

  const filtered = tab === "All" ? alerts : alerts.filter((a) => a.type === tab);
  const active = filtered.filter((a) => !a.resolved);
  const resolved = filtered.filter((a) => a.resolved);

  const handleResolve = (id: number) => {
    setAlerts((prev) =>
      prev.map((a) =>
        a.id === id ? { ...a, resolved: true, severity: "Low", action: "View log" } : a
      )
    );
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-base">🤖 Smart Alerts</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs value={tab} onValueChange={setTab}>
          <TabsList className="w-full justify-start mb-4 h-auto flex-wrap gap-1 p-1">
            {["All", "Irrigation", "Pest", "Weather"].map((t) => (
              <TabsTrigger key={t} value={t} className="text-xs">{t}</TabsTrigger>
            ))}
          </TabsList>
          <TabsContent value={tab} className="mt-0 space-y-4">
            {active.length > 0 && (
              <div className="space-y-3">
                {active.map((a) => (
                  <div key={a.id} className="p-3 rounded-lg border border-border space-y-2">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium text-foreground">{a.title}</p>
                      <Badge variant="outline" className={`text-xs ${severityColor[a.severity]}`}>{a.severity}</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-muted-foreground">AI Confidence: {a.confidence}</span>
                      <Button size="sm" variant="outline" className="h-7 text-xs" onClick={() => setDialogAlert(a)}>{a.action}</Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
            {resolved.length > 0 && (
              <div className="space-y-3">
                <h4 className="text-xs font-semibold text-muted-foreground flex items-center gap-1">
                  <CheckCircle size={12} className="text-primary" /> Resolved Today
                </h4>
                {resolved.map((a) => (
                  <div key={a.id} className="p-3 rounded-lg border border-border opacity-75 space-y-2">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium text-foreground">{a.title}</p>
                      <CheckCircle size={14} className="text-primary" />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-muted-foreground">Completed</span>
                      <Button size="sm" variant="outline" className="h-7 text-xs" onClick={() => setDialogAlert(a)}>View log</Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </CardContent>

      {dialogAlert && (
        <ActionDialog
          open={!!dialogAlert}
          onOpenChange={(open) => !open && setDialogAlert(null)}
          title={dialogAlert.dialogTitle}
          description={dialogAlert.dialogDesc}
          confirmLabel={dialogAlert.resolved ? "Done" : dialogAlert.action}
          variant={dialogAlert.resolved ? "view" : "action"}
          onConfirm={() => {
            if (!dialogAlert.resolved) {
              handleResolve(dialogAlert.id);
            }
          }}
        >
          <div className="space-y-2">
            {dialogAlert.dialogDetails.map((d) => (
              <div key={d.label} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                <span className="text-sm text-muted-foreground">{d.label}</span>
                <span className="text-sm font-medium text-foreground">{d.value}</span>
              </div>
            ))}
          </div>
        </ActionDialog>
      )}
    </Card>
  );
};

export default SmartAlerts;
