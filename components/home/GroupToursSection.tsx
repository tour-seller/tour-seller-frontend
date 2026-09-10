import Image from 'next/image';
import { Link } from '@/i18n/routing';
import { Users, PhoneCall, ArrowRight, CheckCircle2, Building2, Award, ShieldCheck, Sparkles } from 'lucide-react';
import { getStrapiMediaUrl } from '@/lib/utils';
import { pickVietnamImage } from '@/lib/pexels-vietnam';
import type { Article } from '@tour-seller/types';

interface GroupToursSectionProps {
  articles?: Article[];
  slogan?: string;
}

export function GroupToursSection({
  articles = [],
  slogan = 'Giải pháp tour du lịch chuyên biệt, gắn kết đội ngũ và nâng tầm thương hiệu doanh nghiệp với quy mô từ 20 đến 1.000+ khách',
}: GroupToursSectionProps) {
  const items = articles.length > 0 ? articles : [
    {
      id: 1,
      name: 'Tour Doanh Nghiệp Gala Dinner & Teambuilding Quy Nhơn 3N2Đ',
      slug: 'tour-doanh-nghiep-quy-nhon',
      thumbnail: { url: 'https://images.pexels.com/photos/2387873/pexels-photo-2387873.jpeg?auto=compress&cs=tinysrgb&w=800' },
      badge: 'Teambuilding bãi biển',
      pax: '20 - 500 khách',
    },
    {
      id: 2,
      name: 'Hành Trình Gắn Kết: Khám Phá Rừng Thông Đà Lạt & Lửa Trại',
      slug: 'hanh-trinh-gan-ket-da-lat',
      thumbnail: { url: 'https://images.pexels.com/photos/2104152/pexels-photo-2104152.jpeg?auto=compress&cs=tinysrgb&w=800' },
      badge: 'Lửa trại & Gala',
      pax: '30 - 300 khách',
    },
    {
      id: 3,
      name: 'Hội Thảo & Du Lịch MICE: Khám Phá Di Sản Cố Đô - Đà Nẵng',
      slug: 'hoi-thao-mice-singapore-malaysia',
      thumbnail: { url: 'https://images.pexels.com/photos/3408353/pexels-photo-3408353.jpeg?auto=compress&cs=tinysrgb&w=800' },
      badge: 'Sự kiện MICE cao cấp',
      pax: '20 - 200 khách',
    },
  ];

  return (
    <section className="relative bg-brand-deep text-white py-16 md:py-24 overflow-hidden">
      {/* Ambient background decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-brand-ocean/20 rounded-full blur-3xl pointer-events-none" />

      <div className="container relative z-10 mx-auto px-4">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/15 border border-primary/30 text-brand-mute text-xs font-bold uppercase tracking-wider mb-3">
              <Users className="h-3.5 w-3.5" />
              <span>Dịch Vụ Khách Đoàn & Doanh Nghiệp (MICE)</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-black font-display tracking-tight text-white leading-tight">
              Hành Trình Gắn Kết <br className="hidden md:inline" />
              <span className="text-sky-100">
                Nâng Tầm Doanh Nghiệp
              </span>
            </h2>
            <p className="text-sm md:text-base text-slate-300 mt-3 leading-relaxed">
              {slogan}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <a
              href="tel:0908123456"
              className="inline-flex items-center gap-2.5 bg-brand-ocean hover:bg-brand-blue text-white font-extrabold text-sm px-6 py-3 rounded-full shadow-lg shadow-black/10 transition-all hover:scale-105 active:scale-95"
            >
              <PhoneCall className="h-4 w-4" />
              <span>Tư Vấn Tour Đoàn 24/7</span>
            </a>
            <Link
              href="/news?kind=tour-khach-doan"
              className="inline-flex items-center gap-1.5 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold text-sm px-5 py-3 rounded-full backdrop-blur-sm transition-all"
            >
              <span>Xem hồ sơ năng lực</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>

        {/* 3 Featured Group Tour Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {items.slice(0, 3).map((item: any) => {
            const imgUrl = item.thumbnail?.url
              ? getStrapiMediaUrl(item.thumbnail.url)
              : pickVietnamImage(item.name || item.id, 'card');
            return (
              <Link
                key={item.id}
                href={`/news/${item.slug}` as any}
                className="group relative bg-white/10 backdrop-blur-md border border-white/10 rounded-3xl overflow-hidden hover:border-primary/50 transition-all duration-300 hover:shadow-2xl hover:shadow-primary/10 flex flex-col hover:-translate-y-1.5"
              >
                <div className="relative aspect-[16/10] overflow-hidden bg-slate-800">
                  <Image
                    src={imgUrl}
                    alt={item.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover group-hover:scale-108 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-brand-deep/60" />
                  <span className="absolute top-3.5 left-3.5 bg-primary/90 backdrop-blur-md text-white text-[11px] font-extrabold uppercase tracking-wider px-3 py-1 rounded-full shadow-md">
                    {item.badge || 'Khách đoàn'}
                  </span>
                  {item.pax && (
                    <span className="absolute bottom-3 left-3.5 inline-flex items-center gap-1.5 text-xs text-slate-200 bg-black/40 backdrop-blur-md px-2.5 py-1 rounded-lg border border-white/10">
                      <Building2 className="h-3 w-3 text-brand-mute" />
                      <span>{item.pax}</span>
                    </span>
                  )}
                </div>
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <h3 className="text-base font-bold text-white group-hover:text-white/60 transition-colors line-clamp-2 mb-4 leading-snug">
                    {item.name}
                  </h3>
                  <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs text-white/60 font-bold">
                    <span>Xem kịch bản chi tiết</span>
                    <ArrowRight className="h-4 w-4 group-hover:translate-x-1.5 transition-transform" />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Bento Benefits Grid - Clean Minimal Palette */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-6 border-t border-white/10">
          <div className="flex items-start gap-3.5 p-4 rounded-2xl bg-white/[0.04] border border-white/10">
            <div className="w-10 h-10 rounded-xl bg-white/10 text-brand-mute border border-white/10 flex items-center justify-center flex-shrink-0">
              <Sparkles className="h-5 w-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white mb-0.5">Thiết Kế May Đo</h4>
              <p className="text-xs text-slate-400">Lịch trình & kịch bản teambuilding theo bản sắc doanh nghiệp.</p>
            </div>
          </div>

          <div className="flex items-start gap-3.5 p-4 rounded-2xl bg-white/[0.04] border border-white/10">
            <div className="w-10 h-10 rounded-xl bg-white/10 text-brand-mute border border-white/10 flex items-center justify-center flex-shrink-0">
              <Award className="h-5 w-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white mb-0.5">Tổ Chức Chuyên Nghiệp</h4>
              <p className="text-xs text-slate-400">MC, media quay flycam, Gala Dinner đẳng cấp 4-5 sao.</p>
            </div>
          </div>

          <div className="flex items-start gap-3.5 p-4 rounded-2xl bg-white/[0.04] border border-white/10">
            <div className="w-10 h-10 rounded-xl bg-white/10 text-brand-mute border border-white/10 flex items-center justify-center flex-shrink-0">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white mb-0.5">Bảo Hiểm Tối Đa</h4>
              <p className="text-xs text-slate-400">Gói bảo hiểm du lịch quốc tế/nội địa mức bồi thường cao nhất.</p>
            </div>
          </div>

          <div className="flex items-start gap-3.5 p-4 rounded-2xl bg-white/[0.04] border border-white/10">
            <div className="w-10 h-10 rounded-xl bg-white/10 text-brand-mute border border-white/10 flex items-center justify-center flex-shrink-0">
              <CheckCircle2 className="h-5 w-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white mb-0.5">Chiết Khấu Cao Nhất</h4>
              <p className="text-xs text-slate-400">Chính sách giá đại lý tốt nhất, đầy đủ hóa đơn VAT hợp lệ.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

