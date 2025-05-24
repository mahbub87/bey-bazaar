import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer"
import React from "react";
import { CurrencyProvider } from "./contexts/CurrencyContext";
import { CartProvider } from "./contexts/CartContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: {
    default: "Beybazaar | Online Marketplace",
    template: "%s | Beybazaar",
  },
  description: "Beybazaar is your one-stop shop for midfake BeyBlades.",
  keywords: ["Metal", "BeyBlade", "beybazaar", "marketplace", "fashion", "electronics"],
  metadataBase: new URL("https://bey-bazaar.vercel.app"),
  openGraph: {
    title: "Beybazaar | Online Marketplace",
    description: "Beybazaar is your one-stop shop for premium products across all categories.",
    url: "https://bey-bazaar.vercel.app",
    siteName: "Beybazaar",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Beybazaar store front",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Beybazaar | Online Marketplace",
    description: "Beybazaar is your one-stop shop for premium products across all categories.",
    images: ["/og-image.jpg"],
  },
  authors: [{ name: "Mahbub Shafin", url: "https://bey-bazaar.vercel.app" }],
};


export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} pt-20`}
      > <CurrencyProvider>
        <CartProvider>
           <Navbar />
       
          {children}

        <Footer/>
        
        </CartProvider>
       </CurrencyProvider>
      </body>
    </html>
  );
}
