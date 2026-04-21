import React from "react";
import { ChevronLeft } from "lucide-react";
import { PrecisionInput } from "@/components/ui/PrecisionInput";
import { PrecisionButton } from "@/components/ui/PrecisionButton";
import type { FlowState } from "@/types/flow";

interface IdentificationScreenProps {
  flow: FlowState;
}

export const IdentificationScreen: React.FC<IdentificationScreenProps> = ({ flow }) => {
  const screen = flow.currentScreen;
  const id = screen.id;

  return (
    <div className="flex flex-1 flex-col px-6 pt-10">
      <div className="flex flex-col gap-1">
        {!flow.isFirstStep && (
          <button 
            onClick={() => flow.goBack()}
            className="mb-4 flex w-fit items-center gap-1.5 rounded-full bg-white/5 px-2.5 py-1 text-[10px] font-medium tracking-[0.05em] text-white/50 transition hover:bg-white/10 hover:text-white"
          >
            <ChevronLeft size={10} /> BACK
          </button>
        )}
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
        <PrecisionInput
          label={screen.content.label || ""}
          placeholder={screen.content.placeholder}
          value={(flow.formData[id] as string) || ""}
          onChange={(e) => flow.updateFormData({ [id]: e.target.value })}
          autoFocus={id === "name"}
          onKeyDown={(e) => {
            if (e.key === "Enter" && flow.formData[id]) {
              flow.goToNext();
            }
          }}
        />

        {/* Proof Points for Organisation Step */}
        {id === "organisation" && screen.content.proof_points && (
          <div className="flex flex-col gap-3">
            {screen.content.proof_points.map((pt) => (
              <div key={pt.title} className="rounded-xl border border-white/[0.04] bg-white/[0.02] p-3">
                <div className="text-[11px] font-bold text-white/80">{pt.title}</div>
                <div className="text-[10px] text-white/40">{pt.text}</div>
              </div>
            ))}
          </div>
        )}

      </div>

      <div className="mt-auto pb-10">
        <PrecisionButton 
          disabled={!flow.formData[id]}
          onClick={() => flow.goToNext()}
          className="w-full"
        >
          {screen.content.cta}
        </PrecisionButton>
      </div>
    </div>
  );
};
