# DESIGN.md — Craft Silicon Booth Lead Capture
**Product**: Booth Lead Capture System  
**Brand**: Craft Silicon  
**Design Language**: Apple-methodology adapted to Craft Silicon identity  
**Version**: 1.0  
**Last Updated**: 2026-04-20

---

## 1. Design Philosophy

This system inherits Apple's core principle: **the interface retreats; the purpose commands.** Every pixel earns its place. Nothing decorates. Nothing distracts.

But where Apple uses drama through black-and-white contrast, Craft Silicon earns authority through **depth of navy** — the colour of trust, precision, and enterprise. The dark hero form is not theatrical; it is controlled. The light admin surface is not sterile; it is assured.

Two modes. One visual language. Zero noise.

**The three constraints that govern all decisions:**

1. **One accent colour.** Craft Silicon Blue (`#0A6AE2`) is the only chromatic value in the system. It appears only on interactive elements: buttons, focus states, and links. If something glows blue, it moves.
2. **No decoration.** No gradients, textures, border radii above 12px on rectangular elements, layered shadows, or coloured backgrounds that are not part of the defined section palette.
3. **Typography carries hierarchy.** Weight, size, and tracking do the work that colour, icons, and layout effects cannot.

---

## 2. Brand Colour System

### 2.1 Core Colours

| Token | Hex | Role |
|-------|-----|------|
| `--cs-navy-deep` | `#071426` | Hero sections, form background, immersive surfaces |
| `--cs-navy-mid` | `#0D2045` | Navigation bar, admin header, elevated dark surfaces |
| `--cs-navy-surface` | `#132952` | Card surfaces within dark sections |
| `--cs-navy-border` | `rgba(255,255,255,0.10)` | Borders and dividers on dark backgrounds |
| `--cs-blue` | `#0A6AE2` | **The singular interactive accent.** Buttons, links, focus rings |
| `--cs-blue-hover` | `#0D7AF8` | Hover state on blue CTAs — slightly brighter |
| `--cs-blue-dark` | `#3D94F5` | Links and interactive elements on dark backgrounds |
| `--cs-light-bg` | `#EEF2F8` | Alternate light sections (Admin body, success page) — cool-tinted, not sterile |
| `--cs-light-surface` | `#FFFFFF` | Cards and containers on light backgrounds |
| `--cs-light-border` | `rgba(10,40,90,0.10)` | Borders on light surfaces |

### 2.2 Text Colours

| Token | Value | Use |
|-------|-------|-----|
| `--text-on-dark-primary` | `#FFFFFF` | Headlines and primary text on navy backgrounds |
| `--text-on-dark-secondary` | `rgba(255,255,255,0.60)` | Subtext, captions, labels on dark |
| `--text-on-dark-tertiary` | `rgba(255,255,255,0.35)` | Placeholder text, privacy note, gear icon |
| `--text-on-light-primary` | `#071426` | Primary body text on light backgrounds — the deepest navy, not black |
| `--text-on-light-secondary` | `rgba(7,20,38,0.55)` | Muted labels and secondary info on light |
| `--text-on-light-tertiary` | `rgba(7,20,38,0.36)` | Timestamps, footnotes, tertiary labels |

### 2.3 Semantic Colours

| Token | Value | Use |
|-------|-------|-----|
| `--cs-error` | `#D93025` | Inline field validation errors |
| `--cs-error-bg` | `rgba(217,48,37,0.07)` | Error field tint (optional, use sparingly) |
| `--cs-success` | `#1A7F48` | Success confirmation mark |

### 2.4 Section Rhythm

Following Apple's cinematic alternation, this system uses two section types:

| Section | Background | Text Primary | Use |
|---------|------------|-------------|-----|
| **Immersive** | `#071426` (cs-navy-deep) | `#FFFFFF` | Public form, success screen — dark commands attention |
| **Informational** | `#EEF2F8` (cs-light-bg) | `#071426` | Admin dashboard — light communicates openness, data clarity |

The nav/header bridge (`#0D2045`) sits between both worlds — dark enough for authority, not as deep as the hero form.

---

## 3. Typography

### 3.1 Font Stack

SF Pro is Apple's proprietary typeface and unavailable on web. The closest public equivalent that matches its optical engineering and weight range is **Inter** (display) and **Inter** (body). At large sizes use `font-optical-sizing: auto` and `font-variation-settings: "opsz" {size}`.

```css
--font-display: 'Inter', 'Helvetica Neue', Helvetica, Arial, sans-serif;
--font-body:    'Inter', 'Helvetica Neue', Helvetica, Arial, sans-serif;
```

Load via: `https://rsms.me/inter/inter.css` (full optical size axis support)

### 3.2 Type Scale

| Role | Size | Weight | Line Height | Letter Spacing | Notes |
|------|------|--------|-------------|----------------|-------|
| **Form Hero** | 28px / 1.75rem | 600 | 1.10 | -0.28px | "Let's Connect" headline on form |
| **Section Heading** | 22px / 1.38rem | 600 | 1.14 | -0.22px | Admin section titles |
| **Card Title** | 18px / 1.13rem | 600 | 1.19 | -0.18px | Stat card values (as label, not number) |
| **Body** | 15px / 0.94rem | 400 | 1.50 | -0.20px | Form labels, table cell text |
| **Body Emphasis** | 15px / 0.94rem | 500 | 1.50 | -0.20px | Lead name in table, strong body text |
| **Caption** | 13px / 0.81rem | 400 | 1.38 | -0.16px | Table secondary columns, timestamps |
| **Label** | 11px / 0.69rem | 500 | 1.00 | +0.08px | Field labels (uppercase), stat card labels |
| **Micro** | 11px / 0.69rem | 400 | 1.47 | -0.08px | Privacy note, fine print |
| **Stat Number** | 28px / 1.75rem | 500 | 1.00 | -0.5px | Dashboard metric values — tabular-nums |

### 3.3 Principles

- **Tight at display, open at body.** Headlines live at 1.07–1.14. Body opens to 1.47–1.50. This range is where hierarchy lives.
- **Negative tracking universally.** Every text style except field labels (which use slight positive tracking for legibility in uppercase) runs with negative letter-spacing. Inter runs tight; let it.
- **Weight restraint.** The system uses 400 (regular), 500 (medium), and 600 (semibold) only. No 700 except the stat number on the admin dashboard.
- **Uppercase only for field labels.** `text-transform: uppercase` appears exclusively on the 11px field label, mirroring Apple's form label treatment. No other element uses uppercase.
- **Optical sizing on.** Set `font-optical-sizing: auto` on all text to allow Inter's variable axis to adapt letterforms by size, approximating SF Pro's built-in optical switching.

---

## 4. Component Specifications

### 4.1 Text Input Field (Form)

```
State:         Default
Background:    transparent
Border:        none
Border-bottom: 1px solid rgba(255,255,255,0.15)  [--cs-navy-border]
Color:         #FFFFFF
Font:          15px Inter 400, letter-spacing -0.20px
Padding:       10px 0
Transition:    border-bottom-color 180ms ease-out

State:         Focus
Border-bottom: 1px solid #0A6AE2  [--cs-blue]

State:         Error
Border-bottom: 1px solid #D93025  [--cs-error]

State:         Placeholder
Color:         rgba(255,255,255,0.25)  [--text-on-dark-tertiary]

Label (above):
  Font:        11px Inter 500
  Color:       rgba(255,255,255,0.40)
  Transform:   uppercase
  Tracking:    +0.08em
  Margin-bottom: 8px
```

### 4.2 Primary CTA Button (Submit)

```
Background:    #0A6AE2  [--cs-blue]
Color:         #FFFFFF
Font:          15px Inter 500, letter-spacing 0.02em
Padding:       14px 24px
Border-radius: 8px
Border:        none
Width:         100%

Hover:         background → #0D7AF8  [--cs-blue-hover], transition 160ms ease
Active:        scale(0.98), transition 80ms
Disabled:      opacity 0.40, cursor not-allowed
Loading:       opacity 0.70, cursor not-allowed, text → "Submitting…"
```

> Apple rule applied: **pill CTAs only for links, 8px radius for action buttons.**  
> The Submit button is an action, not a nav link — it earns a rectangular feel.

### 4.3 Ghost Button (Secondary / "Submit another")

```
Background:    transparent
Color:         rgba(255,255,255,0.50)
Border:        1px solid rgba(255,255,255,0.15)
Border-radius: 8px
Font:          14px Inter 400
Padding:       11px 24px

Hover:         border-color → rgba(255,255,255,0.30)
```

### 4.4 Inline Error Message

```
Color:         #D93025  [--cs-error]
Font:          12px Inter 400, line-height 1.40
Margin-top:    6px
```

Rule: fires only after the user has left (`blur`) the field. Never on keystroke. Never clears the input on error.

### 4.5 Stat Card (Admin)

```
Background:    #FFFFFF  [--cs-light-surface]
Border:        0.5px solid rgba(7,20,38,0.10)  [--cs-light-border]
Border-radius: 10px
Padding:       1.1rem 1.25rem

Label:  10px Inter 500 uppercase tracking +0.08em, color rgba(7,20,38,0.45)
Value:  28px Inter 500, color #071426, font-variant-numeric: tabular-nums, letter-spacing -0.5px
```

### 4.6 Admin Table Row

```
Header cells:  10px Inter 500 uppercase +0.07em, color rgba(7,20,38,0.40)
               Padding: 11px 14px
               Border-bottom: 0.5px solid rgba(7,20,38,0.08)

Body cells:    13px Inter 400, color rgba(7,20,38,0.60)
               Padding: 13px 14px
               Border-bottom: 0.5px solid rgba(7,20,38,0.05)

Name cell:     15px Inter 500, color #071426  [--text-on-light-primary]
Last row:      no border-bottom

Row hover:     background #F7F9FC, transition 100ms
```

### 4.7 Search Input (Admin)

```
Background:    #FFFFFF
Border:        0.5px solid rgba(7,20,38,0.15)
Border-radius: 8px
Padding:       10px 14px
Font:          14px Inter 400, color #071426
Placeholder:   rgba(7,20,38,0.35)
Width:         100%

Focus:         border-color → #0A6AE2, outline: none
Transition:    border-color 160ms ease-out
```

### 4.8 Admin Header / Nav Bar

```
Background:    #0D2045  [--cs-navy-mid]
Padding:       1.1rem 1.75rem
Position:      sticky top-0
z-index:       10

Title:         15px Inter 500, color #FFFFFF
Lead count:    12px Inter 400, color #3D94F5  [--cs-blue-dark]  — lead count displayed in CS Blue, dark variant

Export button:
  Background:  rgba(10,106,226,0.12)
  Border:      1px solid rgba(10,106,226,0.35)
  Color:       #3D94F5
  Border-radius: 6px
  Font:        12px Inter 500
  Padding:     7px 15px

Sign-out button:
  Background:  rgba(255,255,255,0.05)
  Border:      1px solid rgba(255,255,255,0.10)
  Color:       rgba(255,255,255,0.45)
  Border-radius: 6px
  Font:        12px Inter 400
```

### 4.9 Success Mark

```
Container:     52x52px, border-radius 50%
Border:        1.5px solid #0A6AE2  [--cs-blue]
Color:         #0A6AE2
Checkmark:     SVG path or Unicode ✓ at 18px
```

---

## 5. Spacing System

Following Apple's generous whitespace doctrine. Spacing is not padding — it is breathing room that gives each element dignity.

| Token | Value | Use |
|-------|-------|-----|
| `--space-xs` | 6px | Error message margin-top, badge padding |
| `--space-sm` | 8px | Label margin-bottom, icon gaps |
| `--space-md` | 12px | Stat card gap, table cell horizontal padding |
| `--space-lg` | 16px | Section internal padding, card padding |
| `--space-xl` | 24px | Between form fields, between sections |
| `--space-2xl` | 32px | Form top margin (below headline), admin body padding |
| `--space-3xl` | 48px | Section vertical padding |

**Form vertical rhythm:**

```
Brand mark top margin:   48px from top
Headline:                28px / font-hero
Sub-text:                margin-top 8px
Fields block:            margin-top 32px
Between fields:          margin-bottom 24px (24px on field-wrap)
Submit button:           margin-top 8px (after last field)
Privacy note:            margin-top 20px
Admin gear:              margin-top 48px
```

---

## 6. Layout

### 6.1 Form Page

- Full-viewport, single column, vertically centred
- Max content width: `420px`, centred with horizontal padding `24px`
- No card wrapper — the form IS the surface. The dark background is the container.
- `min-height: 100dvh` (not `100vh` — avoids mobile address-bar collapse)

### 6.2 Admin Page

- Full-viewport document scroll
- Body padding: `24px` (mobile) → `32px` (desktop)
- Stat grid: `repeat(auto-fit, minmax(130px, 1fr))` — never hardcode columns
- Table: full-width, `min-width: 560px` inside a scroll wrapper to handle narrow viewports

### 6.3 Breakpoints (from Apple's responsive doctrine)

| Name | Width | Key Change |
|------|-------|-----------|
| Mobile | 360px–480px | Single column, 20px horizontal padding |
| Mobile Large | 480px–640px | 24px padding, form max-width 400px |
| Tablet | 640px–1024px | Admin stat grid expands to 3 columns |
| Desktop | 1024px+ | Admin content max-width 1100px, centred |

---

## 7. Elevation & Depth

Apple uses shadow sparingly. This system follows the same restraint — but replaces Apple's photographic-shadow metaphor with **depth-through-navy-stacking**.

| Level | Treatment | Use |
|-------|-----------|-----|
| 0 — Flat | No shadow, background contrast only | Form fields, section blocks |
| 1 — Lift | `0 2px 16px rgba(7,20,38,0.10)` | Admin stat cards, login card |
| 2 — Float | `0 4px 24px rgba(7,20,38,0.15)` | Admin table (subtle), modal-like elements |
| Nav | `background: #0D2045` sticky | Admin header — elevation is colour, not shadow |

**Rule**: no shadow on the public form. The dark background IS the container. Borders on dark surfaces are `rgba(255,255,255,0.10)` — barely there.

---

## 8. Motion

Following Apple's animation doctrine: **animation is functional, never decorative.** Every transition communicates state, not style.

| Element | Property | Duration | Easing |
|---------|----------|----------|--------|
| Field border on focus/blur | `border-color` | 180ms | ease-out |
| Button hover background | `background-color` | 160ms | ease-out |
| Button active press | `transform: scale(0.98)` | 80ms | ease-out |
| Form card entrance | `opacity: 0→1, translateY(12px→0)` | 300ms | ease-out (Framer Motion) |
| Success screen entrance | `opacity: 0→1, scale(0.97→1)` | 260ms | ease-out |
| Table row hover | `background` | 100ms | linear |
| Error message reveal | `opacity: 0→1` | 160ms | ease-out |

**Rule from DESIGN-apple.md:** animate only `transform` and `opacity`. Never animate `height`, `width`, `margin`, `padding`, or `background` on large surfaces.

**Prefers-reduced-motion:** Wrap all Framer Motion animations in `useReducedMotion()`. If true, set `duration: 0`.

---

## 9. Accessibility

These rules are non-negotiable. They come directly from Apple's accessibility doctrine.

- All interactive elements have visible focus state: `outline: 2px solid #0A6AE2`, `outline-offset: 2px`
- Focus state is `#0A6AE2` — the brand blue doubles as the focus colour, identical to Apple Blue's role
- Touch targets minimum `44x44px` — all buttons, inputs, and the admin gear icon
- Error messages are associated with fields via `aria-describedby`
- Submit button `aria-disabled` (not just `disabled`) while loading so screen readers announce the state
- Admin table has `<caption>` or `aria-label` for screen readers
- Colour contrast: all text/background pairs must meet WCAG AA (4.5:1 minimum)
  - White `#FFFFFF` on `#071426`: 17.7:1 ✓
  - White `#FFFFFF` on `#0D2045`: 12.1:1 ✓
  - `#0A6AE2` on `#FFFFFF`: 4.9:1 ✓ (passes AA)
  - `#3D94F5` on `#0D2045`: 5.2:1 ✓

---

## 10. Do's and Don'ts

### Do
- Use `#0A6AE2` **only** for interactive elements — it is the entire chromatic budget
- Keep the form on `#071426` — the dark navy is premium, not ominous
- Use `rgba(255,255,255,0.40)` for field labels on dark — exact opacity, not brighter
- Apply negative letter-spacing to every text style (except the uppercase field label)
- Compress form headline line-height to 1.10 — it should feel like a statement, not a paragraph
- Use `100dvh` not `100vh` on the form wrapper
- Reserve `border-radius: 50%` for the success checkmark ring only
- Make the gear icon `rgba(255,255,255,0.08)` — essentially invisible to visitors

### Don't
- Don't introduce a second accent colour — not teal, not green, not gold
- Don't add a card/container box around the form on dark background — the page IS the card
- Don't use `box-shadow` on the form or form fields — depth lives in the navy stacking
- Don't uppercase anything except 11px field labels
- Don't animate layout properties (`height`, `width`, `padding`, `margin`)
- Don't use font-weight 700+ except the admin stat numbers
- Don't use `border-radius > 12px` on rectangular elements (pill shape is for links only)
- Don't add a logo image unless a verified SVG export from Craft Silicon is available — use the wordmark as text instead to avoid low-quality rasters at a booth event

---

## 11. Colour-in-Use Quick Reference

```css
/* ─── Core Tokens ─────────────────────────────── */
--cs-navy-deep:      #071426;
--cs-navy-mid:       #0D2045;
--cs-navy-surface:   #132952;
--cs-navy-border:    rgba(255, 255, 255, 0.10);
--cs-blue:           #0A6AE2;
--cs-blue-hover:     #0D7AF8;
--cs-blue-dark:      #3D94F5;
--cs-light-bg:       #EEF2F8;
--cs-light-surface:  #FFFFFF;
--cs-light-border:   rgba(7, 20, 38, 0.10);

/* ─── Text ────────────────────────────────────── */
--text-dark-1:       #FFFFFF;
--text-dark-2:       rgba(255, 255, 255, 0.60);
--text-dark-3:       rgba(255, 255, 255, 0.35);
--text-light-1:      #071426;
--text-light-2:      rgba(7, 20, 38, 0.55);
--text-light-3:      rgba(7, 20, 38, 0.36);

/* ─── Semantic ────────────────────────────────── */
--cs-error:          #D93025;
--cs-success:        #1A7F48;
```

---

## 12. Component Prompt Reference

Use these when generating components in Cursor, v0, or Stitch:

**Public Form:**
> "Dark form on `#071426` background. Form is full-viewport, vertically centred, max-width 420px. Wordmark 'Craft Silicon' at 12px Inter 400 uppercase letter-spacing 0.12em, colour rgba(255,255,255,0.35). Below: 28px Inter 600 line-height 1.10 letter-spacing -0.28px white headline 'Let's Connect'. 13px subtext rgba(255,255,255,0.40). Fields: transparent background, no border, 1px bottom border rgba(255,255,255,0.15) → focus #0A6AE2. Label above each field: 11px Inter 500 uppercase +0.08em letter-spacing rgba(255,255,255,0.40). Submit button: full-width, #0A6AE2 background, white text, 14px Inter 500, padding 14px 24px, border-radius 8px. Privacy note: rgba(255,255,255,0.25) 11px centred below button."

**Admin Dashboard:**
> "Light admin on #EEF2F8 background. Sticky header #0D2045, padding 1.1rem 1.75rem. Header title 15px Inter 500 white 'Booth Leads'. Lead count 12px #3D94F5. Export CSV button: rgba(10,106,226,0.12) bg, 1px solid rgba(10,106,226,0.35) border, #3D94F5 text, 6px radius. Body: 3 stat cards (white, 0.5px border rgba(7,20,38,0.10), 10px radius) with 10px uppercase label and 28px Inter 500 value. Search input: white bg, 0.5px border, 8px radius, focus border #0A6AE2. Leads table: white bg, 10px radius container, 0.5px border. Th: 10px Inter 500 uppercase rgba(7,20,38,0.40). Td: 13px Inter 400 rgba(7,20,38,0.60). Lead name: 15px Inter 500 #071426."

**Success Screen:**
> "Dark success screen #071426. Centred vertically. 52x52px circle ring: 1.5px solid #0A6AE2. Checkmark inside: #0A6AE2. Headline 28px Inter 600 white line-height 1.10 'You're on the list.' Subtext 14px rgba(255,255,255,0.45) line-height 1.60. Ghost button: transparent, 1px solid rgba(255,255,255,0.15), rgba(255,255,255,0.50) text, 8px radius."