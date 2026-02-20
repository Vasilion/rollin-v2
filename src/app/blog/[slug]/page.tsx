import { Metadata } from "next";
import Link from "next/link";
import { getCollectionSlugs, getCollectionItemWithHtml } from "@/lib/content";
import { ArrowLeft } from "lucide-react";

export async function generateStaticParams() {
  const slugs = getCollectionSlugs("blog");
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = await getCollectionItemWithHtml("blog", slug);
  return {
    title: post.frontmatter.title as string,
    description: post.frontmatter.excerpt as string,
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getCollectionItemWithHtml("blog", slug);
  const date = new Date(post.frontmatter.date as string).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    <section className="pt-32 pb-24 sm:pb-32 bg-night">
      <article className="max-w-3xl mx-auto px-5 sm:px-8">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-smoke/30 hover:text-amber transition-colors mb-10 text-xs uppercase tracking-wider"
        >
          <ArrowLeft size={14} />
          Back to Blog
        </Link>

        <header className="mb-12">
          <time className="text-xs text-smoke/30 uppercase tracking-wider">{date}</time>
          <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold text-cream mt-3 leading-tight">
            {post.frontmatter.title as string}
          </h1>
          {(post.frontmatter.tags as string[])?.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-5">
              {(post.frontmatter.tags as string[]).map((tag) => (
                <span key={tag} className="text-[10px] uppercase tracking-wider text-smoke/30 border border-white/10 px-2.5 py-1 rounded">
                  {tag}
                </span>
              ))}
            </div>
          )}
          <div className="w-10 h-0.5 bg-amber mt-8" />
        </header>

        {post.frontmatter.featuredImage ? (
          <img
            src={post.frontmatter.featuredImage as string}
            alt={post.frontmatter.title as string}
            className="w-full rounded-lg mb-12"
          />
        ) : null}

        <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: post.html }} />
      </article>
    </section>
  );
}
