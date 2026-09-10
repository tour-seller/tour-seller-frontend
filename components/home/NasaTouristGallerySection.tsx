'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';

const IMAGES = [
  {
    src: 'https://images.pexels.com/photos/18501642/pexels-photo-18501642.jpeg?auto=compress&cs=tinysrgb&w=1600',
    title: 'Vịnh Hạ Long',
    span: 'md:col-span-8 md:row-span-2',
  },
  {
    src: 'https://images.pexels.com/photos/20593364/pexels-photo-20593364.jpeg?auto=compress&cs=tinysrgb&w=1200',
    title: 'Hội An',
    span: 'md:col-span-4',
  },
  {
    src: 'https://images.pexels.com/photos/37888321/pexels-photo-37888321.jpeg?auto=compress&cs=tinysrgb&w=1200',
    title: 'Hang động đá vôi',
    span: 'md:col-span-4',
  },
  {
    src: 'https://images.pexels.com/photos/38843230/pexels-photo-38843230.jpeg?auto=compress&cs=tinysrgb&w=1200',
    title: 'Ruộng bậc thang Sapa',
    span: 'md:col-span-4',
  },
  {
    src: 'https://images.pexels.com/photos/33929115/pexels-photo-33929115.jpeg?auto=compress&cs=tinysrgb&w=1200',
    title: 'Chùa Đà Nẵng',
    span: 'md:col-span-4',
  },
  {
    src: 'https://images.pexels.com/photos/2166559/pexels-photo-2166559.jpeg?auto=compress&cs=tinysrgb&w=1200',
    title: 'Tràng An Ninh Bình',
    span: 'md:col-span-4',
  },
];

function GalleryCard({
  src,
  title,
  span,
  delay,
}: {
  src: string;
  title: string;
  span: string;
  delay: number;
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
      { threshold: 0.15 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`col-span-1 ${span} transition-all duration-700 ease-fluid ${
        visible ? 'translate-y-0 opacity-100' : 'translate-y-16 opacity-0'
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className="bezel h-full min-h-[220px] md:min-h-0">
        <div className="bezel-inner group relative h-full min-h-[220px] md:min-h-[240px] cursor-pointer">
          <Image
            src={src}
            alt={title}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover transition-transform duration-1000 ease-fluid group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-black/45 opacity-80 transition-opacity duration-700 ease-fluid group-hover:opacity-95" />
          <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-5">
            <div>
              <p className="text-[10px] uppercase tracking-[0.2em] text-white/55 mb-1">Nasatourist</p>
              <p className="font-display text-base md:text-lg font-semibold text-white">{title}</p>
            </div>
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/15 text-white transition-transform duration-700 ease-fluid group-hover:translate-x-0.5 group-hover:-translate-y-px">
              <ArrowUpRight className="h-4 w-4" strokeWidth={1.5} />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export function NasatouristGallerySection() {
  return (
    <section className="relative bg-[#f5f5f3] py-24 md:py-36">
      <div className="container mx-auto px-4">
        <div className="mb-12 md:mb-16 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div className="max-w-xl">
            <span className="inline-flex rounded-full border border-brand-ink/10 bg-white px-3 py-1 text-[10px] font-medium uppercase tracking-[0.2em] text-brand-mute mb-4">
              Thư viện
            </span>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-brand-ink">
              Khoảnh khắc Việt Nam
            </h2>
            <p className="mt-3 text-sm text-brand-mute max-w-md leading-relaxed">
              Hình ảnh từ hành trình thực tế — vịnh đá, phố cổ, ruộng bậc thang và biển miền Trung.
            </p>
          </div>
          <p className="text-xs font-medium tracking-wide text-brand-mute">#NasatouristMoments</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 md:grid-rows-2 gap-4 md:gap-5 auto-rows-[240px]">
          {IMAGES.map((img, idx) => (
            <GalleryCard
              key={img.src}
              src={img.src}
              title={img.title}
              span={img.span}
              delay={idx * 80}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
