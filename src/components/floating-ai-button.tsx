"use client";

import { Plus } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

/**
 * Floating "Yangi ish" tugmasi — bottom-right, scroll qilingandan keyin paydo bo'ladi.
 * Soft shadow, premium ko'rinish. Har doim ko'rinib turmaydi.
 */
export function FloatingAIButton() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 320);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!show) return null;

  return (
    <Link
      href="/dashboard/new"
      aria-label="Yangi ish ochish"
      className="animate-float-in fixed bottom-6 right-6 z-40 inline-flex items-center gap-2 rounded-full bg-brand-600 px-5 py-3.5 text-sm font-semibold text-white shadow-float transition-all duration-200 hover:-translate-y-0.5 hover:bg-brand-700"
    >
      <Plus className="size-4.5" />
      Yangi ish
    </Link>
  );
}
