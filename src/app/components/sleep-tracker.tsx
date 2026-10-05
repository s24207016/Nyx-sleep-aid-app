import { useState, useEffect } from "react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Pencil, Trash2, X, Check } from "lucide-react";

interface SleepLog {
  id: string;
  date: string;
  bedTime: string;
  wakeTime: string;
  quality: number;
  hours: number;
}

const STORAGE_KEY = "nyx-sleep-logs";

const getInitialLogs = (): SleepLog[] => {
  if (typeof window === 'undefined') return [];
  
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (error) {
    console.error("Failed to load sleep logs:", error);
  }
  
  // Return default logs if nothing in storage
  return [
    {
      id: "1",
      date: "Dec 21, 2024",
      bedTime: "22:30",
      wakeTime: "06:30",
      quality: 4,
      hours: 8,
    },
    {
      id: "2",
      date: "Dec 20, 2024",
      bedTime: "23:00",
      wakeTime: "07:00",
      quality: 3,
      hours: 8,
    },
    {
      id: "3",
      date: "Dec 19, 2024",
      bedTime: "22:00",
      wakeTime: "06:00",
      quality: 5,
      hours: 8,
    },
  ];
};

export function SleepTracker() {
  const [logs, setLogs] = useState<SleepLog[]>(getInitialLogs);
  const [bedTime, setBedTime] = useState("");
  const [wakeTime, setWakeTime] = useState("");
  const [quality, setQuality] = useState(3);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editBedTime, setEditBedTime] = useState("");
  const [editWakeTime, setEditWakeTime] = useState("");
  const [editQuality, setEditQuality] = useState(3);
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");

  // Save to localStorage whenever logs change
  useEffect(() => {
    if (typeof window !== 'undefined' && logs.length > 0) {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(logs));
      } catch (error) {
        console.error("Failed to save sleep logs:", error);
      }
    }
  }, [logs]);

  // Auto-dismiss popup after 4 seconds
  useEffect(() => {
    if (showPopup) {
      const timer = setTimeout(() => {
        setShowPopup(false);
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [showPopup]);

  const calculateHours = (bed: string, wake: string) => {
    if (!bed || !wake) return 0;
    const [bedHour, bedMin] = bed.split(":").map(Number);
    const [wakeHour, wakeMin] = wake.split(":").map(Number);
    
    let hours = wakeHour - bedHour;
    let minutes = wakeMin - bedMin;
    
    if (hours < 0) hours += 24;
    if (minutes < 0) {
      hours -= 1;
      minutes += 60;
    }
    
    return hours + minutes / 60;
  };

  const handleAddLog = () => {
    if (!bedTime || !wakeTime) return;

    const hours = calculateHours(bedTime, wakeTime);
    const newLog: SleepLog = {
      id: Date.now().toString(),
      date: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
      bedTime,
      wakeTime,
      quality,
      hours: Math.round(hours * 10) / 10,
    };

    setLogs([newLog, ...logs]);
    setBedTime("");
    setWakeTime("");
    setQuality(3);

    // Show popup based on quality
    if (quality <= 3) {
      setPopupMessage("Then you have come to the right place! Get comfy in your bed and turn off the lights. Nyx works best in darkness and a comfy environment.");
    } else {
      setPopupMessage("Glad to hear that! :)");
    }
    setShowPopup(true);
  };

  const handleEdit = (log: SleepLog) => {
    setEditingId(log.id);
    setEditBedTime(log.bedTime);
    setEditWakeTime(log.wakeTime);
    setEditQuality(log.quality);
  };

  const handleSaveEdit = (id: string) => {
    const hours = calculateHours(editBedTime, editWakeTime);
    setLogs(logs.map(log => 
      log.id === id 
        ? { ...log, bedTime: editBedTime, wakeTime: editWakeTime, quality: editQuality, hours: Math.round(hours * 10) / 10 }
        : log
    ));
    setEditingId(null);
  };

  const handleCancelEdit = () => {
    setEditingId(null);
  };

  const handleDelete = (id: string) => {
    setLogs(logs.filter(log => log.id !== id));
  };

  const averageHours = logs.length > 0
    ? (logs.reduce((sum, log) => sum + log.hours, 0) / logs.length).toFixed(1)
    : "0";

  const averageQuality = logs.length > 0
    ? (logs.reduce((sum, log) => sum + log.quality, 0) / logs.length).toFixed(1)
    : "0";

  return (
    <div className="space-y-6">
      <div>
        <h2 className="mb-2">Sleep Tracker</h2>
        <p className="text-muted-foreground">Log your sleep patterns to understand your rest better</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-6 text-center">
          <div className="text-3xl mb-2">{averageHours}h</div>
          <div className="text-muted-foreground">Average Sleep</div>
        </Card>
        <Card className="p-6 text-center">
          <div className="text-3xl mb-2">{averageQuality}/5</div>
          <div className="text-muted-foreground">Sleep Quality</div>
        </Card>
        <Card className="p-6 text-center">
          <div className="text-3xl mb-2">{logs.length}</div>
          <div className="text-muted-foreground">Nights Logged</div>
        </Card>
      </div>

      <Card className="p-6">
        <h3 className="mb-4">Log Tonight's Sleep</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div className="space-y-2">
            <Label htmlFor="bedtime">Bed Time</Label>
            <Input
              id="bedtime"
              type="time"
              value={bedTime}
              onChange={(e) => setBedTime(e.target.value)}
              className="bg-input-background"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="waketime">Wake Time</Label>
            <Input
              id="waketime"
              type="time"
              value={wakeTime}
              onChange={(e) => setWakeTime(e.target.value)}
              className="bg-input-background"
            />
          </div>
        </div>

        <div className="space-y-2 mb-4">
          <Label>Sleep Quality</Label>
          <div className="flex gap-2 justify-center py-2">
            {[1, 2, 3, 4, 5].map((rating) => (
              <button
                key={rating}
                onClick={() => setQuality(rating)}
                className={`text-3xl transition-all ${
                  rating <= quality ? "opacity-100 scale-110" : "opacity-30"
                }`}
              >
                ⭐
              </button>
            ))}
          </div>
        </div>

        <Button onClick={handleAddLog} className="w-full" disabled={!bedTime || !wakeTime}>
          Add Sleep Log
        </Button>
      </Card>

      <div className="space-y-3">
        <h3>Recent Sleep History</h3>
        {logs.map((log) => (
          <Card key={log.id} className="p-4">
            {editingId === log.id ? (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Bed Time</Label>
                    <Input
                      type="time"
                      value={editBedTime}
                      onChange={(e) => setEditBedTime(e.target.value)}
                      className="bg-input-background"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Wake Time</Label>
                    <Input
                      type="time"
                      value={editWakeTime}
                      onChange={(e) => setEditWakeTime(e.target.value)}
                      className="bg-input-background"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Sleep Quality</Label>
                  <div className="flex gap-2 justify-center py-2">
                    {[1, 2, 3, 4, 5].map((rating) => (
                      <button
                        key={rating}
                        onClick={() => setEditQuality(rating)}
                        className={`text-3xl transition-all ${
                          rating <= editQuality ? "opacity-100 scale-110" : "opacity-30"
                        }`}
                      >
                        ⭐
                      </button>
                    ))}
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button onClick={() => handleSaveEdit(log.id)} className="flex-1">
                    <Check className="h-4 w-4 mr-2" />
                    Save
                  </Button>
                  <Button onClick={handleCancelEdit} variant="secondary" className="flex-1">
                    <X className="h-4 w-4 mr-2" />
                    Cancel
                  </Button>
                </div>
              </div>
            ) : (
              <div>
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <div className="mb-1">{log.date}</div>
                    <div className="text-muted-foreground">
                      {log.bedTime} - {log.wakeTime} ({log.hours}h)
                    </div>
                  </div>
                  <div className="flex gap-1">
                    {Array.from({ length: log.quality }).map((_, i) => (
                      <span key={i} className="text-yellow-400">⭐</span>
                    ))}
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button onClick={() => handleEdit(log)} variant="secondary" size="sm">
                    <Pencil className="h-4 w-4 mr-2" />
                    Edit
                  </Button>
                  <Button onClick={() => handleDelete(log.id)} variant="destructive" size="sm">
                    <Trash2 className="h-4 w-4 mr-2" />
                    Delete
                  </Button>
                </div>
              </div>
            )}
          </Card>
        ))}
      </div>

      <Card className="p-6 bg-secondary/30">
        <h3 className="mb-3">Why Track Your Sleep?</h3>
        <p className="text-muted-foreground text-sm mb-3">
          The American Academy of Sleep Medicine recommends adults get 7-9 hours of sleep per night. 
          Tracking your sleep patterns helps identify issues and measure improvement over time.
        </p>
        <p className="text-muted-foreground text-sm">
          Research in the journal Sleep (2015) shows that self-monitoring sleep habits increases 
          awareness and motivation for maintaining healthy sleep schedules.
        </p>
      </Card>

      {showPopup && (
        <div className="fixed top-20 left-1/2 transform -translate-x-1/2 z-50 max-w-md w-full px-4 animate-in slide-in-from-top duration-300">
          <Card className="p-6 bg-primary/20 border-primary/50 shadow-xl">
            <p className="text-center">
              {popupMessage}
            </p>
          </Card>
        </div>
      )}
    </div>
  );
}