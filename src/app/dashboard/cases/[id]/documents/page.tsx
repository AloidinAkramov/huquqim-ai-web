"use client";

import { UpgradeModal } from "@/components/upgrade-modal";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { documentsApi, isPaymentRequired } from "@/lib/api";
import { Document, Template } from "@/lib/types";
import { ArrowLeft, Check, Copy, Download, FileText, Loader2, Plus } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function CaseDocumentsPage() {
  const params = useParams();
  const caseId = Number(params.id);

  const [docs, setDocs] = useState<Document[]>([]);
  const [templates, setTemplates] = useState<Template[]>([]);
  const [loading, setLoading] = useState(true);
  const [active, setActive] = useState<Template | null>(null);
  const [values, setValues] = useState<Record<string, string>>({});
  const [generating, setGenerating] = useState(false);
  const [preview, setPreview] = useState<Document | null>(null);
  const [copied, setCopied] = useState(false);
  const [downloading, setDownloading] = useState(false);

  async function download(doc: Document) {
    setDownloading(true);
    try {
      await documentsApi.downloadDocx(doc);
    } finally {
      setDownloading(false);
    }
  }
  const [paywall, setPaywall] = useState(false);

  useEffect(() => {
    Promise.all([documentsApi.byCase(caseId), documentsApi.templates()])
      .then(([d, t]) => {
        setDocs(d);
        setTemplates(t);
      })
      .finally(() => setLoading(false));
  }, [caseId]);

  function openTemplate(t: Template) {
    setActive(t);
    setValues(Object.fromEntries(t.fields.map((f) => [f.key, ""])));
    setPreview(null);
  }

  async function generate() {
    if (!active) return;
    setGenerating(true);
    try {
      const doc = await documentsApi.generate(caseId, active.id, values);
      setDocs((d) => [doc, ...d]);
      setActive(null);
      setPreview(doc);
    } catch (err) {
      if (isPaymentRequired(err)) {
        setActive(null);
        setPaywall(true);
      }
    } finally {
      setGenerating(false);
    }
  }

  function copy(text: string) {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

  const requiredFilled =
    active?.fields.filter((f) => f.required).every((f) => values[f.key]?.trim()) ?? false;

  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6">
      <Link
        href={`/dashboard/cases/${caseId}`}
        className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="size-4" /> Suhbatga qaytish
      </Link>

      <h1 className="mt-4 text-2xl font-bold tracking-tight">Hujjatlar</h1>
      <p className="mt-1 text-sm text-muted-foreground">
        Ishingiz uchun hujjat tayyorlang yoki tayyorlarini ko&apos;ring.
      </p>

      {loading ? (
        <div className="grid place-items-center py-16">
          <Loader2 className="size-6 animate-spin text-brand-400" />
        </div>
      ) : (
        <>
          {/* Tayyor hujjatlar */}
          {docs.length > 0 && (
            <div className="mt-6 space-y-3">
              <h2 className="text-sm font-semibold text-muted-foreground">Tayyor hujjatlar</h2>
              {docs.map((d) => (
                <Card key={d.id} className="flex items-center justify-between p-4">
                  <div className="flex min-w-0 items-center gap-3">
                    <div className="grid size-10 shrink-0 place-items-center rounded-lg bg-brand-50 text-brand-600">
                      <FileText className="size-5" />
                    </div>
                    <div className="min-w-0">
                      <p className="truncate text-sm font-medium">{d.title}</p>
                      <p className="text-xs text-muted">
                        {new Date(d.createdAt).toLocaleDateString("uz")}
                      </p>
                    </div>
                  </div>
                  <div className="flex shrink-0 gap-2">
                    <Button variant="ghost" size="sm" onClick={() => setPreview(d)}>
                      Ko&apos;rish
                    </Button>
                    <Button size="sm" onClick={() => download(d)} loading={downloading}>
                      <Download className="size-4" /> Word
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          )}

          {/* Shablonlar */}
          <div className="mt-8 space-y-3">
            <h2 className="text-sm font-semibold text-muted-foreground">Yangi hujjat yaratish</h2>
            {templates.map((t) => (
              <Card key={t.id} className="flex items-center justify-between gap-4 p-4">
                <div className="min-w-0">
                  <p className="font-medium">{t.name}</p>
                  {t.description && (
                    <p className="mt-0.5 text-sm text-muted-foreground">{t.description}</p>
                  )}
                </div>
                <Button size="sm" onClick={() => openTemplate(t)}>
                  <Plus className="size-4" /> Tayyorlash
                </Button>
              </Card>
            ))}
          </div>
        </>
      )}

      {/* To'ldirish modali */}
      {active && (
        <Modal onClose={() => setActive(null)} title={active.name}>
          <div className="space-y-4">
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
          <div className="mt-6 flex justify-end gap-2">
            <Button variant="ghost" onClick={() => setActive(null)}>
              Bekor qilish
            </Button>
            <Button onClick={generate} loading={generating} disabled={!requiredFilled}>
              Hujjatni yaratish
            </Button>
          </div>
        </Modal>
      )}

      {/* Ko'rish modali */}
      {preview && (
        <Modal onClose={() => setPreview(null)} title={preview.title}>
          <pre className="max-h-[60vh] overflow-y-auto whitespace-pre-wrap rounded-xl border border-border bg-navy-50 p-4 font-sans text-sm leading-relaxed text-foreground">
            {preview.content}
          </pre>
          <div className="mt-4 flex justify-end gap-2">
            <Button variant="outline" onClick={() => copy(preview.content)}>
              {copied ? <Check className="size-4" /> : <Copy className="size-4" />}
              {copied ? "Nusxa olindi" : "Nusxa olish"}
            </Button>
            <Button onClick={() => download(preview)} loading={downloading}>
              <Download className="size-4" /> Word yuklab olish
            </Button>
          </div>
        </Modal>
      )}

      <UpgradeModal
        open={paywall}
        onClose={() => setPaywall(false)}
        reason="Hujjat tayyorlash premium tarif uchun. To'liq xizmatdan foydalanish uchun tarifni tanlang."
        onUpgraded={() => setPaywall(false)}
      />
    </div>
  );
}

function Modal({
  children,
  title,
  onClose,
}: {
  children: React.ReactNode;
  title: string;
  onClose: () => void;
}) {
  return (
    <div
      className="fixed inset-0 z-50 grid place-items-center bg-navy-900/40 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <Card
        className="animate-fade-up w-full max-w-lg p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-lg font-semibold">{title}</h2>
        <div className="mt-4">{children}</div>
      </Card>
    </div>
  );
}
