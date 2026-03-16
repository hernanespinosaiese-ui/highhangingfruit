import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/Layout";
import SplashScreen from "@/components/dashboard/SplashScreen";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  Beaker, CloudRain, Droplets, Shield, Sun, Wind, Thermometer,
  AlertTriangle, Lightbulb, CheckCircle, Calendar as CalendarIcon,
  TrendingUp, MapPin, FileText, Eye, ChevronRight
} from "lucide-react";
import ActionDialog from "@/components/dashboard/ActionDialog";
import { format, addDays } from "date-fns";
import { cn } from "@/lib/utils";

export interface OnboardingPlot {
  id: string;
  variety: string;
  plantingDate: string;
  size: string;
}

export interface FarmOnboardingData {
  farmName: string;
  region: string;
  farmSize: string;
  plots: OnboardingPlot[];
  hasSoilKit: boolean;
}

const STORAGE_KEY = "hhf_farm_session";

type Section = "soil" | "climate" | "water" | "insurance";

const sectionNav: { id: Section; label: string; icon: typeof Beaker }[] = [
  { id: "soil", label: "Soil Insights", icon: Beaker },
  { id: "climate", label: "Climate", icon: CloudRain },
  { id: "water", label: "Water Mgmt", icon: Droplets },
  { id: "insurance", label: "Insurance", icon: Shield },
];

// Mock soil data
const soilData = {
  ph: 6.4,
  nitrogen: 42,
  phosphorus: 28,
  potassium: 65,
  healthStatus: "Good to Plant" as "Good to Plant" | "Needs Improvement",
};

// Mock climate data
const climateAlerts = [
  { type: "Drought Risk", severity: "Medium", detail: "Low rainfall predicted for next 10 days. Soil moisture may drop below critical levels.", icon: Sun },
  { type: "Heat Wave", severity: "High", detail: "Temperatures expected to exceed 38°C for 3 consecutive days starting March 18.", icon: Thermometer },
];

const protectionTips = [
  "Apply mulch around tree bases to retain soil moisture and reduce evaporation.",
  "Activate shade nets during peak UV hours (11 AM – 3 PM) to prevent fruit sunburn.",
  "Increase drip irrigation frequency by 20% during the heat wave period.",
];

// Mock weather
const weatherForecast = [
  { day: "Today", temp: "32°C", icon: Sun, condition: "Sunny" },
  { day: "Tomorrow", temp: "34°C", icon: Sun, condition: "Hot" },
  { day: "Wed", temp: "38°C", icon: Thermometer, condition: "Heat Wave" },
  { day: "Thu", temp: "37°C", icon: Thermometer, condition: "Heat Wave" },
  { day: "Fri", temp: "33°C", icon: CloudRain, condition: "Partly Cloudy" },
];

// Insurance scores
const riskScores = [
  { label: "Water Mgmt", emoji: "💧", value: 82, desc: "Irrigation frequency and soil moisture consistency" },
  { label: "Organic Comply", emoji: "🧪", value: 95, desc: "Organic treatment records and certification status" },
  { label: "Pest Response", emoji: "🛡️", value: 65, desc: "Response time to pest alerts and treatment effectiveness" },
  { label: "GPS Logs", emoji: "📍", value: 70, desc: "GPS-stamped boundary and activity verification" },
];

const plans = [
  { name: "Basic Crop Cover", premium: "€12/month", coverage: "Weather damage, pest outbreaks", discount: "5% Risk Score discount", recommended: false },
  { name: "Premium Organic Plan", premium: "€28/month", coverage: "Full weather, pest, market + organic cert protection", discount: "15% Risk Score discount", recommended: true },
  { name: "Enterprise Climate Shield", premium: "€45/month", coverage: "Comprehensive coverage + export market guarantee", discount: "22% Risk Score discount", recommended: false },
];

function getWateringDates(plantingDateStr?: string): Date[] {
  const base = plantingDateStr ? new Date(plantingDateStr) : new Date();
  const start = addDays(base, 2);
  return Array.from({ length: 5 }, (_, i) => addDays(start, i * 5));
}

const Platform = () => {
  const navigate = useNavigate();
  const [showSplash, setShowSplash] = useState(() => !sessionStorage.getItem(STORAGE_KEY));
  const [activeSection, setActiveSection] = useState<Section>("soil");
  const [dialog, setDialog] = useState<string | null>(null);

  const sectionRefs = {
    soil: useRef<HTMLDivElement>(null),
    climate: useRef<HTMLDivElement>(null),
    water: useRef<HTMLDivElement>(null),
    insurance: useRef<HTMLDivElement>(null),
  };

  const farmData: FarmOnboardingData = (() => {
    const saved = sessionStorage.getItem(STORAGE_KEY);
    if (saved) {
      try { return JSON.parse(saved); } catch { /* fall through */ }
    }
    return { farmName: "My Farm", region: "South Asia", farmSize: "", plots: [], hasSoilKit: true };
  })();

  // If no session, redirect to login
  useEffect(() => {
    if (!sessionStorage.getItem(STORAGE_KEY) && !showSplash) {
      navigate("/login");
    }
  }, [navigate, showSplash]);

  const scrollToSection = (id: Section) => {
    setActiveSection(id);
    sectionRefs[id].current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  // Intersection observer for active section highlight
  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    (Object.keys(sectionRefs) as Section[]).forEach((key) => {
      const ref = sectionRefs[key];
      if (!ref.current) return;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveSection(key); },
        { rootMargin: "-40% 0px -50% 0px" }
      );
      obs.observe(ref.current);
      observers.push(obs);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, [showSplash]);

  if (showSplash) {
    return <SplashScreen onComplete={() => {
      // If no session exists, go to login
      if (!sessionStorage.getItem(STORAGE_KEY)) {
        navigate("/login");
      } else {
        setShowSplash(false);
      }
    }} />;
  }

  const firstPlot = farmData.plots?.[0];
  const wateringDates = getWateringDates(firstPlot?.plantingDate);
  const varietyName = firstPlot?.variety || "Mango";

  return (
    <Layout>
      <section className="py-4 pb-8">
        <div className="container mx-auto px-4 lg:px-16 max-w-7xl">
          {/* Header */}
          <div className="mb-6 space-y-2">
            <h1 className="text-2xl font-bold text-foreground">Good morning ☀️</h1>
            <p className="text-muted-foreground">{farmData.farmName}</p>
            <Badge className="bg-primary/10 text-primary border-primary/20">🌿 Organic Certified</Badge>
          </div>

          {/* Sticky Anchor Nav */}
          <nav className="sticky top-16 z-30 bg-background/90 backdrop-blur-md border-b border-border -mx-4 px-4 mb-6">
            <div className="flex items-center gap-1 overflow-x-auto py-2 scrollbar-hide">
              {sectionNav.map((s) => (
                <button
                  key={s.id}
                  onClick={() => scrollToSection(s.id)}
                  className={cn(
                    "flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap",
                    activeSection === s.id
                      ? "bg-primary text-primary-foreground shadow-sm"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted"
                  )}
                >
                  <s.icon size={16} />
                  {s.label}
                </button>
              ))}
            </div>
          </nav>

          <div className="space-y-12">
            {/* ===== SECTION 1: SOIL INSIGHTS ===== */}
            <div ref={sectionRefs.soil} id="soil" className="scroll-mt-32 space-y-4">
              <div className="flex items-center gap-2">
                <Beaker size={20} className="text-primary" />
                <h2 className="text-xl font-bold text-foreground">Soil Insights</h2>
                <Badge variant="outline" className="text-xs ml-2">Lab Results</Badge>
              </div>

              {/* Health Metric */}
              <Card>
                <CardContent className="p-5">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <Badge variant="outline" className="text-[10px] mb-2 text-muted-foreground">INSIGHT</Badge>
                      <h3 className="text-base font-semibold text-foreground">Overall Soil Health</h3>
                    </div>
                    <Badge className={cn(
                      "text-sm px-3 py-1",
                      soilData.healthStatus === "Good to Plant"
                        ? "bg-primary/15 text-primary border-primary/30"
                        : "bg-secondary/15 text-secondary border-secondary/30"
                    )}>
                      {soilData.healthStatus === "Good to Plant" ? "✅" : "⚠️"} {soilData.healthStatus}
                    </Badge>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    <div className="text-center p-3 rounded-lg bg-muted/50">
                      <p className="text-xs text-muted-foreground mb-1">Soil pH</p>
                      <p className="text-2xl font-bold text-foreground">{soilData.ph}</p>
                      <p className="text-[10px] text-primary">Optimal (6.0–7.0)</p>
                    </div>
                    <div className="text-center p-3 rounded-lg bg-muted/50">
                      <p className="text-xs text-muted-foreground mb-1">Nitrogen (N)</p>
                      <p className="text-2xl font-bold text-foreground">{soilData.nitrogen}</p>
                      <p className="text-[10px] text-secondary">mg/kg</p>
                    </div>
                    <div className="text-center p-3 rounded-lg bg-muted/50">
                      <p className="text-xs text-muted-foreground mb-1">Phosphorus (P)</p>
                      <p className="text-2xl font-bold text-foreground">{soilData.phosphorus}</p>
                      <p className="text-[10px] text-secondary">mg/kg</p>
                    </div>
                    <div className="text-center p-3 rounded-lg bg-muted/50">
                      <p className="text-xs text-muted-foreground mb-1">Potassium (K)</p>
                      <p className="text-2xl font-bold text-foreground">{soilData.potassium}</p>
                      <p className="text-[10px] text-primary">mg/kg — Good</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Action box */}
              <Card className="border-l-4" style={{ borderLeftColor: "hsl(var(--primary))" }}>
                <CardContent className="p-4">
                  <Badge variant="outline" className="text-[10px] mb-2 text-muted-foreground">ACTION</Badge>
                  <p className="text-sm font-medium text-foreground">Apply potassium-rich organic fertilizer (kelp extract) to boost K levels before flowering stage.</p>
                  <p className="text-xs text-muted-foreground mt-1">Recommended: 5ml/L bi-weekly foliar spray</p>
                </CardContent>
              </Card>
            </div>

            {/* ===== SECTION 2: CLIMATE & LOCATION ===== */}
            <div ref={sectionRefs.climate} id="climate" className="scroll-mt-32 space-y-4">
              <div className="flex items-center gap-2">
                <CloudRain size={20} className="text-accent" />
                <h2 className="text-xl font-bold text-foreground">Climate & Location Insights</h2>
              </div>

              {/* Weather Forecast */}
              <Card>
                <CardContent className="p-5">
                  <Badge variant="outline" className="text-[10px] mb-3 text-muted-foreground">INSIGHT</Badge>
                  <h3 className="text-base font-semibold text-foreground mb-4">5-Day Weather Forecast — {farmData.region}</h3>
                  <div className="grid grid-cols-5 gap-2">
                    {weatherForecast.map((w) => (
                      <div key={w.day} className="text-center p-3 rounded-lg bg-muted/50">
                        <p className="text-xs text-muted-foreground mb-1">{w.day}</p>
                        <w.icon size={22} className={cn(
                          "mx-auto mb-1",
                          w.condition.includes("Heat") ? "text-destructive" : "text-secondary"
                        )} />
                        <p className="text-sm font-bold text-foreground">{w.temp}</p>
                        <p className="text-[10px] text-muted-foreground">{w.condition}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Climate Risk Alerts */}
              <Card>
                <CardContent className="p-5 space-y-3">
                  <Badge variant="outline" className="text-[10px] mb-2 text-muted-foreground">INSIGHT</Badge>
                  <h3 className="text-base font-semibold text-foreground flex items-center gap-2">
                    <AlertTriangle size={16} className="text-secondary" /> Climate Risk Alerts
                  </h3>
                  {climateAlerts.map((alert) => (
                    <div key={alert.type} className="flex items-start gap-3 p-3 rounded-lg border border-border">
                      <alert.icon size={18} className={alert.severity === "High" ? "text-destructive mt-0.5" : "text-secondary mt-0.5"} />
                      <div>
                        <div className="flex items-center gap-2">
                          <p className="text-sm font-medium text-foreground">{alert.type}</p>
                          <Badge variant="outline" className={cn(
                            "text-[10px]",
                            alert.severity === "High" ? "bg-destructive/10 text-destructive border-destructive/20" : "bg-secondary/10 text-secondary border-secondary/20"
                          )}>{alert.severity}</Badge>
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">{alert.detail}</p>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Action: Protection Tips */}
              <Card className="border-l-4" style={{ borderLeftColor: "hsl(var(--accent))" }}>
                <CardContent className="p-5">
                  <Badge variant="outline" className="text-[10px] mb-2 text-muted-foreground">ACTION</Badge>
                  <h3 className="text-base font-semibold text-foreground flex items-center gap-2 mb-3">
                    <Lightbulb size={16} className="text-secondary" /> How to Protect Your Farm
                  </h3>
                  <ul className="space-y-2">
                    {protectionTips.map((tip, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-foreground">
                        <CheckCircle size={14} className="text-primary mt-0.5 shrink-0" />
                        {tip}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>

            {/* ===== SECTION 3: SMART WATER MANAGEMENT ===== */}
            <div ref={sectionRefs.water} id="water" className="scroll-mt-32 space-y-4">
              <div className="flex items-center gap-2">
                <Droplets size={20} className="text-accent" />
                <h2 className="text-xl font-bold text-foreground">Smart Water Management</h2>
              </div>

              <Card>
                <CardContent className="p-5">
                  <Badge variant="outline" className="text-[10px] mb-3 text-muted-foreground">INSIGHT</Badge>
                  <h3 className="text-base font-semibold text-foreground mb-1">
                    Recommended Irrigation Schedule for {varietyName}
                  </h3>
                  <p className="text-xs text-muted-foreground mb-4">
                    Calculated from planting date + climate forecast. Next 5 projected watering dates:
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-5 gap-3">
                    {wateringDates.map((date, i) => (
                      <div key={i} className={cn(
                        "text-center p-4 rounded-lg border-2 transition-colors",
                        i === 0 ? "border-primary bg-primary/5" : "border-border bg-muted/30"
                      )}>
                        <CalendarIcon size={20} className={cn("mx-auto mb-2", i === 0 ? "text-primary" : "text-muted-foreground")} />
                        <p className="text-sm font-bold text-foreground">{format(date, "MMM d")}</p>
                        <p className="text-[10px] text-muted-foreground">{format(date, "EEEE")}</p>
                        {i === 0 && <Badge className="mt-2 bg-primary/15 text-primary border-primary/30 text-[10px]">Next</Badge>}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Water Action */}
              <Card className="border-l-4" style={{ borderLeftColor: "hsl(var(--accent))" }}>
                <CardContent className="p-4">
                  <Badge variant="outline" className="text-[10px] mb-2 text-muted-foreground">ACTION</Badge>
                  <p className="text-sm font-medium text-foreground">Schedule drip irrigation for {format(wateringDates[0], "EEEE, MMM d")} at 05:30 AM.</p>
                  <p className="text-xs text-muted-foreground mt-1">Estimated duration: 45 minutes • Soil moisture target: 60%</p>
                </CardContent>
              </Card>

              {/* Quick stats */}
              <div className="grid grid-cols-3 gap-3">
                <Card><CardContent className="p-4 text-center">
                  <Droplets size={18} className="text-accent mx-auto mb-1" />
                  <p className="text-xs text-muted-foreground">Humidity</p>
                  <p className="text-lg font-bold text-foreground">68%</p>
                </CardContent></Card>
                <Card><CardContent className="p-4 text-center">
                  <Wind size={18} className="text-accent mx-auto mb-1" />
                  <p className="text-xs text-muted-foreground">Wind</p>
                  <p className="text-lg font-bold text-foreground">12 km/h</p>
                </CardContent></Card>
                <Card><CardContent className="p-4 text-center">
                  <Sun size={18} className="text-accent mx-auto mb-1" />
                  <p className="text-xs text-muted-foreground">UV Index</p>
                  <p className="text-lg font-bold text-foreground">7 High</p>
                </CardContent></Card>
              </div>
            </div>

            {/* ===== SECTION 4: INSURANCE & RESILIENCE ===== */}
            <div ref={sectionRefs.insurance} id="insurance" className="scroll-mt-32 space-y-4">
              <div className="flex items-center gap-2">
                <Shield size={20} className="text-primary" />
                <h2 className="text-xl font-bold text-foreground">Leverage Your Data for Lower Insurance Premiums</h2>
              </div>

              {/* Savings Callout */}
              <Card className="border-2 border-primary/20 bg-primary/5">
                <CardContent className="p-5 flex items-start gap-4">
                  <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                    <Shield size={28} className="text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-foreground leading-relaxed">
                      Your proactive management reduces risk. Farmers using High Hanging Fruit insights can save up to{" "}
                      <span className="font-bold text-primary text-base">15% on annual premiums</span>.
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Risk Profile */}
              <Card>
                <CardContent className="p-5">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <Badge variant="outline" className="text-[10px] mb-2 text-muted-foreground">INSIGHT</Badge>
                      <h3 className="text-base font-semibold text-foreground">Risk Profile Report</h3>
                      <p className="text-xs text-muted-foreground">GPS-stamped verified actions for your insurance agent</p>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center gap-1 text-xs text-primary">
                        <TrendingUp size={12} /> Improving
                      </div>
                      <p className="text-3xl font-bold text-primary">78/100</p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    {riskScores.map((s) => (
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
                  </div>

                  <div className="grid grid-cols-3 gap-3 pt-4 mt-4 border-t border-border">
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

                  <div className="flex gap-2 mt-4">
                    <Button variant="outline" size="sm" className="flex-1 gap-1 text-xs" onClick={() => setDialog("exportPdf")}>
                      <FileText size={12} /> Export PDF
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1 gap-1 text-xs" onClick={() => setDialog("viewLog")}>
                      <Eye size={12} /> View Action Log
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Available Plans — Action */}
              <Card className="border-l-4" style={{ borderLeftColor: "hsl(var(--primary))" }}>
                <CardContent className="p-5 space-y-3">
                  <Badge variant="outline" className="text-[10px] mb-2 text-muted-foreground">ACTION</Badge>
                  <h3 className="text-base font-semibold text-foreground">Available Insurance Plans</h3>
                  {plans.map((plan) => (
                    <div key={plan.name} className={cn(
                      "p-4 rounded-lg border space-y-2",
                      plan.recommended ? "border-primary bg-primary/5" : "border-border"
                    )}>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <p className="text-sm font-semibold text-foreground">{plan.name}</p>
                          {plan.recommended && <Badge className="bg-primary/10 text-primary border-primary/20 text-[10px]">Recommended</Badge>}
                        </div>
                        <p className="text-sm font-bold text-foreground">{plan.premium}</p>
                      </div>
                      <p className="text-xs text-muted-foreground">{plan.coverage}</p>
                      <div className="flex items-center justify-between">
                        <Badge variant="outline" className="text-[10px] bg-primary/5 text-primary">{plan.discount}</Badge>
                        <Button size="sm" variant={plan.recommended ? "default" : "outline"} className="h-7 text-xs gap-1">
                          {plan.recommended ? "Get Started" : "Learn More"} <ChevronRight size={12} />
                        </Button>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Dialogs */}
      {dialog === "exportPdf" && (
        <ActionDialog
          open
          onOpenChange={(open) => !open && setDialog(null)}
          title="Export Risk Profile PDF"
          description="Generate a formatted PDF report to share with your insurance agent."
          confirmLabel="Generate & Download PDF"
          variant="action"
        >
          <div className="space-y-2">
            {[
              { label: "Report Type", value: "Full Risk Profile" },
              { label: "Risk Score", value: "78/100" },
              { label: "Verified Actions", value: "12 entries" },
              { label: "GPS-Stamped", value: "8 of 12 entries" },
              { label: "Format", value: "PDF (A4)" },
            ].map((d) => (
              <div key={d.label} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                <span className="text-sm text-muted-foreground">{d.label}</span>
                <span className="text-sm font-medium text-foreground">{d.value}</span>
              </div>
            ))}
          </div>
        </ActionDialog>
      )}

      {dialog === "viewLog" && (
        <ActionDialog
          open
          onOpenChange={(open) => !open && setDialog(null)}
          title="Verified Action Log"
          description="GPS-stamped and timestamped action log for insurance verification."
          confirmLabel="Close"
          variant="view"
        >
          <div className="space-y-2">
            {[
              { action: "Irrigation completed — Plot A", time: "Today, 06:30", gps: true },
              { action: "Organic spray applied — Plot B", time: "Yesterday, 14:00", gps: true },
              { action: "GPS boundary logged", time: "Mar 5, 09:15", gps: true },
              { action: "Soil sample collected", time: "Mar 3, 11:00", gps: false },
              { action: "Pruning — lower branches Plot A", time: "Mar 2, 08:30", gps: true },
            ].map((log, i) => (
              <div key={i} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                <div className="flex items-center gap-2">
                  <CheckCircle size={14} className="text-primary shrink-0" />
                  <span className="text-sm text-foreground">{log.action}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-muted-foreground">{log.time}</span>
                  {log.gps && <Badge variant="outline" className="text-[10px] h-5 gap-0.5"><MapPin size={8} /> GPS</Badge>}
                </div>
              </div>
            ))}
          </div>
        </ActionDialog>
      )}
    </Layout>
  );
};

export default Platform;
