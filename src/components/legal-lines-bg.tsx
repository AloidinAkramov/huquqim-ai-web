/**
 * Elegant egri chiziqlar — oq section'lar uchun nozik rasmiy fon (Click uslubi).
 * Fon o'zgarmaydi (oq qoladi), faqat juda past opacity ko'k egri chiziqlar.
 */
export function LegalLinesBg() {
  return (
    <svg
      aria-hidden
      className="pointer-events-none absolute inset-0 h-full w-full"
      preserveAspectRatio="none"
      viewBox="0 0 1440 600"
      fill="none"
    >
      <g stroke="#0F4FB3" strokeWidth="1" opacity="0.06">
        <path d="M-100 480 C 300 360, 700 560, 1100 380 S 1700 460, 1900 320" />
        <path d="M-100 540 C 300 420, 700 620, 1100 440 S 1700 520, 1900 380" />
        <path d="M-100 420 C 300 300, 700 500, 1100 320 S 1700 400, 1900 260" />
      </g>
      <g stroke="#0F4FB3" strokeWidth="1" opacity="0.05">
        <path d="M-100 120 C 350 220, 700 60, 1100 180 S 1700 120, 1900 200" />
        <path d="M-100 60 C 350 160, 700 0, 1100 120 S 1700 60, 1900 140" />
      </g>
    </svg>
  );
}
