import Image from 'next/image';
import { Link } from '@/i18n/routing';
import { getStrapiMediaUrl } from '@/lib/utils';
import type { Tag } from '@tour-seller/types';

interface PopularTagsBarProps {
  tags?: Tag[];
}

export function PopularTagsBar({ tags = [] }: PopularTagsBarProps) {
  const items = tags.length > 0 ? tags : [
    { id: 1, name: 'Hạ Long', slug: 'ha-long', thumbnail: { url: 'https://images.pexels.com/photos/18501642/pexels-photo-18501642.jpeg?auto=compress&cs=tinysrgb&w=300' } },
    { id: 2, name: 'Đà Nẵng', slug: 'da-nang', thumbnail: { url: 'https://images.pexels.com/photos/33929115/pexels-photo-33929115.jpeg?auto=compress&cs=tinysrgb&w=300' } },
    { id: 3, name: 'Hội An', slug: 'hoi-an', thumbnail: { url: 'https://images.pexels.com/photos/20593364/pexels-photo-20593364.jpeg?auto=compress&cs=tinysrgb&w=300' } },
    { id: 4, name: 'Sapa', slug: 'sapa', thumbnail: { url: 'https://images.pexels.com/photos/38843230/pexels-photo-38843230.jpeg?auto=compress&cs=tinysrgb&w=300' } },
    { id: 5, name: 'Ninh Bình', slug: 'ninh-binh', thumbnail: { url: 'https://images.pexels.com/photos/2166559/pexels-photo-2166559.jpeg?auto=compress&cs=tinysrgb&w=300' } },
    { id: 6, name: 'Hang động', slug: 'hang-dong', thumbnail: { url: 'https://images.pexels.com/photos/37888321/pexels-photo-37888321.jpeg?auto=compress&cs=tinysrgb&w=300' } },
    { id: 7, name: 'Phú Quốc', slug: 'phu-quoc', thumbnail: { url: 'https://images.pexels.com/photos/2387873/pexels-photo-2387873.jpeg?auto=compress&cs=tinysrgb&w=300' } },
    { id: 8, name: 'Hà Nội', slug: 'ha-noi', thumbnail: { url: 'https://images.pexels.com/photos/2161449/pexels-photo-2161449.jpeg?auto=compress&cs=tinysrgb&w=300' } },
  ];

  return (
    <div className="bg-white/95 border-b border-sky-100 py-3.5">
      <div className="container mx-auto px-4">
        <div className="flex items-center gap-3 overflow-x-auto pb-1.5 scrollbar-none">
          <div className="flex items-center gap-1.5 text-[10px] font-semibold text-brand-ocean uppercase tracking-[0.16em] whitespace-nowrap pl-1 pr-2 border-r border-sky-100 flex-shrink-0">
            <span>Điểm đến</span>
          </div>
          {items.map((tag: any) => {
            const imgUrl = tag.thumbnail?.url
              ? getStrapiMediaUrl(tag.thumbnail.url)
              : (tag.photo?.url ? getStrapiMediaUrl(tag.photo.url) : 'https://images.pexels.com/photos/18501642/pexels-photo-18501642.jpeg?auto=compress&cs=tinysrgb&w=300');

            return (
              <Link
                key={tag.id}
                href={`/tours?keyword=${encodeURIComponent(tag.name)}`}
                className="group flex items-center gap-2 bg-sky-50/80 hover:bg-brand-ocean hover:text-white border border-sky-100 hover:border-brand-ocean px-3.5 py-1.5 rounded-full transition-all duration-700 ease-fluid flex-shrink-0 active:scale-[0.98]"
              >
                <div className="relative w-5 h-5 rounded-full overflow-hidden bg-slate-200 flex-shrink-0 ring-1 ring-white shadow-inner">
                  <Image
                    src={imgUrl}
                    alt={tag.name}
                    fill
                    sizes="20px"
                    className="object-cover group-hover:scale-120 transition-transform duration-300"
                  />
                </div>
                <span className="text-xs font-bold text-brand-deep group-hover:text-white whitespace-nowrap transition-colors duration-700 ease-fluid">
                  {tag.name}
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
