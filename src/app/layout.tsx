import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AudioPlayer from "@/components/AudioPlayer";
import { AudioProvider } from "@/contexts/AudioContext";

const playfair = Playfair_Display({
  variable: "--font-playfair-display",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Rollin Brummette | Americana Singer-Songwriter",
    template: "%s | Rollin Brummette",
  },
  description:
    "Official website of Rollin Brummette - Americana singer-songwriter from Michigan. Music, shows, videos, and more.",
  keywords: [
    "Rollin Brummette",
    "country music",
    "americana",
    "singer-songwriter",
    "Michigan",
    "Nashville",
  ],
  authors: [{ name: "Unyx", url: "https://unyxwebsolutions.com" }],
  creator: "Unyx",
  metadataBase: new URL("https://www.rollinbrummette.com"),
  manifest: "/site.webmanifest",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://www.rollinbrummette.com",
    siteName: "Rollin Brummette",
    title: "Rollin Brummette | Americana Singer-Songwriter",
    description:
      "Official website of Rollin Brummette - Americana singer-songwriter from Michigan.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Rollin Brummette | Americana Singer-Songwriter",
    description:
      "Official website of Rollin Brummette - Americana singer-songwriter from Michigan.",
  },
  other: {
    "msapplication-TileColor": "#0D0D0D",
    "msapplication-config": "/browserconfig.xml",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable}`}>
      <body className="antialiased">
        <AudioProvider>
          <Navbar />
          <main className="min-h-screen">{children}</main>
          <Footer />
          <AudioPlayer />
        </AudioProvider>
      </body>
    </html>
  );
}
