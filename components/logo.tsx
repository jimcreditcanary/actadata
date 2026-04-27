import { cn } from "@/lib/utils";

/**
 * The wordmark/logomark are loaded from /logo.svg (the uploaded asset).
 * The SVG is intentionally not edited — it ships byte-identical to the file
 * Jim provided (semi-transparent white "ACTA / DATA" letterforms).
 */
export function Logo({ className }: { className?: string }) {
  return (
    <span className={cn("inline-flex items-center select-none", className)} aria-label="Acta Data">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/logo.svg"
        alt="Acta Data"
        width={72}
        height={40}
        className="h-9 w-auto"
        draggable={false}
      />
    </span>
  );
}
