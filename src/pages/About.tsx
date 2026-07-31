import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  Users,
  Target,
  Award,
  Lightbulb,
  Linkedin,
} from "lucide-react";
import SEO from "@/components/SEO";
import FloatingElements from "@/components/FloatingElements";
import MouseInteractive from "@/components/MouseInteractive";

import wealthImg from "@/assets/wealth-favour.jpeg";
import natashaImg from "@/assets/ceo-img.jpeg";
import idahImg from "@/assets/IdahShidu.jpeg";
import alexandraImg from "@/assets/alexandra-aprah.jpeg";
import { Link } from "react-router-dom";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const About = () => {
  const heroRef = useScrollReveal({ threshold: 0.1 });
  const storyRef = useScrollReveal({ threshold: 0.2, delay: 0.2 });
  const valuesRef = useScrollReveal({ threshold: 0.2, delay: 0.3 });
  const teamRef = useScrollReveal({ threshold: 0.2, delay: 0.2 });
  const timelineRef = useScrollReveal({ threshold: 0.2, delay: 0.3 });
  
  const values = [
    {
      icon: <Lightbulb className="w-8 h-8" />,
      title: "Innovation First",
      description:
        "Creative Excellence and Global Impact. We pioneer digital solutions by embracing cutting-edge technologies and creative methodologies, setting new benchmarks in the industry while ensuring your brand stays ahead of the curve.",
    },
    {
      icon: <Target className="w-8 h-8" />,
      title: "Results Driven",
      description:
        "Success is measured in real business impact. We focus on delivering tangible outcomes that drive growth, enhance market position, and generate measurable ROI for your business.",
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Client Partnership",
      description:
        "Beyond service providers, we're your strategic allies. We build enduring partnerships founded on transparency, trust, and a shared commitment to achieving extraordinary results.",
    },
    {
      icon: <Award className="w-8 h-8" />,
      title: "Excellence Always",
      description:
        "Quality is non-negotiable. Our meticulous attention to detail and commitment to excellence ensures every deliverable not only meets but exceeds industry standards and client expectations.",
    },
  ];

  const team = [
    {
      name: "NATASHA JUMBO",
      role: "Founder & CEO",
      image: natashaImg,
      bio: "Visioneer leader with 10+ years crafting award-winning creative and charitable experiences for Fortune 100+ companies and innovative startups across Africa and beyond.",
      linkedin:
        "https://www.linkedin.com/in/natasha-jumbo?utm_source=share_via&utm_content=profile&utm_medium=member_ios",
    },
    {
      name: "WEALTH FAVOUR",
      role: "Executive Director (Head of Operations)",
      image: wealthImg,
      bio: "Strategic operations lead focused on optimizing workflows, managing teams, and delivering consistent results through efficient creative processes.",
      linkedin:
        "https://www.linkedin.com/in/wealth-jumbo-58b767263?utm_source=share_via&utm_content=profile&utm_medium=member_ios",
    },
    {
      name: "IDAH SHIDU",
      role: "Non-Executive Director",
      image: idahImg,
      bio: "Experienced business strategist providing governance, direction, and mentorship to ensure sustainable growth and innovation across all departments.",
      linkedin:
        "https://www.linkedin.com/in/sheidu-i-20b525195?utm_source=share_via&utm_content=profile&utm_medium=member_ios",
    },
    {
      name: "ALEXANDRA APPAH",
      role: "Brand Director",
      image: alexandraImg,
      bio: "Creative strategist specializing in developing distinctive brand identities, ensuring design excellence, and maintaining a unified creative vision for all clients.",
      linkedin:
        "https://www.linkedin.com/in/alexandra-appah-568132315?utm_source=share_via&utm_content=profile&utm_medium=member_ios",
    },
  ];

  const timeline = [
    {
      year: "2022",
      title: "Vision Ignited",
      description:
        "NJ Creative Firm was born from a revolutionary vision to transform African businesses through world-class digital experiences and strategic branding.",
    },
    {
      year: "2023",
      title: "Building the Foundation",
      description:
        "Established our core services, delivered groundbreaking projects, and built a framework for excellence that would redefine creative solutions in Nigeria.",
    },
    {
      year: "2024",
      title: "Official Breakthrough",
      description:
        "Achieved official registration and rapidly expanded our service portfolio, becoming a full-spectrum digital powerhouse in branding, design, recruitment, and innovative solutions.",
    },
    {
      year: "2025",
      title: "Global Expansion",
      description:
        "Expanding our impact across Africa and beyond, setting new standards in digital excellence and helping businesses achieve unprecedented growth through our services.",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="About Us"
        description="Learn about NJ Creative Firm's journey, our passionate team, and our commitment to delivering exceptional digital solutions that drive business growth."
        keywords="about us, creative agency, digital team, Lagos agency, brand strategy"
      />
      <Navigation />

      <main className="pt-24">
        {/* Hero Section */}
        <section className="py-20 relative overflow-hidden" ref={heroRef}>
          <FloatingElements />
          <div className="container mx-auto px-6 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <p className="text-sm text-muted-foreground tracking-widest uppercase mb-6 font-medium">
                Est. 2022 · Officially Licensed 2024
              </p>
              <h1 className="text-5xl md:text-7xl font-serif font-bold mb-8 leading-tight">
                Crafting Digital
                <span className="block gradient-text italic">
                  Excellence
                </span>
              </h1>
              <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed mb-10">
                We're a premium digital agency dedicated to transforming
                ambitious visions into extraordinary digital experiences that
                captivate, convert, and inspire.
              </p>
              <Button
                onClick={() => {
                  document
                    .getElementById("journey")
                    ?.scrollIntoView({ behavior: "smooth" });
                }}
                className="btn-luxury group text-lg px-10 py-5 transition-all"
              >
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

        {/* Our Story Section */}
        <section className="py-20" ref={storyRef}>
          <div className="container mx-auto px-6">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="text-4xl md:text-5xl font-serif font-bold mb-8">
                  Our Mission
                </h2>
                <div className="space-y-5 text-lg text-muted-foreground leading-relaxed mb-8">
                  <p>
                    At NJ Creative Firm, we believe every brand has a story worth
                    telling, and telling it well makes all the difference. We are
                    a dynamic branding and creative solutions agency based in
                    Lagos, Nigeria, dedicated to transforming ideas into impactful
                    visual experiences that inspire action and drive results.
                  </p>
                  <p>
                    Founded with a vision to help businesses stand out in a
                    competitive marketplace, NJ Creative Firm is more than just a
                    design agency — we are your strategic partner. From branding
                    and logo design to social media management, website
                    development, video production, and recruitment services, we
                    provide a one-stop creative hub.
                  </p>
                  <p>
                    We don’t just create designs; we craft identities. We don’t
                    just post on social media; we build connections. And we don’t
                    just deliver projects; we deliver results.
                  </p>
                </div>
                <div className="space-y-3">
                  {[
                    "Strategic thinking meets creative excellence",
                    "Technology-driven, human-centered solutions",
                    "Long-term partnerships, not just projects",
                  ].map((item, i) => (
                    <div key={i} className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-primary rounded-full shrink-0" />
                      <span className="text-foreground">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {values.map((value, index) => (
                  <div
                    key={index}
                    className="glass-card p-6 hover:scale-105 transition-all duration-300"
                  >
                    <div className="text-primary mb-4">{value.icon}</div>
                    <h3 className="font-heading font-bold text-lg mb-3">
                      {value.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {value.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Vision & Why Choose Us */}
        <section className="py-20" ref={teamRef}>
          <div className="container mx-auto px-6">
            <div className="grid lg:grid-cols-2 gap-16 items-start">
              {/* Vision */}
              <div>
                <h2 className="text-4xl md:text-5xl font-serif font-bold mb-6">
                  Our Vision
                </h2>
                <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                  To become Africa's most trusted creative and digital
                  solutions partner — pioneering world-class experiences that
                  help businesses grow, stand out, and make a lasting impact
                  on the global stage.
                </p>
                <div className="glass-card p-6 border-l-2 border-primary">
                  <div className="text-primary mb-3">
                    <Lightbulb className="w-7 h-7" />
                  </div>
                  <h3 className="font-bold text-lg mb-2">Innovation First</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    We pioneer digital solutions by embracing cutting-edge
                    technologies and creative methodologies, setting new
                    benchmarks while ensuring your brand stays ahead of the curve.
                  </p>
                </div>
              </div>

              {/* Why Choose Us */}
              <div>
                <h2 className="text-4xl md:text-5xl font-serif font-bold mb-6">
                  Why Choose Us
                </h2>
                <div className="space-y-4">
                  {[
                    {
                      icon: <Target className="w-5 h-5 text-primary" />,
                      title: "Complete Creative Solutions in One Place",
                      desc: "From branding to web development, marketing to recruitment — everything under one roof.",
                    },
                    {
                      icon: <Award className="w-5 h-5 text-primary" />,
                      title: "Strategy + Creativity That Delivers Results",
                      desc: "We combine strategic thinking with creative execution to produce measurable business outcomes.",
                    },
                    {
                      icon: <Users className="w-5 h-5 text-primary" />,
                      title: "Dedicated Partnership, Not Just a Service",
                      desc: "We invest in your long-term success, building relationships that go well beyond the project.",
                    },
                  ].map((item, i) => (
                    <div key={i} className="glass-card p-5 flex gap-4 items-start">
                      <div className="mt-0.5 shrink-0">{item.icon}</div>
                      <div>
                        <h4 className="font-semibold mb-1">{item.title}</h4>
                        <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-20 bg-card" id="team" ref={valuesRef}>
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
              {team.map((member, index) => {
                const zoomed = new Set([
                  "NATASHA JUMBO",
                  "WEALTH FAVOUR",
                  "ALEXANDRA APPAH",
                ]).has(member.name);

                return (
                  <div key={index} className="group glass-card overflow-hidden p-0">
                    {/* Image */}
                    <div className="relative overflow-hidden">
                      <img
                        src={member.image}
                        alt={member.name}
                        className={`w-full h-72 object-cover transition-transform duration-500 group-hover:scale-110 ${
                          zoomed ? "scale-107" : ""
                        }`}
                        style={{ objectPosition: "center 10%" }}
                      />
                      {/* LinkedIn overlay */}
                      <div className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <a
                          href={member.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 text-sm text-white bg-[#0077b5] hover:bg-[#0077b5]/90 px-4 py-2 rounded-full transition-colors"
                        >
                          <Linkedin className="w-4 h-4" />
                          Connect
                        </a>
                      </div>
                    </div>

                    {/* Info */}
                    <div className="p-5">
                      <h3 className="font-heading font-bold text-base mb-1 group-hover:text-primary transition-colors">
                        {member.name}
                      </h3>
                      <p className="text-primary text-sm font-medium mb-3">{member.role}</p>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {member.bio}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Timeline */}
        <section className="py-20 relative" id="journey" ref={timelineRef}>
          <MouseInteractive />
          <div className="container mx-auto px-6 relative z-10">
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
                <div
                  key={index}
                  className={`relative flex items-center mb-16 ${
                    index % 2 === 0 ? "justify-start" : "justify-end"
                  }`}
                >
                  <div
                    className={`lg:w-5/12 w-10/12 ${
                      index % 2 === 0 ? "text-right pr-8" : "text-left pl-8"
                    }`}
                  >
                    <div className="glass-card p-6 hover:scale-105 transition-all duration-300">
                      <div className="text-3xl font-black text-primary mb-2 font-heading">
                        {item.year}
                      </div>
                      <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                      <p className="text-muted-foreground">
                        {item.description}
                      </p>
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
              Ready to Transform Your Digital Presence?
            </h2>
            <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
              Partner with Nigeria's leading creative firm to elevate your
              brand, accelerate growth, and achieve unprecedented digital
              success in today's competitive landscape.
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
