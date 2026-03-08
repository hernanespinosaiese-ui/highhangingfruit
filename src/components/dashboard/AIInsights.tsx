import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Leaf } from "lucide-react";

const insights = [
  {
    title: "Switch to neem-based pest control",
    desc: "Organic-compliant alternative detected — 23% more effective in your climate zone.",
  },
  {
    title: "Optimal harvest window: March 12–18",
    desc: "Based on fruit maturity models and weather forecast for your region.",
  },
  {
    title: "Reduce irrigation by 15% on Plot C",
    desc: "Soil moisture levels are above optimal. Save water and reduce root rot risk.",
  },
];

const AIInsights = () => (
  <Card>
    <CardHeader className="pb-3">
      <CardTitle className="text-base flex items-center gap-2">
        <Leaf size={16} className="text-primary" /> AI Insights
      </CardTitle>
    </CardHeader>
    <CardContent className="space-y-3">
      {insights.map((ins) => (
        <div key={ins.title} className="p-3 rounded-lg bg-primary/5 border border-primary/10 space-y-1">
          <p className="text-sm font-medium text-foreground">{ins.title}</p>
          <p className="text-xs text-muted-foreground">{ins.desc}</p>
        </div>
      ))}
    </CardContent>
  </Card>
);

export default AIInsights;
