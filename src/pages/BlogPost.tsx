import { useParams } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import SEO from "@/components/SEO";
import { useQuery } from "@tanstack/react-query";
import { adminApi } from "@/lib/adminApi";
import { format } from "date-fns";

const BlogPost = () => {
  const { slug } = useParams();

  const {
    data: post,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["blog-post", slug],
    queryFn: async () => {
      const response = await adminApi.getPost(slug!);
      return response.data;
    },
    enabled: !!slug,
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <main className="pt-24">
          <div className="container mx-auto px-6">
            <div className="animate-pulse">
              <div className="h-8 bg-muted rounded w-3/4 mb-4"></div>
              <div className="h-4 bg-muted rounded w-1/4 mb-8"></div>
              <div className="h-96 bg-muted rounded mb-8"></div>
              <div className="space-y-4">
                <div className="h-4 bg-muted rounded w-full"></div>
                <div className="h-4 bg-muted rounded w-5/6"></div>
                <div className="h-4 bg-muted rounded w-4/6"></div>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <main className="pt-24">
          <div className="container mx-auto px-6 text-center py-20">
            <h1 className="text-4xl font-bold mb-4">Post Not Found</h1>
            <p className="text-muted-foreground mb-8">
              The requested blog post could not be found.
            </p>
            <Link to="/blog">
              <Button className="btn-luxury">
                <ArrowLeft className="mr-2 w-4 h-4" />
                Back to Blog
              </Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!post) return null;

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title={post.title}
        description={post.excerpt || post.title}
        keywords={`blog, ${
          post.category?.name || "article"
        }, ${post.title.toLowerCase()}`}
        image={post.featuredImage}
      />
      <Navigation />

      <main className="pt-24">
        {/* Hero Section */}
        <article className="pb-20">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto">
              {/* Back to Blog */}
              <Link to="/blog">
                <Button
                  variant="ghost"
                  className="mb-8 hover:bg-transparent hover:text-primary"
                >
                  <ArrowLeft className="mr-2 w-4 h-4" />
                  Back to Blog
                </Button>
              </Link>

              {/* Article Header */}
              <header className="mb-12">
                <h1 className="text-4xl md:text-5xl font-serif font-bold mb-6 leading-tight">
                  {post.title}
                </h1>

                <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-8">
                  <div className="flex items-center space-x-1">
                    <Calendar className="w-4 h-4" />
                    <span>{format(new Date(post.date), "MMMM d, yyyy")}</span>
                  </div>
                  {post.readTime > 0 && (
                    <div className="flex items-center space-x-1">
                      <Clock className="w-4 h-4" />
                      <span>{post.readTime} min read</span>
                    </div>
                  )}
                  {post.category && (
                    <div className="px-3 py-1 bg-primary/20 text-primary rounded-full text-xs font-medium">
                      {post.category.name}
                    </div>
                  )}
                </div>

                {post.featuredImage && (
                  <div className="aspect-video mb-12 rounded-2xl overflow-hidden">
                    <img
                      src={post.featuredImage}
                      alt={post.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
              </header>

              {/* Article Content */}
              <div className="prose prose-lg prose-h2:text-white prose-h3:text-white prose-strong:text-gray-300 max-w-none text-foreground">
                <div dangerouslySetInnerHTML={{ __html: post.content }} />
              </div>

              {/* Article Footer */}
              <footer className="mt-12 pt-8 border-t border-border">
                <div className="flex flex-wrap items-center justify-between gap-4">
                  {post.category && (
                    <div>
                      <span className="text-sm text-muted-foreground">
                        Category:
                      </span>
                      <Link
                        to={`/blog?category=${post.category.slug}`}
                        className="ml-2 text-sm text-primary hover:underline"
                      >
                        {post.category.name}
                      </Link>
                    </div>
                  )}
                  {post.tags && post.tags.length > 0 && (
                    <div className="flex gap-2 flex-wrap">
                      {post.tags.map((tag: string) => (
                        <span
                          key={tag}
                          className="px-3 py-1 bg-muted rounded-full text-xs"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </footer>
            </div>
          </div>
        </article>
      </main>

      <Footer />
    </div>
  );
};

export default BlogPost;
