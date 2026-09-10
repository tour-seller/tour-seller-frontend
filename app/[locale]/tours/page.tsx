import { setRequestLocale } from 'next-intl/server';
import { getTours, getCategoriesL1 } from '@/lib/strapi';
import { Breadcrumb } from '@/components/layout/Breadcrumb';
import { TourCard } from '@/components/tour/TourCard';
import { TourListFilterBar } from '@/components/tour/TourListFilterBar';
import { Pagination } from '@/components/ui/Pagination';
import type { Metadata } from 'next';

interface ToursPageProps {
  params: { locale: string };
  searchParams: {
    page?: string;
    kind?: 'domestic' | 'international';
    category?: string;
    price?: string;
    keyword?: string;
    sort?: string;
  };
}

export const revalidate = 300;

export async function generateMetadata({ params }: ToursPageProps): Promise<Metadata> {
  const isEn = params.locale === 'en';
  return {
    title: isEn ? 'Tour Packages & Travel Itineraries' : 'Chương Trình Tour Du Lịch Trong & Ngoài Nước',
    description: isEn
      ? 'Browse all domestic and international tours from Nasatourist . Best prices, professional guides, full packages.'
      : 'Khám phá tất cả các chương trình tour du lịch trong nước và quốc tế trọn gói giá tốt nhất từ Nasatourist .',
  };
}

export default async function ToursPage({ params, searchParams }: ToursPageProps) {
  setRequestLocale(params.locale);

  const page = Number(searchParams.page) || 1;
  const pageSize = 12;

  let minPrice: number | undefined;
  let maxPrice: number | undefined;
  if (searchParams.price) {
    const parts = searchParams.price.split('-');
    if (parts[0]) minPrice = Number(parts[0]);
    if (parts[1]) maxPrice = Number(parts[1]);
  }

  const [toursRes, categories] = await Promise.all([
    getTours({
      locale: params.locale,
      kind: searchParams.kind,
      categoryL1: searchParams.category,
      minPrice,
      maxPrice,
      keyword: searchParams.keyword,
      sort: searchParams.sort || 'createdAt:desc',
      page,
      pageSize,
    }),
    getCategoriesL1(params.locale),
  ]);

  const tours = toursRes?.data || [];
  const totalPages = toursRes?.meta?.pagination?.pageCount || 1;
  const totalCount = toursRes?.meta?.pagination?.total || tours.length;

  const pageTitle = searchParams.kind === 'international'
    ? 'Tour Du Lịch Quốc Tế'
    : searchParams.kind === 'domestic'
    ? 'Tour Du Lịch Nội Địa'
    : 'Tất Cả Chương Trình Tour';

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <div className="mb-6">
        <Breadcrumb
          items={[
            { label: 'Tour du lịch', href: '/tours' },
            ...(searchParams.kind
              ? [{ label: searchParams.kind === 'domestic' ? 'Tour trong nước' : 'Tour nước ngoài' }]
              : []),
          ]}
        />
      </div>

      {/* Page Header */}
      <div className="mb-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-primary mb-1.5 block">
              {searchParams.kind === 'international' ? 'Du Lịch Năm Châu' : 'Hành Trình Việt Nam'}
            </span>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-black font-display text-slate-900 tracking-tight">
              {pageTitle}
            </h1>
          </div>
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#f5f5f3] border border-black/10 text-primary text-xs font-bold self-start md:self-auto">
            <span>Tìm thấy <strong>{totalCount}</strong> tour sẵn sàng khởi hành</span>
          </div>
        </div>
      </div>

      {/* Top Filter Bar */}
      <TourListFilterBar
        categories={categories}
        initialKind={searchParams.kind || 'domestic'}
        initialCategory={searchParams.category}
        initialPrice={searchParams.price}
        initialKeyword={searchParams.keyword}
      />

      {/* Tour Grid */}
      {tours.length > 0 ? (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {tours.map((tour) => (
              <TourCard key={tour.id} tour={tour} locale={params.locale} />
            ))}
          </div>

          {/* Pagination */}
          <div className="mt-12">
            <Pagination
              current={page}
              total={totalPages}
              baseUrl="/tours"
              queryParams={searchParams}
            />
          </div>
        </>
      ) : (
        <div className="text-center py-20 bg-white rounded-3xl border border-slate-200/80 p-8 my-8 shadow-soft max-w-2xl mx-auto">
          <div className="w-16 h-16 rounded-2xl bg-[#f5f5f3]0/10 text-primary flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
            !
          </div>
          <h3 className="text-xl font-bold font-display text-slate-900 mb-2">
            Không tìm thấy chương trình tour phù hợp
          </h3>
          <p className="text-xs md:text-sm text-slate-500 leading-relaxed max-w-md mx-auto mb-6">
            Rất tiếc chưa tìm thấy tour khớp với tiêu chí bạn đang lọc. Hãy thử đặt lại bộ lọc hoặc xem danh sách tất cả các tour đang có.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <a
              href="/tours"
              className="inline-flex items-center gap-2 bg-brand-ocean text-white text-xs font-extrabold px-6 py-3 rounded-full shadow-lg shadow-black/10 hover:bg-brand-blue hover:scale-105 transition-all"
            >
              Xem Tất Cả Tour
            </a>
            <a
              href="/"
              className="inline-flex items-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold px-6 py-3 rounded-full transition-all"
            >
              Về Trang Chủ
            </a>
          </div>
        </div>
      )}
    </div>
  );
}

