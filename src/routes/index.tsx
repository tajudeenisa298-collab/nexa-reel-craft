import { createFileRoute } from "@tanstack/react-router";
import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from "react";
import { ArrowUpRight, Play, X, Mail, ChevronRight } from "lucide-react";

import heroReel from "@/assets/hero-reel.jpg";
import cardErnie from "@/assets/card-ernie.jpg";
import cardStanley from "@/assets/card-stanley.jpg";
import cardCarney from "@/assets/card-carney.jpg";
import cardMusic1 from "@/assets/card-music1.jpg";
import cardTrailer1 from "@/assets/card-trailer1.jpg";
import cardDrama1 from "@/assets/card-drama1.jpg";
import cardBrand1 from "@/assets/card-brand1.jpg";
import mvNewborn from "@/assets/mv-newborn.mp4.asset.json";
import mvLuna from "@/assets/mv-luna-dangerous.mp4.asset.json";
import mvAiMusic from "@/assets/mv-ai-music.mp4.asset.json";
import mvSampler from "@/assets/mv-sampler.mp4.asset.json";
import mvUntouchable from "@/assets/mv-untouchable.mp4.asset.json";
import trailerAiDrama from "@/assets/trailer-ai-drama.mp4.asset.json";
import dramaPaperShop from "@/assets/drama-paper-shop.mp4.asset.json";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Nexa-Pixel — AI-powered video production studio" },
      {
        name: "description",
        content:
          "Nexa-Pixel is a boutique AI-powered video production studio building music videos, trailers, character work and brand films for artists and brands who move fast.",
      },
      { property: "og:title", content: "Nexa-Pixel — Cinematic AI video production" },
      {
        property: "og:description",
        content:
          "Music videos, trailers, drama, character design and brand films — built with the speed and range of an AI-native studio.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Home,
});

/* ------------------------------------------------------------------ */
/* Hooks                                                              */
/* ------------------------------------------------------------------ */

function useReveal<T extends HTMLElement>(threshold = 0.15) {
  const ref = useRef<T | null>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            setVisible(true);
            io.unobserve(e.target);
          }
        }
      },
      { threshold, rootMargin: "0px 0px -8% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);
  return { ref, visible } as const;
}

function useIsTouch() {
  const [touch, setTouch] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(hover: none), (pointer: coarse)");
    const update = () => setTouch(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);
  return touch;
}

/* ------------------------------------------------------------------ */
/* Data                                                               */
/* ------------------------------------------------------------------ */

type Category =
  | "music"
  | "trailer"
  | "drama"
  | "character"
  | "brand"
  | "animation";

const CATEGORY_LABEL: Record<Category, string> = {
  music: "Music Videos",
  trailer: "Trailers & Drama",
  drama: "Trailers & Drama",
  character: "Character Design",
  brand: "Brand & Explainer",
  animation: "Animation",
};

type Piece = {
  id: string;
  title: string;
  categories: Category[];
  categoryTag: string;
  description: string;
  image?: string;
  aspect?: "portrait" | "landscape" | "square";
  placeholder?: boolean;
  /* videoSrc — swap in real footage here */
  videoSrc?: string;
};

const PIECES: Piece[] = [
  {
    id: "music-01",
    title: "Untouchable",
    categories: ["music"],
    categoryTag: "Music Video",
    description:
      "Original AI-directed music video — moody, futurist neon world built shot-by-shot with a generative pipeline.",
    videoSrc: mvUntouchable.url,
    aspect: "portrait",
  },
  {
    id: "music-02",
    title: "Luna — Dangerous Liaisons",
    categories: ["music"],
    categoryTag: "Music Video",
    description:
      "Full AI artist campaign for virtual pop persona Luna — cinematic performance visuals cut to a Suno-produced single.",
    videoSrc: mvLuna.url,
    aspect: "portrait",
  },
  {
    id: "music-03",
    title: "New Born",
    categories: ["music"],
    categoryTag: "Music Video",
    description:
      "Ethereal AI music video — birth-of-a-star visual concept, high-contrast portraiture and dreamscape transitions.",
    videoSrc: mvNewborn.url,
    aspect: "landscape",
  },
  {
    id: "music-04",
    title: "AI Sound Sampler",
    categories: ["music"],
    categoryTag: "Music Video",
    description:
      "Rapid-fire visual sampler for an AI-generated track — proof of speed, range, and cut-to-beat editorial precision.",
    videoSrc: mvSampler.url,
    aspect: "landscape",
  },
  {
    id: "music-05",
    title: "AI Music MV",
    categories: ["music"],
    categoryTag: "Music Video",
    description:
      "Concept-to-cut AI music video — character-driven performance staged entirely with generative models.",
    videoSrc: mvAiMusic.url,
    aspect: "portrait",
  },
  {
    id: "trailer-01",
    title: "The Long Shore",
    categories: ["trailer"],
    categoryTag: "Cinematic Trailer",
    description: "Feature-style concept trailer, teal-and-amber grade, orchestral cut.",
    image: cardTrailer1,
    aspect: "landscape",
  },
  {
    id: "trailer-02",
    title: "Overseas — AI Short Drama Teaser",
    categories: ["trailer"],
    categoryTag: "Cinematic Trailer",
    description:
      "International-market AI short-drama teaser — high-contrast cinematic grade, cut for vertical-first release and social pre-roll.",
    videoSrc: trailerAiDrama.url,
    aspect: "portrait",
  },
  {
    id: "drama-01",
    title: "17th Floor",
    categories: ["drama"],
    categoryTag: "Micro-Drama",
    description: "Vertical episodic pilot — 4-part Instagram drama series.",
    image: cardDrama1,
    aspect: "portrait",
  },
  {
    id: "drama-02",
    title: "Paper Shop Uncanny Tales — Ep. 1",
    categories: ["drama"],
    categoryTag: "Micro-Drama",
    description:
      "Episode one of a supernatural micro-drama — Chen Jiu enters the game. Period-styled AI cinematography and character continuity across a serialised vertical release.",
    videoSrc: dramaPaperShop.url,
    aspect: "portrait",
  },
  {
    id: "char-ernie",
    title: "Ernie",
    categories: ["character"],
    categoryTag: "Character Design",
    description:
      "Photoreal character reference sheet — full turnaround, expression sheet, studio lighting.",
    image: cardErnie,
    aspect: "landscape",
  },
  {
    id: "char-stanley",
    title: "Stanley",
    categories: ["character"],
    categoryTag: "Character Design",
    description:
      "Photoreal character reference sheet — full turnaround, expression sheet, studio lighting.",
    image: cardStanley,
    aspect: "landscape",
  },
  {
    id: "anim-carney",
    title: "Carney & Esselle",
    categories: ["animation", "brand"],
    categoryTag: "Animated Wedding Film",
    description:
      "A fully animated wedding story, rendered in a Pixar-inspired style.",
    image: cardCarney,
    aspect: "landscape",
  },
  {
    id: "anim-02",
    title: "Untitled — Stylised Short",
    categories: ["animation"],
    categoryTag: "Animation",
    description: "Placeholder — stylised animated short.",
    placeholder: true,
    aspect: "square",
  },
  {
    id: "anim-03",
    title: "Untitled — Character Loop",
    categories: ["animation"],
    categoryTag: "Animation",
    description: "Placeholder — looping character piece.",
    placeholder: true,
    aspect: "portrait",
  },
  {
    id: "brand-01",
    title: "Halo — Fragrance Film",
    categories: ["brand"],
    categoryTag: "Brand Film",
    description: "60-second product film for an indie fragrance house.",
    image: cardBrand1,
    aspect: "landscape",
  },
  {
    id: "brand-02",
    title: "Untitled — Explainer",
    categories: ["brand"],
    categoryTag: "Animated Explainer",
    description: "Placeholder — 90-second animated explainer for a SaaS launch.",
    placeholder: true,
    aspect: "landscape",
  },
];

const FILTERS: { id: "all" | Category; label: string }[] = [
  { id: "all", label: "All" },
  { id: "music", label: "Music Videos" },
  { id: "trailer", label: "Trailers & Drama" },
  { id: "character", label: "Character Design" },
  { id: "brand", label: "Brand & Explainer" },
  { id: "animation", label: "Animation" },
];

/* ------------------------------------------------------------------ */
/* Page                                                               */
/* ------------------------------------------------------------------ */

function Home() {
  const [openPiece, setOpenPiece] = useState<Piece | null>(null);
  const isTouch = useIsTouch();

  /* Scroll progress bar */
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const doc = document.documentElement;
      const p = doc.scrollTop / Math.max(1, doc.scrollHeight - doc.clientHeight);
      setProgress(Math.min(1, Math.max(0, p)));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="relative min-h-screen overflow-x-clip bg-background text-foreground">
      <CustomCursor />
      {/* Scroll progress rail */}
      <div
        aria-hidden
        className="fixed left-0 top-0 z-[60] h-[2px] w-full bg-transparent"
      >
        <div
          className="h-full bg-primary transition-[width] duration-100"
          style={{ width: `${progress * 100}%` }}
        />
      </div>

      <Nav />
      <Hero isTouch={isTouch} />
      <CapabilitiesStrip />
      <Portfolio onOpen={setOpenPiece} isTouch={isTouch} />
      <CaseStudy />
      <Process />
      <RangeStatement />
      <Testimonials />
      <Contact />
      <Footer />

      {openPiece && (
        <Lightbox piece={openPiece} onClose={() => setOpenPiece(null)} />
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Custom cursor (desktop)                                            */
/* ------------------------------------------------------------------ */

function CustomCursor() {
  const dotRef = useRef<HTMLDivElement | null>(null);
  const ringRef = useRef<HTMLDivElement | null>(null);
  const labelRef = useRef<HTMLDivElement | null>(null);
  const [label, setLabel] = useState("");
  const [active, setActive] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(hover: none), (pointer: coarse)").matches) return;
    const root = document.documentElement;
    root.classList.add("has-custom-cursor");

    let mx = window.innerWidth / 2;
    let my = window.innerHeight / 2;
    let rx = mx;
    let ry = my;
    let raf = 0;

    const loop = () => {
      rx += (mx - rx) * 0.2;
      ry += (my - ry) * 0.2;
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mx}px, ${my}px, 0) translate(-50%, -50%)`;
      }
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${rx}px, ${ry}px, 0) translate(-50%, -50%)`;
      }
      if (labelRef.current) {
        labelRef.current.style.transform = `translate3d(${rx + 22}px, ${ry + 20}px, 0)`;
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    const resolveLabel = (el: HTMLElement): string | null => {
      const custom = el.getAttribute("data-cursor");
      if (custom !== null) return custom;
      const tag = el.tagName.toLowerCase();
      if (tag === "a") return "Open";
      if (tag === "button" || el.getAttribute("role") === "button") return "Click";
      if (tag === "input" || tag === "textarea" || tag === "select") return "Type";
      if (tag === "video") return "Play";
      return null;
    };

    const onMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
      setVisible(true);
      const t = e.target as HTMLElement | null;
      const el =
        t?.closest<HTMLElement>(
          "[data-cursor], a, button, [role='button'], input, textarea, select, video, label",
        ) ?? null;
      if (el) {
        const text = resolveLabel(el);
        if (text) {
          setLabel(text);
          setActive(true);
          return;
        }
      }
      setActive(false);
    };
    const onOut = () => setVisible(false);
    const onDown = () => {
      if (ringRef.current) ringRef.current.style.setProperty("--press", "0.8");
    };
    const onUp = () => {
      if (ringRef.current) ringRef.current.style.setProperty("--press", "1");
    };

    window.addEventListener("mousemove", onMove);
    document.addEventListener("mouseleave", onOut);
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", onOut);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
      root.classList.remove("has-custom-cursor");
    };
  }, []);

  return (
    <div
      aria-hidden
      className={`pointer-events-none fixed inset-0 z-[100] hidden md:block ${visible ? "opacity-100" : "opacity-0"} transition-opacity duration-200`}
    >
      <div
        ref={ringRef}
        className={`fixed left-0 top-0 rounded-full border border-primary transition-[width,height,background-color,border-color] duration-300 ease-out ${
          active ? "h-12 w-12 bg-primary/10" : "h-8 w-8 bg-transparent"
        }`}
        style={{ willChange: "transform" }}
      />
      <div
        ref={dotRef}
        className="fixed left-0 top-0 h-[6px] w-[6px] rounded-full bg-primary shadow-[0_0_12px_var(--primary)]"
        style={{ willChange: "transform" }}
      />
      <div
        ref={labelRef}
        className={`fixed left-0 top-0 whitespace-nowrap rounded-full bg-primary px-3 py-1 text-[10px] uppercase tracking-[0.25em] text-primary-foreground transition-opacity duration-200 ${
          active && label ? "opacity-100" : "opacity-0"
        }`}
        style={{ willChange: "transform" }}
      >
        {label}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Nav                                                                */
/* ------------------------------------------------------------------ */

const NAV_SECTIONS = [
  { id: "work", label: "Work" },
  { id: "case", label: "Case study" },
  { id: "process", label: "Process" },
  { id: "range", label: "Range" },
  { id: "contact", label: "Contact" },
] as const;

function Nav() {
  const [active, setActive] = useState<string>("work");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const els = NAV_SECTIONS.map((s) => document.getElementById(s.id)).filter(
      Boolean,
    ) as HTMLElement[];
    if (!els.length) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-40% 0px -55% 0px", threshold: 0 },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-4 pt-4 sm:px-8">
      <div className="glass mx-auto flex max-w-7xl items-center justify-between rounded-full px-5 py-3">
        <a href="#top" className="text-display text-lg tracking-[0.18em] text-foreground">
          NEXA<span className="text-primary">·</span>PIXEL
        </a>

        <nav className="hidden items-center gap-7 md:flex">
          {NAV_SECTIONS.map((s) => (
            <a
              key={s.id}
              href={`#${s.id}`}
              data-active={active === s.id}
              className="underline-draw text-[13px] uppercase tracking-[0.2em] text-muted-foreground transition-colors hover:text-foreground data-[active=true]:text-foreground"
            >
              {s.label}
            </a>
          ))}
        </nav>

        <a
          href="#contact"
          className="hidden items-center gap-2 rounded-full border border-white/15 px-4 py-2 text-[12px] uppercase tracking-[0.2em] text-foreground transition-colors hover:bg-primary hover:border-primary md:inline-flex"
        >
          Start a project <ArrowUpRight className="h-3.5 w-3.5" />
        </a>

        <button
          aria-label="Menu"
          className="md:hidden inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/15"
          onClick={() => setOpen((v) => !v)}
        >
          <span className="relative block h-3 w-4">
            <span
              className={`absolute left-0 top-0 h-[1.5px] w-full bg-current transition-transform ${open ? "translate-y-[5px] rotate-45" : ""}`}
            />
            <span
              className={`absolute bottom-0 left-0 h-[1.5px] w-full bg-current transition-transform ${open ? "-translate-y-[5px] -rotate-45" : ""}`}
            />
          </span>
        </button>
      </div>

      {open && (
        <div className="glass mx-auto mt-2 max-w-7xl rounded-2xl p-4 md:hidden">
          <div className="flex flex-col">
            {NAV_SECTIONS.map((s) => (
              <a
                key={s.id}
                href={`#${s.id}`}
                onClick={() => setOpen(false)}
                className="border-b border-white/5 py-3 text-sm uppercase tracking-[0.2em] text-muted-foreground last:border-0"
              >
                {s.label}
              </a>
            ))}
            <a
              href="#contact"
              onClick={() => setOpen(false)}
              className="mt-3 inline-flex items-center justify-center rounded-full bg-primary px-4 py-3 text-[12px] uppercase tracking-[0.2em] text-primary-foreground"
            >
              Start a project
            </a>
          </div>
        </div>
      )}
    </header>
  );
}

/* ------------------------------------------------------------------ */
/* Hero                                                               */
/* ------------------------------------------------------------------ */

function Hero({ isTouch }: { isTouch: boolean }) {
  const heroRef = useRef<HTMLDivElement | null>(null);
  const [parallax, setParallax] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (isTouch) return;
    const el = heroRef.current;
    if (!el) return;
    const onMove = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      const cx = (e.clientX - r.left) / r.width - 0.5;
      const cy = (e.clientY - r.top) / r.height - 0.5;
      setParallax({ x: cx, y: cy });
    };
    el.addEventListener("mousemove", onMove);
    return () => el.removeEventListener("mousemove", onMove);
  }, [isTouch]);

  return (
    <section
      id="top"
      ref={heroRef}
      className="grain relative flex min-h-[100svh] items-center overflow-hidden"
    >
      {/* Background reel — swap the <img> for a <video> autoplay muted loop */}
      <div
        className="absolute inset-0 z-0"
        style={{
          transform: `translate3d(${parallax.x * -20}px, ${parallax.y * -20}px, 0)`,
          transition: "transform 400ms cubic-bezier(0.16,1,0.3,1)",
        }}
      >
        {/*
          SWAP: replace this <img> with your looping reel:
          <video autoPlay muted loop playsInline poster={heroReel}
                 className="animate-kenburns h-full w-full object-cover">
            <source src="/reel.mp4" type="video/mp4" />
          </video>
        */}
        <img
          src={heroReel}
          alt=""
          width={1920}
          height={1080}
          className="animate-kenburns h-full w-full object-cover"
        />
      </div>
      <div
        aria-hidden
        className="absolute inset-0 z-0 bg-gradient-to-b from-background/70 via-background/40 to-background"
      />
      <div
        aria-hidden
        className="absolute inset-0 z-0 bg-[radial-gradient(120%_80%_at_50%_120%,transparent,var(--background))]"
      />

      <div
        className="relative z-10 mx-auto w-full max-w-7xl px-6 pt-32 pb-24 sm:px-10"
        style={{
          transform: `translate3d(${parallax.x * 8}px, ${parallax.y * 6}px, 0)`,
          transition: "transform 500ms cubic-bezier(0.16,1,0.3,1)",
        }}
      >
        <p
          className="hero-word mb-8 text-[11px] uppercase tracking-[0.4em] text-muted-foreground"
          style={{ animationDelay: "0.05s" } as CSSProperties}
        >
          <span className="mr-3 inline-block h-px w-8 translate-y-[-4px] bg-primary align-middle" />
          A boutique AI production studio
        </p>

        <h1 className="text-editorial max-w-[15ch] text-[clamp(3.5rem,10vw,10rem)] font-light">
          {["Motion", "with", "the"].map((w, i) => (
            <span
              key={w + i}
              className="hero-word mr-[0.25em]"
              style={{ animationDelay: `${0.15 + i * 0.1}s` } as CSSProperties}
            >
              {w}
            </span>
          ))}
          <br />
          <span
            className="hero-word italic text-primary"
            style={{ animationDelay: "0.55s" } as CSSProperties}
          >
            weight
          </span>{" "}
          <span
            className="hero-word"
            style={{ animationDelay: "0.7s" } as CSSProperties}
          >
            of film.
          </span>
        </h1>

        <p
          className="hero-word mt-10 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg"
          style={{ animationDelay: "0.95s" } as CSSProperties}
        >
          AI-powered video production for artists and brands who move fast. Music
          videos, trailers, drama, character work and brand films — built at the
          speed real release schedules demand.
        </p>

        <div
          className="hero-word mt-12"
          style={{ animationDelay: "1.1s" } as CSSProperties}
        >
          <MagneticCTA href="#work">View the work</MagneticCTA>
        </div>
      </div>

      <div
        aria-hidden
        className="pointer-events-none absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-[10px] uppercase tracking-[0.35em] text-muted-foreground md:flex"
      >
        <span>Scroll</span>
        <span className="h-8 w-px animate-pulse bg-muted-foreground/50" />
      </div>
    </section>
  );
}

function MagneticCTA({ href, children }: { href: string; children: ReactNode }) {
  const ref = useRef<HTMLAnchorElement | null>(null);
  const [t, setT] = useState({ x: 0, y: 0 });

  const onMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = e.clientX - (r.left + r.width / 2);
    const y = e.clientY - (r.top + r.height / 2);
    setT({ x: x * 0.25, y: y * 0.25 });
  };
  const onLeave = () => setT({ x: 0, y: 0 });

  return (
    <a
      ref={ref}
      href={href}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{
        transform: `translate3d(${t.x}px, ${t.y}px, 0)`,
        transition: "transform 300ms cubic-bezier(0.16,1,0.3,1)",
      }}
      className="group relative inline-flex items-center gap-3 overflow-hidden rounded-full border border-white/20 px-8 py-4 text-[13px] uppercase tracking-[0.25em]"
    >
      <span
        aria-hidden
        className="absolute inset-y-0 left-0 -z-10 w-0 bg-primary transition-[width] duration-500 ease-out group-hover:w-full"
      />
      <span className="relative">{children}</span>
      <ArrowUpRight className="relative h-4 w-4 transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
    </a>
  );
}

/* ------------------------------------------------------------------ */
/* Capabilities marquee                                               */
/* ------------------------------------------------------------------ */

const CAPS = [
  "AI Music Videos",
  "Movie Trailers",
  "Drama Series & Micro-Dramas",
  "Character Design",
  "Animated Explainers",
  "Brand & Product Films",
  "UGC-Style Content",
];

function CapabilitiesStrip() {
  const [paused, setPaused] = useState(false);
  const items = [...CAPS, ...CAPS];
  return (
    <section
      aria-label="Capabilities"
      className="border-y border-white/5 bg-surface/40 py-6"
    >
      <div
        className="relative overflow-hidden"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        <div
          className="animate-marquee flex w-max gap-14 whitespace-nowrap"
          style={{ animationPlayState: paused ? "paused" : "running" }}
        >
          {items.map((c, i) => (
            <span
              key={i}
              className="underline-draw text-editorial cursor-default text-2xl font-light text-foreground/80 sm:text-3xl"
            >
              {c}
              <span className="mx-8 text-primary">✦</span>
            </span>
          ))}
        </div>
        <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-background to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-background to-transparent" />
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Portfolio                                                          */
/* ------------------------------------------------------------------ */

function Portfolio({
  onOpen,
  isTouch,
}: {
  onOpen: (p: Piece) => void;
  isTouch: boolean;
}) {
  const [filter, setFilter] = useState<"all" | Category>("all");

  const visible = useMemo(
    () =>
      filter === "all"
        ? PIECES
        : PIECES.filter((p) => p.categories.includes(filter)),
    [filter],
  );

  const { ref, visible: intro } = useReveal<HTMLDivElement>();

  return (
    <section id="work" className="relative px-6 py-28 sm:px-10 sm:py-36">
      <div ref={ref} className="mx-auto max-w-7xl">
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <div>
            <p
              className="reveal text-[11px] uppercase tracking-[0.35em] text-muted-foreground"
              data-visible={intro}
            >
              <span className="mr-3 inline-block h-px w-8 translate-y-[-4px] bg-primary align-middle" />
              Selected work — 2024 / 2025
            </p>
            <h2
              className="reveal text-editorial mt-4 text-[clamp(2.5rem,6vw,5rem)]"
              data-visible={intro}
              style={{ transitionDelay: "80ms" }}
            >
              The reel.
            </h2>
          </div>

          <div
            className="reveal flex flex-wrap gap-2"
            data-visible={intro}
            style={{ transitionDelay: "160ms" }}
          >
            {FILTERS.map((f) => (
              <button
                key={f.id}
                onClick={() => setFilter(f.id)}
                data-active={filter === f.id}
                className="underline-draw rounded-full border border-white/10 px-4 py-2 text-[11px] uppercase tracking-[0.2em] text-muted-foreground transition-colors hover:text-foreground data-[active=true]:border-primary/60 data-[active=true]:bg-primary/10 data-[active=true]:text-foreground"
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        <div
          className={`cursor-none-zone mt-14 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5`}
        >
          {visible.map((p, i) => (
            <PortfolioCard
              key={p.id}
              piece={p}
              index={i}
              onOpen={() => onOpen(p)}
              isTouch={isTouch}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function PortfolioCard({
  piece,
  index,
  onOpen,
  isTouch,
}: {
  piece: Piece;
  index: number;
  onOpen: () => void;
  isTouch: boolean;
}) {
  const { ref, visible } = useReveal<HTMLButtonElement>();
  const [hover, setHover] = useState(false);
  const [tapped, setTapped] = useState(false);

  const aspect =
    piece.aspect === "portrait"
      ? "aspect-[3/4]"
      : piece.aspect === "square"
        ? "aspect-square"
        : "aspect-[16/10]";

  const onMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty(
      "--mx",
      `${((e.clientX - r.left) / r.width) * 100}%`,
    );
    e.currentTarget.style.setProperty(
      "--my",
      `${((e.clientY - r.top) / r.height) * 100}%`,
    );
  };

  const handleTap = () => {
    if (!isTouch) {
      onOpen();
      return;
    }
    if (!tapped) {
      setTapped(true);
      return;
    }
    onOpen();
  };

  return (
    <button
      ref={ref}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onMouseMove={onMove}
      onClick={handleTap}
      data-cursor="Play"
      data-visible={visible}
      style={{
        transitionDelay: `${Math.min(index, 8) * 60}ms`,
      }}
      className="reveal card-spotlight group relative block w-full overflow-hidden rounded-xl border border-white/5 bg-surface text-left transition-transform duration-500 ease-out active:scale-[0.99]"
    >
      <div className={`relative ${aspect} w-full overflow-hidden`}>
        {piece.videoSrc ? (
          <video
            src={piece.videoSrc}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            className="h-full w-full object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.04]"
          />
        ) : piece.image ? (
          <img
            src={piece.image}
            alt={piece.title}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.06]"
          />
        ) : (
          <PlaceholderThumb title={piece.title} />
        )}

        {/* gradient scrim */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/95 via-background/10 to-transparent" />

        {/* meta tag top-left */}
        <span className="absolute left-3 top-3 rounded-full bg-background/60 px-2.5 py-1 text-[10px] uppercase tracking-[0.2em] text-foreground/90 backdrop-blur">
          {piece.categoryTag}
        </span>

        {/* placeholder chip */}
        {piece.placeholder && (
          <span className="absolute right-3 top-3 rounded-full border border-primary/40 bg-primary/10 px-2.5 py-1 text-[10px] uppercase tracking-[0.2em] text-primary">
            Placeholder
          </span>
        )}

        {/* Play badge — only on non-touch it appears on hover */}
        <span
          className={`absolute right-3 bottom-3 z-10 inline-flex items-center gap-2 rounded-full bg-primary px-3 py-1.5 text-[10px] uppercase tracking-[0.2em] text-primary-foreground opacity-0 translate-y-2 transition-all duration-500 ease-out group-hover:opacity-100 group-hover:translate-y-0 ${tapped ? "opacity-100 translate-y-0" : ""}`}
        >
          <Play className="h-3 w-3 fill-current" />
          {isTouch && !tapped ? "Preview" : "Play"}
        </span>
      </div>

      {/* Bottom info block — slides up on hover */}
      <div className="absolute inset-x-0 bottom-0 z-10 translate-y-3 p-4 opacity-95 transition-transform duration-500 ease-out group-hover:translate-y-0">
        <h3 className="text-editorial text-2xl">{piece.title}</h3>
        <p className="mt-1 line-clamp-2 max-w-[38ch] text-sm text-muted-foreground opacity-0 transition-opacity duration-500 ease-out group-hover:opacity-100">
          {piece.description}
        </p>
      </div>
    </button>
  );
}

function PlaceholderThumb({ title }: { title: string }) {
  return (
    <div className="grain relative flex h-full w-full items-center justify-center bg-[linear-gradient(135deg,oklch(0.16_0.015_260),oklch(0.22_0.02_15))]">
      <div className="absolute inset-4 rounded-lg border border-dashed border-white/10" />
      <div className="text-center">
        <div className="text-editorial text-3xl text-foreground/40">{title}</div>
        <div className="mt-2 text-[10px] uppercase tracking-[0.3em] text-muted-foreground/60">
          Reel — coming soon
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Case Study                                                         */
/* ------------------------------------------------------------------ */

function CaseStudy() {
  const { ref, visible } = useReveal<HTMLDivElement>();
  return (
    <section
      id="case"
      className="relative px-6 py-28 sm:px-10 sm:py-36"
      ref={ref}
    >
      <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <div
            className="reveal reveal-clip overflow-hidden rounded-2xl border border-white/5"
            data-visible={visible}
          >
            <div className="relative aspect-[16/10] w-full overflow-hidden bg-surface">
              <img
                src={cardCarney}
                alt="Carney & Esselle — animated wedding film still"
                loading="lazy"
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="glass grid h-16 w-16 place-items-center rounded-full">
                  <Play className="h-5 w-5 fill-current" />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-5">
          <p
            className="reveal text-[11px] uppercase tracking-[0.35em] text-muted-foreground"
            data-visible={visible}
          >
            <span className="mr-3 inline-block h-px w-8 translate-y-[-4px] bg-primary align-middle" />
            Case study
          </p>
          <h3
            className="reveal text-editorial mt-4 text-[clamp(2rem,4vw,3.5rem)]"
            data-visible={visible}
            style={{ transitionDelay: "80ms" }}
          >
            Carney &amp; Esselle — a Pixar-style wedding film.
          </h3>

          <div
            className="reveal mt-8 space-y-6 text-muted-foreground"
            data-visible={visible}
            style={{ transitionDelay: "160ms" }}
          >
            <p>
              <span className="mr-2 text-foreground">Goal —</span>
              A wedding gift that felt like a Pixar short: two characters, a
              real love story, one unforgettable frame per beat.
            </p>
            <p>
              <span className="mr-2 text-foreground">Approach —</span>
              Character sheets, storyboard, lookdev and animation produced
              in-house using an AI-native pipeline — from concept to master in
              under three weeks.
            </p>
            <p>
              <span className="mr-2 text-foreground">Result —</span>
              Delivered ahead of the ceremony. Played on the day. Watched on
              repeat since.
            </p>
          </div>

          <div className="mt-10 grid grid-cols-3 gap-4">
            <Stat label="Days brief → delivery" value={19} suffix="d" />
            <Stat label="Custom shots" value={42} />
            <Stat label="Placeholder metric" value={0} placeholder />
          </div>
        </div>
      </div>
    </section>
  );
}

function Stat({
  label,
  value,
  suffix,
  placeholder,
}: {
  label: string;
  value: number;
  suffix?: string;
  placeholder?: boolean;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [n, setN] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            const start = performance.now();
            const dur = 1400;
            const step = (t: number) => {
              const p = Math.min(1, (t - start) / dur);
              const eased = 1 - Math.pow(1 - p, 3);
              setN(Math.round(value * eased));
              if (p < 1) requestAnimationFrame(step);
            };
            requestAnimationFrame(step);
            io.unobserve(el);
          }
        });
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [value]);

  return (
    <div ref={ref} className="border-t border-white/10 pt-4">
      <div className="text-editorial text-4xl">
        {placeholder ? "—" : n}
        {!placeholder && suffix ? <span className="text-primary">{suffix}</span> : null}
      </div>
      <div className="mt-2 text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
        {label}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Process                                                            */
/* ------------------------------------------------------------------ */

const STEPS = [
  { n: "01", t: "Brief", d: "One call. Reference reel, tone, deliverables, deadline." },
  { n: "02", t: "Concept", d: "Boards, look-frames and a cut list within 72 hours." },
  { n: "03", t: "Production", d: "Shots built in an AI-native pipeline — fast iteration, no compromise on craft." },
  { n: "04", t: "Delivery", d: "Master + platform cuts, colour and sound locked. On time." },
];

function Process() {
  const { ref, visible } = useReveal<HTMLDivElement>();
  return (
    <section id="process" className="relative bg-surface/30 px-6 py-28 sm:px-10 sm:py-36" ref={ref}>
      <div className="mx-auto max-w-7xl">
        <p className="reveal text-[11px] uppercase tracking-[0.35em] text-muted-foreground" data-visible={visible}>
          <span className="mr-3 inline-block h-px w-8 translate-y-[-4px] bg-primary align-middle" />
          Process
        </p>
        <h2
          className="reveal text-editorial mt-4 max-w-3xl text-[clamp(2rem,5vw,4rem)]"
          data-visible={visible}
          style={{ transitionDelay: "80ms" }}
        >
          Brief on Monday. Cut in your inbox before the week is out.
        </h2>

        <div className="relative mt-16">
          {/* Connecting line (desktop) */}
          <svg
            aria-hidden
            className="pointer-events-none absolute left-0 right-0 top-9 hidden h-2 w-full md:block"
            viewBox="0 0 1000 4"
            preserveAspectRatio="none"
          >
            <line
              x1="0"
              y1="2"
              x2="1000"
              y2="2"
              stroke="oklch(1 0 0 / 0.1)"
              strokeWidth="1"
            />
            <line
              x1="0"
              y1="2"
              x2="1000"
              y2="2"
              stroke="var(--primary)"
              strokeWidth="1.5"
              strokeDasharray="1000"
              style={{
                strokeDashoffset: visible ? 0 : 1000,
                transition: "stroke-dashoffset 2.2s cubic-bezier(0.16,1,0.3,1) 200ms",
              }}
            />
          </svg>

          <ol className="grid grid-cols-1 gap-10 md:grid-cols-4 md:gap-6">
            {STEPS.map((s, i) => (
              <li
                key={s.n}
                className="reveal relative"
                data-visible={visible}
                style={{ transitionDelay: `${300 + i * 180}ms` }}
              >
                <div className="mb-6 grid h-6 w-6 place-items-center rounded-full bg-primary text-[10px] font-medium text-primary-foreground">
                  {i + 1}
                </div>
                <div className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
                  Step {s.n}
                </div>
                <div className="text-editorial mt-2 text-3xl">{s.t}</div>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {s.d}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Range statement                                                    */
/* ------------------------------------------------------------------ */

function RangeStatement() {
  const { ref, visible } = useReveal<HTMLDivElement>(0.25);
  const lines = [
    "We aren't a one-trick shop.",
    "Music videos, narrative drama, character work, brand film —",
    "we move between them like a studio, not a template.",
    "That range is the advantage.",
  ];
  return (
    <section id="range" className="relative px-6 py-32 sm:px-10 sm:py-40" ref={ref}>
      <div className="mx-auto max-w-5xl">
        <div className="text-editorial text-[clamp(2rem,5.5vw,4.5rem)] leading-[1.05]">
          {lines.map((l, i) => (
            <div
              key={i}
              className="reveal reveal-clip"
              data-visible={visible}
              style={{ transitionDelay: `${i * 220}ms` }}
            >
              {l}
              {i === lines.length - 1 && (
                <span className="text-primary"> ▍</span>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Testimonials                                                       */
/* ------------------------------------------------------------------ */

const QUOTES = [
  {
    q: "They turned a scribbled brief into a finished trailer in a week. Feels criminal.",
    a: "Placeholder client",
    r: "Placeholder role",
  },
  {
    q: "The character work alone would've cost me a month at any traditional studio.",
    a: "Placeholder client",
    r: "Placeholder role",
  },
  {
    q: "It looks like film, not a demo. That's the whole game.",
    a: "Placeholder client",
    r: "Placeholder role",
  },
];

function Testimonials() {
  const [i, setI] = useState(0);
  const { ref, visible } = useReveal<HTMLDivElement>();

  useEffect(() => {
    const id = window.setInterval(() => setI((v) => (v + 1) % QUOTES.length), 6000);
    return () => window.clearInterval(id);
  }, []);

  return (
    <section className="relative bg-surface/30 px-6 py-28 sm:px-10 sm:py-36" ref={ref}>
      <div className="mx-auto max-w-6xl">
        <p className="reveal text-[11px] uppercase tracking-[0.35em] text-muted-foreground" data-visible={visible}>
          <span className="mr-3 inline-block h-px w-8 translate-y-[-4px] bg-primary align-middle" />
          What clients say <span className="ml-3 text-primary/70">— placeholder quotes</span>
        </p>

        <div className="relative mt-10 h-[220px] sm:h-[180px]">
          {QUOTES.map((q, idx) => (
            <blockquote
              key={idx}
              aria-hidden={i !== idx}
              className={`absolute inset-0 transition-opacity duration-1000 ${i === idx ? "opacity-100" : "opacity-0"}`}
            >
              <p className="text-editorial max-w-4xl text-[clamp(1.5rem,3.2vw,2.75rem)] leading-tight">
                &ldquo;{q.q}&rdquo;
              </p>
              <footer className="mt-6 text-[11px] uppercase tracking-[0.25em] text-muted-foreground">
                {q.a} <span className="mx-2 text-primary">·</span> {q.r}
              </footer>
            </blockquote>
          ))}
        </div>

        <div className="mt-6 flex gap-2">
          {QUOTES.map((_, idx) => (
            <button
              key={idx}
              aria-label={`Quote ${idx + 1}`}
              onClick={() => setI(idx)}
              className={`h-[2px] w-10 transition-colors ${i === idx ? "bg-primary" : "bg-white/15"}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Contact                                                            */
/* ------------------------------------------------------------------ */

function Contact() {
  const { ref, visible } = useReveal<HTMLDivElement>(0.2);
  return (
    <section
      id="contact"
      ref={ref}
      className="grain relative overflow-hidden px-6 py-32 sm:px-10 sm:py-44"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(70%_50%_at_50%_100%,color-mix(in_oklab,var(--primary)_18%,transparent),transparent)]"
      />
      <div className="mx-auto max-w-5xl text-center">
        <p className="reveal text-[11px] uppercase tracking-[0.35em] text-muted-foreground" data-visible={visible}>
          Contact
        </p>
        <h2
          className="reveal text-editorial mx-auto mt-6 max-w-[16ch] text-[clamp(2.5rem,7vw,6rem)]"
          data-visible={visible}
          style={{ transitionDelay: "100ms" }}
        >
          Got a reel that needs to <em className="italic text-primary">exist</em>?
        </h2>
        <p
          className="reveal mx-auto mt-6 max-w-xl text-muted-foreground"
          data-visible={visible}
          style={{ transitionDelay: "200ms" }}
        >
          Send us the brief. We'll come back with a treatment and a delivery date
          within 48 hours.
        </p>
        <div
          className="reveal mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row"
          data-visible={visible}
          style={{ transitionDelay: "300ms" }}
        >
          <MagneticCTA href="mailto:hello@nexa-pixel.studio">
            <span className="inline-flex items-center gap-2">
              <Mail className="h-4 w-4" /> hello@nexa-pixel.studio
            </span>
          </MagneticCTA>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Footer                                                             */
/* ------------------------------------------------------------------ */

function Footer() {
  return (
    <footer className="border-t border-white/5 px-6 py-10 sm:px-10">
      <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-6 md:flex-row md:items-center">
        <div className="text-display text-lg tracking-[0.18em]">
          NEXA<span className="text-primary">·</span>PIXEL
        </div>
        <div className="flex flex-wrap gap-6 text-[11px] uppercase tracking-[0.25em] text-muted-foreground">
          <a href="#" className="underline-draw">YouTube</a>
          <a href="#" className="underline-draw">Instagram</a>
          <a href="#" className="underline-draw">Fiverr</a>
          <a href="#" className="underline-draw">Vimeo</a>
        </div>
        <div className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground/60">
          © {new Date().getFullYear()} Nexa-Pixel Studio
        </div>
      </div>
    </footer>
  );
}

/* ------------------------------------------------------------------ */
/* Lightbox                                                           */
/* ------------------------------------------------------------------ */

function Lightbox({ piece, onClose }: { piece: Piece; onClose: () => void }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [onClose]);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`${piece.title} — video preview`}
      className="fixed inset-0 z-[80] grid place-items-center bg-background/90 p-4 backdrop-blur-md sm:p-8 animate-in fade-in duration-300"
      onClick={onClose}
    >
      <button
        aria-label="Close"
        onClick={onClose}
        className="absolute right-4 top-4 grid h-11 w-11 place-items-center rounded-full border border-white/15 bg-background/60 backdrop-blur transition-colors hover:bg-primary hover:border-primary"
      >
        <X className="h-4 w-4" />
      </button>
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-5xl origin-center animate-in zoom-in-95 duration-500"
      >
        <div className="relative aspect-video w-full overflow-hidden rounded-xl border border-white/10 bg-surface">
          {piece.videoSrc ? (
            <video
              src={piece.videoSrc}
              controls
              autoPlay
              className="h-full w-full object-cover"
            />
          ) : piece.image ? (
            <>
              <img
                src={piece.image}
                alt={piece.title}
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 grid place-items-center bg-background/50">
                <div className="text-center">
                  <div className="mx-auto mb-4 grid h-14 w-14 place-items-center rounded-full bg-primary">
                    <Play className="h-5 w-5 fill-current text-primary-foreground" />
                  </div>
                  <div className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
                    Full cut lives here — swap in the master file
                  </div>
                </div>
              </div>
            </>
          ) : (
            <PlaceholderThumb title={piece.title} />
          )}
        </div>
        <div className="mt-5 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="text-[10px] uppercase tracking-[0.3em] text-primary">
              {piece.categoryTag}
            </div>
            <div className="text-editorial mt-1 text-3xl">{piece.title}</div>
          </div>
          <p className="max-w-md text-sm text-muted-foreground">
            {piece.description}
          </p>
        </div>
        <div className="mt-4 text-[10px] uppercase tracking-[0.25em] text-muted-foreground/60">
          <ChevronRight className="mr-1 inline h-3 w-3" />
          Esc to close
        </div>
      </div>
    </div>
  );
}
