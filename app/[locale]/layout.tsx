import { NextIntlClientProvider } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
import type { ReactNode } from 'react';
import type { Metadata } from 'next';
import { Be_Vietnam_Pro } from 'next/font/google';
import { Header } from '@/components/layout/Header';
import { MainMenu } from '@/components/layout/MainMenu';
import { FloatingToolbar } from '@/components/layout/FloatingToolbar';
import { Footer } from '@/components/layout/Footer';
import { ScrollProvider } from '@/components/layout/ScrollProvider';
import '../globals.css';

const beVietnamPro = Be_Vietnam_Pro({
  subsets: ['latin', 'vietnamese'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-sans',
  display: 'swap',
});

const beVietnamDisplay = Be_Vietnam_Pro({
  subsets: ['latin', 'vietnamese'],
  weight: ['600', '700', '800'],
  variable: '--font-display',
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    template: '%s | Nasatourist - Du lịch trong nước và quốc tế',
    default: 'Nasatourist - Công ty du lịch lữ hành hàng đầu Việt Nam',
  },
  description:
    'Nasatourist cung cấp các tour du lịch trong nước, du lịch nước ngoài, tour khách đoàn, dịch vụ visa, khách sạn và vé máy bay trọn gói với giá ưu đãi nhất.',
  icons: {
    icon: '/logo.png',
    shortcut: '/logo.png',
    apple: '/logo.png',
  },
};

export function generateStaticParams() {
  return [{ locale: 'vi' }, { locale: 'en' }];
}

export default async function LocaleLayout({
  children,
  params,
}: Readonly<{ children: ReactNode; params: { locale: string } }>) {
  setRequestLocale(params.locale);
  const messages = await getMessages();

  return (
    <html lang={params.locale} className={`${beVietnamPro.variable} ${beVietnamDisplay.variable}`}>
      <body className="font-sans flex flex-col min-h-screen bg-[#f8fafc] text-slate-800 antialiased selection:bg-primary selection:text-white">
        <NextIntlClientProvider messages={messages}>
          <ScrollProvider>
            <Header />
            <MainMenu />
          </ScrollProvider>
          <main className="flex-1">
            {children}
          </main>
          <FloatingToolbar />
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
