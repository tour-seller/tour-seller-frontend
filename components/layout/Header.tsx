'use client';

import { Link } from '@/i18n/routing';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { PhoneCall, Heart, CalendarCheck, User, Sparkles, CreditCard } from 'lucide-react';
import { LanguageSwitcher } from './LanguageSwitcher';

interface HeaderProps {
  hotline?: string;
}

export function Header({ hotline = '0908.123.456' }: HeaderProps) {
  const t = useTranslations('common');

  return (
    <header
      className="header-shell sticky top-0 z-40 w-full bg-white/95 backdrop-blur-md border-b border-sky-100/80"
    >
      {/* Announcement strip — collapses on scroll via CSS */}
      <div className="header-announce bg-brand-deep text-white/70 text-xs py-2 px-4 hidden md:block">
        <div className="container mx-auto flex justify-between items-center">
          <p className="flex items-center gap-2 font-medium tracking-wide">
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-brand-yellow shadow-[0_0_0_4px_rgba(255,209,102,0.15)]" />
            <span className="text-white/75">
              Chào mừng bạn đến với{' '}
              <strong className="text-white font-semibold">CÔNG TY TNHH DU LỊCH NASATOURIST</strong>
            </span>
            <span className="text-white/25">•</span>
            <span className="text-white/60 text-[11px] font-medium flex items-center gap-1">
              <Sparkles className="h-3 w-3 text-brand-yellow" strokeWidth={1.5} /> Giấy phép LHQT số 79-1234/TCDL
            </span>
          </p>
          <div className="flex items-center gap-5 text-[11px]">
            <a
              href={`tel:${hotline.replace(/[^0-9]/g, '')}`}
              className="flex items-center gap-1.5 text-white font-semibold tracking-wide transition-colors duration-700 ease-fluid hover:text-brand-yellow"
            >
              <PhoneCall className="h-3 w-3" strokeWidth={1.5} />
              <span>
                {t('hotline')}: {hotline}
              </span>
            </a>
            <span className="text-white/20">|</span>
            <Link
              href="/payment-info"
              className="flex items-center gap-1 text-white/60 hover:text-white transition-colors duration-700 ease-fluid"
            >
              <CreditCard className="h-3 w-3" strokeWidth={1.5} />
              <span>Hướng dẫn thanh toán</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Main header bar — condenses height on scroll via CSS */}
      <div className="header-main container mx-auto px-4 h-16 md:h-20 flex items-center justify-between gap-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 flex-shrink-0 group">
          <div className="w-10 h-10 md:w-12 md:h-12 rounded-2xl overflow-hidden flex items-center justify-center shadow-[0_10px_24px_-12px_rgba(11,45,66,0.8)] transition-transform duration-700 ease-fluid group-hover:scale-[1.03]">
            <Image
              src="/logo.png"
              alt="Nasatourist Logo"
              width={48}
              height={48}
              className="object-contain w-full h-full"
              priority
            />
          </div>
          <div>
            <div className="flex items-baseline gap-1">
              <span className="text-xl md:text-2xl font-display font-semibold tracking-tight text-brand-deep leading-none">
                NasaTourist
              </span>
              <span className="text-xl md:text-2xl font-display font-medium tracking-tight text-brand-ocean leading-none">

              </span>
            </div>
            <span className="text-[10px] md:text-[11px] text-brand-mute font-medium tracking-[0.14em] uppercase block mt-1">
              Hành trình Việt Nam
            </span>
          </div>
        </Link>

        {/* Desktop right actions */}
        <div className="hidden lg:flex items-center gap-5">
          <div className="flex items-center gap-3 bg-sky-50/80 border border-sky-100 px-4 py-2 rounded-2xl transition-all duration-700 ease-fluid hover:border-brand-blue/30 hover:bg-white">
            <div className="w-9 h-9 rounded-xl bg-brand-coral text-white flex items-center justify-center shadow-[0_8px_18px_-10px_rgba(242,120,92,0.9)]">
              <PhoneCall className="h-4 w-4" strokeWidth={1.5} />
            </div>
            <div>
              <span className="text-[10px] text-brand-ocean/70 font-semibold uppercase tracking-wider block">
                {t('hotline')} 24/7
              </span>
              <a
                href={`tel:${hotline.replace(/[^0-9]/g, '')}`}
                className="text-sm font-semibold text-brand-deep hover:text-brand-coral transition-colors duration-700 ease-fluid block leading-tight tracking-tight"
              >
                {hotline}
              </a>
            </div>
          </div>

          <Link
            href="/tours"
            className="flex items-center gap-2 px-3 py-2 rounded-xl text-slate-700 hover:text-brand-ocean hover:bg-sky-50 transition-all duration-700 ease-fluid text-xs font-semibold"
            title={t('bookedTours')}
          >
            <div className="relative">
              <CalendarCheck className="h-4 w-4 text-slate-500" strokeWidth={1.5} />
              <span className="absolute -top-1.5 -right-2 bg-brand-coral text-white text-[9px] font-bold rounded-full w-3.5 h-3.5 flex items-center justify-center">
                0
              </span>
            </div>
            <span>{t('bookedTours')}</span>
          </Link>

          <Link
            href="/favorite-tour"
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-slate-700 hover:text-brand-ocean hover:bg-sky-50 transition-all duration-700 ease-fluid text-xs font-semibold"
            title={t('favoriteTours')}
          >
            <Heart className="h-4 w-4 text-slate-500" strokeWidth={1.5} />
            <span>{t('favoriteTours')}</span>
          </Link>

          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-sky-50 border border-sky-100 text-xs font-medium text-slate-700">
            <User className="h-3.5 w-3.5 text-slate-500" strokeWidth={1.5} />
            <span className="hover:text-brand-ocean cursor-pointer transition-colors duration-700 ease-fluid">{t('login')}</span>
            <span className="text-slate-300">/</span>
            <span className="hover:text-brand-ocean cursor-pointer transition-colors duration-700 ease-fluid">{t('register')}</span>
          </div>

          <div className="pl-1 border-l border-black/[0.08]">
            <LanguageSwitcher />
          </div>
        </div>

        {/* Mobile quick actions */}
        <div className="flex items-center gap-2 lg:hidden">
          <LanguageSwitcher />
          <Link
            href="/favorite-tour"
            className="w-9 h-9 rounded-xl flex items-center justify-center bg-sky-50 text-slate-600 hover:text-brand-ocean transition-colors duration-700 ease-fluid"
            title="Tour yêu thích"
          >
            <Heart className="h-4 w-4" strokeWidth={1.5} />
          </Link>
          <a
            href={`tel:${hotline.replace(/[^0-9]/g, '')}`}
            className="w-9 h-9 rounded-xl flex items-center justify-center bg-brand-coral text-white shadow-[0_8px_18px_-10px_rgba(242,120,92,0.9)]"
            title="Gọi ngay"
          >
            <PhoneCall className="h-4 w-4" strokeWidth={1.5} />
          </a>
        </div>
      </div>
    </header>
  );
}
