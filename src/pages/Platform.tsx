import { useState, useCallback, useEffect } from "react";
import Layout from "@/components/Layout";
import SplashScreen from "@/components/dashboard/SplashScreen";
import FarmOnboarding from "@/components/onboarding/FarmOnboarding";
import PlatformNav, { type PlatformTab } from "@/components/dashboard/PlatformNav";
import DashboardHome from "@/components/dashboard/DashboardHome";
import AlertsPage from "@/components/dashboard/AlertsPage";
import PlotsPage from "@/components/dashboard/PlotsPage";
import InsightsPage from "@/components/dashboard/InsightsPage";
import InsurancePage from "@/components/dashboard/InsurancePage";
import SoilKitBanner from "@/components/dashboard/SoilKitBanner";

export interface OnboardingPlot {
  id: string;
  variety: string;
  plantingDate: string;
  size: string;
}

export interface FarmOnboardingData {
  farmName: string;
  region: string;
  farmSize: string;
  plots: OnboardingPlot[];
  hasSoilKit: boolean;
}

const STORAGE_KEY = "hhf_farm_session";

const Platform = () => {
  const [state, setState] = useState<"splash" | "onboarding" | "dashboard">(() => {
    const saved = sessionStorage.getItem(STORAGE_KEY);
    return saved ? "dashboard" : "splash";
  });

  const [farmData, setFarmData] = useState<FarmOnboardingData>(() => {
    const saved = sessionStorage.getItem(STORAGE_KEY);
    if (saved) {
      try { return JSON.parse(saved); } catch { /* fall through */ }
    }
    return { farmName: "My Farm", region: "South Asia", farmSize: "", plots: [], hasSoilKit: false };
  });

  const [activeTab, setActiveTab] = useState<PlatformTab>("dashboard");

  const handleSplashComplete = useCallback(() => setState("onboarding"), []);

  const handleOnboardingComplete = (data: FarmOnboardingData) => {
    setFarmData(data);
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    setState("dashboard");
  };

  if (state === "splash") {
    return <SplashScreen onComplete={handleSplashComplete} />;
  }

  if (state === "onboarding") {
    return <FarmOnboarding onComplete={handleOnboardingComplete} />;
  }

  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return <DashboardHome farmName={farmData.farmName} plots={farmData.plots} hasSoilKit={farmData.hasSoilKit} />;
      case "alerts":
        return <AlertsPage />;
      case "plots":
        return <PlotsPage onboardingPlots={farmData.plots} hasSoilKit={farmData.hasSoilKit} />;
      case "insights":
        return <InsightsPage />;
      case "insurance":
        return <InsurancePage />;
    }
  };

  return (
    <Layout>
      <section className="py-4 pb-24 md:pb-16">
        <div className="container mx-auto px-6 lg:px-16 max-w-7xl">
          <PlatformNav activeTab={activeTab} onTabChange={setActiveTab} />
          {!farmData.hasSoilKit && <SoilKitBanner />}
          {renderContent()}
        </div>
      </section>
    </Layout>
  );
};

export default Platform;
