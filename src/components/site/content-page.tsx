import type { ReactNode } from "react";

import { SiteShell } from "./site-shell";

export function ContentPage({
  eyebrow,
  title,
  intro,
  children,
}: {
  eyebrow: string;
  title: string;
  intro: string;
  children: ReactNode;
}) {
  return (
    <SiteShell>
      <section className="page-hero text-page-hero">
        <div className="eyebrow">{eyebrow}</div>
        <h1>{title}</h1>
        <p>{intro}</p>
      </section>
      <div className="text-page">{children}</div>
    </SiteShell>
  );
}
