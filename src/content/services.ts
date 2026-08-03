import type { ProjectCategory } from "./projects";

export type Service = {
  slug: string;
  path: string;
  eyebrow: string;
  h1: string;
  description: string;
  audience: string[];
  problems: string[];
  deliverables: string[];
  processNote: string;
  category: ProjectCategory;
  cta: string;
  metaTitle: string;
  metaDescription: string;
  faqs: { question: string; answer: string }[];
};

export const SERVICES: Service[] = [
  {
    slug: "ai-music-videos",
    path: "/ai-music-videos",
    eyebrow: "Music and performance visuals",
    h1: "Cinematic AI music videos built around your song.",
    description:
      "From a full narrative film to a release visualizer, NexaPixel develops the visual language around the track—not around a template.",
    audience: [
      "Independent artists",
      "Record labels",
      "Artist managers",
      "Producers",
      "Virtual artists",
    ],
    problems: [
      "A strong track needs a visual world without the logistics of a full physical shoot.",
      "Release campaigns need more than one horizontal master.",
      "Recurring performers and characters need consistency from shot to shot.",
    ],
    deliverables: [
      "Full music video",
      "Performance visuals",
      "Lyric visualizers",
      "Release teasers",
      "Vertical promotional cuts",
      "Captioned versions",
    ],
    processNote:
      "The schedule is set after the track, creative direction, shot count and release date are reviewed.",
    category: "music-videos",
    cta: "Brief your next release",
    metaTitle: "Cinematic AI Music Video Production | NexaPixel",
    metaDescription:
      "Cinematic AI-assisted music videos, visualizers and release assets for independent artists, labels and virtual performers.",
    faqs: [
      {
        question: "Can you create a music video without a physical shoot?",
        answer:
          "Yes. The production can be developed from an approved concept, artist references and supplied assets without filming the artist in person.",
      },
      {
        question: "Can one project include social cutdowns?",
        answer:
          "Yes. Vertical teasers, short hooks and alternate crops can be included in the agreed deliverables.",
      },
      {
        question: "What should I send with the brief?",
        answer:
          "Send the track, release date, lyrics where relevant, visual references, artist assets and the platforms you plan to use.",
      },
    ],
  },
  {
    slug: "book-trailers",
    path: "/book-trailers",
    eyebrow: "Books and publishing",
    h1: "Book trailers that turn your story into a cinematic world.",
    description:
      "NexaPixel translates tone, character and conflict into launch-ready video for authors, publishers and book marketers.",
    audience: ["Independent authors", "Publishers", "Book marketers", "Literary agencies"],
    problems: [
      "A synopsis explains the book but does not always create an emotional pull.",
      "Characters and settings need a consistent visual direction.",
      "Launch campaigns need assets for several platforms and attention spans.",
    ],
    deliverables: [
      "15–30 second teaser",
      "30–60 second trailer",
      "Character reveals",
      "Social cutdowns",
      "Launch graphics",
      "Audiobook promotional assets",
    ],
    processNote:
      "Timing depends on the script, number of characters, visual complexity and launch schedule.",
    category: "books-publishing",
    cta: "Turn your book into a trailer",
    metaTitle: "Cinematic Book Trailer Production | NexaPixel",
    metaDescription:
      "Animated and cinematic book trailers, character reveals and launch assets for authors, publishers and literary campaigns.",
    faqs: [
      {
        question: "Do you need the full manuscript?",
        answer:
          "Not always. A synopsis, key scenes, character notes, tone references and approved excerpts are often enough to scope the trailer.",
      },
      {
        question: "Can the trailer avoid revealing spoilers?",
        answer:
          "Yes. The treatment can sell atmosphere, character and central tension without revealing major plot turns.",
      },
      {
        question: "Can you create both launch and social versions?",
        answer:
          "Yes. Alternate durations and aspect ratios can be planned as part of one campaign scope.",
      },
    ],
  },
  {
    slug: "saas-explainer-videos",
    path: "/saas-explainer-videos",
    eyebrow: "Products made clear",
    h1: "SaaS explainer videos that make the product easier to understand.",
    description:
      "NexaPixel turns product logic, workflows and value into a concise visual narrative for launches, websites and campaigns.",
    audience: ["SaaS founders", "Product marketers", "Startup teams", "Launch agencies"],
    problems: [
      "A product is useful but difficult to understand in a few seconds.",
      "Feature lists need to become one coherent story.",
      "A launch requires versions for the website, sales and social channels.",
    ],
    deliverables: [
      "Product overview",
      "Feature explainer",
      "Launch video",
      "Website hero video",
      "Social advertisements",
      "Voiceover and caption versions",
    ],
    processNote:
      "The schedule is based on script readiness, UI capture needs, animation complexity and the review process.",
    category: "explainers",
    cta: "Brief your product",
    metaTitle: "AI-Assisted SaaS Explainer Videos | NexaPixel",
    metaDescription:
      "Clear, cinematic SaaS explainer and product-launch videos for founders, product marketers and startup teams.",
    faqs: [
      {
        question: "Can the video include the real product interface?",
        answer:
          "Yes. Supplied UI recordings, stills or approved product flows can be combined with motion, typography and narrative visuals.",
      },
      {
        question: "Do you write the script?",
        answer:
          "Script development can be included. Product truth, audience and required claims are confirmed with the client before production.",
      },
      {
        question: "Can we create several versions from one production?",
        answer:
          "Yes. Website, launch, sales and social versions can be scoped from the same approved visual system.",
      },
    ],
  },
  {
    slug: "ai-video-ads",
    path: "/ai-video-ads",
    eyebrow: "Campaign-ready video",
    h1: "AI-assisted video ads designed around your product and campaign.",
    description:
      "NexaPixel develops product-led concepts, hooks and platform variations without making unsupported promises about performance.",
    audience: ["Ecommerce brands", "Agencies", "Marketing teams", "Consumer startups"],
    problems: [
      "Campaigns need enough creative variation to test different ideas.",
      "The product must stay legible while the video earns attention.",
      "One master rarely fits every paid and organic placement.",
    ],
    deliverables: [
      "Product advertisements",
      "UGC-style concepts",
      "Cinematic brand ads",
      "Vertical social ads",
      "Multiple opening hooks",
      "Platform variations",
    ],
    processNote:
      "Scope is based on the number of concepts, hooks, scenes, products and required platform versions.",
    category: "brand-product",
    cta: "Brief your campaign",
    metaTitle: "AI-Assisted Video Ads for Products and Brands | NexaPixel",
    metaDescription:
      "AI-assisted product ads, UGC-style concepts and cinematic campaign videos built for ecommerce brands and marketing teams.",
    faqs: [
      {
        question: "Do you guarantee ad performance?",
        answer:
          "No. NexaPixel produces the agreed creative assets; media performance depends on the offer, targeting, placement and wider campaign.",
      },
      {
        question: "Can you create several hooks?",
        answer:
          "Yes. Alternate openings and platform versions can be planned when the project is scoped.",
      },
      {
        question: "Do you need a physical product?",
        answer:
          "It depends on the concept. Product photography, renders, packaging files and approved reference material may be enough for some productions.",
      },
    ],
  },
  {
    slug: "brand-product-films",
    path: "/brand-product-films",
    eyebrow: "Brand and product films",
    h1: "Cinematic product and brand films built around one clear idea.",
    description:
      "From tactile product detail to a wider brand story, NexaPixel creates focused films for launches, websites and social campaigns.",
    audience: ["Consumer brands", "Startups", "Creative agencies", "Product teams"],
    problems: [
      "A product needs a visual language, not another generic feature montage.",
      "The film must balance atmosphere with clear product recognition.",
      "Launch assets need to remain consistent across several formats.",
    ],
    deliverables: [
      "Brand film",
      "Product launch film",
      "Website hero video",
      "Social cutdowns",
      "Vertical versions",
      "Captioned masters",
    ],
    processNote:
      "Timing is confirmed after the concept, assets, scene count and delivery formats are agreed.",
    category: "brand-product",
    cta: "Brief your brand film",
    metaTitle: "Cinematic Brand and Product Film Production | NexaPixel",
    metaDescription:
      "Cinematic brand films, product launch videos and platform-ready social versions from an AI-native production studio.",
    faqs: [
      {
        question: "Can the production follow existing brand guidelines?",
        answer:
          "Yes. Approved typography, colours, product rules and campaign direction can be built into the treatment.",
      },
      {
        question: "Can you work with an agency treatment?",
        answer:
          "Yes. NexaPixel can develop the concept or produce from an approved creative direction supplied by an agency or internal team.",
      },
      {
        question: "What product assets are useful?",
        answer:
          "High-resolution photography, renders, packaging files, brand guidelines and accurate product details help define the production route.",
      },
    ],
  },
  {
    slug: "character-anime-videos",
    path: "/character-anime-videos",
    eyebrow: "Characters built for motion",
    h1: "Original characters and animated worlds developed for motion.",
    description:
      "NexaPixel develops character rules, visual continuity and scene direction for original animated and anime-inspired work.",
    audience: ["Original creators", "Filmmakers", "Authors", "Artists", "Entertainment brands"],
    problems: [
      "A character looks different from one generated shot to the next.",
      "A visual style needs clear rules before animation begins.",
      "A world must stay coherent across scenes, formats and future episodes.",
    ],
    deliverables: [
      "Character sheets",
      "Look development",
      "Style exploration",
      "Storyboards",
      "Character-consistent scenes",
      "Anime-inspired sequences",
    ],
    processNote:
      "The schedule depends on the number of characters, style exploration, scene count and required continuity.",
    category: "character-anime",
    cta: "Develop your character",
    metaTitle: "AI Character Design and Anime-Style Video | NexaPixel",
    metaDescription:
      "Original character development, continuity sheets and anime-inspired video production for creators, filmmakers and brands.",
    faqs: [
      {
        question: "Can you recreate an existing copyrighted character?",
        answer:
          "Only when the client has the appropriate rights. The service is designed for original characters and properly licensed properties.",
      },
      {
        question: "What helps character consistency?",
        answer:
          "Approved reference sheets, wardrobe rules, palettes, expressions and shot-specific review create a repeatable visual standard.",
      },
      {
        question: "Can character development lead into a full film?",
        answer:
          "Yes. Look development and character rules can become the foundation for storyboards, scenes and a finished short-form production.",
      },
    ],
  },
  {
    slug: "animated-wedding-films",
    path: "/animated-wedding-films",
    eyebrow: "Personal stories in motion",
    h1: "Turn a real story into an animated film.",
    description:
      "NexaPixel shapes memories, milestones and personal details into a respectful character-led film designed to be kept.",
    audience: ["Wedding clients", "Couples", "Families", "Gift-givers"],
    problems: [
      "A personal story needs emotional specificity rather than a generic montage.",
      "Real people must remain recognisable without becoming caricatures.",
      "Private material needs a clear publication and confidentiality agreement.",
    ],
    deliverables: [
      "Animated wedding films",
      "Proposal stories",
      "Anniversary films",
      "Family stories",
      "Personal milestone films",
      "Private final masters",
    ],
    processNote:
      "Timing is agreed after the story, available reference material, character count and event date are reviewed.",
    category: "personal-stories",
    cta: "Tell us your story",
    metaTitle: "Animated Wedding and Personal Story Films | NexaPixel",
    metaDescription:
      "Turn a wedding, proposal, anniversary or family story into a warm, cinematic animated film created around real details.",
    faqs: [
      {
        question: "What reference material should we provide?",
        answer:
          "Photos, the story in your own words, meaningful locations, clothing details and the intended occasion are useful starting points.",
      },
      {
        question: "Can the finished film remain private?",
        answer:
          "Yes. Publication and portfolio permission can be agreed separately from production delivery.",
      },
      {
        question: "Can you work toward an event date?",
        answer:
          "Yes, when the available schedule allows. Include the fixed date in the first brief so feasibility can be confirmed before work begins.",
      },
    ],
  },
  {
    slug: "trailers-narrative-films",
    path: "/trailers-narrative-films",
    eyebrow: "Trailers and narrative films",
    h1: "Cinematic trailers and short narrative films built scene by scene.",
    description:
      "NexaPixel develops visual worlds, recurring characters and editorial structure for concepts that need more than a single striking image.",
    audience: ["Filmmakers", "Creators", "Studios", "Authors", "Entertainment marketers"],
    problems: [
      "A concept needs to become a sequence with a clear emotional arc.",
      "Characters and locations must remain coherent across multiple scenes.",
      "The edit must reveal enough to create interest without explaining everything.",
    ],
    deliverables: [
      "Concept trailers",
      "Short narrative films",
      "Micro-dramas",
      "Series teasers",
      "Vertical episodes",
      "Promotional cutdowns",
    ],
    processNote:
      "The schedule is based on script length, character and location count, shot complexity and review stages.",
    category: "trailers-narrative",
    cta: "Brief your story",
    metaTitle: "Cinematic Trailers and Narrative Film Production | NexaPixel",
    metaDescription:
      "AI-assisted concept trailers, micro-dramas and short narrative films with coherent characters, scenes and editorial direction.",
    faqs: [
      {
        question: "Can you develop a concept from a short outline?",
        answer:
          "Yes. Treatment, visual direction and shot planning can be included before scene production begins.",
      },
      {
        question: "Can the work be formatted as a vertical series?",
        answer:
          "Yes. Framing, episode structure and delivery formats can be planned for vertical-first distribution.",
      },
      {
        question: "Do you provide sound and captions?",
        answer:
          "Editing, sound design and captioned versions can be included in the agreed deliverables.",
      },
    ],
  },
];

export function getService(slug: string) {
  return SERVICES.find((service) => service.slug === slug);
}
