import { setRequestLocale } from 'next-intl/server';
import { Breadcrumb } from '@/components/layout/Breadcrumb';
import { QrCode, CreditCard, Building2, ShieldCheck, CheckCircle2, AlertCircle } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Hướng Dẫn Thanh Toán & Thông Tin Chuyển Khoản',
  description: 'Các hình thức thanh toán tour an toàn tại Nasatourist : Quét mã QR SePay, chuyển khoản ngân hàng và thanh toán tại văn phòng.',
};

export default function PaymentInfoPage({ params }: { params: { locale: string } }) {
  setRequestLocale(params.locale);

  return (
    <div className="container mx-auto px-4 py-6">
      <Breadcrumb items={[{ label: 'Hướng dẫn thanh toán' }]} />

      <div className="max-w-4xl mx-auto mb-16 space-y-8">
        <div className="text-center max-w-2xl mx-auto">
          <span className="text-primary text-xs font-bold uppercase tracking-wider block mb-1">
            Giao Dịch Tiện Lợi & Minh Bạch
          </span>
          <h1 className="text-2xl md:text-4xl font-black text-slate-900 tracking-tight">
            Hướng Dẫn & Phương Thức Thanh Toán
          </h1>
          <p className="text-xs md:text-sm text-slate-500 mt-2">
            Nasatourist  hỗ trợ đa dạng phương thức thanh toán linh hoạt, an toàn và bảo mật tuyệt đối.
          </p>
        </div>

        {/* 3 Phương thức thanh toán - Tối giản bảng màu */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Phương thức 1: SePay QR */}
          <div className="bg-white rounded-2xl p-6 border-2 border-primary/40 shadow-sm space-y-4 relative">
            <span className="absolute -top-3 left-6 bg-primary text-white text-[10px] font-bold uppercase px-3 py-0.5 rounded-full shadow">
              Khuyên Dùng
            </span>
            <div className="w-12 h-12 rounded-xl bg-[#f5f5f3] text-primary flex items-center justify-center">
              <QrCode className="h-6 w-6" />
            </div>
            <h3 className="font-bold text-base text-slate-900">
              Quét Mã SePay QR Code
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Quét mã QR qua ứng dụng ngân hàng hoặc ví điện tử. Hệ thống tự động xác nhận đặt chỗ trong 30 giây.
            </p>
          </div>

          {/* Phương thức 2: Chuyển khoản ngân hàng */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
            <div className="w-12 h-12 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center">
              <CreditCard className="h-6 w-6" />
            </div>
            <h3 className="font-bold text-base text-slate-900">
              Chuyển Khoản Ngân Hàng
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Chuyển khoản trực tiếp tới tài khoản chính thức của công ty tại Vietcombank, Techcombank, MB Bank.
            </p>
          </div>

          {/* Phương thức 3: Thanh toán tại văn phòng */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
            <div className="w-12 h-12 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center">
              <Building2 className="h-6 w-6" />
            </div>
            <h3 className="font-bold text-base text-slate-900">
              Thanh Toán Tại Văn Phòng
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Quý khách có thể đến trực tiếp văn phòng Nasatourist  để thanh toán bằng tiền mặt hoặc quẹt thẻ POS.
            </p>
          </div>
        </div>

        {/* Bảng thông tin tài khoản ngân hàng */}
        <div className="bg-white rounded-3xl p-6 md:p-8 border border-slate-200/80 shadow-sm space-y-6">
          <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <Building2 className="h-5 w-5 text-primary" />
            <span>Thông Tin Tài Khoản Ngân Hàng Doanh Nghiệp</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Tài khoản Vietcombank */}
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
              <div className="flex justify-between items-center">
                <span className="font-bold text-sm text-slate-800">Ngân hàng Vietcombank (VCB)</span>
                <span className="text-[10px] font-bold text-slate-700 bg-slate-200/80 px-2 py-0.5 rounded">Chi nhánh TP.HCM</span>
              </div>
              <div className="text-xs text-slate-600 space-y-1 pt-1">
                <p>Số tài khoản: <strong className="text-sm font-black text-slate-900">0071 0012 34567</strong></p>
                <p>Chủ tài khoản: <strong>CÔNG TY TNHH DU LỊCH NASATOURIST</strong></p>
              </div>
            </div>

            {/* Tài khoản Techcombank */}
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
              <div className="flex justify-between items-center">
                <span className="font-bold text-sm text-slate-800">Ngân hàng Techcombank (TCB)</span>
                <span className="text-[10px] font-bold text-slate-700 bg-slate-200/80 px-2 py-0.5 rounded">Chi nhánh Sài Gòn</span>
              </div>
              <div className="text-xs text-slate-600 space-y-1 pt-1">
                <p>Số tài khoản: <strong className="text-sm font-black text-slate-900">1903 8888 9999</strong></p>
                <p>Chủ tài khoản: <strong>CÔNG TY TNHH DU LỊCH NASATOURIST</strong></p>
              </div>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-[#f5f5f3] border border-black/10 text-xs text-brand-ink flex items-start gap-2.5">
            <AlertCircle className="h-4 w-4 text-brand-mute flex-shrink-0 mt-0.5" />
            <p>
              <strong>Lưu ý nội dung chuyển khoản:</strong> Quý khách vui lòng ghi rõ <em>[Mã đơn tour / Số điện thoại đặt tour]</em> để hệ thống đối soát tự động nhanh chóng nhất.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
