'use client';

import { useState } from 'react';
import { Link, useRouter } from '@/i18n/routing';
import { useTranslations } from 'next-intl';
import {
  MapPin,
  Globe,
  Users,
  FileCheck2,
  MoreHorizontal,
  Hotel,
  Plane,
  Camera,
  Flag,
  CalendarDays,
  Info,
  Newspaper,
  Headphones,
  Search,
  ChevronDown,
  Menu as MenuIcon,
  X,
  PhoneCall,
  Mail,
} from 'lucide-react';

export function MainMenu() {
  const t = useTranslations('common');
  const router = useRouter();
  const [keyword, setKeyword] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [domesticOpen, setDomesticOpen] = useState(false);
  const [intlOpen, setIntlOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (keyword.trim()) {
      router.push(`/tours?keyword=${encodeURIComponent(keyword.trim())}`);
      setMobileMenuOpen(false);
    }
  };

  return (
    <>
      {/* ── Desktop floating nav ── */}
      <div className="main-menu-sticky sticky z-30 bg-brand-deep/95 text-white border-b border-white/10 shadow-[0_16px_34px_-24px_rgba(11,45,66,0.8)] backdrop-blur-md hidden lg:block">
        <div className="container mx-auto px-4 flex items-center justify-between">
          <nav className="flex items-center text-xs font-bold tracking-wide">
            <Link
              href="/"
              className="py-3 px-3.5 hover:bg-white/10 hover:text-white transition-all duration-700 ease-fluid flex items-center gap-1.5 rounded-xl my-1 mx-0.5"
            >
              <span>{t('home')}</span>
            </Link>

            <div className="relative group">
              <Link
                href="/about"
                className="py-3 px-3.5 hover:bg-white/10 hover:text-white transition-all duration-700 ease-fluid flex items-center gap-1 rounded-xl my-1 mx-0.5"
              >
                <Info className="h-3.5 w-3.5 text-sky-300" />
                <span>Giới thiệu</span>
                <ChevronDown className="h-3.5 w-3.5 text-slate-400 group-hover:rotate-180 transition-transform duration-200" />
              </Link>
              <div className="absolute top-full left-0 w-60 bg-white text-slate-800 rounded-2xl shadow-[0_20px_45px_rgba(10,37,64,0.18)] border border-slate-100 p-2 hidden group-hover:block transition-all animate-fade-in z-50">
                <Link href="/about" className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl hover:bg-slate-50 hover:text-primary transition-colors text-xs font-semibold">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary inline-block" />
                  <span>Về Nasatourist </span>
                </Link>
                <Link href="/payment-info" className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl hover:bg-slate-50 hover:text-primary transition-colors text-xs font-semibold">
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-300 inline-block" />
                  <span>Hướng dẫn thanh toán</span>
                </Link>
                <Link href="/contact" className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl hover:bg-slate-50 hover:text-primary transition-colors text-xs font-semibold">
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-300 inline-block" />
                  <span>Thông tin liên hệ & Hỗ trợ</span>
                </Link>
              </div>
            </div>

            <div className="relative group">
              <Link
                href="/tours?kind=domestic"
                className="py-3 px-3.5 hover:bg-white/10 hover:text-white transition-all flex items-center justify-between gap-1.5 rounded-lg my-1 mx-0.5"
              >
                <span className="flex items-center gap-1.5 min-w-0">
                  <MapPin className="h-3.5 w-3.5 shrink-0 text-brand-yellow" strokeWidth={1.8} aria-hidden="true" />
                  <span>Trong nước</span>
                </span>
                <ChevronDown className="h-3.5 w-3.5 text-white/60 group-hover:rotate-180 group-hover:text-white transition-all duration-200" />
              </Link>
              <div className="absolute top-full left-0 w-72 bg-white text-slate-800 rounded-2xl shadow-[0_20px_45px_rgba(10,37,64,0.18)] border border-slate-100 p-2.5 hidden group-hover:block transition-all animate-fade-in z-50">
                <Link href="/tours?kind=domestic" className="flex items-center justify-between px-3.5 py-2.5 rounded-xl bg-slate-100 text-primary font-bold text-xs mb-1 hover:bg-slate-100/80 transition-colors">
                  <span>Tất cả tour nội địa</span>
                  <span className="text-[10px] bg-primary text-white px-2 py-0.5 rounded-full">Hot</span>
                </Link>
                <div className="space-y-0.5">
                  <Link href="/tours?kind=domestic&keyword=Mien+Bac" className="block px-3.5 py-2 rounded-xl hover:bg-slate-50 hover:text-primary transition-colors text-xs font-medium text-slate-700">Du lịch Miền Bắc (Hà Nội, Hạ Long, Sapa)</Link>
                  <Link href="/tours?kind=domestic&keyword=Mien+Trung" className="block px-3.5 py-2 rounded-xl hover:bg-slate-50 hover:text-primary transition-colors text-xs font-medium text-slate-700">Du lịch Miền Trung (Đà Nẵng, Hội An, Huế)</Link>
                  <Link href="/tours?kind=domestic&keyword=Mien+Tay" className="block px-3.5 py-2 rounded-xl hover:bg-slate-50 hover:text-primary transition-colors text-xs font-medium text-slate-700">Du lịch Miền Tây (Cần Thơ, Bến Tre, Cà Mau)</Link>
                  <Link href="/tours?kind=domestic&keyword=Tay+Nguyen" className="block px-3.5 py-2 rounded-xl hover:bg-slate-50 hover:text-primary transition-colors text-xs font-medium text-slate-700">Du lịch Tây Nguyên (Đà Lạt, Buôn Ma Thuột)</Link>
                  <Link href="/tours?kind=domestic&keyword=Phu+Quoc" className="block px-3.5 py-2 rounded-xl hover:bg-slate-50 hover:text-primary transition-colors text-xs font-medium text-slate-700">Du lịch Biển Đảo (Phú Quốc, Côn Đảo)</Link>
                </div>
              </div>
            </div>

            <div className="relative group">
              <Link
                href="/tours?kind=international"
                className="py-3 px-3.5 hover:bg-white/10 hover:text-white transition-all flex items-center gap-1.5 rounded-lg my-1 mx-0.5"
              >
                <Globe className="h-3.5 w-3.5 text-slate-400" />
                <span>Quốc tế</span>
                <ChevronDown className="h-3.5 w-3.5 ml-auto text-white/60 group-hover:rotate-180 group-hover:text-white transition-all duration-200" />
              </Link>
              <div className="absolute top-full left-0 w-72 bg-white text-slate-800 rounded-2xl shadow-[0_20px_45px_rgba(10,37,64,0.18)] border border-slate-100 p-2.5 hidden group-hover:block transition-all animate-fade-in z-50">
                <Link href="/tours?kind=international" className="flex items-center justify-between px-3.5 py-2.5 rounded-xl bg-slate-100 text-primary font-bold text-xs mb-1 hover:bg-slate-100/80 transition-colors">
                  <span>Tất cả tour quốc tế</span>
                  <span className="text-[10px] bg-primary text-white px-2 py-0.5 rounded-full">Xu hướng</span>
                </Link>
                <div className="space-y-0.5">
                  <Link href="/tours?kind=international&keyword=Dong+Nam+A" className="block px-3.5 py-2 rounded-xl hover:bg-slate-50 hover:text-primary transition-colors text-xs font-medium text-slate-700">Đông Nam Á (Thái Lan, Singapore, Malaysia)</Link>
                  <Link href="/tours?kind=international&keyword=Dong+Bac+A" className="block px-3.5 py-2 rounded-xl hover:bg-slate-50 hover:text-primary transition-colors text-xs font-medium text-slate-700">Đông Bắc Á (Nhật Bản, Hàn Quốc, Đài Loan)</Link>
                  <Link href="/tours?kind=international&keyword=Chau+Au" className="block px-3.5 py-2 rounded-xl hover:bg-slate-50 hover:text-primary transition-colors text-xs font-medium text-slate-700">Châu Âu (Pháp, Thụy Sĩ, Ý, Đức)</Link>
                  <Link href="/tours?kind=international&keyword=Chau+Uc" className="block px-3.5 py-2 rounded-xl hover:bg-slate-50 hover:text-primary transition-colors text-xs font-medium text-slate-700">Châu Úc (Úc, New Zealand)</Link>
                </div>
              </div>
            </div>

            <Link href="/news?kind=tour-khach-doan" className="py-3 px-3.5 hover:bg-white/10 hover:text-white transition-all flex items-center gap-1.5 rounded-lg my-1 mx-0.5">
              <Users className="h-3.5 w-3.5 text-sky-400" />
              <span>Đoàn</span>
            </Link>

            <Link href="/news?kind=dich-vu-visa" className="py-3 px-3.5 hover:bg-white/10 hover:text-white transition-all flex items-center gap-1.5 rounded-lg my-1 mx-0.5">
              <FileCheck2 className="h-3.5 w-3.5 text-slate-400" />
              <span>Visa</span>
            </Link>

            <div className="relative group">
              <button className="py-3 px-3.5 hover:bg-white/10 hover:text-white transition-all flex items-center gap-1 rounded-lg my-1 mx-0.5">
                <MoreHorizontal className="h-3.5 w-3.5 text-slate-400" />
                <span>Dịch vụ</span>
                <ChevronDown className="h-3.5 w-3.5 text-slate-400 group-hover:rotate-180 transition-transform duration-200" />
              </button>
              <div className="absolute top-full left-0 w-64 bg-white text-slate-800 rounded-2xl shadow-[0_20px_45px_rgba(10,37,64,0.18)] border border-slate-100 p-2 hidden group-hover:block transition-all animate-fade-in z-50">
                <Link href="/hotels" className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl hover:bg-slate-50 hover:text-primary transition-colors text-xs font-semibold text-slate-700">
                  <div className="w-6 h-6 rounded-lg bg-slate-100 text-primary flex items-center justify-center flex-shrink-0"><Hotel className="h-3.5 w-3.5" /></div>
                  <span>{t('hotels')}</span>
                </Link>
                <Link href="/news?kind=ve-may-bay" className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl hover:bg-slate-50 hover:text-primary transition-colors text-xs font-semibold text-slate-700">
                  <div className="w-6 h-6 rounded-lg bg-sky-100 text-sky-600 flex items-center justify-center flex-shrink-0"><Plane className="h-3.5 w-3.5" /></div>
                  <span>{t('flightTickets')}</span>
                </Link>
                <Link href="/news?kind=cho-thue-xe" className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl hover:bg-slate-50 hover:text-primary transition-colors text-xs font-semibold text-slate-700">
                  <div className="w-6 h-6 rounded-lg bg-slate-100 text-slate-600 flex items-center justify-center flex-shrink-0"><Camera className="h-3.5 w-3.5" /></div>
                  <span>{t('carRentalMemories')}</span>
                </Link>
                <Link href="/news?kind=teambuilding" className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl hover:bg-slate-50 hover:text-primary transition-colors text-xs font-semibold text-slate-700">
                  <div className="w-6 h-6 rounded-lg bg-indigo-100 text-indigo-600 flex items-center justify-center flex-shrink-0"><Flag className="h-3.5 w-3.5" /></div>
                  <span>{t('teambuilding')}</span>
                </Link>
                <Link href="/news?kind=to-chuc-su-kien" className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl hover:bg-slate-50 hover:text-primary transition-colors text-xs font-semibold text-slate-700">
                  <div className="w-6 h-6 rounded-lg bg-slate-100 text-slate-600 flex items-center justify-center flex-shrink-0"><CalendarDays className="h-3.5 w-3.5" /></div>
                  <span>{t('eventOrganization')}</span>
                </Link>
              </div>
            </div>

            <Link href="/news" title="Tin tức và cẩm nang" className="py-3 px-3.5 hover:bg-white/10 hover:text-white transition-all duration-700 ease-fluid flex items-center justify-center gap-1.5 rounded-xl my-1 mx-0.5">
              <Newspaper className="h-3.5 w-3.5 text-sky-300" />
              <span>{t('news')}</span>
            </Link>

            <Link href="/contact" title="Liên hệ và hỗ trợ" className="py-3 px-3.5 hover:bg-white/10 hover:text-white transition-all duration-700 ease-fluid flex items-center justify-center gap-1.5 rounded-xl my-1 mx-0.5">
              <Headphones className="h-3.5 w-3.5 text-brand-yellow" />
              <span>{t('contact')}</span>
            </Link>
          </nav>

          <form onSubmit={handleSearch} className="relative py-2 w-48 sm:w-60">
            <input
              type="text"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              placeholder={t('keywordPlaceholder')}
              className="w-full bg-slate-900/60 border border-white/15 text-white placeholder-slate-400 text-xs rounded-full pl-4 pr-9 py-2 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/30 focus:bg-slate-900/90 transition-all shadow-inner"
            />
            <button
              type="submit"
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-primary transition-colors p-1"
              title={t('search')}
            >
              <Search className="h-4 w-4" />
            </button>
          </form>
        </div>
      </div>

      {/* ── Mobile: hamburger trigger bar ── */}
      <div className="main-menu-mobile lg:hidden sticky z-30 bg-brand-deep/95 text-white border-b border-white/10 shadow-[0_16px_34px_-24px_rgba(11,45,66,0.8)] backdrop-blur-md">
        <div className="container mx-auto px-4 flex items-center justify-between">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="flex items-center gap-2 py-3 px-3 -ml-1 text-xs font-bold uppercase tracking-wider text-slate-200 hover:text-white transition-colors"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="h-5 w-5 text-white" /> : <MenuIcon className="h-5 w-5" />}
            <span>MENU DU LỊCH</span>
          </button>

          <form onSubmit={handleSearch} className="relative py-2 w-40">
            <input
              type="text"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              placeholder={t('keywordPlaceholder')}
              className="w-full bg-slate-900/60 border border-white/15 text-white placeholder-slate-400 text-xs rounded-full pl-3 pr-8 py-1.5 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/30 transition-all shadow-inner"
            />
            <button type="submit" className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white p-0.5" title={t('search')}>
              <Search className="h-3.5 w-3.5" />
            </button>
          </form>
        </div>
      </div>

      {/* ── Mobile: slide-down drawer (NOT sticky) ── */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-brand-deep text-white px-4 py-5 space-y-3 animate-fade-in text-sm font-semibold shadow-2xl">
          <Link href="/" onClick={() => setMobileMenuOpen(false)} className="flex items-center justify-between py-2.5 px-3 rounded-xl bg-white/5 hover:bg-white/10 text-slate-100 hover:text-white transition-colors">
            <span>{t('home')}</span>
            <span className="text-xs text-slate-500">Trang chủ</span>
          </Link>

          <Link href="/about" onClick={() => setMobileMenuOpen(false)} className="flex items-center justify-between py-2.5 px-3 rounded-xl bg-white/5 hover:bg-white/10 text-slate-100 hover:text-white transition-colors">
            <span>{t('about')}</span>
            <span className="text-xs text-slate-500">Giới thiệu</span>
          </Link>

          <div className="bg-white/5 rounded-2xl overflow-hidden p-1">
            <div onClick={() => setDomesticOpen(!domesticOpen)} className="flex justify-between items-center py-2.5 px-3 cursor-pointer text-slate-100 hover:text-white transition-colors">
              <span className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-primary" />
                <span>{t('domesticTours')}</span>
              </span>
              <ChevronDown className={`h-4 w-4 text-slate-400 transition-transform duration-200 ${domesticOpen ? 'rotate-180 text-primary' : ''}`} />
            </div>
            {domesticOpen && (
              <div className="pl-3 pr-2 py-2 space-y-1.5 bg-black/20 rounded-xl my-1 text-xs">
                <Link href="/tours?kind=domestic" onClick={() => setMobileMenuOpen(false)} className="block py-1.5 px-2.5 rounded-lg bg-primary/20 text-primary font-bold">Tất cả tour nội địa</Link>
                <Link href="/tours?kind=domestic&keyword=Mien+Bac" onClick={() => setMobileMenuOpen(false)} className="block py-1.5 px-2.5 rounded-lg text-slate-300 hover:text-white hover:bg-white/5 transition-colors">Du lịch Miền Bắc</Link>
                <Link href="/tours?kind=domestic&keyword=Mien+Trung" onClick={() => setMobileMenuOpen(false)} className="block py-1.5 px-2.5 rounded-lg text-slate-300 hover:text-white hover:bg-white/5 transition-colors">Du lịch Miền Trung</Link>
                <Link href="/tours?kind=domestic&keyword=Mien+Tay" onClick={() => setMobileMenuOpen(false)} className="block py-1.5 px-2.5 rounded-lg text-slate-300 hover:text-white hover:bg-white/5 transition-colors">Du lịch Miền Tây</Link>
                <Link href="/tours?kind=domestic&keyword=Tay+Nguyen" onClick={() => setMobileMenuOpen(false)} className="block py-1.5 px-2.5 rounded-lg text-slate-300 hover:text-white hover:bg-white/5 transition-colors">Du lịch Tây Nguyên & Biển Đảo</Link>
              </div>
            )}
          </div>

          <div className="bg-white/5 rounded-2xl overflow-hidden p-1">
            <div onClick={() => setIntlOpen(!intlOpen)} className="flex justify-between items-center py-2.5 px-3 cursor-pointer text-slate-100 hover:text-white transition-colors">
              <span className="flex items-center gap-2">
                <Globe className="h-4 w-4 text-slate-400" />
                <span>{t('internationalTours')}</span>
              </span>
              <ChevronDown className={`h-4 w-4 text-slate-400 transition-transform duration-200 ${intlOpen ? 'rotate-180 text-primary' : ''}`} />
            </div>
            {intlOpen && (
              <div className="pl-3 pr-2 py-2 space-y-1.5 bg-black/20 rounded-xl my-1 text-xs">
                <Link href="/tours?kind=international" onClick={() => setMobileMenuOpen(false)} className="block py-1.5 px-2.5 rounded-lg bg-primary/20 text-primary font-bold">Tất cả tour quốc tế</Link>
                <Link href="/tours?kind=international&keyword=Dong+Nam+A" onClick={() => setMobileMenuOpen(false)} className="block py-1.5 px-2.5 rounded-lg text-slate-300 hover:text-white hover:bg-white/5 transition-colors">Đông Nam Á (Thái, Sing, Mã)</Link>
                <Link href="/tours?kind=international&keyword=Dong+Bac+A" onClick={() => setMobileMenuOpen(false)} className="block py-1.5 px-2.5 rounded-lg text-slate-300 hover:text-white hover:bg-white/5 transition-colors">Đông Bắc Á (Hàn, Nhật, Đài)</Link>
                <Link href="/tours?kind=international&keyword=Chau+Au" onClick={() => setMobileMenuOpen(false)} className="block py-1.5 px-2.5 rounded-lg text-slate-300 hover:text-white hover:bg-white/5 transition-colors">Châu Âu & Châu Úc</Link>
              </div>
            )}
          </div>

          <Link href="/news?kind=tour-khach-doan" onClick={() => setMobileMenuOpen(false)} className="flex items-center justify-between py-2.5 px-3 rounded-xl bg-white/5 hover:bg-white/10 text-slate-100 hover:text-white transition-colors">
            <span className="flex items-center gap-2">
              <Users className="h-4 w-4 text-sky-400" />
              <span>{t('groupTours')}</span>
            </span>
            <span className="text-[10px] bg-sky-500/20 text-sky-300 px-2 py-0.5 rounded-full font-bold">Doanh nghiệp</span>
          </Link>

          <Link href="/news?kind=dich-vu-visa" onClick={() => setMobileMenuOpen(false)} className="flex items-center justify-between py-2.5 px-3 rounded-xl bg-white/5 hover:bg-white/10 text-slate-100 hover:text-white transition-colors">
            <span className="flex items-center gap-2">
              <FileCheck2 className="h-4 w-4 text-slate-400" />
              <span>{t('visaServices')}</span>
            </span>
            <span className="text-[10px] bg-white/10 text-white/70 px-2 py-0.5 rounded-full font-bold">Trọn gói</span>
          </Link>

          <div className="bg-white/5 rounded-2xl overflow-hidden p-1">
            <div onClick={() => setServicesOpen(!servicesOpen)} className="flex justify-between items-center py-2.5 px-3 cursor-pointer text-slate-100 hover:text-white transition-colors">
              <span className="flex items-center gap-2">
                <MoreHorizontal className="h-4 w-4 text-slate-400" />
                <span>{t('otherServices')}</span>
              </span>
              <ChevronDown className={`h-4 w-4 text-slate-400 transition-transform duration-200 ${servicesOpen ? 'rotate-180 text-primary' : ''}`} />
            </div>
            {servicesOpen && (
              <div className="pl-3 pr-2 py-2 space-y-1.5 bg-black/20 rounded-xl my-1 text-xs">
                <Link href="/hotels" onClick={() => setMobileMenuOpen(false)} className="block py-1.5 px-2.5 rounded-lg text-slate-300 hover:text-white hover:bg-white/5 transition-colors">{t('hotels')}</Link>
                <Link href="/news?kind=ve-may-bay" onClick={() => setMobileMenuOpen(false)} className="block py-1.5 px-2.5 rounded-lg text-slate-300 hover:text-white hover:bg-white/5 transition-colors">{t('flightTickets')}</Link>
                <Link href="/news?kind=cho-thue-xe" onClick={() => setMobileMenuOpen(false)} className="block py-1.5 px-2.5 rounded-lg text-slate-300 hover:text-white hover:bg-white/5 transition-colors">{t('carRentalMemories')}</Link>
                <Link href="/news?kind=teambuilding" onClick={() => setMobileMenuOpen(false)} className="block py-1.5 px-2.5 rounded-lg text-slate-300 hover:text-white hover:bg-white/5 transition-colors">{t('teambuilding')}</Link>
                <Link href="/news?kind=to-chuc-su-kien" onClick={() => setMobileMenuOpen(false)} className="block py-1.5 px-2.5 rounded-lg text-slate-300 hover:text-white hover:bg-white/5 transition-colors">{t('eventOrganization')}</Link>
              </div>
            )}
          </div>

          <Link href="/news" onClick={() => setMobileMenuOpen(false)} className="flex items-center justify-between py-2.5 px-3 rounded-xl bg-white/5 hover:bg-white/10 text-slate-100 hover:text-white transition-colors">
            <span className="flex items-center gap-2">
              <Newspaper className="h-4 w-4 text-sky-300" />
              <span>{t('news')}</span>
            </span>
          </Link>

          <Link href="/contact" onClick={() => setMobileMenuOpen(false)} className="flex items-center justify-between py-2.5 px-3 rounded-xl bg-white/5 hover:bg-white/10 text-slate-100 hover:text-white transition-colors">
            <span className="flex items-center gap-2">
              <Headphones className="h-4 w-4 text-brand-yellow" />
              <span>{t('contact')}</span>
            </span>
          </Link>

          <div className="pt-3 border-t border-white/10 text-xs text-slate-400 space-y-2">
            <div className="p-3 rounded-xl bg-white/10 border border-white/15 text-white/70 flex items-center justify-between">
              <span className="flex items-center gap-2 font-bold">
                <PhoneCall className="h-4 w-4 text-primary animate-pulse" />
                <span>Hotline 24/7:</span>
              </span>
              <a href="tel:0908123456" className="text-white font-extrabold text-sm hover:underline">0908.123.456</a>
            </div>
            <p className="flex items-center gap-2 pl-1">
              <Mail className="h-3.5 w-3.5 text-slate-400" />
              <span>info@nasatourist.com</span>
            </p>
          </div>
        </div>
      )}
    </>
  );
}
