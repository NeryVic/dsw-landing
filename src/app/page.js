import HeroSection from "@/components/sections/HeroSection";
import WhyChooseUsSection from "@/components/sections/WhyChooseUsSection";
import TestimonialsSection from "@/components/sections/TestimonialsSection";

export const metadata = {
  title: "Software y Sistemas a Medida para Empresas",
  description:
    "Creamos sistemas a medida, sitios web profesionales y soporte técnico para empresas que necesitan operar con más control y menos errores.",
};

export default function Home() {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <WhyChooseUsSection />
      <TestimonialsSection />
    </div>
  );
}
