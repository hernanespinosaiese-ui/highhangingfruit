import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, Info, Leaf, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

const stepLabels = [
  "Create Your Account",
  "Farm Details",
  "Plot Details",
  "Challenges",
];

const locationOptions = [
  "Vélez-Málaga",
  "Nerja",
  "Torrox",
  "Rincón de la Victoria",
  "Algarrobo",
];

const mangoVarieties = [
  "Osteen",
  "Keitt",
  "Kent",
  "Tommy Atkins",
  "Irwin",
];

const Onboarding = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [plots, setPlots] = useState([{ variety: "", plantingDate: undefined as Date | undefined, plotSize: "" }]);
  const [dateErrors, setDateErrors] = useState<string[]>([""]);
  const [farmName, setFarmName] = useState("");
  const [location, setLocation] = useState("");

  const addPlot = () => {
    setPlots([...plots, { variety: "", plantingDate: undefined, plotSize: "" }]);
    setDateErrors([...dateErrors, ""]);
  };

  const removePlot = (index: number) => {
    setPlots(plots.filter((_, i) => i !== index));
    setDateErrors(dateErrors.filter((_, i) => i !== index));
  };

  const updatePlot = (index: number, field: string, value: any) => {
    const updated = [...plots];
    (updated[index] as any)[field] = value;
    setPlots(updated);
  };

  const progress = ((step + 1) / stepLabels.length) * 100;

  const next = () => {
    if (step < stepLabels.length - 1) setStep(step + 1);
  };
  const prev = () => { if (step > 0) setStep(step - 1); };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const sessionData = {
      farmName: farmName || "My Farm",
      region: location || "Vélez-Málaga",
      farmSize: "",
      plots: plots.map((p, i) => ({
        id: String(i + 1),
        variety: p.variety,
        plantingDate: p.plantingDate?.toISOString() || "",
        size: p.plotSize,
      })),
      hasSoilKit: true,
    };
    sessionStorage.setItem("hhf_farm_session", JSON.stringify(sessionData));
    navigate("/platform");
  };

  return (
    <div className="min-h-screen bg-muted flex flex-col">
      <header className="bg-background border-b border-border">
        <div className="container mx-auto flex items-center h-16 px-4 lg:px-8">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="text-primary-foreground">
                <path d="M12 2C7 4 4 9 4 14c0 3 1.5 5.5 4 7 1-2 2-5 2-8 0-2 .5-4 2-6 1.5 2 2 4 2 6 0 3 1 6 2 8 2.5-1.5 4-4 4-7 0-5-3-10-8-12z" fill="currentColor"/>
              </svg>
            </div>
            <span className="text-lg font-bold tracking-tight text-foreground">High Hanging Fruit</span>
          </Link>
        </div>
      </header>

      <div className="flex-1 flex items-center justify-center py-8 px-4">
        <div className="w-full max-w-2xl">
          <div className="mb-8">
            <div className="flex justify-between mb-3">
              {stepLabels.map((label, i) => (
                <button
                  key={label}
                  type="button"
                  onClick={() => i < step && setStep(i)}
                  className={cn(
                    "text-xs font-medium transition-colors text-center flex-1",
                    i === step ? "text-primary" : i < step ? "text-primary/60 cursor-pointer" : "text-muted-foreground"
                  )}
                >
                  <div className={cn(
                    "w-8 h-8 rounded-full flex items-center justify-center mx-auto mb-1 text-sm font-bold border-2 transition-colors",
                    i === step ? "border-primary bg-primary text-primary-foreground" :
                    i < step ? "border-primary bg-primary/10 text-primary" :
                    "border-border bg-background text-muted-foreground"
                  )}>
                    {i < step ? <CheckCircle size={16} /> : i + 1}
                  </div>
                  <span className="hidden sm:block">{label}</span>
                </button>
              ))}
            </div>
            <Progress value={progress} className="h-2" />
          </div>

          <Card>
            <CardContent className="p-6 sm:p-8">
              <form onSubmit={step === stepLabels.length - 1 ? handleSubmit : (e) => { e.preventDefault(); next(); }}>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={step}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.25 }}
                  >
                    {step === 0 && (
                      <div className="space-y-5">
                        <div>
                          <h2 className="text-xl font-bold text-foreground mb-1">Create Your Account</h2>
                          <p className="text-sm text-muted-foreground">Set up your credentials to access MyPlatform.</p>
                        </div>
                        <div>
                          <Label htmlFor="email">Email Address</Label>
                          <Input id="email" type="email" placeholder="maria@example.com" />
                        </div>
                        <div>
                          <Label htmlFor="password">Password</Label>
                          <Input id="password" type="password" placeholder="••••••••" />
                        </div>
                      </div>
                    )}

                    {step === 1 && (
                      <div className="space-y-5">
                        <div>
                          <h2 className="text-xl font-bold text-foreground mb-1">Farm Details</h2>
                          <p className="text-sm text-muted-foreground">Tell us about your farm so we can tailor your experience.</p>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="farmName">Farm Name</Label>
                            <Input id="farmName" placeholder="Finca Los Mangos" value={farmName} onChange={(e) => setFarmName(e.target.value)} maxLength={100} />
                          </div>
                          <div>
                            <Label htmlFor="location">Location (Region)</Label>
                            <Select value={location} onValueChange={setLocation}>
                              <SelectTrigger>
                                <SelectValue placeholder="Select a region" />
                              </SelectTrigger>
                              <SelectContent>
                                {locationOptions.map((loc) => (
                                  <SelectItem key={loc} value={loc}>{loc}</SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                        <div>
                          <Label htmlFor="address">Full Address</Label>
                          <Input id="address" placeholder="Camino Rural 12, 29700 Vélez-Málaga" />
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="manager">Farm Manager Name</Label>
                            <Input id="manager" placeholder="María García" />
                          </div>
                          <div>
                            <Label htmlFor="phone">Contact Phone Number</Label>
                            <Input id="phone" type="tel" placeholder="+34 600 000 000" />
                          </div>
                        </div>
                      </div>
                    )}

                    {step === 2 && (
                      <div className="space-y-5">
                        <div>
                          <h2 className="text-xl font-bold text-foreground mb-1">Plot Details</h2>
                          <div className="flex items-start gap-2 mt-2 p-3 rounded-lg bg-primary/5 border border-primary/20">
                            <Info size={18} className="text-primary mt-0.5 shrink-0" />
                            <p className="text-sm text-foreground font-medium">
                              Tell us about your planting goals so we can calibrate your soil kit.
                            </p>
                          </div>
                        </div>

                        {plots.map((plot, i) => (
                          <div key={i} className="space-y-4 p-4 rounded-lg border border-border bg-background">
                            <div className="flex items-center justify-between">
                              <span className="text-sm font-semibold text-foreground">Plot {i + 1}</span>
                              {plots.length > 1 && (
                                <Button type="button" variant="ghost" size="sm" onClick={() => removePlot(i)} className="text-destructive hover:text-destructive h-8 px-2">
                                  <Trash2 size={14} className="mr-1" /> Remove
                                </Button>
                              )}
                            </div>
                            <div>
                              <Label htmlFor={`variety-${i}`}>Mango Variety</Label>
                              <Select value={plot.variety} onValueChange={(val) => updatePlot(i, "variety", val)}>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select a variety" />
                                </SelectTrigger>
                                <SelectContent>
                                  {mangoVarieties.map((v) => (
                                    <SelectItem key={v} value={v}>{v}</SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                              {i === 0 && (
                                <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
                                  <Leaf size={12} className="text-primary" />
                                  If planting more than one variety, add another plot below.
                                </p>
                              )}
                            </div>
                            <div>
                              <Label>Planting Date</Label>
                              <Popover>
                                <PopoverTrigger asChild>
                                  <Button
                                    variant="outline"
                                    className={cn(
                                      "w-full justify-start text-left font-normal",
                                      !plot.plantingDate && "text-muted-foreground"
                                    )}
                                  >
                                    <CalendarIcon className="mr-2 h-4 w-4" />
                                    {plot.plantingDate ? format(plot.plantingDate, "PPP") : "Select a planting date"}
                                  </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0" align="start">
                                  <Calendar
                                    mode="single"
                                    selected={plot.plantingDate}
                                    onSelect={(d) => {
                                      updatePlot(i, "plantingDate", d);
                                      const newErrors = [...dateErrors];
                                      newErrors[i] = "";
                                      setDateErrors(newErrors);
                                    }}
                                    disabled={(date) => date <= new Date()}
                                    initialFocus
                                    className="p-3 pointer-events-auto"
                                  />
                                </PopoverContent>
                              </Popover>
                              <p className="text-xs text-muted-foreground mt-1">Must be a future date.</p>
                            </div>
                            <div>
                              <Label htmlFor={`plotSize-${i}`}>Plot Size (hectares)</Label>
                              <Input
                                id={`plotSize-${i}`}
                                type="number"
                                step="0.1"
                                min="0.1"
                                placeholder="2.5"
                                value={plot.plotSize}
                                onChange={(e) => updatePlot(i, "plotSize", e.target.value)}
                              />
                            </div>
                          </div>
                        ))}

                        <Button type="button" variant="outline" className="w-full gap-2" onClick={addPlot}>
                          <Plus size={16} /> Add Another Plot
                        </Button>
                      </div>
                    )}

                    {step === 3 && (
                      <div className="space-y-5">
                        <div>
                          <h2 className="text-xl font-bold text-foreground mb-1">Challenges</h2>
                          <p className="text-sm text-muted-foreground">Help us understand what matters most to you.</p>
                        </div>
                        <div>
                          <Label htmlFor="challenge">What is your top challenge in climate resiliency today?</Label>
                          <Textarea
                            id="challenge"
                            placeholder="e.g. Unpredictable rainfall patterns, soil degradation, pest outbreaks..."
                            rows={5}
                          />
                        </div>
                      </div>
                    )}
                  </motion.div>
                </AnimatePresence>

                <div className="flex justify-between mt-8">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={prev}
                    disabled={step === 0}
                  >
                    Back
                  </Button>
                  {step < stepLabels.length - 1 ? (
                    <Button type="submit">Continue</Button>
                  ) : (
                    <Button type="submit" size="lg" className="px-8">
                      🚀 Launch MyPlatform
                    </Button>
                  )}
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Onboarding;
