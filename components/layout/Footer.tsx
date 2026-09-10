import { Link } from '@/i18n/routing';
import { getTranslations } from 'next-intl/server';
import { NewsletterForm } from '../newsletter/NewsletterForm';
import {
  MapPin,
  Phone,
  Mail,
  Award,
  ShieldCheck,
  CheckCircle2,
  Clock,
  Building,
  CreditCard,
} from 'lucide-react';
import Image from 'next/image';

export async function Footer() {
  const t = await getTranslations('footer');

  return (
    <footer className="relative bg-brand-ink text-slate-300 pt-16 pb-8 border-t border-white/10 overflow-hidden">
      {/* Subtle ambient lighting */}
      <div className="absolute -top-32 right-1/4 w-96 h-96 bg-white/[0.03] rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-32 left-1/4 w-96 h-96 bg-white/[0.02] rounded-full blur-3xl pointer-events-none" />

      {/* Tầng 1: Dịch vụ, Thông tin, Hướng dẫn & Chứng nhận */}
      <div className="container relative z-10 mx-auto px-4 pb-12 border-b border-slate-800/80">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Cột 1: Dịch vụ */}
          <div>
            <h4 className="text-white font-extrabold text-sm tracking-wider uppercase mb-5 flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-white inline-block " />
              <span>{t('ourServices')}</span>
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li>
                <Link href="/tours?kind=domestic" className="hover:text-primary hover:translate-x-1 inline-block transition-all">
                  Tour du lịch trong nước trọn gói
                </Link>
              </li>
              <li>
                <Link href="/tours?kind=international" className="hover:text-primary hover:translate-x-1 inline-block transition-all">
                  Tour du lịch nước ngoài hàng tuần
                </Link>
              </li>
              <li>
                <Link href="/news?kind=tour-khach-doan" className="hover:text-primary hover:translate-x-1 inline-block transition-all">
                  Tour khách đoàn & Teambuilding MICE
                </Link>
              </li>
              <li>
                <Link href="/news?kind=dich-vu-visa" className="hover:text-primary hover:translate-x-1 inline-block transition-all">
                  Dịch vụ tư vấn & làm Visa các nước
                </Link>
              </li>
              <li>
                <Link href="/hotels" className="hover:text-primary hover:translate-x-1 inline-block transition-all">
                  Đặt phòng khách sạn & Resort toàn quốc
                </Link>
              </li>
              <li>
                <Link href="/news?kind=ve-may-bay" className="hover:text-primary hover:translate-x-1 inline-block transition-all">
                  Vé máy bay nội địa & quốc tế giá tốt
                </Link>
              </li>
            </ul>
          </div>

          {/* Cột 2: Thông tin */}
          <div>
            <h4 className="text-white font-extrabold text-sm tracking-wider uppercase mb-5 flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-white inline-block " />
              <span>{t('information')}</span>
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li>
                <Link href="/about" className="hover:text-primary hover:translate-x-1 inline-block transition-all">
                  Về Nasatourist & Lịch sử hình thành
                </Link>
              </li>
              <li>
                <Link href="/news" className="hover:text-primary hover:translate-x-1 inline-block transition-all">
                  Cẩm nang & Kinh nghiệm du lịch
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-primary hover:translate-x-1 inline-block transition-all">
                  Liên hệ & Hệ thống chi nhánh
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-primary hover:translate-x-1 inline-block transition-all">
                  Đội ngũ hướng dẫn viên chuyên nghiệp
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-primary hover:translate-x-1 inline-block transition-all">
                  Hồ sơ năng lực Nasatourist
                </Link>
              </li>
            </ul>
          </div>

          {/* Cột 3: Hướng dẫn & Chính sách */}
          <div>
            <h4 className="text-white font-extrabold text-sm tracking-wider uppercase mb-5 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-primary inline-block" />
              <span>{t('guidelines')}</span>
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li>
                <Link href="/payment-info" className="hover:text-primary hover:translate-x-1 inline-block transition-all">
                  Phương thức thanh toán & SePay VietQR
                </Link>
              </li>
              <li>
                <Link href="/payment-info" className="hover:text-primary hover:translate-x-1 inline-block transition-all">
                  Hướng dẫn đặt tour & nhận vé điện tử
                </Link>
              </li>
              <li>
                <Link href="/payment-info" className="hover:text-primary hover:translate-x-1 inline-block transition-all">
                  Chính sách hoàn hủy & đổi ngày
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-primary hover:translate-x-1 inline-block transition-all">
                  Bảo hiểm du lịch cho khách hàng
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-primary hover:translate-x-1 inline-block transition-all">
                  Chính sách bảo mật thông tin
                </Link>
              </li>
            </ul>
          </div>

          {/* Cột 4: Chứng nhận uy tín */}
          <div>
            <h4 className="text-white font-extrabold text-sm tracking-wider uppercase mb-5 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-primary inline-block" />
              <span>{t('certifications')}</span>
            </h4>
            <div className="space-y-3 text-xs">
              <div className="flex items-start gap-3 p-3 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-slate-600 transition-colors">
                <div className="w-8 h-8 rounded-xl bg-white/10 text-slate-200 flex items-center justify-center flex-shrink-0">
                  <ShieldCheck className="h-4 w-4" />
                </div>
                <div>
                  <span className="font-bold text-white block text-xs">Giấy Phép Lữ Hành Quốc Tế</span>
                  <span className="text-[11px] text-slate-400">Số GP: 79-1234/2020/TCDL-GP LHQT</span>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-slate-600 transition-colors">
                <div className="w-8 h-8 rounded-xl bg-white/10 text-slate-200 flex items-center justify-center flex-shrink-0">
                  <Award className="h-4 w-4" />
                </div>
                <div>
                  <span className="font-bold text-white block text-xs">Hiệp Hội Du Lịch Việt Nam</span>
                  <span className="text-[11px] text-slate-400">Hội viên chính thức VITA</span>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-slate-600 transition-colors">
                <div className="w-8 h-8 rounded-xl bg-white/10 text-slate-200 flex items-center justify-center flex-shrink-0">
                  <CheckCircle2 className="h-4 w-4" />
                </div>
                <div>
                  <span className="font-bold text-white block text-xs">Đã Thông Báo Bộ Công Thương</span>
                  <span className="text-[11px] text-slate-400">Thương mại điện tử minh bạch</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tầng 2: Thông tin doanh nghiệp & Newsletter */}
      <div className="container relative z-10 mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 items-start">
          {/* Doanh nghiệp (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl overflow-hidden flex items-center justify-center border border-slate-700 shadow-sm">
                <Image
                  src="/logo.png"
                  alt="Nasatourist Logo"
                  width={48}
                  height={48}
                  className="object-contain w-full h-full"
                />
              </div>
              <div>
                <span className="text-xl font-black font-display text-white tracking-tight block">
                  NASA<span className="text-primary">TOURIST</span>
                </span>
                <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
                  CÔNG TY TNHH DU LỊCH NASATOURIST
                </span>
              </div>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed max-w-md">
              Thành lập với sứ mệnh mang đến cho du khách những hành trình an toàn, trọn vẹn và giàu trải nghiệm cảm xúc. Với hơn 15 năm kinh nghiệm tổ chức tour trong nước và quốc tế.
            </p>

            <div className="space-y-2.5 text-xs text-slate-300">
              <p className="flex items-start gap-2.5">
                <MapPin className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                <span>Trụ sở: 123 Nguyễn Văn Cừ, Phường 2, Quận 5, TP. Hồ Chí Minh</span>
              </p>
              <p className="flex items-center gap-2.5">
                <Phone className="h-4 w-4 text-primary flex-shrink-0" />
                <span>Tổng đài tư vấn: <strong className="text-white">0908.123.456</strong> - 028.3838.8888</span>
              </p>
              <p className="flex items-center gap-2.5">
                <Mail className="h-4 w-4 text-primary flex-shrink-0" />
                <span>Email: <strong className="text-white">info@nasatourist.com</strong></span>
              </p>
              <p className="flex items-center gap-2.5">
                <Clock className="h-4 w-4 text-primary flex-shrink-0" />
                <span>Thời gian làm việc: 08:00 - 18:00 (Thứ 2 - Thứ 7)</span>
              </p>
            </div>

            {/* Social Icons - Monochromatic */}
            <div className="flex items-center gap-2.5 pt-2">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-xl bg-white/[0.05] hover:bg-white/[0.15] text-slate-300 hover:text-white flex items-center justify-center transition-all border border-white/10"
                title="Facebook Fanpage"
              >
                <svg className="h-3.5 w-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-xl bg-white/[0.05] hover:bg-white/[0.15] text-slate-300 hover:text-white flex items-center justify-center transition-all border border-white/10"
                title="Youtube Channel"
              >
                <svg className="h-3.5 w-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
              </a>
              <a
                href="https://zalo.me/0908123456"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-xl bg-white/[0.05] hover:bg-white/[0.15] text-slate-300 hover:text-white flex items-center justify-center text-[11px] font-bold transition-all border border-white/10"
                title="Zalo Official"
              >
                Zalo
              </a>
            </div>
          </div>

          {/* Tour hot (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-white font-extrabold text-sm tracking-wider uppercase mb-4 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-primary" />
              <span>{t('hotTours')}</span>
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li>
                <Link href="/tours?keyword=Ha+Noi" className="hover:text-primary transition-colors flex justify-between group">
                  <span className="group-hover:translate-x-0.5 transition-transform">Tour Hà Nội - Hạ Long - Sapa</span>
                  <span className="text-primary font-bold text-[10px] bg-primary/10 px-1.5 py-0.5 rounded">HOT</span>
                </Link>
              </li>
              <li>
                <Link href="/tours?keyword=Da+Nang" className="hover:text-primary transition-colors flex justify-between group">
                  <span className="group-hover:translate-x-0.5 transition-transform">Tour Đà Nẵng - Hội An - Bà Nà</span>
                  <span className="text-primary font-bold text-[10px] bg-primary/10 px-1.5 py-0.5 rounded">HOT</span>
                </Link>
              </li>
              <li>
                <Link href="/tours?keyword=Phu+Quoc" className="hover:text-primary transition-colors flex justify-between group">
                  <span className="group-hover:translate-x-0.5 transition-transform">Tour Phú Quốc Đảo Ngọc 3N2Đ</span>
                  <span className="text-primary font-bold text-[10px] bg-primary/10 px-1.5 py-0.5 rounded">HOT</span>
                </Link>
              </li>
              <li>
                <Link href="/tours?keyword=Thai+Lan" className="hover:text-primary transition-colors flex justify-between group">
                  <span className="group-hover:translate-x-0.5 transition-transform">Tour Thái Lan: Bangkok - Pattaya</span>
                  <span className="text-primary font-bold text-[10px] bg-primary/10 px-1.5 py-0.5 rounded">HOT</span>
                </Link>
              </li>
              <li>
                <Link href="/tours?keyword=Han+Quoc" className="hover:text-primary transition-colors flex justify-between group">
                  <span className="group-hover:translate-x-0.5 transition-transform">Tour Hàn Quốc: Seoul - Nami 5N4Đ</span>
                  <span className="text-primary font-bold text-[10px] bg-primary/10 px-1.5 py-0.5 rounded">HOT</span>
                </Link>
              </li>
              <li>
                <Link href="/tours?keyword=Nhat+Ban" className="hover:text-primary transition-colors flex justify-between group">
                  <span className="group-hover:translate-x-0.5 transition-transform">Tour Nhật Bản: Tokyo - Núi Phú Sĩ</span>
                  <span className="text-primary font-bold text-[10px] bg-primary/10 px-1.5 py-0.5 rounded">HOT</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Đăng ký nhận tin & Bản tin (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <h4 className="text-white font-extrabold text-sm tracking-wider uppercase mb-2 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-primary" />
              <span>{t('newsletterTitle')}</span>
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              {t('newsletterDesc')}
            </p>
            <NewsletterForm />
            <div className="pt-2 text-[11px] text-slate-500 leading-relaxed">
              Nasatourist  cam kết bảo mật thông tin cá nhân và không gửi thư quảng cáo rác.
            </div>

            {/* Thanh toán liên kết */}
            <div className="pt-4 border-t border-slate-800/80">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-2.5">
                Chấp Nhận Thanh Toán An Toàn
              </span>
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-2.5 py-1 rounded-md bg-white/[0.04] border border-white/10 text-[11px] font-medium text-slate-300">
                  VietQR
                </span>
                <span className="px-2.5 py-1 rounded-md bg-white/[0.04] border border-white/10 text-[11px] font-medium text-slate-300">
                  SePay
                </span>
                <span className="px-2.5 py-1 rounded-md bg-white/[0.04] border border-white/10 text-[11px] font-medium text-slate-300">
                  Napas 247
                </span>
                <span className="px-2.5 py-1 rounded-md bg-white/[0.04] border border-white/10 text-[11px] font-medium text-slate-300">
                  Visa / Master
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-slate-800/80 pt-6 mt-4">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-slate-500 text-center md:text-left">
          <p>© {new Date().getFullYear()} Nasatourist . Giữ toàn quyền tác quyền.</p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link href="/about" className="hover:text-slate-300 transition-colors">Điều khoản dịch vụ</Link>
            <span>•</span>
            <Link href="/about" className="hover:text-slate-300 transition-colors">Chính sách bảo mật</Link>
            <span>•</span>
            <Link href="/payment-info" className="hover:text-slate-300 transition-colors">Hướng dẫn thanh toán</Link>
            <span>•</span>
            <Link href="/sitemap.xml" className="hover:text-slate-300 transition-colors">Sitemap</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}


