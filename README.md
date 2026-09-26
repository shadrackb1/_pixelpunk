# pixelpunk

Vintage fashion archive storefront. One-of-one pieces with provenance notes, a find-request desk, and an AI Curator.

**Status:** prototype · live on Vercel as `pixelpunk-nuff.vercel.app`

## Stack

- React 18 + TypeScript + Vite
- Tailwind (CDN config) + Framer Motion
- Firebase Auth / Firestore (content CMS, optional cloud sync)
- Cloudinary (media CDN)
- Google GenAI (Curator voice / identify / concept lab)

## Run locally

```bash
npm install
npm run dev
```

Production build:

```bash
npm run build
npm run preview
```

## Environment

Optional, for the AI Curator:

```
VITE_GEMINI_API_KEY=your_key
```

Without a key the site still runs; Curator actions return a clear error.

## Admin panel

Bottom-right gear button. Demo access code is `12345` (prototype only).

## License

All rights reserved.
