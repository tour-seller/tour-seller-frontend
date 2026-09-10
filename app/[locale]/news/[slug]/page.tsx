import { setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { Breadcrumb } from '@/components/layout/Breadcrumb';
import { getArticleBySlug, getArticles } from '@/lib/strapi';
import { NewsCard } from '@/components/news/NewsCard';
import { formatDate, getStrapiMediaUrl } from '@/lib/utils';
import { Calendar, Eye, Share2, MessageCircle, Clock } from 'lucide-react';
import type { Metadata } from 'next';

interface NewsDetailPageProps {
  params: { locale: string; slug: string };
}

export const revalidate = 300;

export async function generateMetadata({ params }: NewsDetailPageProps): Promise<Metadata> {
  const article = await getArticleBySlug(params.slug, params.locale);
  if (!article) return { title: 'Bài Viết Không Tồn Tại' };

  return {
    title: article.seo?.metaTitle || article.name,
    description: article.seo?.metaDescription || article.summary || article.name,
    openGraph: {
      title: article.name,
      description: article.summary,
      images: article.thumbnail?.url ? [{ url: getStrapiMediaUrl(article.thumbnail.url) }] : [],
    },
  };
}

export default async function NewsDetailPage({ params }: NewsDetailPageProps) {
  setRequestLocale(params.locale);

  const article = await getArticleBySlug(params.slug, params.locale);
  if (!article) notFound();

  // Fetch 3 related articles
  const relatedRes = await getArticles({
    locale: params.locale,
    kind: article.kind,
    pageSize: 4,
  });

  const related = (relatedRes?.data || []).filter((a) => a.id !== article.id).slice(0, 3);
  const imgUrl = getStrapiMediaUrl(article.thumbnail?.url);

  return (
    <div className="container mx-auto px-4 py-6">
      <Breadcrumb
        items={[
          { label: 'Tin tức & Cẩm nang', href: '/news' },
          { label: article.name },
        ]}
      />

      <article className="max-w-4xl mx-auto bg-white rounded-3xl p-6 md:p-10 border border-slate-200/80 shadow-sm mb-12">
        {/* Meta info */}
        <div className="flex items-center gap-4 text-xs text-slate-400 mb-3">
          <span className="flex items-center gap-1">
            <Calendar className="h-3.5 w-3.5 text-primary" />
            <span>{formatDate(article.publishedAt, params.locale)}</span>
          </span>
          <span>•</span>
          <span className="flex items-center gap-1">
            <Clock className="h-3.5 w-3.5" />
            <span>5 phút đọc</span>
          </span>
        </div>

        {/* Title */}
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-900 tracking-tight leading-tight mb-6">
          {article.name}
        </h1>

        {/* Summary */}
        {article.summary && (
          <p className="text-sm md:text-base text-slate-600 font-medium italic border-l-4 border-primary pl-4 py-1 mb-8 bg-[#f5f5f3] rounded-r-xl">
            {article.summary}
          </p>
        )}

        {/* Featured Image */}
        {imgUrl && (
          <div className="relative aspect-[16/9] rounded-2xl overflow-hidden mb-8 shadow-md bg-slate-100">
            <Image
              src={imgUrl}
              alt={article.name}
              fill
              priority
              className="object-cover"
            />
          </div>
        )}

        {/* Rich HTML Content */}
        {article.content ? (
          <div
            className="baonoidung text-sm md:text-base text-slate-700 leading-relaxed"
            dangerouslySetInnerHTML={{ __html: article.content }}
          />
        ) : (
          <p className="text-slate-500 text-sm leading-relaxed">
            Nội dung bài viết đang được đội ngũ biên tập viên Nasatourist cập nhật. Quý khách vui lòng quay lại sau.
          </p>
        )}

        {/* Social Share Bar */}
        <div className="mt-10 pt-6 border-t border-slate-100 flex flex-wrap items-center justify-between gap-4">
          <span className="text-xs font-bold text-slate-700 flex items-center gap-2">
            <Share2 className="h-4 w-4 text-primary" />
            <span>Chia sẻ bài viết này:</span>
          </span>

          <div className="flex items-center gap-2">
            <a
              href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
                typeof window !== 'undefined' ? window.location.href : ''
              )}`}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-600 text-white text-xs font-semibold hover:bg-blue-700 transition-colors"
            >
              <svg className="h-3.5 w-3.5 fill-current" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
              <span>Facebook</span>
            </a>
            <a
              href={`https://zalo.me/share`}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-sky-500 text-white text-xs font-semibold hover:bg-sky-600 transition-colors"
            >
              <MessageCircle className="h-3.5 w-3.5" />
              <span>Zalo</span>
            </a>
          </div>
        </div>
      </article>

      {/* Related Articles */}
      {related.length > 0 && (
        <div className="max-w-4xl mx-auto mb-16">
          <h3 className="text-lg md:text-xl font-bold text-slate-900 mb-6">
            Bài Viết Liên Quan Khác
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {related.map((art) => (
              <NewsCard key={art.id} article={art} locale={params.locale} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
