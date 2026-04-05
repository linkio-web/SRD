import type { MetadataRoute } from 'next'
import { allPages } from '@/lib/seo'

export default function sitemap(): MetadataRoute.Sitemap {
  return allPages().map(({ url, route }) => ({
    url,
    lastModified: new Date(),
    changeFrequency: route === '' ? 'weekly' : 'monthly',
    priority: route === '' ? 1.0 : route === '/services' ? 0.9 : 0.7,
  }))
}
