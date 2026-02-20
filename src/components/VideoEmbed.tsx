interface Props {
  youtubeId: string;
  title: string;
  category?: string;
}

export default function VideoEmbed({ youtubeId, title, category }: Props) {
  return (
    <div className="group">
      <div className="relative aspect-video rounded-lg overflow-hidden bg-night-lighter">
        <iframe
          src={`https://www.youtube.com/embed/${youtubeId}`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="w-full h-full"
          loading="lazy"
        />
      </div>
      <div className="mt-3 flex items-start justify-between gap-3">
        <h3 className="font-heading text-base font-semibold text-cream truncate">
          {title}
        </h3>
        {category && (
          <span className="text-[10px] uppercase tracking-wider text-smoke/40 whitespace-nowrap border border-white/10 px-2 py-0.5 rounded">
            {category}
          </span>
        )}
      </div>
    </div>
  );
}
