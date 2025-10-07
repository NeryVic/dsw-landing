import HeroSection from "@/components/sections/HeroSection";
import ServicesSection from "@/components/sections/ServicesSection";
import WhyChooseUsSection from "@/components/sections/WhyChooseUsSection";
import TrustAndProcessSection from "@/components/sections/TrustAndProcessSection";
import TestimonialsSection from "@/components/sections/TestimonialsSection";

export default function Home() {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <ServicesSection />
      <WhyChooseUsSection />
      <TrustAndProcessSection />
      <TestimonialsSection />
      {/* Próximas secciones que puedes agregar: */}
      {/* <ContactSection /> */}
    </div>
  );
}
