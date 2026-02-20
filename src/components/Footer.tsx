import Link from "next/link";
import { Facebook, Instagram, Youtube, Music } from "lucide-react";
import NewsletterForm from "./NewsletterForm";

const quickLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Music", href: "/music" },
  { label: "Shows", href: "/shows" },
  { label: "Contact", href: "/contact" },
];

const moreLinks = [
  { label: "Videos", href: "/videos" },
  { label: "Blog", href: "/blog" },
  { label: "Gallery", href: "/gallery" },
  { label: "Merch", href: "/merch" },
  { label: "EPK", href: "/epk" },
];

function TikTokIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 0 0-.79-.05A6.34 6.34 0 0 0 3.15 15a6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.34-6.34V8.28a8.18 8.18 0 0 0 4.76 1.52v-3.4a4.85 4.85 0 0 1-1-.29z" />
    </svg>
  );
}

const socialLinks = [
  { icon: <TikTokIcon />, href: "https://www.tiktok.com/@rollinbrummette", label: "TikTok" },
  { icon: <Instagram size={18} />, href: "https://www.instagram.com/rollinbrummette", label: "Instagram" },
  { icon: <Facebook size={18} />, href: "https://www.facebook.com/rollinbrummette", label: "Facebook" },
  { icon: <Youtube size={18} />, href: "https://www.youtube.com/@rollinbrummette", label: "YouTube" },
  { icon: <Music size={18} />, href: "https://open.spotify.com/artist/rollinbrummette", label: "Spotify" },
];

export default function Footer() {
  return (
    <footer className="bg-night-light border-t border-white/5">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8">
          <div className="lg:col-span-4">
            <span className="font-heading text-xl font-bold text-cream tracking-wide">
              ROLLIN <span className="text-amber">BRUMMETTE</span>
            </span>
            <p className="text-smoke/60 text-sm leading-relaxed mt-4 max-w-xs">
              Americana singer-songwriter from Michigan. Telling stories through country and folk-rock.
            </p>
            <div className="flex items-center gap-2 mt-6">
              {socialLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full border border-white/10 flex items-center justify-center text-smoke/50 hover:text-amber hover:border-amber/40 transition-all duration-200"
                  aria-label={link.label}
                >
                  {link.icon}
                </a>
              ))}
            </div>
          </div>

          <div className="lg:col-span-2">
            <h4 className="text-xs font-semibold uppercase tracking-widest text-cream/40 mb-5">
              Navigate
            </h4>
            <ul className="space-y-2.5">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-smoke/50 hover:text-amber transition-colors duration-200 text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-2">
            <h4 className="text-xs font-semibold uppercase tracking-widest text-cream/40 mb-5">
              More
            </h4>
            <ul className="space-y-2.5">
              {moreLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-smoke/50 hover:text-amber transition-colors duration-200 text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-4">
            <h4 className="text-xs font-semibold uppercase tracking-widest text-cream/40 mb-5">
              Newsletter
            </h4>
            <p className="text-smoke/50 text-sm mb-4">
              Stay updated with new music, shows &amp; stories.
            </p>
            <NewsletterForm variant="footer" />
          </div>
        </div>

        <div className="py-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-smoke/30 text-xs">
            &copy; {new Date().getFullYear()} Rollin Brummette. All rights reserved. Built by{" "}
            <a href="https://unyxwebsolutions.com" target="_blank" rel="noopener noreferrer" className="hover:text-smoke/50 transition-colors">Unyx</a>
          </p>
          <div className="flex items-center gap-5">
            <Link href="/contact" className="text-smoke/30 hover:text-smoke/50 text-xs transition-colors">
              Contact
            </Link>
            <Link href="/epk" className="text-smoke/30 hover:text-smoke/50 text-xs transition-colors">
              Press Kit
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
