interface Props {
  title: string;
  subtitle?: string;
  centered?: boolean;
  light?: boolean;
}

export default function SectionHeading({ title, subtitle, centered = true, light = false }: Props) {
  return (
    <div className={`mb-12 ${centered ? "text-center" : ""}`}>
      <h2
        className={`font-heading text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight ${
          light ? "text-bark" : "text-cream"
        }`}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={`mt-4 text-base sm:text-lg max-w-2xl ${centered ? "mx-auto" : ""} ${
            light ? "text-ash" : "text-smoke"
          }`}
        >
          {subtitle}
        </p>
      )}
      <div
        className={`w-10 h-0.5 bg-amber mt-6 ${centered ? "mx-auto" : ""}`}
      />
    </div>
  );
}
