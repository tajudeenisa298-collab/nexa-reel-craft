import { ArrowRight, Check } from "lucide-react";
import { useEffect } from "react";

import { PROJECTS } from "@/content/projects";
import type { Service } from "@/content/services";
import { SITE_URL } from "@/content/site";
import { trackEvent } from "@/lib/analytics";
import { breadcrumbSchema } from "@/lib/seo";

import { JsonLd } from "./json-ld";
import { ProjectGrid } from "./project-card";
import { SiteShell } from "./site-shell";

export function ServicePage({ service }: { service: Service }) {
  const projects = PROJECTS.filter((project) => project.categories.includes(service.category));
  const leadProject = projects.find((project) => project.video) ?? projects[0];

  useEffect(() => {
    trackEvent("service_view", { service: service.slug });
  }, [service.slug]);

  const schema = [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      name: service.h1,
      description: service.description,
      provider: {
        "@type": "ProfessionalService",
        name: "NexaPixel",
        url: SITE_URL,
      },
      areaServed: "Worldwide",
      serviceType: service.eyebrow,
      url: `${SITE_URL}${service.path}`,
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: service.faqs.map((faq) => ({
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: { "@type": "Answer", text: faq.answer },
      })),
    },
    breadcrumbSchema([
      { name: "Home", path: "/" },
      { name: service.eyebrow, path: service.path },
    ]),
  ];

  return (
    <SiteShell>
      <JsonLd data={schema} />
      <section className="service-hero page-hero">
        <div className="service-hero-copy">
          <div className="eyebrow">{service.eyebrow}</div>
          <h1>{service.h1}</h1>
          <p>{service.description}</p>
          <div className="button-row">
            <a href={`/start-a-project?category=${service.slug}`} className="button">
              {service.cta} <ArrowRight aria-hidden="true" />
            </a>
            <a href="#relevant-work" className="text-link">
              Watch relevant work
            </a>
          </div>
        </div>
        {leadProject ? (
          <div className="service-showreel">
            {leadProject.video ? (
              <video
                src={leadProject.video}
                poster={leadProject.poster}
                controls
                playsInline
                preload="metadata"
                aria-label={`${leadProject.title} — relevant ${service.eyebrow.toLowerCase()} work`}
              />
            ) : (
              <img
                src={leadProject.poster}
                alt={`${leadProject.title} project`}
                width="1200"
                height="750"
              />
            )}
            <div>
              <span>{leadProject.kind}</span>
              <strong>{leadProject.title}</strong>
            </div>
          </div>
        ) : null}
      </section>

      <section className="section section-split">
        <div>
          <div className="eyebrow">Who this is for</div>
          <h2>Built around the buyer, audience and release.</h2>
        </div>
        <ul className="plain-list two-column-list">
          {service.audience.map((audience) => (
            <li key={audience}>
              <Check aria-hidden="true" /> {audience}
            </li>
          ))}
        </ul>
      </section>

      <section className="section muted-section">
        <div className="section-heading">
          <div className="eyebrow">The brief behind the brief</div>
          <h2>What the production needs to solve.</h2>
        </div>
        <div className="editorial-columns">
          {service.problems.map((problem, index) => (
            <article key={problem}>
              <span>0{index + 1}</span>
              <p>{problem}</p>
            </article>
          ))}
        </div>
      </section>

      {projects.length ? (
        <section id="relevant-work" className="section">
          <div className="section-heading heading-with-action">
            <div>
              <div className="eyebrow">Relevant work</div>
              <h2>Proof before promises.</h2>
            </div>
            <a href="/work" className="text-link">
              View all work <ArrowRight aria-hidden="true" />
            </a>
          </div>
          <ProjectGrid projects={projects.slice(0, 6)} />
        </section>
      ) : null}

      <section className="section section-split deliverables-section">
        <div>
          <div className="eyebrow">Typical deliverables</div>
          <h2>A scope assembled around the campaign.</h2>
          <p>{service.processNote}</p>
        </div>
        <ul className="deliverables-list">
          {service.deliverables.map((deliverable) => (
            <li key={deliverable}>{deliverable}</li>
          ))}
        </ul>
      </section>

      <section className="section process-compact">
        <div className="section-heading">
          <div className="eyebrow">Production process</div>
          <h2>From first idea to platform-ready files.</h2>
        </div>
        <ol className="process-grid">
          {[
            ["Brief", "Audience, references, deadline and required deliverables are clarified."],
            [
              "Treatment",
              "Visual direction, narrative structure, look frames and shot plan are developed.",
            ],
            [
              "Production",
              "Approved scenes are produced, refined, edited, coloured and combined with sound.",
            ],
            [
              "Delivery",
              "The agreed master and platform-specific versions are prepared for handoff.",
            ],
          ].map(([title, copy], index) => (
            <li key={title}>
              <span>0{index + 1}</span>
              <h3>{title}</h3>
              <p>{copy}</p>
            </li>
          ))}
        </ol>
        <p className="process-note">
          Every project begins with an agreed scope, production schedule and review process, so both
          sides know what will be delivered and when.
        </p>
      </section>

      <section className="section faq-section">
        <div className="section-heading">
          <div className="eyebrow">Frequently asked questions</div>
          <h2>Useful answers before the first call.</h2>
        </div>
        <div className="faq-list">
          {service.faqs.map((faq) => (
            <details key={faq.question}>
              <summary>{faq.question}</summary>
              <p>{faq.answer}</p>
            </details>
          ))}
        </div>
      </section>

      <section className="section final-cta">
        <div className="eyebrow">Start with the idea</div>
        <h2>{service.cta}.</h2>
        <p>
          Send the references, required formats and deadline. NexaPixel will recommend the scope and
          next step.
        </p>
        <a href={`/start-a-project?category=${service.slug}`} className="button">
          Submit a project brief <ArrowRight aria-hidden="true" />
        </a>
      </section>
    </SiteShell>
  );
}
