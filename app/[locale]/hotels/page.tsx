import { setRequestLocale } from 'next-intl/server';
import { Breadcrumb } from '@/components/layout/Breadcrumb';
import { getTours } from '@/lib/strapi';
import { formatCurrency, getStrapiMediaUrl } from '@/lib/utils';
import { Link } from '@/i18n/routing';
import Image from 'next/image';
import { Star, MapPin, Phone, ArrowRight } from 'lucide-react';
import type { Metadata } from 'next';

interface HotelsPageProps {
  params: { locale: string };
  searchParams: {
    star?: string;
    keyword?: string;
  };
}

export const revalidate = 300;

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Hệ Thống Khách Sạn & Resort Toàn Quốc',
    description: 'Đặt phòng khách sạn 3-5 sao giá ưu đãi độc quyền từ Nasatourist .',
  };
}

export default async function HotelsPage({ params, searchParams }: HotelsPageProps) {
  setRequestLocale(params.locale);

  // In Strapi, hotels are either kind='hotel' or specialized category
  const res = await getTours({
    locale: params.locale,
    kind: 'hotel',
    keyword: searchParams.keyword,
    pageSize: 12,
  });

  // If no hotels found with kind='hotel', fallback sample
  const hotels = res?.data?.length > 0 ? res.data : [
    {
      id: 1,
      name: 'Vinpearl Resort & Spa Nha Trang Bay',
      slug: 'vinpearl-resort-nha-trang',
      pickupPoint: 'Đảo Hòn Tre, Nha Trang, Khánh Hòa',
      starRating: 5,
      salePrice: 2800000,
      regularPrice: 3500000,
      summary: 'Khu nghỉ dưỡng 5 sao sang trọng nhìn ra vịnh Nha Trang xinh đẹp với bãi biển riêng và hồ bơi vô cực.',
      thumbnail: { url: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80' },
    },
    {
      id: 2,
      name: 'Mường Thanh Luxury Đà Nẵng Hotel',
      slug: 'muong-thanh-luxury-da-nang',
      pickupPoint: '270 Võ Nguyên Giáp, Ngũ Hành Sơn, Đà Nẵng',
      starRating: 5,
      salePrice: 1500000,
      regularPrice: 1900000,
      summary: 'Khách sạn ven biển Mỹ Khê tuyệt đẹp với dịch vụ cao cấp, nhà hàng buffet và spa thư giãn.',
      thumbnail: { url: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=800&q=80' },
    },
    {
      id: 3,
      name: 'Silk Path Grand Resort & Spa Sapa',
      slug: 'silk-path-grand-sapa',
      pickupPoint: 'Đồi Quan Chu, Sapa, Lào Cai',
      starRating: 5,
      salePrice: 2200000,
      regularPrice: 2800000,
      summary: 'Tọa lạc trên ngọn đồi riêng nhìn thẳng ra dãy Hoàng Liên Sơn hùng vĩ, thiết kế kiến trúc Pháp quý phái.',
      thumbnail: { url: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&q=80' },
    },
    {
      id: 4,
      name: 'Novotel Phu Quoc Resort',
      slug: 'novotel-phu-quoc-resort',
      pickupPoint: 'Bãi Trường, Dương Tơ, Phú Quốc, Kiên Giang',
      starRating: 5,
      salePrice: 2400000,
      regularPrice: 3100000,
      summary: 'Thiên đường nghỉ dưỡng gia đình tại Bãi Trường với bãi cát vàng mịn màng và hoàng hôn tuyệt đẹp.',
      thumbnail: { url: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=800&q=80' },
    },
  ];

  return (
    <div className="container mx-auto px-4 py-6">
      <Breadcrumb items={[{ label: 'Khách sạn & Resort' }]} />

      <div className="mb-8">
        <h1 className="text-2xl md:text-4xl font-black text-slate-900 tracking-tight mb-2">
          Hệ Thống Khách Sạn & Resort
        </h1>
        <p className="text-xs md:text-sm text-slate-500">
          Mạng lưới khách sạn và khu nghỉ dưỡng 3 - 5 sao cao cấp với giá ưu đãi độc quyền từ Nasatourist .
        </p>
      </div>

      {/* Hotel Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {hotels.map((h: any) => {
          const imgUrl = getStrapiMediaUrl(h.thumbnail?.url);
          return (
            <div
              key={h.id}
              className="group bg-white rounded-2xl overflow-hidden border border-slate-200/80 shadow-sm hover:shadow-xl transition-all flex flex-col justify-between"
            >
              <div>
                <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
                  <Image
                    src={imgUrl}
                    alt={h.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-sm px-2.5 py-1 rounded-full shadow flex items-center gap-1 text-xs font-bold text-brand-mute">
                    <Star className="h-3.5 w-3.5 fill-brand-ink text-brand-ink" />
                    <span>{h.starRating || 5} Sao</span>
                  </div>
                </div>

                <div className="p-5">
                  <h3 className="font-bold text-base text-slate-800 group-hover:text-primary transition-colors line-clamp-2 mb-2">
                    {h.name}
                  </h3>

                  {h.pickupPoint && (
                    <p className="text-xs text-slate-500 flex items-center gap-1.5 mb-2.5">
                      <MapPin className="h-3.5 w-3.5 text-primary flex-shrink-0" />
                      <span className="line-clamp-1">{h.pickupPoint}</span>
                    </p>
                  )}

                  {h.summary && (
                    <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                      {h.summary}
                    </p>
                  )}
                </div>
              </div>

              <div className="p-5 pt-0">
                <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-3">
                  <div>
                    <span className="text-[10px] text-slate-400 font-semibold block uppercase">
                      Giá phòng / đêm
                    </span>
                    <span className="text-base md:text-lg font-black text-primary">
                      {formatCurrency(h.salePrice || h.regularPrice)}
                    </span>
                  </div>

                  <a
                    href="tel:0908123456"
                    className="inline-flex items-center gap-1.5 bg-primary hover:bg-brand-ocean text-white font-bold text-xs px-4 py-2 rounded-xl shadow transition-colors"
                  >
                    <Phone className="h-3.5 w-3.5" />
                    <span>Đặt phòng</span>
                  </a>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
