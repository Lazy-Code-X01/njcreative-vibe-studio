import { ExternalLink, ArrowRight } from "lucide-react";
import portfolioWeb from "@/assets/portfolio-web.jpg";
import portfolioBranding from "@/assets/portfolio-branding.jpg";
import portfolioTech from "@/assets/portfolio-tech.jpg";

const PortfolioSection = () => {
  const projects = [
    {
      title: "E-commerce Revolution",
      category: "Web Development",
      description: "Modern e-commerce platform with advanced features and seamless user experience.",
      image: portfolioWeb,
      tags: ["React", "Node.js", "Stripe", "AWS"],
      results: "+250% conversion rate"
    },
    {
      title: "Brand Identity Suite",
      category: "Branding",
      description: "Complete brand transformation for a Fortune 500 company with global impact.",
      image: portfolioBranding,
      tags: ["Brand Design", "Guidelines", "Marketing", "Strategy"],
      results: "+180% brand recognition"
    },
    {
      title: "Mobile-First Platform",
      category: "Tech Solutions",
      description: "Custom mobile application serving 100K+ users with real-time features.",
      image: portfolioTech,
      tags: ["React Native", "Firebase", "AI/ML", "Analytics"],
      results: "4.9★ App Store rating"
    }
  ];

  return (
    <section id="portfolio" className="py-20">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 rounded-full glass-card mb-6">
            <span className="text-secondary text-sm font-medium">
              🎨 Our Work
            </span>
          </div>
          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            Projects That
            <span className="block gradient-text">Inspire</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Explore our portfolio of successful digital transformations 
            and see how we bring creative visions to life.
          </p>
        </div>

        {/* Portfolio Grid */}
        <div className="grid lg:grid-cols-3 gap-8 mb-16">
          {projects.map((project, index) => (
            <div
              key={index}
              className="group glass-card overflow-hidden cursor-pointer hover:scale-[1.02] transition-all duration-500"
            >
              {/* Project Image */}
              <div className="relative overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                {/* Overlay Content */}
                <div className="absolute bottom-4 left-4 right-4 transform translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
                  <div className="flex items-center justify-between">
                    <span className="text-secondary text-sm font-medium bg-background/20 backdrop-blur-sm px-3 py-1 rounded-full">
                      {project.category}
                    </span>
                    <ExternalLink className="w-5 h-5 text-secondary" />
                  </div>
                </div>
              </div>

              {/* Project Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2 group-hover:text-secondary transition-colors duration-300">
                  {project.title}
                </h3>
                <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
                  {project.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.map((tag, tagIndex) => (
                    <span
                      key={tagIndex}
                      className="px-3 py-1 bg-accent/50 text-xs rounded-full text-accent-foreground"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Results */}
                <div className="flex items-center justify-between">
                  <span className="text-secondary text-sm font-semibold">
                    {project.results}
                  </span>
                  <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-secondary group-hover:translate-x-1 transition-all duration-300" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Portfolio CTA */}
        <div className="text-center">
          <div className="glass-card p-8 max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="text-left">
                <h3 className="text-3xl font-bold mb-4">
                  See More of Our Work
                </h3>
                <p className="text-muted-foreground mb-6">
                  Dive deeper into our complete portfolio and discover 
                  how we've helped businesses transform their digital presence.
                </p>
                <button className="btn-hero">
                  View Full Portfolio
                </button>
              </div>
              <div className="grid grid-cols-2 gap-4 text-center">
                <div className="glass p-4 rounded-xl">
                  <div className="text-2xl font-bold text-secondary mb-1">150+</div>
                  <div className="text-sm text-muted-foreground">Projects</div>
                </div>
                <div className="glass p-4 rounded-xl">
                  <div className="text-2xl font-bold text-secondary mb-1">98%</div>
                  <div className="text-sm text-muted-foreground">Success Rate</div>
                </div>
                <div className="glass p-4 rounded-xl">
                  <div className="text-2xl font-bold text-secondary mb-1">50+</div>
                  <div className="text-sm text-muted-foreground">Happy Clients</div>
                </div>
                <div className="glass p-4 rounded-xl">
                  <div className="text-2xl font-bold text-secondary mb-1">24/7</div>
                  <div className="text-sm text-muted-foreground">Support</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PortfolioSection;