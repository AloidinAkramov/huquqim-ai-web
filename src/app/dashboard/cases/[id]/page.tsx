"use client";

import { CaseStatusBadge, CaseTypeBadge } from "@/components/case-badges";
import { Markdown } from "@/components/markdown";
import { TriagePanel } from "@/components/triage-panel";
import { UpgradeModal } from "@/components/upgrade-modal";
import { Button } from "@/components/ui/button";
import { casesApi, chatApi, isPaymentRequired } from "@/lib/api";
import { Case, Message, MessageRole, TriageResult } from "@/lib/types";
import { cn } from "@/lib/utils";
import { ArrowLeft, BookOpen, FileText, Scale, Send, Sparkles } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";

export default function CaseChatPage() {
  const params = useParams();
  const caseId = Number(params.id);

  const [theCase, setTheCase] = useState<Case | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [sending, setSending] = useState(false);
  const [loading, setLoading] = useState(true);
  const [paywall, setPaywall] = useState(false);
  const [limitHit, setLimitHit] = useState(false);
  const [triage, setTriage] = useState<TriageResult | null>(null);
  const [triageLoading, setTriageLoading] = useState(false);

  const scrollRef = useRef<HTMLDivElement>(null);
  const taRef = useRef<HTMLTextAreaElement>(null);
  const autoSent = useRef(false);
  const triageRan = useRef(false);

  useEffect(() => {
    // 1) Case + suhbatni yuklash (asosiy, tez)
    Promise.all([casesApi.get(caseId), chatApi.getConversation(caseId)])
      .then(([c, conv]) => {
        setTheCase(c);
        setMessages(conv.messages);

        // Yangi ish: suhbat bo'sh, muammo tavsifi bor — avtomatik birinchi xabar.
        if (conv.messages.length === 0 && c.description && !autoSent.current) {
          autoSent.current = true;
          void sendMessage(c.description);
        }

        // 2) Triage — MUSTAQIL ravishda (chatni kutmasdan).
        if (!triageRan.current) {
          triageRan.current = true;
          runTriage(!!c.description);
        }
      })
      .finally(() => setLoading(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [caseId]);

  async function runTriage(hasDescription: boolean) {
    try {
      // Avval saqlangani bormi
      const saved = await casesApi.getTriage(caseId);
      if (saved) {
        setTriage(saved);
        return;
      }
    } catch {
      /* saqlangan yo'q — pastda yangisini qilamiz */
    }

    if (!hasDescription) return;

    setTriageLoading(true);
    try {
      const t = await casesApi.triage(caseId);
      setTriage(t);
    } catch {
      /* triage xatosi — jim qoldiramiz, chat baribir ishlaydi */
    } finally {
      setTriageLoading(false);
    }
  }

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, sending]);

  async function sendMessage(text: string) {
    const trimmed = text.trim();
    if (!trimmed || sending) return;

    const userMsg: Message = {
      id: Date.now(),
      role: MessageRole.User,
      content: trimmed,
      sources: [],
      createdAt: new Date().toISOString(),
    };
    setMessages((m) => [...m, userMsg]);
    setSending(true);

    try {
      const res = await chatApi.sendMessage(caseId, trimmed);
      setMessages((m) => [...m, res.reply]);
    } catch (err) {
      if (isPaymentRequired(err)) {
        // Limitga yetildi — yuborilgan xabarni qaytarib, paywall ochamiz.
        setMessages((m) => m.filter((x) => x.id !== userMsg.id));
        setInput(trimmed);
        setLimitHit(true);
        setPaywall(true);
      } else {
        setMessages((m) => [
          ...m,
          {
            id: Date.now() + 1,
            role: MessageRole.Assistant,
            content: "Kechirasiz, javob olishda xatolik yuz berdi. Birozdan keyin urinib ko'ring.",
            sources: [],
            createdAt: new Date().toISOString(),
          },
        ]);
      }
    } finally {
      setSending(false);
      taRef.current?.focus();
    }
  }

  function send() {
    const text = input.trim();
    if (!text || sending) return;
    setInput("");
    void sendMessage(text);
  }

  function onKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      send();
    }
  }

  return (
    <div className="flex h-[calc(100vh-0px)] flex-col md:h-screen">
      {/* Header */}
      <div className="border-b border-border bg-surface/80 px-4 py-3 backdrop-blur sm:px-6">
        <div className="mx-auto flex max-w-3xl items-center gap-3">
          <Link href="/dashboard" className="text-muted hover:text-foreground">
            <ArrowLeft className="size-5" />
          </Link>
          <div className="min-w-0 flex-1">
            <h1 className="truncate text-sm font-semibold sm:text-base">
              {loading ? "Yuklanmoqda..." : theCase?.title}
            </h1>
            {theCase && (
              <div className="mt-1 flex items-center gap-2">
                <CaseStatusBadge status={theCase.status} />
                <CaseTypeBadge type={theCase.type} />
              </div>
            )}
          </div>
          <Link href={`/dashboard/cases/${caseId}/documents`}>
            <Button variant="outline" size="sm">
              <FileText className="size-4" />
              <span className="hidden sm:inline">Hujjatlar</span>
            </Button>
          </Link>
        </div>
      </div>

      {/* Xabarlar */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
        <div className="mx-auto max-w-3xl space-y-5">
          {(triage || triageLoading) && <TriagePanel triage={triage} loading={triageLoading} />}
          {messages.map((m) => (
            <MessageBubble key={m.id} message={m} />
          ))}
          {sending && <TypingBubble />}
          {limitHit && <LimitBanner onUpgrade={() => setPaywall(true)} />}
        </div>
      </div>

      {/* Input */}
      <div className="border-t border-border bg-surface px-4 py-3 sm:px-6">
        <div className="mx-auto max-w-3xl">
          {limitHit ? (
            <Button className="w-full" onClick={() => setPaywall(true)}>
              <Sparkles className="size-4" /> Premiumga o&apos;tib davom etish
            </Button>
          ) : (
            <div className="flex items-end gap-2 rounded-2xl border border-border bg-background p-2 focus-within:border-brand-400 focus-within:ring-4 focus-within:ring-brand-100">
              <textarea
                ref={taRef}
                rows={1}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={onKeyDown}
                placeholder="Savolingizni yozing..."
                className="max-h-32 flex-1 resize-none bg-transparent px-2 py-1.5 text-sm outline-none placeholder:text-muted"
              />
              <Button size="sm" onClick={send} disabled={!input.trim() || sending} className="size-9 p-0">
                <Send className="size-4" />
              </Button>
            </div>
          )}
          <p className="mt-2 text-center text-[11px] text-muted">
            Bu umumiy ma&apos;lumot. Murakkab holatda malakali yuristga murojaat qiling.
          </p>
        </div>
      </div>

      <UpgradeModal
        open={paywall}
        onClose={() => setPaywall(false)}
        reason="Bepul tarifda dastlabki tushuntirish berildi. To'liq, jiddiy javoblar va hujjatlar uchun premium tarifni tanlang."
        onUpgraded={() => {
          setPaywall(false);
          setLimitHit(false);
          if (input.trim()) void sendMessage(input);
        }}
      />
    </div>
  );
}

function LimitBanner({ onUpgrade }: { onUpgrade: () => void }) {
  return (
    <div className="animate-fade-up rounded-2xl border border-brand-200 bg-brand-50/70 p-5 text-center">
      <div className="mx-auto grid size-11 place-items-center rounded-xl bg-brand-600 text-white">
        <Sparkles className="size-5" />
      </div>
      <h3 className="mt-3 font-semibold text-foreground">Bepul tushuntirish yakunlandi</h3>
      <p className="mx-auto mt-1.5 max-w-md text-sm text-muted-foreground">
        Jiddiy, to&apos;liq huquqiy yordam, hujjat tayyorlash va sudga tayyorgarlik uchun premium
        tarifni tanlang.
      </p>
      <Button className="mt-4" size="sm" onClick={onUpgrade}>
        Tariflarni ko&apos;rish
      </Button>
    </div>
  );
}

function MessageBubble({ message }: { message: Message }) {
  const isUser = message.role === MessageRole.User;

  if (isUser) {
    return (
      <div className="animate-msg flex justify-end">
        <div className="max-w-[85%] rounded-2xl rounded-br-md bg-brand-600 px-4 py-2.5 text-[15px] text-white">
          {message.content}
        </div>
      </div>
    );
  }

  return (
    <div className="animate-msg flex gap-3">
      <div className="grid size-8 shrink-0 place-items-center rounded-lg bg-brand-50 text-brand-600">
        <Scale className="size-4.5" />
      </div>
      <div className="min-w-0 flex-1">
        <div className="rounded-2xl rounded-tl-md border border-border bg-surface px-4 py-3 text-foreground shadow-sm">
          <Markdown content={message.content} />
        </div>
        {message.sources.length > 0 && (
          <div className="mt-2 flex flex-wrap items-center gap-1.5">
            <BookOpen className="size-3.5 text-muted" />
            {message.sources.map((s) => (
              <span
                key={s}
                className="rounded-md bg-zinc-100 px-2 py-0.5 text-[11px] font-medium text-zinc-600"
              >
                {s}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function TypingBubble() {
  return (
    <div className="flex gap-3">
      <div className="grid size-8 shrink-0 place-items-center rounded-lg bg-brand-50 text-brand-600">
        <Scale className="size-4.5" />
      </div>
      <div className="flex items-center gap-1.5 rounded-2xl rounded-tl-md border border-border bg-surface px-4 py-4 shadow-sm">
        <span className={cn("typing-dot size-2 rounded-full bg-brand-400")} />
        <span className={cn("typing-dot size-2 rounded-full bg-brand-400")} />
        <span className={cn("typing-dot size-2 rounded-full bg-brand-400")} />
      </div>
    </div>
  );
}
