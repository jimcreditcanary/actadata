import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

const team = [
  ["Data Lead",            "£110k", "3–4 mo"],
  ["Data Engineer",        "£90k",  "3 mo"],
  ["Analytics Engineer",   "£80k",  "3 mo"],
  ["Commercial Analyst",   "£65k",  "2 mo"],
  ["BI Developer",         "£70k",  "2 mo"],
];

export function Problem() {
  const totalSalary = 110 + 90 + 80 + 65 + 70;
  const fullyLoaded = Math.round(totalSalary * 1.3);

  return (
    <section id="problem" className="relative py-24 md:py-32">
      <div className="container">
        <div className="max-w-3xl">
          <Badge variant="muted" className="mb-5">The problem</Badge>
          <h2 className="text-3xl md:text-5xl font-semibold tracking-tight leading-tight">
            Building a data team is expensive,{" "}
            <span className="text-electric">slow</span>, and usually wrong.
          </h2>
          <p className="mt-5 text-lg text-muted-foreground">
            By the time you've hired five people, scoped a stack, picked vendors and
            shipped your first dashboards, your competitors have already made the next
            three decisions. There's a faster way in.
          </p>
        </div>

        <div className="mt-12 grid lg:grid-cols-2 gap-6 items-start">
          {/* Internal team */}
          <div>
            <div className="mb-3 flex items-center gap-2">
              <Badge variant="muted">Build it yourself</Badge>
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
                {team.map(([r, s, t]) => (
                  <TableRow key={r}>
                    <TableCell className="font-medium text-foreground">{r}</TableCell>
                    <TableCell className="text-muted-foreground">{s}</TableCell>
                    <TableCell className="text-muted-foreground">{t}</TableCell>
                  </TableRow>
                ))}
                <TableRow>
                  <TableCell className="font-semibold">Year-1 cost</TableCell>
                  <TableCell colSpan={2} className="font-semibold text-foreground">
                    ~£{fullyLoaded}k <span className="text-muted-foreground font-normal">fully loaded · 6 mo to first output</span>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>

          {/* Acta Data */}
          <div className="relative">
            <div className="absolute -inset-px rounded-xl bg-gradient-to-b from-electric/40 to-transparent opacity-60 blur-xl pointer-events-none" />
            <div className="relative rounded-xl border border-electric/30 bg-card/80 backdrop-blur p-6 md:p-8 glow-ring">
              <div className="flex items-center gap-2 mb-4">
                <Badge variant="electric">Acta Data</Badge>
                <span className="text-xs text-muted-foreground">From day one</span>
              </div>
              <div className="grid grid-cols-2 gap-x-6 gap-y-5">
                {[
                  ["Start date", "This month"],
                  ["Year-1 cost", "From £120k"],
                  ["First output", "Weeks 2–4"],
                  ["Headcount risk", "Zero"],
                  ["Stack", "Modern, owned by you"],
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
                we build the whole data function for the price of one mid-level hire.
                You get senior operators, a working stack, and a team you don't have to manage.
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
