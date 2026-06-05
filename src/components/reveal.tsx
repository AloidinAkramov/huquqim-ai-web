"use client";

import { cn } from "@/lib/utils";
import { HTMLAttributes, useEffect, useRef, useState } from "react";

interface RevealProps extends HTMLAttributes<HTMLDivElement> {
  /** Stagger uchun kechikish (ms). Ro'yxatда index * 60 berish tavsiya etiladi. */
  delay?: number;
  as?: "div" | "section" | "li";
}

/**
 * Scroll reveal — element ko'rinishga kirganda pastdan tepaga chiqadi
 * (opacity 0→1, translateY 20px→0). Stagger uchun `delay` beriladi.
 */
export function Reveal({ children, className, delay = 0, as = "div", ...props }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.08, rootMargin: "0px 0px -40px 0px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const Tag = as as "div";

  return (
    <Tag
      ref={ref}
      className={cn("reveal", visible && "is-visible", className)}
      style={{ transitionDelay: `${delay}ms` }}
      {...props}
    >
      {children}
    </Tag>
  );
}
