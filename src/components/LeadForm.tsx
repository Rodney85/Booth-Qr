import { FormEvent, useState } from "react";
import { useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import { navigateTo } from "../lib/utils";
import { motion, useReducedMotion } from "framer-motion";
import { Settings } from "lucide-react";

export default function LeadForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    organisation: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const submitLead = useMutation(api.leads.submit);
  const shouldReduceMotion = useReducedMotion();

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim() || !/^\S+@\S+\.\S+$/.test(formData.email))
      newErrors.email = "Valid email is required";
    if (!formData.phone.trim() || formData.phone.replace(/\D/g, "").length < 6)
      newErrors.phone = "Valid phone number is required";
    if (!formData.organisation.trim())
      newErrors.organisation = "Organisation is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleBlur = () => {
    validate();
  };

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    try {
      await submitLead({ ...formData });
      navigateTo("/success");
    } catch (err) {
      console.error(err);
      setErrors({ submit: "Failed to submit. Please try again." });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex min-h-[100dvh] flex-col items-center justify-center bg-[var(--color-cs-navy-deep)] px-6 py-12">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: shouldReduceMotion ? 0 : 0.3, ease: "easeOut" }}
        className="w-full max-w-[420px]"
      >
        <div className="mb-8 text-center text-[var(--text-dark-3)]">
          <p className="text-[12px] font-normal uppercase tracking-[0.12em]">
            Craft Silicon
          </p>
          <div className="mx-auto mt-2 h-[1px] w-8 bg-[var(--color-cs-blue)] opacity-50" />
          <p className="mt-3 text-[11px] leading-[1.47] tracking-[-0.08px]">
            OSR Growth Conference 2026 · Tamarind Tree Hotel
          </p>
        </div>

        <h1 className="text-center text-[28px] font-semibold leading-[1.10] tracking-[-0.28px] text-white">
          Let's Connect
        </h1>
        <p className="mb-[32px] mt-2 text-center text-[13px] leading-[1.38] tracking-[-0.16px] text-[var(--text-dark-2)]">
          Drop your details and our team will be in touch.
        </p>

        <form onSubmit={onSubmit} className="flex flex-col gap-[24px]">
          {/* Name Field */}
          <div className="flex flex-col">
            <label
              htmlFor="name"
              className="mb-[8px] text-[11px] font-medium uppercase leading-[1] tracking-[0.08em] text-[rgba(255,255,255,0.40)]"
            >
              Full Name
            </label>
            <input
              id="name"
              type="text"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              onBlur={handleBlur}
              className={`w-full border-b bg-transparent py-[10px] text-[15px] tracking-[-0.20px] text-white outline-none transition-colors duration-180 ease-out focus:border-[var(--color-cs-blue)] ${errors.name ? "border-[var(--color-cs-error)]" : "border-[var(--color-cs-navy-border)]"}`}
            />
            {errors.name && (
              <p className="mt-[6px] text-[12px] leading-[1.40] text-[var(--color-cs-error)]">
                {errors.name}
              </p>
            )}
          </div>

          {/* Email Field */}
          <div className="flex flex-col">
            <label
              htmlFor="email"
              className="mb-[8px] text-[11px] font-medium uppercase leading-[1] tracking-[0.08em] text-[rgba(255,255,255,0.40)]"
            >
              Email Address
            </label>
            <input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              onBlur={handleBlur}
              className={`w-full border-b bg-transparent py-[10px] text-[15px] tracking-[-0.20px] text-white outline-none transition-colors duration-180 ease-out focus:border-[var(--color-cs-blue)] ${errors.email ? "border-[var(--color-cs-error)]" : "border-[var(--color-cs-navy-border)]"}`}
            />
            {errors.email && (
              <p className="mt-[6px] text-[12px] leading-[1.40] text-[var(--color-cs-error)]">
                {errors.email}
              </p>
            )}
          </div>

          {/* Phone Field */}
          <div className="flex flex-col">
            <label
              htmlFor="phone"
              className="mb-[8px] text-[11px] font-medium uppercase leading-[1] tracking-[0.08em] text-[rgba(255,255,255,0.40)]"
            >
              Phone Number
            </label>
            <input
              id="phone"
              type="tel"
              value={formData.phone}
              onChange={(e) =>
                setFormData({ ...formData, phone: e.target.value })
              }
              onBlur={handleBlur}
              className={`w-full border-b bg-transparent py-[10px] text-[15px] tracking-[-0.20px] text-white outline-none transition-colors duration-180 ease-out focus:border-[var(--color-cs-blue)] ${errors.phone ? "border-[var(--color-cs-error)]" : "border-[var(--color-cs-navy-border)]"}`}
            />
            {errors.phone && (
              <p className="mt-[6px] text-[12px] leading-[1.40] text-[var(--color-cs-error)]">
                {errors.phone}
              </p>
            )}
          </div>

          {/* Organisation Field */}
          <div className="flex flex-col">
            <label
              htmlFor="organisation"
              className="mb-[8px] text-[11px] font-medium uppercase leading-[1] tracking-[0.08em] text-[rgba(255,255,255,0.40)]"
            >
              Organisation
            </label>
            <input
              id="organisation"
              type="text"
              placeholder="County, Ministry, or Company"
              value={formData.organisation}
              onChange={(e) =>
                setFormData({ ...formData, organisation: e.target.value })
              }
              onBlur={handleBlur}
              className={`w-full border-b bg-transparent py-[10px] text-[15px] tracking-[-0.20px] text-white outline-none transition-colors duration-180 ease-out placeholder:text-[var(--text-dark-3)] focus:border-[var(--color-cs-blue)] ${errors.organisation ? "border-[var(--color-cs-error)]" : "border-[var(--color-cs-navy-border)]"}`}
            />
            {errors.organisation && (
              <p className="mt-[6px] text-[12px] leading-[1.40] text-[var(--color-cs-error)]">
                {errors.organisation}
              </p>
            )}
          </div>

          {errors.submit && (
            <p className="text-center text-[13px] text-[var(--color-cs-error)]">
              {errors.submit}
            </p>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            aria-disabled={isSubmitting}
            className="mt-[8px] w-full rounded-[8px] bg-[var(--color-cs-blue)] px-[24px] py-[14px] text-[15px] font-medium tracking-[0.02em] text-white transition hover:bg-[var(--color-cs-blue-hover)] active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-40"
          >
            {isSubmitting ? "Submitting…" : "Connect with Craft Silicon →"}
          </button>
        </form>

        <p className="mt-[20px] text-center text-[11px] leading-[1.47] tracking-[-0.08px] text-[var(--text-dark-3)]">
          Your details are kept private and used only for follow-up.
        </p>

        <div className="mt-[48px] flex justify-center">
          <button
            onClick={() => navigateTo("/admin")}
            className="flex h-11 w-11 items-center justify-center text-[rgba(255,255,255,0.08)] transition hover:text-[rgba(255,255,255,0.2)]"
            aria-label="Admin Access"
          >
            <Settings size={20} />
          </button>
        </div>
      </motion.div>
    </div>
  );
}
