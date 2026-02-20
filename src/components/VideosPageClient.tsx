"use client";

import { useState } from "react";
import VideoEmbed from "./VideoEmbed";

interface VideoData {
  slug: string;
  title: string;
  youtubeId: string;
  category: string;
  date: string;
}

interface Props {
  videos: VideoData[];
}

export default function VideosPageClient({ videos }: Props) {
  const categories = ["All", ...Array.from(new Set(videos.map((v) => v.category)))];
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered = activeCategory === "All" ? videos : videos.filter((v) => v.category === activeCategory);

  return (
    <>
      <div className="flex flex-wrap items-center gap-2 mb-12">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-4 py-2 rounded-sm text-xs font-semibold uppercase tracking-wider transition-all duration-200 ${
              activeCategory === cat
                ? "bg-amber text-night"
                : "border border-white/10 text-smoke/50 hover:text-cream hover:border-white/20"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filtered.map((video) => (
          <VideoEmbed key={video.slug} youtubeId={video.youtubeId} title={video.title} category={video.category} />
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="text-center text-smoke/30 py-20">No videos in this category yet.</p>
      )}
    </>
  );
}
