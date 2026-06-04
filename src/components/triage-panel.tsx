"use client";

import { Card } from "@/components/ui/card";
import { TriageResult } from "@/lib/types";
import { cn } from "@/lib/utils";
import { AlertTriangle, Scale, Send } from "lucide-react";

const TELEGRAM_USERNAME = "aloidin";

// Toifa nomiga rang
const toneByName: Record<string, string> = {
  Jinoiy: "bg-red-500",
  Fuqarolik: "bg-brand-500",
  "Ma'muriy": "bg-amber-500",
  Mamuriy: "bg-amber-500",
  Mehnat: "bg-violet-500",
  "Iste'molchi": "bg-teal-500",
  Istemolchi: "bg-teal-500",
};

export function TriagePanel({ triage, loading }: { triage: TriageResult | null; loading: boolean }) {
  if (loading) {
    return (
      <Card className="p-5">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Scale className="size-4 animate-pulse text-brand-400" />
          Ishingiz toifalarga ajratilmoqda...
        </div>
        <div className="mt-4 space-y-3">
          {[0, 1, 2].map((i) => (
            <div key={i} className="h-2.5 w-full animate-pulse rounded-full bg-zinc-100" />
          ))}
        </div>
      </Card>
    );
  }

  if (!triage || triage.categories.length === 0) return null;

  return (
    <Card className="animate-fade-up overflow-hidden p-0">
      <div className="px-5 pt-5">
        <div className="flex items-center gap-2">
          <Scale className="size-4 text-brand-600" />
          <h3 className="text-sm font-semibold">Ish toifasi tahlili</h3>
        </div>
        {triage.summary && (
          <p className="mt-1.5 text-sm text-muted-foreground">{triage.summary}</p>
        )}

        {/* Foiz barlar */}
        <div className="mt-4 space-y-3">
          {triage.categories.map((c) => (
            <div key={c.name}>
              <div className="mb-1 flex items-center justify-between text-sm">
                <span className="font-medium text-foreground">{c.name}</span>
                <span className="tabular-nums text-muted-foreground">{c.percent}%</span>
              </div>
              <div className="h-2.5 w-full overflow-hidden rounded-full bg-zinc-100">
                <div
                  className={cn("h-full rounded-full transition-all", toneByName[c.name] ?? "bg-zinc-400")}
                  style={{ width: `${Math.min(100, Math.max(2, c.percent))}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Advokat tavsiyasi — faqat jiddiy ishlarda */}
      {triage.recommendLawyer ? (
        <div className="mt-5 border-t border-red-200 bg-red-50 px-5 py-4">
          <div className="flex items-start gap-2.5">
            <AlertTriangle className="mt-0.5 size-5 shrink-0 text-red-600" />
            <div>
              <p className="text-sm font-semibold text-red-800">
                Bu jiddiy ish — advokat tavsiya qilinadi
              </p>
              <p className="mt-1 text-sm text-red-700">
                {triage.lawyerReason ??
                  "Bunday holatda malakali advokat yordami zarur. AI bu turdagi ishni to'liq hal qila olmaydi."}
              </p>
              <a
                href={`https://t.me/${TELEGRAM_USERNAME}`}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 inline-flex items-center gap-2 rounded-xl bg-[#229ED9] px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-[#1c8bc0]"
              >
                <Send className="size-4" />
                Advokatga yozish (Telegram)
              </a>
            </div>
          </div>
        </div>
      ) : (
        <div className="mt-5 px-5 pb-5" />
      )}
    </Card>
  );
}
