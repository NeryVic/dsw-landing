import dynamic from "next/dynamic";
import LazySection from "@/components/ui/LazySection";
import HeroSection from "@/components/sections/HeroSection";
import ServicesSection from "@/components/sections/ServicesSection";
import WhyChooseUsSection from "@/components/sections/WhyChooseUsSection";
import TrustAndProcessSection from "@/components/sections/TrustAndProcessSection";

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
      {/* Secciones críticas y de navegación - carga inmediata */}
      <HeroSection />
      <ServicesSection />
      <WhyChooseUsSection />
      <TrustAndProcessSection />
      <TestimonialsSection />
      
      {/* Secciones secundarias - lazy loading */}
      <LazySection>
        <FeaturesSection />
      </LazySection>
    </div>
  );
}
