import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import natashaImg from "@/assets/natasha.jpg";

const CEOMessage = () => {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Image Column */}
          <div className="relative">
            <div className="relative z-10">
              <img
                src={natashaImg}
                alt="Natasha Jumbo - Founder & CEO"
                className="w-full aspect-[3/4] object-cover rounded-2xl shadow-luxury"
              />
              {/* Decorative elements */}
              <div className="absolute -top-6 -left-6 w-24 h-24 border-2 border-primary/20 rounded-2xl -z-10" />
              <div className="absolute -bottom-6 -right-6 w-32 h-32 border-2 border-secondary/20 rounded-2xl -z-10" />
            </div>
          </div>

          {/* Message Column */}
          <div className="lg:pl-8">
            <div className="max-w-xl">
              <h2 className="text-4xl md:text-5xl font-serif font-bold mb-8">
                A Message from Our{" "}
                <span className="gradient-text animate-gradient">CEO</span>
              </h2>

              <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
                <p>
                  "Welcome to NJ Creative Firm, where innovation meets
                  excellence. Since our inception, we've been driven by a
                  singular vision: to transform businesses through exceptional
                  digital experiences that inspire, engage, and deliver results.
                </p>
                <p>
                  Our journey has been marked by continuous innovation,
                  unwavering dedication to quality, and a deep commitment to our
                  clients' success. We don't just build websites or create
                  brands – we craft digital experiences that drive real business
                  growth.
                </p>
                <p>
                  Whether you're a startup looking to make your mark or an
                  established business ready for digital transformation, we're
                  here to turn your vision into reality."
                </p>
              </div>

              <div className="mt-8 space-y-6">
                <div className="flex items-center gap-4">
                  <img
                    src={natashaImg}
                    alt="Natasha Jumbo"
                    className="w-16 h-16 rounded-full object-cover"
                  />
                  <div>
                    <h3 className="font-bold text-xl">Natasha Jumbo</h3>
                    <p className="text-muted-foreground">
                      Founder & Creative Director
                    </p>
                  </div>
                </div>

                <Link to="/about">
                  <Button className="btn-luxury group mt-10">
                    Learn More About Our Vision
                    <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Background Elements */}
      <div className="absolute inset-0 -z-10 opacity-10">
        <div className="absolute top-1/4 -left-32 w-64 h-64 rounded-full bg-primary blur-3xl" />
        <div className="absolute bottom-1/4 -right-32 w-64 h-64 rounded-full bg-secondary blur-3xl" />
      </div>
    </section>
  );
};

export default CEOMessage;
