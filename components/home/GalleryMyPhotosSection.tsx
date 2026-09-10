'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { Link } from '@/i18n/routing';
import { Camera, ArrowUpRight, ArrowRight } from 'lucide-react';
import { MY_PHOTOS_POOL } from '@/lib/pexels-vietnam';

// MY_PHOTOS_POOL is readonly tuple — convert to mutable for mapping
const PHOTOS = MY_PHOTOS_POOL as unknown as Array<{
  src: string;
  title: string;
  span: string;
}>;

// ── Card ──────────────────────────────────────────────────────────────────────

function PhotoCard({
  src,
  title,
  span,
  delay,
  index,
}: {
  src: string;
  title: string;
  span: string;
  delay: number;
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          io.disconnect();
        }
      },
      { threshold: 0.12 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`col-span-1 ${span} transition-all duration-700 ease-fluid ${
        visible ? 'translate-y-0 opacity-100 blur-0' : 'translate-y-14 opacity-0 blur-sm'
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className="bezel h-full min-h-[200px] md:min-h-0">
        <div className="bezel-inner group relative h-full min-h-[200px] md:min-h-[240px] cursor-pointer overflow-hidden">
          <Image
            src={src}
            alt={title}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover transition-transform duration-1000 ease-fluid group-hover:scale-[1.06]"
          />

          {/* Subtle vignette */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent opacity-90 transition-opacity duration-700 group-hover:opacity-100" />

          {/* Index badge */}
          <div className="absolute top-4 left-4 z-10">
            <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-white/15 backdrop-blur-md border border-white/20 text-white text-[10px] font-bold tabular-nums">
              {String(index + 1).padStart(2, '0')}
            </span>
          </div>

          {/* Bottom info */}
          <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-2 p-4 md:p-5 z-10">
            <div>
              <p className="text-[9px] uppercase tracking-[0.22em] text-white/50 mb-0.5 font-medium">
                #TôiChụp
              </p>
              <p className="font-display text-sm md:text-base font-semibold text-white leading-snug drop-shadow">
                {title}
              </p>
            </div>
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white/15 backdrop-blur-md border border-white/20 text-white transition-all duration-500 group-hover:bg-white/25 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
              <ArrowUpRight className="h-3.5 w-3.5" strokeWidth={2} />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Section ───────────────────────────────────────────────────────────────────

export function GalleryMyPhotosSection() {
  const headerRef = useRef<HTMLDivElement>(null);
  const [headerVisible, setHeaderVisible] = useState(false);

  useEffect(() => {
    const el = headerRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHeaderVisible(true);
          io.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section className="relative bg-brand-ink py-24 md:py-36 overflow-hidden">
      {/* Background ambient glow */}
      <div className="pointer-events-none absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full bg-brand-ocean/10 blur-[120px]" />
      <div className="pointer-events-none absolute -bottom-40 -left-40 w-[500px] h-[500px] rounded-full bg-primary/10 blur-[100px]" />

      <div className="container relative z-10 mx-auto px-4">
        {/* Header */}
        <div
          ref={headerRef}
          className={`mb-12 md:mb-16 flex flex-col md:flex-row md:items-end md:justify-between gap-6 transition-all duration-700 ease-fluid ${
            headerVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
          }`}
        >
          <div className="max-w-xl">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm px-3.5 py-1.5 mb-5">
              <Camera className="h-3.5 w-3.5 text-brand-coral" strokeWidth={2} />
              <span className="text-[10px] uppercase tracking-[0.22em] text-white/60 font-medium">
                Ảnh Thực Tế Từ Hành Trình
              </span>
            </div>

            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-white leading-[1.1]">
              Ảnh{' '}
              <span className="text-brand-coral italic">Tôi Chụp</span>
            </h2>
            <p className="mt-3 text-sm text-white/50 max-w-md leading-relaxed">
              Những khoảnh khắc được ghi lại trực tiếp trên hành trình —
              không chỉnh sửa, không filter. Việt Nam đẹp đúng như những gì bạn thấy.
            </p>
          </div>

          {/* Right side */}
          <div className="flex flex-col items-start md:items-end gap-3">
            <p className="text-xs font-semibold tracking-widest text-white/30 uppercase">
              #SavacoMoments
            </p>
            <Link
              href="/tours"
              className="inline-flex items-center gap-2 text-xs font-bold text-white/70 hover:text-white border border-white/15 hover:border-white/30 bg-white/5 hover:bg-white/10 px-5 py-2.5 rounded-full transition-all duration-300 backdrop-blur-sm group"
            >
              <span>Đặt tour ngay</span>
              <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>

        {/* Mosaic Grid — giống NasatouristGallerySection nhưng layout khác */}
        <div className="grid grid-cols-1 md:grid-cols-12 md:grid-rows-2 gap-3 md:gap-4 auto-rows-[220px]">
          {PHOTOS.map((photo, idx) => (
            <PhotoCard
              key={photo.src}
              src={photo.src}
              title={photo.title}
              span={photo.span}
              index={idx}
              delay={idx * 70}
            />
          ))}
        </div>

        {/* Footer note */}
        <div className="mt-8 flex items-center justify-center gap-2 text-[11px] text-white/25 font-medium tracking-wide">
          <Camera className="h-3.5 w-3.5" strokeWidth={1.5} />
          <span>Ảnh từ các hành trình thực tế cùng Savaco </span>
        </div>
      </div>
    </section>
  );
}
