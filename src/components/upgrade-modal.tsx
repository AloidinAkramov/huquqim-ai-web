"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { authApi } from "@/lib/api";
import { cn } from "@/lib/utils";
import { Check, FileSignature, Sparkles, Star, X } from "lucide-react";
import { useState } from "react";

interface UpgradeModalProps {
  open: boolean;
  onClose: () => void;
  onUpgraded: () => void;
  /** Paywall sababini ko'rsatuvchi matn (ixtiyoriy). */
  reason?: string;
}

const plans = [
  {
    tier: 1,
    name: "Bir martalik",
    price: "99 000",
    period: "so'm",
    icon: FileSignature,
    highlight: true,
    features: ["1 to'liq ish", "Cheksiz AI suhbat", "Hujjat tayyorlash", "Sudga tayyorgarlik"],
  },
  {
    tier: 2,
    name: "Obuna / oy",
    price: "199 000",
    period: "so'm",
    icon: Star,
    highlight: false,
    features: ["Cheksiz ishlar", "Barcha hujjatlar", "Saqlash + eslatmalar", "Ustuvor yordam"],
  },
];

export function UpgradeModal({ open, onClose, onUpgraded, reason }: UpgradeModalProps) {
  const [loading, setLoading] = useState<number | null>(null);

  if (!open) return null;

  async function buy(tier: number) {
    setLoading(tier);
    try {
      await authApi.upgrade(tier);
      onUpgraded();
    } finally {
      setLoading(null);
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 grid place-items-center bg-zinc-900/50 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <Card
        className="animate-fade-up relative w-full max-w-2xl overflow-hidden p-0"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute right-4 top-4 z-10 grid size-8 place-items-center rounded-lg text-white/70 transition-colors hover:bg-white/10 hover:text-white"
        >
          <X className="size-5" />
        </button>

        {/* Header */}
        <div className="bg-brand-900 px-6 py-7 text-center text-white">
          <div className="mx-auto grid size-12 place-items-center rounded-2xl bg-white/10">
            <Sparkles className="size-6 text-amber-400" />
          </div>
          <h2 className="mt-4 text-2xl font-bold tracking-tight">Premiumga o&apos;ting</h2>
          <p className="mx-auto mt-2 max-w-md text-sm text-brand-200">
            {reason ??
              "To'liq, jiddiy huquqiy javoblar, hujjat tayyorlash va sudga tayyorgarlik uchun premium tarifni tanlang."}
          </p>
        </div>

        {/* Plans */}
        <div className="grid gap-4 p-6 sm:grid-cols-2">
          {plans.map((p) => (
            <div
              key={p.tier}
              className={cn(
                "flex flex-col rounded-2xl border p-5",
                p.highlight ? "border-brand-300 bg-brand-50/50 ring-1 ring-brand-200" : "border-border"
              )}
            >
              <div className="flex items-center gap-2.5">
                <div className="grid size-9 place-items-center rounded-lg bg-brand-100 text-brand-600">
                  <p.icon className="size-5" />
                </div>
                <div>
                  <h3 className="font-semibold leading-tight">{p.name}</h3>
                  {p.highlight && (
                    <span className="text-[11px] font-bold uppercase tracking-wide text-amber-600">
                      Eng ommabop
                    </span>
                  )}
                </div>
              </div>

              <div className="mt-4 flex items-baseline gap-1">
                <span className="text-2xl font-bold tracking-tight">{p.price}</span>
                <span className="text-xs text-muted-foreground">{p.period}</span>
              </div>

              <ul className="mt-4 flex-1 space-y-2">
                {p.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <Check className="mt-0.5 size-4 shrink-0 text-brand-500" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>

              <Button
                className="mt-5 w-full"
                variant={p.highlight ? "primary" : "outline"}
                loading={loading === p.tier}
                disabled={loading !== null}
                onClick={() => buy(p.tier)}
              >
                Sotib olish
              </Button>
            </div>
          ))}
        </div>

        <p className="border-t border-border px-6 py-3 text-center text-[11px] text-muted">
          Demo rejim: to&apos;lov hozircha test uchun. Tez kunda Click va Payme ulanadi.
        </p>
      </Card>
    </div>
  );
}
