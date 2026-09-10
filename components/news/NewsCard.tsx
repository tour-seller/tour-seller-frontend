import Image from 'next/image';
import { Link } from '@/i18n/routing';
import { Calendar, ArrowRight } from 'lucide-react';
import { formatDate, getStrapiMediaUrl } from '@/lib/utils';
import { pickVietnamImage } from '@/lib/pexels-vietnam';
import type { Article } from '@tour-seller/types';

interface NewsCardProps {
  article: Article;
  locale?: string;
}

export function NewsCard({ article, locale = 'vi' }: NewsCardProps) {
  const imgUrl = article.thumbnail?.url
    ? getStrapiMediaUrl(article.thumbnail.url)
    : pickVietnamImage(article.name || article.id, 'card');

  return (
    <Link
      href={`/news/${article.slug}` as any}
      className="group bg-white rounded-2xl overflow-hidden border border-slate-200/80 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col justify-between"
    >
      <div>
        <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
          <Image
            src={imgUrl}
            alt={article.name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>

        <div className="p-5">
          <span className="text-[11px] text-slate-400 font-semibold flex items-center gap-1 mb-2">
            <Calendar className="h-3 w-3 text-primary" />
            <span>{formatDate(article.publishedAt, locale)}</span>
          </span>

          <h3 className="font-bold text-sm md:text-base text-slate-800 group-hover:text-primary transition-colors line-clamp-2 mb-2 leading-snug">
            {article.name}
          </h3>

          {article.summary && (
            <p className="text-xs text-slate-500 line-clamp-3 leading-relaxed">
              {article.summary}
            </p>
          )}
        </div>
      </div>

      <div className="px-5 pb-4">
        <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-primary">
          <span>Đọc bài viết</span>
          <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
        </div>
      </div>
    </Link>
  );
}
