import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { ExternalLink, ArrowRight, Filter } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { portfolioApi } from "@/lib/portfolioApi";
import { Link } from "react-router-dom";
import SEO from "@/components/SEO";

const Portfolio = () => {
  const [activeFilter, setActiveFilter] = useState("all");

  const { data: projects = [], isLoading } = useQuery({
    queryKey: ["portfolio-projects"],
    queryFn: () => portfolioApi.getProjects().then((res) => res.data),
  });

  const categories = [
    { id: "all", label: "All Projects" },
    { id: "web", label: "Web Development" },
    { id: "branding", label: "Branding" },
    { id: "marketing", label: "Digital Marketing" },
    { id: "tech", label: "Tech Solutions" },
  ];

  const filteredProjects =
    activeFilter === "all"
      ? projects
      : projects.filter((project: any) => 
          project.category.toLowerCase().includes(activeFilter.toLowerCase())
        );

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="flex items-center justify-center min-h-screen">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="Portfolio - Our Work"
        description="Discover our portfolio of successful digital transformations. See how we've helped businesses achieve remarkable results through strategic design and development."
        keywords="portfolio, web development, branding, digital marketing, case studies"
      />
      <Navigation />

      <main className="pt-24">
        {/* Hero Section */}
        <section className="py-20 relative overflow-hidden">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-5xl md:text-7xl font-serif font-bold mb-8 leading-tight">
                Our Premium
                <span className="block gradient-text animate-gradient italic">
                  Portfolio
                </span>
                Success Stories
              </h1>
              <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed mb-10">
                Discover how we've helped businesses transform their digital
                presence and achieve remarkable results through strategic design
                and development.
              </p>
            </div>
          </div>
        </section>

        {/* Filter Section */}
        <section className="pb-10">
          <div className="container mx-auto px-6">
            <div className="flex flex-wrap justify-center gap-4">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setActiveFilter(category.id)}
                  className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                    activeFilter === category.id
                      ? "bg-primary text-primary-foreground shadow-luxury"
                      : "glass-card text-muted-foreground hover:text-primary hover:scale-105"
                  }`}
                >
                  <Filter className="w-4 h-4 inline mr-2" />
                  {category.label}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Projects Grid */}
        <section className="pb-20">
          <div className="container mx-auto px-6">
            <div className="grid lg:grid-cols-2 gap-12">
              {filteredProjects.map((project: any, index: number) => (
                <Link to={`/case-study/${project.slug}`} key={project._id}>
                  <div
                    className="group animate-fade-in"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="glass-card overflow-hidden hover:scale-[1.02] transition-all duration-500">
                    {/* Project Image */}
                    <div className="relative overflow-hidden">
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <button className="absolute top-4 right-4 w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110">
                        <ExternalLink className="w-5 h-5" />
                      </button>
                    </div>

                    {/* Project Content */}
                    <div className="p-8">
                        <div className="flex items-center justify-between mb-4">
                          <span className="text-sm text-primary font-medium tracking-wide uppercase">
                            {project.client}
                          </span>
                          <span className="px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary">
                            {project.category}
                          </span>
                        </div>

                      <h3 className="text-2xl font-bold mb-4 font-heading group-hover:text-primary transition-colors">
                        {project.title}
                      </h3>

                      <p className="text-muted-foreground mb-6 leading-relaxed">
                        {project.description}
                      </p>

                        {/* Technologies */}
                        <div className="mb-6">
                          <h4 className="text-sm font-semibold mb-3 text-foreground">
                            Technologies Used:
                          </h4>
                          <div className="flex flex-wrap gap-2">
                            {project.technologies?.map((tech: string, idx: number) => (
                              <span
                                key={idx}
                                className="px-3 py-1 bg-muted/50 text-foreground rounded-full text-sm"
                              >
                                {tech}
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* Results */}
                        <div className="mb-6">
                          <h4 className="text-sm font-semibold mb-3 text-foreground">
                            Key Results:
                          </h4>
                          <div className="space-y-2">
                            {project.results?.map((result: string, idx: number) => (
                              <div
                                key={idx}
                                className="flex items-center space-x-2"
                              >
                                <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                                <span className="text-sm text-muted-foreground">
                                  {result}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>

                        <Button className="btn-outline-luxury group w-full">
                          View Case Study
                          <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-20 bg-gradient-to-r from-primary/5 via-secondary/5 to-accent-premium/5">
          <div className="container mx-auto px-6">
            <div className="grid md:grid-cols-3 gap-8 text-center">
              <div className="group">
                <div className="text-4xl md:text-5xl font-black text-primary mb-2 font-heading group-hover:scale-110 transition-transform">
                  100+
                </div>
                <p className="text-muted-foreground">Projects Completed</p>
              </div>
              <div className="group">
                <div className="text-4xl md:text-5xl font-black text-accent-premium mb-2 font-heading group-hover:scale-110 transition-transform">
                  3+
                </div>
                <p className="text-muted-foreground">Industry Awards</p>
              </div>
              <div className="group">
                <div className="text-4xl md:text-5xl font-black text-primary mb-2 font-heading group-hover:scale-110 transition-transform">
                  99%
                </div>
                <p className="text-muted-foreground">Client Satisfaction</p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20">
          <div className="container mx-auto px-6 text-center">
            <h2 className="text-4xl md:text-5xl font-serif font-bold mb-8">
              Ready for Your Success Story?
            </h2>
            <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
              Join our portfolio of successful clients and let us help you
              achieve remarkable results for your business.
            </p>
            <Button className="btn-luxury group text-lg px-10 py-5">
              Start Your Project
              <ArrowRight className="ml-3 w-5 h-5 group-hover:translate-x-2 transition-transform" />
            </Button>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Portfolio;
