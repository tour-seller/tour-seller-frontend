'use client';

import { useState, useEffect, useMemo } from 'react';
import Image from 'next/image';
import { Link } from '@/i18n/routing';
import { ArrowUpRight } from 'lucide-react';
import { getStrapiMediaUrl } from '@/lib/utils';
import { HERO_FALLBACK_PHOTOS, pickVietnamImage, VIETNAM_IMAGES } from '@/lib/pexels-vietnam';
import type { Slider } from '@tour-seller/types';

interface HeroSliderProps {
  sliders?: Slider[];
}

const FALLBACK_SLIDES = [
  {
    id: 1,
    name: 'Vịnh Hạ Long',
    description: 'Du thuyền di sản, kayak hang động và hải sản trên vịnh đá vôi.',
    link: '/tours?keyword=Ha+Long',
    photo: { url: VIETNAM_IMAGES.haLong },
  },
  {
    id: 2,
    name: 'Phố cổ Hội An',
    description: 'Đèn lồng sông Hoài, kiến trúc trăm năm và ẩm thực phố cổ.',
    link: '/tours?keyword=Hoi+An',
    photo: { url: VIETNAM_IMAGES.hoiAn },
  },
  {
    id: 3,
    name: 'Ruộng bậc thang Sapa',
    description: 'Mùa vàng Tây Bắc, săn mây Fansipan và văn hóa bản địa.',
    link: '/tours?keyword=Sapa',
    photo: { url: VIETNAM_IMAGES.sapa },
  },
  {
    id: 4,
    name: 'Đà Nẵng & Bà Nà',
    description: 'Chùa Linh Ứng, bãi biển Mỹ Khê và sương mờ trên đỉnh núi.',
    link: '/tours?keyword=Da+Nang',
    photo: { url: VIETNAM_IMAGES.daNang },
  },
];

function resolveSlidePhoto(slide: { name?: string; photo?: { url?: string | null } | null }, idx: number) {
  const raw = slide.photo?.url;
  if (raw && raw !== '/placeholder.jpg') {
    return getStrapiMediaUrl(raw);
  }
  return (
    pickVietnamImage(slide.name, 'hero') ||
    HERO_FALLBACK_PHOTOS[idx % HERO_FALLBACK_PHOTOS.length]
  );
}

export function HeroSlider({ sliders = [] }: HeroSliderProps) {
  const [current, setCurrent] = useState(0);
  const [failed, setFailed] = useState<Record<number, string>>({});

  const activeSlides = useMemo(() => {
    const source = sliders.length > 0 ? sliders : FALLBACK_SLIDES;
    return source.map((slide, idx) => ({
      ...slide,
      resolvedPhoto: resolveSlidePhoto(slide, idx),
    }));
  }, [sliders]);

  useEffect(() => {
    if (activeSlides.length <= 1) return;
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % activeSlides.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [activeSlides.length]);

  return (
    <section className="relative w-full min-h-[100dvh] max-h-[920px] overflow-hidden bg-brand-ink">
      {activeSlides.map((slide, idx) => {
        const imgUrl = failed[idx] || slide.resolvedPhoto;
        const isActive = idx === current;

        return (
          <div
            key={slide.id || idx}
            className={`absolute inset-0 transition-opacity duration-1000 ease-fluid ${
              isActive ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
            }`}
          >
            <Image
              src={imgUrl}
              alt={slide.name || 'Nasatourist'}
              fill
              priority={idx === 0}
              className={`object-cover object-center transition-transform duration-[8000ms] ease-fluid ${
                isActive ? 'scale-100' : 'scale-105'
              }`}
              onError={() =>
                setFailed((prev) => ({
                  ...prev,
                  [idx]: HERO_FALLBACK_PHOTOS[(idx + 1) % HERO_FALLBACK_PHOTOS.length],
                }))
              }
            />
            <div className="absolute inset-0 bg-black/45" />
            <div className="absolute inset-y-0 left-0 w-2/3 bg-black/20" />

            <div className="relative h-full flex items-end md:items-center">
              <div className="container mx-auto px-4 sm:px-6 pb-28 md:pb-24 pt-28 w-full">
                <div
                  className={`max-w-xl text-white space-y-5 md:space-y-6 ${
                    isActive ? 'animate-fade-in-up' : ''
                  }`}
                >
                  <p className="text-[10px] uppercase tracking-[0.22em] font-medium text-white/70">
                    Nasatourist · 2026
                  </p>

                  <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold tracking-tight leading-[1.05] text-balance">
                    {slide.name}
                  </h1>

                  {slide.description && (
                    <p className="text-sm sm:text-base text-white/75 leading-relaxed max-w-md text-pretty">
                      {slide.description}
                    </p>
                  )}

                  <div className="pt-1 flex flex-wrap items-center gap-3">
                    <Link
                      href={(slide.link || '/tours') as any}
                      className="group inline-flex items-center gap-3 rounded-full bg-white text-brand-ink pl-6 pr-2 py-2 font-semibold text-sm transition-all duration-700 ease-fluid hover:bg-white/90 active:scale-[0.98]"
                    >
                      <span>Khám phá</span>
                      <span className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-ink/5 transition-transform duration-700 ease-fluid group-hover:translate-x-0.5 group-hover:-translate-y-px group-hover:scale-105">
                        <ArrowUpRight className="h-4 w-4" strokeWidth={1.5} />
                      </span>
                    </Link>

                    <Link
                      href="/contact"
                      className="inline-flex items-center rounded-full border border-white/25 px-6 py-3 text-sm font-medium text-white/90 transition-all duration-700 ease-fluid hover:bg-white/10 active:scale-[0.98]"
                    >
                      Nhận báo giá
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}

      {activeSlides.length > 1 && (
        <div className="absolute bottom-8 left-1/2 z-20 flex -translate-x-1/2 items-center gap-2 rounded-full border border-white/15 bg-black/35 px-3 py-2 backdrop-blur-md">
          {activeSlides.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              aria-label={`Slide ${i + 1}`}
              className={`h-1.5 rounded-full transition-all duration-700 ease-fluid ${
                i === current ? 'w-8 bg-white' : 'w-1.5 bg-white/35 hover:bg-white/60'
              }`}
            />
          ))}
        </div>
      )}
    </section>
  );
}
