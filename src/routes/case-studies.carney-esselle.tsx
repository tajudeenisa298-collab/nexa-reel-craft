import { createFileRoute } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";

import { JsonLd } from "@/components/site/json-ld";
import { SiteShell } from "@/components/site/site-shell";
import { getProject } from "@/content/projects";
import { breadcrumbSchema, pageHead } from "@/lib/seo";

const project = getProject("carney-esselle")!;

export const Route = createFileRoute("/case-studies/carney-esselle")({
  head: () =>
    pageHead({
      title: "Carney & Esselle Animated Wedding Film Case Study | NexaPixel",
      description:
        "How NexaPixel developed a real love story through character design, storyboarding, animated scene production, editing and sound.",
      path: "/case-studies/carney-esselle",
      image: project.poster,
    }),
  component: CaseStudyPage,
});

function CaseStudyPage() {
  return (
    <SiteShell>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Case studies", path: "/case-studies/carney-esselle" },
          { name: "Carney & Esselle", path: "/case-studies/carney-esselle" },
        ])}
      />
      <article className="case-study-page">
        <header className="page-hero case-study-header">
          <div className="eyebrow">Case study · Animated personal story</div>
          <h1>Carney & Esselle — turning a real love story into an animated film.</h1>
          <p>
            A character-led wedding film developed through story structure, visual design and a
            scene-by-scene AI-assisted production workflow.
          </p>
        </header>

        <div className="case-study-film">
          <video
            src={project.video}
            poster={project.poster}
            controls
            playsInline
            preload="metadata"
            aria-label="Carney and Esselle animated wedding film"
          />
        </div>

        <section className="section case-study-story">
          <div className="section-heading">
            <div className="eyebrow">Client objective</div>
            <h2>A personal film that felt specific to the couple.</h2>
          </div>
          <p>{project.objective}</p>
        </section>

        <section className="section muted-section case-study-steps">
          <div className="section-heading">
            <div className="eyebrow">Creative development</div>
            <h2>Consistency before animation.</h2>
          </div>
          <div className="editorial-columns four-columns">
            {[
              [
                "Character development",
                "Visual rules established the couple’s recognisable features, wardrobe and proportions.",
              ],
              [
                "Storyboarding",
                "The story was separated into clear emotional beats before scene production.",
              ],
              [
                "Look development",
                "Lighting, framing and colour were aligned into one visual language.",
              ],
              [
                "Production and edit",
                "Approved scenes were refined, assembled and shaped with timing and sound.",
              ],
            ].map(([title, copy], index) => (
              <article key={title}>
                <span>0{index + 1}</span>
                <h3>{title}</h3>
                <p>{copy}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="section case-study-frames">
          <div className="section-heading">
            <div className="eyebrow">Selected frame</div>
            <h2>The finished visual world.</h2>
          </div>
          <img
            src={project.poster}
            alt="Carney and Esselle animated wedding film frame"
            width="1600"
            height="1000"
            loading="lazy"
          />
        </section>

        <section className="section integrity-panel">
          <div className="eyebrow">Content integrity</div>
          <p>
            Public statistics and testimonial attribution have been intentionally withheld until the
            owner confirms the underlying details and publication permission.
          </p>
        </section>

        <section className="section final-cta">
          <div className="eyebrow">Your story, treated as its own film</div>
          <h2>Tell us what the film needs to hold onto.</h2>
          <a href="/start-a-project?category=animated-wedding-films" className="button">
            Submit a project brief <ArrowRight aria-hidden="true" />
          </a>
        </section>
      </article>
    </SiteShell>
  );
}
