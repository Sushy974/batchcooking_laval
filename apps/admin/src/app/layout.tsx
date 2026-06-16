import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { UseCasesProvider } from "@batchcooking/core/client";
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
  title: "Admin — Le Batchcooking d'Emma",
  description: "Back-office de gestion",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="fr"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        {/* Injection de dépendances côté client (équivalent Provider Flutter). */}
        <UseCasesProvider>{children}</UseCasesProvider>
      </body>
    </html>
  );
}
