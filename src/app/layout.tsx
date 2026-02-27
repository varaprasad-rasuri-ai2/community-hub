import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Community Hub",
  description: "Your local apartment community gateway",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased selection:bg-blue-100 selection:text-blue-900`}>
        <Navbar />
        <main className="min-h-screen pt-24 pb-12">
          {children}
        </main>
        <footer className="py-12 border-t border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50">
          <div className="container mx-auto px-4 text-center text-slate-500 text-sm">
            <p>© 2026 Community Hub. Designed for local living.</p>
          </div>
        </footer>
      </body>
    </html>
  );
}
