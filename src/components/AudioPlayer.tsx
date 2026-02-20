"use client";

import { useAudio } from "@/contexts/AudioContext";
import { Play, Pause, SkipBack, SkipForward, Volume2, VolumeX, X } from "lucide-react";
import { useState } from "react";

function formatTime(seconds: number): string {
  if (!seconds || isNaN(seconds)) return "0:00";
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, "0")}`;
}

export default function AudioPlayer() {
  const { currentTrack, isPlaying, progress, duration, volume, toggle, seek, setVolume, next, prev, pause } = useAudio();
  const [showVolume, setShowVolume] = useState(false);

  if (!currentTrack) return null;

  const progressPercent = duration > 0 ? (progress / duration) * 100 : 0;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-night-light/95 backdrop-blur-xl border-t border-white/5">
      <div
        className="absolute top-0 left-0 h-[2px] bg-amber transition-all duration-150 ease-linear"
        style={{ width: `${progressPercent}%` }}
      />

      <div className="max-w-7xl mx-auto px-5 py-2.5 sm:py-3">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3 flex-1 min-w-0">
            {currentTrack.coverImage && (
              <img
                src={currentTrack.coverImage}
                alt={currentTrack.title}
                className="w-10 h-10 sm:w-12 sm:h-12 rounded object-cover flex-shrink-0"
              />
            )}
            <div className="min-w-0">
              <p className="text-cream text-sm font-medium truncate">
                {currentTrack.title}
              </p>
              <p className="text-smoke/40 text-xs truncate">
                {currentTrack.artist}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1">
            <button onClick={prev} className="text-smoke/40 hover:text-cream transition-colors p-2" aria-label="Previous">
              <SkipBack size={16} />
            </button>
            <button
              onClick={toggle}
              className="w-9 h-9 rounded-full bg-amber flex items-center justify-center text-night hover:bg-amber-light transition-colors"
              aria-label={isPlaying ? "Pause" : "Play"}
            >
              {isPlaying ? <Pause size={16} /> : <Play size={16} className="ml-0.5" />}
            </button>
            <button onClick={next} className="text-smoke/40 hover:text-cream transition-colors p-2" aria-label="Next">
              <SkipForward size={16} />
            </button>
          </div>

          <div className="hidden sm:flex items-center gap-2 flex-1 justify-end">
            <span className="text-smoke/30 text-xs tabular-nums">{formatTime(progress)}</span>
            <div className="relative w-32 md:w-48 h-1 bg-white/10 rounded-full group cursor-pointer">
              <div
                className="absolute top-0 left-0 h-full bg-amber rounded-full"
                style={{ width: `${progressPercent}%` }}
              />
              <input
                type="range"
                min={0}
                max={duration || 0}
                value={progress}
                onChange={(e) => seek(Number(e.target.value))}
                className="absolute inset-0 w-full opacity-0 cursor-pointer"
              />
            </div>
            <span className="text-smoke/30 text-xs tabular-nums">{formatTime(duration)}</span>

            <div className="relative ml-3">
              <button
                onClick={() => setShowVolume(!showVolume)}
                className="text-smoke/30 hover:text-cream transition-colors p-1"
                aria-label="Volume"
              >
                {volume === 0 ? <VolumeX size={14} /> : <Volume2 size={14} />}
              </button>
              {showVolume && (
                <div className="absolute bottom-full right-0 mb-2 bg-night-lighter rounded p-3 shadow-xl border border-white/10">
                  <input
                    type="range"
                    min={0}
                    max={1}
                    step={0.01}
                    value={volume}
                    onChange={(e) => setVolume(Number(e.target.value))}
                    className="w-20 h-1 accent-amber bg-white/10 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-amber"
                  />
                </div>
              )}
            </div>

            <button onClick={pause} className="text-smoke/20 hover:text-smoke/50 transition-colors p-1 ml-1" aria-label="Close">
              <X size={14} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
