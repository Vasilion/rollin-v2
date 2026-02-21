import { Metadata } from "next";
import { getSingleContentWithHtml } from "@/lib/content";
import HeroSection from "@/components/HeroSection";
import { Heart, Mail } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Weddings & Private Events",
  description:
    "Book Rollin Brummette for your wedding, rehearsal dinner, or private event. Live Americana and country music in Michigan, Nashville, and beyond.",
};

interface Package {
  name: string;
  description: string;
  price: string;
}

interface GalleryItem {
  image: string;
  caption?: string;
}

interface Testimonial {
  quote: string;
  name: string;
  date?: string;
}

export default async function WeddingsPage() {
  const weddings = await getSingleContentWithHtml("weddings");
  const { title, subtitle, heroImage, introText, packages, gallery, testimonials } =
    weddings.frontmatter;

  return (
    <>
      <HeroSection
        heading={title as string}
        subheading={subtitle as string}
        backgroundImage={heroImage as string}
        compact
      />

      <section className="py-24 sm:py-32 bg-night">
        <div className="max-w-5xl mx-auto px-5 sm:px-8">
          {introText && (
            <div className="max-w-3xl mx-auto text-center mb-20">
              <Heart size={28} className="text-amber/40 mx-auto mb-6" />
              <p className="text-lg sm:text-xl text-smoke/70 leading-relaxed">
                {introText as string}
              </p>
            </div>
          )}

          {(packages as Package[])?.length > 0 && (
            <div className="mb-24">
              <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-amber mb-8 block text-center">
                Packages
              </span>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {(packages as Package[]).map((pkg, i) => (
                  <div
                    key={i}
                    className="p-8 rounded-lg border border-white/5 bg-night-light flex flex-col"
                  >
                    <h3 className="font-heading text-xl font-semibold text-cream mb-3">
                      {pkg.name}
                    </h3>
                    <p className="text-smoke/50 text-sm leading-relaxed flex-1 mb-6">
                      {pkg.description}
                    </p>
                    <span className="text-amber font-semibold text-sm uppercase tracking-wider">
                      {pkg.price}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {weddings.html && (
            <div className="max-w-3xl mx-auto mb-24">
              <div
                className="prose"
                dangerouslySetInnerHTML={{ __html: weddings.html }}
              />
            </div>
          )}

          {(gallery as GalleryItem[])?.length > 0 && (
            <div className="mb-24">
              <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-amber mb-8 block text-center">
                Gallery
              </span>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {(gallery as GalleryItem[]).map((item, i) => (
                  <div key={i} className="rounded-lg overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.caption || `Wedding photo ${i + 1}`}
                      className="w-full aspect-[4/3] object-cover hover:scale-105 transition-transform duration-700"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {(testimonials as Testimonial[])?.length > 0 && (
            <div className="mb-24">
              <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-amber mb-8 block text-center">
                Kind Words
              </span>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {(testimonials as Testimonial[]).map((t, i) => (
                  <div
                    key={i}
                    className="p-6 rounded-lg border border-white/5 bg-night-light"
                  >
                    <p className="text-cream/80 italic leading-relaxed mb-4">
                      &ldquo;{t.quote}&rdquo;
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold text-smoke/50">
                        {t.name}
                      </span>
                      {t.date && (
                        <span className="text-xs text-smoke/30">{t.date}</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="text-center rounded-lg border border-white/5 bg-night-light p-12 sm:p-16">
            <h2 className="font-heading text-2xl sm:text-3xl font-bold text-cream mb-4">
              Book Your Date
            </h2>
            <p className="text-smoke/50 mb-8 max-w-md mx-auto">
              Let&apos;s make your special day unforgettable. Reach out to
              discuss availability and details.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-amber text-night px-7 py-3.5 rounded-sm font-semibold text-sm uppercase tracking-wider hover:bg-amber-light transition-colors"
            >
              <Mail size={16} />
              Get in Touch
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
