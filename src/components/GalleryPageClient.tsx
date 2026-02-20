"use client";

import { useState } from "react";
import GalleryGrid from "./GalleryGrid";

interface ImageData {
  image: string;
  caption?: string;
  category: string;
}

interface Props {
  images: ImageData[];
  categories: string[];
}

export default function GalleryPageClient({ images, categories }: Props) {
  const [activeCategory, setActiveCategory] = useState("All");

  const allCats = ["All", ...categories];
  const filtered = activeCategory === "All" ? images : images.filter((img) => img.category === activeCategory);

  return (
    <>
      <div className="flex flex-wrap items-center gap-2 mb-12">
        {allCats.map((cat) => (
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

      {filtered.length > 0 ? (
        <GalleryGrid images={filtered} />
      ) : (
        <p className="text-center text-smoke/30 py-20">No photos in this category yet.</p>
      )}
    </>
  );
}
