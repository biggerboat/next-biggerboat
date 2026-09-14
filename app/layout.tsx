import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://biggerboat.nl"),
  title: "Biggerboat | Independent web developers and software engineers",
  description: "Biggerboat is a collective of independent web developers, software engineers and technical consultants. We help you with complex technical challenges.",
  keywords: "web development, software engineers, freelance, development team, technical consultants",
  openGraph: {
    title: "Biggerboat | Independent web developers and software engineers",
    description: "Biggerboat is a collective of independent web developers, software engineers and technical consultants. We help you with complex technical challenges.",
    url: "https://biggerboat.nl",
    siteName: "Biggerboat",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Biggerboat team",
      }
    ],
    locale: "en_US",
    type: "website",
  },
  robots: "index, follow",
  viewport: "width=device-width, initial-scale=1",
  themeColor: "#ffffff",
  alternates: {
    canonical: "https://biggerboat.nl",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className="antialiased bg-[url('/background-stripe.jpg')] font-droid"
      >
        {children}
      </body>
    </html>
  );
}
