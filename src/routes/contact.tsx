import { createFileRoute } from "@tanstack/react-router";
import { ArrowRight, Mail } from "lucide-react";

import { SiteShell } from "@/components/site/site-shell";
import { trackEvent } from "@/lib/analytics";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/contact")({
  head: () =>
    pageHead({
      title: "Contact NexaPixel | Cinematic Video Production",
      description:
        "Contact NexaPixel about a music video, trailer, explainer, advertisement, brand film or personal story.",
      path: "/contact",
    }),
  component: ContactPage,
});

function ContactPage() {
  return (
    <SiteShell>
      <section className="page-hero contact-hero">
        <div className="eyebrow">Contact NexaPixel</div>
        <h1>Start with the idea. We’ll shape the production around it.</h1>
        <p>
          The project brief is the fastest way to share the audience, deadline, reference material
          and required deliverables in one place.
        </p>
        <div className="button-row">
          <a href="/start-a-project" className="button">
            Submit a project brief <ArrowRight aria-hidden="true" />
          </a>
          <a
            href="mailto:info@nexa-pixel.com"
            className="button button-secondary"
            onClick={() => trackEvent("email_click", { placement: "contact_page" })}
          >
            <Mail aria-hidden="true" /> Email NexaPixel
          </a>
        </div>
      </section>
      <section className="section section-split contact-details">
        <div>
          <div className="eyebrow">Direct contact</div>
          <h2>info@nexa-pixel.com</h2>
        </div>
        <div>
          <p>
            Include the project type, intended platform, deadline and any useful references. Do not
            send confidential files until the handling requirements have been agreed.
          </p>
          <p>Scheduling can be added after the owner supplies an approved booking link.</p>
        </div>
      </section>
    </SiteShell>
  );
}
