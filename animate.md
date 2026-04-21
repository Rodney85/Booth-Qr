# TextEffect Animation + Typography Fix
**Feature**: Screen-entry text animation using motion-primitives TextEffect  
**Scope**: Headlines + subtext only. No layout changes. No component restructuring.  
**Stack**: Vite + React + TypeScript + Tailwind CSS + shadcn/ui + Framer Motion

---

## What We Are Building

When any of the 5 form screens mounts, the headline animates in word-by-word using a blur+slide preset. The personalised name (injected into the headline) appears last, in the brand blue `#3D94F5`, character by character — making the personalisation feel intentional, not just a string replacement.

The subtext fades in after the headline completes with a short delay.

Nothing else animates. Cards, fields, and buttons do not animate. This is text-only.

---

## Step 0 — Install TextEffect Component

Copy the following file exactly as-is into `src/components/ui/text-effect.tsx`:

```tsx
'use client';

import { cn } from '@/lib/utils';
import {
  AnimatePresence,
  motion,
  TargetAndTransition,
  Variants,
} from 'framer-motion';
import React from 'react';

type PresetType = 'blur' | 'shake' | 'scale' | 'fade' | 'slide';

type TextEffectProps = {
  children: string;
  per?: 'word' | 'char' | 'line';
  as?: keyof React.JSX.IntrinsicElements;
  variants?: {
    container?: Variants;
    item?: Variants;
  };
  className?: string;
  preset?: PresetType;
  delay?: number;
  trigger?: boolean;
  onAnimationComplete?: () => void;
  segmentWrapperClassName?: string;
};

const defaultStaggerTimes: Record<'char' | 'word' | 'line', number> = {
  char: 0.03,
  word: 0.05,
  line: 0.1,
};

const defaultContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
    },
  },
  exit: {
    transition: { staggerChildren: 0.05, staggerDirection: -1 },
  },
};

const defaultItemVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
  },
  exit: { opacity: 0 },
};

const presetVariants: Record<
  PresetType,
  { container: Variants; item: Variants }
> = {
  blur: {
    container: defaultContainerVariants,
    item: {
      hidden: { opacity: 0, filter: 'blur(12px)' },
      visible: { opacity: 1, filter: 'blur(0px)' },
      exit: { opacity: 0, filter: 'blur(12px)' },
    },
  },
  shake: {
    container: defaultContainerVariants,
    item: {
      hidden: { x: 0 },
      visible: { x: [-5, 5, -5, 5, 0], transition: { duration: 0.5 } },
      exit: { x: 0 },
    },
  },
  scale: {
    container: defaultContainerVariants,
    item: {
      hidden: { opacity: 0, scale: 0 },
      visible: { opacity: 1, scale: 1 },
      exit: { opacity: 0, scale: 0 },
    },
  },
  fade: {
    container: defaultContainerVariants,
    item: {
      hidden: { opacity: 0 },
      visible: { opacity: 1 },
      exit: { opacity: 0 },
    },
  },
  slide: {
    container: defaultContainerVariants,
    item: {
      hidden: { opacity: 0, y: 20 },
      visible: { opacity: 1, y: 0 },
      exit: { opacity: 0, y: 20 },
    },
  },
};

const AnimationComponent: React.FC<{
  segment: string;
  variants: Variants;
  per: 'line' | 'word' | 'char';
  segmentWrapperClassName?: string;
}> = React.memo(({ segment, variants, per, segmentWrapperClassName }) => {
  const content =
    per === 'line' ? (
      <motion.span variants={variants} className='block'>
        {segment}
      </motion.span>
    ) : per === 'word' ? (
      <motion.span
        aria-hidden='true'
        variants={variants}
        className='inline-block whitespace-pre'
      >
        {segment}
      </motion.span>
    ) : (
      <motion.span className='inline-block whitespace-pre'>
        {segment.split('').map((char, charIndex) => (
          <motion.span
            key={`char-${charIndex}`}
            aria-hidden='true'
            variants={variants}
            className='inline-block whitespace-pre'
          >
            {char}
          </motion.span>
        ))}
      </motion.span>
    );

  if (!segmentWrapperClassName) {
    return content;
  }

  const defaultWrapperClassName = per === 'line' ? 'block' : 'inline-block';

  return (
    <span className={cn(defaultWrapperClassName, segmentWrapperClassName)}>
      {content}
    </span>
  );
});

AnimationComponent.displayName = 'AnimationComponent';

export function TextEffect({
  children,
  per = 'word',
  as = 'p',
  variants,
  className,
  preset,
  delay = 0,
  trigger = true,
  onAnimationComplete,
  segmentWrapperClassName,
}: TextEffectProps) {
  let segments: string[];

  if (per === 'line') {
    segments = children.split('\n');
  } else if (per === 'word') {
    segments = children.split(/(\s+)/);
  } else {
    segments = children.split('');
  }

  const MotionTag = motion[as as keyof typeof motion] as typeof motion.div;
  const selectedVariants = preset
    ? presetVariants[preset]
    : { container: defaultContainerVariants, item: defaultItemVariants };
  const containerVariants = variants?.container || selectedVariants.container;
  const itemVariants = variants?.item || selectedVariants.item;
  const ariaLabel = per === 'line' ? undefined : children;

  const stagger = defaultStaggerTimes[per];

  const delayedContainerVariants: Variants = {
    hidden: containerVariants.hidden,
    visible: {
      ...containerVariants.visible,
      transition: {
        ...(containerVariants.visible as TargetAndTransition)?.transition,
        staggerChildren:
          (containerVariants.visible as TargetAndTransition)?.transition
            ?.staggerChildren || stagger,
        delayChildren: delay,
      },
    },
    exit: containerVariants.exit,
  };

  return (
    <AnimatePresence mode='popLayout'>
      {trigger && (
        <MotionTag
          initial='hidden'
          animate='visible'
          exit='exit'
          aria-label={ariaLabel}
          variants={delayedContainerVariants}
          className={cn('whitespace-pre-wrap', className)}
          onAnimationComplete={onAnimationComplete}
        >
          {segments.map((segment, index) => (
            <AnimationComponent
              key={`${per}-${index}-${segment}`}
              segment={segment}
              variants={itemVariants}
              per={per}
              segmentWrapperClassName={segmentWrapperClassName}
            />
          ))}
        </MotionTag>
      )}
    </AnimatePresence>
  );
}
```

---

## Step 1 — Install Dependencies

```bash
npm install framer-motion
```

---

## Step 2 — Create the ScreenHeadline Component

Create `src/components/ui/screen-headline.tsx`:

```tsx
import React from 'react';
import { motion } from 'framer-motion';
import { TextEffect } from '@/components/ui/text-effect';

interface ScreenHeadlineProps {
  /** The part of the headline BEFORE the name. e.g. "Nice to meet you, " */
  before?: string;
  /** The personalised name to highlight in brand blue. e.g. "Garvin" */
  name?: string;
  /** The part of the headline AFTER the name. e.g. ". Where do you work?" */
  after?: string;
  /** For screens with no name injection, pass the full headline here */
  full?: string;
  /** The subtext paragraph below the headline */
  subtext: string;
  /** Unique key — must change on every screen transition to retrigger animation */
  screenKey: string;
}

export function ScreenHeadline({
  before,
  name,
  after,
  full,
  subtext,
  screenKey,
}: ScreenHeadlineProps) {

  // Custom blur+slide variant — words enter from slightly below with blur clearing
  const headlineVariants = {
    container: {
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: {
          staggerChildren: 0.06,
          delayChildren: 0,
        },
      },
    },
    item: {
      hidden: {
        opacity: 0,
        y: 14,
        filter: 'blur(8px)',
      },
      visible: {
        opacity: 1,
        y: 0,
        filter: 'blur(0px)',
        transition: {
          duration: 0.28,
          ease: [0.25, 0.1, 0.25, 1],
        },
      },
    },
  };

  // Name chars animate in one by one, slightly after the surrounding words
  const nameVariants = {
    container: {
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: {
          staggerChildren: 0.04,
          delayChildren: 0.1,
        },
      },
    },
    item: {
      hidden: {
        opacity: 0,
        y: 10,
        filter: 'blur(6px)',
      },
      visible: {
        opacity: 1,
        y: 0,
        filter: 'blur(0px)',
        transition: {
          duration: 0.22,
          ease: [0.25, 0.1, 0.25, 1],
        },
      },
    },
  };

  return (
    <div key={screenKey}>
      {/* Headline */}
      <h2 className="text-[28px] font-bold leading-[1.12] tracking-[-0.3px] text-white mb-2">
        {full ? (
          // No name injection — animate the full string word by word
          <TextEffect
            per="word"
            as="span"
            variants={headlineVariants}
            className="inline"
          >
            {full}
          </TextEffect>
        ) : (
          // Name injection — before + name (char) + after
          <>
            {before && (
              <TextEffect
                per="word"
                as="span"
                variants={headlineVariants}
                className="inline"
              >
                {before}
              </TextEffect>
            )}
            {name && (
              <TextEffect
                per="char"
                as="span"
                variants={nameVariants}
                className="inline text-[#3D94F5]"
              >
                {name}
              </TextEffect>
            )}
            {after && (
              <TextEffect
                per="word"
                as="span"
                variants={headlineVariants}
                className="inline"
                delay={name ? (name.length * 0.04) + 0.1 : 0}
              >
                {after}
              </TextEffect>
            )}
          </>
        )}
      </h2>

      {/* Subtext — fades in after headline */}
      <motion.p
        className="text-[14px] font-normal leading-[1.55] text-white/45 mt-2"
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.32, delay: 0.45, ease: [0.25, 0.1, 0.25, 1] }}
      >
        {subtext}
      </motion.p>
    </div>
  );
}
```

---

## Step 3 — Typography Token Reference

Apply these exact values everywhere in the form. Do not use arbitrary Tailwind values outside this table.

| Element | Class / Value | Notes |
|---------|--------------|-------|
| **Screen headline** | `text-[28px] font-bold leading-[1.12] tracking-[-0.3px] text-white` | `ScreenHeadline` handles this — do not override |
| **Personalised name in headline** | `text-[#3D94F5]` | Applied inside `ScreenHeadline` — do not override |
| **Subtext** | `text-[14px] font-normal leading-[1.55] text-white/45` | `ScreenHeadline` handles this |
| **Step label** | `text-[10px] font-medium uppercase tracking-[0.12em] text-[#3D94F5] mb-3` | e.g. "STEP 1 OF 5" |
| **Field label** | `text-[10px] font-medium uppercase tracking-[0.10em] text-white/35 mb-2` | e.g. "FULL NAME" |
| **Field input** | `text-[16px] font-normal text-white placeholder:text-white/20` | 16px prevents iOS auto-zoom |
| **Card title** | `text-[13px] font-semibold text-white leading-[1.2]` | Inside interest cards |
| **Card description** | `text-[11px] font-normal text-white/38 leading-[1.45]` | Do NOT truncate — allow wrapping |
| **Card proof stat** | `text-[10px] font-medium uppercase tracking-[0.07em] text-[#3D94F5] leading-[1.4]` | Allow wrapping — remove any `truncate` or `line-clamp` |
| **Stats band number** | `text-[18px] font-semibold text-[#3D94F5] font-variant-numeric tabular-nums tracking-[-0.5px]` | |
| **Stats band label** | `text-[9px] font-normal uppercase tracking-[0.08em] text-white/35 mt-1` | |
| **CTA button text** | `text-[15px] font-semibold tracking-[0.01em] text-white` | |
| **Back button** | `text-[13px] font-normal text-white/45` | |
| **Success headline** | `text-[28px] font-bold leading-[1.12] tracking-[-0.3px] text-white text-center` | Same scale as form headline |
| **Next steps label** | `text-[10px] font-medium uppercase tracking-[0.10em] text-[#3D94F5] mb-3` | |
| **Next steps text** | `text-[12px] font-normal text-white/50 leading-[1.5]` | |

---

## Step 4 — Fix Card Description Truncation (Screen 4)

The interest cards on Screen 4 are currently truncating descriptions mid-sentence ("Live in 4..." and "no cash risk, n..."). This is caused by `line-clamp`, `truncate`, or a fixed card height.

**Find and remove:**
- Any `line-clamp-*` class on card description text
- Any `truncate` class on card description text  
- Any fixed `h-[...]` on the card container that forces truncation
- Any `overflow-hidden` on the card container if it is causing text cut-off

**Replace with:**
- Cards should be `flex flex-col` with no fixed height
- Description text: `text-[11px] font-normal text-white/38 leading-[1.45]` — let it wrap naturally
- Proof stat: allow full text, no truncation

---

## Step 5 — Replace Headlines in Each Screen

Replace the existing `<h2>` (or equivalent headline element) in each screen with `<ScreenHeadline>`.

### Screen 1 — Name
```tsx
<ScreenHeadline
  screenKey="screen-1"
  full="Welcome to the Craft Silicon booth."
  subtext="Counties leave revenue on the table every day — because systems don't talk to each other. We fix that. Let's start with your name."
/>
```

### Screen 2 — Organisation
```tsx
<ScreenHeadline
  screenKey="screen-2"
  before="Nice to meet you, "
  name={firstName} // the value from the name field, first word only
  after=". Where do you work?"
  subtext="Knowing your organisation tells us which platform is most relevant — and who on our team should reach out after the conference."
/>
```

### Screen 3 — Contact Details
```tsx
<ScreenHeadline
  screenKey="screen-3"
  before="Where should we send your brief, "
  name={firstName}
  after="?"
  subtext="One follow-up. Relevant to your county's situation. No noise."
/>
```

### Screen 4 — Interest Cards
```tsx
<ScreenHeadline
  screenKey="screen-4"
  before="Which area sparks your interest, "
  name={firstName}
  after="?"
  subtext="Select one. Your brief will be built around it."
/>
```

### Screen 5 — Success
```tsx
<ScreenHeadline
  screenKey="screen-5"
  before="You're connected, "
  name={firstName}
  after="."
  subtext={successSubtext} // dynamic based on card selection — see content spec
/>
```

---

## Step 6 — Ensure screenKey Changes on Every Transition

The `key` prop on the `ScreenHeadline` is what triggers a re-animation when moving between screens. If you are showing/hiding screens with `display` or `opacity` rather than mounting/unmounting, the animation will not retrigger.

**Required:** Each screen must be mounted/unmounted (not just hidden). If you are using conditional rendering (`{step === 1 && <Screen1 />}`), this is already correct and no changes are needed.

If screens are always mounted and toggled with CSS, refactor to conditional rendering before proceeding.

---

## Step 7 — Success Screen Animation

The success screen uses `ScreenHeadline` for the headline and subtext. Additionally, animate the checkmark circle in separately:

```tsx
<motion.div
  className="w-16 h-16 rounded-full bg-[#0A6AE2] flex items-center justify-center mb-6"
  initial={{ scale: 0.6, opacity: 0 }}
  animate={{ scale: 1, opacity: 1 }}
  transition={{ duration: 0.3, ease: [0.34, 1.56, 0.64, 1] }} // spring-like overshoot
>
  {/* checkmark SVG */}
</motion.div>
```

The next-steps card fades in after:

```tsx
<motion.div
  initial={{ opacity: 0, y: 12 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.3, delay: 0.6 }}
>
  {/* next steps content */}
</motion.div>
```

---

## What NOT to Touch

- Do not animate cards, fields, buttons, or the stats band
- Do not change padding, margin, or layout of any screen
- Do not add scroll animations or hover animations
- Do not modify the progress dots
- Do not animate the Back button or Step label

---

## Acceptance Criteria

- [ ] On every screen mount, the headline words blur+slide in sequentially (left to right)
- [ ] The personalised name appears in `#3D94F5` (brand blue) and animates char-by-char
- [ ] The subtext fades in ~0.45s after the headline starts
- [ ] No card description text is truncated on Screen 4
- [ ] All typography matches the token table in Step 3
- [ ] Animation works on both iOS Safari and Android Chrome
- [ ] `prefers-reduced-motion` is respected — wrap all motion in a check:

```tsx
import { useReducedMotion } from 'framer-motion';

// Inside ScreenHeadline:
const shouldReduceMotion = useReducedMotion();
// If true, skip animations — render text directly without TextEffect
```
