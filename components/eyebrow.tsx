import { cn } from "@/lib/utils";

/**
 * Section label. Plain tracked caps rather than a pill chip — the bordered
 * badge-with-dot look reads as generic AI-startup template.
 */
export function Eyebrow({
  children,
  className,
  accent,
}: {
  children: React.ReactNode;
  className?: string;
  accent?: boolean;
}) {
  return (
    <div
      className={cn(
        "text-[11px] font-medium uppercase tracking-[0.2em]",
        accent ? "text-electric" : "text-muted-foreground",
        className
      )}
    >
      {children}
    </div>
  );
}
