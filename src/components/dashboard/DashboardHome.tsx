import DashboardHeader from "./DashboardHeader";
import AlertBanner from "./AlertBanner";
import WeatherWidget from "./WeatherWidget";
import InsuranceRiskProfile from "./InsuranceRiskProfile";
import SmartAlerts from "./SmartAlerts";
import MyPlots from "./MyPlots";
import AIInsights from "./AIInsights";
import type { OnboardingPlot } from "@/pages/Platform";

interface DashboardHomeProps {
  farmName: string;
  plots: OnboardingPlot[];
  hasSoilKit: boolean;
}

const DashboardHome = ({ farmName, plots, hasSoilKit }: DashboardHomeProps) => (
  <div className="space-y-6">
    <DashboardHeader farmName={farmName} />
    <AlertBanner />
    <WeatherWidget />
    <InsuranceRiskProfile />
    <SmartAlerts />
    <MyPlots onboardingPlots={plots} hasSoilKit={hasSoilKit} />
    <AIInsights />
  </div>
);

export default DashboardHome;
