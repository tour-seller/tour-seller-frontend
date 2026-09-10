import { setRequestLocale } from 'next-intl/server';
import { Breadcrumb } from '@/components/layout/Breadcrumb';
import { getArticles } from '@/lib/strapi';
import { NewsCard } from '@/components/news/NewsCard';
import { Pagination } from '@/components/ui/Pagination';
import { Link } from '@/i18n/routing';
import type { Metadata } from 'next';

interface NewsPageProps {
  params: { locale: string };
  searchParams: {
    kind?: string;
    page?: string;
  };
}

export const revalidate = 300;

export async function generateMetadata({ params, searchParams }: NewsPageProps): Promise<Metadata> {
  const isGuide = searchParams.kind === 'cam-nang-du-lich';
  return {
    title: isGuide ? 'Cẩm Nang & Kinh Nghiệm Du Lịch' : 'Tin Tức & Sự Kiện Du Lịch',
    description: 'Cập nhật tin tức du lịch, kinh nghiệm tham quan, thủ tục xuất nhập cảnh và chương trình ưu đãi mới nhất từ Nasatourist.',
  };
}

export default async function NewsPage({ params, searchParams }: NewsPageProps) {
  setRequestLocale(params.locale);

  const page = Number(searchParams.page) || 1;
  const kind = searchParams.kind;

  const res = await getArticles({
    locale: params.locale,
    kind,
    page,
    pageSize: 9,
  });

  const articles = res?.data || [];
  const totalPages = res?.meta?.pagination?.pageCount || 1;

  const categories = [
    { key: '', label: 'Tất cả bài viết' },
    { key: 'tin-tuc', label: 'Tin tức & sự kiện' },
    { key: 'cam-nang-du-lich', label: 'Cẩm nang du lịch' },
    { key: 'dich-vu-visa', label: 'Thủ tục Visa' },
    { key: 'tour-khach-doan', label: 'Tour đoàn & MICE' },
  ];

  return (
    <div className="container mx-auto px-4 py-6">
      <Breadcrumb
        items={[
          { label: 'Tin tức & Cẩm nang', href: '/news' },
          ...(kind ? [{ label: categories.find((c) => c.key === kind)?.label || kind }] : []),
        ]}
      />

      <div className="mb-8">
        <h1 className="text-2xl md:text-4xl font-black text-slate-900 tracking-tight mb-2">
          Tin Tức & Cẩm Nang Du Lịch
        </h1>
        <p className="text-xs md:text-sm text-slate-500">
          Chia sẻ kinh nghiệm du lịch, hướng dẫn hành trình và những thông tin mới nhất từ Nasatourist .
        </p>
      </div>

      {/* Category Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-8 scrollbar-none text-xs font-bold">
        {categories.map((cat) => {
          const isActive = (kind || '') === cat.key;
          return (
            <Link
              key={cat.key}
              href={(cat.key ? `/news?kind=${cat.key}` : '/news') as any}
              className={`px-4 py-2 rounded-full transition-all whitespace-nowrap ${
                isActive
                  ? 'bg-primary text-white shadow-md shadow-black/10'
                  : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
              }`}
            >
              {cat.label}
            </Link>
          );
        })}
      </div>

      {/* Articles Grid */}
      {articles.length > 0 ? (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {articles.map((art) => (
              <NewsCard key={art.id} article={art} locale={params.locale} />
            ))}
          </div>

          <Pagination
            current={page}
            total={totalPages}
            baseUrl="/news"
            queryParams={searchParams}
          />
        </>
      ) : (
        <div className="text-center py-16 bg-white rounded-2xl border border-slate-200 text-slate-400 text-sm">
          Chưa có bài viết nào cho chuyên mục này.
        </div>
      )}
    </div>
  );
}
