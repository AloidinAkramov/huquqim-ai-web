import { cn } from "@/lib/utils";

/** Yuklanish paytida ko'rsatiladigan "skeleton" bloki. */
export function Skeleton({ className }: { className?: string }) {
  return <div className={cn("animate-pulse rounded-md bg-navy-100/70", className)} />;
}

/** Ishlar ro'yxati uchun skeleton (Ishlarim sahifasi). */
export function CaseListSkeleton() {
  return (
    <div className="space-y-3">
      {Array.from({ length: 5 }).map((_, i) => (
        <div
          key={i}
          className="flex items-center gap-4 rounded-xl border border-border bg-surface p-5"
        >
          <Skeleton className="size-11 shrink-0 rounded-lg" />
          <div className="flex-1 space-y-2.5">
            <Skeleton className="h-4 w-2/3" />
            <div className="flex gap-2">
              <Skeleton className="h-5 w-20 rounded-full" />
              <Skeleton className="h-5 w-24 rounded-full" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

/** Hujjat shablonlari uchun skeleton (Hujjatlar sahifasi). */
export function TemplateGridSkeleton() {
  return (
    <div className="mt-8 space-y-8">
      {Array.from({ length: 2 }).map((_, g) => (
        <div key={g}>
          <Skeleton className="mb-3 h-4 w-40" />
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="flex gap-3 rounded-xl border border-border bg-surface p-4">
                <Skeleton className="size-10 shrink-0 rounded-lg" />
                <div className="flex-1 space-y-2">
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-3 w-full" />
                  <Skeleton className="h-3 w-1/2" />
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
