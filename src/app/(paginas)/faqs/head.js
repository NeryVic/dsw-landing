export default function Head() {
  const title = "FAQs sobre Software a Medida para Empresas | Digital Solutions Web";
  const description =
    "Respuestas frecuentes sobre costos, tiempos, implementacion y soporte de software a medida para PyMEs en Argentina.";
  const url = "https://digitalsolutionsweb.com.ar/faqs";
  const image = "https://digitalsolutionsweb.com.ar/images/og-digital-solutions.jpg";

  return (
    <>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta
        name="keywords"
        content="faq software a medida, cuanto cuesta un sistema a medida, tiempos de desarrollo de software, soporte post implementacion"
      />
      <link rel="canonical" href={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content="website" />
      <meta property="og:image" content={image} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
    </>
  );
}
