# DESIGN.md — Craft Silicon Booth Lead Capture (Precision Edition)
**Product**: Booth Lead Capture System  
**Brand**: Craft Silicon  
**Design Language**: Minimalist High-Precision  
**Version**: 1.2  
**Constraints**: Solid Colors only. No Gradients. No unnecessary Glow.

---

## 1. Design Philosophy: The Absolute Solid

This system is built on **Material Authority.** We reject gradients and glows in favor of **perfectly flat, high-contrast layering.** 

**The three constraints that govern all decisions:**

1. **One accent colour.** Craft Silicon Blue (`#0A6AE2`) is the only chromatic value. It is the only element allowed to deviate from the Navy/White scale.
2. **Solid Depth.** Depth is achieved through **Layer Stacking** of solid navy hex codes.
3. **Proactive Clarity.** The interface moves to assist the user, but its visual state remains static and stable.

---

## 2. Brand Colour System (Solid-State)

### 2.1 Core Colours

| Token | Hex | Role |
|-------|-----|------|
| `--cs-navy-deep` | `#071426` | Background material. Purely flat. |
| `--cs-navy-mid` | `#0D2045` | Layer 1 material (Dialog backgrounds, headers). |
| `--cs-navy-surface` | `#132952` | Layer 2 material (Inputs on focus/active). |
| `--cs-blue` | `#0A6AE2` | **Interaction State.** Solid Blue for CTAs and focus borders. |
| `--cs-light-bg` | `#EEF2F8` | Admin surface (Solid). |

---

## 3. Component Stylings (Precision Tier)

### 3.1 Proactive Conversational UI
- **One Question at a Time**: Each step is a full-screen focus.
- **Typing Indicator**: When transitioning between questions, show three solid white dots (`rgba(255,255,255,0.4)`) pulsing in sequence for 400ms.
- **Input Line**: A solid 1px border-bottom in `rgba(255,255,255,0.1)`. On focus, it switches instantly to a solid 2px `#0A6AE2` line. **No glow.**

### 3.2 The Precision Button
- **Default**: Solid `#0A6AE2`.
- **Hover**: Solid `#0D7AF8` (brighter blue).
- **Active**: `scale(0.98)` - crisp reduction. **No light-sweep**.
- **Border**: No border on primary buttons.

### 3.3 Stacked Table (Admin)
- **Header**: `#0D2045` (Solid Navy Mid).
- **Rows**: Alternating between `#FFFFFF` and `#F7F9FC`.
- **Borders**: Solid 1px `#EEF2F8`.

---

## 4. Motion: Proactive Transition

| Element | Spell (Animation) | Rationale |
|---------|-------------------|-----------|
| Question Transition | Horizontal Slide (300ms) | Direct, linear movement suggests progress. |
| Button Click | Instant State change | Communicates immediate command execution. |
| Typing Dots | Opacity Fade (0.4 → 1.0) | Mimics the proactive nature of a refined assistant. |

---

## 5. Stitch Prompt Reference (Precision v1.2)

**The Minimalist Welcome:**
> "Mobile screen, Solid Deep Navy background (#071426). Centered typography: 'Welcome to Craft Silicon' in pure White Inter Bold. No gradients, no glow. Below: A solid CS-Blue button (#0A6AE2) with a Sharp 8px radius. Flat design, high precision."

**The Identity Dialog:**
> "One-question conversational UI. Background is solid #071426. Text: 'What is your name?' centered in vibrant white. Below it, a single solid white 300px underline (1px). Flat UI, museum-quality minimalist layout. No shadows, no gradients."

**The Proactive Indicator:**
> "A close-up of a dark UI section (#071426). Three small, solid white circular dots in a horizontal row, middle dot is full opacity, outer dots are 40% opacity. Extremely clean, technical look."