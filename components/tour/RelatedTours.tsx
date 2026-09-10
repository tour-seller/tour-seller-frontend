import { getTours } from '@/lib/strapi';
import { TourCard } from './TourCard';

interface RelatedToursProps {
  currentTourId: number | string;
  kind?: 'domestic' | 'international' | 'hotel';
  locale?: string;
}

export async function RelatedTours({
  currentTourId,
  kind = 'domestic',
  locale = 'vi',
}: RelatedToursProps) {
  const res = await getTours({
    locale,
    kind,
    pageSize: 5,
  });

  const related = (res?.data || []).filter((t) => t.id !== currentTourId).slice(0, 4);

  if (related.length === 0) return null;

  return (
    <section className="mt-16 pt-10 border-t border-slate-200">
      <div className="flex items-center justify-between mb-8">
        <div>
          <span className="text-xs font-bold text-primary uppercase tracking-wider block mb-1">
            Gợi Ý Hành Trình
          </span>
          <h2 className="text-xl md:text-2xl font-black text-slate-900 tracking-tight">
            Chương Trình Tour Tương Tự
          </h2>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {related.map((tour) => (
          <TourCard key={tour.id} tour={tour} locale={locale} />
        ))}
      </div>
    </section>
  );
}
