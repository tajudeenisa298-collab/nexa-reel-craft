export const SITE_URL = "https://nexa-pixel.com";
export const CONTACT_EMAIL = "info@nexa-pixel.com";
export const DEFAULT_OG_IMAGE = `${SITE_URL}/og/nexa-pixel-social.jpg`;

export const POSITIONING =
  "NexaPixel turns ideas, releases and products into cinematic video through an AI-native production pipeline.";

export const NAV_ITEMS = [
  { label: "Work", href: "/work" },
  { label: "Case study", href: "/case-studies/carney-esselle" },
  { label: "Process", href: "/#process" },
  { label: "About", href: "/about" },
] as const;

export const SERVICE_LINKS = [
  { label: "Music and performance visuals", href: "/ai-music-videos" },
  { label: "Books and publishing", href: "/book-trailers" },
  { label: "Products made clear", href: "/saas-explainer-videos" },
  { label: "Campaign-ready video", href: "/ai-video-ads" },
  { label: "Brand and product films", href: "/brand-product-films" },
  { label: "Characters built for motion", href: "/character-anime-videos" },
  { label: "Personal stories in motion", href: "/animated-wedding-films" },
  { label: "Trailers and narrative films", href: "/trailers-narrative-films" },
] as const;

export const PROJECT_TYPES = [
  {
    title: "A music video",
    href: "/ai-music-videos",
    image: "/media/posters/mv-untouchable.webp",
  },
  {
    title: "A book trailer",
    href: "/book-trailers",
    image: "/media/posters/trailer-ai-drama.webp",
  },
  {
    title: "A product or brand film",
    href: "/brand-product-films",
    image: "/media/posters/nexa-brand-reel.webp",
  },
  {
    title: "A SaaS explainer",
    href: "/saas-explainer-videos",
    image: "/media/posters/nexa-brand-reel.webp",
  },
  {
    title: "An advertisement",
    href: "/ai-video-ads",
    image: "/media/posters/nexa-brand-reel.webp",
  },
  {
    title: "A character or anime video",
    href: "/character-anime-videos",
    image: "/media/lucienne-sheet.png",
  },
  {
    title: "A wedding or personal story",
    href: "/animated-wedding-films",
    image: "/media/posters/carney-esselle-final.webp",
  },
  {
    title: "Something original",
    href: "/start-a-project?category=other",
    image: "/media/posters/mv-sampler.webp",
  },
] as const;
