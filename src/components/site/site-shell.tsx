import { ArrowUpRight, ChevronDown, Menu, X } from "lucide-react";
import { useEffect, useRef, useState, type ReactNode } from "react";

import { NAV_ITEMS, SERVICE_LINKS } from "@/content/site";
import { trackEvent } from "@/lib/analytics";

function Brand() {
  return (
    <a href="/" className="brand-mark" aria-label="NexaPixel home">
      NEXA<span>·</span>PIXEL
    </a>
  );
}

export function SiteShell({ children }: { children: ReactNode }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const mobilePanelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mobileOpen) return;
    const panel = mobilePanelRef.current;
    const focusable = panel?.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
    );
    focusable?.[0]?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMobileOpen(false);
        menuButtonRef.current?.focus();
        return;
      }
      if (event.key !== "Tab" || !focusable?.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [mobileOpen]);

  const closeMobile = () => setMobileOpen(false);

  return (
    <div className="site-shell">
      <a className="skip-link" href="#main-content">
        Skip to main content
      </a>
      <header className="site-header">
        <div className="header-bar">
          <Brand />
          <nav className="desktop-nav" aria-label="Primary navigation">
            <a href="/work">Work</a>
            <details className="services-menu">
              <summary>
                Services <ChevronDown aria-hidden="true" />
              </summary>
              <div className="services-popover">
                {SERVICE_LINKS.map((service) => (
                  <a href={service.href} key={service.href}>
                    {service.label}
                  </a>
                ))}
              </div>
            </details>
            {NAV_ITEMS.slice(1).map((item) => (
              <a href={item.href} key={item.href}>
                {item.label}
              </a>
            ))}
          </nav>
          <a
            href="/start-a-project"
            className="button button-small header-cta"
            onClick={() => trackEvent("cta_click", { placement: "header" })}
          >
            Start a project <ArrowUpRight aria-hidden="true" />
          </a>
          <button
            ref={menuButtonRef}
            type="button"
            className="menu-button"
            aria-label={mobileOpen ? "Close navigation" : "Open navigation"}
            aria-expanded={mobileOpen}
            aria-controls="mobile-navigation"
            onClick={() => setMobileOpen((open) => !open)}
          >
            {mobileOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
          </button>
        </div>
      </header>

      {mobileOpen ? (
        <div className="mobile-nav-backdrop" role="presentation" onMouseDown={closeMobile}>
          <div
            ref={mobilePanelRef}
            id="mobile-navigation"
            className="mobile-nav-panel"
            role="dialog"
            aria-modal="true"
            aria-label="Site navigation"
            onMouseDown={(event) => event.stopPropagation()}
          >
            <div className="mobile-nav-heading">
              <span>Navigate</span>
              <button type="button" onClick={closeMobile} aria-label="Close navigation">
                <X aria-hidden="true" />
              </button>
            </div>
            <a href="/work" onClick={closeMobile}>
              Work
            </a>
            <div className="mobile-services-label">Services</div>
            <div className="mobile-service-links">
              {SERVICE_LINKS.map((service) => (
                <a href={service.href} key={service.href} onClick={closeMobile}>
                  {service.label}
                </a>
              ))}
            </div>
            {NAV_ITEMS.slice(1).map((item) => (
              <a href={item.href} key={item.href} onClick={closeMobile}>
                {item.label}
              </a>
            ))}
            <a href="/start-a-project" className="button" onClick={closeMobile}>
              Submit a project brief <ArrowUpRight aria-hidden="true" />
            </a>
          </div>
        </div>
      ) : null}

      <main id="main-content">{children}</main>

      <footer className="site-footer">
        <div className="footer-primary">
          <div>
            <Brand />
            <p>
              An independent AI-native production studio for cinematic video and visual
              storytelling.
            </p>
          </div>
          <div className="footer-links">
            <a href="/work">Work</a>
            <a href="/about">About</a>
            <a href="/contact">Contact</a>
            <a href="/start-a-project">Start a project</a>
          </div>
          <div className="footer-links">
            <a href="/privacy">Privacy</a>
            <a href="/terms">Terms</a>
            <a href="/cookie-policy">Cookie policy</a>
            <a href="/ai-production-disclosure">AI production disclosure</a>
          </div>
        </div>
        <div className="footer-meta">
          <span>© {new Date().getFullYear()} NexaPixel Studio</span>
          <a
            href="mailto:info@nexa-pixel.com"
            onClick={() => trackEvent("email_click", { placement: "footer" })}
          >
            info@nexa-pixel.com
          </a>
        </div>
      </footer>
    </div>
  );
}
