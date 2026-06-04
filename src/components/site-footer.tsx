import { Logo } from "./logo";

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-surface">
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
          <Logo />
          <p className="max-w-md text-xs leading-relaxed text-muted-foreground">
            Huquqim.AI advokat yoki yuristni almashtirmaydi. U faqat huquqiy ma&apos;lumot va
            yordam beruvchi vositadir. Murakkab holatlar uchun malakali yuristga murojaat qiling.
          </p>
        </div>
        <div className="mt-8 border-t border-border pt-6 text-xs text-muted">
          © {new Date().getFullYear()} Huquqim.AI · O&apos;zbekiston fuqarolari uchun
        </div>
      </div>
    </footer>
  );
}
