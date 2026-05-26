import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function LoadingScreen() {
  const [visible, setVisible] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          clearInterval(interval);
          return 100;
        }
        const step = p < 60 ? 3 : p < 85 ? 1.5 : 0.8;
        return Math.min(p + step, 100);
      });
    }, 30);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (progress >= 100) {
      const timer = setTimeout(() => setVisible(false), 600);
      return () => clearTimeout(timer);
    }
  }, [progress]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="loading"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[hsl(40,33%,89%)] dark:bg-[hsl(220,15%,8%)]"
        >
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-center gap-10"
          >
            <div
              className="text-3xl tracking-tight"
              style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontWeight: 700 }}
            >
              <span className="text-[hsl(36,25%,9%)] dark:text-[hsl(36,20%,92%)]">StageRight</span>
              <span className="text-[hsl(38,42%,52%)]">Pro</span>
            </div>

            <div className="flex flex-col items-center gap-4">
              <div className="relative w-48 h-[2px] rounded-full overflow-hidden bg-[hsl(38,20%,78%)] dark:bg-[hsl(220,12%,18%)]">
                <motion.div
                  className="absolute inset-y-0 left-0 rounded-full bg-[hsl(38,42%,52%)]"
                  style={{ width: `${progress}%` }}
                  transition={{ ease: "linear" }}
                />
              </div>
              <span
                className="text-xs tracking-widest uppercase text-[hsl(36,15%,45%)] dark:text-[hsl(220,10%,55%)]"
                style={{ fontFamily: "'DM Sans', sans-serif", letterSpacing: "0.15em" }}
              >
                {progress < 40 ? "Initializing" : progress < 75 ? "Loading assets" : progress < 95 ? "Almost there" : "Ready"}
              </span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
