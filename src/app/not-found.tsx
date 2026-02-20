import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center px-5">
      <div className="text-center">
        <h1 className="font-heading text-8xl sm:text-9xl font-bold text-white/5 leading-none">
          404
        </h1>
        <h2 className="font-heading text-2xl sm:text-3xl font-bold text-cream -mt-4 relative">
          Page Not Found
        </h2>
        <p className="text-smoke/40 mt-4 max-w-sm mx-auto text-sm">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 bg-amber text-night px-6 py-3 rounded-sm font-semibold text-sm uppercase tracking-wider hover:bg-amber-light transition-colors mt-8"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
}
