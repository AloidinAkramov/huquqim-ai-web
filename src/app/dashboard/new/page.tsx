"use client";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/input";
import { casesApi } from "@/lib/api";
import { ArrowLeft, ArrowRight, Scale, Sparkles } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";

const examples = [
  "Do'kondan buzuq telefon oldim, pulni qaytarmayapti.",
  "Ishdan asossiz bo'shatishdi, oxirgi oylik berilmadi.",
  "Notanish raqamdan tahdidli SMS kelyapti.",
  "Kommunal tashkilot noto'g'ri qarzdorlik yozib qo'ydi.",
];

export default function NewCasePage() {
  const router = useRouter();
  const [desc, setDesc] = useState("");
  const [creating, setCreating] = useState(false);
  const taRef = useRef<HTMLTextAreaElement>(null);

  async function start() {
    if (desc.trim().length < 10 || creating) return;
    setCreating(true);
    try {
      const c = await casesApi.create(desc.trim());
      router.push(`/dashboard/cases/${c.id}`);
    } catch {
      setCreating(false);
    }
  }

  function pickExample(text: string) {
    setDesc(text);
    taRef.current?.focus();
  }

  return (
    <div className="flex min-h-[calc(100vh-1px)] flex-col px-4 py-8 sm:px-6">
      {/* Orqaga — eng chap chetda */}
      <Link
        href="/dashboard"
        className="inline-flex w-fit items-center gap-1.5 text-sm text-muted-foreground transition-all hover:-translate-x-0.5 hover:text-brand-600"
      >
        <ArrowLeft className="size-4" /> Ishlarim
      </Link>

      <div className="mx-auto flex w-full max-w-2xl flex-1 flex-col justify-center py-8">
        {/* Sarlavha */}
        <div className="text-center">
          <div className="mx-auto grid size-16 place-items-center rounded-2xl bg-brand-600 text-white shadow-lg shadow-brand-600/20">
            <Scale className="size-8" />
          </div>
          <h1 className="mt-5 text-2xl font-bold tracking-tight">Yangi ish ochish</h1>
          <p className="mx-auto mt-2 max-w-md text-sm text-muted-foreground">
            Muammoingizni erkin tilda yozing — xuddi do&apos;stingizga aytgandek. Tizim sizga
            yordam beradi.
          </p>
        </div>

        {/* Kiritish */}
        <div className="animate-fade-up mt-7">
          <Textarea
            ref={taRef}
            autoFocus
            rows={5}
            className="text-base"
            placeholder="Masalan: Do'kondan buzuq telefon oldim, pulni qaytarmayapti..."
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) start();
            }}
          />

          {/* Misollar */}
          <div className="mt-4 flex flex-wrap gap-2">
            {examples.map((ex) => (
              <button
                key={ex}
                onClick={() => pickExample(ex)}
                className="rounded-full border border-border bg-surface px-3 py-1.5 text-xs text-muted-foreground transition-all hover:-translate-y-0.5 hover:border-brand-300 hover:text-brand-700 hover:shadow-sm"
              >
                {ex}
              </button>
            ))}
          </div>

          <Button
            className="mt-6 w-full"
            size="lg"
            onClick={start}
            loading={creating}
            disabled={desc.trim().length < 10}
          >
            <Sparkles className="size-4" /> Boshlash <ArrowRight className="size-4" />
          </Button>
          <Link
            href="/disclaimer"
            className="mt-3 block text-center text-xs text-muted transition-colors hover:text-amber-700 hover:underline"
          >
            Bu ma&apos;lumot umumiy xususiyatga ega. Murakkab holatlar uchun yuristga murojaat
            qiling.
          </Link>
        </div>
      </div>
    </div>
  );
}
