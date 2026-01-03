import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  Code,
  Palette,
  TrendingUp,
  Cog,
  Check,
} from "lucide-react";
import SEO from "@/components/SEO";
import FloatingElements from "@/components/FloatingElements";
import { useScrollReveal } from "@/hooks/useScrollReveal";

// Service Item Component with scroll reveal
interface ServiceItemProps {
  service: {
    id: string;
    icon: React.ReactNode;
    title: string;
    subtitle: string;
    description: string;
    features: string[];
    technologies: string[];
    startingPrice: string;
    image: string;
  };
  index: number;
}

const ServiceItem = ({ service, index }: ServiceItemProps) => {
  const { ref } = useScrollReveal({
    threshold: 0.15,
    rootMargin: "0px",
    delay: index * 0.1,
    distance: "50px",
    duration: "0.8s",
  });

  return (
    <div
      ref={ref}
      id={service.id}
      className={`grid lg:grid-cols-2 gap-12 items-center scroll-mt-24 ${
        index % 2 === 1 ? "lg:grid-flow-col-dense" : ""
      }`}
    >
      <div className={index % 2 === 1 ? "lg:col-start-2" : ""}>
        <div className="glass-card p-8 hover:scale-105 transition-all duration-500">
          <div className="text-primary mb-6">{service.icon}</div>
          <span className="text-sm text-muted-foreground tracking-wider uppercase font-medium">
            {service.subtitle}
          </span>
          <h2 className="text-4xl font-serif font-bold mb-4 mt-2">
            {service.title}
          </h2>
          <p className="text-muted-foreground mb-8 leading-relaxed">
            {service.description}
          </p>

          <div className="space-y-3 mb-8">
            {service.features.map((feature, idx) => (
              <div key={idx} className="flex items-center space-x-3">
                <Check className="w-5 h-5 text-primary flex-shrink-0" />
                <span className="text-foreground">{feature}</span>
              </div>
            ))}
          </div>

          <div className="mb-8">
            <h4 className="font-semibold mb-3">Technologies We Use:</h4>
            <div className="flex flex-wrap gap-2">
              {service.technologies.map((tech, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <span className="text-sm text-muted-foreground">Starting at</span>
              <div className="text-2xl font-bold text-primary">
                {service.startingPrice}
              </div>
            </div>
            <Button className="btn-luxury group">
              Get Started
              <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </div>
      </div>

      <div className={index % 2 === 1 ? "lg:col-start-1" : ""}>
        <div className="relative w-full">
          <img
            src={service.image}
            alt={service.title}
            className="w-full h-auto object-contain rounded-2xl"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-2xl pointer-events-none" />
        </div>
      </div>
    </div>
  );
};

const Services = () => {
  // Handle initial hash navigation
  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      const id = hash.replace("#", "");
      const element = document.getElementById(id);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: "smooth" });
        }, 100);
      }
    }
  }, []);

  const services = [
    {
      id: "branding",
      icon: <Palette className="w-12 h-12" />,
      title: "Branding & Rebranding",
      subtitle: "Memorable, Strategic, Impactful",
      description:
        "Crafting identities that communicate value and complete brand identity systems that capture your essence and resonate with your target audience.",
      features: [
        "Brand Strategy & Positioning",
        "Logo & Visual Identity Design",
        "Brand Guidelines & Systems",
        "Marketing Collateral Design",
        "Packaging & Print Design",
        "Digital Asset Creation",
      ],
      technologies: ["Adobe Creative Suite", "Figma", "Sketch", "Principle"],
      startingPrice: "$3,000",
      image: "/uploads/services/branding-rebranding.jpg",
    },
    {
      id: "printing-and-banners",
      icon: <Palette className="w-12 h-12" />,
      title: "Printing and Banners",
      subtitle: "Distinct visuals that define your brand.",
      description:
        "We create eye-catching banners and print designs that resonate with your target audience.",
      features: [
        "Banner Design",
        "Flyers & Brochures",
        "Business Cards",
        "Packaging & Print Design",
      ],
      technologies: ["Adobe Illustrator", "Adobe Photoshop", "InDesign"],
      startingPrice: "$3,000",
      image: "/uploads/services/printing-banners.jpg",
    },
    {
      id: "web-development",
      icon: <Code className="w-12 h-12" />,
      title: "Website Design & Development",
      subtitle: "Responsive, sleek, and conversion-driven websites.",
      description:
        "Custom websites and web applications built with cutting-edge technologies that scale with your business growth.",
      features: [
        "Responsive Design & Development",
        "E-commerce Solutions",
        "Progressive Web Apps (PWA)",
        "API Integration & Development",
        "Performance Optimization",
        "SEO-Ready Architecture",
      ],
      technologies: [
        "React",
        "Next.js",
        "Node.js",
        "TypeScript",
        "Tailwind CSS",
      ],
      startingPrice: "$5,000",
      image: "/uploads/services/web-development.jpg",
    },
    {
      id: "ui-ux",
      icon: <TrendingUp className="w-12 h-12" />,
      title: "UI/UX Design",
      subtitle: "User-centered interfaces that boost engagement.",
      description:
        "Strategic digital marketing campaigns that drive engagement, conversions, and sustainable growth.",
      features: [
        "User-Centered Design",
        "Wireframing & Prototyping",
        "Interaction Design",
        "Information Architecture",
        "Visual Design",
      ],
      technologies: ["Figma", "Sketch", "Adobe XD", "InVision"],
      startingPrice: "$2,500/mo",
      image: "/uploads/services/ui-ux-design.jpg",
    },
    {
      id: "design-for-media",
      icon: <TrendingUp className="w-12 h-12" />,
      title: "Ads management for media and Google",
      subtitle: "Strategy, content, and analytics for digital presence.",
      description:
        "We manage ads for Google, Facebook, Instagram, LinkedIn, and YouTube to ensure your brand is visible and reaching your target audience.",
      features: [
        "Ad Campaign Management",
        "Ad Optimization",
        "Ad Targeting",
        "Ad Creative Development",
      ],
      technologies: [
        "Google Analytics",
        "SEMrush",
        "Mailchimp",
        "Facebook Ads",
      ],
      startingPrice: "$2,500/mo",
      image: "/uploads/services/ads-management.jpg",
    },
    {
      id: "marketing",
      icon: <TrendingUp className="w-12 h-12" />,
      title: "Digital Marketing & Advertisment",
      subtitle: "Targeted campaigns that deliver measurable ROI.",
      description:
        "Strategic digital marketing campaigns that drive engagement, conversions, and sustainable growth.",
      features: [
        "SEO & Content Strategy",
        "Social Media Marketing",
        "Pay-Per-Click Advertising",
        "Email Marketing Automation",
        "Analytics & Reporting",
        "Conversion Optimization",
      ],
      technologies: [
        "Google Analytics",
        "SEMrush",
        "Mailchimp",
        "Facebook Ads",
      ],
      startingPrice: "$2,500/mo",
      image: "/uploads/services/digital-marketing.jpg",
    },
    {
      id: "tech-solutions",
      icon: <Cog className="w-12 h-12" />,
      title: "Tech Solutions",
      subtitle: "Custom, Scalable, Innovative",
      description:
        "Bespoke technology solutions including mobile apps, automation systems, and enterprise platforms.",
      features: [
        "Mobile App Development",
        "Custom Software Solutions",
        "System Integration",
        "Process Automation",
        "Cloud Solutions",
        "Technical Consulting",
      ],
      technologies: ["React Native", "Python", "AWS", "Docker", "PostgreSQL"],
      startingPrice: "$10,000",
      image: "/uploads/services/tech-solutions.jpg",
    },
    {
      id: "ai-generation",
      icon: <Cog className="w-12 h-12" />,
      title: "AI Generation",
      subtitle: "Innovative AI-Driven Solutions",
      description:
        "We leverage cutting-edge AI technologies to generate compelling content that engages and converts visitors.",
      features: [
        "AI-Driven Content Creation",
        "AI-Powered Writing Assistance",
        "AI-Inspired Storytelling",
        "AI-Enhanced Creativity",
      ],
      technologies: [
        "AI",
        "Machine Learning",
        "Natural Language Processing",
        "Generative AI",
      ],
      startingPrice: "$10,000",
      image: "/uploads/services/ai-generation.jpg",
    },
    {
      id: "video-production",
      icon: <Cog className="w-12 h-12" />,
      title: "Video Production",
      subtitle: "Engaging visuals that elevate brand emotion.",
      description:
        "Bespoke technology solutions including mobile apps, automation systems, and enterprise platforms.",
      features: [
        "Video Editing",
        "Motion Graphics",
        "VFX & VFX Compositing",
        "Animation & Motion Design",
        "Color Grading & Correction",
      ],
      technologies: ["Adobe Premiere Pro", "Final Cut Pro", "After Effects"],
      startingPrice: "$10,000",
      image: "/uploads/services/video-production.jpg",
    },
    {
      id: "recruitment-talent",
      icon: <Cog className="w-12 h-12" />,
      title: "Recruitment Services",
      subtitle: "Talent Acquisition & Hiring",
      description:
        "We help you find the right talent for your business. We offer a range of services to help you attract, hire, and retain top talent.",
      features: [
        "Talent Acquisition",
        "Talent Hiring",
        "Talent Retention",
        "Talent Development",
        "Employer Branding",
      ],
      technologies: ["LinkedIn Recruiter", "Indeed", "Glassdoor"],
      startingPrice: "$10,000",
      image: "/uploads/services/recruitment-services.jpg",
    },
    {
      id: "seo",
      icon: <Cog className="w-12 h-12" />,
      title: "SEO (Search Engine Optimization)",
      subtitle: "– Visibility through strategy and ranking.",
      description:
        "We help you optimize your website for search engines and drive organic traffic to your site.",
      features: [
        "Keyword Research",
        "On-Page Optimization",
        "Off-Page Optimization",
        "Content Marketing",
      ],
      technologies: ["Google Analytics", "SEMrush", "Ahrefs"],
      startingPrice: "$1,500/mo",
      image: "/uploads/services/seo.jpg",
    },
  ];

  const process = [
    {
      step: "01",
      title: "Discovery",
      description:
        "We dive deep into your business goals, target audience, and competitive landscape.",
    },
    {
      step: "02",
      title: "Strategy",
      description:
        "Our team develops a comprehensive strategy tailored to your specific needs and objectives.",
    },
    {
      step: "03",
      title: "Design",
      description:
        "We create stunning visuals and user experiences that align with your brand identity.",
    },
    {
      step: "04",
      title: "Development",
      description:
        "Our developers bring the designs to life with clean, scalable, and optimized code.",
    },
    {
      step: "05",
      title: "Launch",
      description:
        "We ensure a smooth launch with thorough testing and performance optimization.",
    },
    {
      step: "06",
      title: "Growth",
      description:
        "Post-launch support and continuous optimization to maximize your ROI.",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="Our Services"
        description="Explore our comprehensive range of digital services including web development, branding, marketing, and tech solutions tailored for your business success."
        keywords="digital services, web development, branding, marketing, tech solutions"
      />
      <Navigation />

      <main className="pt-24">
        {/* Hero Section */}
        <section className="py-20 relative overflow-hidden">
          <FloatingElements />
          <div className="container mx-auto px-6 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-5xl md:text-7xl font-serif font-bold mb-8 leading-tight">
                Premium Digital
                <span className="block gradient-text animate-gradient italic">
                  Services
                </span>
                That Deliver Results
              </h1>
              <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed mb-10">
                From concept to completion, we provide end-to-end digital
                solutions that elevate your brand and drive measurable business
                growth.
              </p>
            </div>
          </div>
        </section>

        {/* Services Grid */}
        <section className="py-20">
          <div className="container mx-auto px-6">
            <div className="space-y-20">
              {services.map((service, index) => (
                <ServiceItem key={service.id} service={service} index={index} />
              ))}
            </div>
          </div>
        </section>

        {/* Process Section */}
        <section className="py-20 bg-card">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-serif font-bold mb-6">
                Our Process
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                A proven methodology that ensures every project delivers
                exceptional results and exceeds your expectations.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {process.map((item, index) => (
                <div key={index} className="relative group">
                  <div className="glass-card p-8 h-full hover:scale-105 transition-all duration-300">
                    <div className="text-6xl font-black text-primary/20 mb-4 font-heading">
                      {item.step}
                    </div>
                    <h3 className="text-2xl font-bold mb-4 font-heading">
                      {item.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {item.description}
                    </p>
                  </div>

                  {index < process.length - 1 && (
                    <div className="hidden lg:block absolute top-1/2 -right-4 w-8 h-0.5 bg-gradient-to-r from-primary to-secondary" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 relative overflow-hidden">
          <div className="container mx-auto px-6 text-center">
            <h2 className="text-4xl md:text-5xl font-serif font-bold mb-8">
              Ready to Start Your Project?
            </h2>
            <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
              Let's discuss your goals and create a custom solution that drives
              results and exceeds your expectations.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="btn-luxury group text-lg px-10 py-5">
                Get Free Consultation
                <ArrowRight className="ml-3 w-5 h-5 group-hover:translate-x-2 transition-transform" />
              </Button>
              <Button className="btn-outline-luxury text-lg px-10 py-5">
                View Our Work
              </Button>
            </div>
          </div>

          {/* Background Elements */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute -top-32 -left-32 w-64 h-64 rounded-full bg-primary/5 blur-3xl" />
            <div className="absolute -bottom-32 -right-32 w-96 h-96 rounded-full bg-secondary/5 blur-3xl" />
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Services;
