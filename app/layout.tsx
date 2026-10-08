import type { Metadata } from "next";
import { Newsreader, Inter } from "next/font/google";
import "./globals.css";
import { contact, siteUrl } from "@/lib/site";

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
  metadataBase: new URL(siteUrl),
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
        url: "/img/og.jpg",
        width: 1200,
        height: 630,
        alt: "Innocent Resources",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Innocent Resources Corporation Limited",
    description:
      "Responsible mineral development across Namibia, Botswana and South Africa.",
    images: ["/img/og.jpg"],
  },
  robots: { index: true, follow: true },
};

const organization = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Innocent Resources Corporation Limited",
  url: siteUrl,
  logo: `${siteUrl}/logo-black.svg`,
  email: contact.email,
  address: {
    "@type": "PostalAddress",
    streetAddress: "101 Katherine Street",
    addressLocality: "Sandton",
    addressCountry: "ZA",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" style={{ colorScheme: "only light" }} className={`${serif.variable} ${sans.variable}`}>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organization) }}
        />
        {children}
      </body>
    </html>
  );
}
