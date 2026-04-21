import React from "react";
import { ChevronLeft, FileText } from "lucide-react";
import { PrecisionInput } from "@/components/ui/PrecisionInput";
import { PrecisionButton } from "@/components/ui/PrecisionButton";
import type { FlowState } from "@/types/flow";

interface ContactScreenProps {
  flow: FlowState;
}

export const ContactScreen: React.FC<ContactScreenProps> = ({ flow }) => {
  const screen = flow.currentScreen;

  return (
    <div className="flex flex-1 flex-col px-6 pt-10">
      <div className="flex flex-col gap-1">
        <button 
          onClick={() => flow.goBack()}
          className="mb-4 flex w-fit items-center gap-1.5 rounded-full bg-white/5 px-2.5 py-1 text-[10px] font-medium tracking-[0.05em] text-white/50 transition hover:bg-white/10 hover:text-white"
        >
          <ChevronLeft size={10} /> BACK
        </button>
        <div className="text-[10px] font-medium uppercase tracking-[0.12em] text-[#3D94F5]">
          {screen.content.step_label}
        </div>
        <h2 
          className="mt-1 text-[26px] font-bold leading-[1.15] tracking-[-0.03em] text-white"
          dangerouslySetInnerHTML={{ __html: flow.interpolate(screen.content.question) }}
        />
        <p className="mt-3 text-[13px] leading-[1.5] text-white/50">
          {flow.interpolate(screen.content.subtext)}
        </p>
      </div>

      <div className="mt-10 flex flex-col gap-8">
        <div className="flex flex-col gap-6">
          {screen.content.fields?.map((f) => (
            <PrecisionInput
              key={f.id}
              label={f.label || ""}
              type={f.type}
              placeholder={f.placeholder}
              value={(flow.formData[f.id] as string) || ""}
              onChange={(e) => flow.updateFormData({ [f.id]: e.target.value })}
            />
          ))}
        </div>

        {/* Proof Row */}
        <div className="flex items-center gap-3 rounded-xl border border-[#3D94F5]/10 bg-[#3D94F5]/5 p-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#3D94F5]/20 text-[#3D94F5]">
            <FileText size={16} />
          </div>
          <div className="flex flex-col">
            <div className="text-[11px] font-semibold text-white/90">
              {screen.content.proof_card?.title || "Personalised to your county"}
            </div>
            <div className="text-[10px] text-white/40">
              {screen.content.proof_card?.text || "Includes deployment examples and product modules"}
            </div>
          </div>
        </div>

      <div className="mt-auto pb-10">
        <PrecisionButton 
          disabled={!flow.formData.email || !flow.formData.phone}
          onClick={() => flow.goToNext()}
          className="w-full"
        >
          {screen.content.cta}
        </PrecisionButton>
      </div>
      </div>
    </div>
  );
};
