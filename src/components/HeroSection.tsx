import { ArrowRight, Play, Star } from "lucide-react";
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

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 text-center">
        <div className="max-w-5xl mx-auto animate-fade-in">
          {/* Premium Badge */}
          <div className="inline-flex items-center px-6 py-3 rounded-full glass-card mb-8 group hover:scale-105 transition-all duration-300">
            <Star className="w-4 h-4 text-primary mr-2" />
            <span className="text-primary font-medium tracking-wide">
              Premium Digital Agency
            </span>
            <div className="ml-2 w-2 h-2 bg-primary rounded-full animate-pulse" />
          </div>

          {/* Main Headline */}
          <h1 className="text-6xl md:text-8xl font-heading font-black mb-8 leading-[0.9] tracking-tight">
            <span className="block text-foreground">Luxury</span>
            <span className="block gradient-text animate-gradient font-serif italic">
              Digital
            </span>
            <span className="block text-foreground">Experiences</span>
          </h1>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-muted-foreground mb-12 leading-relaxed max-w-3xl mx-auto font-body">
            We craft extraordinary digital solutions that elevate your brand and deliver 
            exceptional results through premium web development, strategic branding, and innovative marketing.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16 animate-slide-up">
            <Link to="/contact">
              <Button className="btn-luxury group text-lg px-10 py-5 font-semibold">
                Start Your Journey
                <ArrowRight className="ml-3 w-5 h-5 group-hover:translate-x-2 transition-transform duration-300" />
              </Button>
            </Link>
            
            <Link to="/portfolio">
              <Button className="btn-outline-luxury group text-lg px-10 py-5 font-medium">
                <Play className="mr-3 w-5 h-5" />
                View Our Work
              </Button>
            </Link>
          </div>

          {/* Stats */}
          {/* <div className="grid grid-cols-2 md:grid-cols-4 gap-8 animate-scale-in">
            {[
              { number: "200+", label: "Premium Projects", icon: "🏆" },
              { number: "99%", label: "Client Satisfaction", icon: "⭐" },
              { number: "50M+", label: "Revenue Generated", icon: "💰" },
              { number: "8+", label: "Years Excellence", icon: "🚀" }
            ].map((stat, index) => (
              <div 
                key={index} 
                className="text-center group hover:scale-105 transition-all duration-300"
              >
                <div className="text-4xl mb-2">{stat.icon}</div>
                <div className="text-3xl md:text-4xl font-black text-primary mb-2 font-heading">
                  {stat.number}
                </div>
                <div className="text-sm text-muted-foreground font-body tracking-wide">
                  {stat.label}
                </div>
              </div>
            ))}
          </div> */}
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20">
        <div className="w-6 h-12 border-2 border-primary rounded-full flex justify-center p-1">
          <div className="w-1 h-4 bg-primary rounded-full animate-bounce" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;