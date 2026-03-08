import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Brain, Leaf, Droplets, Bug, TrendingUp, Camera, Upload, CheckCircle, Clock } from "lucide-react";
import ActionDialog from "./ActionDialog";

interface Insight {
  id: number;
  category: string;
  title: string;
  description: string;
  impact: string;
  confidence: string;
  source: string;
  actionLabel: string;
  dialogTitle: string;
  dialogDescription: string;
  dialogDetails: { label: string; value: string }[];
  dialogVariant: "action" | "view";
  resolved: boolean;
  time: string;
}

const initialInsights: Insight[] = [
  {
    id: 1, category: "Pest", title: "Switch to neem-based pest control",
    description: "Organic-compliant alternative detected — 23% more effective in your climate zone. Current pyrethrin treatment is showing diminished results after 3 consecutive applications.",
    impact: "High", confidence: "92%", source: "Climate + Pest Model v3.2",
    actionLabel: "View treatment plan", dialogTitle: "Neem-Based Treatment Plan",
    dialogDescription: "Recommended organic pest control switch for improved effectiveness in your climate zone.",
    dialogDetails: [
      { label: "Current Treatment", value: "Pyrethrin spray (declining)" },
      { label: "Recommended", value: "Cold-pressed neem oil 2% solution" },
      { label: "Application", value: "Foliar spray every 10 days" },
      { label: "Coverage", value: "All plots — focus on Plot B" },
      { label: "Effectiveness", value: "+23% vs current treatment" },
      { label: "Organic Certified", value: "Yes ✓ (EU & USDA)" },
      { label: "Cost Estimate", value: "€18/hectare per application" },
    ],
    dialogVariant: "action", resolved: false, time: "3 hours ago",
  },
  {
    id: 2, category: "Harvest", title: "Optimal harvest window: March 12–18",
    description: "Based on fruit maturity models and weather forecast for your region. Brix readings predicted to peak at 18° on March 15. Early harvest (before March 12) may reduce sweetness by 12%.",
    impact: "High", confidence: "89%", source: "Maturity Model + Weather API",
    actionLabel: "Set harvest reminder", dialogTitle: "Set Harvest Reminder",
    dialogDescription: "A reminder will be set for the optimal harvest window based on maturity predictions.",
    dialogDetails: [
      { label: "Optimal Window", value: "March 12–18" },
      { label: "Peak Brix Date", value: "March 15 (18° predicted)" },
      { label: "Reminder Set For", value: "March 11, 07:00 AM" },
      { label: "Plots Affected", value: "Plot A (Alphonso)" },
      { label: "Weather Outlook", value: "Clear skies, 28–31°C" },
    ],
    dialogVariant: "action", resolved: false, time: "5 hours ago",
  },
  {
    id: 3, category: "Irrigation", title: "Reduce irrigation by 15% on Plot C",
    description: "Soil moisture levels are above optimal (72% vs 60% target). Overwatering increases root rot risk by 30%. Recommend switching to deficit irrigation strategy for next 2 weeks.",
    impact: "Medium", confidence: "95%", source: "Soil Sensor + Weather Data",
    actionLabel: "Adjust schedule", dialogTitle: "Adjust Irrigation Schedule — Plot C",
    dialogDescription: "Reduce irrigation frequency to bring soil moisture closer to optimal levels.",
    dialogDetails: [
      { label: "Current Moisture", value: "72%" },
      { label: "Target Moisture", value: "60%" },
      { label: "Reduction", value: "15% (from 45 min to 38 min)" },
      { label: "Strategy", value: "Deficit irrigation — 2 weeks" },
      { label: "Root Rot Risk Reduction", value: "-30%" },
      { label: "Water Savings", value: "~1,200L/week" },
    ],
    dialogVariant: "action", resolved: false, time: "Today, 08:00",
  },
  {
    id: 4, category: "Nutrition", title: "Apply potassium boost — flowering stage",
    description: "Plot A Alphonso trees entering peak flowering. Potassium-rich organic fertilizer (kelp extract) recommended to improve fruit set by up to 18%.",
    impact: "Medium", confidence: "87%", source: "Growth Stage + Soil Analysis",
    actionLabel: "View fertilizer options", dialogTitle: "Organic Fertilizer Options",
    dialogDescription: "Recommended potassium-rich organic fertilizers for the flowering stage.",
    dialogDetails: [
      { label: "Option 1", value: "Kelp extract (4-1-8 NPK) — €22/L" },
      { label: "Option 2", value: "Seaweed foliar spray — €15/L" },
      { label: "Option 3", value: "Wood ash compost — €8/bag" },
      { label: "Recommended", value: "Kelp extract (highest K content)" },
      { label: "Application Rate", value: "5ml/L, bi-weekly foliar spray" },
      { label: "Expected Improvement", value: "+18% fruit set" },
    ],
    dialogVariant: "action", resolved: false, time: "Yesterday",
  },
  {
    id: 5, category: "Market", title: "Premium Alphonso demand rising — EU markets",
    description: "European organic mango imports up 34% YoY. Your organic certification and GPS-verified traceability give you access to premium pricing. Consider early contracts.",
    impact: "High", confidence: "78%", source: "Market Intelligence Feed",
    actionLabel: "Explore buyers", dialogTitle: "EU Premium Buyer Directory",
    dialogDescription: "Verified buyers seeking organic-certified mangoes with traceability documentation.",
    dialogDetails: [
      { label: "Buyer 1", value: "FreshOrganics GmbH (Germany) — €4.20/kg" },
      { label: "Buyer 2", value: "BioFruit España (Spain) — €3.80/kg" },
      { label: "Buyer 3", value: "NaturMarkt (Netherlands) — €4.50/kg" },
      { label: "Your Certification", value: "EU Organic ✓ / GPS Traced ✓" },
      { label: "Market Trend", value: "+34% YoY demand" },
      { label: "Contract Window", value: "Open until March 30" },
    ],
    dialogVariant: "action", resolved: false, time: "2 days ago",
  },
];

const categoryIcon: Record<string, typeof Leaf> = {
  Pest: Bug, Harvest: TrendingUp, Irrigation: Droplets, Nutrition: Leaf, Market: TrendingUp,
};

const impactColor: Record<string, string> = {
  High: "bg-primary/10 text-primary",
  Medium: "bg-secondary/10 text-secondary",
  Low: "bg-muted text-muted-foreground",
};

const InsightsPage = () => {
  const [tab, setTab] = useState("All");
  const [dragOver, setDragOver] = useState(false);
  const [insights, setInsights] = useState<Insight[]>(initialInsights);
  const [dialogInsight, setDialogInsight] = useState<Insight | null>(null);

  const filtered = tab === "All" ? insights : insights.filter((i) => i.category === tab);
  const activeInsights = filtered.filter((i) => !i.resolved);
  const resolvedInsights = filtered.filter((i) => i.resolved);

  const handleResolve = (id: number) => {
    setInsights((prev) =>
      prev.map((i) =>
        i.id === id ? { ...i, resolved: true, time: "Just now", impact: "Low" } : i
      )
    );
  };

  const renderInsightCard = (ins: Insight, isResolved: boolean) => {
    const Icon = categoryIcon[ins.category] || Leaf;
    return (
      <Card key={ins.id} className={isResolved ? "opacity-75" : ""}>
        <CardContent className="p-4 space-y-3">
          <div className="flex items-start justify-between gap-2">
            <div className="flex items-start gap-3">
              <div className="mt-0.5 p-1.5 rounded-md bg-primary/10">
                {isResolved ? <CheckCircle size={16} className="text-primary" /> : <Icon size={16} className="text-primary" />}
              </div>
              <div className="space-y-1">
                <p className="text-sm font-medium text-foreground">{ins.title}</p>
                <p className="text-xs text-muted-foreground">{ins.description}</p>
              </div>
            </div>
            {!isResolved && (
              <Badge variant="outline" className={`text-xs shrink-0 ${impactColor[ins.impact]}`}>
                {ins.impact}
              </Badge>
            )}
          </div>
          <div className="flex items-center justify-between pt-1 border-t border-border">
            <div className="flex items-center gap-3">
              <span className="text-[10px] text-muted-foreground flex items-center gap-1">
                <Clock size={10} /> {ins.time}
              </span>
              <span className="text-[10px] text-muted-foreground">Confidence: {ins.confidence}</span>
            </div>
            <Button size="sm" variant="outline" className="h-7 text-xs" onClick={() => setDialogInsight(ins)}>
              {isResolved ? "View log" : ins.actionLabel}
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
          <Brain size={20} className="text-primary" /> AI Insights
        </h2>
        <p className="text-sm text-muted-foreground">Organic-first recommendations powered by climate data</p>
      </div>

      <div className="grid grid-cols-3 gap-3">
        <Card><CardContent className="p-4 text-center"><p className="text-2xl font-bold text-primary">{insights.filter(i => !i.resolved).length}</p><p className="text-xs text-muted-foreground">Active Insights</p></CardContent></Card>
        <Card><CardContent className="p-4 text-center"><p className="text-2xl font-bold text-foreground">89%</p><p className="text-xs text-muted-foreground">Avg Confidence</p></CardContent></Card>
        <Card><CardContent className="p-4 text-center"><p className="text-2xl font-bold text-primary">{insights.filter(i => !i.resolved && i.impact === "High").length}</p><p className="text-xs text-muted-foreground">High Impact</p></CardContent></Card>
      </div>

      <Tabs value={tab} onValueChange={setTab}>
        <TabsList className="w-full justify-start h-auto flex-wrap gap-1 p-1">
          {["All", "Pest", "Harvest", "Irrigation", "Nutrition", "Market"].map((t) => (
            <TabsTrigger key={t} value={t} className="text-xs">{t}</TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value={tab} className="mt-4 space-y-6">
          {activeInsights.length > 0 && (
            <div className="space-y-3">
              <h3 className="text-sm font-semibold text-foreground flex items-center gap-2">
                <Brain size={14} className="text-primary" /> Active Insights
              </h3>
              {activeInsights.map((ins) => renderInsightCard(ins, false))}
            </div>
          )}
          {resolvedInsights.length > 0 && (
            <div className="space-y-3">
              <h3 className="text-sm font-semibold text-foreground flex items-center gap-2">
                <CheckCircle size={14} className="text-primary" /> Resolved Today
              </h3>
              {resolvedInsights.map((ins) => renderInsightCard(ins, true))}
            </div>
          )}
        </TabsContent>
      </Tabs>

      {(tab === "All" || tab === "Pest") && (
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center gap-2">
              <Camera size={16} className="text-accent" /> Pest Photo Scan
            </CardTitle>
            <p className="text-xs text-muted-foreground">Upload a leaf/fruit photo for AI pest identification and organic treatment recommendation.</p>
          </CardHeader>
          <CardContent>
            <div
              className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors cursor-pointer ${
                dragOver ? "border-primary bg-primary/5" : "border-border"
              }`}
              onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
              onDragLeave={() => setDragOver(false)}
              onDrop={(e) => { e.preventDefault(); setDragOver(false); }}
            >
              <Upload size={32} className="text-muted-foreground mx-auto mb-3" />
              <p className="text-sm font-medium text-foreground">📷 Tap to upload a photo</p>
              <p className="text-xs text-muted-foreground mt-1">JPG, PNG up to 10MB</p>
            </div>
          </CardContent>
        </Card>
      )}

      {dialogInsight && (
        <ActionDialog
          open={!!dialogInsight}
          onOpenChange={(open) => !open && setDialogInsight(null)}
          title={dialogInsight.dialogTitle}
          description={dialogInsight.dialogDescription}
          confirmLabel={dialogInsight.resolved ? "Done" : dialogInsight.actionLabel}
          variant={dialogInsight.resolved ? "view" : "action"}
          onConfirm={() => {
            if (!dialogInsight.resolved) {
              handleResolve(dialogInsight.id);
            }
          }}
        >
          <div className="space-y-2">
            {dialogInsight.dialogDetails.map((d) => (
              <div key={d.label} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                <span className="text-sm text-muted-foreground">{d.label}</span>
                <span className="text-sm font-medium text-foreground text-right max-w-[60%]">{d.value}</span>
              </div>
            ))}
          </div>
        </ActionDialog>
      )}
    </div>
  );
};

export default InsightsPage;
