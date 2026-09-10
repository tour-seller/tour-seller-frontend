'use client';

import { useState } from 'react';
import { Link } from '@/i18n/routing';
import { TourCard } from '@/components/tour/TourCard';
import { ArrowRight, MapPin } from 'lucide-react';
import type { Tour, TourCategoryL1 } from '@tour-seller/types';

interface DomesticToursSectionProps {
  tours: Tour[];
  categories?: TourCategoryL1[];
  slogan?: string;
  locale?: string;
}

export function DomesticToursSection({
  tours,
  categories = [],
  slogan = 'Khám phá dải đất hình chữ S với cảnh quan kỳ vĩ và ẩm thực phong phú',
  locale = 'vi',
}: DomesticToursSectionProps) {
  const [selectedCatId, setSelectedCatId] = useState<number | 'all'>('all');

  const filtered = tours.filter((t) => {
    if (selectedCatId === 'all') return true;
    return t.categoryL1?.id === selectedCatId;
  });

  return (
    <section className="bg-sky-50/70 py-16 md:py-24 border-y border-sky-100">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-5 mb-10">
          <div>
            <div className="inline-flex items-center gap-1.5 text-brand-ocean text-xs font-bold uppercase tracking-wider mb-2 bg-white border border-sky-100 px-3.5 py-1 rounded-full shadow-sm">
              <MapPin className="h-3.5 w-3.5" />
              <span>Khám Phá Dải Đất Hình Chữ S</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-extrabold text-brand-deep tracking-tight">
              Tour Du Lịch Trong Nước
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1.5 max-w-xl font-medium">{slogan}</p>
          </div>

          {/* Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none self-start md:self-auto text-xs font-bold">
            <button
              onClick={() => setSelectedCatId('all')}
                className={`px-4 py-2 rounded-full transition-all duration-700 ease-fluid whitespace-nowrap ${
                selectedCatId === 'all'
                  ? 'bg-brand-ocean text-white shadow-[0_8px_18px_-10px_rgba(23,107,135,0.8)]'
                  : 'bg-white text-slate-600 hover:text-brand-ocean hover:border-brand-blue/30 border border-sky-100 shadow-sm'
              }`}
            >
              Tất cả điểm đến
            </button>
            {categories.map((c) => (
              <button
                key={c.id}
                onClick={() => setSelectedCatId(c.id)}
                className={`px-4 py-2 rounded-full transition-all duration-700 ease-fluid whitespace-nowrap ${
                  selectedCatId === c.id
                  ? 'bg-brand-ocean text-white shadow-[0_8px_18px_-10px_rgba(23,107,135,0.8)]'
                  : 'bg-white text-slate-600 hover:text-brand-ocean hover:border-brand-blue/30 border border-sky-100 shadow-sm'
                }`}
              >
                {c.name}
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
            Hiện chưa có chương trình tour trong danh mục này.
          </div>
        )}

        {/* Action Link */}
        <div className="text-center mt-12">
          <Link
            href="/tours?kind=domestic"
            className="inline-flex items-center gap-2.5 bg-brand-deep hover:bg-brand-ocean text-white font-extrabold text-xs sm:text-sm px-8 py-3.5 rounded-full transition-all duration-700 ease-fluid shadow-md hover:shadow-xl hover:-translate-y-0.5 group"
          >
            <span>Xem tất cả tour nội địa</span>
            <ArrowRight className="h-4 w-4 text-primary group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
}
