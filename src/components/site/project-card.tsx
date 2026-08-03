import { ArrowUpRight, Play, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { CATEGORY_LABELS, type Project } from "@/content/projects";
import { trackEvent } from "@/lib/analytics";

export function ProjectCard({
  project,
  priority = false,
}: {
  project: Project;
  priority?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const playButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const returnFocus = playButtonRef.current;
    closeButtonRef.current?.focus();
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
      returnFocus?.focus();
    };
  }, [open]);

  return (
    <article className="project-card">
      <div className={`project-media project-media-${project.aspect}`}>
        <img
          src={project.poster}
          alt={`${project.title} — ${project.kind.toLowerCase()}`}
          loading={priority ? "eager" : "lazy"}
          decoding="async"
          width="960"
          height={
            project.aspect === "portrait" ? "1280" : project.aspect === "square" ? "960" : "600"
          }
        />
        <span className="project-kind">{project.kind}</span>
        {project.video ? (
          <button
            ref={playButtonRef}
            type="button"
            className="play-button"
            aria-label={`Play ${project.title} video`}
            onClick={() => {
              setOpen(true);
              trackEvent("portfolio_play", { project: project.slug });
            }}
          >
            <Play aria-hidden="true" /> <span>Play film</span>
          </button>
        ) : null}
      </div>
      <div className="project-card-copy">
        <div className="eyebrow">{CATEGORY_LABELS[project.categories[0]]}</div>
        <h3>{project.title}</h3>
        <p>{project.description}</p>
        <a
          href={`/work/${project.slug}`}
          className="text-link"
          onClick={() => trackEvent("project_view", { project: project.slug })}
        >
          View project <ArrowUpRight aria-hidden="true" />
        </a>
      </div>

      {open && project.video ? (
        <div
          className="video-dialog-backdrop"
          role="presentation"
          onMouseDown={() => setOpen(false)}
        >
          <div
            className="video-dialog"
            role="dialog"
            aria-modal="true"
            aria-labelledby={`dialog-${project.slug}`}
            onMouseDown={(event) => event.stopPropagation()}
          >
            <div className="video-dialog-heading">
              <div>
                <div className="eyebrow">{project.kind}</div>
                <h2 id={`dialog-${project.slug}`}>{project.title}</h2>
              </div>
              <button
                ref={closeButtonRef}
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close video"
              >
                <X aria-hidden="true" />
              </button>
            </div>
            <video
              src={project.video}
              poster={project.poster}
              controls
              autoPlay
              playsInline
              preload="metadata"
              aria-label={`${project.title} video`}
            />
            <p>{project.description}</p>
          </div>
        </div>
      ) : null}
    </article>
  );
}

export function ProjectGrid({ projects }: { projects: Project[] }) {
  return (
    <div className="project-grid">
      {projects.map((project, index) => (
        <ProjectCard project={project} key={project.slug} priority={index < 2} />
      ))}
    </div>
  );
}
