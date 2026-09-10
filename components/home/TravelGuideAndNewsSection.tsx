import Image from 'next/image';
import { Link } from '@/i18n/routing';
import { BookOpen, Newspaper, Calendar, ArrowRight } from 'lucide-react';
import { formatDate, getStrapiMediaUrl } from '@/lib/utils';
import { pickVietnamImage } from '@/lib/pexels-vietnam';
import type { Article } from '@tour-seller/types';

function articleImage(article?: { name?: string; id?: number; thumbnail?: { url?: string | null } | null }) {
  if (!article) return pickVietnamImage('nasatourist', 'card');
  if (article.thumbnail?.url) return getStrapiMediaUrl(article.thumbnail.url);
  return pickVietnamImage(article.name || article.id, 'card');
}

interface TravelGuideAndNewsSectionProps {
  travelGuides?: Article[];
  newsArticles?: Article[];
  locale?: string;
}

export function TravelGuideAndNewsSection({
  travelGuides = [],
  newsArticles = [],
  locale = 'vi',
}: TravelGuideAndNewsSectionProps) {
  const guide = travelGuides[0] || {
    id: 1,
    name: 'Cẩm Nang Du Lịch Đà Nẵng - Hội An Từ A Đến Z Cho Người Đi Lần Đầu',
    slug: 'cam-nang-du-lich-da-nang-hoi-an',
    summary: 'Tổng hợp chi tiết lịch trình, địa điểm ăn uống đặc sản, khách sạn view đẹp và chi phí tiết kiệm nhất cho chuyến đi.',
    publishedAt: '2026-03-01T00:00:00.000Z',
    thumbnail: { url: 'https://images.pexels.com/photos/2412606/pexels-photo-2412606.jpeg?auto=compress&cs=tinysrgb&w=800' },
  };

  const mainNews = newsArticles[0] || {
    id: 2,
    name: 'Nasatourist  Triển Khai Chương Trình Ưu Đãi Hè 2026 Rộn Ràng',
    slug: 'nasatourist-uu-dai-he-2026',
    summary: 'Hàng trăm voucher giảm giá đến 30% và quà tặng hấp dẫn dành tặng khách hàng đặt tour sớm.',
    publishedAt: '2026-03-05T00:00:00.000Z',
    thumbnail: { url: 'https://images.pexels.com/photos/2387873/pexels-photo-2387873.jpeg?auto=compress&cs=tinysrgb&w=800' },
  };

  const sideNews = newsArticles.slice(1, 4).length > 0 ? newsArticles.slice(1, 4) : [
    {
      id: 3,
      name: 'Xu Hướng Du Lịch Xanh Và Nghỉ Dưỡng Chữa Lành Lên Ngôi Năm 2026',
      slug: 'xu-huong-du-lich-xanh',
      publishedAt: '2026-03-02T00:00:00.000Z',
      thumbnail: { url: 'https://images.pexels.com/photos/1659438/pexels-photo-1659438.jpeg?auto=compress&cs=tinysrgb&w=400' },
    },
    {
      id: 4,
      name: 'Quy Định Mới Nhất Về Thủ Tục Xuất Nhập Cảnh Các Nước Đông Nam Á',
      slug: 'quy-dinh-xuat-nhap-canh-moi',
      publishedAt: '2026-02-28T00:00:00.000Z',
      thumbnail: { url: 'https://images.pexels.com/photos/2161449/pexels-photo-2161449.jpeg?auto=compress&cs=tinysrgb&w=400' },
    },
    {
      id: 5,
      name: 'Kinh Nghiệm Chuẩn Bị Hành Lý Và Đổi Tiền Khi Du Lịch Châu Âu',
      slug: 'kinh-nghiem-du-lich-chau-au',
      publishedAt: '2026-02-25T00:00:00.000Z',
      thumbnail: { url: 'https://images.pexels.com/photos/2166559/pexels-photo-2166559.jpeg?auto=compress&cs=tinysrgb&w=400' },
    },
  ];

  return (
    <section className="container mx-auto px-4 py-16 md:py-24">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10">
        {/* Cột trái: Cẩm nang du lịch (5 cols) */}
        <div className="lg:col-span-5 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-6 pb-3 border-b border-slate-200/80">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-[#f5f5f3] text-primary flex items-center justify-center shadow-sm">
                  <BookOpen className="h-4 w-4" />
                </div>
                <h2 className="text-xl md:text-2xl font-display font-extrabold text-slate-900">
                  Cẩm Nang Du Lịch
                </h2>
              </div>
              <Link
                href="/news?kind=cam-nang-du-lich"
                className="text-xs font-bold text-primary hover:text-orange-700 hover:underline flex items-center gap-1"
              >
                <span>Xem tất cả</span>
                <ArrowRight className="h-3 w-3" />
              </Link>
            </div>

            <Link
              href={`/news/${guide.slug}` as any}
              className="group block bg-white rounded-3xl overflow-hidden border border-slate-200/80 shadow-[0_4px_20px_rgba(10,37,64,0.05)] hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
            >
              <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
                <Image
                  src={articleImage(guide)}
                  alt={guide.name}
                  fill
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover group-hover:scale-108 transition-transform duration-700 ease-out"
                />
                <span className="absolute top-3.5 left-3.5 bg-primary text-white text-[10px] font-bold px-3 py-1 rounded-full shadow-md uppercase tracking-wider">
                  Kinh nghiệm hay
                </span>
              </div>
              <div className="p-6">
                <span className="text-[11px] text-slate-400 font-semibold flex items-center gap-1.5 mb-2.5">
                  <Calendar className="h-3.5 w-3.5 text-primary" />
                  <span>{formatDate(guide.publishedAt, locale)}</span>
                </span>
                <h3 className="font-display font-bold text-base sm:text-lg text-slate-900 group-hover:text-primary transition-colors line-clamp-2 mb-2.5 leading-snug">
                  {guide.name}
                </h3>
                {guide.summary && (
                  <p className="text-xs sm:text-sm text-slate-500 line-clamp-3 leading-relaxed">
                    {guide.summary}
                  </p>
                )}
                <div className="mt-5 pt-3.5 border-t border-slate-100 flex items-center gap-1.5 text-xs font-bold text-primary">
                  <span>Khám phá cẩm nang</span>
                  <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1.5 transition-transform" />
                </div>
              </div>
            </Link>
          </div>
        </div>

        {/* Cột phải: Tin tức & sự kiện (7 cols: 1 tin lớn + danh sách tin nhỏ) */}
        <div className="lg:col-span-7 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-6 pb-3 border-b border-slate-200/80">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-[#f5f5f3] text-primary flex items-center justify-center shadow-sm">
                  <Newspaper className="h-4 w-4" />
                </div>
                <h2 className="text-xl md:text-2xl font-display font-extrabold text-slate-900">
                  Tin Tức & Sự Kiện
                </h2>
              </div>
              <Link
                href="/news"
                className="text-xs font-bold text-primary hover:text-orange-700 hover:underline flex items-center gap-1"
              >
                <span>Xem tất cả</span>
                <ArrowRight className="h-3 w-3" />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {/* Tin lớn bên trái */}
              <Link
                href={`/news/${mainNews.slug}` as any}
                className="group block bg-white rounded-3xl overflow-hidden border border-slate-200/80 shadow-[0_4px_20px_rgba(10,37,64,0.05)] hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
              >
                <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
                  <Image
                    src={articleImage(mainNews)}
                    alt={mainNews.name}
                    fill
                    sizes="(max-width: 640px) 100vw, 30vw"
                    className="object-cover group-hover:scale-108 transition-transform duration-700 ease-out"
                  />
                  <span className="absolute top-3.5 left-3.5 bg-brand-navy/90 text-white text-[10px] font-bold px-2.5 py-1 rounded-full shadow-md uppercase tracking-wider backdrop-blur">
                    Tiêu điểm
                  </span>
                </div>
                <div className="p-5">
                  <span className="text-[11px] text-slate-400 font-semibold flex items-center gap-1.5 mb-2">
                    <Calendar className="h-3.5 w-3.5 text-primary" />
                    <span>{formatDate(mainNews.publishedAt, locale)}</span>
                  </span>
                  <h3 className="font-display font-bold text-sm sm:text-base text-slate-900 group-hover:text-primary transition-colors line-clamp-2 mb-2 leading-snug">
                    {mainNews.name}
                  </h3>
                  {mainNews.summary && (
                    <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                      {mainNews.summary}
                    </p>
                  )}
                </div>
              </Link>

              {/* Danh sách 3 tin nhỏ bên phải */}
              <div className="space-y-3.5">
                {sideNews.map((item: any) => (
                  <Link
                    key={item.id}
                    href={`/news/${item.slug}` as any}
                    className="group flex gap-3.5 p-3 rounded-2xl bg-white border border-slate-200/80 shadow-[0_2px_10px_rgba(0,0,0,0.03)] hover:shadow-md hover:border-black/10 transition-all duration-200 items-center hover:-translate-y-0.5"
                  >
                    <div className="relative w-22 h-18 sm:w-24 sm:h-20 rounded-xl overflow-hidden bg-slate-100 flex-shrink-0">
                      <Image
                        src={articleImage(item)}
                        alt={item.name}
                        fill
                        sizes="100px"
                        className="object-cover group-hover:scale-115 transition-transform duration-500"
                      />
                    </div>
                    <div className="flex-1 min-w-0 pr-1">
                      <span className="text-[10px] text-slate-400 font-medium block mb-1">
                        {formatDate(item.publishedAt, locale)}
                      </span>
                      <h4 className="text-xs font-bold text-slate-800 group-hover:text-primary transition-colors line-clamp-2 leading-snug">
                        {item.name}
                      </h4>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
