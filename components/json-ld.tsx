/**
 * Renders a JSON-LD graph into the page.
 *
 * Server-rendered as a plain script tag so it is in the HTML the first time any
 * crawler or AI retriever sees the page — no client hydration involved.
 */
export function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      // The payload is our own constants, never user input.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
