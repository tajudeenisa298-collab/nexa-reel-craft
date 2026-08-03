import { createFileRoute } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";

import { ContentPage } from "@/components/site/content-page";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/about")({
  head: () =>
    pageHead({
      title: "About NexaPixel — Independent AI-Native Production Studio",
      description:
        "NexaPixel is an independent AI-native production studio collaborating remotely with artists, founders, authors and brands.",
      path: "/about",
    }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <ContentPage
      eyebrow="About NexaPixel"
      title="An independent studio built around the work."
      intro="NexaPixel is an independent AI-native production studio collaborating remotely with artists, founders, authors and brands."
    >
      <section>
        <h2>Creative direction comes first.</h2>
        <p>
          Generative tools expand what can be explored and how quickly ideas can be tested. They do
          not replace the decisions that make a film coherent: what to show, what to remove, how a
          character should behave, where the cut should land and what the viewer should feel.
        </p>
        <p>
          NexaPixel uses modern production tools in service of the client’s direction. The method is
          flexible; the final work still needs a point of view.
        </p>
      </section>
      <section>
        <h2>A studio, not a template library.</h2>
        <p>
          Each project begins with its audience, references, release context and practical
          constraints. A music video, book trailer, product film and personal story should not feel
          like interchangeable versions of the same visual treatment.
        </p>
      </section>
      <section>
        <h2>Remote by design.</h2>
        <p>
          Briefs, treatments, visual reviews and delivery can happen remotely, allowing NexaPixel to
          collaborate internationally while keeping the production process direct and documented.
        </p>
      </section>
      <section>
        <h2>Responsible reference use.</h2>
        <p>
          Clients are expected to provide material they have the right to use. Protected characters,
          celebrity likenesses, trademarks and identifiable third-party creative work require
          appropriate permission. Confidentiality and portfolio publication can be agreed
          separately.
        </p>
        <a href="/ai-production-disclosure" className="text-link">
          Read the AI production disclosure <ArrowRight aria-hidden="true" />
        </a>
      </section>
    </ContentPage>
  );
}
