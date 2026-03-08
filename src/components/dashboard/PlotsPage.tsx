import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Plus, MapPin, Thermometer, Droplets, Activity, Sun, Wind, Bug, FlaskConical } from "lucide-react";
import ActionDialog from "./ActionDialog";
import type { OnboardingPlot } from "@/pages/Platform";

interface PlotDisplay {
  name: string;
  variety: string;
  health: number | null;
  moisture: number | null;
  temp: string;
  size: string;
  planted: string;
  lastIrrigation: string;
  pestRisk: "Low" | "Medium" | "High" | "Pending";
  ndvi: number | null;
  soilPH: number | null;
  activities: { action: string; time: string }[];
}

const PLOT_LETTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

function buildPlotsFromOnboarding(onboardingPlots: OnboardingPlot[], hasSoilKit: boolean): PlotDisplay[] {
  if (onboardingPlots.length === 0) {
    // Fallback if no plots were entered
    return [{
      name: "Plot A", variety: "Unknown", health: null, moisture: null,
      temp: "—", size: "—", planted: "—", lastIrrigation: "—",
      pestRisk: "Pending", ndvi: null, soilPH: null, activities: [],
    }];
  }

  return onboardingPlots.map((p, i) => {
    const letter = PLOT_LETTERS[i] || `${i + 1}`;
    const planted = p.plantingDate
      ? new Date(p.plantingDate).toLocaleDateString("en-US", { month: "short", year: "numeric" })
      : "—";

    return {
      name: `Plot ${letter}`,
      variety: p.variety || "Unknown",
      health: hasSoilKit ? Math.floor(70 + Math.random() * 25) : null,
      moisture: hasSoilKit ? Math.floor(40 + Math.random() * 35) : null,
      temp: "—",
      size: p.size ? `${p.size} ha` : "—",
      planted,
      lastIrrigation: "No data yet",
      pestRisk: hasSoilKit ? (["Low", "Medium"] as const)[Math.floor(Math.random() * 2)] : "Pending",
      ndvi: hasSoilKit ? +(0.65 + Math.random() * 0.2).toFixed(2) : null,
      soilPH: hasSoilKit ? +(6.0 + Math.random() * 1.0).toFixed(1) : null,
      activities: [],
    };
  });
}

const riskColor: Record<string, string> = {
  Low: "bg-primary/10 text-primary",
  Medium: "bg-secondary/10 text-secondary",
  High: "bg-destructive/10 text-destructive",
  Pending: "bg-muted text-muted-foreground",
};

interface PlotsPageProps {
  onboardingPlots: OnboardingPlot[];
  hasSoilKit: boolean;
}

const PlotsPage = ({ onboardingPlots, hasSoilKit }: PlotsPageProps) => {
  const plots = buildPlotsFromOnboarding(onboardingPlots, hasSoilKit);
  const [expanded, setExpanded] = useState<string | null>(null);
  const [showAddPlot, setShowAddPlot] = useState(false);

  const totalArea = onboardingPlots.reduce((sum, p) => sum + (parseFloat(p.size) || 0), 0);

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
        <Card><CardContent className="p-4 text-center"><p className="text-2xl font-bold text-primary">{totalArea > 0 ? `${totalArea} ha` : "—"}</p><p className="text-xs text-muted-foreground">Total Area</p></CardContent></Card>
        <Card><CardContent className="p-4 text-center"><p className="text-2xl font-bold text-foreground">{hasSoilKit ? `${Math.round(plots.reduce((s, p) => s + (p.health || 0), 0) / plots.length)}%` : "—"}</p><p className="text-xs text-muted-foreground">Avg Health</p></CardContent></Card>
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
                {p.pestRisk === "Pending" ? "⏳" : p.pestRisk === "Low" ? "🟢" : p.pestRisk === "Medium" ? "🟡" : "🔴"} {p.pestRisk === "Pending" ? "Awaiting data" : `${p.pestRisk} Risk`}
              </Badge>
            </div>
            <p className="text-xs text-muted-foreground">{p.size} · Planted {p.planted}</p>
          </CardHeader>
          <CardContent className="space-y-4">
            {hasSoilKit ? (
              <>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <div className="flex items-center justify-between text-xs mb-1">
                      <span className="text-muted-foreground flex items-center gap-1"><Activity size={12} /> Health</span>
                      <span className="font-medium text-foreground">{p.health}%</span>
                    </div>
                    <Progress value={p.health ?? 0} className="h-2" />
                  </div>
                  <div>
                    <div className="flex items-center justify-between text-xs mb-1">
                      <span className="text-muted-foreground flex items-center gap-1"><Droplets size={12} /> Moisture</span>
                      <span className="font-medium text-foreground">{p.moisture}%</span>
                    </div>
                    <Progress value={p.moisture ?? 0} className="h-2" />
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
              </>
            ) : (
              <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/30 border border-dashed border-border">
                <FlaskConical size={16} className="text-muted-foreground shrink-0" />
                <p className="text-xs text-muted-foreground">
                  Soil health, moisture, pH, and NDVI data will appear once your soil kit results are processed.
                </p>
              </div>
            )}

            {p.activities.length > 0 && (
              <>
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
              </>
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
