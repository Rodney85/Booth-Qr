// Interactive Concierge Lead Form
import { AnimatePresence, motion } from "framer-motion";
import { useConversationalFlow } from "@/lib/useConversationalFlow";
import { SplashScreen } from "./SplashScreen";
import { ProductExplorer } from "@/components/ProductExplorer";
import { IdentificationScreen } from "./screens/IdentificationScreen";
import { ContactScreen } from "./screens/ContactScreen";
import { SuccessScreen } from "./screens/SuccessScreen";
import { ContextBand } from "./ContextBand";
import { useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";

export default function LeadForm() {
  const flow = useConversationalFlow();
  const submitLead = useMutation(api.leads.submit);

  const handleFinish = async () => {
    try {
      const currentData = flow.formData;
      const gridScreen = flow.screens.find((s) => s.id === "product_list");
      const interests = flow.selectedProductIds.length > 0
        ? flow.selectedProductIds
            .map(id => gridScreen?.content.options?.find((o) => o.id === id)?.label || id)
            .join(", ")
        : "Not Sure";

      await submitLead({
        name: currentData.name || "",
        email: currentData.email || "",
        phone: currentData.phone || "",
        organisation: currentData.organisation || "",
        productInterest: interests,
      });
      flow.goToStep("success");
    } catch (err) {
      console.error("Submission failed", err);
    }
  };

  const renderStep = () => {
    const screen = flow.currentScreen;
    if (!screen) return null;
    
    switch (screen.id) {
      case "splash":
        return <SplashScreen headline={screen.content.headline || ""} subtext={screen.content.subtext || ""} />;
      case "name":
      case "organisation":
        return <IdentificationScreen flow={flow} />;
      case "contact":
        return <ContactScreen flow={flow} />;
      case "product_list":
      case "product_detail":
        return <ProductExplorer flow={flow} onFinish={handleFinish} />;
      case "success":
        return <SuccessScreen flow={flow} />;
      default:
        return null;
    }
  };

  const showProgress = !["splash", "success"].includes(flow.currentScreen?.id || "");

  return (
    <div className="relative flex min-h-[100dvh] w-full flex-col bg-[#071426] font-inter overflow-x-hidden">
      {/* Progress Dots - Sticky at top */}
      {showProgress && (
        <div className="flex gap-1.5 justify-center py-6 px-6 shrink-0 z-10 bg-[#071426]">
          {flow.screens
            .filter(s => !["splash", "success"].includes(s.id))
            .map((s) => {
              const activeIndex = flow.screens.findIndex(scr => scr.id === flow.currentScreen.id);
              const screenIndex = flow.screens.findIndex(scr => scr.id === s.id);
              const isDone = activeIndex > screenIndex;
              const isDotActive = activeIndex === screenIndex;
              
              return (
                <div 
                  key={s.id}
                  className={`h-[3px] rounded-full transition-all duration-300 ${
                    isDotActive || isDone ? "flex-1 max-w-[40px] bg-[var(--color-cs-blue)]" : "flex-1 max-w-[20px] bg-white/15"
                  }`}
                />
              );
            })}
        </div>
      )}

      {/* Context Band */}
      {flow.currentScreen.id === "name" && flow.currentScreen.content.context_stats && (
        <ContextBand stats={flow.currentScreen.content.context_stats} />
      )}

      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={flow.currentScreen.id}
          initial={{ opacity: 0, x: flow.direction * 30 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: flow.direction * -30 }}
          transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
          className="flex flex-1 flex-col pb-10"
        >
          {renderStep()}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}



