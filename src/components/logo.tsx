import { cn } from "@/lib/utils";
import { Scale } from "lucide-react";

export function Logo({ className, showText = true }: { className?: string; showText?: boolean }) {
  return (
    <span className={cn("inline-flex items-center gap-2", className)}>
      <span className="grid size-8 place-items-center rounded-lg bg-brand-600 text-white shadow-sm shadow-brand-600/30">
        <Scale className="size-5" strokeWidth={2.2} />
      </span>
      {showText && (
        <span className="text-lg font-bold tracking-tight text-foreground">
          Huquqim<span className="text-brand-600">.AI</span>
        </span>
      )}
    </span>
  );
}
