import { ArrowRight, Check, LoaderCircle } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { trackEvent } from "@/lib/analytics";

const categories = [
  "Music video",
  "Book trailer",
  "SaaS explainer",
  "Advertisement",
  "Brand or product film",
  "Character or anime video",
  "Wedding or personal story",
  "Trailer or narrative film",
  "Other",
];

// Editable until the owner approves public-facing ranges.
const budgetOptions = [
  "Under $500",
  "$500–$1,000",
  "$1,000–$2,500",
  "$2,500–$5,000",
  "$5,000+",
  "I need guidance",
];

type FormStatus = "idle" | "submitting" | "success" | "error";

export function BriefForm() {
  const [status, setStatus] = useState<FormStatus>("idle");
  const [message, setMessage] = useState("");
  const [started, setStarted] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const category = params.get("category");
    if (!category || !formRef.current) return;
    const select = formRef.current.elements.namedItem("category") as HTMLSelectElement | null;
    if (!select) return;
    const matching = [...select.options].find((option) =>
      option.value.toLowerCase().includes(category.toLowerCase()),
    );
    if (matching) select.value = matching.value;
  }, []);

  const markStarted = () => {
    if (started) return;
    setStarted(true);
    trackEvent("form_start", { form: "project_brief", path: window.location.pathname });
  };

  const submit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (!form.reportValidity()) return;
    setStatus("submitting");
    setMessage("");

    const data = new FormData(form);
    data.set("sourcePage", window.location.href);
    const params = new URLSearchParams(window.location.search);
    for (const key of ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term"]) {
      data.set(key, params.get(key) ?? "");
    }

    try {
      const response = await fetch("/api/project-brief", { method: "POST", body: data });
      const result = (await response.json()) as { message?: string };
      if (!response.ok) throw new Error(result.message || "The brief could not be sent.");
      setStatus("success");
      trackEvent("form_complete", { form: "project_brief", path: window.location.pathname });
      form.reset();
    } catch (error) {
      setStatus("error");
      setMessage(error instanceof Error ? error.message : "The brief could not be sent.");
    }
  };

  if (status === "success") {
    return (
      <div className="form-success" role="status" tabIndex={-1}>
        <Check aria-hidden="true" />
        <div className="eyebrow">Brief received</div>
        <h2>Your brief is in.</h2>
        <p>
          NexaPixel will review the idea and respond with the recommended next step, scope and
          timeline.
        </p>
        <a href="/work" className="text-link">
          Explore the work <ArrowRight aria-hidden="true" />
        </a>
      </div>
    );
  }

  return (
    <form
      ref={formRef}
      className="brief-form"
      onSubmit={submit}
      onFocus={markStarted}
      encType="multipart/form-data"
      noValidate={false}
    >
      {status === "error" ? (
        <div className="form-error" role="alert">
          <strong>The brief was not sent.</strong>
          <span>{message}</span>
          <a href="mailto:info@nexa-pixel.com">Email info@nexa-pixel.com instead</a>
        </div>
      ) : null}

      <div className="form-grid">
        <label>
          Full name <span aria-hidden="true">*</span>
          <input name="fullName" autoComplete="name" required maxLength={100} />
        </label>
        <label>
          Email address <span aria-hidden="true">*</span>
          <input name="email" type="email" autoComplete="email" required maxLength={160} />
        </label>
        <label>
          Company, artist or project name
          <input name="organization" autoComplete="organization" maxLength={160} />
        </label>
        <label>
          Project category <span aria-hidden="true">*</span>
          <select name="category" required defaultValue="">
            <option value="" disabled>
              Select a project type
            </option>
            {categories.map((category) => (
              <option key={category}>{category}</option>
            ))}
          </select>
        </label>
      </div>

      <label>
        Short project description <span aria-hidden="true">*</span>
        <textarea
          name="description"
          rows={7}
          required
          minLength={20}
          maxLength={4000}
          placeholder="What needs to exist, who is it for, and what should the viewer feel or understand?"
        />
      </label>

      <div className="form-grid">
        <label>
          Desired video length
          <select name="videoLength" defaultValue="Not sure yet">
            <option>Under 15 seconds</option>
            <option>15–30 seconds</option>
            <option>30–60 seconds</option>
            <option>1–3 minutes</option>
            <option>Over 3 minutes</option>
            <option>Not sure yet</option>
          </select>
        </label>
        <label>
          Intended platform
          <input
            name="platform"
            maxLength={200}
            placeholder="Website, YouTube, Instagram, paid social…"
          />
        </label>
        <label>
          Desired deadline
          <input name="deadline" type="date" />
        </label>
        <label>
          Budget range
          <select name="budget" defaultValue="I need guidance">
            {budgetOptions.map((option) => (
              <option key={option}>{option}</option>
            ))}
          </select>
          <small>
            Budget helps us recommend an appropriate scope. It does not commit you to a purchase.
          </small>
        </label>
      </div>

      <label>
        Links to references
        <textarea name="references" rows={3} maxLength={2000} placeholder="One link per line" />
      </label>
      <label>
        Optional reference file
        <input name="referenceFile" type="file" accept="image/*,video/*,audio/*,.pdf,.doc,.docx" />
        <small>
          Maximum 8 MB. Do not upload confidential material unless it is necessary for the brief.
        </small>
      </label>
      <label>
        How did you find NexaPixel?
        <input name="referral" maxLength={200} />
      </label>

      <label className="honeypot" aria-hidden="true">
        Website
        <input name="website" tabIndex={-1} autoComplete="off" />
      </label>

      <label className="consent-field">
        <input name="consent" type="checkbox" value="yes" required />
        <span>
          I agree that NexaPixel may use this information to respond to my enquiry. Read the{" "}
          <a href="/privacy">privacy policy</a>.
        </span>
      </label>

      <button className="button" type="submit" disabled={status === "submitting"}>
        {status === "submitting" ? (
          <>
            <LoaderCircle className="spin" aria-hidden="true" /> Sending brief
          </>
        ) : (
          <>
            Submit project brief <ArrowRight aria-hidden="true" />
          </>
        )}
      </button>
    </form>
  );
}
