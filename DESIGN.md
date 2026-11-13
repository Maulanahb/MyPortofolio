---
title: "Maulana Ahmad Bukhori — Clean Product Showcase + Bento Design System"
category: "Personal Portfolio & Engineering Case Study Showcase"
stack: ["Astro 6", "TypeScript", "Vanilla CSS", "HyperFrames Motion", "Playwright"]
source_inspo: ["Apple", "Framer", "Linear", "Vercel", "Stripe"]
---

<!-- impeccable:design-system -->
# Design System: MAULANA.DEV (Clean Product Showcase + Bento + HyperFrames)

## 1. Visual Philosophy & Aesthetic Direction
**Clean Product Showcase + Bento Grid + HyperFrames Motion** builds an editorial, Apple/Framer-caliber hardware/software exhibition around Maulana Ahmad Bukhori's production engineering systems:
- **Clarity Over Ornamentation**: Crisp `1px solid var(--line)` hairlines, rounded Bento geometry (`20px` outer bento cards, `16px` studio stages, `12px` controls, `9999px` navigation pill), generous breathing room, and layered tonal elevation (`--paper` -> `--paper-2` -> `--surface-3`).
- **Authentic UI Replicas**: All 5 interactive desktop and mobile product replicas (`BawangHub`, `Lapangku`, `PBL-IVSS`, `CUCI.IN`, `AIAAS`) live inside recessed Bento studio stages with isolated app palettes (`replicas.css`), ensuring interactive light/dark UI fidelity regardless of the portfolio shell theme.
- **Deterministic HyperFrames Motion**: System architecture flows (`Analysis & PRD` -> `Laravel / React / Flutter / Gemini AI` -> `PostgreSQL / PHPUnit CI`) animate with timeline scrubbing and full `prefers-reduced-motion` support (`HyperFramesFlow.astro` + `hyperframes/portfolio-showcase/index.html`).

---

## 2. Dual / Tri-Mode Theme System (`data-palette`)

Themes switch immediately on click via Header pill or Command Palette (`⌘K` / `Ctrl+K`), persisting across reloads via `localStorage('porto_palette')`. Auto-cycling on scroll is disabled to prevent visual fatigue. Root `color-scheme` stays synchronized via `:root { color-scheme: light; }` and `:root:has(body[data-palette='obsidian']) { color-scheme: dark; }`.

| Palette ID | Label | `--paper` (Canvas) | `--paper-2` (Surface) | `--surface-3` (Recessed) | `--ink` (Primary) | `--muted` (Secondary) | `--accent` (Action) | `--line` (Hairline) |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| `daylight` | **Daylight** | `#f5f5f7` | `#ffffff` | `#e8e8ed` | `#1d1d1f` | `#6e6e73` | `#0066cc` | `rgba(0, 0, 0, 0.08)` |
| `obsidian` | **Obsidian** | `#09090b` | `#141417` | `#1f1f25` | `#f5f5f7` | `#a1a1aa` | `#0a84ff` | `rgba(255, 255, 255, 0.10)` |
| `graphite` | **Graphite** | `#eae9e4` | `#f7f6f2` | `#dedcd3` | `#18181b` | `#52525b` | `#2563eb` | `rgba(24, 24, 27, 0.10)` |

### Tri-Mode Backdrop & Atmosphere Tokens (`--bg-*`)

Every section ground adapts cleanly across Daylight, Obsidian, and Graphite while preserving high-contrast readability behind `.shell` cards (`src/styles/backgrounds.css`). The opening stage renders center-masked clamped container vertical alignment rails (`--bg-arc-line` at `--rail-x: max(var(--rail-inset), calc(50% - 600px))`) paired with a `24px` perimeter coordinate dot matrix (`--bg-dot-color`):

| Palette ID | `--bg-glow-1` / `--bg-glow-2` | `--bg-dot-color` | `--bg-dusk-band` / `--bg-dusk-muted` | `--bg-arc-line` | `--bg-horizon-rim` | `--bg-grain-opacity` / `--bg-grain-blend` |
| --- | --- | --- | --- | --- | --- | --- |
| `daylight` | `rgba(0, 102, 204, 0.09)` / `rgba(14, 116, 144, 0.06)` | `rgba(29, 29, 31, 0.13)` | `#ebedf2` / `#55555a` | `rgba(29, 29, 31, 0.085)` | `rgba(0, 102, 204, 0.24)` | `0.024` / `multiply` |
| `obsidian` | `rgba(10, 132, 255, 0.16)` / `rgba(20, 184, 166, 0.08)` | `rgba(255, 255, 255, 0.12)` | `#101218` / `#a1a1aa` | `rgba(255, 255, 255, 0.08)` | `rgba(10, 132, 255, 0.56)` | `0.036` / `screen` |
| `graphite` | `rgba(37, 99, 235, 0.08)` / `rgba(120, 113, 108, 0.09)` | `rgba(24, 24, 27, 0.14)` | `#e0dfd7` / `#4a4a52` | `rgba(24, 24, 27, 0.095)` | `rgba(37, 99, 235, 0.24)` | `0.028` / `multiply` |

---

## 3. Typography & Type Scale

- **Display Font (`--font-display`)**: `'Manrope', -apple-system, BlinkMacSystemFont, sans-serif` (weights `600`, `700`, `800`).
- **Body Font (`--font-sans`)**: `'IBM Plex Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif` (`15px`, `line-height: 1.65`).
- **Monospace Font (`--font-mono`)**: `'JetBrains Mono', ui-monospace, monospace` (used strictly for code tags, architecture IDs, timeline timecodes, and keyboard shortcut badges `⌘K`).

### Type Hierarchy Rules
- Display headings use tight negative tracking (`-0.025em` to `-0.03em`) and natural mixed/sentence casing—never all-caps `Anton` comic banners.
- Do not render uppercase tracked eyebrows (`letter-spacing > 0.12em` + `text-transform: uppercase`) above titles; use crisp neutral labels, step indices (`01`, `02`, `03`), or inline status pills instead.

---

## 4. Layout Grid, Spacing & Elevation

- **Max Container Width (`.shell`)**: `1200px` centered with `24px` horizontal padding (`16px` on mobile).
- **Floating Frosted Header (`#site-header`)**: Pill-shaped sticky navbar with `backdrop-filter: blur(18px) saturate(180%)` backed by `--glass` and bordered with `1px solid var(--line)`.
- **Bento Grid Rhythm**:
  - **Hero Bento (`.hero-grid`)**: `minmax(0, 1.35fr) minmax(300px, 0.65fr)`, pairing primary identity/KPIs with an asymmetric studio portrait panel.
  - **Pipeline Bento (`.pipeline-grid`)**: Equal 3-column system engineering cards (`1px solid var(--line)`).
  - **HyperFrames Showcase (`.hf-showcase`)**: Deterministic interactive architecture player with Play/Pause, step selectors, and scrubber bar.
  - **Projects Bento (`.projects-grid`)**: Asymmetric 6-column grid (`span 4` feature + `span 2` companion, followed by `span 3` + `span 3`, finishing with `span 6` full-width interactive CUCI.IN 3-screen showcase).
  - **About & Competency (`.about-grid`, `.si-skill-grid`)**: Structured narrative alongside structured stack & engineering capabilities.
  - **Experience & Education (`.exp-grid`, `.edu-credentials-grid`)**: Structured timeline grid + certifications & GPA panel.

---

## 5. Floor Rules & Engineering Guardrails

1. **Zero Hard Comic Artifacts**: No `3px`/`4px` black borders, no `6px 6px 0` hard offset shadows, no rotated cards, no halftone dots, and no katakana SFX overlays.
2. **Token Discipline**: Every background, text, border, and focus color derives from CSS custom properties in `src/styles/variables.css` (`src/styles/replicas.css` cleanly scopes `--ink: #18181b` inside interactive product mockups).
3. **Motion Restraint**:
   - No `transition: all` anywhere in `variables.css`, `base.css`, `components.css`, or `replicas.css`.
   - Never animate `width`, `height`, `top`, `left`, `margin`, or `padding`; animate `transform` and `opacity` only.
   - `prefers-reduced-motion: reduce` flattens animations and renders deterministic timelines statically at rest.
4. **Overflow & Accessibility**:
   - Root uses `overflow-x: clip` (preserving `position: sticky`).
   - All controls have visible, instant `:focus-visible` `2px solid var(--accent)` focus outlines.
   - Minimum body font size `14px–15px` and WCAG AA contrast (`>= 4.5:1`) verified across all 3 palettes.

---

## 6. Architecture Overview (`src/`)

- `src/styles/variables.css`: `@property` color registrations, root `color-scheme` sync (`:root:has(...)`), + `daylight`, `obsidian`, `graphite` palette and `--bg-*` backdrop tokens.
- `src/styles/base.css`: Global resets, `overflow-x: clip`, `:focus-visible`, typography helpers, reduced-motion guard.
- `src/styles/backgrounds.css`: Tri-mode CSS background atmosphere system (`.page-atmosphere` static SVG `<feTurbulence>` noise tile, `.bg-opening-stage` topglow, center-masked clamped container vertical alignment rails & `24px` perimeter coordinate dots, `.ambient-mesh` GPU-only drift with `.ambient-motion-bar` / `.ambient-motion-btn` pause toggle, `.bg-dusk-band` 9-stop `oklab` smoothstep section melt, `.bg-closing-arcs` concentric rings, `.site-footer-horizon` horizon dome rim, and `forced-colors` / `print` fallbacks).
- `src/styles/components.css`: Clean Bento shell, frosted navbar, Hero Bento, Pipeline Bento, HyperFrames Showcase, Project Bento cards, Modal & Command Palette.
- `src/styles/replicas.css`: Isolated CSS for all 5 interactive UI replicas (`BawangHub`, `Lapangku`, `PBL-IVSS`, `CUCI.IN`, `AIAAS`) + modal scale rules.
- `src/components/HyperFramesFlow.astro` & `hyperframes/portfolio-showcase/index.html`: Deterministic motion architecture timeline component and standalone HyperFrames composition.
