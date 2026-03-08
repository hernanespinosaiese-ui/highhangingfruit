import { LayoutDashboard, Bell, Map, Brain, Shield } from "lucide-react";
import { cn } from "@/lib/utils";

export type PlatformTab = "dashboard" | "alerts" | "plots" | "insights" | "insurance";

const tabs: { id: PlatformTab; label: string; icon: typeof LayoutDashboard }[] = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { id: "alerts", label: "Alerts", icon: Bell },
  { id: "plots", label: "Plots", icon: Map },
  { id: "insights", label: "Insights", icon: Brain },
  { id: "insurance", label: "Insurance", icon: Shield },
];

interface PlatformNavProps {
  activeTab: PlatformTab;
  onTabChange: (tab: PlatformTab) => void;
}

const PlatformNav = ({ activeTab, onTabChange }: PlatformNavProps) => (
  <nav className="fixed bottom-0 left-0 right-0 z-40 bg-card border-t border-border md:static md:border-t-0 md:border-b md:mb-6">
    <div className="container mx-auto max-w-3xl">
      <div className="flex items-center justify-around md:justify-start md:gap-1 py-1 md:py-0">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={cn(
              "flex flex-col md:flex-row items-center gap-0.5 md:gap-2 px-3 py-2 md:py-3 rounded-md text-xs md:text-sm font-medium transition-colors",
              activeTab === tab.id
                ? "text-primary bg-primary/10"
                : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
            )}
          >
            <tab.icon size={18} />
            <span>{tab.label}</span>
          </button>
        ))}
      </div>
    </div>
  </nav>
);

export default PlatformNav;
