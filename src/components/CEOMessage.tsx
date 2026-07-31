import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import ceoMessagePicture from "@/assets/ceo-img.jpeg";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const CEOMessage = () => {
  const imageRef = useScrollReveal({ threshold: 0.2, delay: 0.1 });
  const contentRef = useScrollReveal({ threshold: 0.2, delay: 0.3 });

  return (
    <section className="py-24 relative overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Image Column */}
          <div className="relative" ref={imageRef}>
            <div className="relative z-10">
              <img
                src={ceoMessagePicture}
                alt="Natasha Jumbo - Founder & CEO"
                className="w-full aspect-[3/4] object-cover rounded-2xl shadow-luxury"
                style={{ objectPosition: "center 20%" }}
              />
            </div>
          </div>

          {/* Message Column */}
          <div className="lg:pl-8" ref={contentRef}>
            <div className="max-w-xl">
              <h2 className="text-4xl md:text-5xl font-serif font-bold mb-8">
                A Message from Our{" "}
                <span className="gradient-text">CEO</span>
              </h2>

              <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
                <p>
                  Welcome to NJ Creative Firm, where innovation meets
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
                  here to turn your vision into reality.
                </p>
              </div>

              <div className="mt-8 space-y-6">
                <div className="flex items-center gap-4">
                  <img
                    src={ceoMessagePicture}
                    alt="Natasha Jumbo"
                    className="w-16 h-16 rounded-full object-cover"
                    style={{ objectPosition: "center 20%" }}
                  />
                  <div>
                    <h3 className="font-bold text-xl">Natasha Jumbo</h3>
                    <p className="text-muted-foreground">Founder & CEO</p>
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

    </section>
  );
};

export default CEOMessage;
