import { Metadata } from "next";
import { getCollectionSorted } from "@/lib/content";
import HeroSection from "@/components/HeroSection";
import ShowCard from "@/components/ShowCard";

export const metadata: Metadata = {
  title: "Shows",
  description: "See Rollin Brummette's upcoming shows and past performances.",
};

export default function ShowsPage() {
  const allShows = getCollectionSorted("shows", "date", true);
  const now = new Date();

  const upcoming = allShows.filter((s) => new Date(s.frontmatter.date as string) >= now);
  const past = allShows.filter((s) => new Date(s.frontmatter.date as string) < now).reverse();

  return (
    <>
      <HeroSection heading="Shows" subheading="Catch Rollin live" compact />

      <section className="py-24 sm:py-32 bg-night">
        <div className="max-w-4xl mx-auto px-5 sm:px-8">
          {upcoming.length > 0 ? (
            <div className="mb-20">
              <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-amber mb-8 block">Upcoming</span>
              <div>
                {upcoming.map((show) => (
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
          ) : (
            <div className="text-center py-16 mb-20">
              <p className="text-smoke/30 text-lg">No upcoming shows at the moment.</p>
              <p className="text-smoke/20 text-sm mt-2">Check back soon for new dates.</p>
            </div>
          )}

          {past.length > 0 && (
            <div>
              <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-smoke/30 mb-8 block">Past Shows</span>
              <div>
                {past.map((show) => (
                  <ShowCard
                    key={show.slug}
                    title={show.frontmatter.title as string}
                    date={show.frontmatter.date as string}
                    venue={show.frontmatter.venue as string}
                    city={show.frontmatter.city as string}
                    state={show.frontmatter.state as string}
                    startTime={show.frontmatter.startTime as string}
                    isPast
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
