import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const type = searchParams.get('type') || 'city'; // city | district | ward
  const parent = searchParams.get('parent');

  const strapiUrl = process.env.STRAPI_URL || process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337';
  let filterParam = `filters[type][$eq]=${type}`;
  if (parent) {
    filterParam += `&filters[parent][id][$eq]=${parent}`;
  }

  try {
    const res = await fetch(
      `${strapiUrl}/api/locations?${filterParam}&pagination[pageSize]=100&sort=namevi:asc`,
      {
        headers: process.env.STRAPI_API_TOKEN
          ? { Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}` }
          : {},
        next: { revalidate: 3600 },
      }
    );

    if (!res.ok) {
      return NextResponse.json([]);
    }
    const data = await res.json();
    return NextResponse.json(data?.data || []);
  } catch {
    return NextResponse.json([]);
  }
}
