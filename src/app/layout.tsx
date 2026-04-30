import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: 'swap',
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  display: 'swap',
});

export const dynamic = 'force-static';

export const metadata: Metadata = {
  title: "GRG Studios | Premium Digital Architecture",
  description: "Showcasing agentic workflows, complex infrastructure, and premium web architectures built by GRG Studios.",
  openGraph: {
    title: "GRG Studios | Premium Digital Architecture",
    description: "Ventura County's premier digital architecture and automation studio. We build systems that perform.",
    url: "https://grgstudios.com",
    siteName: "GRG Studios",
    images: [
      {
        url: "/images/og-preview.png",
        width: 1200,
        height: 630,
        alt: "GRG Studios Portfolio",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "GRG Studios | Premium Digital Architecture",
    description: "Ventura County's premier digital architecture and automation studio.",
    images: ["/images/og-preview.png"],
  },
};

import AgencyNavbar from "@/components/AgencyNavbar";
import AgencyFooter from "@/components/AgencyFooter";
import CustomCursor from "@/components/CustomCursor";
import { LazyMotion, domMax } from "framer-motion";
import Script from "next/script";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <head>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-ES13J87FVE"
          strategy="lazyOnload"
        />
        <Script id="google-analytics" strategy="lazyOnload">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-ES13J87FVE');
          `}
        </Script>
      </head>
      <body className={`${inter.variable} ${outfit.variable} font-inter antialiased md:cursor-none`} suppressHydrationWarning>
        <LazyMotion features={domMax}>
          <CustomCursor />
          <AgencyNavbar />
          <main className="relative z-10 flex min-h-screen flex-col">
            {children}
          </main>
          <AgencyFooter />
        </LazyMotion>
      </body>
    </html>
  );
}
