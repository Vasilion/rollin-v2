import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Rollin Brummette",
    short_name: "Rollin B",
    description:
      "Official website of Rollin Brummette - Americana Singer-Songwriter",
    start_url: "/",
    display: "standalone",
    background_color: "#0D0D0D",
    theme_color: "#C8963E",
    icons: [
      { src: "/icon", sizes: "48x48", type: "image/png" },
      { src: "/apple-icon", sizes: "180x180", type: "image/png" },
    ],
  };
}
