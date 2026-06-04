import Link from "next/link";
import { Logo } from "./logo";
import { Button } from "./ui/button";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-border/70 bg-background/80 backdrop-blur-lg">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link href="/">
          <Logo />
        </Link>
        <nav className="hidden items-center gap-7 text-sm font-medium text-muted-foreground md:flex">
          <a href="/#qanday" className="transition-colors hover:text-foreground">
            Qanday ishlaydi
          </a>
          <a href="/#imkoniyatlar" className="transition-colors hover:text-foreground">
            Imkoniyatlar
          </a>
          <a href="/#narxlar" className="transition-colors hover:text-foreground">
            Narxlar
          </a>
        </nav>
        <div className="flex items-center gap-2">
          <Link href="/login">
            <Button variant="ghost" size="sm">
              Kirish
            </Button>
          </Link>
          <Link href="/register">
            <Button size="sm">Bepul boshlash</Button>
          </Link>
        </div>
      </div>
    </header>
  );
}
