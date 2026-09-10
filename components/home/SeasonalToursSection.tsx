'use client';

import { useState } from 'react';
import { Link } from '@/i18n/routing';
import { TourCard } from '@/components/tour/TourCard';
import { ArrowRight, Sparkles } from 'lucide-react';
import type { Tour } from '@tour-seller/types';

interface SeasonalToursSectionProps {
  tours: Tour[];
  slogan?: string;
  locale?: string;
}

export function SeasonalToursSection({
  tours,
  slogan = 'Trải nghiệm những hành trình mùa đẹp nhất trong năm cùng Nasatourist',
  locale = 'vi',
}: SeasonalToursSectionProps) {
  const [activeTab, setActiveTab] = useState<'all' | 'domestic' | 'international'>('all');

  const filteredTours = tours.filter((t) => {
    if (activeTab === 'all') return true;
    return t.kind === activeTab;
  });

  return (
    <section className="container mx-auto px-4 py-14 md:py-20">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-5 mb-10">
        <div>
          <div className="inline-flex items-center gap-1.5 text-brand-ocean text-xs font-bold uppercase tracking-wider mb-2 bg-sky-50 border border-sky-100 px-3.5 py-1 rounded-full shadow-sm">
            <Sparkles className="h-3.5 w-3.5" />
            <span>Ưu Đãi Theo Mùa</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-extrabold text-brand-deep tracking-tight">
            Tour Du Lịch Theo Mùa
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1.5 max-w-xl font-medium">
            {slogan}
          </p>
        </div>

        {/* Tab Buttons */}
        <div className="flex items-center gap-1 bg-sky-50 p-1.5 rounded-full self-start md:self-auto text-xs font-bold border border-sky-100 shadow-inner">
          <button
            onClick={() => setActiveTab('all')}
            className={`px-5 py-2 rounded-full transition-all duration-700 ease-fluid ${
              activeTab === 'all'
                ? 'bg-brand-ocean text-white shadow-[0_8px_18px_-10px_rgba(23,107,135,0.8)]'
                : 'text-slate-600 hover:text-brand-ocean'
            }`}
          >
            Tất cả
          </button>
          <button
            onClick={() => setActiveTab('domestic')}
            className={`px-5 py-2 rounded-full transition-all duration-700 ease-fluid ${
              activeTab === 'domestic'
                ? 'bg-brand-ocean text-white shadow-[0_8px_18px_-10px_rgba(23,107,135,0.8)]'
                : 'text-slate-600 hover:text-brand-ocean'
            }`}
          >
            Tour nội địa
          </button>
          <button
            onClick={() => setActiveTab('international')}
            className={`px-5 py-2 rounded-full transition-all duration-700 ease-fluid ${
              activeTab === 'international'
                ? 'bg-brand-ocean text-white shadow-[0_8px_18px_-10px_rgba(23,107,135,0.8)]'
                : 'text-slate-600 hover:text-brand-ocean'
            }`}
          >
            Tour quốc tế
          </button>
        </div>
      </div>

      {/* Tours Grid */}
      {filteredTours.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-7">
          {filteredTours.slice(0, 8).map((tour) => (
            <TourCard key={tour.id} tour={tour} locale={locale} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-white rounded-3xl ring-1 ring-sky-100 text-slate-400 text-sm shadow-sm">
          Chưa có chương trình tour theo mùa cho mục này.
        </div>
      )}

      {/* View more button */}
      <div className="text-center mt-12">
        <Link
          href="/tours"
          className="inline-flex items-center gap-2.5 bg-white hover:bg-brand-deep text-brand-deep hover:text-white font-extrabold text-xs sm:text-sm px-8 py-3.5 rounded-full ring-1 ring-sky-200 hover:ring-brand-deep transition-all duration-700 ease-fluid shadow-sm hover:shadow-lg group"
        >
          <span>Xem tất cả chương trình tour</span>
          <ArrowRight className="h-4 w-4 text-primary group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </section>
  );
}
