import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import BackgroundSlider from "./BackgroundSlider";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-24 md:pt-0">
      {/* Background Slider */}
      <div className="absolute inset-0">
        <BackgroundSlider />
      </div>

      {/* Bottom fade to background */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-background to-transparent z-10 pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 text-center">
        <div className="max-w-5xl mx-auto animate-fade-in">
          {/* Main Headline */}
          <h1 className="mt-20 text-6xl md:text-8xl font-heading font-black mb-8 leading-[0.9] tracking-tight">
            <span className="block text-foreground">Innovate.</span>
            <span className="block gradient-text font-serif italic">
              Create.
            </span>
            <span className="block text-foreground">Elevate.</span>
          </h1>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-muted-foreground mb-12 leading-relaxed max-w-3xl mx-auto font-body">
            We craft extraordinary digital solutions that elevate your brand and
            deliver exceptional results through premium web development,
            strategic branding, and innovative marketing.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16 animate-slide-up">
            <Link to="/contact">
              <Button className="btn-luxury text-lg px-10 py-5 font-semibold">
                Start Your Journey
              </Button>
            </Link>

            <Link to="/portfolio">
              <Button className="btn-outline-luxury text-lg px-10 py-5 font-medium">
                View Our Work
              </Button>
            </Link>
          </div>

        </div>
      </div>
    </section>
  );
};

export default HeroSection;
