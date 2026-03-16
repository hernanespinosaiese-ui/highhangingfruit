import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Leaf } from "lucide-react";

const loadingMessages = [
  "Analyzing your soil samples...",
  "Fetching local climate forecasts...",
  "Calculating irrigation schedules...",
  "Preparing your Insights Hub...",
];

const DataCrunching = () => {
  const navigate = useNavigate();
  const [msgIndex, setMsgIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setMsgIndex((prev) => (prev + 1) % loadingMessages.length);
    }, 700);

    const timeout = setTimeout(() => {
      navigate("/platform", { replace: true });
    }, 3000);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [navigate]);

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center px-4">
      {/* Pulsing logo */}
      <motion.div
        animate={{ scale: [1, 1.15, 1] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        className="w-20 h-20 rounded-full bg-primary flex items-center justify-center mb-8 shadow-lg"
      >
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" className="text-primary-foreground">
          <path d="M12 2C7 4 4 9 4 14c0 3 1.5 5.5 4 7 1-2 2-5 2-8 0-2 .5-4 2-6 1.5 2 2 4 2 6 0 3 1 6 2 8 2.5-1.5 4-4 4-7 0-5-3-10-8-12z" fill="currentColor"/>
        </svg>
      </motion.div>

      <h2 className="text-xl font-bold text-foreground mb-2">High Hanging Fruit</h2>
      <p className="text-sm text-muted-foreground mb-8">Crunching your farm data…</p>

      {/* Spinning loader */}
      <div className="w-10 h-10 border-4 border-primary/20 border-t-primary rounded-full animate-spin mb-8" />

      {/* Dynamic messages */}
      <div className="h-8">
        <AnimatePresence mode="wait">
          <motion.p
            key={msgIndex}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="text-sm font-medium text-primary text-center"
          >
            {loadingMessages[msgIndex]}
          </motion.p>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default DataCrunching;
