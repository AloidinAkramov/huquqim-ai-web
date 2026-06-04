"use client";

import { Logo } from "@/components/logo";
import { UpgradeModal } from "@/components/upgrade-modal";
import { Disclaimer } from "@/components/ui/disclaimer";
import { auth, authApi } from "@/lib/api";
import { cn } from "@/lib/utils";
import { Crown, Folder, LayoutDashboard, LogOut, Menu, Sparkles, X } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const nav = [
  { href: "/dashboard", label: "Ishlarim", icon: LayoutDashboard },
  { href: "/dashboard/documents", label: "Hujjatlar", icon: Folder },
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [ready, setReady] = useState(false);
  const [open, setOpen] = useState(false);
  const [premium, setPremium] = useState(false);
  const [paywall, setPaywall] = useState(false);

  useEffect(() => {
    if (!auth.isAuthed()) {
      router.replace("/login");
    } else {
      setReady(true);
      authApi.me().then((u) => setPremium(u.isPremium)).catch(() => {});
    }
  }, [router]);

  function logout() {
    auth.clear();
    router.push("/");
  }

  if (!ready) {
    return (
      <div className="grid flex-1 place-items-center">
        <div className="size-8 animate-spin rounded-full border-2 border-brand-200 border-t-brand-600" />
      </div>
    );
  }

  return (
    <div className="flex min-h-full flex-1">
      {/* Sidebar */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 flex w-64 flex-col border-r border-border bg-surface transition-transform md:static md:translate-x-0",
          open ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex h-16 items-center justify-between px-5">
          <Link href="/dashboard" onClick={() => setOpen(false)}>
            <Logo />
          </Link>
          <button className="md:hidden" onClick={() => setOpen(false)}>
            <X className="size-5 text-muted" />
          </button>
        </div>

        <nav className="flex-1 space-y-1 px-3 py-2">
          {nav.map((item) => {
            const active =
              item.href === "/dashboard"
                ? pathname === "/dashboard"
                : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                  active
                    ? "bg-brand-50 text-brand-700"
                    : "text-muted-foreground hover:bg-zinc-50 hover:text-foreground"
                )}
              >
                <item.icon className="size-4.5" />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="space-y-3 p-3">
          {premium ? (
            <div className="flex items-center gap-2 rounded-xl border border-amber-200 bg-amber-50 px-3 py-2.5 text-sm font-medium text-amber-900">
              <Crown className="size-4 text-amber-500" />
              Premium faol
            </div>
          ) : (
            <button
              onClick={() => setPaywall(true)}
              className="flex w-full items-center gap-2 rounded-xl bg-brand-600 px-3 py-2.5 text-sm font-medium text-white transition-colors hover:bg-brand-700"
            >
              <Sparkles className="size-4" />
              Premiumga o&apos;tish
            </button>
          )}
          <Disclaimer />
          <button
            onClick={logout}
            className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-red-50 hover:text-danger"
          >
            <LogOut className="size-4.5" />
            Chiqish
          </button>
        </div>
      </aside>

      <UpgradeModal
        open={paywall}
        onClose={() => setPaywall(false)}
        onUpgraded={() => {
          setPaywall(false);
          setPremium(true);
        }}
      />

      {open && (
        <div className="fixed inset-0 z-40 bg-zinc-900/40 md:hidden" onClick={() => setOpen(false)} />
      )}

      {/* Main */}
      <div className="flex min-w-0 flex-1 flex-col">
        <header className="flex h-16 items-center gap-3 border-b border-border bg-background/80 px-4 backdrop-blur md:hidden">
          <button onClick={() => setOpen(true)}>
            <Menu className="size-5" />
          </button>
          <Logo />
        </header>
        <main className="flex-1 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
}
