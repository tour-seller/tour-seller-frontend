'use client';

import { useState } from 'react';
import { formatCurrency, formatDate } from '@/lib/utils';
import { Calendar, Users, Check, AlertCircle } from 'lucide-react';
import type { Departure } from '@tour-seller/types';

interface DepartureListProps {
  departures?: Departure[];
  tourId: number | string;
  locale?: string;
  onSelectDeparture?: (departure: Departure) => void;
}

export function DepartureList({
  departures = [],
  tourId,
  locale = 'vi',
  onSelectDeparture,
}: DepartureListProps) {
  const [selectedIdx, setSelectedIdx] = useState(0);

  if (departures.length === 0) {
    return (
      <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200/80 text-xs text-slate-500 leading-relaxed flex items-center gap-2.5">
        <AlertCircle className="h-4 w-4 text-brand-mute flex-shrink-0" />
        <span>Lịch khởi hành linh hoạt theo yêu cầu. Vui lòng liên hệ hotline để nhận báo giá chi tiết.</span>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
          Chọn Ngày Khởi Hành:
        </h4>
        <span className="text-[11px] text-slate-400 font-medium">
          {departures.length} lịch có sẵn
        </span>
      </div>

      <div className="space-y-2.5 max-h-72 overflow-y-auto pr-1">
        {departures.map((dep, idx) => {
          const isSelected = selectedIdx === idx;
          const seats = dep.seatsAvailable ?? 10;
          const isUrgent = seats > 0 && seats <= 5;

          return (
            <div
              key={dep.id || idx}
              onClick={() => {
                setSelectedIdx(idx);
                onSelectDeparture?.(dep);
              }}
              className={`p-3.5 rounded-2xl border transition-all duration-200 cursor-pointer flex items-center justify-between gap-3 text-xs ${
                isSelected
                  ? 'border-primary bg-[#f5f5f3] shadow-sm ring-2 ring-primary/20'
                  : 'border-slate-200/90 bg-white hover:border-slate-300 hover:bg-slate-50/50'
              }`}
            >
              <div className="space-y-1.5 flex-1 min-w-0">
                <div className="flex items-center gap-2 font-bold text-slate-900">
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs flex-shrink-0 ${
                    isSelected ? 'bg-primary text-white' : 'bg-slate-100 text-slate-400'
                  }`}>
                    {isSelected ? <Check className="h-3.5 w-3.5" /> : idx + 1}
                  </div>
                  <span className="truncate">{formatDate(dep.departureDate, locale)}</span>
                </div>

                <div className="flex items-center gap-2 text-[11px] pl-8">
                  <span className={`inline-flex items-center gap-1 font-semibold px-2 py-0.5 rounded-md ${
                    isUrgent
                      ? 'bg-red-50 text-red-600 border border-red-200/60'
                      : 'bg-slate-100 text-slate-700 border border-black/10'
                  }`}>
                    <Users className="h-3 w-3" />
                    <span>Còn {seats} chỗ</span>
                  </span>
                </div>
              </div>

              <div className="text-right flex-shrink-0">
                <span className="font-black text-primary block text-sm">
                  {formatCurrency(dep.salePrice || dep.regularPrice)}
                </span>
                {dep.regularPrice && dep.salePrice && dep.regularPrice > dep.salePrice ? (
                  <span className="text-[11px] text-slate-400 line-through block">
                    {formatCurrency(dep.regularPrice)}
                  </span>
                ) : null}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

