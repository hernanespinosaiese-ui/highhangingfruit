import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Bell, CheckCircle, Clock, AlertTriangle, Droplets, Bug, Thermometer } from "lucide-react";

const alerts = [
  {
    id: 1,
    type: "Irrigation",
    icon: Droplets,
    title: "Plot A needs irrigation in 4 hours",
    description: "Soil moisture has dropped to 32% — below the 40% threshold for Alphonso mangoes. Forecast shows no rain for 48 hours. Recommend scheduling drip irrigation for early morning.",
    severity: "High" as const,
    confidence: "94%",
    action: "Schedule irrigation",
    time: "2 hours ago",
    resolved: false,
  },
  {
    id: 2,
    type: "Pest",
    icon: Bug,
    title: "Fruit fly activity detected near Plot B",
    description: "Climate pattern analysis shows 87% probability of Bactrocera dorsalis activity based on temperature (33°C) and humidity (68%). Neem-based traps recommended as organic-compliant solution.",
    severity: "Medium" as const,
    confidence: "87%",
    action: "Deploy traps",
    time: "5 hours ago",
    resolved: false,
  },
  {
    id: 3,
    type: "Weather",
    icon: Thermometer,
    title: "Heatwave expected — 38°C for 3 days",
    description: "Extended heat forecast for your region. UV index expected to reach 10+. Shade nets on Plot C and increased irrigation frequency recommended to prevent sunburn damage on fruit.",
    severity: "High" as const,
    confidence: "91%",
    action: "Activate shade nets",
    time: "Today, 06:00",
    resolved: false,
  },
  {
    id: 4,
    type: "Irrigation",
    icon: Droplets,
    title: "Plot C irrigation completed successfully",
    description: "Automated drip irrigation ran for 45 minutes. Soil moisture restored to 65%. GPS-stamped and verified for insurance log.",
    severity: "Low" as const,
    confidence: "100%",
    action: "View log",
    time: "Yesterday",
    resolved: true,
  },
  {
    id: 5,
    type: "Pest",
    icon: Bug,
    title: "Organic spray applied — Plot B cleared",
    description: "Neem-based treatment applied successfully. Follow-up scan in 72 hours recommended. Action verified and logged.",
    severity: "Low" as const,
    confidence: "100%",
    action: "Schedule follow-up",
    time: "2 days ago",
    resolved: true,
  },
];

const severityColor: Record<string, string> = {
  High: "bg-destructive/10 text-destructive border-destructive/20",
  Medium: "bg-secondary/10 text-secondary border-secondary/20",
  Low: "bg-primary/10 text-primary border-primary/20",
};

const AlertsPage = () => {
  const [tab, setTab] = useState("All");
  const activeAlerts = alerts.filter((a) => !a.resolved);
  const resolvedAlerts = alerts.filter((a) => a.resolved);
  const filtered = tab === "All" ? alerts : alerts.filter((a) => a.type === tab);
  const filteredActive = filtered.filter((a) => !a.resolved);
  const filteredResolved = filtered.filter((a) => a.resolved);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="space-y-1">
        <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
          <Bell size={20} className="text-secondary" /> Smart Alerts
        </h2>
        <p className="text-sm text-muted-foreground">AI-powered recommendations with full reasoning</p>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-3 gap-3">
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-destructive">{activeAlerts.length}</p>
            <p className="text-xs text-muted-foreground">Active</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-primary">{resolvedAlerts.length}</p>
            <p className="text-xs text-muted-foreground">Resolved</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-foreground">91%</p>
            <p className="text-xs text-muted-foreground">Avg Confidence</p>
          </CardContent>
        </Card>
      </div>

      {/* Filter Tabs */}
      <Tabs value={tab} onValueChange={setTab}>
        <TabsList className="w-full justify-start h-auto flex-wrap gap-1 p-1">
          {["All", "Irrigation", "Pest", "Weather"].map((t) => (
            <TabsTrigger key={t} value={t} className="text-xs gap-1">
              {t === "Irrigation" && "💧"} {t === "Pest" && "🐛"} {t === "Weather" && "🌡️"} {t}
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value={tab} className="mt-4 space-y-6">
          {/* Active Alerts */}
          {filteredActive.length > 0 && (
            <div className="space-y-3">
              <h3 className="text-sm font-semibold text-foreground flex items-center gap-2">
                <AlertTriangle size={14} className="text-secondary" /> Active Alerts
              </h3>
              {filteredActive.map((a) => (
                <Card key={a.id} className="border-l-4" style={{ borderLeftColor: a.severity === "High" ? "hsl(var(--destructive))" : "hsl(var(--secondary))" }}>
                  <CardContent className="p-4 space-y-3">
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-start gap-3">
                        <div className="mt-0.5 p-1.5 rounded-md bg-muted">
                          <a.icon size={16} className="text-muted-foreground" />
                        </div>
                        <div className="space-y-1">
                          <p className="text-sm font-medium text-foreground">{a.title}</p>
                          <p className="text-xs text-muted-foreground">{a.description}</p>
                        </div>
                      </div>
                      <Badge variant="outline" className={`text-xs shrink-0 ${severityColor[a.severity]}`}>
                        {a.severity}
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between pt-1">
                      <div className="flex items-center gap-3">
                        <span className="text-xs text-muted-foreground flex items-center gap-1">
                          <Clock size={12} /> {a.time}
                        </span>
                        <span className="text-xs text-muted-foreground">Confidence: {a.confidence}</span>
                      </div>
                      <Button size="sm" variant="outline" className="h-7 text-xs">{a.action}</Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {/* Resolved */}
          {filteredResolved.length > 0 && (
            <div className="space-y-3">
              <h3 className="text-sm font-semibold text-foreground flex items-center gap-2">
                <CheckCircle size={14} className="text-primary" /> Resolved Today
              </h3>
              {filteredResolved.map((a) => (
                <Card key={a.id} className="opacity-75">
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <CheckCircle size={16} className="text-primary mt-0.5 shrink-0" />
                      <div className="space-y-1 flex-1">
                        <p className="text-sm font-medium text-foreground">{a.title}</p>
                        <p className="text-xs text-muted-foreground">{a.description}</p>
                        <span className="text-xs text-muted-foreground">{a.time}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AlertsPage;
