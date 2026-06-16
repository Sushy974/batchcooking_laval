import type { Metadata } from "next";
import { Inter, PT_Serif } from "next/font/google";

import { EmmaChatbot } from "@/components/emma-chatbot";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { getConfig } from "@/lib/queries";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const ptSerif = PT_Serif({
  variable: "--font-pt-serif",
  subsets: ["latin"],
  weight: ["400", "700"],
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

  // Données structurées Schema.org : important pour un service LOCAL (SEO).
  const jsonLd = config
    ? {
        "@context": "https://schema.org",
        "@type": "LocalBusiness",
        name: config.nom_societe,
        telephone: config.telephone,
        email: config.email,
        description: config.seo_defaut?.description,
        areaServed: config.communes_couvertes,
      }
    : null;

  return (
    <html
      lang="fr"
      className={`${inter.variable} ${ptSerif.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col font-body">
        {jsonLd && (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
          />
        )}
        {config?.banniere_active && config.banniere_message && (
          <div className="bg-primary px-4 py-2 text-center text-sm font-medium text-primary-foreground">
            {config.banniere_message}
          </div>
        )}
        <SiteHeader config={config} />
        <main className="flex-1">{children}</main>
        <SiteFooter config={config} />
        <EmmaChatbot />
      </body>
    </html>
  );
}
