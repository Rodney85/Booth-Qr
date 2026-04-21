import React from "react";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { PrecisionButton } from "@/components/ui/PrecisionButton";
import type { FlowState } from "@/types/flow";

interface SuccessScreenProps {
  flow: FlowState;
}

export const SuccessScreen: React.FC<SuccessScreenProps> = ({ flow }) => {
  const screen = flow.currentScreen;
  const productListScreen = flow.screens.find(s => s.id === "product_list");
  
  const selectedOptions = productListScreen?.content.options?.filter(o => 
    flow.selectedProductIds.includes(o.id)
  ) || [];

  const isSkipped = selectedOptions.length === 0;
  const isMulti = selectedOptions.length > 1;

  // Resolve dynamic subtext
  let displaySubtext = screen.content.subtext || "";
  if (isSkipped) {
    displaySubtext = (screen.content as any).skip_subtext || displaySubtext;
  } else if (isMulti) {
    displaySubtext = (screen.content as any).multi_subtext || displaySubtext;
  } else {
    displaySubtext = selectedOptions[0].feedback?.subtext || displaySubtext;
  }

  // Resolve tags
  const tags = isSkipped 
    ? [(screen.content as any).tag_fallback || "Craft Silicon"]
    : selectedOptions.map(o => o.feedback?.tag || o.label);

  return (
    <div className="flex flex-1 flex-col items-center px-8 pt-12 text-center pb-32">
      <motion.div 
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", damping: 12, stiffness: 200 }}
        className="flex h-16 w-16 items-center justify-center rounded-full bg-[#3D94F5] shadow-[0_0_30px_rgba(61,148,245,0.4)]"
      >
        <Check size={32} className="text-white" strokeWidth={3} />
      </motion.div>

      <div className="mt-8 flex flex-wrap justify-center gap-2">
        {tags.map((tag, i) => (
          <motion.div
            key={tag}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 + i * 0.1 }}
            className="rounded-full bg-white/5 border border-white/10 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-[#3D94F5]"
          >
            {tag}
          </motion.div>
        ))}
      </div>

      <h1 
        className="mt-4 text-[32px] font-bold leading-[1.1] tracking-[-0.04em] text-white"
        dangerouslySetInnerHTML={{ __html: flow.interpolate(screen.content.headline) }}
      />
      
      <p className="mt-4 text-[14px] leading-[1.6] text-white/50 max-w-[280px]">
        {flow.interpolate(displaySubtext)}
      </p>

      {/* Next Steps Box */}
      <div className="mt-10 w-full rounded-2xl border border-white/[0.05] bg-white/[0.02] p-6 text-left">
        <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#3D94F5]/60 mb-6">Next Steps</div>
        <div className="flex flex-col gap-6">
          {screen.content.next_steps?.map((step, i) => (
            <div key={i} className="flex gap-4 items-start">
              <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#3D94F5]/10 text-[10px] font-bold text-[#3D94F5] border border-[#3D94F5]/20 mt-0.5">
                {i + 1}
              </div>
              <div className="text-[13px] leading-[1.4] text-white/60">{step}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Sticky Footer */}
      <div className="fixed bottom-0 left-0 right-0 z-20 px-6 pb-10 pt-4 bg-[#071426]/90 backdrop-blur-md border-t border-white/5">
        <PrecisionButton 
          className="w-full" 
          onClick={() => {
            // Placeholder for download action
            alert("Downloading product brochures...");
            // In a real app, this could be: window.open('/path-to-brochure.pdf', '_blank');
          }}
        >
          {screen.content.cta}
        </PrecisionButton>
      </div>
    </div>
  );
};
