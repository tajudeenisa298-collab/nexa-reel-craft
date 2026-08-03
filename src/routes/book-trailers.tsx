import { createFileRoute } from "@tanstack/react-router";
import { ServicePage } from "@/components/site/service-page";
import { getService } from "@/content/services";
import { pageHead } from "@/lib/seo";

const service = getService("book-trailers")!;
export const Route = createFileRoute("/book-trailers")({
  head: () =>
    pageHead({
      title: service.metaTitle,
      description: service.metaDescription,
      path: service.path,
    }),
  component: () => <ServicePage service={service} />,
});
