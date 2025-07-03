import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "IEEE ESPRIT Student Branch",
  description: "Empowering innovation, connecting minds - IEEE ESPRIT Student Branch official website",
  keywords: "IEEE, ESPRIT, Student Branch, Engineering, Technology, Innovation",
  authors: [{ name: "IEEE ESPRIT SB" }],
  viewport: "width=device-width, initial-scale=1",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} font-inter antialiased bg-gradient-to-br from-blue-950 via-slate-950 to-blue-950 min-h-screen text-white`}>
        <Navbar />
        <main className="pt-20 max-w-7xl mx-auto">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
