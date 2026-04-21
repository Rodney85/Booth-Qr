import React from "react";
import { ChevronLeft, FileText } from "lucide-react";
import { PrecisionInput } from "@/components/ui/PrecisionInput";
import { PrecisionButton } from "@/components/ui/PrecisionButton";
import { ScreenHeadline } from "@/components/ui/screen-headline";
import type { FlowState } from "@/types/flow";

interface ContactScreenProps {
  flow: FlowState;
}

export const ContactScreen: React.FC<ContactScreenProps> = ({ flow }) => {
  const screen = flow.currentScreen;
  const firstName = flow.formData.name ? (flow.formData.name as string).split(" ")[0] : "";

  return (
    <div className="flex flex-1 flex-col px-6 pt-10">
      <div className="flex flex-col gap-1">
        <button 
          onClick={() => flow.goBack()}
          className="mb-4 flex w-fit items-center gap-1.5 rounded-full bg-white/5 px-2.5 py-1 text-[13px] font-normal text-white/45 transition hover:bg-white/10 hover:text-white"
        >
          <ChevronLeft size={10} /> BACK
        </button>
        <div className="mb-3 text-[10px] font-medium uppercase tracking-[0.12em] text-[#3D94F5]">
          {screen.content.step_label}
        </div>
        <ScreenHeadline
          screenKey="screen-contact"
          before="Where should we send your brief, "
          name={firstName}
          after="?"
          subtext="One follow-up. Relevant to your county's situation. No noise."
        />
      </div>

      <div className="mt-10 flex flex-col gap-8">
        <div className="flex flex-col gap-6">
          {screen.content.fields?.map((f) => (
            <div key={f.id} className="flex flex-col gap-2">
              <div className="text-[10px] font-medium uppercase tracking-[0.10em] text-white/35">
                {f.label}
              </div>
              <PrecisionInput
                type={f.type}
                placeholder={f.placeholder}
                value={(flow.formData[f.id] as string) || ""}
                onChange={(e) => flow.updateFormData({ [f.id]: e.target.value })}
                className="text-[16px] font-normal text-white placeholder:text-white/20"
              />
            </div>
          ))}
        </div>

        {/* Proof Row */}
        <div className="flex items-center gap-3 rounded-xl border border-[#3D94F5]/10 bg-[#3D94F5]/5 p-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#3D94F5]/20 text-[#3D94F5]">
            <FileText size={16} />
          </div>
          <div className="flex flex-col">
            <div className="text-[13px] font-bold leading-[1.2] text-white">
              {screen.content.proof_card?.title || "Personalised to your county"}
            </div>
            <div className="text-[11px] font-normal leading-[1.45] text-white/38">
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
