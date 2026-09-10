import { setRequestLocale } from 'next-intl/server';
import { Breadcrumb } from '@/components/layout/Breadcrumb';
import { Award, Compass, HeartHandshake, ShieldCheck, Users, Target, Eye } from 'lucide-react';
import Image from 'next/image';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Giới Thiệu Về Nasatourist ',
  description: 'Hành trình 15+ năm phát triển của Công ty Du lịch Nasatourist  - Đồng hành cùng hàng triệu du khách Việt Nam.',
};

export default function AboutPage({ params }: { params: { locale: string } }) {
  setRequestLocale(params.locale);

  return (
    <div className="container mx-auto px-4 py-6">
      <Breadcrumb items={[{ label: 'Giới thiệu' }]} />

      <div className="max-w-5xl mx-auto space-y-12 mb-16">
        {/* Hero Introduction */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-primary text-xs font-bold uppercase tracking-wider block">
            Về Chúng Tôi
          </span>
          <h1 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tight leading-tight">
            Nasatourist  - Hành Trình Vạn Dặm Yêu Thương
          </h1>
          <p className="text-sm md:text-base text-slate-600 leading-relaxed pt-2">
            Được thành lập với tâm huyết kiến tạo những hành trình du lịch chất lượng, an toàn và giàu ý nghĩa văn hóa. Chúng tôi tự hào là người bạn đồng hành tin cậy của du khách trên mọi miền đất nước và thế giới.
          </p>
        </div>

        {/* Featured Banner Image - Pexels Vietnam */}
        <div className="relative aspect-[21/9] rounded-3xl overflow-hidden shadow-lg bg-slate-900">
          <Image
            src="https://images.pexels.com/photos/18501642/pexels-photo-18501642.jpeg?auto=compress&cs=tinysrgb&w=1600"
            alt="Đội ngũ Nasatourist "
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/55 flex items-end p-6 md:p-10">
            <div className="text-white space-y-1">
              <span className="text-xs font-bold uppercase tracking-wider text-brand-mute">
                Chất Lượng Làm Nên Thương Hiệu
              </span>
              <p className="text-lg md:text-2xl font-black">
                Phục vụ hơn 500.000 lượt khách hài lòng mỗi năm
              </p>
            </div>
          </div>
        </div>

        {/* Tầm nhìn - Sứ mệnh - Giá trị - Tối giản bảng màu */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm space-y-3 group hover:border-primary/40 transition-colors">
            <div className="w-12 h-12 rounded-xl bg-slate-100 text-slate-700 group-hover:bg-primary group-hover:text-white transition-colors flex items-center justify-center">
              <Eye className="h-6 w-6" />
            </div>
            <h3 className="text-base font-bold text-slate-900">Tầm Nhìn Chiến Lược</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Trở thành 1 trong 5 công ty lữ hành hàng đầu tại Việt Nam, tiên phong trong việc số hóa dịch vụ du lịch và mang đến trải nghiệm cá nhân hóa hoàn hảo cho từng khách hàng.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm space-y-3 group hover:border-primary/40 transition-colors">
            <div className="w-12 h-12 rounded-xl bg-slate-100 text-slate-700 group-hover:bg-primary group-hover:text-white transition-colors flex items-center justify-center">
              <Target className="h-6 w-6" />
            </div>
            <h3 className="text-base font-bold text-slate-900">Sứ Mệnh Phụng Sự</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Mang đến những chuyến đi đầy ắp nụ cười, gắn kết tình thân gia đình, khơi nguồn sáng tạo cho doanh nghiệp và tôn vinh vẻ đẹp thiên nhiên, con người Việt Nam.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm space-y-3 group hover:border-primary/40 transition-colors">
            <div className="w-12 h-12 rounded-xl bg-slate-100 text-slate-700 group-hover:bg-primary group-hover:text-white transition-colors flex items-center justify-center">
              <HeartHandshake className="h-6 w-6" />
            </div>
            <h3 className="text-base font-bold text-slate-900">Giá Trị Cốt Lõi</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Tâm huyết - Trung thực - Chuyên nghiệp - Sáng tạo. Đặt sự an toàn và niềm vui của du khách lên vị trí cao nhất trong mọi hoạt động dịch vụ.
            </p>
          </div>
        </div>

        {/* Thông tin pháp lý & giấy phép */}
        <div className="bg-slate-50 rounded-3xl p-8 border border-slate-200 space-y-4">
          <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <ShieldCheck className="h-5 w-5 text-primary" />
            <span>Hồ Sơ Năng Lực & Giấy Phép Hoạt Động</span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-slate-600">
            <div>
              <strong className="text-slate-800 block mb-0.5">Tên doanh nghiệp:</strong>
              <span>CÔNG TY TNHH DU LỊCH nasatourist</span>
            </div>
            <div>
              <strong className="text-slate-800 block mb-0.5">Mã số thuế / ĐKKD:</strong>
              <span>0312345678 - Do Sở KH&ĐT TP.HCM cấp</span>
            </div>
            <div>
              <strong className="text-slate-800 block mb-0.5">Giấy phép Lữ hành Quốc tế:</strong>
              <span>Số 79-1234/2020/TCDL-GPLHQT</span>
            </div>
            <div>
              <strong className="text-slate-800 block mb-0.5">Thành viên hiệp hội:</strong>
              <span>Hiệp hội Du lịch Việt Nam (VITA), Hiệp hội Du lịch TP.HCM (HTA)</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
