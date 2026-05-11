import type { Metadata } from "next";
import { Inter, Inter_Tight, JetBrains_Mono } from "next/font/google";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import AgenticMesh from "@/components/AgenticMesh";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

const interTight = Inter_Tight({
  variable: "--font-inter-tight",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Prateek Saxena — AI Engineer",
  description:
    "AI Engineer building LLM-powered applications and AI automation tools. 7+ years across marketing analytics, analytics engineering, and business data systems.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        suppressHydrationWarning
        className={`${inter.variable} ${interTight.variable} ${jetbrainsMono.variable} antialiased`}
      >
        <Nav />
        <AgenticMesh />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
