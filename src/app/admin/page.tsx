"use client";

import { useEffect } from "react";

export default function AdminPage() {
  useEffect(() => {
    window.location.replace("/admin/index.html");
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-night">
      <p className="text-smoke/50 text-sm">Loading CMS...</p>
    </div>
  );
}
