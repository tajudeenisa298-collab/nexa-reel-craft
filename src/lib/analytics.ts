export type ConversionEvent =
  | "cta_click"
  | "email_click"
  | "form_start"
  | "form_complete"
  | "portfolio_play"
  | "project_view"
  | "service_view";

export function trackEvent(event: ConversionEvent, detail: Record<string, unknown> = {}) {
  if (typeof window === "undefined") return;

  const payload = { event, ...detail };
  window.dispatchEvent(new CustomEvent("nexapixel:conversion", { detail: payload }));

  const analyticsWindow = window as typeof window & {
    dataLayer?: Record<string, unknown>[];
  };
  analyticsWindow.dataLayer?.push(payload);
}
