import { Metadata } from "next";
import { getSingleContent } from "@/lib/content";
import HeroSection from "@/components/HeroSection";
import { Download, ExternalLink, Quote } from "lucide-react";

export const metadata: Metadata = {
  title: "EPK - Electronic Press Kit",
  description: "Rollin Brummette's Electronic Press Kit - bio, photos, music, and press materials.",
};

interface PressQuote {
  quote: string;
  source: string;
  url?: string;
}

interface PressPhoto {
  image: string;
  caption?: string;
}

export default function EPKPage() {
  const epk = getSingleContent("epk");
  const { title, subtitle, shortBio, longBio, profileImage, pressPhotos, pressQuotes } = epk.frontmatter;

  return (
    <>
      <HeroSection heading={title as string} subheading={subtitle as string} compact />

      <section className="py-24 sm:py-32 bg-night">
        <div className="max-w-5xl mx-auto px-5 sm:px-8">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-16 mb-24">
            <div className="md:col-span-4">
              {profileImage ? (
                <img src={profileImage as string} alt="Rollin Brummette" className="rounded-lg shadow-2xl shadow-black/30 w-full" />
              ) : (
                <div className="aspect-[3/4] rounded-lg bg-night-lighter border border-white/5 flex items-center justify-center overflow-hidden relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-bark/20 to-transparent" />
                  <span className="font-heading text-6xl text-amber/10 font-bold relative">RB</span>
                </div>
              )}
            </div>
            <div className="md:col-span-8 space-y-8">
              <div>
                <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-amber mb-4 block">Short Bio</span>
                <p className="text-smoke/70 leading-relaxed">{shortBio as string}</p>
              </div>
              <div className="h-px bg-white/5" />
              <div>
                <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-amber mb-4 block">Full Bio</span>
                <div className="text-smoke/70 leading-relaxed whitespace-pre-line">{longBio as string}</div>
              </div>
            </div>
          </div>

          {(pressQuotes as PressQuote[])?.length > 0 && (
            <div className="mb-24">
              <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-amber mb-8 block">Press</span>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {(pressQuotes as PressQuote[]).map((pq, i) => (
                  <div key={i} className="p-6 rounded-lg border border-white/5 bg-night-light">
                    <Quote size={20} className="text-amber/30 mb-4" />
                    <p className="text-cream/80 italic leading-relaxed mb-5">
                      &ldquo;{pq.quote}&rdquo;
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold text-smoke/50">{pq.source}</span>
                      {pq.url && (
                        <a href={pq.url} target="_blank" rel="noopener noreferrer" className="text-amber/50 hover:text-amber transition-colors">
                          <ExternalLink size={12} />
                        </a>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {(pressPhotos as PressPhoto[])?.length > 0 && (
            <div className="mb-24">
              <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-amber mb-8 block">Press Photos</span>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {(pressPhotos as PressPhoto[]).map((photo, i) => (
                  <div key={i} className="group relative rounded-lg overflow-hidden">
                    <img src={photo.image} alt={photo.caption || `Press photo ${i + 1}`} className="w-full aspect-[4/5] object-cover" />
                    <div className="absolute inset-0 bg-night/0 group-hover:bg-night/50 transition-all duration-300 flex items-center justify-center">
                      <a
                        href={photo.image}
                        download
                        className="w-11 h-11 rounded-full border border-cream/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-cream hover:bg-cream hover:text-night"
                      >
                        <Download size={16} />
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="text-center rounded-lg border border-white/5 bg-night-light p-12 sm:p-16">
            <h2 className="font-heading text-2xl sm:text-3xl font-bold text-cream mb-4">
              Need More Info?
            </h2>
            <p className="text-smoke/50 mb-8 max-w-md mx-auto">
              For booking, press inquiries, or additional materials.
            </p>
            <a
              href="mailto:rollinbrummette@gmail.com"
              className="inline-flex items-center gap-2 bg-amber text-night px-7 py-3.5 rounded-sm font-semibold text-sm uppercase tracking-wider hover:bg-amber-light transition-colors"
            >
              Get in Touch
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
