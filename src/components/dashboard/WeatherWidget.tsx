import { Droplets, Wind, CloudRain, Sun } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const stats = [
  { icon: Droplets, label: "Humidity", value: "68%" },
  { icon: Wind, label: "Wind", value: "12 km/h" },
  { icon: CloudRain, label: "Rain", value: "0 mm" },
  { icon: Sun, label: "UV Index", value: "7 High" },
];

const WeatherWidget = () => (
  <Card>
    <CardHeader className="pb-3">
      <CardTitle className="text-base flex items-center justify-between">
        <span>Weather</span>
        <span className="text-3xl font-bold text-foreground">32°C</span>
      </CardTitle>
    </CardHeader>
    <CardContent>
      <div className="grid grid-cols-4 gap-2">
        {stats.map((s) => (
          <div key={s.label} className="text-center">
            <s.icon size={18} className="text-accent mx-auto mb-1" />
            <p className="text-xs text-muted-foreground">{s.label}</p>
            <p className="text-sm font-semibold text-foreground">{s.value}</p>
          </div>
        ))}
      </div>
    </CardContent>
  </Card>
);

export default WeatherWidget;
