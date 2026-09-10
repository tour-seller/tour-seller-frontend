'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Link } from '@/i18n/routing';
import { formatCurrency, formatDate, getStrapiMediaUrl } from '@/lib/utils';
import { pickVietnamImage } from '@/lib/pexels-vietnam';
import { Heart, Calendar, Star, ArrowRight, Clock } from 'lucide-react';
import type { Tour } from '@tour-seller/types';

interface TourCardProps {
  tour: Tour;
  locale?: string;
}

export function TourCard({ tour, locale = 'vi' }: TourCardProps) {
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem('nasatourist_favorite_tours');
      if (stored) {
        const ids: number[] = JSON.parse(stored);
        if (ids.includes(tour.id)) {
          setIsLiked(true);
        }
      }
    } catch {}
  }, [tour.id]);

  const toggleLike = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      const stored = localStorage.getItem('nasatourist_favorite_tours');
      let ids: number[] = stored ? JSON.parse(stored) : [];
      if (ids.includes(tour.id)) {
        ids = ids.filter((id) => id !== tour.id);
        setIsLiked(false);
      } else {
        ids.push(tour.id);
        setIsLiked(true);
      }
      localStorage.setItem('nasatourist_favorite_tours', JSON.stringify(ids));
      window.dispatchEvent(new Event('favorites-updated'));
    } catch {}
  };

  const imageUrl = tour.thumbnail?.url
    ? getStrapiMediaUrl(tour.thumbnail.url)
    : pickVietnamImage(tour.name || tour.id, 'card');
  const [imgSrc, setImgSrc] = useState(imageUrl);

  useEffect(() => {
    setImgSrc(
      tour.thumbnail?.url
        ? getStrapiMediaUrl(tour.thumbnail.url)
        : pickVietnamImage(tour.name || tour.id, 'card')
    );
  }, [tour.thumbnail?.url, tour.name, tour.id]);

  const nextDeparture = tour.departures?.[0]?.departureDate;
  const stars = tour.starRating || 3;

  return (
    <div className="group bg-white rounded-3xl overflow-hidden ring-1 ring-sky-100 hover:ring-brand-blue/30 shadow-soft hover:shadow-card-hover transition-all duration-700 ease-fluid hover:-translate-y-1 flex flex-col relative">
      <Link href={`/tours/${tour.slug}` as any} className="relative aspect-[4/3] overflow-hidden bg-slate-100 block">
        <Image
          src={imgSrc}
          alt={tour.thumbnail?.alternativeText || tour.name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-1000 ease-fluid group-hover:scale-105"
          onError={() => setImgSrc(pickVietnamImage(`${tour.name}-alt`, 'card'))}
        />

        <div className="absolute top-3 left-3 flex flex-col gap-1.5 items-start z-10">
          {tour.discount && tour.discount > 0 ? (
            <span className="bg-brand-coral text-white font-semibold text-[11px] px-2.5 py-0.5 rounded-full tracking-wider shadow-[0_6px_14px_-8px_rgba(242,120,92,0.9)]">
              -{tour.discount}%
            </span>
          ) : null}

          {tour.kind && (
            <span className="bg-brand-deep/80 text-white text-[10px] font-semibold px-2 py-0.5 rounded-lg border border-white/20 uppercase tracking-wider">
              {tour.kind === 'international' ? 'Quốc tế' : 'Nội địa'}
            </span>
          )}
        </div>

        {tour.duration && (
          <span className="absolute bottom-3 left-3 bg-brand-deep/80 text-white text-[11px] font-medium px-2.5 py-1 rounded-xl border border-white/15 flex items-center gap-1.5">
            <Clock className="h-3 w-3" strokeWidth={1.5} /> {tour.duration}
          </span>
        )}

        <button
          onClick={toggleLike}
          className={`absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-700 ease-fluid ${
            isLiked
              ? 'bg-brand-coral text-white scale-105'
              : 'bg-white/90 text-slate-600 hover:text-brand-coral hover:bg-white active:scale-95'
          }`}
          title="Thêm vào danh sách yêu thích"
          aria-label="Yêu thích"
        >
          <Heart
            className={`h-4 w-4 transition-transform ${isLiked ? 'fill-white scale-105' : ''}`}
            strokeWidth={1.5}
          />
        </button>
      </Link>

      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
        <div>
          <h3 className="font-display font-semibold text-slate-800 text-sm sm:text-base line-clamp-2 mb-3 group-hover:text-brand-ink transition-colors duration-700 ease-fluid leading-snug">
            <Link href={`/tours/${tour.slug}` as any}>{tour.name}</Link>
          </h3>

          <div className="space-y-1.5 text-xs text-slate-500 mb-4 bg-sky-50/70 p-3 rounded-2xl ring-1 ring-sky-100">
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-1.5 text-slate-500 font-medium">
                <Calendar className="h-3.5 w-3.5 text-brand-ocean flex-shrink-0" strokeWidth={1.5} />
                <span>Khởi hành:</span>
              </span>
              <span className="font-semibold text-slate-700">
                {nextDeparture ? formatDate(nextDeparture, locale) : 'Hàng tuần'}
              </span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-slate-500 font-medium">Tiêu chuẩn:</span>
              <div className="flex items-center gap-0.5">
                {Array.from({ length: stars }).map((_, i) => (
                  <Star key={i} className="h-3 w-3 fill-brand-yellow text-brand-yellow" strokeWidth={1.5} />
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
          <div>
            <span className="text-[10px] text-slate-400 block uppercase tracking-wider font-semibold">
              Giá từ
            </span>
            <div className="flex items-baseline gap-1.5 flex-wrap">
                <span className="text-base sm:text-lg font-display font-bold text-brand-deep">
                {formatCurrency(tour.salePrice || tour.regularPrice)}
              </span>
              {tour.regularPrice && tour.salePrice && tour.regularPrice > tour.salePrice ? (
                <span className="text-xs text-slate-400 line-through">
                  {formatCurrency(tour.regularPrice)}
                </span>
              ) : null}
            </div>
          </div>

          <Link
            href={`/tours/${tour.slug}` as any}
            className="group/btn inline-flex items-center gap-2 bg-brand-ink text-white pl-3.5 pr-2 py-2 rounded-full text-xs font-semibold transition-all duration-700 ease-fluid hover:bg-brand-ocean active:scale-[0.98] flex-shrink-0"
          >
            <span>Đặt ngay</span>
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white/10 transition-transform duration-700 ease-fluid group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-px">
              <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}
