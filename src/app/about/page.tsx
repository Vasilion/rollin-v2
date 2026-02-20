import { Metadata } from "next";
import { getSingleContentWithHtml } from "@/lib/content";
import HeroSection from "@/components/HeroSection";

export const metadata: Metadata = {
  title: "About",
  description: "Learn about Rollin Brummette - Americana singer-songwriter from Grand Ledge, Michigan.",
};

interface TimelineEvent {
  year: string;
  title: string;
  description: string;
}

export default async function AboutPage() {
  const about = await getSingleContentWithHtml("about");
  const { title, subtitle, heroImage, profileImage, timeline } = about.frontmatter;

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
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-16">
            <div className="md:col-span-4">
              {profileImage ? (
                <img
                  src={profileImage as string}
                  alt="Rollin Brummette"
                  className="rounded-lg shadow-2xl shadow-black/30 w-full sticky top-28"
                />
              ) : (
                <div className="aspect-[3/4] rounded-lg bg-night-lighter border border-white/5 flex items-center justify-center sticky top-28 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-bark/20 to-transparent" />
                  <span className="font-heading text-6xl text-amber/10 font-bold relative">RB</span>
                </div>
              )}
            </div>
            <div className="md:col-span-8">
              <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-amber mb-4 block">Biography</span>
              <div className="prose" dangerouslySetInnerHTML={{ __html: about.html }} />
            </div>
          </div>
        </div>
      </section>

      {(timeline as TimelineEvent[])?.length > 0 && (
        <section className="py-24 sm:py-32 bg-night-light">
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
          <div className="max-w-3xl mx-auto px-5 sm:px-8">
            <div className="text-center mb-16">
              <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-amber mb-4 block">Timeline</span>
              <h2 className="font-heading text-3xl sm:text-4xl font-bold text-cream">The Journey</h2>
            </div>
            <div className="space-y-0 relative">
              <div className="absolute left-[19px] top-2 bottom-2 w-px bg-white/10" />
              {(timeline as TimelineEvent[]).map((event, i) => (
                <div key={i} className="flex gap-8 pb-12 last:pb-0 relative">
                  <div className="flex-shrink-0 relative z-10">
                    <div className="w-10 h-10 rounded-full border-2 border-amber/40 bg-night-light flex items-center justify-center">
                      <div className="w-2.5 h-2.5 rounded-full bg-amber" />
                    </div>
                  </div>
                  <div className="pt-1.5">
                    <span className="text-xs font-semibold uppercase tracking-widest text-amber">
                      {event.year}
                    </span>
                    <h3 className="font-heading text-xl font-semibold text-cream mt-1.5">
                      {event.title}
                    </h3>
                    <p className="text-smoke/50 mt-2 leading-relaxed">
                      {event.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
