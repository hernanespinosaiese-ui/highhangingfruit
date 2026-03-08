import DashboardHeader from "./DashboardHeader";
import AlertBanner from "./AlertBanner";
import WeatherWidget from "./WeatherWidget";
import InsuranceRiskProfile from "./InsuranceRiskProfile";
import SmartAlerts from "./SmartAlerts";
import MyPlots from "./MyPlots";
import AIInsights from "./AIInsights";

interface DashboardHomeProps {
  farmName: string;
}

const DashboardHome = ({ farmName }: DashboardHomeProps) => (
  <div className="space-y-6">
    <DashboardHeader farmName={farmName} />
    <AlertBanner />
    <WeatherWidget />
    <InsuranceRiskProfile />
    <SmartAlerts />
    <MyPlots />
    <AIInsights />
  </div>
);

export default DashboardHome;
