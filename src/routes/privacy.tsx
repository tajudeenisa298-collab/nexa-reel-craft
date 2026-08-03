import { createFileRoute } from "@tanstack/react-router";
import { ContentPage } from "@/components/site/content-page";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/privacy")({
  head: () =>
    pageHead({
      title: "Privacy Policy | NexaPixel",
      description:
        "Draft privacy information for NexaPixel website visitors and project enquiries.",
      path: "/privacy",
    }),
  component: PrivacyPage,
});

function PrivacyPage() {
  return (
    <ContentPage
      eyebrow="Legal draft — professional review required"
      title="Privacy policy"
      intro="This editable draft explains the intended handling of website and project-enquiry information. It must be reviewed against the final form, storage, email, CRM and analytics configuration before launch."
    >
      <section>
        <h2>Information collected</h2>
        <p>
          NexaPixel may collect the details a visitor chooses to include in a project brief, such as
          name, email, project information, deadlines, budget guidance, reference links and optional
          files.
        </p>
      </section>
      <section>
        <h2>How information is used</h2>
        <p>
          Enquiry information is intended to be used to evaluate the brief, respond to the sender,
          recommend a scope and maintain necessary business records. It should not be sold.
        </p>
      </section>
      <section>
        <h2>Storage and service providers</h2>
        <p>
          The final policy must identify the approved email, database, file-storage, CRM, analytics
          and scheduling providers after those services are configured.
        </p>
      </section>
      <section>
        <h2>Your choices</h2>
        <p>
          To request access, correction or deletion of enquiry information, contact
          info@nexa-pixel.com. Applicable rights depend on the visitor’s location and the final
          business setup.
        </p>
      </section>
    </ContentPage>
  );
}
