'use client';

import { useState, useEffect } from 'react';
import { Phone, MapPin, ArrowUp, Send } from 'lucide-react';

interface FloatingToolbarProps {
  hotline?: string;
  zalo?: string;
  fanpage?: string;
  mapsUrl?: string;
}

export function FloatingToolbar({
  hotline = '0908123456',
  zalo = '0908123456',
  fanpage = 'https://facebook.com',
  mapsUrl = 'https://maps.google.com',
}: FloatingToolbarProps) {
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const checkScroll = () => setShowBackToTop(window.scrollY > 300);
    window.addEventListener('scroll', checkScroll, { passive: true });
    return () => window.removeEventListener('scroll', checkScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const btn =
    'group relative flex items-center justify-center w-12 h-12 rounded-full bg-brand-ink text-white border border-white/10 transition-all duration-700 ease-fluid hover:scale-[1.04] active:scale-[0.98]';

  const tip =
    'absolute right-full mr-3 hidden sm:block bg-brand-ink text-white text-xs font-medium px-3 py-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700 ease-fluid pointer-events-none whitespace-nowrap border border-white/10';

  return (
    <div className="hidden sm:flex fixed right-6 bottom-6 z-40 flex-col items-center gap-3">
      <a href={`tel:${hotline.replace(/[^0-9]/g, '')}`} className={btn} title="Gọi điện ngay">
        <span className={tip}>Gọi tư vấn</span>
        <Phone className="h-5 w-5" strokeWidth={1.5} />
      </a>

      <a
        href={`https://zalo.me/${zalo.replace(/[^0-9]/g, '')}`}
        target="_blank"
        rel="noopener noreferrer"
        className={btn}
        title="Chat Zalo"
      >
        <span className={tip}>Chat Zalo</span>
        <span className="font-semibold text-[10px] tracking-wide">ZALO</span>
      </a>

      <a href={fanpage} target="_blank" rel="noopener noreferrer" className={btn} title="Facebook">
        <span className={tip}>Fanpage</span>
        <Send className="h-4 w-4" strokeWidth={1.5} />
      </a>

      <a href={mapsUrl} target="_blank" rel="noopener noreferrer" className={btn} title="Chỉ đường">
        <span className={tip}>Chỉ đường</span>
        <MapPin className="h-5 w-5" strokeWidth={1.5} />
      </a>

      {showBackToTop && (
        <button
          onClick={scrollToTop}
          className="group relative flex items-center justify-center w-10 h-10 rounded-full bg-white text-brand-ink border border-sky-100 shadow-soft transition-all duration-700 ease-fluid hover:scale-[1.04] active:scale-[0.98]"
          title="Lên đầu trang"
        >
          <span className="absolute right-full mr-3 bg-brand-ink text-white text-[11px] font-medium px-2 py-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700 ease-fluid pointer-events-none whitespace-nowrap">
            Đầu trang
          </span>
          <ArrowUp className="h-4 w-4" strokeWidth={1.5} />
        </button>
      )}
    </div>
  );
}
