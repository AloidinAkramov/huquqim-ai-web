import { cn } from "@/lib/utils";
import { HTMLAttributes } from "react";

type Tone = "brand" | "neutral" | "success" | "warning" | "danger";

const tones: Record<Tone, string> = {
  brand: "bg-brand-50 text-brand-700 ring-brand-200",
  neutral: "bg-zinc-100 text-zinc-700 ring-zinc-200",
  success: "bg-green-50 text-success ring-green-200",
  warning: "bg-amber-50 text-warning ring-amber-200",
  danger: "bg-red-50 text-danger ring-red-200",
};

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  tone?: Tone;
}

export function Badge({ className, tone = "neutral", ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium ring-1 ring-inset",
        tones[tone],
        className
      )}
      {...props}
    />
  );
}
