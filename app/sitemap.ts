import type { MetadataRoute } from "next";

import { absoluteUrl } from "@/lib/site";
import { getWebsiteProjects } from "@/lib/website-projects";

export const dynamic = "force-dynamic";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  // Core static routes with optimal SEO priority and frequency
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: absoluteUrl("/"),
      lastModified: now,
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: absoluteUrl("/services"),
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: absoluteUrl("/services/residential"),
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: absoluteUrl("/services/commercial"),
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: absoluteUrl("/services/architectural"),
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: absoluteUrl("/projects"),
      lastModified: now,
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: absoluteUrl("/about"),
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: absoluteUrl("/how-we-work"),
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: absoluteUrl("/contact"),
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: absoluteUrl("/privacy"),
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];

  // Dynamically include all published portfolio project pages
  try {
    const projects = await getWebsiteProjects({ includeDrafts: false });
    const projectRoutes: MetadataRoute.Sitemap = projects
      .filter((project) => project.slug && project.isPublished)
      .map((project) => ({
        url: absoluteUrl(`/projects/${encodeURIComponent(project.slug)}`),
        lastModified: now,
        changeFrequency: "weekly",
        priority: 0.8,
      }));

    return [...staticRoutes, ...projectRoutes];
  } catch (error) {
    console.error("Error generating dynamic project sitemap routes:", error);
    return staticRoutes;
  }
}
