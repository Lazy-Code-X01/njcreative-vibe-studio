import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { ArrowLeft, ExternalLink, CheckCircle } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { portfolioApi } from "@/lib/portfolioApi";
import SEO from "@/components/SEO";

const CaseStudy = () => {
  const { slug } = useParams<{ slug: string }>();

  const { data: project, isLoading } = useQuery({
    queryKey: ["portfolio-project", slug],
    queryFn: () => portfolioApi.getProject(slug!).then((res) => res.data),
    enabled: !!slug,
  });

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

  if (!project) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="flex flex-col items-center justify-center min-h-screen">
          <h1 className="text-4xl font-bold mb-4">Project Not Found</h1>
          <Link to="/portfolio">
            <Button className="btn-luxury">Back to Portfolio</Button>
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title={`${project.title} - Case Study`}
        description={project.description}
        keywords={`portfolio, case study, ${project.category}, ${project.technologies?.join(", ")}`}
      />
      <Navigation />

      <main className="pt-24">
        {/* Hero Section */}
        <section className="py-12 relative overflow-hidden">
          <div className="container mx-auto px-6">
            <Link
              to="/portfolio"
              className="inline-flex items-center text-primary hover:text-primary/80 transition-colors mb-8"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Portfolio
            </Link>

            <div className="max-w-4xl">
              <div className="mb-6">
                <span className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
                  {project.category}
                </span>
              </div>
              <h1 className="text-5xl md:text-7xl font-serif font-bold mb-6 leading-tight">
                {project.title}
              </h1>
              <p className="text-xl text-primary font-medium mb-4">
                {project.client}
              </p>
              <p className="text-xl text-muted-foreground leading-relaxed mb-8">
                {project.description}
              </p>
              {project.link && (
                <Button className="btn-luxury group">
                  Visit Project
                  <ExternalLink className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              )}
            </div>
          </div>
        </section>

        {/* Hero Image */}
        <section className="py-12">
          <div className="container mx-auto px-6">
            <div className="glass-card overflow-hidden">
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-[500px] object-cover"
              />
            </div>
          </div>
        </section>

        {/* Overview Section */}
        <section className="py-12">
          <div className="container mx-auto px-6">
            <div className="grid lg:grid-cols-2 gap-12">
              {/* Technologies */}
              <div className="glass-card p-8">
                <h2 className="text-3xl font-bold mb-6">Technologies Used</h2>
                <div className="flex flex-wrap gap-3">
                  {project.technologies?.map((tech: string, idx: number) => (
                    <span
                      key={idx}
                      className="px-4 py-2 bg-primary/10 text-primary rounded-lg text-sm font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Key Results */}
              <div className="glass-card p-8">
                <h2 className="text-3xl font-bold mb-6">Key Results</h2>
                <div className="space-y-4">
                  {project.results?.map((result: string, idx: number) => (
                    <div key={idx} className="flex items-start space-x-3">
                      <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                      <span className="text-muted-foreground">{result}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Project Details */}
        <section className="py-12">
          <div className="container mx-auto px-6">
            <div className="glass-card p-12 max-w-4xl mx-auto">
              <h2 className="text-4xl font-bold mb-8 text-center">
                Project Overview
              </h2>
              <div className="prose prose-lg max-w-none text-muted-foreground">
                <p className="text-lg leading-relaxed">{project.description}</p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-primary/5 via-secondary/5 to-accent-premium/5">
          <div className="container mx-auto px-6 text-center">
            <h2 className="text-4xl md:text-5xl font-serif font-bold mb-6">
              Ready to Start Your Project?
            </h2>
            <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
              Let's create something amazing together. Get in touch to discuss
              your project.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/contact">
                <Button className="btn-luxury text-lg px-10 py-5">
                  Start Your Project
                </Button>
              </Link>
              <Link to="/portfolio">
                <Button className="btn-outline-luxury text-lg px-10 py-5">
                  View More Projects
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default CaseStudy;
