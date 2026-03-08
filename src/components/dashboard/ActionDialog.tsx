import { useState, ReactNode } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";

interface ActionDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description?: string;
  children?: ReactNode;
  confirmLabel?: string;
  onConfirm?: () => void;
  variant?: "action" | "view";
}

const ActionDialog = ({
  open,
  onOpenChange,
  title,
  description,
  children,
  confirmLabel = "Confirm",
  onConfirm,
  variant = "action",
}: ActionDialogProps) => {
  const [confirmed, setConfirmed] = useState(false);

  const handleConfirm = () => {
    setConfirmed(true);
    onConfirm?.();
    setTimeout(() => {
      setConfirmed(false);
      onOpenChange(false);
    }, 1500);
  };

  return (
    <Dialog open={open} onOpenChange={(v) => { if (!confirmed) onOpenChange(v); }}>
      <DialogContent className="sm:max-w-lg">
        {confirmed ? (
          <div className="flex flex-col items-center justify-center py-8 gap-3">
            <CheckCircle size={48} className="text-primary" />
            <p className="text-sm font-medium text-foreground">Done! Action completed successfully.</p>
          </div>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle>{title}</DialogTitle>
              {description && <DialogDescription>{description}</DialogDescription>}
            </DialogHeader>
            {children && <div className="space-y-3 max-h-[60vh] overflow-y-auto">{children}</div>}
            <DialogFooter className="gap-2 sm:gap-0">
              <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
              {variant === "action" && (
                <Button onClick={handleConfirm}>{confirmLabel}</Button>
              )}
            </DialogFooter>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default ActionDialog;
