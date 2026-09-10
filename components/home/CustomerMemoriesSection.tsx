import Image from 'next/image';
import { Camera } from 'lucide-react';
import { getStrapiMediaUrl } from '@/lib/utils';
import { pickVietnamImage } from '@/lib/pexels-vietnam';
import type { Article } from '@tour-seller/types';

interface CustomerMemoriesSectionProps {
  articles?: Article[];
}

export function CustomerMemoriesSection({ articles = [] }: CustomerMemoriesSectionProps) {
  const items = articles.length > 0 ? articles : [
    {
      id: 1,
      name: 'Đoàn Khách Nasatourist Chinh Phục Cung Đường Di Sản Miền Trung',
      thumbnail: { url: 'https://images.pexels.com/photos/2412606/pexels-photo-2412606.jpeg?auto=compress&cs=tinysrgb&w=800' },
    },
    {
      id: 2,
      name: 'Khoảnh Khắc Đáng Nhớ Cùng Đại Gia Đình Nasatourist Tại Đảo Ngọc Phú Quốc',
      thumbnail: { url: 'https://images.pexels.com/photos/2387873/pexels-photo-2387873.jpeg?auto=compress&cs=tinysrgb&w=800' },
    },
    {
      id: 3,
      name: 'Khám Phá Vẻ Đẹp Di Sản Tràng An - Ninh Bình Cùng Quý Doanh Nghiệp',
      thumbnail: { url: 'https://images.pexels.com/photos/2166559/pexels-photo-2166559.jpeg?auto=compress&cs=tinysrgb&w=800' },
    },
    {
      id: 4,
      name: 'Hành Trình Chinh Phục Đỉnh Fansipan Sapa Hùng Vĩ 2026',
      thumbnail: { url: 'https://images.pexels.com/photos/1659438/pexels-photo-1659438.jpeg?auto=compress&cs=tinysrgb&w=800' },
    },
  ];

  return (
    <section className="bg-slate-100/80 py-16 md:py-24 border-y border-slate-200/70">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 text-primary text-xs font-bold uppercase tracking-wider mb-2 bg-[#f5f5f3] border border-black/10 px-3.5 py-1 rounded-full shadow-sm">
            <Camera className="h-3.5 w-3.5" />
            <span>Hình Ảnh Đoàn Khách Thực Tế</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-extrabold text-slate-900 tracking-tight">
            Kỷ Niệm Hành Trình Khách Hàng
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-2 font-medium">
            Hàng ngàn nụ cười và khoảnh khắc đáng nhớ của du khách trên mọi nẻo đường cùng Nasatourist
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {items.slice(0, 4).map((item: any, idx: number) => {
            const imgUrl = item.thumbnail?.url
              ? getStrapiMediaUrl(item.thumbnail.url)
              : pickVietnamImage(item.name || idx, 'card');
            return (
              <div
                key={item.id || idx}
                className="group relative rounded-3xl overflow-hidden shadow-[0_4px_20px_rgba(10,37,64,0.08)] hover:shadow-2xl transition-all duration-500 aspect-[4/3] sm:aspect-[3/4] bg-slate-900 hover:-translate-y-1.5"
              >
                <Image
                  src={imgUrl}
                  alt={item.name}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-110 opacity-90 group-hover:opacity-100"
                />
                {/* Floating Tag */}
                <div className="absolute top-3.5 left-3.5 z-10">
                  <span className="bg-black/50 backdrop-blur-md text-white text-[10px] font-bold px-2.5 py-1 rounded-full border border-white/20">
                    Khoảnh khắc đẹp
                  </span>
                </div>

                <div className="absolute inset-0 bg-black/55 flex flex-col justify-end p-5 transition-opacity">
                  <p className="text-xs sm:text-sm font-bold text-white line-clamp-2 drop-shadow leading-snug">
                    {item.name}
                  </p>
                  <span className="text-[11px] text-white/60 font-semibold mt-1 flex items-center gap-1">
                    <span>★ ★ ★ ★ ★</span>
                    <span className="text-slate-300 ml-1">Đoàn khách hài lòng</span>
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
