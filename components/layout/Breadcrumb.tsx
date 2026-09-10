import { Fragment } from 'react';
import { Link } from '@/i18n/routing';
import { Home, ChevronRight } from 'lucide-react';

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

export function Breadcrumb({ items }: { items: BreadcrumbItem[] }) {
  return (
    <nav aria-label="Breadcrumb" className="py-3.5 mb-2">
      <ol className="flex flex-wrap items-center gap-1.5 text-xs md:text-sm text-slate-500">
        <li>
          <Link
            href="/"
            className="flex items-center gap-1 hover:text-primary transition-colors font-medium"
          >
            <Home className="h-3.5 w-3.5" />
            <span>Trang chủ</span>
          </Link>
        </li>
        {items.map((item, idx) => (
          <Fragment key={idx}>
            <li aria-hidden="true" className="text-slate-300">
              <ChevronRight className="h-3.5 w-3.5" />
            </li>
            <li>
              {item.href ? (
                <Link
                  href={item.href as any}
                  className="hover:text-primary transition-colors font-medium"
                >
                  {item.label}
                </Link>
              ) : (
                <span className="text-slate-800 font-semibold line-clamp-1 max-w-[200px] md:max-w-md">
                  {item.label}
                </span>
              )}
            </li>
          </Fragment>
        ))}
      </ol>
    </nav>
  );
}
