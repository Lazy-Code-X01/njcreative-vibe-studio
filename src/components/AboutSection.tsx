import { Target, Users, Lightbulb, Award } from "lucide-react";

const AboutSection = () => {
  const values = [
    {
      icon: Target,
      title: "Results-Driven",
      description: "Every project is measured by its impact on your business goals and growth."
    },
    {
      icon: Users,
      title: "Client-Centric",
      description: "Your success is our priority. We build long-term partnerships, not just projects."
    },
    {
      icon: Lightbulb,
      title: "Innovation First",
      description: "We stay ahead of trends to deliver cutting-edge solutions that future-proof your business."
    },
    {
      icon: Award,
      title: "Quality Excellence",
      description: "Meticulous attention to detail ensures every deliverable exceeds industry standards."
    }
  ];

  return (
    <section id="about" className="py-20">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 rounded-full glass-card mb-6">
            <span className="text-secondary text-sm font-medium">
              💡 About Us
            </span>
          </div>
          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            Transforming Ideas Into
            <span className="block gradient-text">Digital Reality</span>
          </h2>
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
          {/* Left: Story */}
          <div>
            <h3 className="text-3xl font-bold mb-6">
              Where Creativity Meets Technology
            </h3>
            <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
              Founded with a vision to bridge the gap between creative excellence and 
              technical innovation, NJ Creative Firm has become a trusted partner for 
              businesses ready to make their mark in the digital world.
            </p>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              We believe that great digital experiences are born from the perfect 
              blend of strategy, creativity, and technology. Our team of passionate 
              designers, developers, and strategists work collaboratively to turn 
              your boldest ideas into reality.
            </p>
            
            {/* Stats */}
            <div className="grid grid-cols-2 gap-6">
              <div>
                <div className="text-3xl font-bold text-secondary mb-2">5+</div>
                <div className="text-sm text-muted-foreground">Years of Excellence</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-secondary mb-2">150+</div>
                <div className="text-sm text-muted-foreground">Successful Projects</div>
              </div>
            </div>
          </div>

          {/* Right: Team Highlight */}
          <div className="glass-card p-8">
            <div className="text-center mb-6">
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary to-secondary mx-auto mb-4 flex items-center justify-center">
                <span className="text-2xl font-bold text-white">NJ</span>
              </div>
              <h4 className="text-xl font-bold mb-2">Founded by Visionaries</h4>
              <p className="text-muted-foreground">
                "We started NJ Creative Firm to help businesses realize their full 
                potential in the digital landscape. Every project is an opportunity 
                to create something extraordinary."
              </p>
            </div>
            
            <div className="border-t border-border pt-6">
              <div className="text-center">
                <div className="font-semibold text-secondary mb-1">Leadership Team</div>
                <div className="text-sm text-muted-foreground">
                  Creative Directors & Tech Innovators
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Values Grid */}
        <div>
          <h3 className="text-3xl font-bold text-center mb-12">
            What Drives Us Forward
          </h3>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => {
              const IconComponent = value.icon;
              return (
                <div key={index} className="text-center group">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-secondary mx-auto mb-6 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <IconComponent className="w-8 h-8 text-white" />
                  </div>
                  <h4 className="text-xl font-bold mb-3 group-hover:text-secondary transition-colors duration-300">
                    {value.title}
                  </h4>
                  <p className="text-muted-foreground leading-relaxed">
                    {value.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center mt-20">
          <div className="glass-card p-8 max-w-3xl mx-auto">
            <h3 className="text-2xl font-bold mb-4">
              Ready to Work Together?
            </h3>
            <p className="text-muted-foreground mb-6">
              Let's create something amazing together. We're excited to learn about 
              your project and show you how we can help bring your vision to life.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="btn-hero">
                Start a Project
              </button>
              <button className="btn-secondary">
                Meet Our Team
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;