import { useState } from "react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { motion } from "motion/react";

type VisualMode = "stars" | "waves" | "aurora" | null;

export function RelaxationVisuals() {
  const [mode, setMode] = useState<VisualMode>(null);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="mb-2">Relaxation Visuals</h2>
        <p className="text-muted-foreground">
          Gentle, calming animations designed to ease eye strain and promote relaxation
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card
          className={`p-6 cursor-pointer transition-all hover:border-primary/50 ${
            mode === "stars" ? "border-primary" : ""
          }`}
          onClick={() => setMode(mode === "stars" ? null : "stars")}
        >
          <div className="text-center">
            <div className="text-4xl mb-3">✨</div>
            <h3 className="mb-2">Starry Night</h3>
            <p className="text-muted-foreground">Twinkling stars in the night sky</p>
          </div>
        </Card>

        <Card
          className={`p-6 cursor-pointer transition-all hover:border-primary/50 ${
            mode === "waves" ? "border-primary" : ""
          }`}
          onClick={() => setMode(mode === "waves" ? null : "waves")}
        >
          <div className="text-center">
            <div className="text-4xl mb-3">🌊</div>
            <h3 className="mb-2">Ocean Waves</h3>
            <p className="text-muted-foreground">Gentle rolling waves</p>
          </div>
        </Card>

        <Card
          className={`p-6 cursor-pointer transition-all hover:border-primary/50 ${
            mode === "aurora" ? "border-primary" : ""
          }`}
          onClick={() => setMode(mode === "aurora" ? null : "aurora")}
        >
          <div className="text-center">
            <div className="text-4xl mb-3">🌌</div>
            <h3 className="mb-2">Aurora</h3>
            <p className="text-muted-foreground">Flowing northern lights</p>
          </div>
        </Card>
      </div>

      <Card className="p-8 min-h-[400px] bg-gradient-to-b from-background to-secondary/20 overflow-hidden relative">
        {!mode && (
          <div className="flex items-center justify-center h-full">
            <div className="text-center">
              <div className="text-6xl mb-4">🌙</div>
              <p className="text-muted-foreground">Select a visual above to begin</p>
            </div>
          </div>
        )}

        {mode === "stars" && (
          <div className="absolute inset-0">
            {Array.from({ length: 50 }).map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-primary rounded-full"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                animate={{
                  opacity: [0.2, 1, 0.2],
                  scale: [0.5, 1.5, 0.5],
                }}
                transition={{
                  duration: 2 + Math.random() * 3,
                  repeat: Infinity,
                  delay: Math.random() * 2,
                }}
              />
            ))}
          </div>
        )}

        {mode === "waves" && (
          <div className="absolute inset-0 overflow-hidden bg-gradient-to-b from-blue-950/30 to-blue-900/50">
            {/* Multiple wave layers from different positions */}
            {Array.from({ length: 8 }).map((_, i) => {
              const isFromLeft = i % 2 === 0;
              const yPosition = (i * 12) + 5;
              
              return (
                <svg
                  key={i}
                  className="absolute w-full h-24"
                  style={{ top: `${yPosition}%` }}
                  viewBox="0 0 1200 120"
                  preserveAspectRatio="none"
                >
                  {/* Wave fill */}
                  <motion.path
                    d={isFromLeft 
                      ? "M0,60 Q150,30 300,60 T600,60 T900,60 T1200,60 L1200,120 L0,120 Z"
                      : "M1200,60 Q1050,30 900,60 T600,60 T300,60 T0,60 L0,120 L1200,120 Z"
                    }
                    fill={`rgba(100, 149, 237, ${0.1 + i * 0.04})`}
                    initial={{ x: isFromLeft ? -100 : 100 }}
                    animate={{ 
                      x: isFromLeft ? [0, 100, 0] : [0, -100, 0],
                    }}
                    transition={{
                      duration: 8 + i * 0.5,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: i * 0.2,
                    }}
                  />
                  
                  {/* Wave crest */}
                  <motion.path
                    d={isFromLeft
                      ? "M0,50 Q150,20 300,50 T600,50 T900,50 T1200,50"
                      : "M1200,50 Q1050,20 900,50 T600,50 T300,50 T0,50"
                    }
                    stroke={`rgba(135, 206, 250, ${0.3 + i * 0.05})`}
                    strokeWidth="2"
                    fill="none"
                    initial={{ x: isFromLeft ? -100 : 100 }}
                    animate={{ 
                      x: isFromLeft ? [0, 150, 0] : [0, -150, 0],
                      opacity: [0.4, 0.8, 0.4],
                    }}
                    transition={{
                      duration: 7 + i * 0.6,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: i * 0.15,
                    }}
                  />
                </svg>
              );
            })}
            
            {/* Foam/highlights on waves */}
            {Array.from({ length: 12 }).map((_, i) => (
              <motion.div
                key={`foam-${i}`}
                className="absolute w-16 h-2 rounded-full"
                style={{
                  background: "rgba(200, 220, 255, 0.3)",
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  filter: "blur(2px)",
                }}
                animate={{
                  x: [0, -50, 0],
                  opacity: [0.2, 0.6, 0.2],
                }}
                transition={{
                  duration: 5 + Math.random() * 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: Math.random() * 2,
                }}
              />
            ))}
          </div>
        )}

        {mode === "aurora" && (
          <div className="absolute inset-0 overflow-hidden bg-gradient-to-b from-gray-900/40 to-gray-950/60">
            {/* Base glow */}
            <motion.div
              className="absolute inset-0 opacity-50"
              style={{
                background: "radial-gradient(ellipse at 50% 0%, rgba(150, 200, 255, 0.3) 0%, transparent 60%)",
              }}
              animate={{
                opacity: [0.3, 0.6, 0.3],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
            
            {/* Multicolor aurora waves */}
            {[
              { color: "135, 206, 250", name: "soft blue", delay: 0 }, // Soft blue
              { color: "255, 192, 203", name: "soft pink", delay: 1.5 }, // Soft pink
              { color: "144, 238, 144", name: "soft green", delay: 3 }, // Soft green
              { color: "255, 160, 122", name: "amber red", delay: 4.5 }, // Amber/coral red
              { color: "200, 184, 219", name: "lavender", delay: 6 }, // Lavender
            ].map((aurora, i) => (
              <motion.div
                key={i}
                className="absolute w-full h-72"
                style={{
                  top: `${i * 15}%`,
                  background: `linear-gradient(90deg, 
                    transparent 0%, 
                    rgba(${aurora.color}, 0.4) 25%, 
                    rgba(${aurora.color}, 0.5) 50%, 
                    rgba(${aurora.color}, 0.4) 75%, 
                    transparent 100%)`,
                  filter: "blur(50px)",
                }}
                animate={{
                  x: ["-40%", "40%", "-40%"],
                  opacity: [0.4, 0.8, 0.4],
                  scaleY: [1, 1.2, 1],
                }}
                transition={{
                  duration: 14 + i * 1.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: aurora.delay,
                }}
              />
            ))}
            
            {/* Flowing ribbons */}
            {Array.from({ length: 3 }).map((_, i) => {
              const colors = [
                "rgba(255, 192, 203, 0.3)", // Pink
                "rgba(144, 238, 144, 0.3)", // Green
                "rgba(135, 206, 250, 0.3)", // Blue
              ];
              
              return (
                <motion.div
                  key={`ribbon-${i}`}
                  className="absolute h-48"
                  style={{
                    top: `${20 + i * 25}%`,
                    left: "-20%",
                    right: "-20%",
                    background: `linear-gradient(90deg, transparent, ${colors[i]}, transparent)`,
                    filter: "blur(30px)",
                    transformOrigin: "center",
                  }}
                  animate={{
                    x: [0, "30%", 0],
                    rotateZ: [-3, 3, -3],
                    opacity: [0.3, 0.7, 0.3],
                  }}
                  transition={{
                    duration: 10 + i * 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: i * 2,
                  }}
                />
              );
            })}
            
            {/* Shimmer particles */}
            {Array.from({ length: 20 }).map((_, i) => (
              <motion.div
                key={`shimmer-${i}`}
                className="absolute w-2 h-2 rounded-full"
                style={{
                  background: i % 3 === 0 
                    ? "rgba(255, 192, 203, 0.6)" 
                    : i % 3 === 1 
                    ? "rgba(144, 238, 144, 0.6)" 
                    : "rgba(135, 206, 250, 0.6)",
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 60}%`,
                  filter: "blur(1px)",
                }}
                animate={{
                  y: [0, -30, 0],
                  opacity: [0.2, 0.8, 0.2],
                  scale: [0.5, 1.5, 0.5],
                }}
                transition={{
                  duration: 4 + Math.random() * 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: Math.random() * 3,
                }}
              />
            ))}
          </div>
        )}

        {mode && (
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
            <Button variant="secondary" onClick={() => setMode(null)}>
              Stop Visualization
            </Button>
          </div>
        )}
      </Card>

      <Card className="p-6 bg-secondary/30">
        <h3 className="mb-3">Relaxation Tips</h3>
        <ul className="space-y-2 text-muted-foreground">
          <li>• Focus on the gentle movements to clear your mind</li>
          <li>• Combine with deep breathing for enhanced relaxation</li>
          <li>• Reduce screen brightness for optimal comfort</li>
          <li>• Use for 5-10 minutes before sleep</li>
        </ul>
      </Card>
    </div>
  );
}