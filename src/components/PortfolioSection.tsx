import { ExternalLink, ArrowRight } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { portfolioApi } from "@/lib/portfolioApi";
import { Link } from "react-router-dom";

const PortfolioSection = () => {
  const { data: projects = [], isLoading } = useQuery({
    queryKey: ["portfolio-projects"],
    queryFn: () => portfolioApi.getProjects().then((res) => res.data),
  });

  // Show only featured projects or first 3
  const displayProjects = projects.filter((p: any) => p.featured).slice(0, 3);

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
            Explore our portfolio of successful digital transformations and see
            how we bring creative visions to life.
          </p>
        </div>

        {/* Portfolio Grid */}
        <div className="grid lg:grid-cols-3 gap-8 mb-16">
          {isLoading ? (
            [...Array(3)].map((_, index) => (
              <div
                key={index}
                className="glass-card overflow-hidden animate-pulse"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="w-full h-64 bg-muted/30"></div>
                <div className="p-6 space-y-4">
                  <div className="h-3 w-24 bg-muted/30 rounded"></div>
                  <div className="h-7 bg-muted/30 rounded w-4/5"></div>
                  <div className="space-y-2">
                    <div className="h-4 bg-muted/30 rounded"></div>
                    <div className="h-4 bg-muted/30 rounded w-5/6"></div>
                  </div>
                  <div className="flex gap-2">
                    <div className="h-6 w-16 bg-muted/30 rounded-full"></div>
                    <div className="h-6 w-20 bg-muted/30 rounded-full"></div>
                    <div className="h-6 w-18 bg-muted/30 rounded-full"></div>
                  </div>
                  <div className="h-5 bg-muted/30 rounded w-2/3"></div>
                </div>
              </div>
            ))
          ) : (
            displayProjects.map((project: any, index: number) => (
            <Link
              to={`/case-study/${project.slug}`}
              key={project._id}
              className="group glass-card overflow-hidden cursor-pointer hover:scale-[1.02] transition-all duration-500 block"
            >
              {/* Project Image */}
              <div className="relative overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-/80 to-transparent opacitbackgroundy-0 group-hover:opacity-100 transition-opacity duration-300" />

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
                  {project.technologies?.slice(0, 4).map((tech: string, tagIndex: number) => (
                    <span
                      key={tagIndex}
                      className="px-3 py-1 bg-accent/50 text-xs rounded-full text-accent-foreground"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Results */}
                <div className="flex items-center justify-between">
                  <span className="text-secondary text-sm font-semibold">
                    {project.results?.[0] || "View details"}
                  </span>
                  <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-secondary group-hover:translate-x-1 transition-all duration-300" />
                </div>
              </div>
            </Link>
            ))
          )}
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
                  Dive deeper into our complete portfolio and discover how we've
                  helped businesses transform their digital presence.
                </p>
                <Link to="/portfolio">
                  <button className="btn-hero">View Full Portfolio</button>
                </Link>
              </div>
              <div className="grid grid-cols-2 gap-4 text-center">
                <div className="glass p-4 rounded-xl">
                  <div className="text-2xl font-bold text-secondary mb-1">
                    150+
                  </div>
                  <div className="text-sm text-muted-foreground">Projects</div>
                </div>
                <div className="glass p-4 rounded-xl">
                  <div className="text-2xl font-bold text-secondary mb-1">
                    98%
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Success Rate
                  </div>
                </div>
                <div className="glass p-4 rounded-xl">
                  <div className="text-2xl font-bold text-secondary mb-1">
                    50+
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Happy Clients
                  </div>
                </div>
                <div className="glass p-4 rounded-xl">
                  <div className="text-2xl font-bold text-secondary mb-1">
                    24/7
                  </div>
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
