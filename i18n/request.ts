import { getRequestConfig } from 'next-intl/server';

export default getRequestConfig(async ({ requestLocale }) => {
  const locale = (await requestLocale) ?? 'vi';
  const supportedLocale = locale === 'en' ? 'en' : 'vi';

  return {
    locale: supportedLocale,
    messages: (await import(`@tour-seller/i18n/messages/${supportedLocale}.json`)).default,
  };
});