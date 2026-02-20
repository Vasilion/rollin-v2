"use client";

import type { ContentItem } from "@/lib/content";
import MusicCard from "./MusicCard";

interface Props {
  tracks: ContentItem[];
}

export default function HomeMusicSection({ tracks }: Props) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
      {tracks.map((track) => (
        <MusicCard
          key={track.slug}
          title={track.frontmatter.title as string}
          type={track.frontmatter.type as string}
          date={track.frontmatter.date as string}
          coverImage={track.frontmatter.coverImage as string}
          audioFile={track.frontmatter.audioFile as string}
          spotifyUrl={track.frontmatter.spotifyUrl as string}
          appleMusicUrl={track.frontmatter.appleMusicUrl as string}
        />
      ))}
    </div>
  );
}
