import { setRequestLocale } from 'next-intl/server';
import { Breadcrumb } from '@/components/layout/Breadcrumb';
import { MapPin, Phone, Mail, Clock, Send } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Liên Hệ Với Nasatourist ',
  description: 'Thông tin liên hệ, hotline tư vấn tour 24/7 và hệ thống văn phòng chi nhánh của Nasatourist .',
};

export default function ContactPage({ params }: { params: { locale: string } }) {
  setRequestLocale(params.locale);

  return (
    <div className="container mx-auto px-4 py-6">
      <Breadcrumb items={[{ label: 'Liên hệ' }]} />

      <div className="max-w-6xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-primary text-xs font-bold uppercase tracking-wider block mb-1">
            Kết Nối Với Chúng Tôi
          </span>
          <h1 className="text-2xl md:text-4xl font-black text-slate-900 tracking-tight">
            Thông Tin Liên Hệ & Hỗ Trợ
          </h1>
          <p className="text-xs md:text-sm text-slate-500 mt-2">
            Đội ngũ tư vấn viên của Nasatourist  luôn sẵn sàng hỗ trợ quý khách mọi lúc, mọi nơi.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12 items-start">
          {/* Cột trái: Thông tin liên hệ (5 cols) */}
          <div className="lg:col-span-5 bg-white rounded-3xl p-6 md:p-8 border border-slate-200/80 shadow-sm space-y-6">
            <div>
              <h2 className="text-lg font-bold text-slate-900 mb-2">
                CÔNG TY TNHH DU LỊCH NASATOURIST
              </h2>
              <p className="text-xs text-slate-500">
                Thương hiệu lữ hành uy tín hàng đầu với giấy phép kinh doanh lữ hành quốc tế.
              </p>
            </div>

            <div className="space-y-4 text-xs text-slate-600">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#f5f5f3] text-primary flex items-center justify-center flex-shrink-0 mt-0.5">
                  <MapPin className="h-4 w-4" />
                </div>
                <div>
                  <span className="font-bold text-slate-800 block mb-0.5">Trụ sở chính:</span>
                  <span>123 Nguyễn Văn Cừ, Phường 2, Quận 5, TP. Hồ Chí Minh</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#f5f5f3] text-primary flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Phone className="h-4 w-4" />
                </div>
                <div>
                  <span className="font-bold text-slate-800 block mb-0.5">Hotline tư vấn:</span>
                  <a href="tel:0908123456" className="text-primary font-bold hover:underline block">
                    0908.123.456 - 028.3838.8888
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#f5f5f3] text-primary flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Mail className="h-4 w-4" />
                </div>
                <div>
                  <span className="font-bold text-slate-800 block mb-0.5">Hộp thư điện tử:</span>
                  <span>info@nasatourist.com - booking@nasatourist.com</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#f5f5f3] text-primary flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Clock className="h-4 w-4" />
                </div>
                <div>
                  <span className="font-bold text-slate-800 block mb-0.5">Giờ làm việc:</span>
                  <span>Thứ 2 - Thứ 7: 08:00 - 18:00 (Chủ nhật trực hotline)</span>
                </div>
              </div>
            </div>
          </div>

          {/* Cột phải: Form gửi liên hệ (7 cols) */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-6 md:p-8 border border-slate-200/80 shadow-sm">
            <h2 className="text-lg font-bold text-slate-900 mb-2">
              Gửi Yêu Cầu Tư Vấn / Liên Hệ
            </h2>
            <p className="text-xs text-slate-500 mb-6">
              Vui lòng điền thông tin bên dưới, chuyên viên tư vấn sẽ liên hệ lại quý khách trong vòng 30 phút.
            </p>

            <form className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-slate-600 mb-1 block">
                    Họ và tên *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Nguyễn Văn A"
                    className="w-full bg-slate-50 border border-slate-200 text-xs rounded-xl px-3.5 py-2.5 text-slate-800 focus:outline-none focus:border-primary focus:bg-white"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-600 mb-1 block">
                    Số điện thoại *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="0908 xxx xxx"
                    className="w-full bg-slate-50 border border-slate-200 text-xs rounded-xl px-3.5 py-2.5 text-slate-800 focus:outline-none focus:border-primary focus:bg-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-slate-600 mb-1 block">
                    Địa chỉ email
                  </label>
                  <input
                    type="email"
                    placeholder="email@example.com"
                    className="w-full bg-slate-50 border border-slate-200 text-xs rounded-xl px-3.5 py-2.5 text-slate-800 focus:outline-none focus:border-primary focus:bg-white"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-600 mb-1 block">
                    Chủ đề quan tâm
                  </label>
                  <select className="w-full bg-slate-50 border border-slate-200 text-xs rounded-xl px-3.5 py-2.5 text-slate-800 focus:outline-none focus:border-primary focus:bg-white">
                    <option>Tư vấn tour trong nước</option>
                    <option>Tư vấn tour nước ngoài</option>
                    <option>Thiết kế tour khách đoàn / Teambuilding</option>
                    <option>Dịch vụ làm Visa</option>
                    <option>Đặt phòng khách sạn / Vé máy bay</option>
                    <option>Ý kiến đóng góp / Khiếu nại</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-600 mb-1 block">
                  Nội dung yêu cầu *
                </label>
                <textarea
                  rows={4}
                  required
                  placeholder="Quý khách vui lòng cho biết số lượng khách, ngày dự kiến đi hoặc các yêu cầu cụ thể..."
                  className="w-full bg-slate-50 border border-slate-200 text-xs rounded-xl px-3.5 py-2.5 text-slate-800 focus:outline-none focus:border-primary focus:bg-white"
                />
              </div>

              <button
                type="button"
                className="inline-flex items-center gap-2 bg-primary hover:bg-brand-ocean text-white font-bold text-xs px-6 py-3 rounded-xl shadow-md transition-all hover:scale-105"
              >
                <Send className="h-4 w-4" />
                <span>Gửi thông tin liên hệ</span>
              </button>
            </form>
          </div>
        </div>

        {/* Google Maps Embed */}
        <div className="bg-white rounded-3xl p-3 border border-slate-200/80 shadow-sm overflow-hidden mb-12">
          <iframe
            title="Bản đồ chỉ đường Nasatourist "
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.669726976722!2d106.68006841474885!3d10.75991709233284!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752f1b7c3aa07b%3A0x6a19f28d8a7051df!2zMTIzIE5ndXnhu4VuIFbEg24gQ-G7qywgUGjGsOG7nW5nIDIsIFF14bqtbiA1LCBUaMOgbmggcGjhu5EgSOG7kyBDaMOtIE1pbmgsIFZp4buHdCBOYW0!5e0!3m2!1svi!2s!4v1650000000000!5m2!1svi!2s"
            className="w-full h-80 rounded-2xl border-0"
            loading="lazy"
          />
        </div>
      </div>
    </div>
  );
}
