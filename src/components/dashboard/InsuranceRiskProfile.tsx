import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

const scores = [
  { label: "Water Mgmt", value: 82 },
  { label: "Organic Comply", value: 91 },
  { label: "Pest Response", value: 65 },
  { label: "GPS Logs", value: 74 },
];

const InsuranceRiskProfile = () => (
  <Card>
    <CardHeader className="pb-3">
      <CardTitle className="text-base flex items-center justify-between">
        <span>Insurance Risk Profile</span>
        <span className="text-2xl font-bold text-primary">78/100</span>
      </CardTitle>
    </CardHeader>
    <CardContent className="space-y-3">
      {scores.map((s) => (
        <div key={s.label}>
          <div className="flex justify-between text-sm mb-1">
            <span className="text-foreground">{s.label}</span>
            <span className="text-muted-foreground">{s.value}%</span>
          </div>
          <Progress value={s.value} className="h-2" />
        </div>
      ))}
    </CardContent>
  </Card>
);

export default InsuranceRiskProfile;
