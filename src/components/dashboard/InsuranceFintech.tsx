import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FileText, CheckCircle } from "lucide-react";
import ActionDialog from "./ActionDialog";

const logs = [
  { action: "Irrigation completed — Plot A", time: "Today, 06:30", verified: true },
  { action: "Organic spray applied — Plot B", time: "Yesterday, 14:00", verified: true },
  { action: "GPS boundary logged", time: "Mar 5, 09:15", verified: true },
  { action: "Soil sample collected", time: "Mar 3, 11:00", verified: false },
];

const InsuranceFintech = () => {
  const [showExport, setShowExport] = useState(false);

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-base flex items-center justify-between">
          <span>📋 Insurance & Fintech</span>
          <Button variant="outline" size="sm" className="gap-1 h-7 text-xs" onClick={() => setShowExport(true)}>
            <FileText size={12} /> Export PDF
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        {logs.map((log, i) => (
          <div key={i} className="flex items-center justify-between p-2 rounded-md hover:bg-muted/50 transition-colors">
            <div className="flex items-center gap-2">
              {log.verified ? (
                <CheckCircle size={14} className="text-primary shrink-0" />
              ) : (
                <div className="w-3.5 h-3.5 rounded-full border-2 border-muted-foreground shrink-0" />
              )}
              <span className="text-sm text-foreground">{log.action}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-muted-foreground">{log.time}</span>
              {log.verified && <Badge variant="outline" className="text-[10px] h-5">Verified</Badge>}
            </div>
          </div>
        ))}
      </CardContent>

      <ActionDialog
        open={showExport}
        onOpenChange={setShowExport}
        title="Export Insurance Report PDF"
        description="Generate a formatted PDF with your verified action log and risk profile."
        confirmLabel="Generate & Download PDF"
        variant="action"
      >
        <div className="space-y-2">
          {[
            { label: "Actions Included", value: `${logs.filter(l => l.verified).length} verified entries` },
            { label: "Date Range", value: "Mar 3 — Mar 8, 2026" },
            { label: "Format", value: "PDF (A4)" },
          ].map((d) => (
            <div key={d.label} className="flex items-center justify-between py-2 border-b border-border last:border-0">
              <span className="text-sm text-muted-foreground">{d.label}</span>
              <span className="text-sm font-medium text-foreground">{d.value}</span>
            </div>
          ))}
        </div>
      </ActionDialog>
    </Card>
  );
};

export default InsuranceFintech;
