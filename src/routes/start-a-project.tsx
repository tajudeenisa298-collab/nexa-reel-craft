import { createFileRoute } from "@tanstack/react-router";

import { BriefForm } from "@/components/site/brief-form";
import { SiteShell } from "@/components/site/site-shell";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/start-a-project")({
  head: () =>
    pageHead({
      title: "Submit a Project Brief | NexaPixel",
      description:
        "Tell NexaPixel what needs to exist. Share the idea, audience, format, deadline, budget guidance and reference material.",
      path: "/start-a-project",
      noIndex: true,
    }),
  component: StartProjectPage,
});

function StartProjectPage() {
  return (
    <SiteShell>
      <section className="page-hero form-page-hero">
        <div className="eyebrow">Project intake</div>
        <h1>Tell us what needs to exist.</h1>
        <p>
          Send the idea, reference material and deadline. NexaPixel will review the brief and
          respond with the recommended scope, timeline and next step.
        </p>
      </section>
      <section className="section form-section">
        <div className="form-intro">
          <div className="eyebrow">Before you begin</div>
          <h2>Useful context creates a better first response.</h2>
          <p>
            You do not need a finished script or treatment. Describe the audience, the intended
            feeling or message, the required formats and any fixed release date.
          </p>
          <div className="scope-note">
            <strong>Projects are quoted by scope.</strong>
            <span>
              Length is only one factor. Visual complexity, scene count, character consistency,
              revisions, sound and required formats all affect the final scope.
            </span>
          </div>
        </div>
        <BriefForm />
      </section>
    </SiteShell>
  );
}
