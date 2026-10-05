import { useState } from "react";
import { Moon, Music, Activity, BookOpen, Sparkles } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./components/ui/tabs";
import { SoundPlayer } from "./components/sound-player";
import { BreathingExercise } from "./components/breathing-exercise";
import { SleepTracker } from "./components/sleep-tracker";
import { LifestyleTips } from "./components/lifestyle-tips";
import { RelaxationVisuals } from "./components/relaxation-visuals";

export default function App() {
  const [activeTab, setActiveTab] = useState("home");

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border/50 backdrop-blur-sm sticky top-0 z-10 bg-background/80">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="text-3xl">🌙</div>
              <div>
                <h1 className="tracking-tight">Nyx</h1>
                <p className="text-muted-foreground">Your sleep companion</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Moon className="h-5 w-5 text-primary" />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-5 mb-8 h-auto p-1">
            <TabsTrigger value="home" className="flex flex-col gap-1 py-3">
              <Moon className="h-5 w-5" />
              <span className="text-xs">Home</span>
            </TabsTrigger>
            <TabsTrigger value="sounds" className="flex flex-col gap-1 py-3">
              <Music className="h-5 w-5" />
              <span className="text-xs">Sounds</span>
            </TabsTrigger>
            <TabsTrigger value="breathe" className="flex flex-col gap-1 py-3">
              <Activity className="h-5 w-5" />
              <span className="text-xs">Breathe</span>
            </TabsTrigger>
            <TabsTrigger value="visuals" className="flex flex-col gap-1 py-3">
              <Sparkles className="h-5 w-5" />
              <span className="text-xs">Visuals</span>
            </TabsTrigger>
            <TabsTrigger value="tips" className="flex flex-col gap-1 py-3">
              <BookOpen className="h-5 w-5" />
              <span className="text-xs">Tips</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="home" className="mt-0">
            <div className="max-w-4xl mx-auto space-y-8">
              <div className="text-center space-y-4 py-8">
                <div className="text-7xl mb-4">🌙</div>
                <h2 className="mb-4">Welcome to Nyx</h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  Your personal sleep wellness companion. Designed to help you overcome insomnia, 
                  reduce stress, and improve your sleep quality through guided exercises, 
                  soothing sounds, and lifestyle insights.
                </p>
              </div>

              <SleepTracker />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                <div
                  className="p-6 rounded-lg border border-border bg-card hover:border-primary/50 transition-all cursor-pointer"
                  onClick={() => setActiveTab("sounds")}
                >
                  <Music className="h-8 w-8 text-primary mb-3" />
                  <h3 className="mb-2">Soothing Sounds</h3>
                  <p className="text-muted-foreground">
                    Listen to calming nature sounds and gentle melodies
                  </p>
                </div>

                <div
                  className="p-6 rounded-lg border border-border bg-card hover:border-primary/50 transition-all cursor-pointer"
                  onClick={() => setActiveTab("breathe")}
                >
                  <Activity className="h-8 w-8 text-primary mb-3" />
                  <h3 className="mb-2">Breathing Exercises</h3>
                  <p className="text-muted-foreground">
                    Guided breathing to calm your mind and reduce anxiety
                  </p>
                </div>

                <div
                  className="p-6 rounded-lg border border-border bg-card hover:border-primary/50 transition-all cursor-pointer"
                  onClick={() => setActiveTab("visuals")}
                >
                  <Sparkles className="h-8 w-8 text-primary mb-3" />
                  <h3 className="mb-2">Relaxation Visuals</h3>
                  <p className="text-muted-foreground">
                    Gentle animations to ease your eyes and mind
                  </p>
                </div>

                <div
                  className="p-6 rounded-lg border border-border bg-card hover:border-primary/50 transition-all cursor-pointer"
                  onClick={() => setActiveTab("tips")}
                >
                  <BookOpen className="h-8 w-8 text-primary mb-3" />
                  <h3 className="mb-2">Sleep Wellness</h3>
                  <p className="text-muted-foreground">
                    Learn how lifestyle choices affect your sleep
                  </p>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="sounds" className="mt-0">
            <div className="max-w-4xl mx-auto">
              <SoundPlayer />
            </div>
          </TabsContent>

          <TabsContent value="breathe" className="mt-0">
            <div className="max-w-4xl mx-auto">
              <BreathingExercise />
            </div>
          </TabsContent>

          <TabsContent value="visuals" className="mt-0">
            <div className="max-w-4xl mx-auto">
              <RelaxationVisuals />
            </div>
          </TabsContent>

          <TabsContent value="tips" className="mt-0">
            <div className="max-w-4xl mx-auto">
              <LifestyleTips />
            </div>
          </TabsContent>
        </Tabs>
      </main>

      {/* Footer */}
      <footer className="border-t border-border/50 mt-16">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center text-muted-foreground space-y-4">
            <p className="mb-2">Rest well, live well</p>
            <p className="text-sm mb-4">
              Nyx is designed to support your sleep wellness journey. 
              For persistent sleep issues, please consult a healthcare professional.
            </p>
            <div className="max-w-3xl mx-auto pt-4 border-t border-border/30">
              <h4 className="mb-3">Evidence-Based Approach</h4>
              <p className="text-sm text-muted-foreground">
                Our sleep wellness recommendations are informed by research from leading institutions 
                including the National Sleep Foundation, American Academy of Sleep Medicine, Harvard Medical School, 
                and peer-reviewed journals such as Sleep, Journal of Clinical Sleep Medicine, and Scientific Reports.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}