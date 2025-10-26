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

import wealthImg from "@/assets/wealth.png";
import natashaImg from "@/assets/natasha.jpg";
import idahImg from "@/assets/idah.png";
import alexandraImg from "@/assets/alexandra.png";
import { Link } from "react-router-dom";

const About = () => {
  const choose = [
    {
      icon: <Lightbulb className="w-8 h-8" />,
      title: "Innovation First",
      description:
        "We pioneer digital solutions by embracing cutting-edge technologies and creative methodologies, setting new benchmarks in the industry while ensuring your brand stays ahead of the curve.",
    },
  ];

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
      role: "Founder & Creative Director",
      image: natashaImg,
      bio: "Visionary leader with 15+ years crafting award-winning digital experiences for Fortune 500 companies and innovative startups across Africa and beyond.",
      linkedin: "https://www.linkedin.com/in/natasha-jumbo/",
    },
    {
      name: "Operations Director",
      role: "Head of Operations",
      image: wealthImg,
      bio: "Strategic operations expert specializing in scaling creative processes and delivering exceptional client outcomes through innovative management approaches.",
      linkedin: "https://www.linkedin.com/company/nj-creative-firm/",
    },
    {
      name: "IDAH SHIDU",
      role: "Human Resources Director",
      image: idahImg,
      bio: "Dynamic HR leader fostering a culture of creativity and excellence, with expertise in talent acquisition and organizational development in the creative industry.",
      linkedin: "https://www.linkedin.com/in/idah-shidu/",
    },
    {
      name: "ALEXANDRA APPAH",
      role: "Brand Director",
      image: alexandraImg,
      bio: "Innovative brand strategist with a proven track record in developing distinctive brand identities and driving market-leading positioning strategies for diverse clients.",
      linkedin: "https://www.linkedin.com/in/alexandra-appah/",
    },
  ];

  const timeline = [
    {
      year: "2022",
      title: "Vision Ignited",
      description:
        "NJ Creative Firm was born from a revolutionary vision — to transform African businesses through world-class digital experiences and strategic branding.",
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
        <section className="py-20 relative overflow-hidden">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-5xl md:text-7xl font-serif font-bold mb-8 leading-tight">
                Crafting Digital
                <span className="block gradient-text animate-gradient italic">
                  Excellence
                </span>
                Since 2022
                <span className="block gradient-text animate-gradient italic text-base">
                  (Officially Licensed in 2024.)
                </span>
              </h1>
              <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed mb-10">
                We're a premium digital agency dedicated to transforming
                ambitious visions into extraordinary digital experiences that
                captivate, convert, and inspire.
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
                  At NJ Creative Firm, we believe every brand has a story worth
                  telling, and telling it well makes all the difference. We are
                  a dynamic branding and creative solutions agency based in
                  Lagos, Nigeria, dedicated to transforming ideas into impactful
                  visual experiences that inspire action and drive results.
                  <br />
                  <br />
                  ​Founded with a vision to help businesses stand out in a
                  competitive marketplace, NJ Creative Firm is more than just a
                  design agency; we are your strategic partner. From branding
                  and logo design to social media management, website
                  development, video production, and recruitment services, we
                  provide a one-stop creative hub where businesses can get
                  everything they need to look, sound, and perform like market
                  leaders.
                  <br />
                  <br />​ We don’t just create designs; we craft identities. We
                  don’t just post on social media; we build connections. And we
                  don’t just deliver projects; we deliver results that help you
                  grow, thrive, and succeed.
                </p>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-primary rounded-full" />
                    <span className="text-foreground">
                      Strategic thinking meets creative excellence
                    </span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-secondary rounded-full" />
                    <span className="text-foreground">
                      Technology-driven, human-centered solutions
                    </span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-accent-premium rounded-full" />
                    <span className="text-foreground">
                      Long-term partnerships, not just projects
                    </span>
                  </div>
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

        {/* new Vision */}
        <section className="py-20">
          <div className="container mx-auto px-6">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="text-4xl md:text-5xl font-serif font-bold mb-8">
                  Our Vision
                </h2>
                {choose.map((value, index) => (
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

              <div className="">
                <div className="space-y-4">
                  <h2 className="text-4xl md:text-5xl font-serif font-bold mb-8">
                    Why Choose Us
                  </h2>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-primary rounded-full" />
                    <span className="text-foreground">
                      Complete Creative Solutions in One Place
                    </span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-secondary rounded-full" />
                    <span className="text-foreground">
                      Strategy + Creativity That Delivers Results
                    </span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-accent-premium rounded-full" />
                    <span className="text-foreground">
                      Dedicated Partnership, Not Just a Service
                    </span>
                  </div>
                </div>
              </div>
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
                      <p className="text-sm text-foreground leading-relaxed mb-4">
                        {member.bio}
                      </p>
                      <a
                        href={member.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-sm text-white bg-[#0077b5] hover:bg-[#0077b5]/90 px-4 py-2 rounded-full transition-colors"
                      >
                        <Linkedin className="w-4 h-4" />
                        Connect on LinkedIn
                      </a>
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
