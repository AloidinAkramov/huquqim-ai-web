import { Logo } from "@/components/logo";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import {
  ArrowRight,
  CheckCircle2,
  FileSignature,
  FileText,
  Gavel,
  HeartHandshake,
  Link2,
  MessagesSquare,
  ScrollText,
  ShieldCheck,
  Sparkles,
  Star,
} from "lucide-react";
import Link from "next/link";

const features = [
  {
    icon: MessagesSquare,
    title: "Aqlli suhbat",
    desc: "Muammoingizni oddiy tilda ayting — tizim ish turini, organni va muddatlarni aniqlaydi.",
  },
  {
    icon: ScrollText,
    title: "Huquqiy tushuntirish",
    desc: "Huquqlaringiz va qonun moddalari oddiy tilda, manba havolasi bilan tushuntiriladi.",
  },
  {
    icon: FileText,
    title: "Hujjat generatori",
    desc: "Ariza, pretenziya, shikoyat — ma'lumotlaringiz bilan to'ldirib, tayyor holda oling.",
  },
  {
    icon: Gavel,
    title: "Sudga tayyorgarlik",
    desc: "Nima deyish, qanday dalil keltirish va o'zini qanday tutish — bosqichma-bosqich.",
  },
];

const steps = [
  { n: "1", title: "Muammoingizni yozing", desc: "Erkin tilda, xuddi do'stingizga aytgandek." },
  { n: "2", title: "Tushuntirish oling", desc: "Huquqlaringiz va keyingi qadamlar aniqlanadi." },
  { n: "3", title: "Hujjatni yuklab oling", desc: "Tayyor ariza yoki talabnomani oling va foydalaning." },
];

const plans = [
  {
    name: "Bepul",
    price: "0",
    period: "so'm",
    icon: HeartHandshake,
    features: ["Holatni aniqlash", "Asosiy tushuntirish", "1 ta faol ish"],
    cta: "Boshlash",
    highlight: false,
  },
  {
    name: "Bir martalik",
    price: "50 000",
    period: "so'm",
    icon: FileSignature,
    features: ["1 to'liq ish", "Tushuntirish + hujjat", "Yo'riqnoma"],
    cta: "Tanlash",
    highlight: true,
  },
  {
    name: "Obuna / oy",
    price: "99 000",
    period: "so'm",
    icon: Star,
    features: ["Cheksiz ishlar", "Barcha hujjatlar", "Saqlash + eslatmalar"],
    cta: "Obuna bo'lish",
    highlight: false,
  },
  {
    name: "Yuristga ulanish",
    price: "Komissiya",
    period: "",
    icon: Link2,
    features: ["Murakkab ishlar", "Hamkor yuristga yo'naltirish"],
    cta: "Batafsil",
    highlight: false,
  },
];

export default function Home() {
  return (
    <>
      <SiteHeader />

      {/* HERO */}
      <section className="relative overflow-hidden bg-grid">
        <div className="pointer-events-none absolute inset-0 bg-radial-brand" />
        <div className="relative mx-auto max-w-6xl px-4 pb-20 pt-16 sm:px-6 sm:pt-24">
          <div className="mx-auto max-w-3xl text-center">
            <Badge tone="brand" className="animate-fade-up">
              <Sparkles className="size-3.5" /> Sun&apos;iy intellekt yordamchisi
            </Badge>
            <h1
              className="animate-fade-up mt-5 text-balance text-4xl font-bold leading-[1.1] tracking-tight text-foreground sm:text-6xl"
              style={{ animationDelay: "60ms" }}
            >
              Advokatingiz yo&apos;qmi? <br className="hidden sm:block" />
              <span className="text-brand-600">Huquqim.AI</span> yordam beradi.
            </h1>
            <p
              className="animate-fade-up mx-auto mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-muted-foreground"
              style={{ animationDelay: "120ms" }}
            >
              Kichik sud ishlarida — iste&apos;molchi, mehnat, ma&apos;muriy nizolarda —
              holatingizni tushunamiz, hujjat tayyorlaymiz va sudga tayyorlaymiz. Oddiy tilda,
              o&apos;zbek tilida.
            </p>
            <div
              className="animate-fade-up mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row"
              style={{ animationDelay: "180ms" }}
            >
              <Link href="/register">
                <Button size="lg" className="w-full sm:w-auto">
                  Bepul boshlash <ArrowRight className="size-4" />
                </Button>
              </Link>
              <Link href="/login">
                <Button size="lg" variant="outline" className="w-full sm:w-auto">
                  Hisobga kirish
                </Button>
              </Link>
            </div>
            <div
              className="animate-fade-up mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-muted-foreground"
              style={{ animationDelay: "240ms" }}
            >
              <span className="inline-flex items-center gap-1.5">
                <ShieldCheck className="size-4 text-success" /> Ma&apos;lumotlar shifrlangan
              </span>
              <span className="inline-flex items-center gap-1.5">
                <CheckCircle2 className="size-4 text-success" /> Manba: Lex.uz qonunlari
              </span>
              <span className="inline-flex items-center gap-1.5">
                <CheckCircle2 className="size-4 text-success" /> Ro&apos;yxatdan o&apos;tish bepul
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* QANDAY ISHLAYDI */}
      <section id="qanday" className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
        <SectionHeading
          eyebrow="Qanday ishlaydi"
          title="Uch oddiy qadam"
          subtitle="Murakkab yuridik jarayonni soddalashtirdik."
        />
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {steps.map((s) => (
            <div key={s.n} className="relative">
              <div className="grid size-11 place-items-center rounded-xl bg-brand-600 text-lg font-bold text-white">
                {s.n}
              </div>
              <h3 className="mt-4 text-lg font-semibold">{s.title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* IMKONIYATLAR */}
      <section id="imkoniyatlar" className="bg-surface py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <SectionHeading
            eyebrow="Imkoniyatlar"
            title="Boshidan oxirigacha yoningizda"
            subtitle="Muammoni aniqlashdan to hujjat va sudga tayyorgarlikgacha."
          />
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((f) => (
              <Card key={f.title} className="p-6 transition-shadow hover:shadow-md">
                <div className="grid size-11 place-items-center rounded-xl bg-brand-50 text-brand-600">
                  <f.icon className="size-6" />
                </div>
                <h3 className="mt-4 font-semibold">{f.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{f.desc}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* NARXLAR */}
      <section id="narxlar" className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
        <SectionHeading
          eyebrow="Narxlar"
          title="Hammaga arzon"
          subtitle="Bepul darajadan boshlang, kerak bo'lganda to'lang."
        />
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {plans.map((p) => (
            <Card
              key={p.name}
              className={cn(
                "relative flex flex-col overflow-hidden p-0",
                p.highlight && "shadow-xl shadow-brand-900/15 ring-2 ring-brand-500"
              )}
            >
              {/* Header — to'q ko'k panel, ikonka + nom + narx */}
              <div
                className={cn(
                  "px-5 pb-5 pt-5",
                  p.highlight ? "bg-brand-700" : "bg-brand-800"
                )}
              >
                {p.highlight && (
                  <p className="mb-2 text-[11px] font-bold uppercase tracking-wider text-amber-400">
                    Eng ommabop
                  </p>
                )}
                <div className="flex items-center gap-3">
                  <div className="grid size-11 shrink-0 place-items-center rounded-xl bg-white/10 text-white">
                    <p.icon className="size-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold leading-tight text-white">{p.name}</h3>
                    <p className="mt-0.5 text-lg font-bold text-brand-300">
                      {p.price}
                      {p.period && (
                        <span className="ml-1 text-xs font-medium text-zinc-400">{p.period}</span>
                      )}
                    </p>
                  </div>
                </div>
              </div>

              {/* Body — xususiyatlar + tugma */}
              <div className="flex flex-1 flex-col bg-zinc-50 px-5 py-5">
                <ul className="flex-1 space-y-2.5">
                  {p.features.map((feat) => (
                    <li key={feat} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-brand-500" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
                <Link href="/register" className="mt-5 block">
                  <Button variant={p.highlight ? "primary" : "outline"} className="w-full" size="sm">
                    {p.cta}
                  </Button>
                </Link>
              </div>
            </Card>
          ))}
        </div>

        {/* Birlik iqtisodi izohi */}
        <p className="mx-auto mt-8 max-w-3xl text-center text-sm leading-relaxed text-muted-foreground">
          <span className="font-semibold text-foreground">Birlik iqtisodi:</span> AI + RAG xarajati
          past, marjinal foyda yuqori. Hamkor yurist komissiyasi &quot;advokat o&apos;rnini
          bosmaslik&quot; tamoyilini ham mustahkamlaydi.
        </p>
      </section>

      {/* CTA + DISKLAYMER */}
      <section className="mx-auto max-w-6xl px-4 pb-20 sm:px-6">
        <Card className="overflow-hidden border-0 bg-brand-700 p-10 text-center text-white sm:p-14">
          <Logo showText={false} className="mx-auto" />
          <h2 className="mt-5 text-balance text-3xl font-bold tracking-tight sm:text-4xl">
            O&apos;z huquqingizni bilib oling
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-brand-100">
            Bir necha daqiqada holatingizni tushunib, kerakli hujjatni tayyorlang.
          </p>
          <Link href="/register" className="mt-7 inline-block">
            <Button size="lg" className="bg-white text-brand-700 hover:bg-brand-50">
              Hoziroq boshlash <ArrowRight className="size-4" />
            </Button>
          </Link>
          <p className="mx-auto mt-8 max-w-2xl text-xs leading-relaxed text-brand-200">
            Bu xizmat advokat yoki yuristni almashtirmaydi. Faqat huquqiy ma&apos;lumot va yordam
            beruvchi vositadir. Murakkab holatlar uchun malakali yuristga murojaat qiling.
          </p>
        </Card>
      </section>

      <SiteFooter />
    </>
  );
}

function SectionHeading({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow: string;
  title: string;
  subtitle: string;
}) {
  return (
    <div className="mx-auto max-w-2xl text-center">
      <p className="text-sm font-semibold uppercase tracking-wide text-brand-600">{eyebrow}</p>
      <h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">{title}</h2>
      <p className="mt-3 text-muted-foreground">{subtitle}</p>
    </div>
  );
}
