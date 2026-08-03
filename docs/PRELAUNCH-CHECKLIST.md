# NexaPixel prelaunch checklist

## Owner approvals

- Verify the classification and publication permission for every portfolio project.
- Confirm the Carney & Esselle case-study facts and permission.
- Approve any client testimonial and exact attribution before publishing it.
- Approve budget bands or replace them with the preferred ranges.
- Supply the business/entity details required for legal review.
- Supply the approved scheduling link if discovery calls are enabled.

## Project brief delivery

- Configure the `PROJECT_BRIEF_WEBHOOK_URL` Worker secret.
- Confirm the destination sends the business notification and visitor confirmation.
- Confirm the destination stores the record in the approved CRM or database.
- Confirm file retention, deletion and access controls.
- Submit successful and failed test briefs without real confidential data.

## Media

- Fetch all tracked MP4 masters before building the deployment archive.
- Verify every video poster and useful crop at mobile and desktop sizes.
- Compress any oversized video and preserve an appropriate bitrate and audio mix.
- Add captions or transcripts wherever spoken dialogue carries meaning.
- Verify no below-the-fold video downloads before interaction.

## Search and sharing

- Validate titles, descriptions, canonicals and one H1 per route.
- Validate Organization, ProfessionalService, VideoObject, Breadcrumb and FAQ structured data.
- Confirm the XML sitemap returns 200 and submit it in Search Console.
- Check the social card on X, LinkedIn, Slack and messaging previews.

## Accessibility and responsive QA

- Test keyboard navigation, Escape handling, focus trapping and visible focus.
- Test the brief form with errors, screen-reader labels and success state.
- Test 360, 390, 768, 1024 and 1440 pixel viewports.
- Confirm no horizontal overflow, clipping or fixed-header obstruction.
- Test with reduced motion and JavaScript disabled.

## Launch controls

- Review privacy, terms and cookie drafts with qualified counsel.
- Confirm analytics consent requirements before enabling a provider.
- Build, preview and verify every production route.
- Create a recoverable Cloudflare Worker version before moving production traffic.
- Monitor form delivery and Worker errors after launch.
