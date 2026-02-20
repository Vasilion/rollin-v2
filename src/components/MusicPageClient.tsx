"use client";

import { useState } from "react";
import MusicCard from "./MusicCard";

interface TrackData {
  slug: string;
  title: string;
  type: string;
  date: string;
  coverImage: string;
  audioFile: string;
  spotifyUrl: string;
  appleMusicUrl: string;
}

interface Props {
  tracks: TrackData[];
}

const filters = ["All", "Single", "EP", "Album"];

export default function MusicPageClient({ tracks }: Props) {
  const [activeFilter, setActiveFilter] = useState("All");

  const filtered = activeFilter === "All" ? tracks : tracks.filter((t) => t.type === activeFilter);

  return (
    <>
      <div className="flex flex-wrap items-center gap-2 mb-12">
        {filters.map((f) => (
          <button
            key={f}
            onClick={() => setActiveFilter(f)}
            className={`px-4 py-2 rounded-sm text-xs font-semibold uppercase tracking-wider transition-all duration-200 ${
              activeFilter === f
                ? "bg-amber text-night"
                : "border border-white/10 text-smoke/50 hover:text-cream hover:border-white/20"
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
        {filtered.map((track) => (
          <MusicCard key={track.slug} {...track} />
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="text-center text-smoke/30 py-20">No music in this category yet.</p>
      )}
    </>
  );
}
