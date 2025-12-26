import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://innocentresources.com"),
  title: {
    default: "Innocent Resources Corporation Limited",
    template: "%s | Innocent Resources",
  },
  description:
    "Innocent Resources Corporation Limited is an international mining and mineral development company operating across Southern Africa.",
  openGraph: {
    type: "website",
    siteName: "Innocent Resources",
    title: "Innocent Resources Corporation Limited",
    description:
      "Responsible mineral development across Namibia, Botswana, and South Africa.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
