# GlowHaus — Technical Specification

## 1. Component Inventory

### shadcn/ui Components (Built-in)
- `button` — CTAs, nav actions
- `card` — content cards, pricing cards
- `input` — email capture, forms
- `badge` — labels, plan badges
- `slider` — before/after handle (customized)
- `scroll-area` — horizontal style strip
- `separator` — section dividers
- `sheet` — mobile menu overlay

### Custom Components

**Layout Components**
- `PinnedSection` — wrapper for pinned scroll sections
- `FlowingSection` — wrapper for normal scroll sections
- `GlassCard` — card with glassmorphism effect
- `GradientBlob` — static radial gradient background

**Animation Components**
- `SplitText` — text reveal animation utility
- `AnimatedCard` — card with entrance/exit animations
- `BeforeAfterSlider` — draggable comparison slider
- `HorizontalStrip` — scroll-linked horizontal gallery

**UI Components**
- `UploadZone` — drag-and-drop upload area
- `StyleCard` — style gallery card with hover effects
- `PricingCard` — pricing plan card
- `TestimonialCard` — quote + attribution display
- `StepCard` — how-it-works step display
- `CommunityCard` — community look card with label

---

## 2. Animation Implementation Table

| Animation | Library | Implementation Approach | Complexity |
|-----------|---------|------------------------|------------|
| **Hero Load Animation** | GSAP Timeline | SplitText words stagger + card slide from right | High |
| **Pinned Section Entrances** | GSAP ScrollTrigger | `fromTo()` with x/y/opacity/scale transforms | High |
| **Pinned Section Exits** | GSAP ScrollTrigger | Reverse transforms, keep opacity until 95% | High |
| **Before/After Slider** | React + GSAP | Draggable handle with clip-path/translate | Medium |
| **Horizontal Style Strip** | GSAP ScrollTrigger | Link vertical scroll to horizontal translate | Medium |
| **Card Stagger Reveals** | GSAP ScrollTrigger | `stagger` with y/opacity/scale fromTo | Medium |
| **Quote Block Entrance** | GSAP ScrollTrigger | Slide from right with opacity | Low |
| **Pricing Card Rise** | GSAP ScrollTrigger | y + rotateX transform | Medium |
| **Button Hover Effects** | CSS Transitions | translateY + shadow (no animation) | Low |
| **Card Hover Lift** | CSS Transitions | translateY(-6px) + shadow | Low |
| **Grain Overlay** | CSS | Static PNG background | Low |
| **Radial Gradient Blobs** | CSS | Static radial-gradient backgrounds | Low |
| **Scroll Snap** | GSAP ScrollTrigger | Derive snap targets from pinned ranges | High |
| **Reduced Motion** | CSS + GSAP | `prefers-reduced-motion` media query | Low |

---

## 3. Animation Library Choices

### Primary: GSAP + ScrollTrigger
**Rationale:**
- Pinning requires precise scroll-linked control
- `fromTo()` ensures reliable reverse scroll
- ScrollTrigger scrub enables smooth scroll-driven animations
- SplitText-like behavior can be implemented with custom utility

### Secondary: CSS Transitions
**Rationale:**
- Hover states (buttons, cards) are simpler with CSS
- No need for JS overhead on micro-interactions
- Better performance for frequent hover events

### Not Using:
- **Framer Motion** — not needed; GSAP handles all requirements
- **CSS @keyframes** — avoid; use GSAP for consistency
- **Intersection Observer directly** — ScrollTrigger abstracts this

---

## 4. Project File Structure

```
app/
├── src/
│   ├── components/
│   │   ├── ui/                    # shadcn components
│   │   │   ├── button.tsx
│   │   │   ├── card.tsx
│   │   │   ├── input.tsx
│   │   │   ├── badge.tsx
│   │   │   ├── slider.tsx
│   │   │   ├── scroll-area.tsx
│   │   │   ├── separator.tsx
│   │   │   └── sheet.tsx
│   │   ├── layout/
│   │   │   ├── PinnedSection.tsx
│   │   │   ├── FlowingSection.tsx
│   │   │   ├── GlassCard.tsx
│   │   │   └── GradientBlob.tsx
│   │   ├── animation/
│   │   │   ├── SplitText.tsx
│   │   │   ├── AnimatedCard.tsx
│   │   │   └── useScrollAnimation.ts
│   │   └── sections/
│   │       ├── HeroSection.tsx
│   │       ├── StepsSection.tsx
│   │       ├── DemoSection.tsx
│   │       ├── GallerySection.tsx
│   │       ├── FeaturesSection.tsx
│   │       ├── CommunitySection.tsx
│   │       ├── TestimonialSection.tsx
│   │       ├── PricingSection.tsx
│   │       ├── ProSection.tsx
│   │       ├── SafetySection.tsx
│   │       ├── FinalCTASection.tsx
│   │       ├── AboutSection.tsx
│   │       └── FooterSection.tsx
│   ├── hooks/
│   │   ├── useScrollProgress.ts
│   │   ├── useBeforeAfter.ts
│   │   └── useMediaQuery.ts
│   ├── lib/
│   │   ├── utils.ts
│   │   └── animations.ts
│   ├── types/
│   │   └── index.ts
│   ├── App.tsx
│   ├── App.css
│   ├── index.css
│   └── main.tsx
├── public/
│   ├── images/
│   │   ├── hero_portrait.jpg
│   │   ├── demo_before.jpg
│   │   ├── demo_after.jpg
│   │   ├── style_strip_01-06.jpg
│   │   ├── community_grid_01-06.jpg
│   │   ├── testimonial_portrait.jpg
│   │   ├── pro_portrait.jpg
│   │   ├── finalcta_portrait.jpg
│   │   └── about_image.jpg
│   └── grain_overlay.png
├── index.html
├── tailwind.config.js
├── vite.config.ts
└── package.json
```

---

## 5. Dependencies to Install

### Core (from template)
- `react`
- `react-dom`
- `typescript`
- `vite`
- `tailwindcss`
- `@radix-ui/*` (via shadcn)
- `class-variance-authority`
- `clsx`
- `tailwind-merge`

### Animation
```bash
npm install gsap @gsap/react
```

### Fonts
```bash
# Google Fonts via CDN in index.html
# - Montserrat
# - Inter
# - Space Grotesk
```

### Optional
```bash
npm install lenis  # smooth scrolling (with ScrollTrigger scrollerProxy)
```

---

## 6. Key Implementation Details

### Pinned Section Pattern
```tsx
// PinnedSection.tsx wrapper
const PinnedSection = ({ children, className, triggerConfig }) => {
  const sectionRef = useRef<HTMLElement>(null);
  
  useEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top top",
        end: "+=130%",
        pin: true,
        scrub: 0.6,
        ...triggerConfig
      });
    }, sectionRef);
    
    return () => ctx.revert();
  }, []);
  
  return (
    <section ref={sectionRef} className={cn("w-screen h-screen overflow-hidden", className)}>
      {children}
    </section>
  );
};
```

### Scroll Snap Implementation
```tsx
// In App.tsx or main scroll controller
useEffect(() => {
  const pinned = ScrollTrigger.getAll()
    .filter(st => st.vars.pin)
    .sort((a, b) => a.start - b.start);
  
  const maxScroll = ScrollTrigger.maxScroll(window);
  
  const pinnedRanges = pinned.map(st => ({
    start: st.start / maxScroll,
    end: (st.end ?? st.start) / maxScroll,
    center: (st.start + ((st.end ?? st.start) - st.start) * 0.5) / maxScroll,
  }));
  
  ScrollTrigger.create({
    snap: {
      snapTo: (value: number) => {
        const inPinned = pinnedRanges.some(
          r => value >= r.start - 0.02 && value <= r.end + 0.02
        );
        if (!inPinned) return value;
        
        const target = pinnedRanges.reduce((closest, r) =>
          Math.abs(r.center - value) < Math.abs(closest - value) ? r.center : closest,
          pinnedRanges[0]?.center ?? 0
        );
        return target;
      },
      duration: { min: 0.15, max: 0.35 },
      delay: 0,
      ease: "power2.out"
    }
  });
}, []);
```

### Before/After Slider Pattern
```tsx
// useBeforeAfter.ts hook
const useBeforeAfter = (initialPosition = 50) => {
  const [position, setPosition] = useState(initialPosition);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const handleMove = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percent = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setPosition(percent);
  }, []);
  
  // Mouse/touch event handlers...
  
  return { position, isDragging, containerRef, handleMove };
};
```

### SplitText Utility
```tsx
// SplitText.tsx - manual implementation
const SplitText = ({ children, className, as: Component = "span" }) => {
  const words = children.split(" ");
  
  return (
    <Component className={className}>
      {words.map((word, i) => (
        <span key={i} className="inline-block overflow-hidden">
          <span className="split-word inline-block">{word}</span>
          {i < words.length - 1 && "\u00A0"}
        </span>
      ))}
    </Component>
  );
};
```

---

## 7. Performance Considerations

### GPU-Optimized Properties Only
- ✅ `transform: translate3d()`, `scale()`, `rotate()`
- ✅ `opacity`
- ❌ `width`, `height`, `top`, `left` (causes layout)
- ❌ `filter: blur()` (heavy, avoid animating)

### ScrollTrigger Best Practices
- Use `scrub: true` or `scrub: 0.6` for smooth linkage
- Use `fromTo()` for every animated element
- Use `will-change: transform` on animated elements
- Implement `onLeaveBack` to reset hero visibility

### Image Optimization
- Use WebP format where possible
- Lazy load below-fold images
- Provide appropriate `srcset` for responsive images

---

## 8. Accessibility

### Reduced Motion
```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

### Keyboard Navigation
- All interactive elements focusable
- Visible focus rings (2px accent outline)
- Skip to main content link

### Screen Readers
- Semantic HTML structure
- ARIA labels on interactive components
- Alt text on all images
