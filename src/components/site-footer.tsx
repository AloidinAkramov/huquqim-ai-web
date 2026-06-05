import Link from "next/link";
import { Logo } from "./logo";

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-surface">
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
          <Logo />
          <Link
            href="/disclaimer"
            className="group max-w-md text-xs leading-relaxed text-muted-foreground transition-colors hover:text-foreground"
          >
            Huquqim.AI advokat yoki yuristni almashtirmaydi. U faqat huquqiy ma&apos;lumot va
            yordam beruvchi vositadir. Murakkab holatlar uchun malakali yuristga murojaat qiling.{" "}
            <span className="font-medium text-brand-600 group-hover:underline">Batafsil →</span>
          </Link>
        </div>
        <div className="mt-8 flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-border pt-6 text-xs text-muted">
          <span>© {new Date().getFullYear()} Huquqim.AI · O&apos;zbekiston fuqarolari uchun</span>
          <Link href="/disclaimer" className="hover:text-brand-600 hover:underline">
            Mas&apos;uliyat cheklovi
          </Link>
        </div>
      </div>
    </footer>
  );
}
