import dynamic from "next/dynamic";
import LazySection from "@/components/ui/LazySection";
import HeroSection from "@/components/sections/HeroSection";
import ServicesSection from "@/components/sections/ServicesSection";
import FeaturesSection from "@/components/sections/FeaturesSection"; //por ahora queda

// Lazy load secciones no críticas
const WhyChooseUsSection = dynamic(() => import("@/components/sections/WhyChooseUsSection"), {
  ssr: true,
});

const TrustAndProcessSection = dynamic(() => import("@/components/sections/TrustAndProcessSection"), {
  ssr: true,
});

const TestimonialsSection = dynamic(() => import("@/components/sections/TestimonialsSection"), {
  ssr: true,
});

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Secciones críticas - carga inmediata */}
      <HeroSection />
      <ServicesSection />
      <FeaturesSection /> 
      
      {/* Secciones no críticas - lazy loading */}
      <LazySection>
        <WhyChooseUsSection />
      </LazySection>
      
      <LazySection>
        <TrustAndProcessSection />
      </LazySection>
      
      <LazySection>
        <TestimonialsSection />
      </LazySection>
    </div>
  );
}
