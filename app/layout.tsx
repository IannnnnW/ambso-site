import type { Metadata } from "next";
import { Poppins, Lato, Geist_Mono } from "next/font/google";
import "./globals.css";
import ConditionalLayout from '@/components/layout/ConditionalLayout';
import HeaderServer from '@/components/layout/HeaderServer';
import FooterServer from '@/components/layout/FooterServer';

// Headings — geometric, confident
const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

// Body — humanist, readable in long-form text
const lato = Lato({
  variable: "--font-lato",
  subsets: ["latin"],
  weight: ["300", "400", "700", "900"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AMBSO",
  description: "African Medical and Behavioral Sciences Organization (AMBSO) is dedicated to advancing health through clinical trials, community programs, capacity building, and innovative research.",
  keywords: ["AMBSO", "health research", "clinical trials", "community health", "Uganda", "Africa", "medical research"],
  icons: {
    icon: [
      { url: '/icon.png', type: 'image/png' },
    ],
    apple: '/apple-icon.png',
    shortcut: '/icon.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${poppins.variable} ${lato.variable} ${geistMono.variable} antialiased`}
        suppressHydrationWarning>
        <ConditionalLayout header={<HeaderServer />} footer={<FooterServer />}>
          {children}
        </ConditionalLayout>
      </body>
    </html>
  );
}
