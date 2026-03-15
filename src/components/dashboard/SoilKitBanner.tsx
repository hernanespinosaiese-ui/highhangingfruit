import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FlaskConical, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const SoilKitBanner = () => {
  const navigate = useNavigate();

  return (
    <Card className="mb-6 border-dashed border-secondary/40 bg-secondary/5">
      <CardContent className="p-4 flex items-center gap-4">
        <div className="p-2.5 rounded-full bg-secondary/10 shrink-0">
          <FlaskConical size={20} className="text-secondary" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-foreground">Soil Kit results pending</p>
          <p className="text-xs text-muted-foreground">
            Soil pH, nutrient levels, and detailed health metrics will appear once your kit results are processed. Some data is estimated until then.
          </p>
        </div>
        <Button
          variant="outline"
          size="sm"
          className="shrink-0 gap-1 text-xs"
          onClick={() => navigate("/onboarding")}
        >
          Request Kit <ArrowRight size={12} />
        </Button>
      </CardContent>
    </Card>
  );
};

export default SoilKitBanner;
