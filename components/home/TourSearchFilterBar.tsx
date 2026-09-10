'use client';

import { useState } from 'react';
import { useRouter } from '@/i18n/routing';
import { useTranslations } from 'next-intl';
import { Search, MapPin, Calendar, DollarSign } from 'lucide-react';
import type { TourCategoryL1 } from '@tour-seller/types';

interface TourSearchFilterBarProps {
  categories?: TourCategoryL1[];
}

export function TourSearchFilterBar({ categories = [] }: TourSearchFilterBarProps) {
  const t = useTranslations('home');
  const router = useRouter();

  const [tourType, setTourType] = useState<'domestic' | 'international'>('domestic');
  const [destination, setDestination] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [priceRange, setPriceRange] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    params.set('kind', tourType);
    if (destination) params.set('category', destination);
    if (startDate) params.set('fromDate', startDate);
    if (endDate) params.set('toDate', endDate);
    if (priceRange) params.set('price', priceRange);

    router.push(`/tours?${params.toString()}`);
  };

  return (
    <section className="container mx-auto px-4 -mt-10 sm:-mt-14 md:-mt-16 relative z-20">
      <div className="bg-white rounded-3xl p-6 sm:p-7 md:p-8 shadow-[0_20px_60px_-15px_rgba(23,107,135,0.18)] ring-1 ring-sky-100 max-w-6xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-brand-coral inline-block animate-pulse shadow-[0_0_0_5px_rgba(242,120,92,0.12)]"></span>
              <h2 className="text-lg md:text-xl font-display font-extrabold text-brand-navy tracking-tight">
                {t('searchTourTitle')}
              </h2>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Hơn 500+ hành trình khởi hành đều đặn mỗi tuần với giá tốt nhất
            </p>
          </div>

          {/* Pill Selector: Nội địa vs Quốc tế */}
          <div className="inline-flex items-center bg-sky-50 p-1.5 rounded-full border border-sky-100 self-start sm:self-auto">
            <button
              type="button"
              onClick={() => setTourType('domestic')}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold transition-all duration-700 ease-fluid ${
                tourType === 'domestic'
                  ? 'bg-brand-ocean text-white shadow-[0_8px_18px_-10px_rgba(23,107,135,0.8)]'
                  : 'text-slate-600 hover:text-brand-ocean'
              }`}
            >
              <MapPin className="h-3.5 w-3.5" />
              <span>{t('domesticTourRadio')}</span>
            </button>

            <button
              type="button"
              onClick={() => setTourType('international')}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold transition-all duration-700 ease-fluid ${
                tourType === 'international'
                  ? 'bg-brand-ocean text-white shadow-[0_8px_18px_-10px_rgba(23,107,135,0.8)]'
                  : 'text-slate-600 hover:text-brand-ocean'
              }`}
            >
              <span className="text-sm">✈️</span>
              <span>{t('internationalTourRadio')}</span>
            </button>
          </div>
        </div>

        {/* Inputs Form */}
        <form onSubmit={handleSearch} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {/* Điểm đến */}
          <div className="space-y-1.5">
            <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
              {t('selectDestination')}
            </label>
            <div className="relative group">
              <MapPin className="h-4 w-4 text-primary absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none group-focus-within:scale-110 transition-transform" />
              <select
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                className="w-full bg-sky-50/70 border border-sky-100 text-xs rounded-2xl pl-10 pr-4 py-3 text-slate-700 font-semibold focus:outline-none focus:border-brand-ocean focus:ring-2 focus:ring-brand-ocean/20 focus:bg-white transition-all duration-700 ease-fluid appearance-none cursor-pointer shadow-sm"
              >
                <option value="">Tất cả điểm đến</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Khởi hành từ */}
          <div className="space-y-1.5">
            <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
              {t('departureFromDate')}
            </label>
            <div className="relative group">
              <Calendar className="h-4 w-4 text-primary absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none group-focus-within:scale-110 transition-transform" />
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="w-full bg-sky-50/70 border border-sky-100 text-xs rounded-2xl pl-10 pr-3 py-2.5 text-slate-700 font-semibold focus:outline-none focus:border-brand-ocean focus:ring-2 focus:ring-brand-ocean/20 focus:bg-white transition-all duration-700 ease-fluid cursor-pointer shadow-sm"
              />
            </div>
          </div>

          {/* Đến ngày */}
          <div className="space-y-1.5">
            <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
              {t('departureToDate')}
            </label>
            <div className="relative group">
              <Calendar className="h-4 w-4 text-primary absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none group-focus-within:scale-110 transition-transform" />
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="w-full bg-slate-50/90 border border-slate-200/90 text-xs rounded-2xl pl-10 pr-3 py-2.5 text-slate-700 font-semibold focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 focus:bg-white transition-all cursor-pointer shadow-sm"
              />
            </div>
          </div>

          {/* Khoảng giá */}
          <div className="space-y-1.5">
            <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
              {t('priceRange')}
            </label>
            <div className="relative group">
              <DollarSign className="h-4 w-4 text-primary absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none group-focus-within:scale-110 transition-transform" />
              <select
                value={priceRange}
                onChange={(e) => setPriceRange(e.target.value)}
                className="w-full bg-sky-50/70 border border-sky-100 text-xs rounded-2xl pl-10 pr-4 py-3 text-slate-700 font-semibold focus:outline-none focus:border-brand-ocean focus:ring-2 focus:ring-brand-ocean/20 focus:bg-white transition-all duration-700 ease-fluid appearance-none cursor-pointer shadow-sm"
              >
                <option value="">{t('selectPriceRange')}</option>
                <option value="0-2000000">Dưới 2.000.000đ</option>
                <option value="2000000-5000000">Từ 2.000.000đ - 5.000.000đ</option>
                <option value="5000000-10000000">Từ 5.000.000đ - 10.000.000đ</option>
                <option value="10000000-999999999">Trên 10.000.000đ</option>
              </select>
            </div>
          </div>

          {/* Nút tìm kiếm */}
          <div className="flex items-end">
            <button
              type="submit"
              className="w-full h-[46px] bg-brand-coral hover:bg-brand-orange text-white font-extrabold rounded-2xl text-xs flex items-center justify-center gap-2 shadow-[0_10px_22px_-10px_rgba(242,120,92,0.85)] transition-all duration-700 ease-fluid hover:-translate-y-0.5 active:scale-[0.98]"
            >
              <Search className="h-4 w-4" />
              <span>{t('searchButton')}</span>
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
