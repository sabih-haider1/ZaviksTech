interface JsonLdProps {
  data: Record<string, unknown> | Record<string, unknown>[];
}

/** Injects JSON-LD structured data. Safe: data is app-controlled, not user input. */
export function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
