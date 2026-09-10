'use client';

import { useEffect, useRef, useState } from 'react';
import { ShieldCheck, Award, Wallet, UserCheck, Headphones } from 'lucide-react';

interface WhyChooseNasatouristSectionProps {
  slogan?: string;
}

function Reveal({
  children,
  className = '',
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          io.disconnect();
        }
      },
      { threshold: 0.12 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-fluid ${
        visible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'
      } ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

const CARDS = [
  {
    icon: Wallet,
    title: 'Giá trọn gói minh bạch',
    body: 'Không phát sinh ngoài chương trình. Báo giá đủ vé, ăn uống và khách sạn.',
    note: 'Tiết kiệm đến 20%',
  },
  {
    icon: ShieldCheck,
    title: 'Bảo hiểm du lịch',
    body: 'Mọi hành trình có bảo hiểm nội địa / quốc tế với mức bồi thường tối đa.',
    note: 'An tâm trên mọi cung đường',
  },
  {
    icon: UserCheck,
    title: 'Hướng dẫn viên tận tâm',
    body: 'HDV có thẻ hành nghề, am hiểu văn hóa địa phương, chu đáo và rõ ràng.',
    note: '100% có thẻ nghiệp vụ',
  },
  {
    icon: Headphones,
    title: 'Hỗ trợ 24/7',
    body: 'Tổng đài và điều hành túc trực trước, trong và sau chuyến đi.',
    note: 'Phản hồi trong 5 phút',
  },
];

export function WhyChooseNasatouristSection({
  slogan = 'Uy tín tạo nên thương hiệu — chuyến đi an toàn, minh bạch và đáng nhớ.',
}: WhyChooseNasatouristSectionProps) {
  return (
    <section className="bg-white py-24 md:py-36">
      <div className="container mx-auto px-4">
        <Reveal className="text-center max-w-2xl mx-auto mb-14 md:mb-20">
          <span className="inline-flex rounded-full border border-brand-ink/10 bg-[#f5f5f3] px-3 py-1 text-[10px] font-medium uppercase tracking-[0.2em] text-brand-mute mb-4">
            Cam kết
          </span>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-brand-ink">
            Tại sao chọn Nasatourist?
          </h2>
          <p className="mt-4 text-sm text-brand-mute leading-relaxed">{slogan}</p>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-5 md:gap-6">
          <Reveal className="lg:col-span-5" delay={60}>
            <div className="bezel h-full">
              <div className="bezel-inner relative flex h-full min-h-[360px] flex-col justify-between bg-brand-ink p-7 sm:p-9 text-white">
                <div>
                  <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10">
                    <Award className="h-6 w-6" strokeWidth={1.5} />
                  </div>
                  <p className="mb-2 text-[10px] uppercase tracking-[0.2em] text-white/50">
                    Thương hiệu lữ hành
                  </p>
                  <h3 className="font-display text-2xl sm:text-3xl font-semibold tracking-tight leading-tight mb-4">
                    Hơn 15 năm đồng hành cùng du khách Việt
                  </h3>
                  <p className="text-sm text-white/65 leading-relaxed">
                    Nasatourist được cấp phép lữ hành quốc tế — đối tác tin cậy của đoàn khách cơ quan,
                    trường học, gia đình và doanh nghiệp.
                  </p>
                </div>

                <div className="mt-8 grid grid-cols-3 gap-3 border-t border-white/10 pt-6">
                  {[
                    ['15+', 'Năm kinh nghiệm'],
                    ['100K+', 'Khách tin chọn'],
                    ['98.6%', 'Đánh giá 5 sao'],
                  ].map(([stat, label]) => (
                    <div key={label}>
                      <span className="font-display text-2xl font-semibold text-white block">{stat}</span>
                      <span className="text-[11px] text-white/45">{label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>

          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-5">
            {CARDS.map((card, i) => {
              const Icon = card.icon;
              return (
                <Reveal key={card.title} delay={100 + i * 70}>
                  <div className="bezel h-full">
                    <div className="bezel-inner group flex h-full flex-col justify-between p-6 transition-shadow duration-700 ease-fluid hover:shadow-card">
                      <div>
                        <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-2xl bg-[#f5f5f3] text-brand-ink transition-colors duration-700 ease-fluid group-hover:bg-brand-ink group-hover:text-white">
                          <Icon className="h-5 w-5" strokeWidth={1.5} />
                        </div>
                        <h4 className="font-display text-base font-semibold text-brand-ink mb-2">
                          {card.title}
                        </h4>
                        <p className="text-xs text-brand-mute leading-relaxed">{card.body}</p>
                      </div>
                      <span className="mt-5 text-[11px] font-medium text-brand-ink/70">{card.note}</span>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
