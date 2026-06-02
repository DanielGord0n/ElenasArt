# Elena's Art — AI-Animated Painting Portfolio

A bilingual digital portfolio built as a gift for my mother, Elena Gordon, a Toronto-based painter with 10 years of work across acrylic and pencil. The core idea: use generative AI to bring her physical paintings to life as subtle, cinematic animations.

[Live Site](#) &nbsp;·&nbsp; [View Gallery](#)

---

![Elena's Art Preview](public/paintings/preview.jpg)

---

## The Idea

My mother's paintings focus on nature and quiet everyday moments. I wanted to build her a portfolio that did justice to that quality — not just a static image grid, but something that made the work feel alive. The result is a 2.5D animation system where each painting transitions from a still image into a moving scene: snow falling over a winter landscape, water rippling in a pond, ink bleeding through paper.

---

## How the Animations Work

The effect is built in layers:

1. A static photo of the physical painting is shown on load
2. An AI-generated MP4 (produced offline using Runway Gen-3, Luma Dream Machine, or Kling AI from a prompt like "light snow falling, cinematic") is overlaid precisely within the painting's frame
3. Custom React effect components (FallingSnow, FloatingParticles, FlowingInk, GlowPulse) render atmospheric particle animations that bleed out beyond the frame into the page background
4. The page background color transitions dynamically based on the artwork being viewed

The result is a 2.5D immersive experience built entirely without WebGL — just React, CSS, and well-scoped MP4s kept under 5MB each.

---

## Features

- **AI-animated paintings** — static artwork transitions to AI-generated cinemagraph-style video on interaction
- **Immersive background effects** — per-painting atmospheric React components (snow, particles, ink, glow) that extend the painting's mood into the page
- **Fullscreen viewer** — custom modal for viewing static or animated pieces without cropping
- **Dynamic theming** — background color transitions smoothly per artwork (e.g. deep indigo for winter scenes)
- **Bilingual UI** — full English and Russian support via a custom lightweight i18n system, no heavy translation library
- **Gallery filtering and sorting** — filter by subject, sort by newest
- **File-system CMS** — adding a new painting requires dropping an image, an MP4, and a JSON metadata file into the repo, no database needed

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS v4 |
| Icons | Lucide React |
| AI Video Generation | Runway Gen-3, Luma Dream Machine, Kling AI (offline) |
| Deployment | Vercel |

No external APIs. No database. Everything is file-system based and statically generated.

---

## Architecture Decisions Worth Noting

**File-system CMS over a headless CMS**
Content lives in `content/paintings/` as strongly-typed JSON files read via Node's `fs` module in `src/lib/paintings.ts`. Publishing a new painting is a git commit, not a database operation. Fast, version-controlled, and zero infrastructure overhead.

**Custom i18n over next-i18next**
Full English and Russian support is handled by a single TypeScript translation dictionary in `src/lib/i18n.ts` using React context. Avoids the configuration overhead of heavier i18n libraries for a scoped, two-language use case.

**2.5D effect without WebGL**
The animation system layers an MP4 inside the painting's border with a React effect component rendering outside it. The effect component is selected per-artwork by slug in `PaintingDetail.tsx`. No canvas API, no Three.js — just well-composited HTML elements and CSS.

---

## Adding a New Painting

1. Add the image to `public/paintings/your-slug.jpg`
2. Add the AI-generated animation to `public/paintings/your-slug.mp4` (keep under 5MB)
3. Create `content/paintings/your-slug.json`:

```json
{
  "slug": "your-slug",
  "title": { "en": "Title", "ru": "Название" },
  "medium": "Acrylic on canvas",
  "size": "16x20 in",
  "year": 2024,
  "status": "available",
  "videoUrl": "/paintings/your-slug.mp4",
  "description": {
    "en": "English description.",
    "ru": "Russian description."
  }
}
```

4. Push to main — Vercel deploys automatically.

---

## Current State

The application architecture is complete. Currently showcasing 4 paintings with full animation and effect support. Known limitation: video payload size requires manual MP4 compression to keep load times fast — anything over 5MB is compressed before committing.

---

*Built with TypeScript, Next.js, and Tailwind CSS. AI animations generated with Runway Gen-3, Luma Dream Machine, and Kling AI.*
