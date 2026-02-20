import { Metadata } from "next";
import { getCollectionSorted } from "@/lib/content";
import HeroSection from "@/components/HeroSection";
import MusicPageClient from "@/components/MusicPageClient";

export const metadata: Metadata = {
  title: "Music",
  description: "Listen to Rollin Brummette's music - singles, EPs, and albums.",
};

export default function MusicPage() {
  const music = getCollectionSorted("music", "date");

  return (
    <>
      <HeroSection heading="Music" subheading="Singles, EPs, and albums" compact />

      <section className="py-24 sm:py-32 bg-night">
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          <MusicPageClient
            tracks={music.map((m) => ({
              slug: m.slug,
              title: m.frontmatter.title as string,
              type: m.frontmatter.type as string,
              date: m.frontmatter.date as string,
              coverImage: m.frontmatter.coverImage as string,
              audioFile: (m.frontmatter.audioFile as string) || "",
              spotifyUrl: (m.frontmatter.spotifyUrl as string) || "",
              appleMusicUrl: (m.frontmatter.appleMusicUrl as string) || "",
            }))}
          />
        </div>
      </section>
    </>
  );
}
