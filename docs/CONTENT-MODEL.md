# NexaPixel content model

The redesign keeps portfolio and service content separate from presentation code. The current adapter is intentionally simple and can be replaced by a visual CMS without changing route components.

## Project fields

- `slug`
- `title`
- `kind`: Client project, Original studio project, Concept film, Experimental project, or Internal character study
- `categories`
- `industry`
- `description`
- `poster`
- `video`
- `aspect`
- `featured`
- `servicePath`
- `objective`
- `approach`
- `deliverables`
- `clientLabel` when attribution permission exists
- `turnaround` when verified
- `testimonial` only when verified and approved
- `publicationPermission`: private, anonymized, or public

Project content currently lives in `src/content/projects.ts`.

## Service fields

- `slug` and `path`
- `eyebrow`
- `h1`
- `description`
- `audience`
- `problems`
- `deliverables`
- `processNote`
- `category`
- `cta`
- unique metadata
- visible FAQs

Service content currently lives in `src/content/services.ts`.

## Visual CMS migration contract

A production CMS must expose the fields above and return published records to the same `Project` and `Service` shapes. Recommended Cloudflare-native storage is D1 for structured records and R2 for uploads, with `/admin` protected by Cloudflare Access. That migration requires the owner’s Cloudflare account, access policy, retention rules and publication workflow; no database IDs or credentials are fabricated in this repository.

Until that integration is configured, content changes are made in the two dedicated content files rather than in route or component code.
