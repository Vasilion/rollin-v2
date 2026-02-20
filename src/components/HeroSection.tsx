import Link from "next/link";

interface Props {
  heading: string;
  subheading?: string;
  backgroundImage?: string;
  ctaText?: string;
  ctaLink?: string;
  compact?: boolean;
}

export default function HeroSection({
  heading,
  subheading,
  backgroundImage,
  ctaText,
  ctaLink,
  compact = false,
}: Props) {
  return (
    <section
      className={`relative flex items-end overflow-hidden ${
        compact ? "min-h-[50vh] pb-16" : "min-h-[100vh] pb-24"
      }`}
    >
      {backgroundImage ? (
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${backgroundImage})` }}
        />
      ) : (
        <div className="absolute inset-0 bg-night" />
      )}

      <div className="absolute inset-0 bg-gradient-to-t from-night via-night/70 to-night/30" />
      <div className="absolute inset-0 bg-gradient-to-r from-night/50 to-transparent" />

      {!compact && (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full border border-amber/5 pointer-events-none" />
      )}

      <div className="relative z-10 w-full max-w-7xl mx-auto px-5 sm:px-8">
        <div className="max-w-3xl">
          {!compact && (
            <div className="w-12 h-px bg-amber mb-6 anim-fade-in" />
          )}
          <h1
            className={`font-heading font-bold text-cream leading-[1.05] anim-fade-up ${
              compact
                ? "text-4xl sm:text-5xl md:text-6xl"
                : "text-5xl sm:text-6xl md:text-7xl lg:text-8xl"
            }`}
          >
            {heading}
          </h1>
          {subheading && (
            <p
              className={`text-smoke font-light leading-relaxed mt-5 anim-fade-up max-w-xl ${
                compact ? "text-lg" : "text-lg sm:text-xl"
              }`}
              style={{ animationDelay: "0.15s" }}
            >
              {subheading}
            </p>
          )}
          {ctaText && ctaLink && (
            <div className="mt-8 anim-fade-up" style={{ animationDelay: "0.3s" }}>
              <Link
                href={ctaLink}
                className="inline-flex items-center gap-3 bg-amber text-night px-7 py-3.5 rounded-sm font-semibold text-sm uppercase tracking-wider hover:bg-amber-light transition-colors duration-200"
              >
                {ctaText}
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="ml-1">
                  <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
