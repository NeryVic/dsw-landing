export default function Head() {
  const title = "Software y Sistemas a Medida para PyMEs en Argentina | Digital Solutions Web";
  const description =
    "Desarrollo de sistemas a medida para PyMEs en Argentina. Eliminamos tareas manuales, errores operativos y falta de control con soluciones adaptadas a tu negocio.";
  const url = "https://digitalsolutionsweb.com.ar/sistemas-a-medida";
  const image = "https://digitalsolutionsweb.com.ar/images/og-digital-solutions.jpg";

  return (
    <>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta
        name="keywords"
        content="software a medida argentina, sistemas a medida para pymes, desarrollo de software para empresas, automatizacion operativa"
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
