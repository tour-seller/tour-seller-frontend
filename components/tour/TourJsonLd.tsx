import type { Tour } from '@tour-seller/types';
import { getStrapiMediaUrl } from '@/lib/utils';

export function TourJsonLd({ tour, locale = 'vi' }: { tour: Tour; locale?: string }) {
  const imageUrl = getStrapiMediaUrl(tour.thumbnail?.url);
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://nasatourist.com';

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'TouristTrip',
    name: tour.name,
    description: tour.summary || tour.name,
    image: imageUrl,
    offers: {
      '@type': 'Offer',
      price: tour.salePrice || tour.regularPrice || 0,
      priceCurrency: 'VND',
      availability: 'https://schema.org/InStock',
      url: `${baseUrl}/${locale}/tours/${tour.slug}`,
    },
    Type: tour.kind === 'international' ? 'International' : 'Domestic',
    itinerary: {
      '@type': 'ItemList',
      numberOfItems: 1,
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          item: {
            '@type': 'TouristAttraction',
            name: tour.name,
            description: tour.summary,
          },
        },
      ],
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
