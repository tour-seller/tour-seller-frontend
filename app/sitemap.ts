import { MetadataRoute } from 'next';
import { getTours, getArticles } from '@/lib/strapi';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://nasatourist.com';
  const locales = ['vi', 'en'];

  // Static routes
  const staticPaths = ['', '/tours', '/hotels', '/news', '/about', '/contact', '/payment-info'];
  const sitemapEntries: MetadataRoute.Sitemap = [];

  locales.forEach((locale) => {
    staticPaths.forEach((path) => {
      sitemapEntries.push({
        url: `${baseUrl}/${locale}${path}`,
        lastModified: new Date(),
        changeFrequency: path === '' ? 'daily' : 'weekly',
        priority: path === '' ? 1.0 : 0.8,
      });
    });
  });

  // Dynamic tours
  try {
    const toursRes = await getTours({ pageSize: 100 });
    const tours = toursRes?.data || [];
    tours.forEach((tour) => {
      locales.forEach((locale) => {
        sitemapEntries.push({
          url: `${baseUrl}/${locale}/tours/${tour.slug}`,
          lastModified: new Date(tour.updatedAt || new Date()),
          changeFrequency: 'weekly',
          priority: 0.9,
        });
      });
    });
  } catch {}

  // Dynamic articles
  try {
    const articlesRes = await getArticles({ pageSize: 100 });
    const articles = articlesRes?.data || [];
    articles.forEach((art) => {
      locales.forEach((locale) => {
        sitemapEntries.push({
          url: `${baseUrl}/${locale}/news/${art.slug}`,
          lastModified: new Date(art.updatedAt || new Date()),
          changeFrequency: 'monthly',
          priority: 0.7,
        });
      });
    });
  } catch {}

  return sitemapEntries;
}
