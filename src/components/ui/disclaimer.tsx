import { cn } from "@/lib/utils";
import { Info } from "lucide-react";

/**
 * Huquqiy disklaymer — TZ talabiga ko'ra har javobda/sahifada ko'rsatiladi.
 */
export function Disclaimer({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "flex items-start gap-2.5 rounded-xl border border-amber-200 bg-amber-50/70 px-3.5 py-2.5 text-xs text-amber-900",
        className
      )}
    >
      <Info className="mt-0.5 size-3.5 shrink-0 text-amber-600" />
      <p>
        Bu ma&apos;lumot umumiy xususiyatga ega. Murakkab holatlar uchun malakali
        yuristga murojaat qiling.
      </p>
    </div>
  );
}
