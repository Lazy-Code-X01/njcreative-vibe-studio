import { Globe, Palette, Megaphone, Smartphone, ArrowRight } from "lucide-react";

const ServicesSection = () => {
  const services = [
    {
      icon: Globe,
      title: "Web Design & Development",
      description: "Modern, responsive websites that captivate and convert visitors into customers.",
      features: ["Responsive Design", "E-commerce Solutions", "CMS Integration", "Performance Optimization"],
      color: "from-primary to-primary-glow"
    },
    {
      icon: Palette,
      title: "Branding & Creative Strategy",
      description: "Compelling brand identities that tell your story and connect with your audience.",
      features: ["Logo Design", "Brand Guidelines", "Visual Identity", "Creative Direction"],
      color: "from-secondary to-secondary-glow"
    },
    {
      icon: Megaphone,
      title: "Digital Marketing",
      description: "Strategic campaigns that drive traffic, engagement, and measurable results.",
      features: ["SEO Optimization", "Social Media", "Content Strategy", "PPC Campaigns"],
      color: "from-accent to-accent-premium"
    },
    {
      icon: Smartphone,
      title: "Tech Solutions",
      description: "Custom applications and platforms that streamline operations and enhance user experience.",
      features: ["Mobile Apps", "Custom Platforms", "API Integration", "Automation Tools"],
      color: "from-primary to-secondary"
    }
  ];

  return (
    <section id="services" className="py-20 relative">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 rounded-full glass-card mb-6">
            <span className="text-secondary text-sm font-medium">
              ⚡ Our Expertise
            </span>
          </div>
          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            Services That Drive
            <span className="block gradient-text">Success</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            From concept to launch, we provide comprehensive digital solutions 
            that help businesses thrive in the modern landscape.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {services.map((service, index) => {
            const IconComponent = service.icon;
            return (
              <div
                key={index}
                className="service-card group relative overflow-hidden"
              >
                {/* Background Gradient */}
                <div className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-5 group-hover:opacity-10 transition-opacity duration-500`} />
                
                {/* Content */}
                <div className="relative z-10">
                  {/* Icon */}
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${service.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <IconComponent className="w-8 h-8 text-white" />
                  </div>

                  {/* Title & Description */}
                  <h3 className="text-2xl font-bold mb-4 group-hover:text-secondary transition-colors duration-300">
                    {service.title}
                  </h3>
                  <p className="text-muted-foreground mb-6 leading-relaxed">
                    {service.description}
                  </p>

                  {/* Features */}
                  <ul className="space-y-3 mb-6">
                    {service.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center text-sm">
                        <div className="w-2 h-2 bg-secondary rounded-full mr-3" />
                        <span className="text-muted-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  {/* CTA */}
                  <div className="flex items-center text-secondary group-hover:text-secondary-glow transition-colors duration-300">
                    <span className="font-medium">Learn More</span>
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-2 transition-transform duration-300" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <div className="glass-card p-8 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold mb-4">
              Ready to Transform Your Business?
            </h3>
            <p className="text-muted-foreground mb-6">
              Let's discuss how our services can help you achieve your digital goals.
            </p>
            <button className="btn-hero">
              Schedule a Consultation
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;