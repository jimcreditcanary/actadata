import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Eyebrow } from "@/components/eyebrow";
import {
  inHouseTeam,
  loadingMultiplier,
  inHouseYearOneK,
  inHouseTimeToFirstOutput,
  entryYearK,
  seniorHireLoadedK,
  actaTimeToFirstOutput,
  headcountWord,
} from "@/lib/economics";

export function Problem() {
  return (
    <section id="problem" className="relative py-16 md:py-32">
      <div className="container">
        <div className="max-w-3xl">
          <Eyebrow className="mb-5">The problem</Eyebrow>
          <h2 className="font-display text-4xl md:text-5xl tracking-tight leading-[1.05]">
            Building a data team is expensive,{" "}
            <span className="text-electric">slow</span>, and usually wrong.
          </h2>
          <p className="mt-5 text-lg text-muted-foreground">
            By the time you&apos;ve hired {headcountWord} people, scoped a stack, picked vendors and
            shipped your first dashboards, your competitors have already made the next
            three decisions. There&apos;s a faster way in.
          </p>
        </div>

        <div className="mt-12 grid lg:grid-cols-2 gap-6 items-start">
          {/* Internal team */}
          <div>
            <div className="mb-3 flex items-center gap-2">
              <Eyebrow>Build it yourself</Eyebrow>
              <span className="text-xs text-muted-foreground">Typical UK fully-loaded</span>
            </div>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Role</TableHead>
                  <TableHead>Base salary</TableHead>
                  <TableHead>Time to productivity</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {inHouseTeam.map(r => (
                  <TableRow key={r.role}>
                    <TableCell className="font-medium text-foreground">{r.role}</TableCell>
                    <TableCell className="text-muted-foreground">£{r.salaryK}k</TableCell>
                    <TableCell className="text-muted-foreground">{r.rampMonths}</TableCell>
                  </TableRow>
                ))}
                <TableRow>
                  <TableCell className="font-semibold">Year-1 cost</TableCell>
                  <TableCell colSpan={2} className="font-semibold text-foreground">
                    ~£{inHouseYearOneK}k{" "}
                    <span className="text-muted-foreground font-normal">
                      fully loaded · {inHouseTimeToFirstOutput} to first output
                    </span>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
            <p className="mt-3 text-xs text-muted-foreground">
              Fully loaded = base salary plus employer NI, pension, tooling and
              recruitment fees, at {loadingMultiplier}× base.
            </p>
          </div>

          {/* Acta Data */}
          <div className="relative">
            <div className="absolute -inset-px rounded-xl bg-gradient-to-b from-electric/40 to-transparent opacity-60 blur-xl pointer-events-none" />
            <div className="relative rounded-xl border border-electric/30 bg-card/80 backdrop-blur p-6 md:p-8 glow-ring">
              <div className="flex items-center gap-2 mb-4">
                <Eyebrow accent>Acta Data</Eyebrow>
                <span className="text-xs text-muted-foreground">From day one</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-5">
                {[
                  ["Start date", "This month"],
                  ["Year-1 cost", `From £${entryYearK}k`],
                  ["First output", actaTimeToFirstOutput],
                  ["Headcount risk", "Zero"],
                  ["Stack", "BigQuery · shadcn · Claude"],
                  ["Exit", "Hand over, embed, or stay on"],
                ].map(([k, v]) => (
                  <div key={k}>
                    <div className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground">{k}</div>
                    <div className="mt-1 font-semibold text-foreground">{v}</div>
                  </div>
                ))}
              </div>
              <div className="mt-7 rounded-lg border border-white/[0.06] bg-navy-100/60 p-4 text-sm text-muted-foreground">
                <span className="text-foreground font-medium">The deal:</span>{" "}
                we build the whole data function for less than half the cost of one senior
                hire (~£{seniorHireLoadedK}k fully loaded).
                You get senior operators, a working stack, and a team you don&apos;t have to manage.
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
