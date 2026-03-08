import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Camera, Upload } from "lucide-react";

const PestPhotoScan = () => {
  const [dragOver, setDragOver] = useState(false);

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-base flex items-center gap-2">
          <Camera size={16} className="text-accent" /> Pest Photo Scan
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div
          className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors cursor-pointer ${
            dragOver ? "border-primary bg-primary/5" : "border-border"
          }`}
          onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
          onDragLeave={() => setDragOver(false)}
          onDrop={(e) => { e.preventDefault(); setDragOver(false); }}
        >
          <Upload size={32} className="text-muted-foreground mx-auto mb-3" />
          <p className="text-sm font-medium text-foreground">
            Drag & drop a photo of affected leaves
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            AI will identify pest type and suggest organic treatments
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default PestPhotoScan;
