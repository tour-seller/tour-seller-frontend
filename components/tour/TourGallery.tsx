'use client';

import { useState } from 'react';
import Image from 'next/image';
import { getStrapiMediaUrl } from '@/lib/utils';
import { pickVietnamImage, VIETNAM_IMAGES } from '@/lib/pexels-vietnam';
import type { GalleryItem, MediaItem } from '@tour-seller/types';

interface TourGalleryProps {
  mainPhoto?: MediaItem;
  galleryItems?: GalleryItem[];
  tourName: string;
}

export function TourGallery({ mainPhoto, galleryItems = [], tourName }: TourGalleryProps) {
  const images: { url: string; title?: string }[] = [];

  if (mainPhoto?.url) {
    images.push({ url: getStrapiMediaUrl(mainPhoto.url), title: tourName });
  }

  galleryItems.forEach((g) => {
    if (g.image?.url) {
      images.push({ url: getStrapiMediaUrl(g.image.url), title: g.title || tourName });
    }
  });

  if (images.length === 0) {
    images.push(
      { url: pickVietnamImage(tourName, 'hero'), title: tourName },
      { url: VIETNAM_IMAGES.hoiAn, title: tourName },
      { url: VIETNAM_IMAGES.ninhBinh, title: tourName },
      { url: VIETNAM_IMAGES.daNang, title: tourName }
    );
  }

  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="space-y-3 mb-8">
      {/* Main Image View */}
      <div className="relative aspect-[16/10] w-full rounded-2xl overflow-hidden bg-slate-900 shadow-md">
        <Image
          src={images[activeIndex].url}
          alt={images[activeIndex].title || tourName}
          fill
          priority
          className="object-cover"
        />
        <div className="absolute bottom-3 right-3 bg-black/60 backdrop-blur-sm text-white text-xs px-3 py-1 rounded-full font-medium">
          {activeIndex + 1} / {images.length}
        </div>
      </div>

      {/* Thumbnail Bar */}
      {images.length > 1 && (
        <div className="flex gap-2.5 overflow-x-auto pb-2 scrollbar-none">
          {images.map((img, idx) => (
            <button
              key={idx}
              onClick={() => setActiveIndex(idx)}
              className={`relative w-20 h-14 md:w-24 md:h-16 rounded-xl overflow-hidden flex-shrink-0 transition-all ${
                activeIndex === idx
                  ? 'ring-2 ring-primary ring-offset-2 scale-95 opacity-100'
                  : 'opacity-70 hover:opacity-100'
              }`}
            >
              <Image
                src={img.url}
                alt={`Thumbnail ${idx + 1}`}
                fill
                className="object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
