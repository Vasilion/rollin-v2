"use client";

import { createContext, useContext, useState, useRef, useCallback, useEffect, ReactNode } from "react";

export interface Track {
  title: string;
  artist: string;
  coverImage: string;
  audioUrl: string;
  slug?: string;
}

interface AudioContextType {
  currentTrack: Track | null;
  isPlaying: boolean;
  progress: number;
  duration: number;
  volume: number;
  playlist: Track[];
  play: (track: Track) => void;
  pause: () => void;
  toggle: () => void;
  seek: (time: number) => void;
  setVolume: (vol: number) => void;
  next: () => void;
  prev: () => void;
  setPlaylist: (tracks: Track[]) => void;
}

const AudioContext = createContext<AudioContextType | null>(null);

export function AudioProvider({ children }: { children: ReactNode }) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [currentTrack, setCurrentTrack] = useState<Track | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolumeState] = useState(0.8);
  const [playlist, setPlaylist] = useState<Track[]>([]);

  useEffect(() => {
    if (typeof window !== "undefined" && !audioRef.current) {
      audioRef.current = new Audio();
      audioRef.current.volume = 0.8;
    }
  }, []);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const onTimeUpdate = () => setProgress(audio.currentTime);
    const onDurationChange = () => setDuration(audio.duration || 0);
    const onEnded = () => {
      setIsPlaying(false);
      next();
    };

    audio.addEventListener("timeupdate", onTimeUpdate);
    audio.addEventListener("durationchange", onDurationChange);
    audio.addEventListener("ended", onEnded);

    return () => {
      audio.removeEventListener("timeupdate", onTimeUpdate);
      audio.removeEventListener("durationchange", onDurationChange);
      audio.removeEventListener("ended", onEnded);
    };
  });

  const play = useCallback((track: Track) => {
    const audio = audioRef.current;
    if (!audio) return;

    if (currentTrack?.audioUrl !== track.audioUrl) {
      audio.src = track.audioUrl;
      audio.load();
      setCurrentTrack(track);
    }
    audio.play();
    setIsPlaying(true);
  }, [currentTrack]);

  const pause = useCallback(() => {
    audioRef.current?.pause();
    setIsPlaying(false);
  }, []);

  const toggle = useCallback(() => {
    if (isPlaying) {
      pause();
    } else if (currentTrack) {
      audioRef.current?.play();
      setIsPlaying(true);
    }
  }, [isPlaying, pause, currentTrack]);

  const seek = useCallback((time: number) => {
    if (audioRef.current) {
      audioRef.current.currentTime = time;
      setProgress(time);
    }
  }, []);

  const setVolume = useCallback((vol: number) => {
    if (audioRef.current) {
      audioRef.current.volume = vol;
    }
    setVolumeState(vol);
  }, []);

  const next = useCallback(() => {
    if (playlist.length === 0 || !currentTrack) return;
    const idx = playlist.findIndex((t) => t.audioUrl === currentTrack.audioUrl);
    const nextIdx = (idx + 1) % playlist.length;
    play(playlist[nextIdx]);
  }, [playlist, currentTrack, play]);

  const prev = useCallback(() => {
    if (playlist.length === 0 || !currentTrack) return;
    const idx = playlist.findIndex((t) => t.audioUrl === currentTrack.audioUrl);
    const prevIdx = (idx - 1 + playlist.length) % playlist.length;
    play(playlist[prevIdx]);
  }, [playlist, currentTrack, play]);

  return (
    <AudioContext.Provider
      value={{
        currentTrack,
        isPlaying,
        progress,
        duration,
        volume,
        playlist,
        play,
        pause,
        toggle,
        seek,
        setVolume,
        next,
        prev,
        setPlaylist,
      }}
    >
      {children}
    </AudioContext.Provider>
  );
}

export function useAudio() {
  const ctx = useContext(AudioContext);
  if (!ctx) throw new Error("useAudio must be used within AudioProvider");
  return ctx;
}
