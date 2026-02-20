import fs from "fs";
import path from "path";

const SITE_URL = "https://www.rollinbrummette.com";

const staticPages = [
  "",
  "/about",
  "/music",
  "/videos",
  "/shows",
  "/blog",
  "/contact",
  "/gallery",
  "/merch",
  "/epk",
];

function getBlogSlugs() {
  const blogDir = path.join(process.cwd(), "content", "blog");
  if (!fs.existsSync(blogDir)) return [];
  return fs
    .readdirSync(blogDir)
    .filter((f) => f.endsWith(".md"))
    .map((f) => `/blog/${f.replace(/\.md$/, "")}`);
}

function generateSitemap() {
  const blogPages = getBlogSlugs();
  const allPages = [...staticPages, ...blogPages];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allPages
  .map(
    (page) => `  <url>
    <loc>${SITE_URL}${page}/</loc>
    <lastmod>${new Date().toISOString().split("T")[0]}</lastmod>
    <changefreq>${page === "" ? "weekly" : "monthly"}</changefreq>
    <priority>${page === "" ? "1.0" : page.startsWith("/blog/") ? "0.6" : "0.8"}</priority>
  </url>`
  )
  .join("\n")}
</urlset>`;

  fs.writeFileSync(path.join(process.cwd(), "public", "sitemap.xml"), sitemap);
  console.log(`Sitemap generated with ${allPages.length} pages`);
}

generateSitemap();
