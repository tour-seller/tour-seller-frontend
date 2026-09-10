import { setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { getTourBySlug } from '@/lib/strapi';
import { Breadcrumb } from '@/components/layout/Breadcrumb';
import { TourGallery } from '@/components/tour/TourGallery';
import { DepartureList } from '@/components/tour/DepartureList';
import { RelatedTours } from '@/components/tour/RelatedTours';
import { TourJsonLd } from '@/components/tour/TourJsonLd';
import { BreadcrumbJsonLd } from '@/components/tour/BreadcrumbJsonLd';
import { formatCurrency, getStrapiMediaUrl } from '@/lib/utils';
import {
  Clock,
  MapPin,
  Bus,
  FileText,
  Star,
  Phone,
  Mail,
  ShieldCheck,
  CheckCircle,
  XCircle,
  HelpCircle,
  Calendar,
  Sparkles,
} from 'lucide-react';
import type { Metadata } from 'next';

interface TourDetailPageProps {
  params: { locale: string; slug: string };
}

export const revalidate = 300;

export async function generateMetadata({ params }: TourDetailPageProps): Promise<Metadata> {
  const tour = await getTourBySlug(params.slug, params.locale);
  if (!tour) return { title: 'Tour Không Tồn Tại' };

  const metaTitle = tour.seo?.metaTitle || tour.name;
  const metaDesc = tour.seo?.metaDescription || tour.summary || tour.name;
  const imageUrl = getStrapiMediaUrl(tour.thumbnail?.url);

  return {
    title: metaTitle,
    description: metaDesc,
    openGraph: {
      title: tour.name,
      description: metaDesc,
      images: imageUrl ? [{ url: imageUrl }] : [],
    },
  };
}

export default async function TourDetailPage({ params }: TourDetailPageProps) {
  setRequestLocale(params.locale);

  const tour = await getTourBySlug(params.slug, params.locale);
  if (!tour) notFound();

  const kindLabel = tour.kind === 'international' ? 'Tour du lịch quốc tế' : 'Tour du lịch trong nước';
  const kindHref = `/tours?kind=${tour.kind || 'domestic'}`;

  // Default sample itinerary if backend rich description lacks day breakdown
  const sampleItinerary = [
    {
      day: 'Ngày 1',
      title: 'Đón khách tại điểm hẹn - Khởi hành hành trình khám phá',
      content:
        'Xe và hướng dẫn viên Nasatourist  đón quý khách tại điểm hẹn, khởi hành đi điểm đến. Quý khách dùng điểm tâm sáng trên đường đi. Đến nơi nhận phòng khách sạn, nghỉ ngơi và dùng bữa trưa với đặc sản địa phương.',
    },
    {
      day: 'Ngày 2',
      title: 'Tham quan các danh thắng nổi tiếng - Trải nghiệm văn hóa',
      content:
        'Quý khách dùng bữa sáng buffet tại khách sạn. Bắt đầu tham quan các điểm du lịch tiêu biểu theo lịch trình, tham gia các hoạt động văn hóa bản địa thú vị. Chiều tự do tắm biển/ngắm cảnh. Tối tham gia Gala Dinner ấm cúng.',
    },
    {
      day: 'Ngày 3',
      title: 'Mua sắm đặc sản - Tạm biệt điểm đến - Trở về',
      content:
        'Sau bữa sáng, quý khách tự do mua sắm đặc sản và quà lưu niệm cho người thân. Trả phòng khách sạn, dùng bữa trưa. Xe đưa đoàn về lại điểm đón ban đầu. Hướng dẫn viên chia tay và hẹn gặp lại quý khách trong các hành trình tiếp theo.',
    },
  ];

  return (
    <>
      {/* Schema.org Structured Data */}
      <TourJsonLd tour={tour} locale={params.locale} />
      <BreadcrumbJsonLd
        items={[
          { name: 'Tour du lịch', href: '/tours' },
          { name: kindLabel, href: kindHref },
          { name: tour.name, href: `/tours/${tour.slug}` },
        ]}
        locale={params.locale}
      />

      <div className="container mx-auto px-4 py-6">
        {/* Breadcrumb */}
        <Breadcrumb
          items={[
            { label: 'Tour du lịch', href: '/tours' },
            { label: kindLabel, href: kindHref },
            { label: tour.name },
          ]}
        />

        {/* Header Title & Rating */}
        <div className="mb-8">
          <div className="flex flex-wrap items-center gap-2.5 mb-3">
            <span className="bg-brand-ocean text-white text-[11px] font-extrabold uppercase tracking-wider px-3 py-1 rounded-full shadow-sm shadow-black/10">
              {tour.kind === 'international' ? 'Tour Quốc Tế' : 'Tour Nội Địa'}
            </span>
            {tour.code && (
              <span className="bg-slate-100 text-slate-700 text-xs font-bold px-3 py-1 rounded-full border border-slate-200">
                Mã: {tour.code}
              </span>
            )}
            <div className="flex items-center gap-1 bg-[#f5f5f3] px-2.5 py-0.5 rounded-full border border-black/10/80">
              {Array.from({ length: tour.starRating || 3 }).map((_, i) => (
                <Star key={i} className="h-3.5 w-3.5 fill-brand-ink text-brand-ink" />
              ))}
              <span className="text-[11px] font-bold text-brand-ink ml-1">
                {tour.starRating || 3} Sao
              </span>
            </div>
          </div>

          <h1 className="text-2xl sm:text-3xl md:text-4xl font-black font-display text-slate-900 tracking-tight leading-tight">
            {tour.name}
          </h1>

          {tour.summary && (
            <p className="text-sm md:text-base text-slate-600 mt-3 leading-relaxed max-w-4xl">
              {tour.summary}
            </p>
          )}
        </div>

        {/* 2-Column Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Main Content Column (8 cols on desktop) */}
          <div className="lg:col-span-8 space-y-8">
            {/* Gallery */}
            <TourGallery
              mainPhoto={tour.thumbnail}
              galleryItems={tour.gallery}
              tourName={tour.name}
            />

            {/* Điểm nhấn hành trình */}
            <div className="bg-white rounded-3xl p-6 md:p-8 border border-slate-200/80 shadow-soft space-y-4">
              <h2 className="text-xl md:text-2xl font-black font-display text-slate-900 flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-[#f5f5f3]0/10 text-primary flex items-center justify-center flex-shrink-0">
                  <Sparkles className="h-4 w-4" />
                </div>
                <span>Điểm Nhấn Hành Trình</span>
              </h2>

              {tour.description ? (
                <div
                  className="baonoidung text-xs md:text-sm text-slate-600 leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: tour.description }}
                />
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
                  <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-slate-50 border border-slate-100">
                    <CheckCircle className="h-5 w-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                    <span className="text-xs md:text-sm text-slate-700">Lịch trình tối ưu hóa, đảm bảo trải nghiệm nghỉ ngơi và tham quan trọn vẹn nhất.</span>
                  </div>
                  <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-slate-50 border border-slate-100">
                    <CheckCircle className="h-5 w-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                    <span className="text-xs md:text-sm text-slate-700">Thưởng thức ẩm thực đặc sản phong phú tại nhà hàng đạt chuẩn chất lượng.</span>
                  </div>
                  <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-slate-50 border border-slate-100">
                    <CheckCircle className="h-5 w-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                    <span className="text-xs md:text-sm text-slate-700">Khách sạn tiêu chuẩn từ 3 - 5 sao tiện nghi, vị trí trung tâm thuận tiện.</span>
                  </div>
                  <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-slate-50 border border-slate-100">
                    <CheckCircle className="h-5 w-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                    <span className="text-xs md:text-sm text-slate-700">Hướng dẫn viên nhiệt tình, tận tâm theo suốt hành trình phục vụ đoàn.</span>
                  </div>
                </div>
              )}
            </div>

            {/* Lịch trình chi tiết theo từng ngày (Timeline) */}
            <div className="bg-white rounded-3xl p-6 md:p-8 border border-slate-200/80 shadow-soft space-y-6">
              <h2 className="text-xl md:text-2xl font-black font-display text-slate-900 flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-[#f5f5f3]0/10 text-primary flex items-center justify-center flex-shrink-0">
                  <Calendar className="h-4 w-4" />
                </div>
                <span>Lịch Trình Chi Tiết</span>
              </h2>

              {tour.description2 ? (
                <div
                  className="baonoidung text-xs md:text-sm text-slate-600 leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: tour.description2 }}
                />
              ) : (
                <div className="relative pl-6 space-y-8 before:absolute before:left-3 before:top-3 before:bottom-3 before:w-0.5 before:bg-sky-200">
                  {sampleItinerary.map((it, idx) => (
                    <div key={idx} className="relative group">
                      {/* Timeline dot */}
                      <div className="absolute -left-6 top-1.5 w-6 h-6 rounded-full bg-white border-2 border-primary group-hover:scale-125 transition-transform flex items-center justify-center shadow-sm">
                        <div className="w-2 h-2 rounded-full bg-primary" />
                      </div>

                      <div className="bg-slate-50/70 hover:bg-white rounded-2xl p-5 border border-slate-200/80 group-hover:border-primary/40 group-hover:shadow-soft transition-all">
                        <div className="flex flex-wrap items-center gap-2.5 mb-2">
                          <span className="bg-brand-ocean text-white text-xs font-black px-3 py-1 rounded-full shadow-sm shadow-black/10">
                            {it.day}
                          </span>
                          <h3 className="font-bold text-sm md:text-base text-slate-900">
                            {it.title}
                          </h3>
                        </div>
                        <p className="text-xs md:text-sm text-slate-600 leading-relaxed">
                          {it.content}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Dịch vụ bao gồm & không bao gồm */}
            <div className="bg-white rounded-3xl p-6 md:p-8 border border-slate-200/80 shadow-soft space-y-6">
              <h2 className="text-xl md:text-2xl font-black font-display text-slate-900 flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-[#f5f5f3]0/10 text-primary flex items-center justify-center flex-shrink-0">
                  <ShieldCheck className="h-4 w-4" />
                </div>
                <span>Dịch Vụ Bao Gồm & Không Bao Gồm</span>
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Bao gồm */}
                <div className="bg-slate-50/80 border border-slate-200/80 rounded-2xl p-6 space-y-4">
                  <h3 className="text-sm font-extrabold text-slate-800 flex items-center gap-2 uppercase tracking-wider">
                    <CheckCircle className="h-4 w-4 text-emerald-600" />
                    <span>GIÁ TOUR BAO GỒM</span>
                  </h3>
                  <ul className="space-y-2.5 text-xs text-slate-600">
                    <li className="flex items-start gap-2">
                      <span className="text-emerald-600 font-bold">✓</span>
                      <span>Xe du lịch đời mới máy lạnh đưa đón theo lịch trình.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-emerald-600 font-bold">✓</span>
                      <span>Khách sạn tiêu chuẩn 2 người/phòng (lẻ nam/nữ ngủ 3).</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-emerald-600 font-bold">✓</span>
                      <span>Các bữa ăn theo chương trình tiêu chuẩn cao.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-emerald-600 font-bold">✓</span>
                      <span>Vé vào cổng tham quan tất cả các điểm trong tour.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-emerald-600 font-bold">✓</span>
                      <span>Hướng dẫn viên vui vẻ, chu đáo, phục vụ suốt tuyến.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-emerald-600 font-bold">✓</span>
                      <span>Nước uống đóng chai, khăn lạnh và nón du lịch Nasatourist.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-emerald-600 font-bold">✓</span>
                      <span>Bảo hiểm du lịch với mức bồi thường cao nhất.</span>
                    </li>
                  </ul>
                </div>

                {/* Không bao gồm */}
                <div className="bg-slate-50/80 border border-slate-200/80 rounded-2xl p-6 space-y-4">
                  <h3 className="text-sm font-extrabold text-slate-800 flex items-center gap-2 uppercase tracking-wider">
                    <XCircle className="h-4 w-4 text-rose-600" />
                    <span>GIÁ TOUR KHÔNG BAO GỒM</span>
                  </h3>
                  <ul className="space-y-2.5 text-xs text-slate-600">
                    <li className="flex items-start gap-2">
                      <span className="text-rose-500 font-bold">✗</span>
                      <span>Chi phí cá nhân: giặt ủi, điện thoại, ăn uống ngoài tour.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-rose-500 font-bold">✗</span>
                      <span>Thuế VAT (quý khách lấy hóa đơn vui lòng cộng thêm 8-10%).</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-rose-500 font-bold">✗</span>
                      <span>Phụ thu phòng đơn (nếu có yêu cầu ở riêng).</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-rose-500 font-bold">✗</span>
                      <span>Tiền bồi dưỡng (tip) cho hướng dẫn viên và lái xe.</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Tags */}
            {tour.tags && tour.tags.length > 0 && (
              <div className="flex flex-wrap items-center gap-2 pt-2">
                <span className="text-xs font-bold text-slate-500">Từ khóa:</span>
                {tour.tags.map((t) => (
                  <span
                    key={t.id}
                    className="text-xs bg-slate-100 hover:bg-slate-200 text-slate-700 px-3 py-1 rounded-full border border-slate-200 transition-colors"
                  >
                    #{t.name}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Sticky Sidebar Column (4 cols on desktop) */}
          <div className="lg:col-span-4 space-y-6 lg:sticky lg:top-36">
            {/* Pricing & Booking Card */}
            <div className="bg-white rounded-3xl p-6 md:p-7 border border-slate-200/90 shadow-card space-y-5">
              <div>
                <span className="text-[11px] font-bold text-slate-400 block uppercase tracking-wider mb-1">
                  Giá Ưu Đãi Chỉ Từ
                </span>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-black font-display text-primary">
                    {formatCurrency(tour.salePrice || tour.regularPrice)}
                  </span>
                  <span className="text-xs text-slate-500 font-medium">/ khách</span>
                </div>
                {tour.regularPrice && tour.salePrice && tour.regularPrice > tour.salePrice ? (
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs text-slate-400 line-through">
                      {formatCurrency(tour.regularPrice)}
                    </span>
                    {tour.discount && tour.discount > 0 ? (
                      <span className="inline-block bg-red-50 text-red-600 border border-red-200/80 text-[11px] font-bold px-2 py-0.5 rounded-full">
                        Tiết kiệm {tour.discount}%
                      </span>
                    ) : null}
                  </div>
                ) : null}
              </div>

              {/* Lịch khởi hành */}
              <div className="pt-2">
                <DepartureList
                  departures={tour.departures}
                  tourId={tour.id}
                  locale={params.locale}
                />
              </div>

              {/* Action Buttons */}
              <div className="space-y-3 pt-2">
                <a
                  href="tel:0908123456"
                  className="w-full bg-brand-ocean hover:bg-brand-blue text-white font-extrabold py-3.5 px-4 rounded-2xl text-sm flex items-center justify-center gap-2.5 shadow-lg shadow-black/10 transition-all hover:scale-[1.02] active:scale-95"
                >
                  <Phone className="h-4 w-4 animate-pulse" />
                  <span>Gọi Đặt Tour: 0908.123.456</span>
                </a>

                <a
                  href="https://zalo.me/0908123456"
                  target="_blank"
                  rel="noreferrer"
                  className="w-full bg-sky-50 hover:bg-sky-100 text-sky-700 border border-sky-200 font-bold py-3 px-4 rounded-2xl text-xs flex items-center justify-center gap-2 transition-all"
                >
                  <span>Chat Zalo Nhận Tư Vấn & Giữ Chỗ</span>
                </a>
              </div>

              {/* Thông số nhanh của tour */}
              <div className="pt-4 border-t border-slate-100 space-y-3 text-xs">
                {tour.duration && (
                  <div className="flex items-center justify-between text-slate-600">
                    <span className="flex items-center gap-2 text-slate-500 font-medium">
                      <Clock className="h-4 w-4 text-primary" />
                      <span>Thời lượng:</span>
                    </span>
                    <span className="font-bold text-slate-800">{tour.duration}</span>
                  </div>
                )}

                {tour.departure && (
                  <div className="flex items-center justify-between text-slate-600">
                    <span className="flex items-center gap-2 text-slate-500 font-medium">
                      <MapPin className="h-4 w-4 text-primary" />
                      <span>Nơi khởi hành:</span>
                    </span>
                    <span className="font-bold text-slate-800">{tour.departure}</span>
                  </div>
                )}

                {tour.transport && (
                  <div className="flex items-center justify-between text-slate-600">
                    <span className="flex items-center gap-2 text-slate-500 font-medium">
                      <Bus className="h-4 w-4 text-primary" />
                      <span>Phương tiện:</span>
                    </span>
                    <span className="font-bold text-slate-800">{tour.transport}</span>
                  </div>
                )}

                {tour.pickupPoint && (
                  <div className="flex items-center justify-between text-slate-600">
                    <span className="flex items-center gap-2 text-slate-500 font-medium">
                      <MapPin className="h-4 w-4 text-primary" />
                      <span>Điểm đón:</span>
                    </span>
                    <span className="font-bold text-slate-800">{tour.pickupPoint}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Box Chuyên Viên Tư Vấn */}
            <div className="bg-brand-deep rounded-3xl p-6 text-white space-y-4 shadow-card border border-white/10">
              <div className="flex items-center gap-3.5">
                <div className="w-12 h-12 rounded-2xl bg-brand-ocean text-white font-black text-lg flex items-center justify-center shadow-md">
                  VG
                </div>
                <div>
                  <h4 className="font-extrabold text-sm text-white">Chuyên Viên Tư Vấn Tour</h4>
                  <p className="text-[11px] text-white/60">Nasatourist  Hỗ Trợ 24/7</p>
                </div>
              </div>

              <div className="space-y-2 text-xs text-slate-200">
                <a
                  href="tel:0908123456"
                  className="flex items-center gap-2.5 p-2.5 rounded-xl bg-white/[0.06] hover:bg-white/[0.12] transition-colors"
                >
                  <Phone className="h-3.5 w-3.5 text-primary" />
                  <span>Điện thoại: <strong>0908.123.456</strong></span>
                </a>
                <a
                  href="https://zalo.me/0908123456"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2.5 p-2.5 rounded-xl bg-white/[0.06] hover:bg-white/[0.12] transition-colors"
                >
                  <span className="text-[10px] font-black text-sky-400 bg-sky-500/20 px-1 py-0.5 rounded">ZALO</span>
                  <span>Zalo: <strong>0908.123.456</strong></span>
                </a>
                <a
                  href="mailto:info@nasatourist.com"
                  className="flex items-center gap-2.5 p-2.5 rounded-xl bg-white/[0.06] hover:bg-white/[0.12] transition-colors"
                >
                  <Mail className="h-3.5 w-3.5 text-primary" />
                  <span>Email: <strong>info@nasatourist.com</strong></span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Similar / Related Tours */}
        <RelatedTours
          currentTourId={tour.id}
          kind={tour.kind}
          locale={params.locale}
        />
      </div>
    </>
  );
}

