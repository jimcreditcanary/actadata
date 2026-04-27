import { cn } from "@/lib/utils";

export function Logo({ className, withWord = true }: { className?: string; withWord?: boolean }) {
  return (
    <div className={cn("flex items-center gap-2.5 select-none", className)}>
      <svg width="34" height="34" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" aria-hidden>
        <rect width="100" height="100" rx="14" fill="#050D1A" stroke="#3DDBFF" strokeWidth="2.5"/>
        <text x="50" y="44" textAnchor="middle"
              fontFamily="ui-sans-serif, Inter, system-ui" fontWeight="900" fontSize="26" fill="#FFFFFF"
              letterSpacing="-1">ACTA</text>
        <text x="50" y="74" textAnchor="middle"
              fontFamily="ui-sans-serif, Inter, system-ui" fontWeight="900" fontSize="26" fill="#3DDBFF"
              letterSpacing="-1">DATA</text>
      </svg>
      {withWord && (
        <span className="font-semibold tracking-tight text-foreground/95">
          ACTA<span className="text-electric">·</span>DATA
        </span>
      )}
    </div>
  );
}
