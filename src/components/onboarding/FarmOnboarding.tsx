import { useState } from "react";
import { motion } from "framer-motion";
import { Plus, Trash2, Rocket } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import type { FarmOnboardingData, OnboardingPlot } from "@/pages/Platform";

const REGIONS = ["Axarquía (Málaga)", "Costa Tropical (Granada)", "Valle del Guadalhorce", "Huelva", "Cádiz", "Almería"];
const VARIETIES = ["Alphonso", "Kent", "Tommy Atkins", "Keitt", "Haden", "Ataulfo", "Kesar"];

interface FarmOnboardingProps {
  onComplete: (data: FarmOnboardingData) => void;
}

const FarmOnboarding = ({ onComplete }: FarmOnboardingProps) => {
  const [farmName, setFarmName] = useState("");
  const [farmSize, setFarmSize] = useState("");
  const [region, setRegion] = useState("");
  const [plots, setPlots] = useState<OnboardingPlot[]>([
    { id: "1", variety: "", plantingDate: "", size: "" },
  ]);
  const [notifications, setNotifications] = useState({
    water: true,
    pest: true,
    heatwave: false,
  });

  const addPlot = () => {
    setPlots([...plots, { id: Date.now().toString(), variety: "", plantingDate: "", size: "" }]);
  };

  const removePlot = (id: string) => {
    if (plots.length > 1) setPlots(plots.filter((p) => p.id !== id));
  };

  const updatePlot = (id: string, field: keyof OnboardingPlot, value: string) => {
    setPlots(plots.map((p) => (p.id === id ? { ...p, [field]: value } : p)));
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-2xl"
      >
        <Card>
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">Set Up Your Farm</CardTitle>
            <p className="text-muted-foreground text-sm">Tell us about your operation</p>
          </CardHeader>
          <CardContent className="space-y-8">
            {/* Farm Details */}
            <div className="space-y-4">
              <h3 className="font-semibold text-foreground flex items-center gap-2">🌍 Farm Details</h3>
              <Input placeholder="Farm name" value={farmName} onChange={(e) => setFarmName(e.target.value)} />
              <Input placeholder="Size (hectares)" type="number" value={farmSize} onChange={(e) => setFarmSize(e.target.value)} />
              <Select value={region} onValueChange={setRegion}>
                <SelectTrigger><SelectValue placeholder="Select region" /></SelectTrigger>
                <SelectContent>
                  {REGIONS.map((r) => (
                    <SelectItem key={r} value={r}>{r}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Plots */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-foreground flex items-center gap-2">🌱 Plots</h3>
                <Button variant="outline" size="sm" onClick={addPlot} className="gap-1">
                  <Plus size={14} /> Add Plot
                </Button>
              </div>
              {plots.map((plot, i) => (
                <div key={plot.id} className="p-4 rounded-lg border border-border space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-foreground">Plot {i + 1}</span>
                    {plots.length > 1 && (
                      <Button variant="ghost" size="icon" onClick={() => removePlot(plot.id)} className="h-7 w-7">
                        <Trash2 size={14} className="text-destructive" />
                      </Button>
                    )}
                  </div>
                  <Select value={plot.variety} onValueChange={(v) => updatePlot(plot.id, "variety", v)}>
                    <SelectTrigger><SelectValue placeholder="Mango variety" /></SelectTrigger>
                    <SelectContent>
                      {VARIETIES.map((v) => (
                        <SelectItem key={v} value={v}>{v}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <div className="grid grid-cols-2 gap-3">
                    <Input type="date" value={plot.plantingDate} onChange={(e) => updatePlot(plot.id, "plantingDate", e.target.value)} />
                    <Input placeholder="Size (hectares)" type="number" value={plot.size} onChange={(e) => updatePlot(plot.id, "size", e.target.value)} />
                  </div>
                </div>
              ))}
            </div>

            {/* Notifications */}
            <div className="space-y-4">
              <h3 className="font-semibold text-foreground flex items-center gap-2">🔔 Notifications</h3>
              {[
                { key: "water" as const, label: "Water Now Alerts", desc: "Get notified when irrigation is needed" },
                { key: "pest" as const, label: "Pest Risk Alerts", desc: "Early warnings about pest outbreaks" },
                { key: "heatwave" as const, label: "Heatwave Advisories", desc: "Extreme heat preparation alerts" },
              ].map((n) => (
                <div key={n.key} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                  <div>
                    <p className="text-sm font-medium text-foreground">{n.label}</p>
                    <p className="text-xs text-muted-foreground">{n.desc}</p>
                  </div>
                  <Switch
                    checked={notifications[n.key]}
                    onCheckedChange={(v) => setNotifications({ ...notifications, [n.key]: v })}
                  />
                </div>
              ))}
            </div>

            <Button
              className="w-full gap-2"
              size="lg"
              onClick={() =>
                onComplete({
                  farmName: farmName || "My Farm",
                  region: region || "South Asia",
                  farmSize,
                  plots: plots.filter((p) => p.variety),
                  hasSoilKit: false,
                })
              }
            >
              <Rocket size={18} /> Launch My Farm Dashboard
            </Button>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default FarmOnboarding;
