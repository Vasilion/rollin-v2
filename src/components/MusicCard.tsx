"use client";

import { useAudio, Track } from "@/contexts/AudioContext";
import { Play, Pause } from "lucide-react";

interface Props {
  title: string;
  type: string;
  date: string;
  coverImage: string;
  audioFile?: string;
  spotifyUrl?: string;
  appleMusicUrl?: string;
}

export default function MusicCard({ title, type, date, coverImage, audioFile, spotifyUrl, appleMusicUrl }: Props) {
  const { play, pause, currentTrack, isPlaying } = useAudio();

  const isCurrentTrack = currentTrack?.audioUrl === audioFile;
  const isCurrentlyPlaying = isCurrentTrack && isPlaying;

  const handlePlay = () => {
    if (!audioFile) return;
    if (isCurrentlyPlaying) {
      pause();
    } else {
      const track: Track = { title, artist: "Rollin Brummette", coverImage, audioUrl: audioFile };
      play(track);
    }
  };

  const year = new Date(date).getFullYear();

  return (
    <div className="group">
      <div className="relative aspect-square overflow-hidden rounded-lg bg-night-lighter">
        <img
          src={coverImage || "/media/images/placeholder-album.jpg"}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-night/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        {audioFile && (
          <button
            onClick={handlePlay}
            className="absolute bottom-3 right-3 w-11 h-11 rounded-full bg-amber flex items-center justify-center text-night opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300 hover:bg-amber-light shadow-lg"
          >
            {isCurrentlyPlaying ? <Pause size={18} /> : <Play size={18} className="ml-0.5" />}
          </button>
        )}
        <span className="absolute top-3 left-3 bg-night/70 text-cream/70 text-[10px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded backdrop-blur-sm">
          {type}
        </span>
      </div>
      <div className="mt-3">
        <h3 className="font-heading text-base font-semibold text-cream truncate">
          {title}
        </h3>
        <p className="text-smoke/40 text-sm mt-0.5">{year}</p>
        <div className="flex items-center gap-2 mt-2">
          {spotifyUrl && (
            <a href={spotifyUrl} target="_blank" rel="noopener noreferrer" className="text-[11px] uppercase tracking-wider text-smoke/40 hover:text-amber transition-colors">
              Spotify
            </a>
          )}
          {spotifyUrl && appleMusicUrl && <span className="text-smoke/20">|</span>}
          {appleMusicUrl && (
            <a href={appleMusicUrl} target="_blank" rel="noopener noreferrer" className="text-[11px] uppercase tracking-wider text-smoke/40 hover:text-amber transition-colors">
              Apple
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
