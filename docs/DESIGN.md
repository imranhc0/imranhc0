# Design

## Visual Theme

Swiss technical datasheet. Light paper by default (daytime office reading), with an automatic dark scheme from `prefers-color-scheme`. A strict 12-column grid, numbered section rows with a sticky left rail, hairline rules, square corners. The only motion is the hero figure (an animated DNS firewall request path) and small hover responses.

## Color

Strategy: restrained surfaces with one committed accent. Ultramarine is used for links, the hero figure's "allowed" traffic and one fully drenched contact band. Vermilion appears only as the "blocked" signal in figures.

| Token | Light | Dark | Role |
|---|---|---|---|
| `--paper` | `oklch(0.975 0.004 265)` | `oklch(0.17 0.012 265)` | Page background |
| `--paper-2` | `oklch(0.95 0.006 265)` | `oklch(0.205 0.014 265)` | Panels, code blocks |
| `--ink` | `oklch(0.2 0.02 265)` | `oklch(0.94 0.008 265)` | Primary text, strong rules |
| `--ink-2` | `oklch(0.42 0.02 265)` | `oklch(0.77 0.012 265)` | Secondary text |
| `--ink-3` | `oklch(0.52 0.016 265)` | `oklch(0.64 0.012 265)` | Metadata |
| `--line` | `oklch(0.88 0.008 265)` | `oklch(0.3 0.014 265)` | Hairlines |
| `--accent` | `oklch(0.47 0.25 266)` | `oklch(0.74 0.14 268)` | Links, focus, allowed |
| `--accent-surface` | `oklch(0.45 0.24 266)` | `oklch(0.38 0.2 266)` | Drenched band |
| `--signal` | `oklch(0.6 0.22 30)` | `oklch(0.7 0.18 32)` | Blocked |

## Typography

- **Archivo** (variable, `wdth` 62–125, `wght` 100–900). Display: `wdth` 115–125, weight 700–800, tracking −0.035em. Body: `wdth` 100, weight 400, 17px / 1.6.
- **Fragment Mono** (400). Metadata, indices, dates, code. 13px with +0.01em tracking.
- Scale ratio ~1.333. Display `clamp(3rem, 1rem + 8vw, 7.25rem)`. Section titles `clamp(1.6rem, 1.1rem + 1.4vw, 2.25rem)`.
- Prose measure capped at 68ch.

## Layout

- Container max 1240px, inline padding `clamp(16px, 4vw, 40px)`.
- Section row: 1px ink rule on top, rail of 3/12 columns (index + title, sticky on desktop), content of 9/12.
- Lists (projects, posts) are ruled rows, not cards.

## Components

- **Spec strip**: 4-column definition list under the hero, hairline separated.
- **Row link**: full-width ruled row, title + summary + meta, arrow nudges on hover.
- **Figure**: hairline frame, `FIG. 0N` label, caption below in mono.
- **Contact band**: full-bleed `--accent-surface` with paper text.

## Motion

Ease-out-quart, 160–220ms on hover. Hero figure uses SMIL packets, hidden under `prefers-reduced-motion`. No entrance animations, so LCP is never delayed.
