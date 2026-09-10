interface BreadcrumbItemProps {
  name: string;
  href: string;
}

export function BreadcrumbJsonLd({
  items,
  locale = 'vi',
}: {
  items: BreadcrumbItemProps[];
  locale?: string;
}) {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://nasatourist.com';

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `${baseUrl}/${locale}${item.href}`,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
