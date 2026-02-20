import { Metadata } from "next";
import { getSingleContent } from "@/lib/content";
import HeroSection from "@/components/HeroSection";
import ContactForm from "@/components/ContactForm";
import { Mail, Phone, MapPin } from "lucide-react";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with Rollin Brummette for booking, press, or fan inquiries.",
};

export default function ContactPage() {
  const contact = getSingleContent("contact");
  const { title, subtitle } = contact.frontmatter;

  return (
    <>
      <HeroSection heading={title as string} subheading={subtitle as string} compact />

      <section className="py-24 sm:py-32 bg-night">
        <div className="max-w-5xl mx-auto px-5 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
            <div className="lg:col-span-4 space-y-6">
              {[
                { icon: <Mail size={20} />, label: "Email", value: "rollinbrummette@gmail.com", href: "mailto:rollinbrummette@gmail.com" },
                { icon: <Phone size={20} />, label: "Phone", value: "(616) 236-3278", href: "tel:6162363278" },
                { icon: <MapPin size={20} />, label: "Based in", value: "Lansing, MI", href: undefined },
              ].map((item) => (
                <div key={item.label} className="group p-5 rounded-lg border border-white/5 bg-night-light hover:border-amber/20 transition-colors">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-amber/60">{item.icon}</span>
                    <span className="text-[10px] font-semibold uppercase tracking-widest text-smoke/30">{item.label}</span>
                  </div>
                  {item.href ? (
                    <a href={item.href} className="text-cream text-sm hover:text-amber transition-colors">{item.value}</a>
                  ) : (
                    <span className="text-cream text-sm">{item.value}</span>
                  )}
                </div>
              ))}
            </div>

            <div className="lg:col-span-8">
              <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-amber mb-6 block">Send a Message</span>
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
