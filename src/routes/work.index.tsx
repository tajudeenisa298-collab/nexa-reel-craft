import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";

import { ProjectGrid } from "@/components/site/project-card";
import { SiteShell } from "@/components/site/site-shell";
import { CATEGORY_LABELS, PROJECTS, type ProjectCategory } from "@/content/projects";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/work/")({
  head: () =>
    pageHead({
      title: "Cinematic Video Portfolio | NexaPixel",
      description:
        "Explore NexaPixel music videos, trailers, character studies, brand films, narrative work and personal-story animation.",
      path: "/work",
    }),
  component: WorkPage,
});

type Filter = "all" | ProjectCategory;

function WorkPage() {
  const [filter, setFilter] = useState<Filter>("all");
  const projects = useMemo(
    () =>
      filter === "all"
        ? PROJECTS
        : PROJECTS.filter((project) => project.categories.includes(filter)),
    [filter],
  );

  return (
    <SiteShell>
      <section className="page-hero work-hero">
        <div className="eyebrow">NexaPixel portfolio</div>
        <h1>Films, worlds and characters built around the brief.</h1>
        <p>
          Client projects, original studio work, concepts and internal studies are labelled clearly.
          Select a category or open a project for the full context.
        </p>
      </section>
      <section className="section work-section">
        <div className="filter-bar" role="group" aria-label="Filter portfolio projects">
          <button type="button" aria-pressed={filter === "all"} onClick={() => setFilter("all")}>
            All
          </button>
          {(Object.entries(CATEGORY_LABELS) as [ProjectCategory, string][]).map(
            ([value, label]) => (
              <button
                type="button"
                key={value}
                aria-pressed={filter === value}
                onClick={() => setFilter(value)}
              >
                {label}
              </button>
            ),
          )}
        </div>
        {projects.length ? (
          <ProjectGrid projects={projects} />
        ) : (
          <div className="empty-state">
            <h2>New work for this category is being prepared.</h2>
            <p>No speculative project has been added simply to fill the grid.</p>
            <a href="/start-a-project" className="button">
              Brief this kind of project
            </a>
          </div>
        )}
      </section>
    </SiteShell>
  );
}
