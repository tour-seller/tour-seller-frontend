import Image from 'next/image';
import { Link } from '@/i18n/routing';
import { FileCheck2, ArrowRight, ShieldCheck, Clock, CheckCircle2, Award } from 'lucide-react';
import { getStrapiMediaUrl } from '@/lib/utils';
import { pickVietnamImage } from '@/lib/pexels-vietnam';
import type { Article } from '@tour-seller/types';

interface VisaServiceSectionProps {
  articles?: Article[];
}

export function VisaServiceSection({ articles = [] }: VisaServiceSectionProps) {
  const items = articles.length > 0 ? articles : [
    {
      id: 1,
      name: 'Dịch Vụ Visa Hàn Quốc Trọn Gói',
      country: 'Hàn Quốc',
      flag: '🇰🇷',
      successRate: '99%',
      time: '5 - 7 ngày',
      slug: 'dich-vu-visa-han-quoc',
      summary: 'Thủ tục đơn giản, hỗ trợ chứng minh tài chính và công chứng nhanh chóng.',
      thumbnail: { url: 'https://images.unsplash.com/photo-1538485399081-7191377e8241?w=600&q=80' },
    },
    {
      id: 2,
      name: 'Dịch Vụ Visa Nhật Bản Du Lịch & Thăm Thân',
      country: 'Nhật Bản',
      flag: '🇯🇵',
      successRate: '98%',
      time: '7 - 10 ngày',
      slug: 'dich-vu-visa-nhat-ban',
      summary: 'Hồ sơ chuẩn Đại sứ quán, không cần phỏng vấn, nhận kết quả đúng hẹn.',
      thumbnail: { url: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=600&q=80' },
    },
    {
      id: 3,
      name: 'Dịch Vụ Visa Châu Âu (Schengen 27 Nước)',
      country: 'Châu Âu',
      flag: '🇪🇺',
      successRate: '96%',
      time: '15 ngày',
      slug: 'dich-vu-visa-chau-au-schengen',
      summary: 'Hỗ trợ đặt lịch hẹn, thư giải trình tài chính và lịch trình chuyên nghiệp.',
      thumbnail: { url: 'https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=600&q=80' },
    },
    {
      id: 4,
      name: 'Dịch Vụ Visa Úc & New Zealand Online',
      country: 'Úc / New Zealand',
      flag: '🇦🇺',
      successRate: '97%',
      time: '10 - 14 ngày',
      slug: 'dich-vu-visa-uc-online',
      summary: 'Nộp hồ sơ trực tuyến tối ưu, chuẩn quy định Di trú Úc & New Zealand.',
      thumbnail: { url: 'https://images.unsplash.com/photo-1523482580672-f109ba8cb9be?w=600&q=80' },
    },
  ];

  return (
    <section className="bg-slate-50/60 py-14 md:py-20 border-t border-slate-200/70">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 text-slate-700 border border-emerald-200/80 text-xs font-bold uppercase tracking-wider mb-2">
              <ShieldCheck className="h-3.5 w-3.5 text-emerald-600" />
              <span>Thủ Tục Lãnh Sự Nhanh Chóng</span>
            </div>
            <h2 className="text-2xl md:text-4xl font-black font-display text-slate-900 tracking-tight">
              Dịch Vụ Làm Visa Các Nước
            </h2>
            <p className="text-xs md:text-sm text-slate-500 mt-2 max-w-xl leading-relaxed">
              Tư vấn hoàn thiện hồ sơ, dịch thuật công chứng tư pháp và đảm bảo tỷ lệ đậu cao nhất cùng chuyên viên hơn 10 năm kinh nghiệm.
            </p>
          </div>

          <Link
            href="/news?kind=dich-vu-visa"
            className="inline-flex items-center gap-2 text-xs md:text-sm font-bold text-primary hover:text-orange-700 bg-white hover:bg-[#f5f5f3]/50 px-5 py-2.5 rounded-full border border-slate-200 shadow-sm transition-all self-start md:self-auto hover:border-primary/40"
          >
            <span>Tất Cả Dịch Vụ Visa</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {/* 4 Visa Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {items.slice(0, 4).map((item: any) => {
            const imgUrl = item.thumbnail?.url
              ? getStrapiMediaUrl(item.thumbnail.url)
              : pickVietnamImage(item.name || item.country || item.id, 'card');
            return (
              <Link
                key={item.id}
                href={`/news/${item.slug}` as any}
                className="group bg-white rounded-3xl p-4 sm:p-5 border border-slate-200/80 shadow-soft hover:shadow-card-hover transition-all duration-300 flex flex-col justify-between hover:border-primary/40 hover:-translate-y-1.5"
              >
                <div>
                  <div className="relative aspect-[16/10] rounded-2xl overflow-hidden mb-4 bg-slate-100">
                    <Image
                      src={imgUrl}
                      alt={item.name}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-black/35" />
                    {item.country && (
                      <span className="absolute top-3 left-3 bg-white/95 backdrop-blur-sm text-slate-900 text-xs font-bold px-2.5 py-1 rounded-lg shadow-sm flex items-center gap-1.5">
                        <span>{item.flag}</span>
                        <span>{item.country}</span>
                      </span>
                    )}
                    {item.successRate && (
                      <span className="absolute bottom-2.5 right-2.5 bg-slate-1000 text-white text-[11px] font-extrabold px-2 py-0.5 rounded-md shadow-sm">
                        Đậu {item.successRate}
                      </span>
                    )}
                  </div>

                  <h3 className="font-bold text-base text-slate-900 group-hover:text-primary transition-colors line-clamp-2 mb-2 leading-snug">
                    {item.name}
                  </h3>

                  {item.summary && (
                    <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed mb-3">
                      {item.summary}
                    </p>
                  )}

                  {item.time && (
                    <div className="flex items-center gap-1.5 text-[11px] text-slate-500 mb-2">
                      <Clock className="h-3.5 w-3.5 text-orange-500" />
                      <span>Thời gian xét duyệt: <strong>{item.time}</strong></span>
                    </div>
                  )}
                </div>

                <div className="mt-4 pt-3.5 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-primary">
                  <span>Xem hồ sơ & thủ tục</span>
                  <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1.5 transition-transform" />
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}

