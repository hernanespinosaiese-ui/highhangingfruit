import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Brain, Leaf, Droplets, Bug, TrendingUp, Camera, Upload } from "lucide-react";

interface Insight {
  id: number;
  category: string;
  title: string;
  description: string;
  impact: string;
  confidence: string;
  source: string;
  actionLabel: string;
}

const insights: Insight[] = [
  {
    id: 1,
    category: "Pest",
    title: "Switch to neem-based pest control",
    description: "Organic-compliant alternative detected — 23% more effective in your climate zone. Current pyrethrin treatment is showing diminished results after 3 consecutive applications.",
    impact: "High",
    confidence: "92%",
    source: "Climate + Pest Model v3.2",
    actionLabel: "View treatment plan",
  },
  {
    id: 2,
    category: "Harvest",
    title: "Optimal harvest window: March 12–18",
    description: "Based on fruit maturity models and weather forecast for your region. Brix readings predicted to peak at 18° on March 15. Early harvest (before March 12) may reduce sweetness by 12%.",
    impact: "High",
    confidence: "89%",
    source: "Maturity Model + Weather API",
    actionLabel: "Set harvest reminder",
  },
  {
    id: 3,
    category: "Irrigation",
    title: "Reduce irrigation by 15% on Plot C",
    description: "Soil moisture levels are above optimal (72% vs 60% target). Overwatering increases root rot risk by 30%. Recommend switching to deficit irrigation strategy for next 2 weeks.",
    impact: "Medium",
    confidence: "95%",
    source: "Soil Sensor + Weather Data",
    actionLabel: "Adjust schedule",
  },
  {
    id: 4,
    category: "Nutrition",
    title: "Apply potassium boost — flowering stage",
    description: "Plot A Alphonso trees entering peak flowering. Potassium-rich organic fertilizer (kelp extract) recommended to improve fruit set by up to 18%.",
    impact: "Medium",
    confidence: "87%",
    source: "Growth Stage + Soil Analysis",
    actionLabel: "View fertilizer options",
  },
  {
    id: 5,
    category: "Market",
    title: "Premium Alphonso demand rising — EU markets",
    description: "European organic mango imports up 34% YoY. Your organic certification and GPS-verified traceability give you access to premium pricing. Consider early contracts.",
    impact: "High",
    confidence: "78%",
    source: "Market Intelligence Feed",
    actionLabel: "Explore buyers",
  },
];

const categoryIcon: Record<string, typeof Leaf> = {
  Pest: Bug,
  Harvest: TrendingUp,
  Irrigation: Droplets,
  Nutrition: Leaf,
  Market: TrendingUp,
};

const impactColor: Record<string, string> = {
  High: "bg-primary/10 text-primary",
  Medium: "bg-secondary/10 text-secondary",
  Low: "bg-muted text-muted-foreground",
};

const InsightsPage = () => {
  const [tab, setTab] = useState("All");
  const [dragOver, setDragOver] = useState(false);
  const filtered = tab === "All" ? insights : insights.filter((i) => i.category === tab);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="space-y-1">
        <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
          <Brain size={20} className="text-primary" /> AI Insights
        </h2>
        <p className="text-sm text-muted-foreground">Organic-first recommendations powered by climate data</p>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-3 gap-3">
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-primary">{insights.length}</p>
            <p className="text-xs text-muted-foreground">Active Insights</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-foreground">89%</p>
            <p className="text-xs text-muted-foreground">Avg Confidence</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-primary">3</p>
            <p className="text-xs text-muted-foreground">High Impact</p>
          </CardContent>
        </Card>
      </div>

      {/* Filter */}
      <Tabs value={tab} onValueChange={setTab}>
        <TabsList className="w-full justify-start h-auto flex-wrap gap-1 p-1">
          {["All", "Pest", "Harvest", "Irrigation", "Nutrition", "Market"].map((t) => (
            <TabsTrigger key={t} value={t} className="text-xs">{t}</TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value={tab} className="mt-4 space-y-3">
          {filtered.map((ins) => {
            const Icon = categoryIcon[ins.category] || Leaf;
            return (
              <Card key={ins.id}>
                <CardContent className="p-4 space-y-3">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-start gap-3">
                      <div className="mt-0.5 p-1.5 rounded-md bg-primary/10">
                        <Icon size={16} className="text-primary" />
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm font-medium text-foreground">{ins.title}</p>
                        <p className="text-xs text-muted-foreground">{ins.description}</p>
                      </div>
                    </div>
                    <Badge variant="outline" className={`text-xs shrink-0 ${impactColor[ins.impact]}`}>
                      {ins.impact}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between pt-1 border-t border-border">
                    <div className="flex items-center gap-3">
                      <span className="text-[10px] text-muted-foreground">Confidence: {ins.confidence}</span>
                      <span className="text-[10px] text-muted-foreground">Source: {ins.source}</span>
                    </div>
                    <Button size="sm" variant="outline" className="h-7 text-xs">{ins.actionLabel}</Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </TabsContent>
      </Tabs>

      {/* Pest Photo Scan — only on All & Pest */}
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
    </div>
  );
};

export default InsightsPage;
