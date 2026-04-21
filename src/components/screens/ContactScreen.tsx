import React from "react";
import { ChevronLeft } from "lucide-react";
import { PrecisionInput } from "@/components/ui/PrecisionInput";
import { PrecisionButton } from "@/components/ui/PrecisionButton";
import { ScreenHeadline } from "@/components/ui/screen-headline";
import { ContextGuide } from "@/components/ui/ContextGuide";
import type { FlowState } from "@/types/flow";

interface ContactScreenProps {
  flow: FlowState;
}

export const ContactScreen: React.FC<ContactScreenProps> = ({ flow }) => {
  const screen = flow.currentScreen;
  const firstName = flow.formData.name ? (flow.formData.name as string).split(" ")[0] : "";

  // Check if all required fields in this step are filled
  const isFilled = screen.content.fields?.every(f => !!flow.formData[f.id]) || false;

  return (
    <div className="flex flex-1 flex-col px-6 pt-10">
      <div className="flex flex-col gap-1">
        <button 
          onClick={() => flow.goBack()}
          className="mb-4 flex w-fit items-center gap-1.5 rounded-full bg-white/5 px-2.5 py-1 text-[13px] font-normal text-white/45 transition hover:bg-white/10 hover:text-white"
        >
          <ChevronLeft size={10} /> BACK
        </button>
        <div className="mb-3 text-[11px] font-semibold uppercase tracking-[0.12em] text-[#3D94F5]">
          {screen.content.step_label}
        </div>
        <ScreenHeadline
          screenKey={`screen-${screen.id}`}
          full={flow.interpolate(screen.content.question || screen.content.headline)}
          name={firstName}
          subtext={screen.content.subtext || ""}
        />
      </div>

      <div className="mt-14 flex flex-col gap-10">
        {/* Guide moved above inputs */}
        {screen.content.proof_card && (
          <ContextGuide 
            title={screen.content.proof_card.title}
            text={screen.content.proof_card.text}
          />
        )}

        <div className="flex flex-col gap-8">
          {screen.content.fields?.map((f) => (
            <div key={f.id} className="flex flex-col gap-3">
              <div className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[#3D94F5]">
                {f.label}
              </div>
              <PrecisionInput
                type={f.type}
                placeholder={f.placeholder}
                value={(flow.formData[f.id] as string) || ""}
                onChange={(e) => flow.updateFormData({ [f.id]: e.target.value })}
                className="text-[18px] font-normal text-white placeholder:text-white/20"
                onKeyDown={(e) => {
                  if (e.key === "Enter" && isFilled) {
                    flow.goToNext();
                  }
                }}
              />
            </div>
          ))}
        </div>
      </div>

      <div className="mt-auto pb-10">
        <PrecisionButton 
          disabled={!isFilled}
          onClick={() => flow.goToNext()}
          className="w-full"
        >
          {screen.content.cta}
        </PrecisionButton>
      </div>
    </div>
  );
};
