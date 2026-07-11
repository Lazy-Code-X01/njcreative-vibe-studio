import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { portfolioApi } from "@/lib/portfolioApi";
import { Link } from "react-router-dom";
import SEO from "@/components/SEO";
import FloatingElements from "@/components/FloatingElements";
import PartnersMarquee from "@/components/PartnersMarquee";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const Portfolio = () => {
  const heroRef = useScrollReveal({ threshold: 0.1 });
  const filterRef = useScrollReveal({ threshold: 0.2, delay: 0.2 });
  const projectsRef = useScrollReveal({ threshold: 0.2, delay: 0.3 });

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
        <section className="py-20 relative overflow-hidden" ref={heroRef}>
          <FloatingElements />
          <div className="container mx-auto px-6 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-5xl md:text-7xl font-serif font-bold mb-8 leading-tight">
                Our Premium
                <span className="block gradient-text italic">Portfolio</span>
                Success Stories
              </h1>
              <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed mb-10 max-w-2xl mx-auto">
                Discover how we have helped businesses transform their digital
                presence and achieve remarkable results through strategic design
                and development.
              </p>
            </div>
          </div>
        </section>

        {/* Filter Section */}
        <section className="pb-10" ref={filterRef}>
          <div className="container mx-auto px-6">
            <div className="flex flex-wrap justify-center gap-3">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setActiveFilter(category.id)}
                  className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                    activeFilter === category.id
                      ? "bg-primary text-primary-foreground shadow-lg"
                      : "glass-card text-muted-foreground hover:text-primary hover:border-primary/40 hover:scale-105"
                  }`}
                >
                  {category.label}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Projects Grid */}
        <section className="pb-20" ref={projectsRef}>
          <div className="container mx-auto px-6">
            {isLoading ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[...Array(6)].map((_, index) => (
                  <div
                    key={index}
                    className="glass-card overflow-hidden animate-pulse"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="w-full h-56 bg-muted/30" />
                    <div className="p-6 space-y-4">
                      <div className="h-3 w-24 bg-muted/30 rounded" />
                      <div className="h-6 bg-muted/30 rounded w-4/5" />
                      <div className="space-y-2">
                        <div className="h-4 bg-muted/30 rounded" />
                        <div className="h-4 bg-muted/30 rounded w-5/6" />
                      </div>
                      <div className="h-9 bg-muted/30 rounded mt-2" />
                    </div>
                  </div>
                ))}
              </div>
            ) : filteredProjects.length === 0 ? (
              <div className="glass-card p-16 max-w-lg mx-auto text-center">
                <p className="text-2xl font-serif font-semibold mb-3 text-foreground">
                  No projects found
                </p>
                <p className="text-muted-foreground mb-6">
                  There are no projects in this category yet. Try a different
                  filter or check back soon.
                </p>
                <button
                  onClick={() => setActiveFilter("all")}
                  className="btn-outline-luxury"
                >
                  View all projects
                </button>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredProjects.map((project: any, index: number) => (
                  <Link
                    to={`/case-study/${project.slug}`}
                    key={project._id}
                    className="group block glass-card overflow-hidden hover:scale-[1.02] transition-all duration-500 animate-fade-in"
                    style={{ animationDelay: `${index * 0.08}s` }}
                  >
                    {/* Project Image */}
                    <div className="relative overflow-hidden h-56">
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <div className="absolute bottom-4 right-4 transform translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                        <ArrowRight className="w-5 h-5 text-primary" />
                      </div>
                    </div>

                    {/* Project Content */}
                    <div className="p-6">
                      <p className="text-xs text-primary font-semibold tracking-widest uppercase mb-2">
                        {project.client}
                      </p>

                      <h3 className="text-xl font-bold mb-3 font-heading group-hover:text-primary transition-colors duration-300">
                        {project.title}
                      </h3>

                      <p className="text-muted-foreground text-sm leading-relaxed mb-5">
                        {project.description}
                      </p>

                      {/* Key Results */}
                      {project.results && project.results.length > 0 && (
                        <div className="space-y-1.5 mb-5">
                          {project.results.slice(0, 2).map(
                            (result: string, idx: number) => (
                              <div
                                key={idx}
                                className="flex items-center gap-2"
                              >
                                <div className="w-1.5 h-1.5 bg-primary rounded-full flex-shrink-0" />
                                <span className="text-xs text-muted-foreground">
                                  {result}
                                </span>
                              </div>
                            )
                          )}
                        </div>
                      )}

                      <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary group-hover:gap-3 transition-all duration-300">
                        View Case Study
                        <ArrowRight className="w-4 h-4" />
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-20 bg-gradient-to-r from-primary/5 via-secondary/5 to-accent-premium/5">
          <div className="container mx-auto px-6">
            <div className="grid md:grid-cols-3 gap-8 text-center">
              <div className="group">
                <div className="text-4xl md:text-5xl font-black text-primary mb-2 font-heading group-hover:scale-110 transition-transform duration-300">
                  100+
                </div>
                <p className="text-muted-foreground">Projects Completed</p>
              </div>
              <div className="group">
                <div className="text-4xl md:text-5xl font-black text-accent-premium mb-2 font-heading group-hover:scale-110 transition-transform duration-300">
                  3+
                </div>
                <p className="text-muted-foreground">Industry Awards</p>
              </div>
              <div className="group">
                <div className="text-4xl md:text-5xl font-black text-primary mb-2 font-heading group-hover:scale-110 transition-transform duration-300">
                  99%
                </div>
                <p className="text-muted-foreground">Client Satisfaction</p>
              </div>
            </div>
          </div>
        </section>

        {/* Client Logos Marquee */}
        <PartnersMarquee />

        {/* CTA Section */}
        <section className="py-24">
          <div className="container mx-auto px-6 text-center">
            <h2 className="text-4xl md:text-5xl font-serif font-bold mb-6">
              Ready for Your Success Story?
            </h2>
            <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
              Join our portfolio of successful clients and let us help you
              achieve remarkable results for your business.
            </p>
            <Link to="/contact">
              <Button className="btn-luxury group text-lg px-10 py-5">
                Start Your Project
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

export default Portfolio;
