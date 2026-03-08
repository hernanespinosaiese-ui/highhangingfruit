import { useState, useCallback } from "react";
import Layout from "@/components/Layout";
import SplashScreen from "@/components/dashboard/SplashScreen";
import FarmOnboarding from "@/components/onboarding/FarmOnboarding";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import AlertBanner from "@/components/dashboard/AlertBanner";
import WeatherWidget from "@/components/dashboard/WeatherWidget";
import InsuranceRiskProfile from "@/components/dashboard/InsuranceRiskProfile";
import SmartAlerts from "@/components/dashboard/SmartAlerts";
import MyPlots from "@/components/dashboard/MyPlots";
import AIInsights from "@/components/dashboard/AIInsights";
import InsuranceFintech from "@/components/dashboard/InsuranceFintech";
import PestPhotoScan from "@/components/dashboard/PestPhotoScan";

type State = "splash" | "onboarding" | "dashboard";

const Platform = () => {
  const [state, setState] = useState<State>("splash");
  const [farmData, setFarmData] = useState({ farmName: "My Farm", region: "South Asia" });

  const handleSplashComplete = useCallback(() => setState("onboarding"), []);

  const handleOnboardingComplete = (data: { farmName: string; region: string }) => {
    setFarmData(data);
    setState("dashboard");
  };

  if (state === "splash") {
    return <SplashScreen onComplete={handleSplashComplete} />;
  }

  if (state === "onboarding") {
    return <FarmOnboarding onComplete={handleOnboardingComplete} />;
  }

  return (
    <Layout>
      <section className="py-8 pb-16">
        <div className="container mx-auto px-4 lg:px-8 max-w-3xl space-y-6">
          <DashboardHeader farmName={farmData.farmName} />
          <AlertBanner />
          <WeatherWidget />
          <InsuranceRiskProfile />
          <SmartAlerts />
          <MyPlots />
          <AIInsights />
          <InsuranceFintech />
          <PestPhotoScan />
        </div>
      </section>
    </Layout>
  );
};

export default Platform;
