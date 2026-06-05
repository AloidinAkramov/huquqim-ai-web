import { cn } from "@/lib/utils";
import { HTMLAttributes } from "react";

type Tone = "brand" | "neutral" | "success" | "warning" | "danger";

const tones: Record<Tone, string> = {
  brand: "bg-brand-50 text-brand-700 ring-brand-200",
  neutral: "bg-navy-50 text-navy-700 ring-navy-100",
  success: "bg-green-50 text-success ring-green-200",
  warning: "bg-amber-50 text-warning ring-amber-200",
  danger: "bg-red-50 text-danger ring-red-200",
};

const dotColors: Record<Tone, string> = {
  brand: "bg-brand-500",
  neutral: "bg-navy-400",
  success: "bg-success",
  warning: "bg-warning",
  danger: "bg-danger",
};

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  tone?: Tone;
  dot?: boolean;
}

export function Badge({ className, tone = "neutral", dot = false, children, ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ring-1 ring-inset",
        tones[tone],
        className
      )}
      {...props}
    >
      {dot && <span className={cn("size-1.5 rounded-full", dotColors[tone])} />}
      {children}
    </span>
  );
}
