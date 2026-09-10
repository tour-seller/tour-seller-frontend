/** Curated Vietnam photos from https://www.pexels.com/search/vietnam/ */

const PEXELS = (id: number, w = 1200) =>
  `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=${w}`;

export const VIETNAM_IMAGES = {
  // ── Core destinations ────────────────────────────────────────────
  haLong: PEXELS(18501642, 1920),
  haLongAlt: PEXELS(2132126, 1600),
  hoiAn: PEXELS(20593364, 1600),
  hoiAnAlt: PEXELS(2412606, 1600),
  sapa: PEXELS(38843230, 1600),
  sapaAlt: PEXELS(1659438, 1600),
  daNang: PEXELS(33929115, 1600),
  daNangAlt: PEXELS(2868242, 1600),
  ninhBinh: PEXELS(2166559, 1600),
  cave: PEXELS(37888321, 1600),
  beach: PEXELS(2387873, 1600),
  hanoi: PEXELS(2161449, 1600),
  countryside: PEXELS(3225528, 1600),
  mountain: PEXELS(2104152, 1600),
  temple: PEXELS(3408353, 1600),
  default: PEXELS(18501642, 1600),
  card: PEXELS(18501642, 800),

  // ── Extended destinations ────────────────────────────────────────
  phuQuoc: PEXELS(1320686, 1600),          // Phú Quốc tropical island
  phuQuocAlt: PEXELS(3155666, 1600),       // clear sea beach
  dalat: PEXELS(1578707, 1600),            // Đà Lạt highlands
  dalatAlt: PEXELS(4021781, 1600),         // Đà Lạt flower garden
  muiNe: PEXELS(1170986, 1600),            // Mũi Né sand dunes
  muiNeAlt: PEXELS(1051073, 1600),         // coastal Vietnam
  quyNhon: PEXELS(2674052, 1600),          // Quy Nhơn coast
  canTho: PEXELS(3566764, 1600),           // Cần Thơ floating market
  hue: PEXELS(4254555, 1600),              // Huế citadel
  hueAlt: PEXELS(3225528, 1600),           // Huế countryside
  ninhBinhAlt: PEXELS(2739664, 1600),      // Ninh Bình boat tour
  haGiang: PEXELS(3714898, 1600),          // Hà Giang terraces
  mekong: PEXELS(3566764, 1600),           // Mekong delta
  muCangChai: PEXELS(3714898, 1600),       // Mù Cang Chải golden terraces
  bau_trang: PEXELS(1170986, 1600),        // Bàu Trắng sand dunes
  quinhNhonSea: PEXELS(1320686, 1600),     // sea turquoise

  // ── International ────────────────────────────────────────────────
  thailand: PEXELS(1007657, 1600),         // Thailand temples
  singapore: PEXELS(3152979, 1600),        // Singapore skyline
  korea: PEXELS(237211, 1600),             // Korea pagoda
  japan: PEXELS(402028, 1600),             // Japan cherry blossom
  taiwan: PEXELS(3243090, 1600),           // Taiwan lanterns
  europe: PEXELS(532263, 1600),            // Europe street
  australia: PEXELS(995764, 1600),         // Australia opera house
  china: PEXELS(2846217, 1600),            // China Great Wall

  // ── Tour / service context ───────────────────────────────────────
  groupTour: PEXELS(1184961, 1600),        // group of s
  groupTourAlt: PEXELS(1250655, 1600),     // team outdoor
  teamBuilding: PEXELS(3184292, 1600),     // teambuilding activity
  visa: PEXELS(3807571, 1600),             // passport / documents
  visaAlt: PEXELS(5849584, 1600),          // travel documents stamps
  carRental: PEXELS(1004409, 1600),        // vehicle journey
  flightTicket: PEXELS(358319, 1600),      // airplane wing
  hotel: PEXELS(1134176, 1600),            // hotel pool resort

  // ── Customer memories ────────────────────────────────────────────
  memories1: PEXELS(2412606, 800),         // group on heritage trip
  memories2: PEXELS(2387873, 800),         // beach group photo
  memories3: PEXELS(2166559, 800),         // Tràng An boat
  memories4: PEXELS(1659438, 800),         // Sapa trekking group

  // ── News / article thumbnails ────────────────────────────────────
  news1: PEXELS(2412606, 800),
  news2: PEXELS(3714898, 800),
  news3: PEXELS(1659438, 800),
  news4: PEXELS(33929115, 800),
  news5: PEXELS(2161449, 800),

  // ── "Tôi chụp" gallery — distinct from NasatouristGallery ────────────
  myPhoto1: PEXELS(3714898, 1200),         // Mù Cang Chải ruộng bậc thang
  myPhoto2: PEXELS(1170986, 1200),         // Mũi Né cồn cát
  myPhoto3: PEXELS(3566764, 1200),         // Cần Thơ chợ nổi
  myPhoto4: PEXELS(2739664, 1200),         // Tràng An thuyền
  myPhoto5: PEXELS(4021781, 1200),         // Đà Lạt vườn hoa
  myPhoto6: PEXELS(4254555, 1200),         // Huế thành nội
  myPhoto7: PEXELS(2674052, 1200),         // Quy Nhơn biển
  myPhoto8: PEXELS(3155666, 1200),         // Phú Quốc nước trong
} as const;

export const VIETNAM_IMAGE_POOL = [
  VIETNAM_IMAGES.haLong,
  VIETNAM_IMAGES.hoiAn,
  VIETNAM_IMAGES.sapa,
  VIETNAM_IMAGES.daNang,
  VIETNAM_IMAGES.ninhBinh,
  VIETNAM_IMAGES.cave,
  VIETNAM_IMAGES.beach,
  VIETNAM_IMAGES.hanoi,
  VIETNAM_IMAGES.countryside,
  VIETNAM_IMAGES.mountain,
  VIETNAM_IMAGES.temple,
  VIETNAM_IMAGES.haLongAlt,
  VIETNAM_IMAGES.phuQuoc,
  VIETNAM_IMAGES.dalat,
  VIETNAM_IMAGES.muiNe,
  VIETNAM_IMAGES.hue,
] as const;

/** Pool dùng cho CustomerMemoriesSection */
export const MEMORIES_POOL = [
  VIETNAM_IMAGES.memories1,
  VIETNAM_IMAGES.memories2,
  VIETNAM_IMAGES.memories3,
  VIETNAM_IMAGES.memories4,
] as const;

/** Pool dùng cho TravelGuideAndNewsSection */
export const NEWS_POOL = [
  VIETNAM_IMAGES.news1,
  VIETNAM_IMAGES.news2,
  VIETNAM_IMAGES.news3,
  VIETNAM_IMAGES.news4,
  VIETNAM_IMAGES.news5,
] as const;

/** Pool dùng cho GalleryMyPhotosSection */
export const MY_PHOTOS_POOL = [
  { src: VIETNAM_IMAGES.myPhoto1, title: 'Mù Cang Chải', span: 'md:col-span-8 md:row-span-2' },
  { src: VIETNAM_IMAGES.myPhoto2, title: 'Mũi Né', span: 'md:col-span-4' },
  { src: VIETNAM_IMAGES.myPhoto3, title: 'Cần Thơ', span: 'md:col-span-4' },
  { src: VIETNAM_IMAGES.myPhoto4, title: 'Tràng An', span: 'md:col-span-4' },
  { src: VIETNAM_IMAGES.myPhoto5, title: 'Đà Lạt', span: 'md:col-span-4' },
  { src: VIETNAM_IMAGES.myPhoto6, title: 'Huế Thành Nội', span: 'md:col-span-4' },
  { src: VIETNAM_IMAGES.myPhoto7, title: 'Quy Nhơn', span: 'md:col-span-4' },
  { src: VIETNAM_IMAGES.myPhoto8, title: 'Phú Quốc', span: 'md:col-span-4' },
] as const;

const KEYWORD_MAP: Array<{ keys: string[]; url: string }> = [
  { keys: ['ha long', 'hạ long', 'halong', 'lan hạ', 'cát bà'], url: VIETNAM_IMAGES.haLong },
  { keys: ['hội an', 'hoi an'], url: VIETNAM_IMAGES.hoiAn },
  { keys: ['sapa', 'sa pa', 'fansipan', 'tây bắc'], url: VIETNAM_IMAGES.sapa },
  { keys: ['đà nẵng', 'da nang', 'bà nà', 'ba na', 'mỹ khê'], url: VIETNAM_IMAGES.daNang },
  { keys: ['ninh bình', 'ninh binh', 'tràng an', 'trang an', 'bái đính', 'thung nham'], url: VIETNAM_IMAGES.ninhBinh },
  { keys: ['phú quốc', 'phu quoc', 'đảo ngọc', 'phú quốc'], url: VIETNAM_IMAGES.phuQuoc },
  { keys: ['hà nội', 'ha noi', 'hanoi', 'hồ tây', 'hoan kiem'], url: VIETNAM_IMAGES.hanoi },
  { keys: ['huế', 'hue', 'đại nội', 'cố đô'], url: VIETNAM_IMAGES.hue },
  { keys: ['đà lạt', 'da lat', 'dalat', 'langbiang'], url: VIETNAM_IMAGES.dalat },
  { keys: ['mũi né', 'mui ne', 'bàu trắng', 'bau trang', 'phan thiết'], url: VIETNAM_IMAGES.muiNe },
  { keys: ['quy nhơn', 'quy nhon', 'bình định', 'binh dinh'], url: VIETNAM_IMAGES.quyNhon },
  { keys: ['cần thơ', 'can tho', 'miền tây', 'mekong', 'chợ nổi'], url: VIETNAM_IMAGES.canTho },
  { keys: ['hà giang', 'ha giang', 'mù cang', 'mu cang', 'đồng văn'], url: VIETNAM_IMAGES.haGiang },
  { keys: ['thái lan', 'thai', 'bangkok', 'pattaya', 'krabi'], url: VIETNAM_IMAGES.thailand },
  { keys: ['singapore', 'sing', 'marina bay'], url: VIETNAM_IMAGES.singapore },
  { keys: ['hàn quốc', 'han quoc', 'korea', 'seoul', 'busan'], url: VIETNAM_IMAGES.korea },
  { keys: ['nhật bản', 'nhat ban', 'japan', 'tokyo', 'osaka', 'kyoto'], url: VIETNAM_IMAGES.japan },
  { keys: ['đài loan', 'dai loan', 'taiwan', 'taipei'], url: VIETNAM_IMAGES.taiwan },
  { keys: ['châu âu', 'chau au', 'europe', 'pháp', 'paris', 'ý', 'đức'], url: VIETNAM_IMAGES.europe },
  { keys: ['úc', 'australia', 'new zealand', 'sydney'], url: VIETNAM_IMAGES.australia },
  { keys: ['trung quốc', 'trung quoc', 'china', 'bắc kinh', 'thượng hải'], url: VIETNAM_IMAGES.china },
  { keys: ['hang', 'cave', 'động', 'dong'], url: VIETNAM_IMAGES.cave },
  { keys: ['biển', 'beach', 'đảo', 'sea', 'coastal', 'resort'], url: VIETNAM_IMAGES.beach },
  { keys: ['teambuilding', 'team building', 'đoàn', 'nhóm', 'gala', 'mice', 'doanh nghiệp'], url: VIETNAM_IMAGES.groupTour },
  { keys: ['visa', 'hộ chiếu', 'passport', 'lãnh sự'], url: VIETNAM_IMAGES.visa },
  { keys: ['khách sạn', 'hotel', 'resort', 'nghỉ dưỡng'], url: VIETNAM_IMAGES.hotel },
  { keys: ['máy bay', 'vé bay', 'flight', 'airline'], url: VIETNAM_IMAGES.flightTicket },
];

export function pickVietnamImage(seed?: string | number | null, width: 'hero' | 'card' | 'thumb' = 'card'): string {
  const w = width === 'hero' ? 1920 : width === 'thumb' ? 400 : 800;
  const text = String(seed ?? '').toLowerCase();

  if (text) {
    for (const entry of KEYWORD_MAP) {
      if (entry.keys.some((k) => text.includes(k))) {
        return entry.url.replace(/w=\d+/, `w=${w}`);
      }
    }
  }

  const numeric =
    typeof seed === 'number'
      ? seed
      : text
        ? Array.from(text).reduce((acc, ch) => acc + ch.charCodeAt(0), 0)
        : Math.floor(Math.random() * VIETNAM_IMAGE_POOL.length);

  const picked = VIETNAM_IMAGE_POOL[Math.abs(numeric) % VIETNAM_IMAGE_POOL.length];
  return picked.replace(/w=\d+/, `w=${w}`);
}

export const HERO_FALLBACK_PHOTOS = [
  VIETNAM_IMAGES.haLong,
  VIETNAM_IMAGES.hoiAn,
  VIETNAM_IMAGES.sapa,
  VIETNAM_IMAGES.daNang,
  VIETNAM_IMAGES.phuQuoc,
  VIETNAM_IMAGES.ninhBinh,
] as const;
