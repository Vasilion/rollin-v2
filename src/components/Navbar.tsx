"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Music", href: "/music" },
  { label: "Videos", href: "/videos" },
  { label: "Shows", href: "/shows" },
  { label: "Blog", href: "/blog" },
  { label: "Gallery", href: "/gallery" },
  { label: "Merch", href: "/merch" },
  { label: "EPK", href: "/epk" },
  { label: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled || open
          ? "bg-night/95 backdrop-blur-md shadow-lg shadow-black/20"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="flex items-center justify-between h-18 md:h-22">
          <Link
            href="/"
            className="relative z-10"
            onClick={() => setOpen(false)}
          >
            <span className="font-heading text-xl md:text-2xl font-bold text-cream tracking-wide">
              ROLLIN
              <span className="text-amber ml-1">BRUMMETTE</span>
            </span>
          </Link>

          <div className="hidden lg:flex items-center gap-0.5">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`relative px-3 py-2 text-[13px] font-medium uppercase tracking-widest transition-colors duration-200 ${
                  isActive(link.href)
                    ? "text-amber"
                    : "text-cream/60 hover:text-cream"
                }`}
              >
                {link.label}
                {isActive(link.href) && (
                  <span className="absolute bottom-0 left-3 right-3 h-px bg-amber" />
                )}
              </Link>
            ))}
          </div>

          <button
            onClick={() => setOpen(!open)}
            className="lg:hidden relative z-10 text-cream p-2 -mr-2"
            aria-label="Toggle menu"
          >
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      <div
        className={`lg:hidden fixed inset-0 bg-night/98 backdrop-blur-lg transition-all duration-300 ${
          open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        style={{ top: 0 }}
      >
        <div className="flex flex-col items-center justify-center h-full gap-1">
          {navLinks.map((link, i) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className={`text-2xl font-heading font-semibold transition-all duration-200 py-2 ${
                isActive(link.href)
                  ? "text-amber"
                  : "text-cream/50 hover:text-cream"
              }`}
              style={{ animationDelay: `${i * 0.05}s` }}
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
