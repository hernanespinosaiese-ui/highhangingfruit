import { useState, useCallback } from "react";
import Layout from "@/components/Layout";
import SplashScreen from "@/components/dashboard/SplashScreen";
import FarmOnboarding from "@/components/onboarding/FarmOnboarding";
import PlatformNav, { type PlatformTab } from "@/components/dashboard/PlatformNav";
import DashboardHome from "@/components/dashboard/DashboardHome";
import AlertsPage from "@/components/dashboard/AlertsPage";
import PlotsPage from "@/components/dashboard/PlotsPage";
import InsightsPage from "@/components/dashboard/InsightsPage";
import InsurancePage from "@/components/dashboard/InsurancePage";

type State = "splash" | "onboarding" | "dashboard";

const Platform = () => {
  const [state, setState] = useState<State>("splash");
  const [farmData, setFarmData] = useState({ farmName: "My Farm", region: "South Asia" });
  const [activeTab, setActiveTab] = useState<PlatformTab>("dashboard");

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

  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return <DashboardHome farmName={farmData.farmName} />;
      case "alerts":
        return <AlertsPage />;
      case "plots":
        return <PlotsPage />;
      case "insights":
        return <InsightsPage />;
      case "insurance":
        return <InsurancePage />;
    }
  };

  return (
    <Layout>
      <section className="py-4 pb-24 md:pb-16">
        <div className="container mx-auto px-4 lg:px-8 max-w-3xl">
          <PlatformNav activeTab={activeTab} onTabChange={setActiveTab} />
          {renderContent()}
        </div>
      </section>
    </Layout>
  );
};

export default Platform;
