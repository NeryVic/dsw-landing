import dynamic from "next/dynamic";
import LazySection from "@/components/ui/LazySection";
import HeroSection from "@/components/sections/HeroSection";
import ServicesSection from "@/components/sections/ServicesSection";

// Lazy load secciones no críticas
const FeaturesSection = dynamic(() => import("@/components/sections/FeaturesSection"), {
  ssr: true,
  loading: () => <div className="min-h-[400px]" />,
});

const WhyChooseUsSection = dynamic(() => import("@/components/sections/WhyChooseUsSection"), {
  ssr: true,
  loading: () => <div className="min-h-[400px]" />,
});

const TrustAndProcessSection = dynamic(() => import("@/components/sections/TrustAndProcessSection"), {
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
      {/* Secciones críticas - carga inmediata */}
      <HeroSection />
      <ServicesSection />
      
      {/* Secciones no críticas - lazy loading */}
      <LazySection>
        <FeaturesSection />
      </LazySection>
      
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
