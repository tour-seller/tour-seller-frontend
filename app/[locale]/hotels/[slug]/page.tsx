import { setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { Breadcrumb } from '@/components/layout/Breadcrumb';
import { getTourBySlug } from '@/lib/strapi';
import { formatCurrency, getStrapiMediaUrl } from '@/lib/utils';
import Image from 'next/image';
import { Star, MapPin, Phone, CheckCircle, Wifi, Coffee, Utensils, Waves } from 'lucide-react';
import type { Metadata } from 'next';

interface HotelDetailPageProps {
  params: { locale: string; slug: string };
}

export const revalidate = 300;

export async function generateMetadata({ params }: HotelDetailPageProps): Promise<Metadata> {
  const hotel = await getTourBySlug(params.slug, params.locale);
  return {
    title: hotel?.name || 'Chi Tiết Khách Sạn',
    description: hotel?.summary || 'Thông tin phòng và tiện nghi khách sạn.',
  };
}

export default async function HotelDetailPage({ params }: HotelDetailPageProps) {
  setRequestLocale(params.locale);

  const hotel = await getTourBySlug(params.slug, params.locale);
  if (!hotel) notFound();

  const imgUrl = getStrapiMediaUrl(hotel.thumbnail?.url);

  return (
    <div className="container mx-auto px-4 py-6">
      <Breadcrumb
        items={[
          { label: 'Khách sạn & Resort', href: '/hotels' },
          { label: hotel.name },
        ]}
      />

      <div className="bg-white rounded-3xl p-6 md:p-8 border border-slate-200 shadow-sm mb-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-7">
            <div className="relative aspect-[16/10] rounded-2xl overflow-hidden bg-slate-100 shadow-md">
              <Image
                src={imgUrl}
                alt={hotel.name}
                fill
                priority
                className="object-cover"
              />
            </div>
          </div>

          <div className="lg:col-span-5 space-y-5">
            <div>
              <div className="flex items-center gap-1 text-brand-mute mb-2">
                {Array.from({ length: hotel.starRating || 5 }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-brand-ink text-brand-ink" />
                ))}
                <span className="text-xs font-bold text-slate-700 ml-1">
                  Khách sạn {hotel.starRating || 5} Sao
                </span>
              </div>
              <h1 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight leading-snug">
                {hotel.name}
              </h1>
              {hotel.pickupPoint && (
                <p className="text-xs text-slate-500 flex items-center gap-1.5 mt-2">
                  <MapPin className="h-4 w-4 text-primary flex-shrink-0" />
                  <span>{hotel.pickupPoint}</span>
                </p>
              )}
            </div>

            <div className="p-5 rounded-2xl bg-[#f5f5f3] border border-orange-100 space-y-2">
              <span className="text-xs text-slate-500 font-semibold block uppercase tracking-wider">
                Giá phòng ưu đãi từ
              </span>
              <div className="text-3xl font-black text-primary">
                {formatCurrency(hotel.salePrice || hotel.regularPrice)}
                <span className="text-xs font-medium text-slate-500 ml-1">/ đêm</span>
              </div>
              <p className="text-[11px] text-slate-500">
                Giá đã bao gồm bữa sáng buffet và thuế phí dịch vụ.
              </p>
            </div>

            <a
              href="tel:0908123456"
              className="w-full bg-primary hover:bg-brand-ocean text-white font-extrabold py-3.5 px-4 rounded-2xl text-sm flex items-center justify-center gap-2 shadow-lg shadow-black/10 transition-all hover:scale-[1.02]"
            >
              <Phone className="h-4 w-4" />
              <span>Liên hệ đặt phòng: 0908.123.456</span>
            </a>

            <div className="pt-3 border-t border-slate-100 grid grid-cols-2 gap-3 text-xs text-slate-600">
              <div className="flex items-center gap-2">
                <Wifi className="h-4 w-4 text-primary" />
                <span>Wifi miễn phí tốc độ cao</span>
              </div>
              <div className="flex items-center gap-2">
                <Coffee className="h-4 w-4 text-primary" />
                <span>Bữa sáng buffet sang trọng</span>
              </div>
              <div className="flex items-center gap-2">
                <Waves className="h-4 w-4 text-primary" />
                <span>Hồ bơi & Khu thể thao</span>
              </div>
              <div className="flex items-center gap-2">
                <Utensils className="h-4 w-4 text-primary" />
                <span>Nhà hàng ẩm thực Á - Âu</span>
              </div>
            </div>
          </div>
        </div>

        {hotel.description && (
          <div className="mt-10 pt-8 border-t border-slate-100">
            <h2 className="text-xl font-bold text-slate-900 mb-4">
              Giới Thiệu Khách Sạn
            </h2>
            <div
              className="baonoidung text-sm text-slate-600 leading-relaxed"
              dangerouslySetInnerHTML={{ __html: hotel.description }}
            />
          </div>
        )}
      </div>
    </div>
  );
}
