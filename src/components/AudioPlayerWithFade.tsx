// AudioPlayerWithFade.tsx
import React, { useRef, useEffect, useState } from 'react';

interface AudioPlayerProps {
  audioUrl: string;
  isPlaying: boolean;
  onEnded?: () => void;
  fadeInDuration?: number; // in milliseconds
  fadeOutDuration?: number; // in milliseconds
}

const AudioPlayerWithFade: React.FC<AudioPlayerProps> = ({
  audioUrl,
  isPlaying,
  onEnded,
  fadeInDuration = 2000, // 2 seconds fade in by default
  fadeOutDuration = 2000  // 2 seconds fade out by default
}) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const fadeIntervalRef = useRef<NodeJS.Timeout>();
  const [volume, setVolume] = useState(0);

  const fadeIn = () => {
    if (audioRef.current) {
      audioRef.current.volume = 0;
      audioRef.current.play();

      const steps = 20;
      const stepTime = fadeInDuration / steps;
      const volumeStep = 1 / steps;
      let currentStep = 0;

      fadeIntervalRef.current = setInterval(() => {
        currentStep++;
        const newVolume = Math.min(volumeStep * currentStep, 1);
        if (audioRef.current) {
          audioRef.current.volume = newVolume;
          setVolume(newVolume);
        }

        if (currentStep >= steps) {
          clearInterval(fadeIntervalRef.current);
        }
      }, stepTime);
    }
  };

  const fadeOut = () => {
    if (audioRef.current) {
      const steps = 20;
      const stepTime = fadeOutDuration / steps;
      const volumeStep = audioRef.current.volume / steps;
      let currentStep = 0;

      fadeIntervalRef.current = setInterval(() => {
        currentStep++;
        const newVolume = Math.max(audioRef.current!.volume - volumeStep, 0);
        if (audioRef.current) {
          audioRef.current.volume = newVolume;
          setVolume(newVolume);
        }

        if (currentStep >= steps) {
          clearInterval(fadeIntervalRef.current);
          if (audioRef.current) {
            audioRef.current.pause();
            audioRef.current.currentTime = 0;
          }
          onEnded?.();
        }
      }, stepTime);
    }
  };

  // Handle play/pause with fade effects
  useEffect(() => {
    clearInterval(fadeIntervalRef.current);

    if (isPlaying) {
      fadeIn();
    } else {
      fadeOut();
    }

    return () => {
      clearInterval(fadeIntervalRef.current);
    };
  }, [isPlaying]);

  // Handle audio source changes
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.loop = true; // Enable looping
      audioRef.current.load();
      if (isPlaying) {
        fadeIn();
      }
    }

    return () => {
      clearInterval(fadeIntervalRef.current);
    };
  }, [audioUrl]);

  return (
    <div className="audio-player fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50 bg-white rounded-lg shadow-lg p-4">
      <audio
        ref={audioRef}
        src={audioUrl}
        onEnded={onEnded}
        loop // Enable looping at the HTML level as well
      />
      <div className="flex items-center gap-4">
        <button
          onClick={() => setVolume(Math.max(0, volume - 0.1))}
          className="p-2 rounded hover:bg-gray-100"
        >
          -
        </button>
        <div className="flex-1 h-2 bg-gray-200 rounded">
          <div
            className="h-full bg-blue-500 rounded"
            style={{ width: `${volume * 100}%` }}
          />
        </div>
        <button
          onClick={() => {
            const newVolume = Math.min(1, volume + 0.1);
            setVolume(newVolume);
            if (audioRef.current) audioRef.current.volume = newVolume;
          }}
          className="p-2 rounded hover:bg-gray-100"
        >
          +
        </button>
      </div>
    </div>
  );
};

export default AudioPlayerWithFade;