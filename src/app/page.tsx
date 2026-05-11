import Link from "next/link";
import { getSingleContent, getCollectionSorted } from "@/lib/content";
import HeroSection from "@/components/HeroSection";
import SectionHeading from "@/components/SectionHeading";
import ShowCard from "@/components/ShowCard";
import NewsletterForm from "@/components/NewsletterForm";
import HomeMusicSection from "@/components/HomeMusicSection";
import { ArrowRight, Music, Calendar, Mail } from "lucide-react";

export default function HomePage() {
  const home = getSingleContent("home");
  const { heroHeading, heroSubheading, heroImage, heroCtaText, heroCtaLink, aboutPreview, aboutImage } =
    home.frontmatter;

  const shows = getCollectionSorted("shows", "date", true)
    .filter((s) => new Date(s.frontmatter.date as string) > new Date())
    .slice(0, 3);

  const featuredMusic = getCollectionSorted("music", "date")
    .filter((m) => m.frontmatter.featured)
    .slice(0, 4);

  return (
    <>
      <HeroSection
        heading={heroHeading as string}
        subheading={heroSubheading as string}
        backgroundImage={heroImage as string}
        ctaText={heroCtaText as string}
        ctaLink={heroCtaLink as string}
      />

      <section className="py-24 sm:py-32 bg-night relative">
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-amber mb-4 block">About</span>
              <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-cream leading-tight">
                Stories from the<br />
                <span className="text-amber">heartland</span>
              </h2>
              <div className="w-10 h-0.5 bg-amber mt-6 mb-8" />
              <p className="text-smoke/70 text-lg leading-relaxed">
                {aboutPreview as string}
              </p>
              <Link
                href="/about"
                className="inline-flex items-center gap-2 mt-8 text-amber text-sm font-semibold uppercase tracking-wider hover:gap-3 transition-all duration-200 group"
              >
                Read Full Story
                <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </div>
            <div className="relative">
              {aboutImage ? (
                <img
                  src={aboutImage as string}
                  alt="Rollin Brummette"
                  className="rounded-lg shadow-2xl shadow-black/30"
                />
              ) : (
                <div className="aspect-[4/5] rounded-lg bg-night-lighter border border-white/5 flex items-center justify-center relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-bark/20 to-transparent" />
                  <span className="font-heading text-8xl text-amber/10 font-bold">RB</span>
                </div>
              )}
              <div className="absolute -bottom-6 -left-6 w-24 h-24 border border-amber/20 rounded-lg" />
            </div>
          </div>
        </div>
      </section>

      {featuredMusic.length > 0 && (
        <section className="py-24 sm:py-32 bg-night-light relative">
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
          <div className="max-w-7xl mx-auto px-5 sm:px-8">
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-14">
              <div>
                <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-amber mb-4 block">
                  <Music size={14} className="inline mr-2 -mt-0.5" />
                  Latest Releases
                </span>
                <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-cream">
                  Music
                </h2>
              </div>
              <Link
                href="/music"
                className="inline-flex items-center gap-2 text-amber text-sm font-semibold uppercase tracking-wider hover:gap-3 transition-all duration-200 group"
              >
                View All
                <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </div>
            <HomeMusicSection tracks={featuredMusic} />
          </div>
        </section>
      )}

      {shows.length > 0 && (
        <section className="py-24 sm:py-32 bg-night relative">
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
          <div className="max-w-4xl mx-auto px-5 sm:px-8">
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-10">
              <div>
                <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-amber mb-4 block">
                  <Calendar size={14} className="inline mr-2 -mt-0.5" />
                  On Tour
                </span>
                <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-cream">
                  Upcoming Shows
                </h2>
              </div>
              <Link
                href="/shows"
                className="inline-flex items-center gap-2 text-amber text-sm font-semibold uppercase tracking-wider hover:gap-3 transition-all duration-200 group"
              >
                All Shows
                <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </div>
            <div>
              {shows.map((show) => (
                <ShowCard
                  key={show.slug}
                  title={show.frontmatter.title as string}
                  date={show.frontmatter.date as string}
                  venue={show.frontmatter.venue as string}
                  city={show.frontmatter.city as string}
                  state={show.frontmatter.state as string}
                  startTime={show.frontmatter.startTime as string}
                  ticketUrl={show.frontmatter.ticketUrl as string}
                  ticketPrice={show.frontmatter.ticketPrice as string}
                />
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="py-24 sm:py-32 bg-night-light relative">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        <div className="max-w-xl mx-auto px-5 sm:px-8 text-center">
          <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-amber mb-4 block">
            <Mail size={14} className="inline mr-2 -mt-0.5" />
            Stay Connected
          </span>
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-cream">
            Join the Newsletter
          </h2>
          <p className="text-smoke/50 mt-4 mb-8">
            Get updates on new music, shows, and stories from the road.
          </p>
          <NewsletterForm variant="hero" />
        </div>
      </section>
    </>
  );
}
