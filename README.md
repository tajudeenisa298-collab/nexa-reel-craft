# NexaPixel Portfolio

The production portfolio for NexaPixel's AI-powered video studio. It showcases
music videos, trailers, character work, brand films, client testimonials, and
the Carney & Esselle wedding-film case study.

## Local Development

```sh
npm install
npm run dev
```

## Production Build

```sh
npm run build
npm run preview
```

## Cloudflare Deployment

The app deploys to Cloudflare Workers using TanStack Start and Cloudflare's
official Vite plugin.

```sh
npx wrangler login
npm run deploy
```

Cloudflare configuration lives in `wrangler.jsonc`. Do not commit secrets.
