import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

const plots = [
  { name: "Plot A — Alphonso", health: 92, moisture: 68, temp: "31°C" },
  { name: "Plot B — Kent", health: 78, moisture: 45, temp: "33°C" },
  { name: "Plot C — Keitt", health: 85, moisture: 72, temp: "30°C" },
];

const MyPlots = () => (
  <Card>
    <CardHeader className="pb-3">
      <CardTitle className="text-base">🌳 My Plots</CardTitle>
    </CardHeader>
    <CardContent className="space-y-4">
      {plots.map((p) => (
        <div key={p.name} className="p-3 rounded-lg border border-border space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-foreground">{p.name}</span>
            <span className="text-xs text-muted-foreground">{p.temp}</span>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <p className="text-xs text-muted-foreground mb-1">Health {p.health}%</p>
              <Progress value={p.health} className="h-1.5" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground mb-1">Moisture {p.moisture}%</p>
              <Progress value={p.moisture} className="h-1.5" />
            </div>
          </div>
        </div>
      ))}
    </CardContent>
  </Card>
);

export default MyPlots;
