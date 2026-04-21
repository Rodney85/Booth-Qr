import { motion, useReducedMotion, BezierDefinition } from 'framer-motion';
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
  const shouldReduceMotion = useReducedMotion();

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
          ease: [0.25, 0.1, 0.25, 1] as BezierDefinition,
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
          ease: [0.25, 0.1, 0.25, 1] as BezierDefinition,
        },
      },
    },
  };

  if (shouldReduceMotion) {
    return (
      <div key={screenKey}>
        <h2 className="mb-2 text-[28px] font-bold leading-[1.12] tracking-[-0.3px] text-white">
          {full || (
            <>
              {before}
              <span className="text-[#3D94F5]">{name}</span>
              {after}
            </>
          )}
        </h2>
        <p className="mt-2 text-[14px] font-normal leading-[1.55] text-white/45">
          {subtext}
        </p>
      </div>
    );
  }

  return (
    <div key={screenKey}>
      {/* Headline */}
      <h2 className="mb-2 text-[28px] font-bold leading-[1.12] tracking-[-0.3px] text-white">
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
        className="mt-2 text-[14px] font-normal leading-[1.55] text-white/45"
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.32, delay: 0.45, ease: [0.25, 0.1, 0.25, 1] as BezierDefinition }}
      >
        {subtext}
      </motion.p>
    </div>
  );
}
