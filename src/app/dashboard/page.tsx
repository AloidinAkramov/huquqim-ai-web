"use client";

import { CaseStatusBadge, CaseTypeBadge } from "@/components/case-badges";
import { FloatingAIButton } from "@/components/floating-ai-button";
import { Reveal } from "@/components/reveal";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CaseListSkeleton } from "@/components/ui/skeleton";
import { casesApi } from "@/lib/api";
import { Case } from "@/lib/types";
import { ArrowRight, FileText, Plus, Scale } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function DashboardPage() {
  const [cases, setCases] = useState<Case[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    casesApi
      .list()
      .then((r) => setCases(r.items))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6">
      <div className="flex items-end justify-between border-b border-border pb-6">
        <div>
          <h1 className="text-[1.7rem] font-bold tracking-tight text-foreground">Ishlarim</h1>
          <p className="mt-1.5 text-sm text-muted-foreground">
            Huquqiy nizolaringiz va ularning holati.
          </p>
        </div>
        <Link href="/dashboard/new">
          <Button className="group/btn">
            <Plus className="size-4 transition-transform duration-300 group-hover/btn:rotate-90" />
            Yangi ish
          </Button>
        </Link>
      </div>


      {/* Ro'yxat */}
      <div className="mt-6">
        {loading ? (
          <CaseListSkeleton />
        ) : cases.length === 0 ? (
          <EmptyState />
        ) : (
          <div className="space-y-3">
            {cases.map((c, i) => (
              <Reveal key={c.id} delay={Math.min(i * 55, 400)}>
                <Link href={`/dashboard/cases/${c.id}`}>
                  <Card className="group flex items-center gap-4 p-5 transition-all duration-200 hover:-translate-y-0.5 hover:border-brand-300 hover:shadow-card-hover">
                    <div className="grid size-11 shrink-0 place-items-center rounded-xl bg-brand-50 text-brand-600 transition-colors group-hover:bg-brand-600 group-hover:text-white">
                      <Scale className="size-5" />
                    </div>
                    <div className="min-w-0 flex-1">
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
                    <ArrowRight className="size-5 shrink-0 text-muted transition-transform group-hover:translate-x-1 group-hover:text-brand-600" />
                  </Card>
                </Link>
              </Reveal>
            ))}
          </div>
        )}
      </div>

      <FloatingAIButton />
    </div>
  );
}

function EmptyState() {
  return (
    <Card className="grid place-items-center px-6 py-16 text-center">
      <div className="grid size-14 place-items-center rounded-2xl bg-brand-50 text-brand-600">
        <Scale className="size-7" />
      </div>
      <h3 className="mt-4 text-lg font-semibold">Hali ishingiz yo&apos;q</h3>
      <p className="mt-1.5 max-w-sm text-sm text-muted-foreground">
        Birinchi ishingizni oching — muammoingizni yozing va biz yordam beramiz.
      </p>
      <Link href="/dashboard/new" className="mt-5">
        <Button>
          <Plus className="size-4" /> Yangi ish ochish
        </Button>
      </Link>
    </Card>
  );
}
