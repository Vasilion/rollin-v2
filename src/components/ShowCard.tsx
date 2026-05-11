import { Clock, MapPin, Ticket } from "lucide-react";

interface Props {
  title: string;
  date: string;
  venue: string;
  city: string;
  state: string;
  startTime?: string;
  ticketUrl?: string;
  ticketPrice?: string;
  isPast?: boolean;
}

function formatTime(dateStr: string): string {
  const d = new Date(dateStr);
  if (Number.isNaN(d.getTime())) return "";
  const h = d.getHours();
  const m = d.getMinutes();
  if (h === 0 && m === 0) return "";
  return d.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" });
}

function renderTicketBadge({
  isPast,
  ticketUrl,
  ticketPrice,
}: {
  isPast?: boolean;
  ticketUrl?: string;
  ticketPrice?: string;
}) {
  if (isPast) {
    return <span className="text-smoke/20 text-xs uppercase tracking-wider">Past</span>;
  }
  const url = ticketUrl?.trim();
  const price = ticketPrice?.trim();
  if (url) {
    return (
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 border border-amber/40 text-amber px-4 py-2 rounded-sm text-xs font-semibold uppercase tracking-wider hover:bg-amber hover:text-night transition-all duration-200"
      >
        <Ticket size={12} />
        {price || "Tickets"}
      </a>
    );
  }
  if (price) {
    return (
      <span className="inline-flex items-center gap-2 border border-amber/20 text-amber/80 px-4 py-2 rounded-sm text-xs font-semibold uppercase tracking-wider">
        <Ticket size={12} />
        {price}
      </span>
    );
  }
  return <span className="text-smoke/30 text-xs uppercase tracking-wider">Free</span>;
}

export default function ShowCard({
  title,
  date,
  venue,
  city,
  state,
  startTime,
  ticketUrl,
  ticketPrice,
  isPast,
}: Props) {
  const d = new Date(date);
  const month = d.toLocaleDateString("en-US", { month: "short" }).toUpperCase();
  const day = d.getDate();
  const displayTime = (startTime && startTime.trim()) || formatTime(date);

  return (
    <div
      className={`group flex items-center gap-5 sm:gap-8 py-5 border-b border-white/5 transition-colors hover:bg-white/[0.02] ${
        isPast ? "opacity-40" : ""
      }`}
    >
      <div className="text-center w-14 flex-shrink-0">
        <span className="text-[10px] font-semibold uppercase tracking-widest text-amber">
          {month}
        </span>
        <span className="block text-3xl font-heading font-bold text-cream leading-none mt-0.5">
          {day}
        </span>
      </div>

      <div className="flex-1 min-w-0">
        <h3 className="font-heading text-lg font-semibold text-cream truncate">
          {title}
        </h3>
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-1 text-sm text-smoke/50">
          <span>{venue}</span>
          <span className="flex items-center gap-1">
            <MapPin size={12} />
            {city}, {state}
          </span>
          {displayTime && (
            <span className="flex items-center gap-1 text-amber/80">
              <Clock size={12} />
              {displayTime}
            </span>
          )}
        </div>
      </div>

      <div className="flex-shrink-0">{renderTicketBadge({ isPast, ticketUrl, ticketPrice })}</div>
    </div>
  );
}
