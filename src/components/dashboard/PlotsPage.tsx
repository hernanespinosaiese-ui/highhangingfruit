import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Plus, MapPin, Thermometer, Droplets, Activity, Sun, Wind, Bug } from "lucide-react";
import ActionDialog from "./ActionDialog";

interface PlotDetail {
  name: string;
  variety: string;
  health: number;
  moisture: number;
  temp: string;
  size: string;
  planted: string;
  lastIrrigation: string;
  pestRisk: "Low" | "Medium" | "High";
  ndvi: number;
  soilPH: number;
  activities: { action: string; time: string }[];
}

const plots: PlotDetail[] = [
  {
    name: "Plot A",
    variety: "Alphonso",
    health: 92,
    moisture: 68,
    temp: "31°C",
    size: "2.5 ha",
    planted: "Mar 2022",
    lastIrrigation: "Today, 06:30",
    pestRisk: "Low",
    ndvi: 0.82,
    soilPH: 6.5,
    activities: [
      { action: "Irrigation completed", time: "Today, 06:30" },
      { action: "Soil sample collected", time: "Mar 5" },
      { action: "Pruning — lower branches", time: "Mar 2" },
    ],
  },
  {
    name: "Plot B",
    variety: "Kent",
    health: 78,
    moisture: 45,
    temp: "33°C",
    size: "1.8 ha",
    planted: "Jun 2021",
    lastIrrigation: "Yesterday, 17:00",
    pestRisk: "Medium",
    ndvi: 0.71,
    soilPH: 6.2,
    activities: [
      { action: "Organic spray applied", time: "Yesterday, 14:00" },
      { action: "Fruit fly trap deployed", time: "Mar 4" },
      { action: "Fertilizer — NPK organic", time: "Mar 1" },
    ],
  },
  {
    name: "Plot C",
    variety: "Keitt",
    health: 85,
    moisture: 72,
    temp: "30°C",
    size: "3.2 ha",
    planted: "Jan 2023",
    lastIrrigation: "Today, 05:45",
    pestRisk: "Low",
    ndvi: 0.78,
    soilPH: 6.8,
    activities: [
      { action: "Shade nets activated", time: "Today, 07:00" },
      { action: "GPS boundary logged", time: "Mar 5" },
      { action: "Mulching applied", time: "Mar 3" },
    ],
  },
];

const riskColor: Record<string, string> = {
  Low: "bg-primary/10 text-primary",
  Medium: "bg-secondary/10 text-secondary",
  High: "bg-destructive/10 text-destructive",
};

const PlotsPage = () => {
  const [expanded, setExpanded] = useState<string | null>(null);
  const [showAddPlot, setShowAddPlot] = useState(false);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h2 className="text-xl font-bold text-foreground">🌳 My Plots</h2>
          <p className="text-sm text-muted-foreground">Real-time soil, temperature & health monitoring</p>
        </div>
        <Button variant="outline" size="sm" className="gap-1" onClick={() => setShowAddPlot(true)}>
          <Plus size={14} /> Add New Plot
        </Button>
      </div>

      <div className="grid grid-cols-3 gap-3">
        <Card><CardContent className="p-4 text-center"><p className="text-2xl font-bold text-foreground">{plots.length}</p><p className="text-xs text-muted-foreground">Active Plots</p></CardContent></Card>
        <Card><CardContent className="p-4 text-center"><p className="text-2xl font-bold text-primary">7.5 ha</p><p className="text-xs text-muted-foreground">Total Area</p></CardContent></Card>
        <Card><CardContent className="p-4 text-center"><p className="text-2xl font-bold text-foreground">85%</p><p className="text-xs text-muted-foreground">Avg Health</p></CardContent></Card>
      </div>

      {plots.map((p) => (
        <Card key={p.name} className="overflow-hidden">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-base flex items-center gap-2">
                <MapPin size={16} className="text-primary" />
                {p.name} — {p.variety}
              </CardTitle>
              <Badge variant="outline" className={`text-xs ${riskColor[p.pestRisk]}`}>
                {p.pestRisk === "Low" ? "🟢" : p.pestRisk === "Medium" ? "🟡" : "🔴"} {p.pestRisk} Risk
              </Badge>
            </div>
            <p className="text-xs text-muted-foreground">{p.size} · Planted {p.planted}</p>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="text-muted-foreground flex items-center gap-1"><Activity size={12} /> Health</span>
                  <span className="font-medium text-foreground">{p.health}%</span>
                </div>
                <Progress value={p.health} className="h-2" />
              </div>
              <div>
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="text-muted-foreground flex items-center gap-1"><Droplets size={12} /> Moisture</span>
                  <span className="font-medium text-foreground">{p.moisture}%</span>
                </div>
                <Progress value={p.moisture} className="h-2" />
              </div>
            </div>

            <div className="grid grid-cols-4 gap-2">
              <div className="text-center p-2 rounded-md bg-muted/50">
                <Thermometer size={14} className="mx-auto mb-1 text-muted-foreground" />
                <p className="text-xs font-semibold text-foreground">{p.temp}</p>
                <p className="text-[10px] text-muted-foreground">Temp</p>
              </div>
              <div className="text-center p-2 rounded-md bg-muted/50">
                <Sun size={14} className="mx-auto mb-1 text-muted-foreground" />
                <p className="text-xs font-semibold text-foreground">{p.ndvi}</p>
                <p className="text-[10px] text-muted-foreground">NDVI</p>
              </div>
              <div className="text-center p-2 rounded-md bg-muted/50">
                <Wind size={14} className="mx-auto mb-1 text-muted-foreground" />
                <p className="text-xs font-semibold text-foreground">{p.soilPH}</p>
                <p className="text-[10px] text-muted-foreground">Soil pH</p>
              </div>
              <div className="text-center p-2 rounded-md bg-muted/50">
                <Bug size={14} className="mx-auto mb-1 text-muted-foreground" />
                <p className="text-xs font-semibold text-foreground">{p.pestRisk}</p>
                <p className="text-[10px] text-muted-foreground">Pest Risk</p>
              </div>
            </div>

            <Button
              variant="ghost"
              size="sm"
              className="w-full text-xs"
              onClick={() => setExpanded(expanded === p.name ? null : p.name)}
            >
              {expanded === p.name ? "Hide Activity" : "View Recent Activity"}
            </Button>

            {expanded === p.name && (
              <div className="space-y-2 pt-2 border-t border-border">
                <p className="text-xs font-semibold text-muted-foreground">Recent Activity</p>
                {p.activities.map((act, i) => (
                  <div key={i} className="flex items-center justify-between text-xs">
                    <span className="text-foreground">{act.action}</span>
                    <span className="text-muted-foreground">{act.time}</span>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      ))}

      <ActionDialog
        open={showAddPlot}
        onOpenChange={setShowAddPlot}
        title="Add New Plot"
        description="Register a new plot to start monitoring soil, weather, and crop health."
        confirmLabel="Add Plot"
        variant="action"
      >
        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Plot Name</label>
            <input className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm" placeholder="e.g. Plot D" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Variety</label>
            <input className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm" placeholder="e.g. Alphonso, Kent, Keitt" />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Size (hectares)</label>
              <input className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm" placeholder="e.g. 2.5" type="number" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Planted Date</label>
              <input className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm" placeholder="e.g. Jan 2023" />
            </div>
          </div>
        </div>
      </ActionDialog>
    </div>
  );
};

export default PlotsPage;
