import { organizationSchema, websiteSchema } from '@/lib/schemas'

export default function JsonLd({ schema }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(schema)
      }}
    />
  )
}

export function DefaultJsonLd() {
  return (
    <>
      <JsonLd schema={organizationSchema} />
      <JsonLd schema={websiteSchema} />
    </>
  )
}