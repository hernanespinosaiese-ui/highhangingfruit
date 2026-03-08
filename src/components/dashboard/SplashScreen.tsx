import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Progress } from "@/components/ui/progress";

interface SplashScreenProps {
  onComplete: () => void;
}

const SplashScreen = ({ onComplete }: SplashScreenProps) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(onComplete, 300);
          return 100;
        }
        return prev + 2;
      });
    }, 50);
    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-background">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col items-center gap-6 px-8 text-center"
      >
        <span className="text-7xl">🥭</span>
        <h1 className="text-3xl md:text-4xl font-bold text-foreground">
          High Hanging Fruit
        </h1>
        <p className="text-muted-foreground text-lg">
          Climate-Smart Mango Intelligence
        </p>
        <div className="w-64 mt-4">
          <Progress value={progress} className="h-2" />
        </div>
        <p className="text-sm text-muted-foreground animate-pulse">
          Syncing farm data…
        </p>
      </motion.div>
    </div>
  );
};

export default SplashScreen;
