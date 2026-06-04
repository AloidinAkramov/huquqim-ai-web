import { Logo } from "@/components/logo";
import Link from "next/link";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-full flex-col bg-grid">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-96 bg-radial-brand" />
      <div className="relative mx-auto flex w-full max-w-md flex-1 flex-col justify-center px-4 py-12">
        <Link href="/" className="mx-auto mb-8">
          <Logo />
        </Link>
        {children}
        <p className="mt-8 text-center text-xs text-muted-foreground">
          Huquqim.AI advokatni almashtirmaydi — faqat yordam beruvchi vositadir.
        </p>
      </div>
    </div>
  );
}
