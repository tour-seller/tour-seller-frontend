'use client';

import { useState } from 'react';
import { Link } from '@/i18n/routing';
import { TourCard } from '@/components/tour/TourCard';
import { ArrowRight, Globe } from 'lucide-react';
import type { Tour } from '@tour-seller/types';

interface InternationalToursSectionProps {
  tours: Tour[];
  slogan?: string;
  locale?: string;
}

export function InternationalToursSection({
  tours,
  slogan = 'Chạm ngõ thế giới với những hành trình ấn tượng và trải nghiệm văn hóa đa dạng',
  locale = 'vi',
}: InternationalToursSectionProps) {
  const [activeRegion, setActiveRegion] = useState<string>('all');

  const regions = [
    { key: 'all', name: 'Tất cả' },
    { key: 'asia', name: 'Châu Á (Thái, Sing, Hàn, Nhật)' },
    { key: 'europe', name: 'Châu Âu' },
    { key: 'australia', name: 'Châu Úc' },
  ];

  const filtered = tours.filter((t) => {
    if (activeRegion === 'all') return true;
    if (activeRegion === 'asia') {
      return (
        t.name.toLowerCase().includes('thái') ||
        t.name.toLowerCase().includes('singapore') ||
        t.name.toLowerCase().includes('hàn') ||
        t.name.toLowerCase().includes('nhật') ||
        t.name.toLowerCase().includes('đài')
      );
    }
    if (activeRegion === 'europe') {
      return t.name.toLowerCase().includes('âu') || t.name.toLowerCase().includes('pháp');
    }
    if (activeRegion === 'australia') {
      return t.name.toLowerCase().includes('úc') || t.name.toLowerCase().includes('zealand');
    }
    return true;
  });

  return (
    <section className="container mx-auto px-4 py-14 md:py-20">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-5 mb-10">
        <div>
          <div className="inline-flex items-center gap-1.5 text-brand-ocean text-xs font-bold uppercase tracking-wider mb-2 bg-sky-50 border border-sky-100 px-3.5 py-1 rounded-full shadow-sm">
            <Globe className="h-3.5 w-3.5 text-brand-ocean" />
            <span>Chạm Ngõ Thế Giới</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-extrabold text-brand-deep tracking-tight">
            Tour Du Lịch Nước Ngoài
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1.5 max-w-xl font-medium">{slogan}</p>
        </div>

        {/* Region Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none self-start md:self-auto text-xs font-bold bg-sky-50 p-1.5 rounded-full border border-sky-100 shadow-inner">
          {regions.map((r) => (
            <button
              key={r.key}
              onClick={() => setActiveRegion(r.key)}
              className={`px-4 py-2 rounded-full transition-all duration-700 ease-fluid whitespace-nowrap ${
                activeRegion === r.key
                  ? 'bg-brand-ocean text-white shadow-[0_8px_18px_-10px_rgba(23,107,135,0.8)]'
                  : 'text-slate-600 hover:text-brand-ocean hover:bg-white/70'
              }`}
            >
              {r.name}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-7">
          {filtered.slice(0, 8).map((tour) => (
            <TourCard key={tour.id} tour={tour} locale={locale} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-white rounded-3xl ring-1 ring-sky-100 text-slate-400 text-sm shadow-sm">
          Đang cập nhật thêm các tour du lịch quốc tế cho khu vực này.
        </div>
      )}

      {/* Action Link */}
      <div className="text-center mt-12">
        <Link
          href="/tours?kind=international"
          className="inline-flex items-center gap-2.5 bg-white hover:bg-brand-deep text-brand-deep hover:text-white font-extrabold text-xs sm:text-sm px-8 py-3.5 rounded-full ring-1 ring-sky-200 hover:ring-brand-deep transition-all duration-700 ease-fluid shadow-sm hover:shadow-lg group"
        >
          <span>Xem tất cả tour quốc tế</span>
          <ArrowRight className="h-4 w-4 text-primary group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </section>
  );
}
