"use client";

import { UpgradeModal } from "@/components/upgrade-modal";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { documentsApi, isPaymentRequired } from "@/lib/api";
import { caseTypeLabels, CaseType, Template } from "@/lib/types";
import { Download, FileText, Loader2, Search } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

const groupOrder: CaseType[] = [
  CaseType.Consumer,
  CaseType.Labor,
  CaseType.Administrative,
  CaseType.Rent,
  CaseType.Civil,
  CaseType.RequiresLawyer,
];

export default function DocumentsPage() {
  const [templates, setTemplates] = useState<Template[]>([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState<Template | null>(null);
  const [values, setValues] = useState<Record<string, string>>({});
  const [downloading, setDownloading] = useState(false);
  const [paywall, setPaywall] = useState(false);

  useEffect(() => {
    documentsApi
      .templates()
      .then(setTemplates)
      .finally(() => setLoading(false));
  }, []);

  function openTemplate(t: Template) {
    setActive(t);
    setValues(Object.fromEntries(t.fields.map((f) => [f.key, ""])));
  }

  async function download() {
    if (!active) return;
    setDownloading(true);
    try {
      await documentsApi.fillAndDownload(active, values);
      setActive(null);
    } catch (err) {
      if (isPaymentRequired(err)) {
        setActive(null);
        setPaywall(true);
      }
    } finally {
      setDownloading(false);
    }
  }

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return templates;
    return templates.filter(
      (t) => t.name.toLowerCase().includes(q) || (t.description ?? "").toLowerCase().includes(q)
    );
  }, [templates, query]);

  const grouped = useMemo(() => {
    const map = new Map<CaseType, Template[]>();
    for (const t of filtered) {
      const arr = map.get(t.caseType) ?? [];
      arr.push(t);
      map.set(t.caseType, arr);
    }
    return groupOrder.filter((c) => map.has(c)).map((c) => ({ type: c, items: map.get(c)! }));
  }, [filtered]);

  const requiredFilled =
    active?.fields.filter((f) => f.required).every((f) => values[f.key]?.trim()) ?? false;

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Hujjat shablonlari</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            {templates.length} ta tayyor namuna. Shablonni tanlang, to&apos;ldiring va Word
            formatda yuklab oling.
          </p>
        </div>
        <div className="relative w-full sm:w-72">
          <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted" />
          <Input
            className="pl-9"
            placeholder="Shablon qidirish..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
      </div>

      {loading ? (
        <div className="grid place-items-center py-16">
          <Loader2 className="size-6 animate-spin text-brand-400" />
        </div>
      ) : grouped.length === 0 ? (
        <p className="mt-12 text-center text-sm text-muted-foreground">
          &quot;{query}&quot; bo&apos;yicha shablon topilmadi.
        </p>
      ) : (
        <div className="mt-8 space-y-8">
          {grouped.map((g) => (
            <section key={g.type}>
              <div className="mb-3 flex items-center gap-2">
                <h2 className="text-sm font-semibold uppercase tracking-wide text-brand-600">
                  {caseTypeLabels[g.type]}
                </h2>
                <Badge tone="neutral">{g.items.length}</Badge>
              </div>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {g.items.map((t) => (
                  <button
                    key={t.id}
                    onClick={() => openTemplate(t)}
                    className="group text-left"
                  >
                    <Card className="flex h-full gap-3 p-4 transition-all hover:border-brand-300 hover:shadow-md">
                      <div className="grid size-10 shrink-0 place-items-center rounded-lg bg-brand-50 text-brand-600">
                        <FileText className="size-5" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <h3 className="text-sm font-semibold leading-snug group-hover:text-brand-700">
                          {t.name}
                        </h3>
                        {t.description && (
                          <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-muted-foreground">
                            {t.description}
                          </p>
                        )}
                        <span className="mt-2 inline-flex items-center gap-1 text-xs font-medium text-brand-600 opacity-0 transition-opacity group-hover:opacity-100">
                          <Download className="size-3.5" /> To&apos;ldirish va yuklash
                        </span>
                      </div>
                    </Card>
                  </button>
                ))}
              </div>
            </section>
          ))}
        </div>
      )}

      {/* To'ldirish modali */}
      {active && (
        <div
          className="fixed inset-0 z-50 grid place-items-center bg-zinc-900/40 p-4 backdrop-blur-sm"
          onClick={() => setActive(null)}
        >
          <Card
            className="animate-fade-up flex max-h-[88vh] w-full max-w-lg flex-col p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-lg font-semibold">{active.name}</h2>
            {active.description && (
              <p className="mt-1 text-sm text-muted-foreground">{active.description}</p>
            )}
            <div className="mt-4 flex-1 space-y-4 overflow-y-auto pr-1">
              {active.fields.map((f) => (
                <Input
                  key={f.key}
                  label={f.label + (f.required ? " *" : "")}
                  placeholder={f.placeholder}
                  value={values[f.key] ?? ""}
                  onChange={(e) => setValues((v) => ({ ...v, [f.key]: e.target.value }))}
                />
              ))}
            </div>
            <div className="mt-5 flex justify-end gap-2">
              <Button variant="ghost" onClick={() => setActive(null)}>
                Bekor qilish
              </Button>
              <Button onClick={download} loading={downloading} disabled={!requiredFilled}>
                <Download className="size-4" /> Word yuklab olish
              </Button>
            </div>
          </Card>
        </div>
      )}

      <UpgradeModal
        open={paywall}
        onClose={() => setPaywall(false)}
        reason="Hujjat yuklab olish premium tarif uchun. To'liq xizmatdan foydalanish uchun tarifni tanlang."
        onUpgraded={() => setPaywall(false)}
      />
    </div>
  );
}
