"use client";

import { useState, FormEvent } from "react";
import { Send, Check } from "lucide-react";

export default function ContactForm() {
  const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("https://formspree.io/f/yourformid", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        setStatus("success");
        setFormData({ name: "", email: "", subject: "", message: "" });
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div className="flex flex-col items-center justify-center py-16 gap-4">
        <div className="w-14 h-14 rounded-full bg-amber/10 flex items-center justify-center">
          <Check size={28} className="text-amber" />
        </div>
        <h3 className="font-heading text-2xl text-cream">Message Sent</h3>
        <p className="text-smoke/50 text-sm">Rollin will get back to you soon.</p>
        <button onClick={() => setStatus("idle")} className="mt-2 text-amber hover:text-amber-light text-sm transition-colors">
          Send another message
        </button>
      </div>
    );
  }

  const inputClass = "w-full px-4 py-3 rounded-sm bg-white/5 border border-white/10 text-cream placeholder:text-smoke/25 outline-none focus:border-amber/40 transition-colors text-sm";

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <input
          type="text"
          required
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className={inputClass}
          placeholder="Name"
        />
        <input
          type="email"
          required
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          className={inputClass}
          placeholder="Email"
        />
      </div>
      <input
        type="text"
        required
        value={formData.subject}
        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
        className={inputClass}
        placeholder="Subject"
      />
      <textarea
        required
        rows={5}
        value={formData.message}
        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
        className={`${inputClass} resize-none`}
        placeholder="Your message..."
      />
      {status === "error" && (
        <p className="text-red-400 text-sm">Something went wrong. Please try again or email directly.</p>
      )}
      <button
        type="submit"
        disabled={status === "loading"}
        className="flex items-center justify-center gap-2 w-full sm:w-auto px-8 py-3 bg-amber text-night rounded-sm font-semibold text-sm uppercase tracking-wider hover:bg-amber-light transition-colors duration-200 disabled:opacity-50"
      >
        <Send size={14} />
        {status === "loading" ? "Sending..." : "Send Message"}
      </button>
    </form>
  );
}
