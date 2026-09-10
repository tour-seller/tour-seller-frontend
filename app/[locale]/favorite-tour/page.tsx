'use client';

import { useState, useEffect } from 'react';
import { Breadcrumb } from '@/components/layout/Breadcrumb';
import { TourCard } from '@/components/tour/TourCard';
import { Link } from '@/i18n/routing';
import { Heart, Compass } from 'lucide-react';
import type { Tour } from '@tour-seller/types';

export default function FavoriteTourPage() {
  const [favoriteIds, setFavoriteIds] = useState<number[]>([]);
  const [tours, setTours] = useState<Tour[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadFavorites = async () => {
      try {
        const stored = localStorage.getItem('nasatourist_favorite_tours');
        const ids: number[] = stored ? JSON.parse(stored) : [];
        setFavoriteIds(ids);

        if (ids.length > 0) {
          // Fetch from API or local cache
          const res = await fetch('http://localhost:1337/api/tours?populate=*&pagination[pageSize]=100').catch(() => null);
          if (res && res.ok) {
            const data = await res.json();
            const all: Tour[] = data.data || [];
            setTours(all.filter((t) => ids.includes(t.id)));
          }
        }
      } catch {}
      setLoading(false);
    };

    loadFavorites();

    const handleUpdate = () => {
      loadFavorites();
    };
    window.addEventListener('favorites-updated', handleUpdate);
    return () => window.removeEventListener('favorites-updated', handleUpdate);
  }, []);

  return (
    <div className="container mx-auto px-4 py-6">
      <Breadcrumb items={[{ label: 'Danh sách yêu thích' }]} />

      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight mb-2 flex items-center gap-2">
          <Heart className="h-6 w-6 text-red-500 fill-red-500" />
          <span>Danh Sách Tour Yêu Thích</span>
        </h1>
        <p className="text-xs md:text-sm text-slate-500">
          Các hành trình bạn đã lưu để tiện theo dõi và lên kế hoạch cho chuyến đi sắp tới.
        </p>
      </div>

      {loading ? (
        <div className="text-center py-20 text-slate-400 text-sm">
          Đang tải danh sách tour yêu thích...
        </div>
      ) : tours.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-16">
          {tours.map((tour) => (
            <TourCard key={tour.id} tour={tour} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-white rounded-3xl border border-slate-200 p-8 my-8 shadow-sm max-w-lg mx-auto">
          <div className="w-16 h-16 rounded-full bg-red-50 text-red-500 flex items-center justify-center mx-auto mb-4">
            <Heart className="h-8 w-8" />
          </div>
          <h3 className="text-lg font-bold text-slate-800 mb-2">
            Danh sách yêu thích đang trống
          </h3>
          <p className="text-xs md:text-sm text-slate-500 mb-6 leading-relaxed">
            Bạn chưa lưu tour nào. Hãy bấm vào biểu tượng trái tim trên các tour du lịch bạn yêu thích để dễ dàng xem lại bất cứ lúc nào!
          </p>
          <Link
            href="/tours"
            className="inline-flex items-center gap-2 bg-primary hover:bg-brand-ocean text-white text-xs font-bold px-6 py-2.5 rounded-full transition-colors shadow"
          >
            <Compass className="h-4 w-4" />
            <span>Khám phá các tour nổi bật</span>
          </Link>
        </div>
      )}
    </div>
  );
}
