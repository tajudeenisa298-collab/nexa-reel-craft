import { createFileRoute } from "@tanstack/react-router";
import { ServicePage } from "@/components/site/service-page";
import { getService } from "@/content/services";
import { pageHead } from "@/lib/seo";

const service = getService("trailers-narrative-films")!;
export const Route = createFileRoute("/trailers-narrative-films")({
  head: () =>
    pageHead({
      title: service.metaTitle,
      description: service.metaDescription,
      path: service.path,
    }),
  component: () => <ServicePage service={service} />,
});
