import { setRequestLocale } from 'next-intl/server';
import {
  getSliders,
  getPopularTags,
  getCategoriesL1,
  getTours,
  getArticles,
  getPageByType,
} from '@/lib/strapi';
import { HeroSlider } from '@/components/home/HeroSlider';
import { PopularTagsBar } from '@/components/home/PopularTagsBar';
import { TourSearchFilterBar } from '@/components/home/TourSearchFilterBar';
import { SeasonalToursSection } from '@/components/home/SeasonalToursSection';
import { DomesticToursSection } from '@/components/home/DomesticToursSection';
import { InternationalToursSection } from '@/components/home/InternationalToursSection';
import { GroupToursSection } from '@/components/home/GroupToursSection';
import { VisaServiceSection } from '@/components/home/VisaServiceSection';
import { CustomerMemoriesSection } from '@/components/home/CustomerMemoriesSection';
import { TravelGuideAndNewsSection } from '@/components/home/TravelGuideAndNewsSection';
import { OtherServicesSection } from '@/components/home/OtherServicesSection';
import { WhyChooseNasatouristSection } from '@/components/home/WhyChoosenasatouristSection';
import { NasatouristGallerySection } from '@/components/home/nasatouristGallerySection';
import { GalleryMyPhotosSection } from '@/components/home/GalleryMyPhotosSection';

export const revalidate = 300; // ISR 5 mins

export default async function HomePage({ params }: { params: { locale: string } }) {
  setRequestLocale(params.locale);

  // Parallel data fetching
  const [
    sliders,
    popularTags,
    categories,
    allToursRes,
    domesticToursRes,
    intlToursRes,
    groupTourRes,
    visaRes,
    memoriesRes,
    guideRes,
    newsRes,
    slogan1,
    slogan2,
    slogan3,
    slogan4,
    slogan5,
    slogan6,
  ] = await Promise.all([
    getSliders(params.locale),
    getPopularTags(params.locale),
    getCategoriesL1(params.locale),
    getTours({ locale: params.locale, pageSize: 12 }),
    getTours({ locale: params.locale, kind: 'domestic', pageSize: 8 }),
    getTours({ locale: params.locale, kind: 'international', pageSize: 8 }),
    getArticles({ locale: params.locale, kind: 'tour-khach-doan', pageSize: 4 }),
    getArticles({ locale: params.locale, kind: 'dich-vu-visa', pageSize: 4 }),
    getArticles({ locale: params.locale, kind: 'cho-thue-xe', pageSize: 4 }),
    getArticles({ locale: params.locale, kind: 'cam-nang-du-lich', pageSize: 4 }),
    getArticles({ locale: params.locale, kind: 'tin-tuc', pageSize: 5 }),
    getPageByType('slogan1', params.locale),
    getPageByType('slogan2', params.locale),
    getPageByType('slogan3', params.locale),
    getPageByType('slogan4', params.locale),
    getPageByType('slogan5', params.locale),
    getPageByType('slogan6', params.locale),
  ]);

  const allTours = allToursRes?.data || [];
  const domesticTours = domesticToursRes?.data?.length ? domesticToursRes.data : allTours.filter(t => t.kind === 'domestic');
  const intlTours = intlToursRes?.data?.length ? intlToursRes.data : allTours.filter(t => t.kind === 'international');

  return (
    <div className="space-y-0">
      {/* 1. Hero Slider Banner */}
      <HeroSlider sliders={sliders} />

      {/* 2. Popular Tags Bar */}
      <PopularTagsBar tags={popularTags} />

      {/* 3. Search and Quick Filter Bar */}
      <TourSearchFilterBar categories={categories} />

      {/* 4. Seasonal Tours Section */}
      <SeasonalToursSection
        tours={allTours}
        slogan={slogan1?.name}
        locale={params.locale}
      />

      {/* 5. Domestic Tours Section */}
      <DomesticToursSection
        tours={domesticTours.length > 0 ? domesticTours : allTours}
        categories={categories}
        slogan={slogan2?.name}
        locale={params.locale}
      />

      {/* 6. International Tours Section */}
      <InternationalToursSection
        tours={intlTours.length > 0 ? intlTours : allTours}
        slogan={slogan3?.name}
        locale={params.locale}
      />

      {/* 7. Group Tours Section */}
      <GroupToursSection
        articles={groupTourRes?.data}
        slogan={slogan4?.name}
      />

      {/* 8. Visa Services Section */}
      <VisaServiceSection articles={visaRes?.data} />

      {/* 9. Customer Journey Memories */}
      <CustomerMemoriesSection articles={memoriesRes?.data} />

      {/* 9.5 Gallery — Ảnh Tôi Chụp (thực tế từ hành trình) */}
      <GalleryMyPhotosSection />

      {/* 10. Travel Guides & News Section */}
      <TravelGuideAndNewsSection
        travelGuides={guideRes?.data}
        newsArticles={newsRes?.data}
        locale={params.locale}
      />

      {/* 11. Other Services */}
      <OtherServicesSection slogan={slogan5?.name} />

      {/* 12. Why Choose Nasatourist */}
      <WhyChooseNasatouristSection slogan={slogan6?.name} />

      {/* 13. Nasatourist Moments Gallery */}
      <NasatouristGallerySection />
    </div>
  );
}