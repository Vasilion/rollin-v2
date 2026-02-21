"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Music", href: "/music" },
  { label: "Videos", href: "/videos" },
  { label: "Shows", href: "/shows" },
  { label: "Weddings", href: "/weddings" },
  { label: "Band", href: "/band" },
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

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  const close = useCallback(() => setOpen(false), []);

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled || open
            ? "bg-night/95 backdrop-blur-md shadow-lg shadow-black/20"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          <div className="flex items-center justify-between h-16 sm:h-18 md:h-22">
            <Link href="/" className="relative z-[60]" onClick={close}>
              <span className="font-heading text-lg sm:text-xl md:text-2xl font-bold text-cream tracking-wide">
                ROLLIN
                <span className="text-amber ml-1">BRUMMETTE</span>
              </span>
            </Link>

            <div className="hidden xl:flex items-center gap-0.5">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative px-2.5 py-2 text-[12px] font-medium uppercase tracking-widest transition-colors duration-200 ${
                    isActive(link.href)
                      ? "text-amber"
                      : "text-cream/60 hover:text-cream"
                  }`}
                >
                  {link.label}
                  {isActive(link.href) && (
                    <span className="absolute bottom-0 left-2.5 right-2.5 h-px bg-amber" />
                  )}
                </Link>
              ))}
            </div>

            <button
              onClick={() => setOpen(!open)}
              className="xl:hidden relative z-[60] text-cream p-2 -mr-2"
              aria-label="Toggle menu"
            >
              {open ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </nav>

      {open && (
        <div
          className="xl:hidden fixed inset-0 z-[55] bg-night/[0.98] backdrop-blur-xl"
          onClick={close}
        >
          <button
            onClick={close}
            className="absolute top-5 right-5 z-[60] w-10 h-10 flex items-center justify-center rounded-full border border-white/10 text-cream/70 hover:text-cream hover:border-white/20 transition-colors"
            aria-label="Close menu"
          >
            <X size={20} />
          </button>

          <div
            className="h-full pt-20 pb-8 px-8 overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex flex-col items-center gap-1 py-4">
              {navLinks.map((link, i) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={close}
                  className={`text-lg sm:text-xl font-heading font-semibold py-2.5 px-5 rounded-lg transition-colors duration-200 ${
                    isActive(link.href)
                      ? "text-amber bg-amber/5"
                      : "text-cream/50 hover:text-cream hover:bg-white/5"
                  }`}
                  style={{
                    animation: `menuFadeIn 0.3s ease-out ${i * 0.04}s both`,
                  }}
                >
                  {link.label}
                </Link>
              ))}
            </div>

            <div
              className="mt-6 pt-6 border-t border-white/5 text-center"
              style={{ animation: "menuFadeIn 0.3s ease-out 0.5s both" }}
            >
              <p className="text-smoke/30 text-xs tracking-wider uppercase">
                Rollin Brummette &middot; Americana
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
