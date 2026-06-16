import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { getConfig } from "@/lib/queries";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export async function generateMetadata(): Promise<Metadata> {
  const config = await getConfig();
  return {
    title: config?.seo_defaut?.titre ?? "Le Batchcooking d'Emma",
    description: config?.seo_defaut?.description ?? undefined,
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const config = await getConfig();

  return (
    <html
      lang="fr"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        {config?.banniere_active && config.banniere_message && (
          <div className="bg-brand px-4 py-2 text-center text-sm font-medium text-brand-foreground">
            {config.banniere_message}
          </div>
        )}
        <SiteHeader config={config} />
        <main className="flex-1">{children}</main>
        <SiteFooter config={config} />
      </body>
    </html>
  );
}
