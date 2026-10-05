import { useState, useEffect, useRef } from "react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Slider } from "./ui/slider";
import { Play, Pause, Volume2 } from "lucide-react";

interface Sound {
  id: string;
  name: string;
  icon: string;
  description: string;
}

const sounds: Sound[] = [
  { id: "rain", name: "Gentle Rain", icon: "🌧️", description: "Soft rainfall sounds" },
  { id: "ocean", name: "Ocean Waves", icon: "🌊", description: "Calming sea waves" },
  { id: "forest", name: "Forest Night", icon: "🌲", description: "Nighttime nature sounds" },
  { id: "wind", name: "Soft Wind", icon: "🍃", description: "Light breeze sounds" },
  { id: "piano", name: "Piano Melody", icon: "🎹", description: "Soothing piano music" },
  { id: "meditation", name: "Meditation Bowls", icon: "🔔", description: "Singing bowl tones" },
  { id: "cat", name: "Cat Purring", icon: "🐱", description: "Gentle purring sound" },
  { id: "fire", name: "Fire Crackling", icon: "🔥", description: "Cozy fireplace sounds" },
];

export function SoundPlayer() {
  const [playingSound, setPlayingSound] = useState<string | null>(null);
  const [volume, setVolume] = useState([50]);
  const audioContextRef = useRef<AudioContext | null>(null);
  const activeNodesRef = useRef<AudioNode[]>([]);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Initialize audio context
    if (typeof window !== 'undefined') {
      audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
    }

    return () => {
      stopAllSounds();
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
    };
  }, []);

  const createPinkNoise = (context: AudioContext) => {
    const bufferSize = 2 * context.sampleRate;
    const buffer = context.createBuffer(1, bufferSize, context.sampleRate);
    const output = buffer.getChannelData(0);
    
    let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;
    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1;
      b0 = 0.99886 * b0 + white * 0.0555179;
      b1 = 0.99332 * b1 + white * 0.0750759;
      b2 = 0.96900 * b2 + white * 0.1538520;
      b3 = 0.86650 * b3 + white * 0.3104856;
      b4 = 0.55000 * b4 + white * 0.5329522;
      b5 = -0.7616 * b5 - white * 0.0168980;
      output[i] = b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362;
      output[i] *= 0.11;
      b6 = white * 0.115926;
    }
    
    return buffer;
  };

  const createBrownNoise = (context: AudioContext) => {
    const bufferSize = 2 * context.sampleRate;
    const buffer = context.createBuffer(1, bufferSize, context.sampleRate);
    const output = buffer.getChannelData(0);
    
    let lastOut = 0;
    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1;
      output[i] = (lastOut + (0.02 * white)) / 1.02;
      lastOut = output[i];
      output[i] *= 3.5;
    }
    
    return buffer;
  };

  const stopAllSounds = () => {
    activeNodesRef.current.forEach(node => {
      try {
        if ('stop' in node && typeof node.stop === 'function') {
          (node as AudioScheduledSourceNode).stop();
        }
        node.disconnect();
      } catch (e) {
        // Node may already be stopped
      }
    });
    activeNodesRef.current = [];
    
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  const playRain = (context: AudioContext, masterGain: GainNode) => {
    // High frequency filtered pink noise with random variations
    const noise = context.createBufferSource();
    noise.buffer = createPinkNoise(context);
    noise.loop = true;

    const filter = context.createBiquadFilter();
    filter.type = 'highpass';
    filter.frequency.value = 800;
    filter.Q.value = 0.5;

    const filter2 = context.createBiquadFilter();
    filter2.type = 'lowpass';
    filter2.frequency.value = 3000;

    const lfo = context.createOscillator();
    lfo.frequency.value = 0.5;
    const lfoGain = context.createGain();
    lfoGain.gain.value = 200;

    lfo.connect(lfoGain);
    lfoGain.connect(filter.frequency);

    noise.connect(filter);
    filter.connect(filter2);
    filter2.connect(masterGain);

    noise.start();
    lfo.start();

    activeNodesRef.current.push(noise, lfo, filter, filter2, lfoGain);
  };

  const playOcean = (context: AudioContext, masterGain: GainNode) => {
    // Low frequency noise with slow wave modulation
    const noise = context.createBufferSource();
    noise.buffer = createBrownNoise(context);
    noise.loop = true;

    const filter = context.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.value = 400;

    const waveLfo = context.createOscillator();
    waveLfo.frequency.value = 0.2; // Slow wave rhythm
    const waveGain = context.createGain();
    waveGain.gain.value = 0.3;

    const depthLfo = context.createOscillator();
    depthLfo.frequency.value = 0.05;
    const depthGain = context.createGain();
    depthGain.gain.value = 100;

    waveLfo.connect(waveGain);
    depthLfo.connect(depthGain);
    depthGain.connect(filter.frequency);

    noise.connect(filter);
    filter.connect(waveGain);
    waveGain.connect(masterGain);

    noise.start();
    waveLfo.start();
    depthLfo.start();

    activeNodesRef.current.push(noise, waveLfo, depthLfo, filter, waveGain, depthGain);
  };

  const playForest = (context: AudioContext, masterGain: GainNode) => {
    // Ambient base
    const noise = context.createBufferSource();
    noise.buffer = createPinkNoise(context);
    noise.loop = true;

    const filter = context.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.value = 600;

    const baseGain = context.createGain();
    baseGain.gain.value = 0.3;

    noise.connect(filter);
    filter.connect(baseGain);
    baseGain.connect(masterGain);

    noise.start();
    activeNodesRef.current.push(noise, filter, baseGain);

    // Cricket chirps
    const chirpInterval = setInterval(() => {
      if (Math.random() > 0.3) {
        const chirp = context.createOscillator();
        const chirpGain = context.createGain();
        chirp.frequency.value = 3000 + Math.random() * 1000;
        chirpGain.gain.value = 0;
        
        chirp.connect(chirpGain);
        chirpGain.connect(masterGain);
        
        const now = context.currentTime;
        chirpGain.gain.setValueAtTime(0, now);
        chirpGain.gain.linearRampToValueAtTime(0.05, now + 0.05);
        chirpGain.gain.linearRampToValueAtTime(0, now + 0.15);
        
        chirp.start(now);
        chirp.stop(now + 0.2);
      }
    }, 800);
    
    intervalRef.current = chirpInterval;
  };

  const playWind = (context: AudioContext, masterGain: GainNode) => {
    const noise = context.createBufferSource();
    noise.buffer = createBrownNoise(context);
    noise.loop = true;

    const filter = context.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.value = 200;

    const lfo = context.createOscillator();
    lfo.frequency.value = 0.1;
    const lfoGain = context.createGain();
    lfoGain.gain.value = 0.4;

    lfo.connect(lfoGain);
    
    noise.connect(filter);
    filter.connect(lfoGain);
    lfoGain.connect(masterGain);

    noise.start();
    lfo.start();

    activeNodesRef.current.push(noise, lfo, filter, lfoGain);
  };

  const playFire = (context: AudioContext, masterGain: GainNode) => {
    // Continuous crackle base
    const noise = context.createBufferSource();
    noise.buffer = createBrownNoise(context);
    noise.loop = true;

    const filter = context.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.value = 500;
    filter.Q.value = 0.5;

    const baseGain = context.createGain();
    baseGain.gain.value = 0.2;

    noise.connect(filter);
    filter.connect(baseGain);
    baseGain.connect(masterGain);

    noise.start();
    activeNodesRef.current.push(noise, filter, baseGain);

    // Random pops
    const popInterval = setInterval(() => {
      if (Math.random() > 0.5) {
        const pop = context.createBufferSource();
        pop.buffer = createBrownNoise(context);
        
        const popFilter = context.createBiquadFilter();
        popFilter.type = 'highpass';
        popFilter.frequency.value = 800;
        
        const popGain = context.createGain();
        const now = context.currentTime;
        popGain.gain.setValueAtTime(0.15, now);
        popGain.gain.exponentialRampToValueAtTime(0.01, now + 0.1);
        
        pop.connect(popFilter);
        popFilter.connect(popGain);
        popGain.connect(masterGain);
        
        pop.start(now);
        pop.stop(now + 0.1);
      }
    }, 300);
    
    intervalRef.current = popInterval;
  };

  const playPiano = (context: AudioContext, masterGain: GainNode) => {
    // Gentle chord progression
    const chords = [
      [261.63, 329.63, 392.00], // C major
      [246.94, 293.66, 369.99], // B minor
      [220.00, 277.18, 329.63], // A minor
      [293.66, 369.99, 440.00], // D minor
    ];
    
    let chordIndex = 0;
    
    const playChord = () => {
      const chord = chords[chordIndex];
      chordIndex = (chordIndex + 1) % chords.length;
      
      chord.forEach((freq, i) => {
        const osc = context.createOscillator();
        osc.type = 'sine';
        osc.frequency.value = freq;
        
        const oscGain = context.createGain();
        const now = context.currentTime;
        oscGain.gain.setValueAtTime(0.08, now);
        oscGain.gain.exponentialRampToValueAtTime(0.01, now + 2.5);
        
        osc.connect(oscGain);
        oscGain.connect(masterGain);
        
        osc.start(now + i * 0.05);
        osc.stop(now + 3);
      });
    };
    
    playChord(); // Play first chord immediately
    const chordInterval = setInterval(playChord, 3500);
    intervalRef.current = chordInterval;
  };

  const playCat = (context: AudioContext, masterGain: GainNode) => {
    // Soft, low-frequency purring
    const purr = context.createOscillator();
    purr.type = 'sine';
    purr.frequency.value = 30; // Very low frequency

    const vibrato = context.createOscillator();
    vibrato.frequency.value = 5; // Slow vibrato
    const vibratoGain = context.createGain();
    vibratoGain.gain.value = 3;

    const purrGain = context.createGain();
    purrGain.gain.value = 0.08; // Very quiet

    vibrato.connect(vibratoGain);
    vibratoGain.connect(purr.frequency);

    purr.connect(purrGain);
    purrGain.connect(masterGain);

    purr.start();
    vibrato.start();

    activeNodesRef.current.push(purr, vibrato, vibratoGain, purrGain);
  };

  const playMeditation = (context: AudioContext, masterGain: GainNode) => {
    // Multiple harmonic frequencies for singing bowl
    const frequencies = [396, 528, 639]; // Solfeggio frequencies
    
    const playBowl = () => {
      frequencies.forEach((freq, i) => {
        const osc = context.createOscillator();
        osc.type = 'sine';
        osc.frequency.value = freq;
        
        const oscGain = context.createGain();
        const now = context.currentTime;
        oscGain.gain.setValueAtTime(0.15, now);
        oscGain.gain.exponentialRampToValueAtTime(0.01, now + 4);
        
        osc.connect(oscGain);
        oscGain.connect(masterGain);
        
        osc.start(now + i * 0.3);
        osc.stop(now + 5);
      });
    };
    
    playBowl();
    const bowlInterval = setInterval(playBowl, 6000);
    intervalRef.current = bowlInterval;
  };

  const playSound = (sound: Sound) => {
    if (!audioContextRef.current) return;

    stopAllSounds();

    const context = audioContextRef.current;
    const masterGain = context.createGain();
    masterGain.gain.value = volume[0] / 100;
    masterGain.connect(context.destination);

    activeNodesRef.current.push(masterGain);

    switch (sound.id) {
      case 'rain':
        playRain(context, masterGain);
        break;
      case 'ocean':
        playOcean(context, masterGain);
        break;
      case 'forest':
        playForest(context, masterGain);
        break;
      case 'wind':
        playWind(context, masterGain);
        break;
      case 'fire':
        playFire(context, masterGain);
        break;
      case 'piano':
        playPiano(context, masterGain);
        break;
      case 'cat':
        playCat(context, masterGain);
        break;
      case 'meditation':
        playMeditation(context, masterGain);
        break;
    }
  };

  const togglePlay = (soundId: string) => {
    if (playingSound === soundId) {
      stopAllSounds();
      setPlayingSound(null);
    } else {
      const sound = sounds.find(s => s.id === soundId);
      if (sound) {
        playSound(sound);
        setPlayingSound(soundId);
      }
    }
  };

  // Update volume for active sounds
  useEffect(() => {
    if (playingSound && audioContextRef.current && activeNodesRef.current.length > 0) {
      const masterGain = activeNodesRef.current.find(node => node instanceof GainNode && node.gain);
      if (masterGain && 'gain' in masterGain) {
        (masterGain as GainNode).gain.value = volume[0] / 100;
      }
    }
  }, [volume, playingSound]);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="mb-2">Soothing Sounds</h2>
        <p className="text-muted-foreground">Select calming sounds to help you relax and fall asleep</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {sounds.map((sound) => (
          <Card key={sound.id} className="p-4 hover:border-primary/50 transition-colors">
            <div className="flex items-start gap-4">
              <div className="text-4xl">{sound.icon}</div>
              <div className="flex-1">
                <h3 className="mb-1">{sound.name}</h3>
                <p className="text-muted-foreground mb-3">{sound.description}</p>
                <Button
                  variant={playingSound === sound.id ? "default" : "secondary"}
                  size="sm"
                  onClick={() => togglePlay(sound.id)}
                  className="w-full"
                >
                  {playingSound === sound.id ? (
                    <>
                      <Pause className="mr-2 h-4 w-4" />
                      Playing
                    </>
                  ) : (
                    <>
                      <Play className="mr-2 h-4 w-4" />
                      Play
                    </>
                  )}
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <Card className="p-6">
        <div className="flex items-center gap-4">
          <Volume2 className="h-5 w-5 text-primary" />
          <div className="flex-1">
            <div className="flex justify-between mb-2">
              <span>Volume</span>
              <span className="text-muted-foreground">{volume[0]}%</span>
            </div>
            <Slider
              value={volume}
              onValueChange={setVolume}
              max={100}
              step={1}
              className="w-full"
            />
          </div>
        </div>
      </Card>

      <Card className="p-6 bg-secondary/30">
        <h3 className="mb-3">Sound Therapy Benefits</h3>
        <p className="text-muted-foreground text-sm mb-3">
          Research shows that nature sounds and low-frequency tones can reduce stress hormones 
          and promote better sleep quality by masking disruptive noises.
        </p>
        <p className="text-muted-foreground text-sm">
          Studies published in Scientific Reports (2017) found that nature sounds improve focus 
          and reduce sympathetic nervous system activity, promoting relaxation.
        </p>
      </Card>
    </div>
  );
}
