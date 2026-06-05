"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Logo } from "./logo";
import { Button } from "./ui/button";

/**
 * Landing header — hero ustida shaffof (ko'k fon bilan qo'shiladi),
 * scroll qilingach oq fonga o'tadi (MySud.uz uslubi).
 */
export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={
        "fixed inset-x-0 top-0 z-50 transition-all duration-300 " +
        (scrolled
          ? "border-b border-border bg-surface/90 backdrop-blur-lg"
          : "border-b border-transparent bg-transparent")
      }
    >
      <div className="flex h-16 items-center justify-between px-5 sm:px-8">
        <Link href="/" className="shrink-0">
          <Logo theme={scrolled ? "dark" : "light"} />
        </Link>
        <nav
          className={
            "hidden items-center gap-7 text-sm font-medium transition-colors md:flex " +
            (scrolled ? "text-muted-foreground" : "text-white/85")
          }
        >
          <a
            href="/#qanday"
            className={scrolled ? "hover:text-foreground" : "hover:text-white"}
          >
            Qanday ishlaydi
          </a>
          <a
            href="/#imkoniyatlar"
            className={scrolled ? "hover:text-foreground" : "hover:text-white"}
          >
            Imkoniyatlar
          </a>
          <a
            href="/#narxlar"
            className={scrolled ? "hover:text-foreground" : "hover:text-white"}
          >
            Narxlar
          </a>
        </nav>
        <div className="flex items-center gap-2">
          <Link href="/login">
            {scrolled ? (
              <Button variant="ghost" size="sm">
                Kirish
              </Button>
            ) : (
              <Button
                variant="ghost"
                size="sm"
                className="text-white hover:bg-white/15 hover:text-white"
              >
                Kirish
              </Button>
            )}
          </Link>
          <Link href="/register">
            <Button size="sm" className={scrolled ? "" : "cta-primary glossy"}>
              Bepul boshlash
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
}
