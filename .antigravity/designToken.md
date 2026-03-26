# Design System

## Theme
Clean and minimal. Generous whitespace. No flashy effects, gradients, or gimmicks.
The palette is warm and distinctive — it should feel calm, confident, and professional.

## Color Palette — "Coffee"
Defined as CSS custom properties in `src/index.css` and registered with Tailwind.

### Light Mode
```css
--color-primary:     #561C24;   /* deep maroon — headings, active states, accent */
--color-secondary:   #6D2932;   /* medium maroon — hover states, secondary buttons */
--color-surface:     #E8D8C4;   /* warm beige — card backgrounds, section fills */
--color-muted:       #C7B7A3;   /* muted beige — borders, dividers, placeholders */
--color-background:  #F5EDE0;   /* light cream — page background */
--color-text:        #1a0a0a;   /* near-black with warm tone — body text */
--color-text-muted:  #561C24cc; /* primary at 80% opacity — secondary text */
```

### Dark Mode
```css
--color-primary:     #E8D8C4;   /* warm beige becomes the accent in dark mode */
--color-secondary:   #C7B7A3;   /* muted beige for hover/secondary */
--color-surface:     #2a1018;   /* very dark maroon — card backgrounds */
--color-muted:       #3d1a22;   /* dark maroon — borders, dividers */
--color-background:  #1a080e;   /* near-black with maroon undertone — page bg */
--color-text:        #E8D8C4;   /* warm beige — body text */
--color-text-muted:  #C7B7A3;   /* muted beige — secondary text */
```

## Typography
- Font family: **DM Sans** (Google Fonts)
  ```html
  <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600&display=swap" rel="stylesheet">
  ```
- Base size: 16px
- Font weights used: 300 (light), 400 (regular), 500 (medium), 600 (semibold)
- Do not use 700 (bold) or higher — it feels heavy against this palette
- Line height: 1.7 for body text, 1.2 for headings

### Type Scale
| Role          | Size  | Weight |
|---------------|-------|--------|
| Hero heading  | 48px  | 600    |
| Section heading | 32px | 500   |
| Sub-heading   | 24px  | 500    |
| Body          | 16px  | 400    |
| Small / meta  | 14px  | 400    |
| Tiny / label  | 12px  | 500    |

## Spacing
Base unit: 4px
Scale: 4, 8, 12, 16, 24, 32, 48, 64, 80, 96px
Use Tailwind spacing scale (1 = 4px). Stick to this scale — no arbitrary values.

## Border Radius
- Cards: `rounded-xl` (12px)
- Buttons: `rounded-lg` (8px)
- Inputs: `rounded-md` (6px)
- Tags / badges: `rounded-full`

## Shadows
Minimal. Only one shadow style in the entire project:
```
shadow: 0 2px 12px rgba(86, 28, 36, 0.08)   /* light mode */
shadow: 0 2px 12px rgba(0, 0, 0, 0.3)        /* dark mode */
```
No multi-layer shadows, no colored glows.

## Rules
- No gradients anywhere
- No animations except: fade-in on page load, smooth color transitions (150ms ease)
- Consistent section padding: `py-20 px-6 md:px-16 lg:px-32`
- Max content width: `max-w-5xl mx-auto`
- Two font weights per page maximum in any given section