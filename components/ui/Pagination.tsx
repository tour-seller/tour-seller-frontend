'use client';

import { Link } from '@/i18n/routing';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PaginationProps {
  current: number;
  total: number;
  baseUrl: string;
  queryParams?: Record<string, string | number | undefined>;
}

export function Pagination({
  current,
  total,
  baseUrl,
  queryParams = {},
}: PaginationProps) {
  if (total <= 1) return null;

  const buildUrl = (page: number) => {
    const params = new URLSearchParams();
    Object.entries(queryParams).forEach(([key, val]) => {
      if (val !== undefined && val !== '' && key !== 'page') {
        params.set(key, String(val));
      }
    });
    if (page > 1) {
      params.set('page', String(page));
    }
    const qs = params.toString();
    return `${baseUrl}${qs ? `?${qs}` : ''}`;
  };

  const pages: number[] = [];
  const start = Math.max(1, current - 2);
  const end = Math.min(total, current + 2);
  for (let i = start; i <= end; i++) {
    pages.push(i);
  }

  return (
    <nav aria-label="Pagination" className="flex items-center justify-center gap-1.5 py-8">
      {/* Prev */}
      {current > 1 && (
        <Link
          href={buildUrl(current - 1) as any}
          className="p-2 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition-colors"
          title="Trang trước"
        >
          <ChevronLeft className="h-4 w-4" />
        </Link>
      )}

      {/* Page Numbers */}
      {start > 1 && (
        <>
          <Link
            href={buildUrl(1) as any}
            className="w-9 h-9 flex items-center justify-center rounded-lg border border-slate-200 text-xs font-semibold hover:bg-slate-100"
          >
            1
          </Link>
          {start > 2 && <span className="px-1 text-slate-400">...</span>}
        </>
      )}

      {pages.map((p) => (
        <Link
          key={p}
          href={buildUrl(p) as any}
          className={`w-9 h-9 flex items-center justify-center rounded-lg text-xs font-semibold transition-colors ${
            p === current
              ? 'bg-primary text-white shadow-md'
              : 'border border-slate-200 text-slate-700 hover:bg-slate-100'
          }`}
        >
          {p}
        </Link>
      ))}

      {end < total && (
        <>
          {end < total - 1 && <span className="px-1 text-slate-400">...</span>}
          <Link
            href={buildUrl(total) as any}
            className="w-9 h-9 flex items-center justify-center rounded-lg border border-slate-200 text-xs font-semibold hover:bg-slate-100"
          >
            {total}
          </Link>
        </>
      )}

      {/* Next */}
      {current < total && (
        <Link
          href={buildUrl(current + 1) as any}
          className="p-2 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition-colors"
          title="Trang sau"
        >
          <ChevronRight className="h-4 w-4" />
        </Link>
      )}
    </nav>
  );
}
