'use client';

import { useLocale } from 'next-intl';
import { usePathname, useRouter } from '@/i18n/routing';

export function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const handleSwitch = (newLocale: 'vi' | 'en') => {
    if (newLocale === locale) return;
    router.replace(pathname, { locale: newLocale });
  };

  return (
    <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-full text-xs font-semibold">
      <button
        onClick={() => handleSwitch('vi')}
        className={`px-2.5 py-1 rounded-full transition-all ${
          locale === 'vi'
            ? 'bg-primary text-white shadow-sm'
            : 'text-slate-600 hover:text-slate-900'
        }`}
        title="Tiếng Việt"
      >
        VN
      </button>
      <button
        onClick={() => handleSwitch('en')}
        className={`px-2.5 py-1 rounded-full transition-all ${
          locale === 'en'
            ? 'bg-primary text-white shadow-sm'
            : 'text-slate-600 hover:text-slate-900'
        }`}
        title="English"
      >
        EN
      </button>
    </div>
  );
}
