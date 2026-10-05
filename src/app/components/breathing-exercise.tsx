import { useState, useEffect } from "react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { motion, AnimatePresence } from "motion/react";

type Phase = "inhale" | "hold" | "exhale" | "rest";

export function BreathingExercise() {
  const [isActive, setIsActive] = useState(false);
  const [phase, setPhase] = useState<Phase>("inhale");
  const [count, setCount] = useState(4);
  const [cycle, setCycle] = useState(0);

  useEffect(() => {
    if (!isActive) return;

    const timer = setInterval(() => {
      setCount((prev) => {
        if (prev > 1) return prev - 1;

        // Move to next phase
        switch (phase) {
          case "inhale":
            setPhase("hold");
            return 7;
          case "hold":
            setPhase("exhale");
            return 8;
          case "exhale":
            setPhase("rest");
            return 4;
          case "rest":
            setPhase("inhale");
            setCycle((c) => c + 1);
            return 4;
          default:
            return 4;
        }
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isActive, phase]);

  const handleToggle = () => {
    if (isActive) {
      setIsActive(false);
      setPhase("inhale");
      setCount(4);
    } else {
      setIsActive(true);
      setCycle(0);
    }
  };

  const getPhaseText = () => {
    switch (phase) {
      case "inhale":
        return "Breathe In";
      case "hold":
        return "Hold";
      case "exhale":
        return "Breathe Out";
      case "rest":
        return "Rest";
    }
  };

  const getScale = () => {
    switch (phase) {
      case "inhale":
        return 1.5;
      case "hold":
        return 1.5;
      case "exhale":
        return 0.8;
      case "rest":
        return 0.8;
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="mb-2">Breathing Exercise</h2>
        <p className="text-muted-foreground">
          Follow the guided breathing pattern to calm your mind and reduce anxiety
        </p>
      </div>

      <Card className="p-8 flex flex-col items-center justify-center min-h-[400px]">
        <div className="relative w-full max-w-md aspect-square flex items-center justify-center">
          <AnimatePresence mode="wait">
            {isActive && (
              <motion.div
                key={phase}
                className="absolute inset-0 flex items-center justify-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <motion.div
                  className="w-48 h-48 rounded-full bg-gradient-to-br from-primary/40 to-primary/10 backdrop-blur-sm flex items-center justify-center"
                  animate={{
                    scale: getScale(),
                  }}
                  transition={{
                    duration: phase === "inhale" ? 4 : phase === "hold" ? 7 : phase === "exhale" ? 8 : 4,
                    ease: "easeInOut",
                  }}
                >
                  <div className="text-center">
                    <div className="text-4xl mb-2">{count}</div>
                    <div className="text-primary">{getPhaseText()}</div>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {!isActive && (
            <div className="text-center">
              <div className="w-48 h-48 rounded-full bg-primary/20 flex items-center justify-center mb-4 mx-auto">
                <div className="text-6xl">🌙</div>
              </div>
              <p className="text-muted-foreground">Ready to begin</p>
            </div>
          )}
        </div>

        <div className="mt-8 text-center space-y-4">
          {isActive && (
            <div className="text-muted-foreground">
              Cycle {cycle} complete
            </div>
          )}
          <Button onClick={handleToggle} size="lg" className="min-w-[200px]">
            {isActive ? "Stop Exercise" : "Start Breathing"}
          </Button>
        </div>
      </Card>

      <Card className="p-6 bg-secondary/30">
        <h3 className="mb-3">How it works</h3>
        <ul className="space-y-2 text-muted-foreground">
          <li>• Breathe in slowly for 4 seconds</li>
          <li>• Hold your breath for 7 seconds</li>
          <li>• Breathe out gently for 8 seconds</li>
          <li>• Rest for 4 seconds before repeating</li>
        </ul>
        <p className="text-muted-foreground mt-4 text-sm">
          Based on the 4-7-8 breathing technique, developed by Dr. Andrew Weil, 
          which helps activate the parasympathetic nervous system for relaxation.
        </p>
      </Card>
    </div>
  );
}