import type { Metadata } from "next";
import { Cormorant_Garamond, Geist_Mono } from "next/font/google";
import "./globals.css";

const display = Cormorant_Garamond({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Lumina Studio | AI Content Creation, Video Editing & Creative Production",
  description:
    "AI-powered creative studio for video creation, professional editing, captions, voice-over, AI images and social media content.",
  keywords: [
    "AI content creation",
    "AI video creation",
    "AI video editing",
    "social media content creation",
    "professional video editing",
    "AI advertising",
    "AI creative studio",
    "reels editing",
    "AI image generation",
    "captions and subtitles",
    "video enhancement",
  ],
  openGraph: {
    title: "Lumina Studio — Your AI-Powered Creative Studio",
    description: "Turn your ideas into high-quality content with AI.",
    type: "website",
    url: "https://youssefhajmi2-ops.github.io",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${geistMono.variable} h-full antialiased`}>
      <body className="min-h-full">{children}</body>
    </html>
  );
}
