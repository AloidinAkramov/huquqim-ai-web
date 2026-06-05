import { Logo } from "@/components/logo";
import Image from "next/image";
import Link from "next/link";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative flex min-h-screen flex-col overflow-hidden bg-[#0f3b86]">
      {/* Premium ko'k fon rasm (hero bilan bir xil) */}
      <Image
        src="/hero-bg.png"
        alt=""
        fill
        priority
        sizes="100vw"
        className="hero-bg-img select-none object-cover"
      />
      {/* Deep blue glass overlay */}
      <div className="hero-overlay pointer-events-none absolute inset-0" />

      <div className="relative mx-auto flex w-full max-w-md flex-1 flex-col justify-center px-4 py-12">
        <Link href="/" className="hero-in mx-auto mb-8">
          <Logo theme="light" />
        </Link>
        <div className="hero-in" style={{ animationDelay: "100ms" }}>
          {children}
        </div>
        <p className="hero-in mt-8 text-center text-xs text-blue-100/70" style={{ animationDelay: "200ms" }}>
          Huquqim.AI advokatni almashtirmaydi — faqat yordam beruvchi vositadir.
        </p>
      </div>
    </div>
  );
}
