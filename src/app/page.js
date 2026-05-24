import HeroSection from "@/components/sections/HeroSection";
import WhyChooseUsSection from "@/components/sections/WhyChooseUsSection";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import TrustAndProcessSection from "@/components/sections/TrustAndProcessSection";
import JsonLd from "@/components/JsonLd";
import { testimonialsData } from "@/data/testimonials";
import { testimonialsReviewSchema } from "@/lib/schemas";

export const metadata = {
  title: "Software a Medida para PyMEs en Argentina",
  description:
    "Desarrollamos software a medida en Argentina para PyMEs que quieren eliminar tareas manuales, reducir errores operativos y escalar con control.",
  keywords: [
    "software a medida argentina",
    "sistemas a medida para pymes",
    "desarrollo de sistemas para pymes",
    "sistema pos para ferreteria",
    "automatizacion de procesos empresariales",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Software a Medida para PyMEs en Argentina",
    description:
      "Desarrollamos software a medida en Argentina para PyMEs que quieren eliminar tareas manuales, reducir errores operativos y escalar con control.",
    url: "https://digitalsolutionsweb.com.ar/",
    images: [
      {
        url: "/images/og-digital-solutions.webp",
        width: 1200,
        height: 630,
        alt: "Software a medida para PyMEs en Argentina",
      },
    ],
  },
};

export default function Home() {
  return (
    <div className="min-h-screen">
      <JsonLd schema={testimonialsReviewSchema(testimonialsData)} />
      <HeroSection />
      <WhyChooseUsSection />
      <TestimonialsSection />
      <TrustAndProcessSection />
    </div>
  );
}
