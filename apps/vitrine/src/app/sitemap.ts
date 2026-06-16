import type { MetadataRoute } from "next";

import { getFormulesDisponibles, getPlatsDisponibles } from "@/lib/queries";

const BASE = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

const STATIC_ROUTES = [
  "",
  "/plats",
  "/formules",
  "/comment-ca-marche",
  "/a-propos",
  "/faq",
  "/contact",
  "/mentions-legales",
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // On dégrade proprement si la source de données est indisponible (build sans clés).
  let plats: { slug: string }[] = [];
  let formules: { slug: string }[] = [];
  try {
    [plats, formules] = await Promise.all([
      getPlatsDisponibles(),
      getFormulesDisponibles(),
    ]);
  } catch (error) {
    console.error("sitemap : données indisponibles", error);
  }

  return [
    ...STATIC_ROUTES.map((route) => ({
      url: `${BASE}${route}`,
      changeFrequency: "weekly" as const,
    })),
    ...plats.map((p) => ({ url: `${BASE}/plats/${p.slug}` })),
    ...formules.map((f) => ({ url: `${BASE}/formules/${f.slug}` })),
  ];
}
