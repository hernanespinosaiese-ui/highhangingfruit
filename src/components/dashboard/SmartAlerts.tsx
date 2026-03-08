import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";

const alerts = [
  {
    id: 1,
    type: "Irrigation",
    title: "Plot A needs irrigation in 4 hours",
    severity: "High",
    confidence: "94%",
    action: "Schedule irrigation",
  },
  {
    id: 2,
    type: "Pest",
    title: "Fruit fly activity detected near Plot B",
    severity: "Medium",
    confidence: "87%",
    action: "Deploy traps",
  },
  {
    id: 3,
    type: "Weather",
    title: "Heatwave expected — 38°C for 3 days",
    severity: "High",
    confidence: "91%",
    action: "Activate shade nets",
  },
];

const severityColor: Record<string, string> = {
  High: "bg-destructive/10 text-destructive",
  Medium: "bg-secondary/10 text-secondary",
  Low: "bg-primary/10 text-primary",
};

const SmartAlerts = () => {
  const [tab, setTab] = useState("All");
  const filtered = tab === "All" ? alerts : alerts.filter((a) => a.type === tab);

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
          <TabsContent value={tab} className="mt-0 space-y-3">
            {filtered.map((a) => (
              <div key={a.id} className="p-3 rounded-lg border border-border space-y-2">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-foreground">{a.title}</p>
                  <Badge variant="outline" className={`text-xs ${severityColor[a.severity]}`}>
                    {a.severity}
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">AI Confidence: {a.confidence}</span>
                  <Button size="sm" variant="outline" className="h-7 text-xs">{a.action}</Button>
                </div>
              </div>
            ))}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default SmartAlerts;
