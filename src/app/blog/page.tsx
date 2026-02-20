import { Metadata } from "next";
import Link from "next/link";
import { getCollectionSorted } from "@/lib/content";
import HeroSection from "@/components/HeroSection";
import { ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Blog",
  description: "Read the latest updates, stories, and news from Rollin Brummette.",
};

export default function BlogPage() {
  const posts = getCollectionSorted("blog", "date");

  return (
    <>
      <HeroSection heading="Blog" subheading="Stories, updates & news" compact />

      <section className="py-24 sm:py-32 bg-night">
        <div className="max-w-5xl mx-auto px-5 sm:px-8">
          <div className="space-y-0">
            {posts.map((post, i) => {
              const date = new Date(post.frontmatter.date as string);
              const formattedDate = date.toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
              });

              return (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="group flex flex-col sm:flex-row gap-6 sm:gap-10 py-10 border-b border-white/5 hover:bg-white/[0.02] transition-colors -mx-5 sm:-mx-8 px-5 sm:px-8"
                >
                  <div className="sm:w-56 flex-shrink-0">
                    {post.frontmatter.featuredImage ? (
                      <img
                        src={post.frontmatter.featuredImage as string}
                        alt={post.frontmatter.title as string}
                        className="w-full aspect-[16/10] object-cover rounded-lg"
                      />
                    ) : (
                      <div className="w-full aspect-[16/10] rounded-lg bg-night-lighter border border-white/5 flex items-center justify-center">
                        <span className="font-heading text-2xl text-amber/10 font-bold">RB</span>
                      </div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <time className="text-xs text-smoke/30 uppercase tracking-wider">{formattedDate}</time>
                    <h3 className="font-heading text-xl sm:text-2xl font-semibold text-cream mt-2 mb-3 group-hover:text-amber transition-colors">
                      {post.frontmatter.title as string}
                    </h3>
                    <p className="text-smoke/50 text-sm line-clamp-2 leading-relaxed">
                      {post.frontmatter.excerpt as string}
                    </p>
                    {(post.frontmatter.tags as string[])?.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-4">
                        {(post.frontmatter.tags as string[]).map((tag) => (
                          <span key={tag} className="text-[10px] uppercase tracking-wider text-smoke/30 border border-white/10 px-2 py-0.5 rounded">
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                    <span className="inline-flex items-center gap-1.5 text-amber text-xs font-semibold uppercase tracking-wider mt-4 group-hover:gap-2.5 transition-all">
                      Read More <ArrowRight size={12} />
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>

          {posts.length === 0 && (
            <p className="text-center text-smoke/30 py-20">No blog posts yet. Check back soon.</p>
          )}
        </div>
      </section>
    </>
  );
}
