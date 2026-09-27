import type { Metadata } from "next";
import { Newsreader, Inter } from "next/font/google";
import "./globals.css";

const serif = Newsreader({
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
});

const sans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "https://innocentresources.com"
  ),
  title: {
    default: "Innocent Resources Corporation Limited",
    template: "%s | Innocent Resources",
  },
  description:
    "Innocent Resources Corporation Limited is a mining and mineral development company focused on Namibia, Botswana and South Africa.",
  openGraph: {
    type: "website",
    siteName: "Innocent Resources",
    title: "Innocent Resources Corporation Limited",
    description:
      "Responsible mineral development across Namibia, Botswana and South Africa.",
    images: [
      {
        url: "/img/hero-spitzkoppe.jpg",
        width: 1200,
        height: 675,
        alt: "Granite peaks at Spitzkoppe, Namibia, at dusk",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Innocent Resources Corporation Limited",
    description:
      "Responsible mineral development across Namibia, Botswana and South Africa.",
    images: ["/img/hero-spitzkoppe.jpg"],
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" style={{ colorScheme: "only light" }} className={`${serif.variable} ${sans.variable}`}>
      <body>{children}</body>
    </html>
  );
}
