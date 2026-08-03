import { createFileRoute } from "@tanstack/react-router";
import { ContentPage } from "@/components/site/content-page";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/terms")({
  head: () =>
    pageHead({
      title: "Terms of Service | NexaPixel",
      description: "Draft website and project-enquiry terms for NexaPixel.",
      path: "/terms",
    }),
  component: TermsPage,
});

function TermsPage() {
  return (
    <ContentPage
      eyebrow="Legal draft — professional review required"
      title="Terms of service"
      intro="These website terms are an editable starting point. A lawyer should review the final business terms, jurisdiction, contracting entity and production agreement before publication."
    >
      <section>
        <h2>Website information</h2>
        <p>
          Portfolio and service information is provided for general enquiry purposes. Submitting a
          brief does not create a production agreement or require either party to proceed.
        </p>
      </section>
      <section>
        <h2>Project scope</h2>
        <p>
          Any project that proceeds should have a separate written scope covering deliverables,
          schedule, review stages, revisions, fees, rights, confidentiality and cancellation terms.
        </p>
      </section>
      <section>
        <h2>Client-provided material</h2>
        <p>
          Clients are responsible for confirming that they have permission to supply and use
          reference files, music, logos, likenesses, trademarks, scripts and other materials
          included in a brief or production.
        </p>
      </section>
      <section>
        <h2>No performance guarantee</h2>
        <p>
          NexaPixel does not guarantee views, virality, advertising performance, revenue or other
          campaign outcomes unless a future written agreement explicitly states otherwise.
        </p>
      </section>
    </ContentPage>
  );
}
