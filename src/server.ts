import "./lib/error-capture";

import { consumeLastCapturedError } from "./lib/error-capture";
import { renderErrorPage } from "./lib/error-page";

type ServerEntry = {
  fetch: (request: Request, env: unknown, ctx: unknown) => Promise<Response> | Response;
};

const MAX_BRIEF_BYTES = 9 * 1024 * 1024;
const SECURITY_HEADERS = {
  "Content-Security-Policy":
    "default-src 'self'; base-uri 'self'; connect-src 'self' https://cloudflareinsights.com; font-src 'self' https://fonts.gstatic.com data:; form-action 'self'; frame-ancestors 'none'; img-src 'self' data:; media-src 'self'; object-src 'none'; script-src 'self' 'unsafe-inline' https://static.cloudflareinsights.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
  "Cross-Origin-Opener-Policy": "same-origin",
  "Permissions-Policy": "camera=(), geolocation=(), microphone=()",
  "Referrer-Policy": "strict-origin-when-cross-origin",
  "Strict-Transport-Security": "max-age=31536000; includeSubDomains",
  "X-Content-Type-Options": "nosniff",
  "X-Frame-Options": "DENY",
} as const;

let serverEntryPromise: Promise<ServerEntry> | undefined;

async function getServerEntry(): Promise<ServerEntry> {
  if (!serverEntryPromise) {
    serverEntryPromise = import("@tanstack/react-start/server-entry").then(
      (m) => (m.default ?? m) as ServerEntry,
    );
  }
  return serverEntryPromise;
}

// h3 swallows in-handler throws into a normal 500 Response with body
// {"unhandled":true,"message":"HTTPError"} — try/catch alone never fires for those.
async function normalizeCatastrophicSsrResponse(response: Response): Promise<Response> {
  if (response.status < 500) return response;
  const contentType = response.headers.get("content-type") ?? "";
  if (!contentType.includes("application/json")) return response;

  const body = await response.clone().text();
  if (!isH3SwallowedErrorBody(body)) return response;

  console.error(consumeLastCapturedError() ?? new Error(`h3 swallowed SSR error: ${body}`));
  return new Response(renderErrorPage(), {
    status: 500,
    headers: { "content-type": "text/html; charset=utf-8" },
  });
}

function isH3SwallowedErrorBody(body: string): boolean {
  try {
    const payload = JSON.parse(body) as { unhandled?: unknown; message?: unknown };
    return payload.unhandled === true && payload.message === "HTTPError";
  } catch {
    return false;
  }
}

function withSecurityHeaders(response: Response): Response {
  const headers = new Headers(response.headers);
  for (const [name, value] of Object.entries(SECURITY_HEADERS)) headers.set(name, value);
  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers,
  });
}

function jsonResponse(payload: Record<string, unknown>, status: number): Response {
  return withSecurityHeaders(
    Response.json(payload, {
      status,
      headers: { "cache-control": "no-store" },
    }),
  );
}

function readString(form: FormData, name: string): string {
  const value = form.get(name);
  return typeof value === "string" ? value.trim() : "";
}

function readProjectBriefWebhook(env: unknown): string | undefined {
  if (!env || typeof env !== "object") return undefined;
  const value = (env as Record<string, unknown>).PROJECT_BRIEF_WEBHOOK_URL;
  return typeof value === "string" && value.startsWith("https://") ? value : undefined;
}

async function handleProjectBrief(request: Request, env: unknown): Promise<Response> {
  if (request.method !== "POST") {
    return jsonResponse({ message: "Method not allowed." }, 405);
  }

  const contentLength = Number(request.headers.get("content-length") ?? "0");
  if (!Number.isFinite(contentLength) || contentLength > MAX_BRIEF_BYTES) {
    return jsonResponse({ message: "The brief is larger than the 8 MB upload limit." }, 413);
  }

  let form: FormData;
  try {
    form = await request.formData();
  } catch {
    return jsonResponse({ message: "The brief could not be read." }, 400);
  }

  if (readString(form, "website")) {
    return jsonResponse({ ok: true, message: "Your brief is in." }, 200);
  }

  const required = ["fullName", "email", "category", "description", "consent"];
  const missing = required.filter((field) => !readString(form, field));
  if (missing.length) {
    return jsonResponse({ message: "Please complete every required field." }, 400);
  }

  const email = readString(form, "email");
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return jsonResponse({ message: "Enter a valid email address." }, 400);
  }

  const description = readString(form, "description");
  if (description.length < 20 || description.length > 4000) {
    return jsonResponse({ message: "Describe the project in 20 to 4,000 characters." }, 400);
  }

  const referenceFile = form.get("referenceFile");
  if (referenceFile instanceof File && referenceFile.size > 8 * 1024 * 1024) {
    return jsonResponse({ message: "The reference file must be 8 MB or smaller." }, 413);
  }

  const webhook = readProjectBriefWebhook(env);
  if (!webhook) {
    return jsonResponse(
      {
        message:
          "Project brief delivery is being configured. Please email info@nexa-pixel.com so nothing is lost.",
      },
      503,
    );
  }

  const submissionId = crypto.randomUUID();
  const outbound = new FormData();
  for (const [name, value] of form.entries()) {
    if (name !== "website") outbound.append(name, value);
  }
  outbound.set("submissionId", submissionId);
  outbound.set("submittedAt", new Date().toISOString());

  let destinationResponse: Response;
  try {
    destinationResponse = await fetch(webhook, {
      method: "POST",
      body: outbound,
      headers: { "X-NexaPixel-Submission": submissionId },
    });
  } catch {
    console.error(JSON.stringify({ event: "project_brief_delivery_failed", submissionId }));
    return jsonResponse(
      { message: "The brief could not be delivered. Please email info@nexa-pixel.com." },
      502,
    );
  }

  if (!destinationResponse.ok) {
    console.error(
      JSON.stringify({
        event: "project_brief_destination_rejected",
        submissionId,
        status: destinationResponse.status,
      }),
    );
    return jsonResponse(
      { message: "The brief could not be delivered. Please email info@nexa-pixel.com." },
      502,
    );
  }

  console.log(JSON.stringify({ event: "project_brief_delivered", submissionId }));
  return jsonResponse(
    {
      ok: true,
      submissionId,
      message:
        "Your brief is in. NexaPixel will review the idea and respond with the recommended next step.",
    },
    200,
  );
}

export default {
  async fetch(request: Request, env: unknown, ctx: unknown) {
    try {
      const url = new URL(request.url);
      if (url.hostname === "www.nexa-pixel.com") {
        url.hostname = "nexa-pixel.com";
        return withSecurityHeaders(Response.redirect(url.toString(), 308));
      }

      if (url.pathname === "/api/project-brief") {
        return await handleProjectBrief(request, env);
      }

      const handler = await getServerEntry();
      const response = await handler.fetch(request, env, ctx);
      return withSecurityHeaders(await normalizeCatastrophicSsrResponse(response));
    } catch (error) {
      console.error(error);
      return withSecurityHeaders(
        new Response(renderErrorPage(), {
          status: 500,
          headers: { "content-type": "text/html; charset=utf-8" },
        }),
      );
    }
  },
};
