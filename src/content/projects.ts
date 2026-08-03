import cardBrand from "@/assets/card-brand1.jpg";
import cardCarney from "@/assets/card-carney.jpg";
import cardDrama from "@/assets/card-drama1.jpg";
import cardErnie from "@/assets/card-ernie.jpg";
import cardTrailer from "@/assets/card-trailer1.jpg";

import lucienneSheet from "@/assets/lucienne-sheet.png.asset.json";
import stanleySheet from "@/assets/stanley-sheet.png.asset.json";

export type ProjectCategory =
  | "music-videos"
  | "trailers-narrative"
  | "books-publishing"
  | "brand-product"
  | "explainers"
  | "character-anime"
  | "personal-stories";

export type ProjectKind =
  | "Client project"
  | "Original studio project"
  | "Concept film"
  | "Experimental project"
  | "Internal character study";

export type Project = {
  slug: string;
  title: string;
  kind: ProjectKind;
  categories: ProjectCategory[];
  industry: string;
  description: string;
  poster: string;
  video?: string;
  aspect: "portrait" | "landscape" | "square";
  featured?: boolean;
  servicePath: string;
  objective?: string;
  approach?: string;
  deliverables?: string[];
};

export const CATEGORY_LABELS: Record<ProjectCategory, string> = {
  "music-videos": "Music Videos",
  "trailers-narrative": "Trailers & Narrative",
  "books-publishing": "Books & Publishing",
  "brand-product": "Brand & Product",
  explainers: "Explainers",
  "character-anime": "Character & Anime",
  "personal-stories": "Personal Stories",
};

// Content integrity note: classifications below describe only what is visible in
// the existing portfolio. Client names, commercial outcomes, timelines and other
// unverifiable details are intentionally omitted.
export const PROJECTS: Project[] = [
  {
    slug: "untouchable",
    title: "Untouchable",
    kind: "Original studio project",
    categories: ["music-videos"],
    industry: "Music",
    description:
      "A moody, futurist music video built shot by shot around a neon performance world.",
    poster: "/media/posters/mv-untouchable.webp",
    video: "/media/mv-untouchable.mp4?v=20260803",
    aspect: "portrait",
    featured: true,
    servicePath: "/ai-music-videos",
    approach:
      "Cinematic portraiture, recurring visual motifs and editorial rhythm shape the track into a coherent visual world.",
    deliverables: ["Full music video", "Platform-ready master"],
  },
  {
    slug: "luna-dangerous-liaisons",
    title: "Luna — Dangerous Liaisons",
    kind: "Original studio project",
    categories: ["music-videos", "character-anime"],
    industry: "Music",
    description:
      "A cinematic performance film for virtual artist Luna, cut around a character-led pop release.",
    poster: "/media/posters/mv-luna-dangerous.webp",
    video: "/media/mv-luna-dangerous.mp4?v=20260803",
    aspect: "portrait",
    featured: true,
    servicePath: "/ai-music-videos",
    approach:
      "The production combines character consistency, performance framing and a repeatable visual language for the artist.",
    deliverables: ["Music video", "Release-ready master"],
  },
  {
    slug: "new-born",
    title: "New Born",
    kind: "Original studio project",
    categories: ["music-videos"],
    industry: "Music",
    description:
      "An ethereal music film shaped through high-contrast portraiture and dreamscape transitions.",
    poster: "/media/posters/mv-newborn.webp",
    video: "/media/mv-newborn.mp4?v=20260803",
    aspect: "landscape",
    featured: true,
    servicePath: "/ai-music-videos",
  },
  {
    slug: "ai-sound-sampler",
    title: "AI Sound Sampler",
    kind: "Experimental project",
    categories: ["music-videos", "character-anime"],
    industry: "Music",
    description:
      "A rapid visual sampler exploring cut-to-beat pacing, style changes and compact storytelling.",
    poster: "/media/posters/mv-sampler.webp",
    video: "/media/mv-sampler.mp4?v=20260803",
    aspect: "landscape",
    servicePath: "/ai-music-videos",
  },
  {
    slug: "ai-music-mv",
    title: "AI Music MV",
    kind: "Experimental project",
    categories: ["music-videos", "character-anime"],
    industry: "Music",
    description:
      "A character-driven music visual developed and staged with an AI-assisted production pipeline.",
    poster: "/media/posters/mv-ai-music.webp",
    video: "/media/mv-ai-music.mp4?v=20260803",
    aspect: "portrait",
    servicePath: "/ai-music-videos",
  },
  {
    slug: "the-long-shore",
    title: "The Long Shore",
    kind: "Concept film",
    categories: ["trailers-narrative"],
    industry: "Film",
    description:
      "A feature-style concept trailer with a teal-and-amber grade and orchestral pacing.",
    poster: cardTrailer,
    aspect: "landscape",
    featured: true,
    servicePath: "/trailers-narrative-films",
  },
  {
    slug: "overseas",
    title: "Overseas — AI Short Drama Teaser",
    kind: "Concept film",
    categories: ["trailers-narrative"],
    industry: "Short-form drama",
    description:
      "A high-contrast short-drama teaser composed for vertical-first release and social promotion.",
    poster: "/media/posters/trailer-ai-drama.webp",
    video: "/media/trailer-ai-drama.mp4?v=20260803",
    aspect: "portrait",
    featured: true,
    servicePath: "/trailers-narrative-films",
  },
  {
    slug: "17th-floor",
    title: "17th Floor",
    kind: "Concept film",
    categories: ["trailers-narrative"],
    industry: "Short-form drama",
    description: "A vertical episodic pilot developed as a four-part social drama concept.",
    poster: cardDrama,
    aspect: "portrait",
    servicePath: "/trailers-narrative-films",
  },
  {
    slug: "paper-shop-uncanny-tales",
    title: "Paper Shop Uncanny Tales — Episode 1",
    kind: "Original studio project",
    categories: ["trailers-narrative", "character-anime"],
    industry: "Short-form drama",
    description:
      "A supernatural micro-drama using period-styled cinematography and recurring character continuity.",
    poster: "/media/posters/drama-paper-shop.webp",
    video: "/media/drama-paper-shop.mp4?v=20260803",
    aspect: "portrait",
    servicePath: "/trailers-narrative-films",
  },
  {
    slug: "ernie-character-study",
    title: "Ernie",
    kind: "Internal character study",
    categories: ["character-anime"],
    industry: "Character development",
    description:
      "A photoreal character reference study covering turnaround views, expression and studio lighting.",
    poster: cardErnie,
    aspect: "landscape",
    servicePath: "/character-anime-videos",
  },
  {
    slug: "stanley-character-study",
    title: "Stanley — Age 19",
    kind: "Internal character study",
    categories: ["character-anime"],
    industry: "Character development",
    description:
      "A character bible covering face, hair, wardrobe, accessories and a locked palette for scene-to-scene consistency.",
    poster: stanleySheet.url,
    aspect: "landscape",
    servicePath: "/character-anime-videos",
  },
  {
    slug: "lucienne-character-study",
    title: "Lucienne — The Fortune Teller",
    kind: "Internal character study",
    categories: ["character-anime"],
    industry: "Character development",
    description:
      "A detailed character sheet with head turnaround, expressions, wardrobe rules and continuity guidance.",
    poster: lucienneSheet.url,
    aspect: "landscape",
    servicePath: "/character-anime-videos",
  },
  {
    slug: "carney-esselle",
    title: "Carney & Esselle",
    kind: "Client project",
    categories: ["personal-stories", "character-anime"],
    industry: "Wedding film",
    description:
      "A real love story developed as a character-led animated wedding film with a cinematic story arc.",
    poster: cardCarney,
    video: "/media/carney-esselle-final.mp4?v=20260803",
    aspect: "landscape",
    featured: true,
    servicePath: "/animated-wedding-films",
    objective:
      "Turn a couple’s story into an animated film designed to feel personal, recognisable and emotionally specific.",
    approach:
      "Character development, storyboarding, look development, scene production, editing and sound were combined into one continuous workflow.",
    deliverables: ["Animated wedding film", "Final video master"],
  },
  {
    slug: "halo-fragrance-film",
    title: "Halo — Fragrance Film",
    kind: "Concept film",
    categories: ["brand-product", "trailers-narrative"],
    industry: "Fragrance",
    description:
      "A product-film concept built around atmosphere, texture and a focused hero moment.",
    poster: cardBrand,
    aspect: "landscape",
    servicePath: "/brand-product-films",
  },
  {
    slug: "signature-brand-film",
    title: "Signature Brand Film",
    kind: "Original studio project",
    categories: ["brand-product"],
    industry: "Brand film",
    description:
      "A cinematic social spot combining tactile product beats, restrained typography and a confident final frame.",
    poster: "/media/posters/nexa-brand-reel.webp",
    video: "/media/nexa-brand-reel.mp4?v=20260803",
    aspect: "portrait",
    servicePath: "/brand-product-films",
  },
];

export function getProject(slug: string) {
  return PROJECTS.find((project) => project.slug === slug);
}
