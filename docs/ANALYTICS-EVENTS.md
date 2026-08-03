# Privacy-conscious analytics event plan

The site dispatches a `nexapixel:conversion` browser event and pushes the same payload to `window.dataLayer` when a compatible analytics provider is present. No provider or advertising pixel is installed by default.

| Event            | Trigger                                  | Useful properties     |
| ---------------- | ---------------------------------------- | --------------------- |
| `service_view`   | Specialist service page loads            | `service`             |
| `project_view`   | Project detail link selected             | `project`             |
| `portfolio_play` | A portfolio video is played              | `project`             |
| `cta_click`      | Primary CTA selected                     | `placement`, `action` |
| `email_click`    | Email link selected                      | `placement`           |
| `form_start`     | First focus inside project brief         | `form`, `path`        |
| `form_complete`  | Brief accepted by configured destination | `form`, `path`        |

The project form also submits the landing URL and standard UTM parameters. These values should be stored with the enquiry by the approved email/CRM destination.

Before enabling Google Analytics, Meta Pixel or another third party, confirm the privacy policy, cookie policy, regional consent requirements, retention period and data-processing terms.
