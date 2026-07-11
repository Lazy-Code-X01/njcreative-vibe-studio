import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import heroSlide1 from "@/assets/hero-slide-1.jpg";
import heroSlide2 from "@/assets/hero-slide-2.jpg";
import heroSlide3 from "@/assets/hero-slide-3.jpg";
import heroSlide4 from "@/assets/hero-slide-4.jpg";

interface Slide {
  id: number;
  image: string;
  title: string;
  subtitle: string;
  cta: string;
}

const slides: Slide[] = [
  {
    id: 1,
    image: heroSlide1,
    title: "Crafting Digital Excellence",
    subtitle: "Premium web solutions that captivate and convert your audience",
    cta: "Start Your Project",
  },
  {
    id: 2,
    image: heroSlide2,
    title: "Brand Identity Mastery",
    subtitle: "Creating memorable brands that resonate with your target market",
    cta: "View Our Work",
  },
  {
    id: 3,
    image: heroSlide3,
    title: "Strategic Digital Marketing",
    subtitle:
      "Data-driven campaigns that deliver measurable results and growth",
    cta: "Get Started Today",
  },
  {
    id: 4,
    image: heroSlide4,
    title: "Innovative Tech Solutions",
    subtitle: "Custom applications and platforms that scale with your business",
    cta: "Explore Solutions",
  },
];

const BackgroundSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying) return;

    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);

    return () => clearInterval(timer);
  }, [isAutoPlaying]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
    setIsAutoPlaying(false);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    setIsAutoPlaying(false);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
    setIsAutoPlaying(false);
  };

  return (
    <div className="relative w-full h-full overflow-hidden">
      {/* Background Images */}
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
            index === currentSlide
              ? "opacity-100 scale-100"
              : "opacity-0 scale-105"
          }`}
        >
          <div
            className="w-full h-full bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: `linear-gradient(135deg, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.4) 50%, rgba(0,0,0,0.6) 100%), url(${slide.image})`,
            }}
          />

          {/* Floating Particles */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-1/4 left-1/4 w-32 h-32 rounded-full bg-primary/10 blur-2xl animate-pulse" />
            <div className="absolute bottom-1/3 right-1/4 w-48 h-48 rounded-full bg-secondary/8 blur-3xl animate-pulse delay-1000" />
            <div className="absolute top-1/2 right-1/3 w-24 h-24 rounded-full bg-accent-premium/10 blur-xl animate-pulse delay-2000" />
          </div>
        </div>
      ))}

      {/* Overlay Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-background/20 via-transparent to-background/40" />

      {/* Navigation Controls */}
      <button
        onClick={prevSlide}
        className="absolute left-8 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full glass-card flex items-center justify-center text-primary hover:text-primary-glow transition-all duration-300 hover:scale-110 z-20"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-8 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full glass-card flex items-center justify-center text-primary hover:text-primary-glow transition-all duration-300 hover:scale-110 z-20"
        aria-label="Next slide"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Slide Indicators */}
      <div className="absolute bottom-16 left-1/2 -translate-x-1/2 flex space-x-3 z-20">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentSlide
                ? "bg-primary w-8"
                : "bg-white/30 hover:bg-white/50"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

    </div>
  );
};

export default BackgroundSlider;
