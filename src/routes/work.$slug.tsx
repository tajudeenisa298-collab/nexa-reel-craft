import { createFileRoute, notFound } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";

import { JsonLd } from "@/components/site/json-ld";
import { SiteShell } from "@/components/site/site-shell";
import { CATEGORY_LABELS, getProject } from "@/content/projects";
import { SITE_URL } from "@/content/site";
import { breadcrumbSchema, pageHead } from "@/lib/seo";

export const Route = createFileRoute("/work/$slug")({
  loader: ({ params }) => {
    const project = getProject(params.slug);
    if (!project) throw notFound();
    return project;
  },
  head: ({ loaderData }) =>
    pageHead({
      title: `${loaderData.title} | NexaPixel Work`,
      description: loaderData.description,
      path: `/work/${loaderData.slug}`,
      image: loaderData.poster,
    }),
  component: ProjectPage,
});

function ProjectPage() {
  const project = Route.useLoaderData();
  const schema: Record<string, unknown>[] = [
    breadcrumbSchema([
      { name: "Home", path: "/" },
      { name: "Work", path: "/work" },
      { name: project.title, path: `/work/${project.slug}` },
    ]),
  ];

  if (project.video) {
    schema.push({
      "@context": "https://schema.org",
      "@type": "VideoObject",
      name: project.title,
      description: project.description,
      thumbnailUrl: [new URL(project.poster, SITE_URL).toString()],
      contentUrl: new URL(project.video, SITE_URL).toString(),
      url: `${SITE_URL}/work/${project.slug}`,
    });
  }

  return (
    <SiteShell>
      <JsonLd data={schema} />
      <article className="project-page">
        <header className="page-hero project-page-header">
          <div className="eyebrow">
            {project.kind} · {CATEGORY_LABELS[project.categories[0]]}
          </div>
          <h1>{project.title}</h1>
          <p>{project.description}</p>
        </header>
        <div className="project-page-media">
          {project.video ? (
            <video
              src={project.video}
              poster={project.poster}
              controls
              playsInline
              preload="metadata"
              aria-label={`${project.title} video`}
            />
          ) : (
            <img
              src={project.poster}
              alt={`${project.title} project artwork`}
              width="1600"
              height="1000"
            />
          )}
        </div>
        <section className="section project-facts">
          <div>
            <div className="eyebrow">Project context</div>
            <h2>What is known about the work.</h2>
          </div>
          <dl>
            <div>
              <dt>Work type</dt>
              <dd>{project.kind}</dd>
            </div>
            <div>
              <dt>Category</dt>
              <dd>{project.categories.map((category) => CATEGORY_LABELS[category]).join(" · ")}</dd>
            </div>
            <div>
              <dt>Industry</dt>
              <dd>{project.industry}</dd>
            </div>
            {project.objective ? (
              <div>
                <dt>Objective</dt>
                <dd>{project.objective}</dd>
              </div>
            ) : null}
            {project.approach ? (
              <div>
                <dt>Creative approach</dt>
                <dd>{project.approach}</dd>
              </div>
            ) : null}
            {project.deliverables?.length ? (
              <div>
                <dt>Published deliverables</dt>
                <dd>{project.deliverables.join(" · ")}</dd>
              </div>
            ) : null}
          </dl>
        </section>
        <section className="section final-cta">
          <div className="eyebrow">Create something specific</div>
          <h2>Use this work as a starting reference—not a template.</h2>
          <div className="button-row">
            <a href={`/start-a-project?reference=${project.slug}`} className="button">
              Submit a project brief <ArrowRight aria-hidden="true" />
            </a>
            <a href={project.servicePath} className="text-link">
              Explore the related service
            </a>
          </div>
        </section>
      </article>
    </SiteShell>
  );
}
