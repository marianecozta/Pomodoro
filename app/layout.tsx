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
  title: "POMODORO 🍅",
  description: "Aplicativo Pomodoro para estudar de maneira eficiente",
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    title: "POMODORO 🍅",
    description: "Organize suas sessões de estudo com o método Pomodoro.",
    url: "https://pomodorouniversitario.vercel.app",
    siteName: "POMODORO 🍅",
    images: [
      {
        url: "/favicon2.png",
        width: 1200,
        height: 630,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "POMODORO 🍅",
    description: "Organize suas sessões de estudo com o método Pomodoro.",
    images: ["/favicon2.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <head>
        <link rel="icon" href="/favicon.ico" />
        {/* Open Graph */}
        <meta property="og:title" content="POMODORO 🍅" />
        <meta property="og:description" content="Organize suas sessões de estudo com o método Pomodoro." />
        <meta property="og:url" content="https://pomodorouniversitario.vercel.app" />
        <meta property="og:image" content="/favicon2.png" />
        <meta property="og:site_name" content="POMODORO 🍅" />
        
        {/* Twitter Card */}
        <meta name="twitter:title" content="POMODORO 🍅" />
        <meta name="twitter:description" content="Organize suas sessões de estudo com o método Pomodoro." />
        <meta name="twitter:image" content="/favicon2.png" />
        <meta name="twitter:card" content="summary_large_image" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
