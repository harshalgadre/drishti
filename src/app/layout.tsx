import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import MobileBottomNav from "@/components/MobileBottomNav";

export const metadata: Metadata = {
  title: "BhuRakshak AI | AI-Based Landslide Risk & GIS Early Warning",
  description:
    "Real-time early warning and landslide risk monitoring platform for the North Eastern Region of India. Smart India Hackathon 2026 - Team Drishti.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-background text-foreground antialiased font-body min-h-screen flex flex-col">
        {/* Full Desktop & Tablet Responsive Header */}
        <Navbar />

        {/* Main Fluid Web Application Body */}
        <main className="flex-1 w-full max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-4 sm:py-6">
          {children}
        </main>

        {/* Professional Web Footer */}
        <Footer />

        {/* Mobile Navigation Dock (Only visible on small phones < 768px, completely hidden on tablets and desktop) */}
        <div className="md:hidden">
          <MobileBottomNav />
        </div>
      </body>
    </html>
  );
}
