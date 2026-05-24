export default function Head() {
  const title = "Servicios de Desarrollo Web y Software a Medida en Argentina | Digital Solutions Web";
  const description =
    "Servicios de software a medida en Argentina para PyMEs: sistemas internos, automatizacion de procesos, ecommerce y soluciones web orientadas a resultados.";
  const url = "https://digitalsolutionsweb.com.ar/servicios";
  const image = "https://digitalsolutionsweb.com.ar/images/og-digital-solutions.jpg";

  return (
    <>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta
        name="keywords"
        content="servicios de software a medida, desarrollo web para empresas, desarrollo de sistemas para pymes, automatizacion de procesos argentina"
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
