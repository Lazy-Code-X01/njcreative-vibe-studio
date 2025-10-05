import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { ArrowRight, Users, Target, Award, Lightbulb } from "lucide-react";

import wealthImg from '@/assets/wealth.png'
import natashaImg from '@/assets/natasha.jpg'
import idahImg from '@/assets/idah.png'
import alexandraImg from '@/assets/alexandra.png'
import { Link } from "react-router-dom";

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
      name: "NATASHA  JUMBO",
      role: "Founder & Creative Director",
      image: natashaImg,
      bio: "15+ years crafting digital experiences for Fortune 500 companies and innovative startups."
    },
    {
      name: "Operations Director",
      role: "Head of Operations",
      image: wealthImg,
      bio: "Experienced operator with expertise in process optimization and organizational efficiency."
    },
    {
      name: "IDAH SHIDU",
      role: "Human Resources Director",
      image: idahImg,
      bio: "People-focused leader with expertise in talent management and organizational development."
    },
    {
      name: "ALEXANDRA APPAH",
      role: "Brand Director",
      image: alexandraImg,
      bio: "Strategic brand leader with expertise in identity development and market positioning."
    },
  ];

  const timeline = [
    { year: "2016", title: "Founded", description: "Started with a vision to revolutionize digital experiences" },
    { year: "2018", title: "Growth", description: "Expanded team and capabilities, serving 50+ clients" },
    { year: "2020", title: "Innovation", description: "Launched proprietary design system and development framework" },
    { year: "2022", title: "Recognition", description: " Vision Ignited The idea for NJ Creative Firm was born — a vision to transform ideas into powerful branding and creative experiences." },
    { year: "2023", title: "Genesis", description: " 2023 – Building the Foundation Took bold steps by delivering projects, testing strategies, and developing the groundwork for what would become a registered creative powerhouse." },
    { year: "2024", title: "Breakthrough", description: "Official Breakthrough NJ Creative Firm officially became a licensed business, offering professional services in branding, design, recruitment, and digital solutions." },
    { year: "2025", title: "Vision", description: "The Future Continuing to push boundaries in branding, design, and recruitment, expanding globally to impact businesses and individuals." }
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
                Since 2022
                <span className="block gradient-text animate-gradient italic">
                  But licensed in 2024
                </span>
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

        {/* Mission Section */}
<section className="py-20">
  <div className="container mx-auto px-6">
    <div className="grid lg:grid-cols-2 gap-16 items-start">
      
      {/* Left side: Mission text */}
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
        <ul className="space-y-3 text-foreground font-medium">
          <li>Strategic thinking meets creative excellence</li>
          <li>Technology-driven, human-centered solutions</li>
          <li>Long-term partnerships, not just projects</li>
        </ul>
      </div>

      {/* Right side: 4 Values */}
      <div className="grid grid-cols-2 gap-6">
        {[
          {
            icon: Lightbulb,
            title: "Innovation First",
            description:
              "We push boundaries and embrace cutting-edge technologies to deliver solutions that set new industry standards."
          },
          {
            icon: Target,
            title: "Results Driven",
            description:
              "Every project is measured by its impact on your business goals and the tangible results it delivers."
          },
          {
            icon: Users,
            title: "Client Partnership",
            description:
              "We believe in building long-term relationships based on trust, transparency, and mutual success."
          },
          {
            icon: Award,
            title: "Excellence Always",
            description:
              "Our commitment to quality and attention to detail ensures every deliverable exceeds expectations."
          }
        ].map((value, index) => (
          <div
            key={index}
            className="glass-card p-6 hover:scale-105 transition-all duration-300 text-center"
          >
            <div className="text-3xl mb-3">
  <value.icon className="w-8 h-8 mx-auto text-green-500" />
</div>
            <h3 className="font-heading font-bold text-lg mb-3">{value.title}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {value.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  </div>
</section>

{/* Vision Section (separate, full width) */}
<section className="py-20 bg-muted/20">
  <div className="container mx-auto px-6 text-center">
    <div className="max-w-4xl mx-auto">
      <h2 className="text-4xl md:text-5xl font-serif font-bold mb-8">
        Our Vision
      </h2>
      <p className="text-lg text-muted-foreground leading-relaxed">
        To become a global force for creativity and innovation by empowering businesses and individuals with transformative digital solutions. We aim to build brands that transcend cultural and geographical boundaries, spark meaningful connections, and inspire lasting change. Through a relentless pursuit of excellence, integrity, and impact, we envision a future where our work not only drives growth but also shapes industries, uplifts communities, and leaves a legacy of innovation for generations to come.
      </p>
    </div>
  </div>
</section>





        {/* Team Section */}
        <section className="py-20 bg-card" id="team">
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
                Milestones that define our creativity, growth, and vision

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
            <Link to="/contact">
              <Button className="btn-luxury group text-lg px-10 py-5">
                Start a Project
                <ArrowRight className="ml-3 w-5 h-5 group-hover:translate-x-2 transition-transform" />
                </Button>
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default About;