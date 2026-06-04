// Yengil markdown render — **qalin**, ro'yxatlar, paragraflar. Tashqi kutubxonasiz.
import { Fragment } from "react";

function renderInline(text: string) {
  // **bold** ni ajratish
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <strong key={i} className="font-semibold text-foreground">
          {part.slice(2, -2)}
        </strong>
      );
    }
    return <Fragment key={i}>{part}</Fragment>;
  });
}

export function Markdown({ content }: { content: string }) {
  const lines = content.split("\n");
  const blocks: React.ReactNode[] = [];
  let list: string[] = [];

  const flushList = (key: string) => {
    if (list.length === 0) return;
    blocks.push(
      <ul key={key} className="my-2 ml-1 space-y-1.5">
        {list.map((item, i) => (
          <li key={i} className="flex gap-2">
            <span className="mt-2 size-1.5 shrink-0 rounded-full bg-brand-400" />
            <span>{renderInline(item)}</span>
          </li>
        ))}
      </ul>
    );
    list = [];
  };

  lines.forEach((raw, i) => {
    const line = raw.trim();
    const ordered = line.match(/^\d+\.\s+(.*)/);
    const bullet = line.match(/^[-*]\s+(.*)/);

    if (ordered) {
      list.push(ordered[1]);
    } else if (bullet) {
      list.push(bullet[1]);
    } else {
      flushList(`list-${i}`);
      if (line.length > 0) {
        blocks.push(
          <p key={i} className="leading-relaxed">
            {renderInline(line)}
          </p>
        );
      }
    }
  });
  flushList("list-end");

  return <div className="space-y-2 text-[15px]">{blocks}</div>;
}
