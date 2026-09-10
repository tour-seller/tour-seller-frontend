'use client';

import { useState } from 'react';
import { useRouter } from '@/i18n/routing';
import { Search, Calendar, MapPin, DollarSign, Filter, Globe, RotateCcw } from 'lucide-react';
import type { TourCategoryL1 } from '@tour-seller/types';

interface TourListFilterBarProps {
  categories?: TourCategoryL1[];
  initialKind?: string;
  initialCategory?: string;
  initialPrice?: string;
  initialKeyword?: string;
}

export function TourListFilterBar({
  categories = [],
  initialKind = 'domestic',
  initialCategory = '',
  initialPrice = '',
  initialKeyword = '',
}: TourListFilterBarProps) {
  const router = useRouter();
  const [kind, setKind] = useState(initialKind);
  const [category, setCategory] = useState(initialCategory);
  const [price, setPrice] = useState(initialPrice);
  const [keyword, setKeyword] = useState(initialKeyword);
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');

  const handleFilter = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (kind) params.set('kind', kind);
    if (category) params.set('category', category);
    if (price) params.set('price', price);
    if (keyword) params.set('keyword', keyword);
    if (fromDate) params.set('fromDate', fromDate);
    if (toDate) params.set('toDate', toDate);

    router.push(`/tours?${params.toString()}`);
  };

  const handleReset = () => {
    setCategory('');
    setPrice('');
    setKeyword('');
    setFromDate('');
    setToDate('');
    router.push(`/tours?kind=${kind}`);
  };

  const hasActiveFilters = Boolean(category || price || keyword || fromDate || toDate);

  return (
    <form
      onSubmit={handleFilter}
      className="bg-white rounded-3xl p-5 md:p-7 shadow-soft border border-slate-200/80 mb-10 space-y-5"
    >
      {/* Segmented Kind Switcher (Pill Switcher) */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-100">
        <div className="inline-flex p-1.5 rounded-2xl bg-slate-100/90 border border-slate-200/60">
          <button
            type="button"
            onClick={() => setKind('domestic')}
            className={`flex items-center gap-2 px-5 py-2 rounded-xl text-xs md:text-sm font-bold transition-all ${
              kind === 'domestic'
                ? 'bg-white text-primary shadow-sm shadow-black/5'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <MapPin className="h-4 w-4 text-primary" />
            <span>Tour Du Lịch Nội Địa</span>
          </button>

          <button
            type="button"
            onClick={() => setKind('international')}
            className={`flex items-center gap-2 px-5 py-2 rounded-xl text-xs md:text-sm font-bold transition-all ${
              kind === 'international'
                ? 'bg-white text-primary shadow-sm shadow-black/5'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Globe className="h-4 w-4 text-sky-500" />
            <span>Tour Du Lịch Quốc Tế</span>
          </button>
        </div>

        {hasActiveFilters && (
          <button
            type="button"
            onClick={handleReset}
            className="inline-flex items-center gap-1.5 text-xs text-slate-500 hover:text-primary transition-colors font-semibold"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            <span>Xóa bộ lọc</span>
          </button>
        )}
      </div>

      {/* Inputs grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5">
        {/* Destination / Category */}
        <div>
          <label className="text-xs font-bold text-slate-700 mb-1.5 flex items-center gap-1.5">
            <MapPin className="h-3.5 w-3.5 text-primary" />
            <span>Điểm đến</span>
          </label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200/90 text-xs font-medium rounded-xl px-3.5 py-2.5 text-slate-800 focus:outline-none focus:border-primary focus:bg-white focus:ring-2 focus:ring-primary/10 transition-all cursor-pointer"
          >
            <option value="">Tất cả điểm đến</option>
            {categories.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
        </div>

        {/* Departure from */}
        <div>
          <label className="text-xs font-bold text-slate-700 mb-1.5 flex items-center gap-1.5">
            <Calendar className="h-3.5 w-3.5 text-primary" />
            <span>Khởi hành từ ngày</span>
          </label>
          <input
            type="date"
            value={fromDate}
            onChange={(e) => setFromDate(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200/90 text-xs font-medium rounded-xl px-3.5 py-2.5 text-slate-800 focus:outline-none focus:border-primary focus:bg-white focus:ring-2 focus:ring-primary/10 transition-all cursor-pointer"
          />
        </div>

        {/* Departure to */}
        <div>
          <label className="text-xs font-bold text-slate-700 mb-1.5 flex items-center gap-1.5">
            <Calendar className="h-3.5 w-3.5 text-primary" />
            <span>Đến ngày</span>
          </label>
          <input
            type="date"
            value={toDate}
            onChange={(e) => setToDate(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200/90 text-xs font-medium rounded-xl px-3.5 py-2.5 text-slate-800 focus:outline-none focus:border-primary focus:bg-white focus:ring-2 focus:ring-primary/10 transition-all cursor-pointer"
          />
        </div>

        {/* Price Range */}
        <div>
          <label className="text-xs font-bold text-slate-700 mb-1.5 flex items-center gap-1.5">
            <DollarSign className="h-3.5 w-3.5 text-primary" />
            <span>Khoảng ngân sách</span>
          </label>
          <select
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200/90 text-xs font-medium rounded-xl px-3.5 py-2.5 text-slate-800 focus:outline-none focus:border-primary focus:bg-white focus:ring-2 focus:ring-primary/10 transition-all cursor-pointer"
          >
            <option value="">Tất cả mức giá</option>
            <option value="0-2000000">Dưới 2 triệu VNĐ</option>
            <option value="2000000-5000000">Từ 2 - 5 triệu VNĐ</option>
            <option value="5000000-10000000">Từ 5 - 10 triệu VNĐ</option>
            <option value="10000000-999999999">Tour cao cấp (Trên 10 triệu)</option>
          </select>
        </div>

        {/* Submit button */}
        <div className="flex items-end">
          <button
            type="submit"
            className="w-full bg-brand-ocean hover:bg-brand-blue text-white font-extrabold py-2.5 px-4 rounded-xl text-xs flex items-center justify-center gap-2 shadow-lg shadow-black/10 transition-all hover:scale-[1.02] active:scale-95"
          >
            <Filter className="h-3.5 w-3.5" />
            <span>Lọc Kết Quả</span>
          </button>
        </div>
      </div>
    </form>
  );
}

