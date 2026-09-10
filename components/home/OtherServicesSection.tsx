import { Link } from '@/i18n/routing';
import { Plane, Camera, Users, CalendarCheck, Hotel, ShieldCheck, ArrowRight, Sparkles } from 'lucide-react';

interface OtherServicesSectionProps {
  slogan?: string;
}

export function OtherServicesSection({
  slogan = 'Đa dạng giải pháp lữ hành và dịch vụ du lịch toàn diện cho cá nhân, gia đình và tổ chức',
}: OtherServicesSectionProps) {
  const services = [
    {
      icon: Hotel,
      title: 'Đặt Phòng Khách Sạn & Resort',
      desc: 'Mạng lưới liên kết hàng ngàn khách sạn 3-5 sao toàn quốc với giá đại lý tốt nhất.',
      href: '/hotels',
      badge: 'Giá đại lý F1',
    },
    {
      icon: Plane,
      title: 'Đại Lý Vé Máy Bay',
      desc: 'Hỗ trợ săn vé máy bay giá rẻ, giữ chỗ nhanh chóng cho các chặng nội địa và quốc tế.',
      href: '/news?kind=ve-may-bay',
      badge: 'Xuất vé 24/7',
    },
    {
      icon: Users,
      title: 'Teambuilding Doanh Nghiệp',
      desc: 'Xây dựng kịch bản gắn kết tinh thần đồng đội độc đáo, sáng tạo và bùng nổ năng lượng.',
      href: '/news?kind=teambuilding',
      badge: 'May đo kịch bản',
    },
    {
      icon: CalendarCheck,
      title: 'Tổ Chức Sự Kiện & Hội Nghị (MICE)',
      desc: 'Tổ chức trọn gói Gala Dinner, lễ kỷ niệm, hội nghị khách hàng chuyên nghiệp.',
      href: '/news?kind=to-chuc-su-kien',
      badge: 'Trọn gói A-Z',
    },
    {
      icon: ShieldCheck,
      title: 'Bảo Hiểm Du Lịch Quốc Tế',
      desc: 'An tâm tuyệt đối trên mọi nẻo đường với gói bảo hiểm du lịch toàn cầu chuẩn quốc tế.',
      href: '/about',
      badge: 'Bồi thường tối đa',
    },
    {
      icon: Camera,
      title: 'Kỷ Niệm Hành Trình & Media Tour',
      desc: 'Quay chụp flycam, ghi lại những khoảnh khắc đẹp nhất trong suốt chuyến đi cùng du khách.',
      href: '/news?kind=cho-thue-xe',
      badge: 'Flycam 4K',
    },
  ];

  return (
    <section className="bg-white py-16 md:py-24 border-t border-slate-200/70">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider mb-2">
            <Sparkles className="h-3.5 w-3.5" />
            <span>Hệ Sinh Thái Dịch Vụ Toàn Diện</span>
          </span>
          <h2 className="text-3xl md:text-4xl font-black font-display text-slate-900 tracking-tight">
            Dịch Vụ Khác Tại Nasatourist 
          </h2>
          <p className="text-xs md:text-sm text-slate-500 mt-2 leading-relaxed">
            {slogan}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((s, idx) => {
            const Icon = s.icon;
            return (
              <Link
                key={idx}
                href={s.href as any}
                className="group relative bg-white hover:bg-slate-50/50 rounded-3xl p-6 md:p-7 border border-slate-200/90 shadow-soft hover:shadow-card-hover transition-all duration-300 flex flex-col justify-between hover:border-primary/40 hover:-translate-y-1"
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-12 h-12 rounded-2xl flex items-center justify-center bg-slate-100 text-slate-700 group-hover:bg-primary group-hover:text-white transition-all duration-300">
                      <Icon className="h-6 w-6" />
                    </div>
                    {s.badge && (
                      <span className="text-[11px] font-bold text-slate-500 bg-slate-50 group-hover:bg-[#f5f5f3] group-hover:text-primary px-2.5 py-1 rounded-full border border-slate-200/80 transition-colors">
                        {s.badge}
                      </span>
                    )}
                  </div>
                  <h3 className="font-bold text-base text-slate-900 group-hover:text-primary transition-colors mb-2 leading-snug">
                    {s.title}
                  </h3>
                  <p className="text-xs md:text-sm text-slate-500 leading-relaxed">
                    {s.desc}
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center gap-1.5 text-xs font-bold text-slate-600 group-hover:text-primary transition-colors">
                  <span>Khám phá dịch vụ</span>
                  <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1.5 transition-transform" />
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}

