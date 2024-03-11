import "./globals.css";
import { Inter } from "next/font/google";
import Link from "next/link";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";

export const metadata = {
  title: "WoW Level Tracker ",
  description: "Track your WoW characters level for Andy's 3E ",
};

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.className}>
      <body className="min-h-screen bg-[#0e1015]">
        <nav className="flex h-16 items-center justify-center text-white">
          <span className="text-lg font-bold tracking-wide">
            WoW Classic Level Tracker
          </span>
        </nav>
        {children}
        <footer className="flex items-center justify-center p-4 text-gray-300">
          Made with 🤍 by
          <Link
            className="ml-1 underline"
            href="https://github.com/vacodoceo/wow-classic-level-tracker"
          >
            Verner
          </Link>
        </footer>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
