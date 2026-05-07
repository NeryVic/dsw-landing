import dynamic from "next/dynamic";
import LazySection from "@/components/ui/LazySection";
import HeroSection from "@/components/sections/HeroSection";
import ServicesSection from "@/components/sections/ServicesSection";
import WhyChooseUsSection from "@/components/sections/WhyChooseUsSection";
import TrustAndProcessSection from "@/components/sections/TrustAndProcessSection";

export const metadata = {
  title: "Software y Sistemas a Medida para Empresas",
  description:
    "Desarrollamos software a medida y sistemas a medida para empresas que necesitan automatizar procesos, reducir errores y escalar su operacion.",
};

// Lazy load secciones no críticas (no están en el nav)
const FeaturesSection = dynamic(() => import("@/components/sections/FeaturesSection"), {
  ssr: true,
  loading: () => <div className="min-h-[400px]" />,
});

const TestimonialsSection = dynamic(() => import("@/components/sections/TestimonialsSection"), {
  ssr: true,
  loading: () => <div className="min-h-[400px]" />,
});

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Secciones críticas y de navegación - carga inmediata para asegurar que los anchors funcionen */}
      <HeroSection />
      <ServicesSection  animationClass="animate-fadein duration-1000"/>
      <WhyChooseUsSection />
      <TrustAndProcessSection />
      <TestimonialsSection />
        <FeaturesSection />
    </div>
  );
}
