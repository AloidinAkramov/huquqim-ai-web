"use client";

import { CaseStatusBadge, CaseTypeBadge } from "@/components/case-badges";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/input";
import { casesApi } from "@/lib/api";
import { Case } from "@/lib/types";
import { ArrowRight, FileText, Loader2, MessageSquarePlus, Plus, Scale } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function DashboardPage() {
  const router = useRouter();
  const [cases, setCases] = useState<Case[]>([]);
  const [loading, setLoading] = useState(true);
  const [showNew, setShowNew] = useState(false);
  const [desc, setDesc] = useState("");
  const [creating, setCreating] = useState(false);

  useEffect(() => {
    casesApi
      .list()
      .then((r) => setCases(r.items))
      .finally(() => setLoading(false));
  }, []);

  async function createCase() {
    if (desc.trim().length < 10 || creating) return;
    setCreating(true);
    try {
      const c = await casesApi.create(desc.trim());
      router.push(`/dashboard/cases/${c.id}`);
    } catch {
      setCreating(false);
    }
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Ishlarim</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Huquqiy nizolaringiz va ularning holati.
          </p>
        </div>
        <Button onClick={() => setShowNew((v) => !v)}>
          <Plus className="size-4" /> Yangi ish
        </Button>
      </div>

      {/* Yangi ish ochish */}
      {showNew && (
        <Card className="animate-fade-up mt-6 p-6">
          <div className="flex items-center gap-2 text-brand-700">
            <MessageSquarePlus className="size-5" />
            <h2 className="font-semibold">Muammoingizni ayting</h2>
          </div>
          <p className="mt-1 text-sm text-muted-foreground">
            Erkin tilda yozing — xuddi do&apos;stingizga aytgandek. Masalan: &quot;Do&apos;kondan
            buzuq telefon oldim, pulni qaytarmayapti&quot;.
          </p>
          <Textarea
            className="mt-4"
            rows={4}
            placeholder="Muammoingizni shu yerga yozing..."
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
          />
          <div className="mt-4 flex justify-end gap-2">
            <Button variant="ghost" onClick={() => setShowNew(false)}>
              Bekor qilish
            </Button>
            <Button onClick={createCase} loading={creating} disabled={desc.trim().length < 10}>
              Boshlash <ArrowRight className="size-4" />
            </Button>
          </div>
        </Card>
      )}

      {/* Ro'yxat */}
      <div className="mt-6">
        {loading ? (
          <div className="grid place-items-center py-16">
            <Loader2 className="size-6 animate-spin text-brand-400" />
          </div>
        ) : cases.length === 0 ? (
          <EmptyState onCreate={() => setShowNew(true)} />
        ) : (
          <div className="space-y-3">
            {cases.map((c) => (
              <Link key={c.id} href={`/dashboard/cases/${c.id}`}>
                <Card className="group p-5 transition-all hover:border-brand-200 hover:shadow-md">
                  <div className="flex items-start justify-between gap-4">
                    <div className="min-w-0">
                      <h3 className="truncate font-semibold text-foreground group-hover:text-brand-700">
                        {c.title}
                      </h3>
                      <div className="mt-2 flex flex-wrap items-center gap-2">
                        <CaseStatusBadge status={c.status} />
                        <CaseTypeBadge type={c.type} />
                        {c.documentCount > 0 && (
                          <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
                            <FileText className="size-3.5" /> {c.documentCount} hujjat
                          </span>
                        )}
                      </div>
                    </div>
                    <ArrowRight className="size-5 shrink-0 text-muted transition-transform group-hover:translate-x-0.5 group-hover:text-brand-600" />
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function EmptyState({ onCreate }: { onCreate: () => void }) {
  return (
    <Card className="grid place-items-center px-6 py-16 text-center">
      <div className="grid size-14 place-items-center rounded-2xl bg-brand-50 text-brand-600">
        <Scale className="size-7" />
      </div>
      <h3 className="mt-4 text-lg font-semibold">Hali ishingiz yo&apos;q</h3>
      <p className="mt-1.5 max-w-sm text-sm text-muted-foreground">
        Birinchi ishingizni oching — muammoingizni yozing va biz yordam beramiz.
      </p>
      <Button className="mt-5" onClick={onCreate}>
        <Plus className="size-4" /> Yangi ish ochish
      </Button>
    </Card>
  );
}
