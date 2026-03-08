import { Badge } from "@/components/ui/badge";

interface DashboardHeaderProps {
  farmName: string;
}

const DashboardHeader = ({ farmName }: DashboardHeaderProps) => (
  <div className="space-y-2">
    <h1 className="text-2xl font-bold text-foreground">Good morning ☀️</h1>
    <p className="text-muted-foreground">{farmName}</p>
    <Badge className="bg-primary/10 text-primary border-primary/20">🌿 Organic Certified</Badge>
  </div>
);

export default DashboardHeader;
