import { Metadata } from "next";
import { getCollectionSorted } from "@/lib/content";
import HeroSection from "@/components/HeroSection";
import { ExternalLink } from "lucide-react";

export const metadata: Metadata = {
  title: "Merch",
  description: "Shop official Rollin Brummette merchandise.",
};

export default function MerchPage() {
  const merch = getCollectionSorted("merch", "date");

  return (
    <>
      <HeroSection heading="Merch" subheading="Official merchandise" compact />

      <section className="py-24 sm:py-32 bg-night">
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {merch.map((item) => (
              <div key={item.slug} className="group rounded-lg overflow-hidden bg-night-light border border-white/5 hover:border-white/10 transition-colors">
                <div className="relative aspect-square overflow-hidden">
                  <img
                    src={(item.frontmatter.image as string) || "/media/images/placeholder-merch.jpg"}
                    alt={item.frontmatter.title as string}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  {item.frontmatter.soldOut ? (
                    <div className="absolute inset-0 bg-night/70 flex items-center justify-center">
                      <span className="text-cream/80 text-xs font-semibold uppercase tracking-widest border border-cream/30 px-4 py-2">
                        Sold Out
                      </span>
                    </div>
                  ) : null}
                </div>
                <div className="p-5">
                  <h3 className="font-heading text-lg font-semibold text-cream">
                    {item.frontmatter.title as string}
                  </h3>
                  <p className="text-amber font-semibold mt-1">
                    {item.frontmatter.price as string}
                  </p>
                  {!item.frontmatter.soldOut && item.frontmatter.purchaseUrl ? (
                    <a
                      href={item.frontmatter.purchaseUrl as string}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 mt-4 border border-amber/40 text-amber px-4 py-2 rounded-sm text-xs font-semibold uppercase tracking-wider hover:bg-amber hover:text-night transition-all duration-200"
                    >
                      <ExternalLink size={12} />
                      Buy Now
                    </a>
                  ) : null}
                </div>
              </div>
            ))}
          </div>

          {merch.length === 0 && (
            <p className="text-center text-smoke/30 py-20">Merch coming soon.</p>
          )}
        </div>
      </section>
    </>
  );
}
