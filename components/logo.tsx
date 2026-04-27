import { cn } from "@/lib/utils";

/**
 * Wordmark / logomark inlined verbatim from the uploaded actalogo.svg.
 * Path data and fill values are byte-identical to the source; only the
 * wrapping <svg> tag is JSX so React can render it. Do not modify the
 * path "d" strings or fill attributes.
 *
 * The same SVG also lives at /public/logo.svg for external consumers
 * (OG cards, etc.).
 */
export function Logo({ className }: { className?: string }) {
  return (
    <span
      className={cn("inline-flex items-center select-none", className)}
      aria-label="Acta Data"
    >
      <svg
        viewBox="0 0 1542 857"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        className="h-9 w-auto"
        role="img"
        aria-hidden
      >
        <path d="M448.5 33.5L482 0H686.5L719.5 33.5L753 66V132H646V99H517V265H646V237.5H753V301.5L719.5 333.5L686.5 367H482L448.5 333.5L415 301.5V69L448.5 33.5Z" fill="white" fillOpacity="0.5"/>
        <path d="M817 0H1140V99H1034.5V367H935V99H817V0Z" fill="white" fillOpacity="0.5"/>
        <path d="M817 490H1140V589H1034.5V857H935V589H817V490Z" fill="white" fillOpacity="0.5"/>
        <path d="M264 557.34L323 615V857H0V490H193L264 557.34ZM92 594V763H224V669L187 631.399L153 594H92Z" fill="white" fillOpacity="0.5"/>
        <path d="M738 857H643.5V797H517V857H415V628L481.5 556.5L542.5 490H738V857ZM582.423 587L545.107 628L517 660V694H643V587H582.423Z" fill="white" fillOpacity="0.5"/>
        <path d="M1542 857H1447.5V797H1321V857H1219V628L1285.5 556.5L1346.5 490H1542V857ZM1386.42 587L1349.11 628L1321 660V694H1447V587H1386.42Z" fill="white" fillOpacity="0.5"/>
        <path d="M1542 367H1447.5V307H1321V367H1219V138L1285.5 66.5L1346.5 0H1542V367ZM1386.42 97L1349.11 138L1321 170V204H1447V97H1386.42Z" fill="white" fillOpacity="0.5"/>
        <path d="M323 367H228.5V307H102V367H0V138L66.5 66.5L127.5 0H323V367ZM167.423 97L130.107 138L102 170V204H228V97H167.423Z" fill="white" fillOpacity="0.5"/>
      </svg>
    </span>
  );
}
