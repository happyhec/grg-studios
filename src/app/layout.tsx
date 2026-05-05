import type { Metadata } from "next";
import { Inter, Outfit, Rajdhani } from "next/font/google";
import "./globals.css";
import AgencyNavbar from "@/components/AgencyNavbar";
import AgencyFooter from "@/components/AgencyFooter";
import Script from "next/script";
import LayoutClient from "@/components/LayoutClient";

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

const rajdhani = Rajdhani({
  variable: "--font-rajdhani",
  subsets: ["latin"],
  weight: ["300", "400", "600", "700"],
  display: 'swap',
});

export const dynamic = 'force-static';

export const metadata: Metadata = {
  title: "GRG Studios | Premium Digital Architecture",
  description: "Ventura County's premier digital architecture and automation studio.",
  openGraph: {
    title: "GRG Studios | Premium Digital Architecture",
    description: "Ventura County's premier digital architecture and automation studio.",
    images: ["/images/og-preview.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth selection:bg-[#c9a84c]/30 selection:text-white">
      <head>
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        <link rel="preconnect" href="https://www.google-analytics.com" />
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
      <body className={`${inter.variable} ${outfit.variable} ${rajdhani.variable} font-inter antialiased md:cursor-none`} suppressHydrationWarning>
        <LayoutClient>
          <AgencyNavbar />
          <main className="relative z-10 flex min-h-screen flex-col">
            {children}
          </main>
          <AgencyFooter />
        </LayoutClient>
      </body>
    </html>
  );
}
