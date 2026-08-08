import { cn } from "@/lib/utils";

/**
 * Section label. Plain tracked caps rather than a pill chip — the bordered
 * badge-with-dot look reads as generic AI-startup template.
 *
 * `as` exists because on several pages the eyebrow IS the section's only title —
 * the sector pages had an H1 and then nothing until the footer, which reads as
 * one undifferentiated blob to a screen reader and to a crawler. Rendering the
 * same styles as an h2/h3 fixes the document outline without touching the look.
 */
export function Eyebrow({
  children,
  className,
  accent,
  as: Tag = "div",
}: {
  children: React.ReactNode;
  className?: string;
  accent?: boolean;
  as?: "div" | "h2" | "h3";
}) {
  return (
    <Tag
      className={cn(
        "text-[11px] font-medium uppercase tracking-[0.2em]",
        accent ? "text-electric" : "text-muted-foreground",
        className
      )}
    >
      {children}
    </Tag>
  );
}
