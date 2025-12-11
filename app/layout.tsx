import type { Metadata } from "next";
import { Inter } from "next/font/google"; // Google Fontu
import "./globals.css";
import Navbar from "@/components/NavBar"; // Yeni Navbar
import Footer from "@/components/Footer"; // Yeni Footer

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Türkiye Gezi Rehberi",
  description: "81 İlin Lezzet ve Gezi Haritası",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr">
      <body className={inter.className}>
        {/* En Üstte Navbar */}
        <Navbar />

        {/* Ortada Değişen Sayfa İçeriği */}
        {children}

        {/* En Altta Footer */}
        <Footer />
      </body>
    </html>
  );
}
