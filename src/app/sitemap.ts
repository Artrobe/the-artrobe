import type { MetadataRoute } from 'next';
import fs from 'fs';
import path from 'path';
import { artworks } from '@/data/artworks';

const baseUrl = 'https://theartrobe.in';

function getJournalSlugs(): string[] {
  const dir = path.join(process.cwd(), 'content/journal');
  return fs
    .readdirSync(dir)
    .filter((file) => file.endsWith('.md'))
    .map((file) => file.replace(/\.md$/, ''));
}

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = ['', '/about', '/contact', '/gallery', '/journal', '/workshop'].map(
    (route) => ({
      url: `${baseUrl}${route}`,
      lastModified: new Date(),
    })
  );

  const galleryRoutes = artworks.map((artwork) => ({
    url: `${baseUrl}/gallery/${artwork.id}`,
    lastModified: new Date(),
  }));

  const journalRoutes = getJournalSlugs().map((slug) => ({
    url: `${baseUrl}/journal/${slug}`,
    lastModified: new Date(),
  }));

  return [...staticRoutes, ...galleryRoutes, ...journalRoutes];
}
