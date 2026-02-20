import { Metadata } from "next";
import { getCollectionSorted } from "@/lib/content";
import HeroSection from "@/components/HeroSection";
import GalleryPageClient from "@/components/GalleryPageClient";

export const metadata: Metadata = {
  title: "Gallery",
  description: "Photo gallery of Rollin Brummette - live shows, behind the scenes, and more.",
};

interface GalleryImage {
  image: string;
  caption?: string;
}

export default function GalleryPage() {
  const galleries = getCollectionSorted("gallery", "date");

  const allImages: { image: string; caption?: string; category: string }[] = [];
  const categories = new Set<string>();

  galleries.forEach((g) => {
    const cat = g.frontmatter.category as string;
    categories.add(cat);
    const images = g.frontmatter.images as GalleryImage[] | undefined;
    if (images) {
      images.forEach((img) => {
        allImages.push({ ...img, category: cat });
      });
    }
  });

  return (
    <>
      <HeroSection heading="Gallery" subheading="Photos & moments" compact />

      <section className="py-24 sm:py-32 bg-night">
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          <GalleryPageClient images={allImages} categories={Array.from(categories)} />
        </div>
      </section>
    </>
  );
}
