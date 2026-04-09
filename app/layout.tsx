import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Yessare - Your Ultimate Tool Shop",
  description: "Discover a wide range of high-quality tools at Yessare. From power tools to hand tools, we have everything you need for your projects. Shop now and get the best deals on top brands!",
  icons: {
    icon: "/logo.jpeg",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-background text-textPrimary min-h-screen">
        {children}   
      </body>
    </html>
  );
}