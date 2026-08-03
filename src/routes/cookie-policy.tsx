import { createFileRoute } from "@tanstack/react-router";
import { ContentPage } from "@/components/site/content-page";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/cookie-policy")({
  head: () =>
    pageHead({
      title: "Cookie Policy | NexaPixel",
      description: "Draft cookie and local-storage information for the NexaPixel website.",
      path: "/cookie-policy",
    }),
  component: CookiePage,
});

function CookiePage() {
  return (
    <ContentPage
      eyebrow="Legal draft — review after analytics selection"
      title="Cookie policy"
      intro="The current website should use only the storage required for essential functionality. This page must be updated if analytics, advertising pixels, scheduling or embedded third-party media are added."
    >
      <section>
        <h2>Essential storage</h2>
        <p>
          Essential storage may be used to maintain security, remember a temporary interface state
          or complete a requested form action. It should not be used to build an advertising
          profile.
        </p>
      </section>
      <section>
        <h2>Analytics</h2>
        <p>
          The site includes privacy-conscious event hooks but does not require an invasive analytics
          provider. If a provider is enabled, its cookies, retention and opt-out controls must be
          documented here.
        </p>
      </section>
      <section>
        <h2>Future advertising tools</h2>
        <p>
          Meta Pixel or similar advertising tools should not be enabled until explicitly approved
          and any legally required consent controls are in place.
        </p>
      </section>
    </ContentPage>
  );
}
