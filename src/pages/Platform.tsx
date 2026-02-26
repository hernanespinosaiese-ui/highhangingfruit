import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { MapPin, Thermometer, Droplets, AlertCircle, Leaf, TrendingUp, CloudRain, Sun, ArrowRight } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Layout from "@/components/Layout";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

// Mock data for What-If tool
const scenarioResults: Record<string, Record<string, { yield: string; risk: string; water: string }>> = {
  osteen: {
    march: { yield: "High", risk: "Low", water: "320 L/tree/week" },
    april: { yield: "Medium-High", risk: "Medium", water: "380 L/tree/week" },
    may: { yield: "Medium", risk: "High", water: "440 L/tree/week" },
  },
  kent: {
    march: { yield: "Medium", risk: "Low", water: "290 L/tree/week" },
    april: { yield: "High", risk: "Low", water: "340 L/tree/week" },
    may: { yield: "Medium", risk: "Medium", water: "400 L/tree/week" },
  },
  keitt: {
    march: { yield: "Medium", risk: "Medium", water: "310 L/tree/week" },
    april: { yield: "Medium-High", risk: "Low", water: "350 L/tree/week" },
    may: { yield: "Low", risk: "High", water: "420 L/tree/week" },
  },
};

const Platform = () => {
  const [variety, setVariety] = useState("osteen");
  const [month, setMonth] = useState("march");
  const result = scenarioResults[variety]?.[month];

  return (
    <Layout>
      {/* Header */}
      <section className="py-20 bg-muted">
        <div className="container mx-auto px-4 lg:px-8 text-center">
          <motion.div initial="hidden" animate="visible" variants={fadeUp}>
            <Badge className="mb-4 bg-accent text-accent-foreground">Interactive Preview</Badge>
            <h1 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
              The Farmer Dashboard
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
              Explore a preview of the platform — regional insights, your farm's data, and scenario planning tools.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Dashboard Tabs */}
      <section className="py-16">
        <div className="container mx-auto px-4 lg:px-8">
          <Tabs defaultValue="regional" className="w-full">
            <TabsList className="w-full justify-start mb-8 bg-muted h-auto flex-wrap gap-1 p-1">
              <TabsTrigger value="regional" className="text-sm">Regional Trends</TabsTrigger>
              <TabsTrigger value="farm" className="text-sm">My Farm</TabsTrigger>
              <TabsTrigger value="whatif" className="text-sm">What If?</TabsTrigger>
              <div className="flex items-center ml-auto">
                <Badge variant="outline" className="text-xs">
                  🔌 Sensor Integration — Coming Soon
                </Badge>
              </div>
            </TabsList>

            {/* Regional Trends */}
            <TabsContent value="regional">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <Card className="lg:col-span-2">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-lg">
                      <MapPin size={20} className="text-accent" />
                      Axarquía Region — Málaga Coast
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="aspect-[16/9] rounded-xl bg-gradient-to-br from-primary/10 via-accent/5 to-secondary/10 flex items-center justify-center relative overflow-hidden">
                      <div className="absolute inset-0 opacity-20">
                        {/* Stylized map dots */}
                        {[...Array(20)].map((_, i) => (
                          <div
                            key={i}
                            className="absolute w-3 h-3 rounded-full bg-primary/60"
                            style={{
                              left: `${15 + Math.random() * 70}%`,
                              top: `${15 + Math.random() * 70}%`,
                            }}
                          />
                        ))}
                      </div>
                      <div className="text-center z-10">
                        <MapPin size={48} className="text-accent mx-auto mb-3" />
                        <p className="text-foreground font-semibold">Interactive Regional Map</p>
                        <p className="text-muted-foreground text-sm">Soil health, rainfall & temperature trends</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <div className="space-y-4">
                  {[
                    { label: "Avg. Soil pH", value: "6.4", icon: Leaf, trend: "Stable" },
                    { label: "Monthly Rainfall", value: "42mm", icon: CloudRain, trend: "↓ 15% YoY" },
                    { label: "Avg. Temperature", value: "22.3°C", icon: Thermometer, trend: "↑ 0.8°C" },
                  ].map((stat) => (
                    <Card key={stat.label}>
                      <CardContent className="p-5 flex items-center gap-4">
                        <div className="w-11 h-11 rounded-xl bg-accent/10 flex items-center justify-center shrink-0">
                          <stat.icon size={22} className="text-accent" />
                        </div>
                        <div className="flex-1">
                          <p className="text-xs text-muted-foreground">{stat.label}</p>
                          <p className="text-xl font-bold text-foreground">{stat.value}</p>
                        </div>
                        <span className="text-xs text-muted-foreground">{stat.trend}</span>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </TabsContent>

            {/* My Farm */}
            <TabsContent value="farm">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                {[
                  { label: "Soil Health Score", value: "78/100", icon: Leaf, color: "text-primary" },
                  { label: "Water Efficiency", value: "Good", icon: Droplets, color: "text-accent" },
                  { label: "Next Frost Risk", value: "Low", icon: Thermometer, color: "text-secondary" },
                  { label: "Climate Outlook", value: "Favorable", icon: Sun, color: "text-amber" },
                ].map((kpi) => (
                  <Card key={kpi.label}>
                    <CardContent className="p-5 text-center">
                      <kpi.icon size={28} className={`${kpi.color} mx-auto mb-2`} />
                      <p className="text-2xl font-bold text-foreground">{kpi.value}</p>
                      <p className="text-xs text-muted-foreground mt-1">{kpi.label}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Recent Soil Results</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {[
                      { nutrient: "Nitrogen (N)", level: "Medium", pct: 60 },
                      { nutrient: "Phosphorus (P)", level: "High", pct: 82 },
                      { nutrient: "Potassium (K)", level: "Low", pct: 35 },
                      { nutrient: "Organic Matter", level: "Good", pct: 70 },
                    ].map((n) => (
                      <div key={n.nutrient}>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-foreground">{n.nutrient}</span>
                          <span className="text-muted-foreground">{n.level}</span>
                        </div>
                        <div className="h-2 bg-muted rounded-full overflow-hidden">
                          <div
                            className="h-full rounded-full bg-primary transition-all"
                            style={{ width: `${n.pct}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-base flex items-center gap-2">
                      <AlertCircle size={16} className="text-secondary" />
                      Alerts & Recommendations
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {[
                      { text: "Consider adding potassium supplements before flowering season.", type: "warning" as const },
                      { text: "Water efficiency is above regional average — keep current schedule.", type: "success" as const },
                      { text: "Frost risk window: monitor temperatures Dec 15–Jan 10.", type: "info" as const },
                    ].map((alert, i) => (
                      <div
                        key={i}
                        className={`p-3 rounded-lg text-sm ${
                          alert.type === "warning"
                            ? "bg-secondary/10 text-secondary"
                            : alert.type === "success"
                            ? "bg-primary/10 text-primary"
                            : "bg-accent/10 text-accent"
                        }`}
                      >
                        {alert.text}
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* What If */}
            <TabsContent value="whatif">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Scenario Builder</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div>
                      <label className="text-sm font-medium text-foreground mb-2 block">Mango Variety</label>
                      <Select value={variety} onValueChange={setVariety}>
                        <SelectTrigger><SelectValue /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="osteen">Osteen</SelectItem>
                          <SelectItem value="kent">Kent</SelectItem>
                          <SelectItem value="keitt">Keitt</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-foreground mb-2 block">Planting Month</label>
                      <Select value={month} onValueChange={setMonth}>
                        <SelectTrigger><SelectValue /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="march">March</SelectItem>
                          <SelectItem value="april">April</SelectItem>
                          <SelectItem value="may">May</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Projections based on your soil profile and 5-year climate models for Axarquía.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <TrendingUp size={20} className="text-primary" />
                      Projected Outcome
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {result && (
                      <div className="space-y-6">
                        {[
                          { label: "Expected Yield", value: result.yield },
                          { label: "Climate Risk", value: result.risk },
                          { label: "Water Requirement", value: result.water },
                        ].map((r) => (
                          <div key={r.label} className="flex justify-between items-center border-b border-border pb-4 last:border-0">
                            <span className="text-sm text-muted-foreground">{r.label}</span>
                            <span className="font-semibold text-foreground">{r.value}</span>
                          </div>
                        ))}
                        <p className="text-xs text-muted-foreground italic">
                          Try changing variety or planting month to compare outcomes.
                        </p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>

          {/* CTA */}
          <div className="mt-16 text-center">
            <p className="text-muted-foreground mb-4">Want to see your farm's real data on this dashboard?</p>
            <Button asChild size="lg">
              <Link to="/request-kit" className="gap-2">
                Request Your Soil Kit <ArrowRight size={18} />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Platform;
