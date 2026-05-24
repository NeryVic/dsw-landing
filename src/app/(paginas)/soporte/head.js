export default function Head() {
  const title = "Soporte Tecnico para Empresas en Formosa y Chaco | Digital Solutions Web";
  const description =
    "Soporte tecnico para PyMEs con atencion remota y presencial en Formosa y Chaco. Mantenimiento preventivo, correctivo y optimizacion de equipos.";
  const url = "https://digitalsolutionsweb.com.ar/soporte";
  const image = "https://digitalsolutionsweb.com.ar/images/og-digital-solutions.jpg";

  return (
    <>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta
        name="keywords"
        content="soporte tecnico empresas formosa, soporte tecnico chaco, mantenimiento pc pymes, soporte remoto para empresas"
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
