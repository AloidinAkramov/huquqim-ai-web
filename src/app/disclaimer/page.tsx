import { AlertTriangle, ArrowLeft, Scale, ShieldCheck, UserCheck } from "lucide-react";
import Link from "next/link";

export const metadata = {
  title: "Mas'uliyat cheklovi — Huquqim.AI",
  description: "Huquqim.AI xizmatining mas'uliyat cheklovi va foydalanish shartlari.",
};

export default function DisclaimerPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Rasmiy header */}
      <header className="border-b border-border bg-surface">
        <div className="mx-auto flex max-w-3xl items-center gap-3 px-4 py-4 sm:px-6">
          <div className="grid size-9 place-items-center rounded-lg bg-brand-600 text-white">
            <Scale className="size-5" />
          </div>
          <span className="font-bold tracking-tight">
            Huquqim<span className="text-brand-600">.AI</span>
          </span>
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
        <Link
          href="/dashboard"
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-all hover:-translate-x-0.5 hover:text-brand-600"
        >
          <ArrowLeft className="size-4" /> Orqaga
        </Link>

        {/* Sarlavha */}
        <div className="mt-6 flex items-start gap-4 rounded-xl border border-amber-200 bg-amber-50 p-5">
          <AlertTriangle className="mt-0.5 size-6 shrink-0 text-amber-500" />
          <div>
            <h1 className="text-xl font-bold tracking-tight text-amber-900">
              Mas&apos;uliyat cheklovi
            </h1>
            <p className="mt-1.5 text-sm leading-relaxed text-amber-800">
              Iltimos, xizmatdan foydalanishdan oldin ushbu muhim ma&apos;lumotni diqqat bilan
              o&apos;qing.
            </p>
          </div>
        </div>

        {/* Asosiy matn */}
        <div className="mt-8 space-y-7 text-[15px] leading-relaxed text-foreground">
          <section>
            <div className="flex items-center gap-2.5">
              <ShieldCheck className="size-5 text-brand-600" />
              <h2 className="text-lg font-semibold">Biz nima qilamiz</h2>
            </div>
            <p className="mt-2.5 text-muted-foreground">
              <span className="font-medium text-foreground">Huquqim.AI</span> — sun&apos;iy
              intellektga asoslangan huquqiy yordamchi. Biz sizning huquqiy holatingizni{" "}
              <span className="font-medium text-foreground">umumiy tarzda tushuntiramiz</span>,
              tegishli qonun moddalari haqida ma&apos;lumot beramiz va hujjat namunalarini
              tayyorlashda yordam beramiz. Bizning maqsadimiz — sizni o&apos;z huquqlaringiz haqida
              xabardor qilish.
            </p>
          </section>

          <section>
            <div className="flex items-center gap-2.5">
              <AlertTriangle className="size-5 text-amber-500" />
              <h2 className="text-lg font-semibold">Biz nima QILMAYMIZ</h2>
            </div>
            <ul className="mt-2.5 space-y-2 text-muted-foreground">
              <li className="flex gap-2.5">
                <span className="mt-2 size-1.5 shrink-0 rounded-full bg-amber-400" />
                Biz <span className="font-medium text-foreground">advokat yoki yurist
                emasmiz</span> va rasmiy huquqiy maslahat bermaymiz.
              </li>
              <li className="flex gap-2.5">
                <span className="mt-2 size-1.5 shrink-0 rounded-full bg-amber-400" />
                Bizning javoblarimiz <span className="font-medium text-foreground">sud qarorini
                yoki ishingiz natijasini kafolatlamaydi</span>.
              </li>
              <li className="flex gap-2.5">
                <span className="mt-2 size-1.5 shrink-0 rounded-full bg-amber-400" />
                Biz sizning o&apos;rningizga yakuniy qaror qabul qilmaymiz — faqat variantlarni
                ko&apos;rsatamiz.
              </li>
            </ul>
          </section>

          <section className="rounded-xl border border-brand-200 bg-brand-50/50 p-5">
            <div className="flex items-center gap-2.5">
              <UserCheck className="size-5 text-brand-600" />
              <h2 className="text-lg font-semibold text-brand-800">Bizning tavsiyamiz</h2>
            </div>
            <p className="mt-2.5 text-brand-900/80">
              Murakkab yoki jiddiy holatlarda (ayniqsa jinoiy ishlar, sud nizolari, katta moliyaviy
              masalalar) biz sizga{" "}
              <span className="font-semibold">malakali advokat yoki yurist bilan
              gaplashishni</span>{" "}
              qat&apos;iy tavsiya qilamiz. Faqat litsenziyalangan mutaxassis sizning ishingizni
              to&apos;liq baholay oladi va rasmiy huquqiy himoyani ta&apos;minlay oladi.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold">Ma&apos;lumotning aniqligi</h2>
            <p className="mt-2.5 text-muted-foreground">
              Biz O&apos;zbekiston qonunchiligiga asoslanishga harakat qilamiz, ammo qonunlar
              o&apos;zgarishi mumkin. Har qanday muhim qaror qabul qilishdan oldin ma&apos;lumotni
              rasmiy manbalardan (
              <a
                href="https://lex.uz"
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-brand-600 hover:underline"
              >
                lex.uz
              </a>
              ) yoki yuristdan tekshiring.
            </p>
          </section>
        </div>

        {/* Yakuniy */}
        <div className="mt-10 rounded-xl border border-border bg-surface p-5 text-center">
          <p className="text-sm text-muted-foreground">
            Xizmatdan foydalanish orqali siz ushbu shartlarni qabul qilgan hisoblanasiz.
          </p>
          <Link
            href="/dashboard"
            className="mt-4 inline-flex items-center gap-2 rounded-xl bg-brand-600 px-5 py-2.5 text-sm font-medium text-white transition-all hover:-translate-y-0.5 hover:bg-brand-700 hover:shadow-card-hover"
          >
            Tushundim, davom etish
          </Link>
        </div>
      </main>
    </div>
  );
}
