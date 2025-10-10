import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import ServicesSection from "@/components/ServicesSection";
import PortfolioSection from "@/components/PortfolioSection";
import AboutSection from "@/components/AboutSection";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";

const Index = () => {
  return (
    <div className="min-h-screen">
      <SEO
        title="Premium Digital Agency"
        description="NJ Creative Firm is Lagos's leading digital agency specializing in web development, branding, and digital marketing. Transform your digital presence with our innovative solutions."
        keywords="digital agency, web development, branding, digital marketing, Lagos, Nigeria"
      />
      <Navigation />
      <main>
        <HeroSection />
        <ServicesSection />
        <PortfolioSection />
        <AboutSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
