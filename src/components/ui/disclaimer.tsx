import { cn } from "@/lib/utils";
import { Info } from "lucide-react";
import Link from "next/link";

/**
 * Huquqiy disklaymer — bosilsa to'liq "Mas'uliyat cheklovi" sahifasiga o'tadi.
 */
export function Disclaimer({ className }: { className?: string }) {
  return (
    <Link
      href="/disclaimer"
      className={cn(
        "flex items-start gap-2.5 rounded-xl border border-amber-200 bg-amber-50/70 px-3.5 py-2.5 text-xs text-amber-900 transition-colors hover:border-amber-300 hover:bg-amber-100/70",
        className
      )}
    >
      <Info className="mt-0.5 size-3.5 shrink-0 text-amber-600" />
      <p>
        Bu ma&apos;lumot umumiy xususiyatga ega. Murakkab holatlar uchun malakali
        yuristga murojaat qiling. <span className="font-medium underline">Batafsil</span>
      </p>
    </Link>
  );
}
