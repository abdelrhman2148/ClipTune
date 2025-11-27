import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { PostHogProvider } from "@/components/analytics/PostHogProvider";
import { FeedbackWidget } from "@/components/feedback/FeedbackWidget";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ClipTune - AI Video Clipper with Timeline Control",
  description: "The speed of AI. The precision of a Pro. Create viral clips from long-form content with timeline control.",
  openGraph: {
    title: "ClipTune - AI Video Clipper with Timeline Control",
    description: "Stop letting AI ruin your cuts. Edit AI suggestions on a timeline.",
    images: ['/og-image.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: "ClipTune - AI Video Clipper",
    description: "The speed of AI. The precision of a Pro.",
    images: ['/og-image.png'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <PostHogProvider>
          {children}
          <FeedbackWidget />
        </PostHogProvider>
      </body>
    </html>
  );
}
