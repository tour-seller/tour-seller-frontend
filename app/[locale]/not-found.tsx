import { Link } from '@/i18n/routing';
import { Compass, Home } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="container mx-auto px-4 py-24 text-center">
      <div className="max-w-md mx-auto space-y-5">
        <div className="w-20 h-20 rounded-3xl bg-slate-100 text-primary flex items-center justify-center mx-auto text-3xl font-black shadow-inner">
          404
        </div>
        <h1 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight">
          Trang Bạn Tìm Kiếm Không Tồn Tại
        </h1>
        <p className="text-xs md:text-sm text-slate-500 leading-relaxed">
          Đường dẫn có thể đã bị thay đổi hoặc không còn hoạt động. Hãy quay về trang chủ hoặc khám phá các chương trình tour hấp dẫn khác cùng Nasatourist .
        </p>
        <div className="flex items-center justify-center gap-3 pt-2">
          <Link
            href="/"
            className="inline-flex items-center gap-2 bg-primary hover:bg-brand-ocean text-white text-xs font-bold px-6 py-2.5 rounded-full transition-colors shadow"
          >
            <Home className="h-4 w-4" />
            <span>Về trang chủ</span>
          </Link>
          <Link
            href="/tours"
            className="inline-flex items-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold px-6 py-2.5 rounded-full transition-colors"
          >
            <Compass className="h-4 w-4" />
            <span>Xem tour hot</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
