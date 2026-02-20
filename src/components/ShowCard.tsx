import { MapPin, Ticket } from "lucide-react";

interface Props {
  title: string;
  date: string;
  venue: string;
  city: string;
  state: string;
  ticketUrl?: string;
  ticketPrice?: string;
  isPast?: boolean;
}

export default function ShowCard({ title, date, venue, city, state, ticketUrl, ticketPrice, isPast }: Props) {
  const d = new Date(date);
  const month = d.toLocaleDateString("en-US", { month: "short" }).toUpperCase();
  const day = d.getDate();

  return (
    <div className={`group flex items-center gap-5 sm:gap-8 py-5 border-b border-white/5 transition-colors hover:bg-white/[0.02] ${isPast ? "opacity-40" : ""}`}>
      <div className="text-center w-14 flex-shrink-0">
        <span className="text-[10px] font-semibold uppercase tracking-widest text-amber">{month}</span>
        <span className="block text-3xl font-heading font-bold text-cream leading-none mt-0.5">{day}</span>
      </div>

      <div className="flex-1 min-w-0">
        <h3 className="font-heading text-lg font-semibold text-cream truncate">{title}</h3>
        <div className="flex items-center gap-3 mt-1 text-sm text-smoke/50">
          <span>{venue}</span>
          <span className="flex items-center gap-1">
            <MapPin size={12} />
            {city}, {state}
          </span>
        </div>
      </div>

      <div className="flex-shrink-0">
        {!isPast && ticketUrl ? (
          <a
            href={ticketUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 border border-amber/40 text-amber px-4 py-2 rounded-sm text-xs font-semibold uppercase tracking-wider hover:bg-amber hover:text-night transition-all duration-200"
          >
            <Ticket size={12} />
            {ticketPrice || "Tickets"}
          </a>
        ) : isPast ? (
          <span className="text-smoke/20 text-xs uppercase tracking-wider">Past</span>
        ) : (
          <span className="text-smoke/30 text-xs uppercase tracking-wider">Free</span>
        )}
      </div>
    </div>
  );
}
