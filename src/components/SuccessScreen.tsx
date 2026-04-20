import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { navigateTo } from "../lib/utils";

export default function SuccessScreen() {
  return (
    <div className="flex min-h-[100dvh] items-center justify-center bg-[var(--color-cs-navy-deep)] px-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.26, ease: "easeOut" }}
        className="flex w-full max-w-[420px] flex-col items-center justify-center text-center"
      >
        <div className="flex h-[52px] w-[52px] items-center justify-center rounded-full border-[1.5px] border-[var(--color-cs-blue)] text-[var(--color-cs-blue)]">
          <Check size={24} strokeWidth={2.5} />
        </div>

        <h1 className="mt-[28px] text-[28px] font-semibold leading-[1.10] tracking-[-0.28px] text-white">
          You're connected.
        </h1>

        <p className="mt-2 text-[14px] leading-[1.60] text-[rgba(255,255,255,0.45)]">
          A member of the Craft Silicon team will be in touch shortly.
        </p>

        <button
          onClick={() => navigateTo("/")}
          className="mt-8 rounded-[8px] border border-[rgba(255,255,255,0.15)] bg-transparent px-[24px] py-[11px] text-[14px] font-normal text-[rgba(255,255,255,0.50)] transition hover:border-[rgba(255,255,255,0.30)] active:scale-95"
        >
          Submit another response
        </button>
      </motion.div>
    </div>
  );
}
