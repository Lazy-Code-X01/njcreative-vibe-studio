import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { ArrowRight, Users, Target, Award, Lightbulb } from "lucide-react";

const About = () => {
  const values = [
    {
      icon: <Lightbulb className="w-8 h-8" />,
      title: "Innovation First",
      description: "We push boundaries and embrace cutting-edge technologies to deliver solutions that set new industry standards."
    },
    {
      icon: <Target className="w-8 h-8" />,
      title: "Results Driven",
      description: "Every project is measured by its impact on your business goals and the tangible results it delivers."
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Client Partnership",
      description: "We believe in building long-term relationships based on trust, transparency, and mutual success."
    },
    {
      icon: <Award className="w-8 h-8" />,
      title: "Excellence Always",
      description: "Our commitment to quality and attention to detail ensures every deliverable exceeds expectations."
    }
  ];

  const team = [
    {
      name: "Michael Chen",
      role: "Founder & Creative Director",
      image: "/api/placeholder/400/400",
      bio: "15+ years crafting digital experiences for Fortune 500 companies and innovative startups."
    },
    {
      name: "Sarah Johnson",
      role: "Head of Strategy",
      image: "/api/placeholder/400/400",
      bio: "Former consultant with expertise in digital transformation and brand positioning."
    },
    {
      name: "David Rodriguez",
      role: "Lead Developer",
      image: "/api/placeholder/400/400",
      bio: "Full-stack expert specializing in scalable web applications and modern frameworks."
    },
    {
      name: "Emily Watson",
      role: "Brand Designer",
      image: "/api/placeholder/400/400",
      bio: "Award-winning designer creating memorable visual identities for premium brands."
    }
  ];

  const timeline = [
    { year: "2016", title: "Founded", description: "Started with a vision to revolutionize digital experiences" },
    { year: "2018", title: "Growth", description: "Expanded team and capabilities, serving 50+ clients" },
    { year: "2020", title: "Innovation", description: "Launched proprietary design system and development framework" },
    { year: "2022", title: "Recognition", description: "Won multiple industry awards and recognition" },
    { year: "2024", title: "Future", description: "Continuing to push boundaries in luxury digital experiences" }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="pt-24">
        {/* Hero Section */}
        <section className="py-20 relative overflow-hidden">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-5xl md:text-7xl font-serif font-bold mb-8 leading-tight">
                Crafting Digital
                <span className="block gradient-text animate-gradient italic">
                  Excellence
                </span>
                Since 2016
              </h1>
              <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed mb-10">
                We're a premium digital agency dedicated to transforming ambitious visions 
                into extraordinary digital experiences that captivate, convert, and inspire.
              </p>
              <Button className="btn-luxury group text-lg px-10 py-5">
                Our Story
                <ArrowRight className="ml-3 w-5 h-5 group-hover:translate-x-2 transition-transform" />
              </Button>
            </div>
          </div>
          
          {/* Background Elements */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-1/4 -left-32 w-64 h-64 rounded-full bg-primary/5 blur-3xl" />
            <div className="absolute bottom-1/4 -right-32 w-96 h-96 rounded-full bg-secondary/5 blur-3xl" />
          </div>
        </section>

        {/* Mission & Values */}
        <section className="py-20">
          <div className="container mx-auto px-6">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="text-4xl md:text-5xl font-serif font-bold mb-8">
                  Our Mission
                </h2>
                <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                  To empower businesses with premium digital solutions that not only meet 
                  today's demands but anticipate tomorrow's opportunities. We believe that 
                  exceptional design and strategic thinking can transform any brand into 
                  a market leader.
                </p>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-primary rounded-full" />
                    <span className="text-foreground">Strategic thinking meets creative excellence</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-secondary rounded-full" />
                    <span className="text-foreground">Technology-driven, human-centered solutions</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-accent-premium rounded-full" />
                    <span className="text-foreground">Long-term partnerships, not just projects</span>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-6">
                {values.map((value, index) => (
                  <div key={index} className="glass-card p-6 hover:scale-105 transition-all duration-300">
                    <div className="text-primary mb-4">{value.icon}</div>
                    <h3 className="font-heading font-bold text-lg mb-3">{value.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{value.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-20 bg-card">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-serif font-bold mb-6">
                Meet Our Team
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                A collective of passionate creators, strategists, and innovators 
                united by our commitment to digital excellence.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {team.map((member, index) => (
                <div key={index} className="group cursor-pointer">
                  <div className="relative overflow-hidden rounded-2xl mb-6">
                    <img 
                      src={member.image} 
                      alt={member.name}
                      className="w-full h-80 object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <p className="text-sm text-foreground leading-relaxed">{member.bio}</p>
                    </div>
                  </div>
                  <h3 className="font-heading font-bold text-xl mb-2 group-hover:text-primary transition-colors">
                    {member.name}
                  </h3>
                  <p className="text-muted-foreground">{member.role}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Timeline */}
        <section className="py-20">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-serif font-bold mb-6">
                Our Journey
              </h2>
              <p className="text-xl text-muted-foreground">
                Milestones that define our commitment to excellence
              </p>
            </div>
            
            <div className="relative">
              <div className="absolute left-1/2 transform -translate-x-1/2 w-0.5 h-full bg-gradient-to-b from-primary via-secondary to-accent-premium" />
              
              {timeline.map((item, index) => (
                <div key={index} className={`relative flex items-center mb-16 ${
                  index % 2 === 0 ? 'justify-start' : 'justify-end'
                }`}>
                  <div className={`w-5/12 ${index % 2 === 0 ? 'text-right pr-8' : 'text-left pl-8'}`}>
                    <div className="glass-card p-6 hover:scale-105 transition-all duration-300">
                      <div className="text-3xl font-black text-primary mb-2 font-heading">{item.year}</div>
                      <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                      <p className="text-muted-foreground">{item.description}</p>
                    </div>
                  </div>
                  
                  <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-primary rounded-full border-4 border-background" />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-primary/10 via-secondary/10 to-accent-premium/10">
          <div className="container mx-auto px-6 text-center">
            <h2 className="text-4xl md:text-5xl font-serif font-bold mb-8">
              Ready to Work Together?
            </h2>
            <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
              Let's discuss how we can help elevate your digital presence 
              and achieve your business objectives.
            </p>
            <Button className="btn-luxury group text-lg px-10 py-5">
              Start a Project
              <ArrowRight className="ml-3 w-5 h-5 group-hover:translate-x-2 transition-transform" />
            </Button>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default About;