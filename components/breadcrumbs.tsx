import { JsonLd } from "@/components/json-ld";
import { graph, breadcrumbs } from "@/lib/seo";

/**
 * Schema-only breadcrumbs. Renders nothing visible — the nav already shows where
 * you are — but it is what turns a bare URL into a labelled path in a search
 * result, and it tells a retriever how a page sits inside the site rather than
 * treating every page as a loose leaf.
 *
 * Home is prepended for you; pass the trail below it.
 */
export function Breadcrumbs({ trail }: { trail: { name: string; path: string }[] }) {
  return <JsonLd data={graph(breadcrumbs(trail))} />;
}
