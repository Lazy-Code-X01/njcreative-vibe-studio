import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, User, Search, Tag } from "lucide-react";
import { useState, useEffect, useMemo } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { adminApi } from "@/lib/adminApi";
import SEO from "@/components/SEO";
import { format } from "date-fns";
import FloatingElements from "@/components/FloatingElements";

const Blog = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 6;

  // Fetch posts and categories from API
  const { data: postsData, isLoading: postsLoading } = useQuery({
    queryKey: ["blog-posts"],
    queryFn: async () => {
      const response = await adminApi.getPosts();
      return response.data;
    },
  });

  const { data: categoriesData, isLoading: categoriesLoading } = useQuery({
    queryKey: ["blog-categories"],
    queryFn: async () => {
      const response = await adminApi.getCategories();
      return response.data;
    },
  });

  // Build categories array with "All Posts" option
  const categories = useMemo(() => {
    if (!categoriesData) return [{ id: "all", label: "All Posts" }];
    return [
      { id: "all", label: "All Posts" },
      ...categoriesData.map((cat: any) => ({
        id: cat.slug,
        label: cat.name,
      })),
    ];
  }, [categoriesData]);

  // Handle URL parameters and hash
  useEffect(() => {
    const params = new URLSearchParams(location.search);

    // Handle category
    const category = params.get("category");
    if (category && categories.some((cat) => cat.id === category)) {
      setSelectedCategory(category);
    }

    // Handle page number
    const page = params.get("page");
    if (page) {
      const pageNum = parseInt(page);
      if (!isNaN(pageNum) && pageNum > 0) {
        setCurrentPage(pageNum);
      }
    }

    // Handle search term
    const search = params.get("search");
    if (search) {
      setSearchTerm(search);
    }
  }, [location, categories]);

  // Filter posts based on search and category
  const filteredPosts = useMemo(() => {
    if (!postsData) return [];
    
    return postsData.filter((post: any) => {
      // Only show published posts
      if (!post.published) return false;

      const matchesSearch =
        searchTerm === "" ||
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.excerpt?.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesCategory =
        selectedCategory === "all" || 
        post.category?.slug === selectedCategory;
      
      return matchesSearch && matchesCategory;
    });
  }, [postsData, searchTerm, selectedCategory]);

  // Get featured post (first published post)
  const featuredPost = useMemo(() => {
    if (!postsData || postsData.length === 0) return null;
    return postsData.find((post: any) => post.published);
  }, [postsData]);

  // Function to handle navigation to a blog post
  const handlePostClick = (post) => {
    navigate(`/blog/${post.slug}`);
  };

  const isLoading = postsLoading || categoriesLoading;

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="Blog - Digital Insights & Expert Perspectives"
        description="Stay ahead of the curve with our latest insights on web development, design trends, marketing strategies, and business growth."
        keywords="blog, web development, design, marketing, business insights, digital marketing"
      />
      <Navigation />

      <main className="pt-24">
        {/* Hero Section */}
        <section className="py-20 relative overflow-hidden">
          <FloatingElements />
          <div className="container mx-auto px-6 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-5xl md:text-7xl font-serif font-bold mb-8 leading-tight">
                Digital Insights &
                <span className="block gradient-text animate-gradient italic">
                  Expert
                </span>
                Perspectives
              </h1>
              <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed mb-10">
                Stay ahead of the curve with our latest insights on web
                development, design trends, marketing strategies, and business
                growth.
              </p>
            </div>
          </div>
        </section>

        {/* Search & Filter */}
        <section className="pb-10">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto">
              {/* Search Bar */}
              <div className="relative mb-8">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search articles by title, content, or author..."
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                    setCurrentPage(1); // Reset page number when searching
                    // Update URL with search term
                    const params = new URLSearchParams(location.search);
                    if (e.target.value) {
                      params.set("search", e.target.value);
                    } else {
                      params.delete("search");
                    }
                    navigate(`/blog?${params.toString()}`);
                  }}
                  className="w-full pl-12 pr-4 py-4 bg-card border border-border rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary text-foreground placeholder-muted-foreground"
                />
              </div>

              {/* Category Filter */}
              <div className="flex flex-wrap justify-center gap-3">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => {
                      setSelectedCategory(category.id);
                      setCurrentPage(1); // Reset page number when changing category
                      navigate(
                        category.id === "all"
                          ? "/blog"
                          : `/blog?category=${category.id}`
                      );
                    }}
                    className={`px-4 py-2 rounded-full font-medium transition-all duration-300 ${
                      selectedCategory === category.id
                        ? "bg-primary text-primary-foreground shadow-luxury"
                        : "glass-card text-muted-foreground hover:text-primary hover:scale-105"
                    }`}
                  >
                    <Tag className="w-4 h-4 inline mr-2" />
                    {category.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Featured Post */}
        {featuredPost && (
          <section className="pb-16">
            <div className="container mx-auto px-6">
              <div className="max-w-6xl mx-auto">
                <h2 className="text-3xl font-bold mb-8 font-heading">
                  Featured Article
                </h2>
                <Link to={`/blog/${featuredPost.slug}`}>
                  <div className="glass-card overflow-hidden hover:scale-[1.01] transition-all duration-500 group cursor-pointer">
                    <div className="grid lg:grid-cols-2 gap-0">
                      <div className="relative overflow-hidden">
                        <img
                          src={featuredPost.featuredImage || "/placeholder.svg"}
                          alt={featuredPost.title}
                          className="w-full h-80 lg:h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                        <div className="absolute top-4 left-4">
                          <span className="px-3 py-1 bg-primary text-primary-foreground rounded-full text-sm font-medium">
                            Featured
                          </span>
                        </div>
                      </div>

                      <div className="p-8 lg:p-12 flex flex-col justify-center">
                        <div className="flex items-center space-x-4 text-sm text-muted-foreground mb-4">
                          <div className="flex items-center space-x-1">
                            <Calendar className="w-4 h-4" />
                            <span>{format(new Date(featuredPost.date), "MMM d, yyyy")}</span>
                          </div>
                          {featuredPost.readTime > 0 && (
                            <div className="flex items-center space-x-1">
                              <Clock className="w-4 h-4" />
                              <span>{featuredPost.readTime} min read</span>
                            </div>
                          )}
                        </div>

                        <h3 className="text-3xl font-bold mb-4 font-heading group-hover:text-primary transition-colors">
                          {featuredPost.title}
                        </h3>

                        <p className="text-muted-foreground line-clamp-3 mb-6 leading-relaxed text-lg">
                          {featuredPost.excerpt}
                        </p>

                        <Button className="btn-luxury group w-fit">
                          Read Full Article
                          <Calendar className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            </div>
          </section>
        )}

        {/* Blog Posts Grid */}
        <section className="pb-20">
          <div className="container mx-auto px-6">
            <div className="max-w-6xl mx-auto">
              {/* Pagination Info */}
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-3xl font-bold font-heading">
                  Latest Articles
                </h2>
                {!isLoading && (
                  <p className="text-muted-foreground">
                    Showing{" "}
                    {Math.min(
                      (currentPage - 1) * postsPerPage + 1,
                      filteredPosts.length
                    )}{" "}
                    - {Math.min(currentPage * postsPerPage, filteredPosts.length)}{" "}
                    of {filteredPosts.length} articles
                  </p>
                )}
              </div>

              {isLoading ? (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {[...Array(6)].map((_, index) => (
                    <div
                      key={index}
                      className="glass-card overflow-hidden animate-pulse"
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      <div className="w-full h-48 bg-muted/30"></div>
                      <div className="p-6 space-y-4">
                        <div className="flex gap-4">
                          <div className="h-3 w-20 bg-muted/30 rounded"></div>
                          <div className="h-3 w-24 bg-muted/30 rounded"></div>
                        </div>
                        <div className="h-6 bg-muted/30 rounded w-3/4"></div>
                        <div className="space-y-2">
                          <div className="h-4 bg-muted/30 rounded"></div>
                          <div className="h-4 bg-muted/30 rounded w-5/6"></div>
                        </div>
                        <div className="h-10 bg-muted/30 rounded"></div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : filteredPosts.length === 0 ? (
                <div className="text-center py-20">
                  <p className="text-muted-foreground text-lg">
                    No articles found. Try adjusting your search or filters.
                  </p>
                </div>
              ) : (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {filteredPosts
                    .slice(
                      (currentPage - 1) * postsPerPage,
                      currentPage * postsPerPage
                    )
                    .map((post: any, index: number) => (
                      <article
                        key={post._id}
                        id={`blog-${post._id}`}
                        className="group animate-fade-in cursor-pointer scroll-mt-24"
                        style={{ animationDelay: `${index * 0.1}s` }}
                        onClick={() => navigate(`/blog/${post.slug}`)}
                      >
                        <div className="glass-card overflow-hidden hover:scale-105 transition-all duration-300 h-full flex flex-col">
                          <div className="relative overflow-hidden">
                            <img
                              src={post.featuredImage || "/placeholder.svg"}
                              alt={post.title}
                              className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                            />
                            {post.category && (
                              <div className="absolute top-4 left-4">
                                <span className="px-3 py-1 rounded-full text-xs font-medium bg-primary/20 text-primary">
                                  {post.category.name}
                                </span>
                              </div>
                            )}
                          </div>

                          <div className="p-6 flex flex-col flex-grow">
                            <div className="flex items-center space-x-4 text-xs text-muted-foreground mb-3">
                              <div className="flex items-center space-x-1">
                                <Calendar className="w-3 h-3" />
                                <span>{format(new Date(post.date), "MMM d, yyyy")}</span>
                              </div>
                              {post.readTime > 0 && (
                                <div className="flex items-center space-x-1">
                                  <Clock className="w-3 h-3" />
                                  <span>{post.readTime} min read</span>
                                </div>
                              )}
                            </div>

                            <h3 className="text-xl font-bold mb-3 font-heading group-hover:text-primary transition-colors flex-grow">
                              {post.title}
                            </h3>

                            <p className="text-muted-foreground mb-4 leading-relaxed line-clamp-3">
                              {post.excerpt}
                            </p>

                            <Button className="btn-outline-luxury group w-full">
                              Read More
                              <Calendar className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </Button>
                          </div>
                        </div>
                      </article>
                    ))}
                </div>
              )}

              {filteredPosts.length === 0 && (
                <div className="text-center py-16">
                  <div className="text-6xl mb-4">📝</div>
                  <h3 className="text-2xl font-bold mb-4">No articles found</h3>
                  <p className="text-muted-foreground">
                    Try adjusting your search terms or browse different
                    categories.
                  </p>
                </div>
              )}

              {/* Pagination Controls */}
              {filteredPosts.length > postsPerPage && (
                <div className="flex justify-center items-center space-x-2 mt-12">
                  <Button
                    variant="outline"
                    className="btn-outline-luxury"
                    onClick={() =>
                      setCurrentPage((prev) => Math.max(1, prev - 1))
                    }
                    disabled={currentPage === 1}
                  >
                    Previous
                  </Button>

                  {Array.from(
                    { length: Math.ceil(filteredPosts.length / postsPerPage) },
                    (_, i) => i + 1
                  ).map((pageNumber) => (
                    <Button
                      key={pageNumber}
                      variant={
                        pageNumber === currentPage ? "default" : "outline"
                      }
                      className={`w-10 h-10 ${
                        pageNumber === currentPage
                          ? "btn-luxury"
                          : "btn-outline-luxury"
                      }`}
                      onClick={() => setCurrentPage(pageNumber)}
                    >
                      {pageNumber}
                    </Button>
                  ))}

                  <Button
                    variant="outline"
                    className="btn-outline-luxury"
                    onClick={() =>
                      setCurrentPage((prev) =>
                        Math.min(
                          Math.ceil(filteredPosts.length / postsPerPage),
                          prev + 1
                        )
                      )
                    }
                    disabled={
                      currentPage ===
                      Math.ceil(filteredPosts.length / postsPerPage)
                    }
                  >
                    Next
                  </Button>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Newsletter Section */}
        <section className="py-20 bg-gradient-to-r from-primary/10 via-secondary/10 to-accent-premium/10">
          <div className="container mx-auto px-6 text-center">
            <h2 className="text-4xl md:text-5xl font-serif font-bold mb-8">
              Stay Updated
            </h2>
            <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
              Subscribe to our newsletter and get the latest insights, tips, and
              industry trends delivered directly to your inbox.
            </p>

            <div className="max-w-md mx-auto">
              <div className="flex flex-col sm:flex-row gap-4">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-3 bg-card border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary text-foreground placeholder-muted-foreground"
                />
                <Button className="btn-luxury">Subscribe</Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Blog;
