import { createFileRoute } from "@tanstack/react-router";
import { ArrowRight, Check, Play } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import heroPoster from "@/assets/hero-reel.jpg";
import { JsonLd } from "@/components/site/json-ld";
import { ProjectGrid } from "@/components/site/project-card";
import { SiteShell } from "@/components/site/site-shell";
import { PROJECTS } from "@/content/projects";
import { POSITIONING, PROJECT_TYPES, SITE_URL } from "@/content/site";
import { trackEvent } from "@/lib/analytics";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/")({
  head: () =>
    pageHead({
      title: "NexaPixel — Cinematic AI-Native Video Production Studio",
      description:
        "NexaPixel creates cinematic videos for artists, authors, startups, brands and people with stories worth bringing to life.",
      path: "/",
    }),
  component: HomePage,
});

const capabilities = [
  {
    title: "Music and performance visuals",
    copy: "Full music videos, visualizers, performance worlds and release cutdowns.",
    href: "/ai-music-videos",
  },
  {
    title: "Trailers and narrative films",
    copy: "Book trailers, concept films, micro-dramas and short narrative work.",
    href: "/trailers-narrative-films",
  },
  {
    title: "Brand and product videos",
    copy: "Product advertisements, launch films and cinematic campaign assets.",
    href: "/brand-product-films",
  },
  {
    title: "Explainers and launch films",
    copy: "Clear product stories for websites, launches, sales and social channels.",
    href: "/saas-explainer-videos",
  },
  {
    title: "Character and anime-style production",
    copy: "Original character systems, look development and consistent scenes.",
    href: "/character-anime-videos",
  },
  {
    title: "Personal stories and event films",
    copy: "Animated wedding films, milestones and private stories made with care.",
    href: "/animated-wedding-films",
  },
];

function HomePage() {
  const [heroVideoPlaying, setHeroVideoPlaying] = useState(false);
  const heroVideoRef = useRef<HTMLVideoElement>(null);
  const featured = PROJECTS.filter((project) => project.featured).slice(0, 6);
  const carney = PROJECTS.find((project) => project.slug === "carney-esselle");

  useEffect(() => {
    const video = heroVideoRef.current;
    if (!video) return;
    if (video.readyState >= HTMLMediaElement.HAVE_CURRENT_DATA) setHeroVideoPlaying(true);
    void video
      .play()
      .then(() => setHeroVideoPlaying(true))
      .catch(() => undefined);
  }, []);

  const schema = [
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      name: "NexaPixel",
      url: SITE_URL,
      email: "info@nexa-pixel.com",
      logo: `${SITE_URL}/brand/nexa-pixel-mark.png`,
      description: POSITIONING,
    },
    {
      "@context": "https://schema.org",
      "@type": "ProfessionalService",
      name: "NexaPixel",
      url: SITE_URL,
      email: "info@nexa-pixel.com",
      areaServed: "Worldwide",
      serviceType: "Cinematic video production",
      description: POSITIONING,
    },
  ];

  return (
    <SiteShell>
      <JsonLd data={schema} />

      <section className="home-hero">
        <div className="hero-media" aria-hidden="true">
          <video
            ref={heroVideoRef}
            className={heroVideoPlaying ? "is-playing" : undefined}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            poster={heroPoster}
            tabIndex={-1}
            onLoadedData={() => setHeroVideoPlaying(true)}
            onPlaying={() => setHeroVideoPlaying(true)}
            onError={() => setHeroVideoPlaying(false)}
          >
            <source src="/media/nexa-brand-reel.mp4?v=20260803" type="video/mp4" />
          </video>
          <img src={heroPoster} alt="" width="1920" height="1080" />
        </div>
        <div className="hero-scrim" aria-hidden="true" />
        <div className="hero-content">
          <div className="eyebrow">AI-native video production studio</div>
          <h1>Turn your idea into a film people remember.</h1>
          <p>
            NexaPixel creates cinematic videos for artists, authors, startups, brands and people
            with stories worth bringing to life.
          </p>
          <div className="button-row">
            <a
              href="/start-a-project"
              className="button"
              onClick={() =>
                trackEvent("cta_click", { placement: "hero", action: "start_project" })
              }
            >
              Start a project <ArrowRight aria-hidden="true" />
            </a>
            <a
              href="#selected-work"
              className="button button-secondary"
              onClick={() => trackEvent("cta_click", { placement: "hero", action: "watch_reel" })}
            >
              <Play aria-hidden="true" /> Watch the reel
            </a>
          </div>
          <p className="hero-signal">
            Music videos <span>·</span> Book trailers <span>·</span> Brand films <span>·</span>{" "}
            Explainers <span>·</span> Ads <span>·</span> Narrative work
          </p>
          <div className="brand-line">
            Motion with the <em>weight</em> of film.
          </div>
        </div>
      </section>

      <section className="section intent-section">
        <div className="section-heading">
          <div className="eyebrow">Choose your entrance</div>
          <h2>What are you trying to create?</h2>
          <p>
            Start with the kind of project you need. The production plan will be built around its
            audience, format and release.
          </p>
        </div>
        <div className="intent-grid">
          {PROJECT_TYPES.map((type) => (
            <a href={type.href} className="intent-item" key={type.title}>
              <img src={type.image} alt="" loading="lazy" width="640" height="420" />
              <span>{type.title}</span>
              <ArrowRight aria-hidden="true" />
            </a>
          ))}
        </div>
      </section>

      <section id="selected-work" className="section muted-section">
        <div className="section-heading heading-with-action">
          <div>
            <div className="eyebrow">Selected work</div>
            <h2>Watch the work. Then read the promise.</h2>
            <p>
              Finished films, concept work and character studies are labelled clearly so the
              portfolio speaks honestly.
            </p>
          </div>
          <a href="/work" className="text-link">
            View all projects <ArrowRight aria-hidden="true" />
          </a>
        </div>
        <ProjectGrid projects={featured} />
      </section>

      <section className="section capabilities-section">
        <div className="section-heading">
          <div className="eyebrow">What NexaPixel creates</div>
          <h2>One studio. Many ways to bring an idea to life.</h2>
          <p>
            Some clients arrive with a song. Others arrive with a book, a product, a character or a
            single scene they cannot stop imagining. NexaPixel develops the concept, visual language
            and final video around the project itself.
          </p>
        </div>
        <div className="capability-list">
          {capabilities.map((capability, index) => (
            <a href={capability.href} key={capability.title}>
              <span>0{index + 1}</span>
              <div>
                <h3>{capability.title}</h3>
                <p>{capability.copy}</p>
              </div>
              <ArrowRight aria-hidden="true" />
            </a>
          ))}
        </div>
      </section>

      {carney ? (
        <section className="section case-study-preview">
          <div className="case-media">
            <video
              src={carney.video}
              poster={carney.poster}
              controls
              playsInline
              preload="none"
              aria-label="Carney and Esselle animated wedding film"
            />
          </div>
          <div className="case-copy">
            <div className="eyebrow">Featured case study</div>
            <h2>Carney & Esselle — a real story developed as an animated film.</h2>
            <dl>
              <div>
                <dt>Objective</dt>
                <dd>{carney.objective}</dd>
              </div>
              <div>
                <dt>Creative approach</dt>
                <dd>{carney.approach}</dd>
              </div>
              <div>
                <dt>Deliverables</dt>
                <dd>{carney.deliverables?.join(" · ")}</dd>
              </div>
            </dl>
            <a href="/case-studies/carney-esselle" className="button">
              View the full case study <ArrowRight aria-hidden="true" />
            </a>
          </div>
        </section>
      ) : null}

      <section id="process" className="section muted-section">
        <div className="section-heading">
          <div className="eyebrow">Production process</div>
          <h2>Clear decisions at every stage.</h2>
          <p>
            Every project begins with an agreed scope, production schedule and review process, so
            both sides know what will be delivered and when.
          </p>
        </div>
        <ol className="process-grid">
          {[
            [
              "Brief",
              "You describe the idea, audience, references, deadline and required deliverables.",
            ],
            [
              "Treatment",
              "NexaPixel develops the visual direction, look frames, narrative structure and shot plan.",
            ],
            [
              "Production",
              "Approved scenes are produced, refined, edited, coloured and combined with sound.",
            ],
            ["Delivery", "You receive the agreed master and platform-specific versions."],
          ].map(([title, copy], index) => (
            <li key={title}>
              <span>0{index + 1}</span>
              <h3>{title}</h3>
              <p>{copy}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="section why-section">
        <div className="section-heading">
          <div className="eyebrow">Why NexaPixel</div>
          <h2>Modern tools. Human creative judgment.</h2>
        </div>
        <div className="why-grid">
          {[
            "Concept development can be included",
            "Built around each project rather than templates",
            "Cinematic visual direction",
            "A rapid concept-to-delivery workflow",
            "International remote collaboration",
            "Platform-ready deliverables",
            "Clear milestones and review stages",
            "Experience across multiple video categories",
          ].map((item) => (
            <div key={item}>
              <Check aria-hidden="true" /> <span>{item}</span>
            </div>
          ))}
        </div>
        <p className="integrity-note">
          Client feedback will appear only after attribution and publication permission have been
          confirmed. Unverified testimonials are not shown.
        </p>
      </section>

      <section className="section final-cta">
        <div className="eyebrow">Starting a project</div>
        <h2>Tell us what needs to exist.</h2>
        <p>
          Send the idea, reference material and deadline. NexaPixel will review the brief and
          respond with the recommended scope, timeline and next step.
        </p>
        <div className="button-row">
          <a href="/start-a-project" className="button">
            Submit a project brief <ArrowRight aria-hidden="true" />
          </a>
          <a href="mailto:info@nexa-pixel.com" className="text-link">
            info@nexa-pixel.com
          </a>
        </div>
      </section>
    </SiteShell>
  );
}
