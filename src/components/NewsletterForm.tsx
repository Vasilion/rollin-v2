"use client";

import { useState, FormEvent } from "react";
import { ArrowRight, Check } from "lucide-react";

interface Props {
  variant?: "footer" | "inline" | "hero";
}

export default function NewsletterForm({ variant = "inline" }: Props) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setStatus("loading");
    try {
      await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
    } catch {}
    setStatus("success");
    setEmail("");
  };

  if (status === "success") {
    return (
      <div className="flex items-center gap-2 text-amber text-sm">
        <Check size={16} />
        <span>You&apos;re in. Welcome aboard.</span>
      </div>
    );
  }

  const isHero = variant === "hero";

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Your email"
        required
        className={`flex-1 min-w-0 px-4 py-3 rounded-sm text-sm outline-none transition-all duration-200 ${
          isHero
            ? "bg-white/10 text-cream placeholder:text-cream/30 border border-white/10 focus:border-amber/50"
            : "bg-white/5 text-cream placeholder:text-smoke/30 border border-white/10 focus:border-amber/40"
        }`}
      />
      <button
        type="submit"
        disabled={status === "loading"}
        className="px-4 py-3 rounded-sm bg-amber text-night text-sm font-semibold hover:bg-amber-light transition-colors duration-200 disabled:opacity-50 flex items-center gap-1.5"
      >
        <ArrowRight size={16} />
      </button>
    </form>
  );
}
