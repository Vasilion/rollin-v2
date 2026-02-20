"use client";

import { useState, useCallback, useEffect } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

interface GalleryImage {
  image: string;
  caption?: string;
}

interface Props {
  images: GalleryImage[];
}

export default function GalleryGrid({ images }: Props) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const closeLightbox = useCallback(() => setLightboxIndex(null), []);
  const goNext = useCallback(() => {
    if (lightboxIndex === null) return;
    setLightboxIndex((lightboxIndex + 1) % images.length);
  }, [lightboxIndex, images.length]);
  const goPrev = useCallback(() => {
    if (lightboxIndex === null) return;
    setLightboxIndex((lightboxIndex - 1 + images.length) % images.length);
  }, [lightboxIndex, images.length]);

  useEffect(() => {
    if (lightboxIndex === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowRight") goNext();
      if (e.key === "ArrowLeft") goPrev();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightboxIndex, closeLightbox, goNext, goPrev]);

  return (
    <>
      <div className="columns-1 sm:columns-2 lg:columns-3 gap-3 space-y-3">
        {images.map((img, i) => (
          <button
            key={i}
            onClick={() => setLightboxIndex(i)}
            className="block w-full break-inside-avoid rounded-lg overflow-hidden group cursor-pointer"
          >
            <div className="relative">
              <img
                src={img.image}
                alt={img.caption || `Gallery image ${i + 1}`}
                className="w-full object-cover group-hover:scale-[1.03] transition-transform duration-500"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-night/0 group-hover:bg-night/30 transition-all duration-300" />
              {img.caption && (
                <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-night/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <p className="text-cream text-sm">{img.caption}</p>
                </div>
              )}
            </div>
          </button>
        ))}
      </div>

      {lightboxIndex !== null && (
        <div
          className="fixed inset-0 z-[60] bg-night/95 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={closeLightbox}
        >
          <button onClick={closeLightbox} className="absolute top-5 right-5 text-cream/40 hover:text-cream transition-colors z-10" aria-label="Close">
            <X size={28} />
          </button>
          <button onClick={(e) => { e.stopPropagation(); goPrev(); }} className="absolute left-4 sm:left-8 text-cream/30 hover:text-cream transition-colors z-10" aria-label="Previous">
            <ChevronLeft size={36} />
          </button>
          <button onClick={(e) => { e.stopPropagation(); goNext(); }} className="absolute right-4 sm:right-8 text-cream/30 hover:text-cream transition-colors z-10" aria-label="Next">
            <ChevronRight size={36} />
          </button>
          <div className="max-w-5xl max-h-[85vh]" onClick={(e) => e.stopPropagation()}>
            <img
              src={images[lightboxIndex].image}
              alt={images[lightboxIndex].caption || ""}
              className="max-w-full max-h-[85vh] object-contain rounded-lg"
            />
            {images[lightboxIndex].caption && (
              <p className="text-smoke/60 text-center mt-4 text-sm">{images[lightboxIndex].caption}</p>
            )}
          </div>
        </div>
      )}
    </>
  );
}
