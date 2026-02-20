import { Metadata } from "next";
import { getCollectionSorted } from "@/lib/content";
import HeroSection from "@/components/HeroSection";
import VideosPageClient from "@/components/VideosPageClient";

export const metadata: Metadata = {
  title: "Videos",
  description: "Watch Rollin Brummette's music videos, live performances, and more.",
};

export default function VideosPage() {
  const videos = getCollectionSorted("videos", "date");

  return (
    <>
      <HeroSection heading="Videos" subheading="Music videos, live performances & more" compact />

      <section className="py-24 sm:py-32 bg-night">
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          <VideosPageClient
            videos={videos.map((v) => ({
              slug: v.slug,
              title: v.frontmatter.title as string,
              youtubeId: v.frontmatter.youtubeId as string,
              category: v.frontmatter.category as string,
              date: v.frontmatter.date as string,
            }))}
          />
        </div>
      </section>
    </>
  );
}
