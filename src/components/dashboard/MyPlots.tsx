import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { FlaskConical } from "lucide-react";
import type { OnboardingPlot } from "@/pages/Platform";

const PLOT_LETTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

interface MyPlotsProps {
  onboardingPlots: OnboardingPlot[];
  hasSoilKit: boolean;
}

const MyPlots = ({ onboardingPlots, hasSoilKit }: MyPlotsProps) => {
  const plots = onboardingPlots.length > 0
    ? onboardingPlots.map((p, i) => ({
        name: `Plot ${PLOT_LETTERS[i] || i + 1} — ${p.variety || "Unknown"}`,
        health: hasSoilKit ? Math.floor(70 + Math.random() * 25) : null,
        moisture: hasSoilKit ? Math.floor(40 + Math.random() * 35) : null,
        temp: "—",
      }))
    : [{ name: "No plots registered", health: null, moisture: null, temp: "—" }];

  return (
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
            {hasSoilKit && p.health !== null ? (
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Health {p.health}%</p>
                  <Progress value={p.health} className="h-1.5" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Moisture {p.moisture}%</p>
                  <Progress value={p.moisture ?? 0} className="h-1.5" />
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <FlaskConical size={12} />
                <span>Awaiting soil kit results</span>
              </div>
            )}
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default MyPlots;
