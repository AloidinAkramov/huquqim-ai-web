import { cn } from "@/lib/utils";
import Image from "next/image";

/**
 * Brend logosi — metalik H + tarozi ikonkasi (public/logo-icon.png) + "Huquqim.AI" matni.
 * theme="light" — oq matn (to'q fon ustida, hero), "dark" — qora matn (oq fon).
 */
export function Logo({
  className,
  showText = true,
  theme = "dark",
}: {
  className?: string;
  showText?: boolean;
  theme?: "light" | "dark";
}) {
  return (
    <span className={cn("inline-flex items-center gap-2", className)}>
      <Image
        src="/logo-icon.png"
        alt="Huquqim.AI"
        width={36}
        height={36}
        className="size-9 shrink-0 object-contain"
        priority
      />
      {showText && (
        <span
          className={cn(
            "text-lg font-bold tracking-tight",
            theme === "light" ? "text-white" : "text-foreground"
          )}
        >
          Huquqim<span className={theme === "light" ? "text-sky-300" : "text-brand-600"}>.AI</span>
        </span>
      )}
    </span>
  );
}
