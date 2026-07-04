import type { MetadataRoute } from "next";

import { services } from "@/lib/services";
import { siteConfig } from "@/lib/site";

const staticRoutes = [
  "/",
  "/about",
  "/services",
  "/contact",
  "/privacy-policy",
  "/terms",
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return [
    ...staticRoutes.map((route) => {
      const changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"] =
        route === "/" ? "weekly" : "monthly";

      return {
        url: new URL(route, siteConfig.url).toString(),
        lastModified: now,
        changeFrequency,
        priority: route === "/" ? 1 : 0.8,
      };
    }),
    ...services.map((service) => {
      const changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"] =
        "monthly";

      return {
        url: new URL(`/services/${service.slug}`, siteConfig.url).toString(),
        lastModified: now,
        changeFrequency,
        priority: 0.75,
      };
    }),
  ];
}