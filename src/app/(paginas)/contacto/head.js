export default function Head() {
  const title = "Contacto | Diagnostico Inicial de Software a Medida en 24h";
  const description =
    "Contanos tu caso y recibi un diagnostico inicial en 24 horas. Sin compromiso y sin presion. Ideal para empresas que necesitan automatizar procesos.";
  const url = "https://digitalsolutionsweb.com.ar/contacto";
  const image = "https://digitalsolutionsweb.com.ar/images/og-digital-solutions.jpg";

  return (
    <>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta
        name="keywords"
        content="contacto software a medida, diagnostico de procesos pymes, desarrollo de sistemas argentina, asesoramiento software empresarial"
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
