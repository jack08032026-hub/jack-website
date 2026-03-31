interface MetadataJsonLdProps {
  data: Record<string, unknown>;
}

export default function MetadataJsonLd({ data }: MetadataJsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
