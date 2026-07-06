# GlowHaus

Frontend for **GlowHaus** — a beauty / AI-skin-styling web app built with React, Vite, TypeScript, Tailwind CSS, and shadcn/ui. The project ships with a marketing landing page, an in-app dashboard, and a set of reusable glassmorphism-styled UI primitives.

> See [`TechSpec.md`](./TechSpec.md) for the full technical specification (component inventory, animation strategy, performance and accessibility notes).

---

## Tech Stack

| Layer        | Choice                                             |
|--------------|----------------------------------------------------|
| Framework    | React 19 + TypeScript 5.9                          |
| Build tool   | Vite 7                                             |
| Styling      | Tailwind CSS 3.4 + `tailwindcss-animate`           |
| UI primitives| shadcn/ui (Radix UI under the hood)                |
| Animation    | GSAP + `@gsap/react` (ScrollTrigger), Framer Motion|
| Forms        | react-hook-form + zod                              |
| Icons        | lucide-react                                       |
| Charts       | recharts                                           |
| Node         | 20+                                                |

---

## Project Structure

```
.
├── TechSpec.md              # Technical spec (animations, components, a11y)
└── app/                     # Vite + React application
    ├── index.html
    ├── package.json
    ├── vite.config.ts
    ├── tailwind.config.js
    ├── postcss.config.js
    ├── tsconfig*.json
    ├── eslint.config.js
    └── src/
        ├── main.tsx              # Entry point
        ├── App.tsx               # Root component
        ├── index.css             # Global styles (Tailwind layer)
        ├── App.css               # App-specific styles
        ├── types/                # Shared TypeScript types
        ├── lib/
        │   ├── utils.ts          # cn() helper, misc utilities
        │   └── mockData.ts       # Demo / placeholder data
        ├── hooks/
        │   ├── use-mobile.ts     # Media-query hook
        │   └── useTilt.ts        # 3D tilt hover hook
        ├── components/
        │   ├── layout/           # GlassNav, Sidebar, Footer
        │   ├── ui/               # shadcn/ui base + custom primitives
        │   └── Navigation.tsx
        ├── sections/             # Marketing landing sections
        │   ├── HeroSection.tsx
        │   ├── FeaturesSection.tsx
        │   ├── DemoSection.tsx
        │   ├── GallerySection.tsx
        │   ├── StepsSection.tsx
        │   ├── PricingSection.tsx
        │   ├── ProSection.tsx
        │   ├── CommunitySection.tsx
        │   └── TestimonialSection.tsx
        └── app/                  # Routed pages
            ├── login/            /login
            ├── signup/           /signup
            ├── onboarding/       /onboarding
            ├── community/        /community
            ├── styles/           /styles
            ├── style/[id]/       /style/:id
            ├── tokens/           /tokens
            ├── legal/terms/      /legal/terms
            ├── legal/privacy/    /legal/privacy
            └── app/              # Authenticated dashboard
                ├── page.tsx             /app
                ├── skin/                /app/skin
                ├── settings/            /app/settings
                ├── queue/               /app/queue
                ├── progress/            /app/progress
                ├── history/             /app/history
                ├── favorites/           /app/favorites
                ├── export/              /app/export
                ├── notifications/       /app/notifications
                └── result/[id]/         /app/result/:id
```

---

## Custom UI Primitives

Beyond the standard shadcn/ui set, the project ships these bespoke components in `app/src/components/ui/`:

- **GlassCard** — glassmorphism container with gradient border
- **GlowButton** — primary CTA with glow-on-hover
- **QueueOrb** — animated orb representing queue position
- **StyleCard** — style gallery card with hover lift
- **TierBadge** — subscription tier label
- **TokenDisplay** — token balance display
- **AnimatedInput** — input with animated label / focus ring
- **BeforeAfterSlider** — draggable before/after image comparison
- **Modal**, **Toast** — app-level feedback primitives

---

## Getting Started

### Prerequisites

- Node.js **20+** (check with `node --version`)
- npm 10+ (ships with Node 20)

### Install & run

```bash
cd app
npm install        # install dependencies
npm run dev        # start Vite dev server (default: http://localhost:5173)
```

### Available scripts

| Script             | Description                                  |
|--------------------|----------------------------------------------|
| `npm run dev`      | Start Vite dev server with HMR               |
| `npm run build`    | Type-check (`tsc -b`) + production build     |
| `npm run preview`  | Preview the production build locally         |
| `npm run lint`     | Run ESLint                                   |

---

## Notes

- Tailwind is configured with the shadcn theme tokens (`app/tailwind.config.js`).
- Path alias `@/*` maps to `app/src/*` (see `tsconfig.app.json` / `vite.config.ts`).
- All shadcn/ui components live under `app/src/components/ui/` and can be customized in place.
- The `app/src/app/` directory follows a Next.js-style routing convention; if you migrate to Next.js later, the file layout maps 1:1 to the App Router.

---

## License

Proprietary — all rights reserved. Contact the repository owner for usage or licensing questions.
