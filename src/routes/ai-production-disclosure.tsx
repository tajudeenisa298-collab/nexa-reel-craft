import { createFileRoute } from "@tanstack/react-router";
import { ContentPage } from "@/components/site/content-page";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/ai-production-disclosure")({
  head: () =>
    pageHead({
      title: "AI Production Disclosure | NexaPixel",
      description:
        "How NexaPixel uses AI-assisted tools, human creative judgment, approved references and client review in production.",
      path: "/ai-production-disclosure",
    }),
  component: DisclosurePage,
});

function DisclosurePage() {
  return (
    <ContentPage
      eyebrow="Creative trust"
      title="AI supports the production process. Direction still matters."
      intro="NexaPixel uses AI-assisted and generative tools as part of a wider process involving concept development, selection, editing, sound and client review."
    >
      <section>
        <h2>Human judgment remains part of every stage.</h2>
        <p>
          Creative direction, prompt and reference preparation, shot selection, continuity review,
          editing, colour decisions, sound and final assembly involve human decisions. The client
          approves the intended visual direction before full production proceeds.
        </p>
      </section>
      <section>
        <h2>Rights and reference material.</h2>
        <p>
          Clients should supply only material they are authorised to use. NexaPixel does not promise
          that every creative style, protected identity, trademarked property, celebrity likeness or
          copyrighted character can or should be reproduced.
        </p>
      </section>
      <section>
        <h2>Confidentiality and publication.</h2>
        <p>
          Confidentiality requirements can be agreed before sensitive material is shared. Permission
          to display a finished project in the NexaPixel portfolio is separate from permission to
          produce and deliver the work.
        </p>
      </section>
      <section>
        <h2>Responsible expectations.</h2>
        <p>
          AI-assisted production can widen creative possibilities and shorten parts of the
          exploration cycle, but every project still has practical limits, review stages and a
          defined scope.
        </p>
      </section>
    </ContentPage>
  );
}
