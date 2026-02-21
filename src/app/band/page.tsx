import { Metadata } from "next";
import { getSingleContentWithHtml } from "@/lib/content";
import HeroSection from "@/components/HeroSection";

export const metadata: Metadata = {
  title: "The Band",
  description:
    "Meet the musicians behind Rollin Brummette's live Americana sound.",
};

interface BandMember {
  name: string;
  role: string;
  image?: string;
  bio?: string;
}

export default async function BandPage() {
  const band = await getSingleContentWithHtml("band");
  const { title, subtitle, heroImage, groupPhoto, introText, members } =
    band.frontmatter;

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
              <p className="text-lg sm:text-xl text-smoke/70 leading-relaxed">
                {introText as string}
              </p>
            </div>
          )}

          {groupPhoto && (
            <div className="mb-20 rounded-lg overflow-hidden">
              <img
                src={groupPhoto as string}
                alt="The band"
                className="w-full object-cover"
              />
            </div>
          )}

          {(members as BandMember[])?.length > 0 && (
            <div className="mb-24">
              <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-amber mb-10 block text-center">
                Members
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {(members as BandMember[]).map((member, i) => (
                  <div key={i} className="text-center">
                    {member.image ? (
                      <img
                        src={member.image}
                        alt={member.name}
                        className="w-40 h-40 rounded-full object-cover mx-auto mb-5 border-2 border-white/5"
                      />
                    ) : (
                      <div className="w-40 h-40 rounded-full bg-night-lighter border-2 border-white/5 mx-auto mb-5 flex items-center justify-center">
                        <span className="font-heading text-3xl text-amber/15 font-bold">
                          {member.name
                            .split(" ")
                            .map((n: string) => n[0])
                            .join("")}
                        </span>
                      </div>
                    )}
                    <h3 className="font-heading text-lg font-semibold text-cream">
                      {member.name}
                    </h3>
                    <p className="text-amber text-xs font-semibold uppercase tracking-wider mt-1">
                      {member.role}
                    </p>
                    {member.bio && (
                      <p className="text-smoke/50 text-sm mt-3 leading-relaxed max-w-xs mx-auto">
                        {member.bio}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {band.html && (
            <div className="max-w-3xl mx-auto">
              <div
                className="prose"
                dangerouslySetInnerHTML={{ __html: band.html }}
              />
            </div>
          )}
        </div>
      </section>
    </>
  );
}
