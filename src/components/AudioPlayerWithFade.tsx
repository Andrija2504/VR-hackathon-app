/* eslint-disable react-hooks/exhaustive-deps */
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
  fadeInDuration = 2000,
  fadeOutDuration = 2000,
}) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const fadeIntervalRef = useRef<NodeJS.Timeout>();
  const [isAudioPlaying, setIsAudioPlaying] = useState(isPlaying);

  const fadeIn = () => {
    if (audioRef.current) {
      audioRef.current.volume = 0;
      audioRef.current
        .play()
        .then(() => {
          const steps = 20;
          const stepTime = fadeInDuration / steps;
          const volumeStep = 1 / steps;
          let currentStep = 0;

          fadeIntervalRef.current = setInterval(() => {
            currentStep++;
            const newVolume = Math.min(volumeStep * currentStep, 1);
            if (audioRef.current) {
              audioRef.current.volume = newVolume;
            }

            if (currentStep >= steps) {
              clearInterval(fadeIntervalRef.current);
            }
          }, stepTime);
        })
        .catch((err) => {
          console.error('Failed to play audio due to browser restrictions:', err);
        });
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
        }

        if (currentStep >= steps) {
          clearInterval(fadeIntervalRef.current);
          if (audioRef.current) {
            audioRef.current.pause();
          }
          onEnded?.();
        }
      }, stepTime);
    }
  };

  useEffect(() => {
    clearInterval(fadeIntervalRef.current);

    if (isAudioPlaying) {
      fadeIn();
    } else {
      fadeOut();
    }

    return () => {
      clearInterval(fadeIntervalRef.current);
    };
  }, [isAudioPlaying]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.loop = true; // Enable looping
      audioRef.current.load();
      if (isAudioPlaying) {
        fadeIn();
      }
    }

    return () => {
      clearInterval(fadeIntervalRef.current);
    };
  }, [audioUrl]);

  const handleToggle = () => {
    setIsAudioPlaying((prev) => !prev);
  };

  return (
    <div className="audio-controls">
      <label className="toggle-container">
        <span>Music</span>
        <input
          type="checkbox"
          checked={isAudioPlaying}
          onChange={handleToggle}
          className="toggle-input"
        />
        <span className="toggle-slider" />
      </label>
      <audio ref={audioRef} src={audioUrl} onEnded={onEnded} loop />
    </div>
  );
};

export default AudioPlayerWithFade;
