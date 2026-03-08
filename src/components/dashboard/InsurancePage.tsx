import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Shield, FileText, CheckCircle, MapPin, Eye, TrendingUp, Clock } from "lucide-react";

const scores = [
  { label: "Water Mgmt", emoji: "💧", value: 82, desc: "Irrigation frequency and soil moisture consistency" },
  { label: "Organic Comply", emoji: "🧪", value: 95, desc: "Organic treatment records and certification status" },
  { label: "Pest Response", emoji: "🛡️", value: 65, desc: "Response time to pest alerts and treatment effectiveness" },
  { label: "GPS Logs", emoji: "📍", value: 70, desc: "GPS-stamped boundary and activity verification" },
];

const verifiedActions = [
  { action: "Irrigation completed — Plot A", time: "Today, 06:30", verified: true, gps: true },
  { action: "Organic spray applied — Plot B", time: "Yesterday, 14:00", verified: true, gps: true },
  { action: "GPS boundary logged", time: "Mar 5, 09:15", verified: true, gps: true },
  { action: "Soil sample collected", time: "Mar 3, 11:00", verified: true, gps: false },
  { action: "Pruning — lower branches Plot A", time: "Mar 2, 08:30", verified: true, gps: true },
  { action: "Mulching applied — Plot C", time: "Mar 1, 10:00", verified: true, gps: true },
  { action: "Fertilizer NPK organic — Plot B", time: "Feb 28, 09:00", verified: true, gps: false },
  { action: "Shade nets installed — Plot C", time: "Feb 25, 07:00", verified: true, gps: true },
];

const plans = [
  {
    name: "Basic Crop Cover",
    premium: "€12/month",
    coverage: "Weather damage, pest outbreaks",
    discount: "5% Risk Score discount",
    recommended: false,
  },
  {
    name: "Premium Organic Plan",
    premium: "€28/month",
    coverage: "Full weather, pest, market + organic cert protection",
    discount: "15% Risk Score discount",
    recommended: true,
  },
  {
    name: "Enterprise Climate Shield",
    premium: "€45/month",
    coverage: "Comprehensive coverage + export market guarantee",
    discount: "22% Risk Score discount",
    recommended: false,
  },
];

const InsurancePage = () => (
  <div className="space-y-6">
    {/* Header */}
    <div className="space-y-1">
      <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
        <Shield size={20} className="text-primary" /> Insurance & Fintech
      </h2>
      <p className="text-sm text-muted-foreground">Your verified action log builds your Risk Profile for premium discounts</p>
    </div>

    {/* Risk Profile Card */}
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-base">📋 Risk Profile Report</CardTitle>
            <CardDescription className="text-xs">GPS-stamped verified actions for your insurance agent</CardDescription>
          </div>
          <div className="text-right">
            <div className="flex items-center gap-1 text-xs text-primary">
              <TrendingUp size={12} /> Improving
            </div>
            <p className="text-3xl font-bold text-primary">78/100</p>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Sub-scores */}
        {scores.map((s) => (
          <div key={s.label} className="space-y-1">
            <div className="flex items-center justify-between">
              <span className="text-sm text-foreground flex items-center gap-2">
                <span>{s.emoji}</span> {s.label}
              </span>
              <span className="text-sm font-semibold text-foreground">{s.value}</span>
            </div>
            <Progress value={s.value} className="h-2" />
            <p className="text-[10px] text-muted-foreground">{s.desc}</p>
          </div>
        ))}

        {/* Summary stats */}
        <div className="grid grid-cols-3 gap-3 pt-2 border-t border-border">
          <div className="text-center">
            <p className="text-xl font-bold text-foreground">12</p>
            <p className="text-[10px] text-muted-foreground">Verified Actions</p>
          </div>
          <div className="text-center">
            <p className="text-xl font-bold text-primary">78</p>
            <p className="text-[10px] text-muted-foreground">Risk Score</p>
          </div>
          <div className="text-center">
            <p className="text-xl font-bold text-primary">100%</p>
            <p className="text-[10px] text-muted-foreground">Organic Comply</p>
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="flex-1 gap-1 text-xs">
            <FileText size={12} /> Export PDF for Insurance Agent
          </Button>
          <Button variant="outline" size="sm" className="flex-1 gap-1 text-xs">
            <Eye size={12} /> Preview Verified Action Log
          </Button>
        </div>
      </CardContent>
    </Card>

    {/* Verified Action Log */}
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-base flex items-center gap-2">
          📍 Verified Action Log
          <Badge variant="outline" className="text-[10px]">GPS + Timestamp verified</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        {verifiedActions.map((log, i) => (
          <div key={i} className="flex items-center justify-between p-2 rounded-md hover:bg-muted/50 transition-colors">
            <div className="flex items-center gap-2">
              <CheckCircle size={14} className="text-primary shrink-0" />
              <span className="text-sm text-foreground">{log.action}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-muted-foreground">{log.time}</span>
              {log.gps && (
                <Badge variant="outline" className="text-[10px] h-5 gap-0.5">
                  <MapPin size={8} /> GPS
                </Badge>
              )}
              <Badge variant="outline" className="text-[10px] h-5">Verified</Badge>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>

    {/* Available Plans */}
    <div className="space-y-3">
      <h3 className="text-base font-semibold text-foreground">Available Plans</h3>
      {plans.map((plan) => (
        <Card key={plan.name} className={plan.recommended ? "border-primary" : ""}>
          <CardContent className="p-4 space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <p className="text-sm font-semibold text-foreground">{plan.name}</p>
                {plan.recommended && (
                  <Badge className="bg-primary/10 text-primary border-primary/20 text-[10px]">Recommended</Badge>
                )}
              </div>
              <p className="text-sm font-bold text-foreground">{plan.premium}</p>
            </div>
            <p className="text-xs text-muted-foreground">{plan.coverage}</p>
            <div className="flex items-center justify-between">
              <Badge variant="outline" className="text-[10px] bg-primary/5 text-primary">{plan.discount}</Badge>
              <Button size="sm" variant={plan.recommended ? "default" : "outline"} className="h-7 text-xs">
                {plan.recommended ? "Get Started" : "Learn More"}
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  </div>
);

export default InsurancePage;
