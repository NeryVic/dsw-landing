import HeroSection from "@/components/sections/HeroSection";
import ServicesSection from "@/components/sections/ServicesSection";
import WhyChooseUsSection from "@/components/sections/WhyChooseUsSection";
import TrustAndProcessSection from "@/components/sections/TrustAndProcessSection";

export default function Home() {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <ServicesSection />
      <WhyChooseUsSection />
      <TrustAndProcessSection />
      {/* Próximas secciones que puedes agregar: */}
      {/* <PortfolioSection /> */}
      {/* <TestimonialsSection /> */}
      {/* <ContactSection /> */}
    </div>
  );
}
