import type {
  Tour,
  Article,
  Slider,
  SiteConfig,
  Page,
  Tag,
  TourCategoryL1,
  TourCategoryL2,
  Location,
  StrapiResponse,
} from '@tour-seller/types';

const STRAPI_URL = process.env.STRAPI_URL || process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337';
const STRAPI_TOKEN = process.env.STRAPI_API_TOKEN;

export interface FetchOptions {
  locale?: string;
  populate?: string | string[] | Record<string, any>;
  filters?: Record<string, any>;
  sort?: string | string[];
  pagination?: { page?: number; pageSize?: number };
  fields?: string[];
  publicationState?: 'live' | 'preview';
  revalidate?: number | false;
}

function buildQueryString(params: Record<string, any>, prefix = ''): string[] {
  const parts: string[] = [];
  for (const [key, value] of Object.entries(params)) {
    if (value === undefined || value === null || value === '') continue;
    const fullKey = prefix ? `${prefix}[${key}]` : key;
    if (Array.isArray(value)) {
      value.forEach((val, idx) => {
        if (typeof val === 'object') {
          parts.push(...buildQueryString(val, `${fullKey}[${idx}]`));
        } else {
          parts.push(`${encodeURIComponent(`${fullKey}[${idx}]`)}=${encodeURIComponent(String(val))}`);
        }
      });
    } else if (typeof value === 'object') {
      parts.push(...buildQueryString(value, fullKey));
    } else {
      parts.push(`${encodeURIComponent(fullKey)}=${encodeURIComponent(String(value))}`);
    }
  }
  return parts;
}

export async function strapiFetch<T>(
  endpoint: string,
  options: FetchOptions = {}
): Promise<StrapiResponse<T>> {
  const {
    locale = 'vi',
    populate,
    filters,
    sort,
    pagination,
    fields,
    publicationState = 'live',
    revalidate = 300,
  } = options;

  const queryParams: Record<string, any> = {
    locale,
    publicationState,
  };

  if (populate) {
    if (typeof populate === 'string') {
      queryParams.populate = populate;
    } else if (Array.isArray(populate)) {
      queryParams.populate = populate.join(',');
    } else {
      queryParams.populate = populate;
    }
  }

  if (fields && fields.length > 0) {
    queryParams.fields = fields.join(',');
  }

  if (sort) {
    queryParams.sort = Array.isArray(sort) ? sort.join(',') : sort;
  }

  if (filters && Object.keys(filters).length > 0) {
    queryParams.filters = filters;
  }

  if (pagination) {
    queryParams.pagination = pagination;
  }

  const queryParts = buildQueryString(queryParams);
  const queryString = queryParts.length > 0 ? `?${queryParts.join('&')}` : '';
  const url = `${STRAPI_URL}/api/${endpoint}${queryString}`;

  try {
    const res = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        ...(STRAPI_TOKEN ? { Authorization: `Bearer ${STRAPI_TOKEN}` } : {}),
      },
      next: revalidate !== false ? { revalidate } : undefined,
      cache: revalidate === false ? 'no-store' : undefined,
    });

    if (!res.ok) {
      console.warn(`[Strapi Fetch Warning] ${endpoint}: ${res.status} ${res.statusText}`);
      return { data: [] as unknown as T };
    }

    const json = await res.json();
    if (
      (!json.data || (Array.isArray(json.data) && json.data.length === 0)) &&
      locale &&
      locale !== 'all'
    ) {
      delete queryParams.locale;
      const fallbackParts = buildQueryString(queryParams);
      const fallbackUrl = `${STRAPI_URL}/api/${endpoint}${
        fallbackParts.length > 0 ? `?${fallbackParts.join('&')}` : ''
      }`;
      const fallbackRes = await fetch(fallbackUrl, {
        headers: {
          'Content-Type': 'application/json',
          ...(STRAPI_TOKEN ? { Authorization: `Bearer ${STRAPI_TOKEN}` } : {}),
        },
        next: revalidate !== false ? { revalidate } : undefined,
      }).catch(() => null);

      if (fallbackRes && fallbackRes.ok) {
        return await fallbackRes.json();
      }
    }

    return json;
  } catch (err: any) {
    console.warn(`[Strapi Connection Error] Failed to fetch ${url}:`, err?.message || err);
    return { data: [] as unknown as T };
  }
}

// ==================== Dedicated Domain Helpers ====================

export async function getSliders(locale = 'vi'): Promise<Slider[]> {
  const res = await strapiFetch<Slider[]>('sliders', {
    locale,
    populate: '*',
    sort: 'order:asc',
  });
  return res?.data || [];
}

export async function getPopularTags(locale = 'vi'): Promise<Tag[]> {
  const res = await strapiFetch<Tag[]>('tags', {
    locale,
    populate: '*',
    filters: { isFeatured: { $eq: true } },
    pagination: { pageSize: 12 },
  });
  return res?.data || [];
}

export async function getTours(options: {
  locale?: string;
  kind?: 'domestic' | 'international' | 'hotel';
  categoryL1?: string | number;
  isFeatured?: boolean;
  minPrice?: number;
  maxPrice?: number;
  keyword?: string;
  sort?: string;
  page?: number;
  pageSize?: number;
} = {}): Promise<StrapiResponse<Tour[]>> {
  const {
    locale = 'vi',
    kind,
    categoryL1,
    isFeatured,
    minPrice,
    maxPrice,
    keyword,
    sort = 'createdAt:desc',
    page = 1,
    pageSize = 12,
  } = options;

  const filters: Record<string, any> = {};

  if (kind) {
    filters.kind = { $eq: kind };
  }
  if (isFeatured !== undefined) {
    filters.isFeatured = { $eq: isFeatured };
  }
  if (categoryL1) {
    filters.categoryL1 = { id: { $eq: categoryL1 } };
  }
  if (minPrice !== undefined) {
    filters.salePrice = { ...(filters.salePrice || {}), $gte: minPrice };
  }
  if (maxPrice !== undefined) {
    filters.salePrice = { ...(filters.salePrice || {}), $lte: maxPrice };
  }
  if (keyword) {
    filters.$or = [
      { name: { $containsi: keyword } },
      { summary: { $containsi: keyword } },
      { code: { $containsi: keyword } },
    ];
  }

  return await strapiFetch<Tour[]>('tours', {
    locale,
    filters,
    sort,
    populate: ['thumbnail', 'categoryL1', 'departures', 'tags'],
    pagination: { page, pageSize },
  });
}

export async function getTourBySlug(slug: string, locale = 'vi'): Promise<Tour | null> {
  const res = await strapiFetch<Tour[]>('tours', {
    locale,
    filters: { slug: { $eq: slug } },
    populate: {
      thumbnail: true,
      gallery: { populate: '*' },
      categoryL1: true,
      categoryL2: true,
      brand: true,
      specifications: true,
      departures: true,
      tags: true,
      seo: { populate: '*' },
    },
    pagination: { pageSize: 1 },
  });

  return res?.data?.[0] || null;
}

export async function getCategoriesL1(locale = 'vi'): Promise<TourCategoryL1[]> {
  const res = await strapiFetch<TourCategoryL1[]>('tour-categories-l1', {
    locale,
    populate: ['thumbnail', 'categoriesL2'],
    sort: 'name:asc',
    pagination: { pageSize: 50 },
  });
  return res?.data || [];
}

export async function getArticles(options: {
  locale?: string;
  kind?: string;
  isFeatured?: boolean;
  page?: number;
  pageSize?: number;
} = {}): Promise<StrapiResponse<Article[]>> {
  const { locale = 'vi', kind, isFeatured, page = 1, pageSize = 10 } = options;
  const filters: Record<string, any> = {};
  if (kind) filters.kind = { $eq: kind };
  if (isFeatured !== undefined) filters.isFeatured = { $eq: isFeatured };

  return await strapiFetch<Article[]>('articles', {
    locale,
    filters,
    populate: ['thumbnail', 'categoryL1', 'tags'],
    sort: 'publishedAt:desc',
    pagination: { page, pageSize },
  });
}

export async function getArticleBySlug(slug: string, locale = 'vi'): Promise<Article | null> {
  const res = await strapiFetch<Article[]>('articles', {
    locale,
    filters: { slug: { $eq: slug } },
    populate: ['thumbnail', 'categoryL1', 'categoryL2', 'tags', 'seo'],
    pagination: { pageSize: 1 },
  });
  return res?.data?.[0] || null;
}

export async function getSiteConfig(locale = 'vi'): Promise<SiteConfig | null> {
  const res = await strapiFetch<SiteConfig>('site-config', {
    locale,
    populate: ['logo', 'favicon', 'seo'],
  });
  return (res?.data as SiteConfig) || null;
}

export async function getPageByType(type: string, locale = 'vi'): Promise<Page | null> {
  const res = await strapiFetch<Page[]>('pages', {
    locale,
    filters: { type: { $eq: type } },
    populate: ['thumbnail', 'seo'],
    pagination: { pageSize: 1 },
  });
  return res?.data?.[0] || null;
}

export async function getLocations(type: 'city' | 'district' | 'ward', parentId?: number): Promise<Location[]> {
  const filters: Record<string, any> = { type: { $eq: type } };
  if (parentId) {
    filters.parent = { id: { $eq: parentId } };
  }
  const res = await strapiFetch<Location[]>('locations', {
    filters,
    sort: 'namevi:asc',
    pagination: { pageSize: 100 },
  });
  return res?.data || [];
}
