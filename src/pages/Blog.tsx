import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, User, Search, Tag } from "lucide-react";
import { useState, useEffect, useMemo } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Blog = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 6;

  const categories = useMemo(
    () => [
      { id: "all", label: "All Posts" },
      { id: "web-development", label: "Web Development" },
      { id: "design", label: "Design" },
      { id: "marketing", label: "Digital Marketing" },
      { id: "business", label: "Business" },
      { id: "technology", label: "Technology" },
    ],
    []
  );

  // Handle URL parameters and hash
  useEffect(() => {
    // Get URL parameters
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

    // Handle hash for direct post navigation
    const hash = location.hash;
    if (hash) {
      const postId = hash.replace("#blog-", "");
      const element = document.getElementById(`blog-${postId}`);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: "smooth" });
        }, 100);
      }
    }
  }, [location, categories]);

  // const categories = [
  //   { id: "all", label: "All Posts" },
  //   { id: "web-development", label: "Web Development" },
  //   { id: "design", label: "Design" },
  //   { id: "marketing", label: "Digital Marketing" },
  //   { id: "business", label: "Business" },
  //   { id: "technology", label: "Technology" },
  // ];

  const featuredPost = {
    id: 1,
    title: "The Future of Web Development: Trends Shaping 2024",
    excerpt:
      "Explore the cutting-edge technologies and methodologies that are revolutionizing web development in 2024, from AI integration to advanced frameworks.",
    image: "/src/assets/web development.png",
    category: "web-development",
    author: "Michael Chen",
    date: "March 15, 2024",
    readTime: "8 min read",
    featured: true,
  };

  const posts = [
    {
      id: 2,
      title: "NG Nigeria @ 65: A Nation, A Brand, A Story Still Unfolding",
      excerpt:
        "When Nigeria gained independence in 1960, our symbols the green-white-green flag, the anthem, the coat of arms were our first steps at",
      image: "/src/assets/Let's go Nigeria.png",
      category: "design",
      author: "NJ Creative Firm",
      date: "6 days ago",
      readTime: "1 min read",
      link: "https://www.njcreativefirm.com/post/nigeria-65-a-nation-a-brand-a-story-still-unfolding",
    },
    {
      id: 3,
      title:
        "NJ Creative Firm: Elevating Brands with Style, Strategy, and Impact",
      excerpt:
        "In today’s fast-paced digital world, businesses need more than just a logo or a social media page, they need a brand identity  that...",
      image: "/src/assets/Elevatin brands.png",
      category: "marketing",
      author: "NJ Creative Firm",
      date: "Sep 3",
      readTime: "2 min read",
      link: "https://www.njcreativefirm.com/post/https-www-njcreativefirm-com",
    },
    {
      id: 4,
      title: "Meet the Visionary Behind NJ Creative Firm: Natasha Jumbo",
      excerpt:
        "Turning Passion into Purpose, and Creativity into Impact At the heart of every transformative brand is a visionary, a dreamer who dares...",
      image: "/src/assets/Meett the visionary.png",
      category: "web-development",
      author: "NJ Creative Firm",
      date: "Jul 28",
      readTime: "3 min read",
      link: "https://www.njcreativefirm.com/post/meet-the-visionary-behind-nj-creative-firm-natasha-jumbo",
    },
    {
      id: 5,
      title:
        "Drive Success with NJ Creative Firm's Innovative Branding Services",
      excerpt:
        "In today's fast-paced world, standing out is more important than ever. Businesses need to create a strong identity that resonates with...",
      image: "/src/assets/drive success with NJ.png",
      category: "design",
      author: "NJ Creative Firm",
      date: "May 11",
      readTime: "5 min read",
      link: "https://www.njcreativefirm.com/post/drive-success-with-nj-creative-firm-s-innovative-branding-services",
    },
    {
      id: 6,
      title: "Elevate Your Brand with NJ Creative Firm's Expert Solutions",
      excerpt:
        "In today's fast-paced world, standing out is more important than ever. Brands are constantly vying for attention, and consumers are...",
      image: "/src/assets/elevate your brand.png",
      category: "marketing",
      author: "NJ Creative Firm",
      date: "May 11",
      readTime: "5 min read",
      link: "https://www.njcreativefirm.com/post/elevate-your-brand-with-nj-creative-firm-s-expert-solutions",
    },
    {
      id: 7,
      title:
        "Transform Ideas into Impactful Visual Experiences with NJ Creative Firm",
      excerpt:
        "In today's fast-paced world, capturing attention is more challenging than ever. With countless messages bombarding us daily, how do you...",
      image: "/src/assets/transform ideas.png",
      category: "technology",
      author: "NJ Creative Firm",
      date: "May 11",
      readTime: "5 min read",
      link: "https://www.njcreativefirm.com/post/transform-ideas-into-impactful-visual-experiences-with-nj-creative-firm",
    },
  ];

  const filteredPosts = posts.filter((post) => {
    const matchesSearch =
      searchTerm === "" ||
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.author.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "all" || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Function to handle direct navigation to a blog post
  const handlePostClick = (post) => {
    // If it's an external link, open in new tab
    if (post.link?.startsWith("http")) {
      window.open(post.link, "_blank");
      return;
    }
    // For internal links, scroll to the post section
    const element = document.getElementById(`blog-${post.id}`);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <main className="pt-24">
        {/* Hero Section */}
        <section className="py-20 relative overflow-hidden">
          <div className="container mx-auto px-6">
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
        <section className="pb-16">
          <div className="container mx-auto px-6">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-bold mb-8 font-heading">
                Featured Article
              </h2>
              <div className="glass-card overflow-hidden hover:scale-[1.01] transition-all duration-500 group">
                <div className="grid lg:grid-cols-2 gap-0">
                  <div className="relative overflow-hidden">
                    <img
                      src={featuredPost.image}
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
                        <User className="w-4 h-4" />
                        <span>{featuredPost.author}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Calendar className="w-4 h-4" />
                        <span>{featuredPost.date}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Clock className="w-4 h-4" />
                        <span>{featuredPost.readTime}</span>
                      </div>
                    </div>

                    <h3 className="text-3xl font-bold mb-4 font-heading group-hover:text-primary transition-colors">
                      {featuredPost.title}
                    </h3>

                    <p className="text-muted-foreground truncate mb-6 leading-relaxed text-lg">
                      {featuredPost.excerpt}
                    </p>

                    <Button className="btn-luxury group w-fit">
                      Read Full Article
                      <Calendar className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Blog Posts Grid */}
        <section className="pb-20">
          <div className="container mx-auto px-6">
            <div className="max-w-6xl mx-auto">
              {/* Pagination Info */}
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-3xl font-bold font-heading">
                  Latest Articles
                </h2>
                <p className="text-muted-foreground">
                  Showing{" "}
                  {Math.min(
                    (currentPage - 1) * postsPerPage + 1,
                    filteredPosts.length
                  )}{" "}
                  - {Math.min(currentPage * postsPerPage, filteredPosts.length)}{" "}
                  of {filteredPosts.length} articles
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredPosts
                  .slice(
                    (currentPage - 1) * postsPerPage,
                    currentPage * postsPerPage
                  )
                  .map((post, index) => (
                    <article
                      key={post.id}
                      id={`blog-${post.id}`}
                      className="group animate-fade-in cursor-pointer scroll-mt-24"
                      style={{ animationDelay: `${index * 0.1}s` }}
                      onClick={() => handlePostClick(post)}
                    >
                      <div className="glass-card overflow-hidden hover:scale-105 transition-all duration-300 h-full flex flex-col">
                        <div className="relative overflow-hidden">
                          <img
                            src={post.image}
                            alt={post.title}
                            className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                          />
                          <div className="absolute top-4 left-4">
                            <span
                              className={`px-3 py-1 rounded-full text-xs font-medium ${
                                post.category === "web-development"
                                  ? "bg-blue-500/20 text-blue-300"
                                  : post.category === "design"
                                  ? "bg-purple-500/20 text-purple-300"
                                  : post.category === "marketing"
                                  ? "bg-green-500/20 text-green-300"
                                  : post.category === "business"
                                  ? "bg-orange-500/20 text-orange-300"
                                  : "bg-red-500/20 text-red-300"
                              }`}
                            >
                              {
                                categories.find(
                                  (cat) => cat.id === post.category
                                )?.label
                              }
                            </span>
                          </div>
                        </div>

                        <div className="p-6 flex flex-col flex-grow">
                          <div className="flex items-center space-x-4 text-xs text-muted-foreground mb-3">
                            <div className="flex items-center space-x-1">
                              <User className="w-3 h-3" />
                              <span>{post.author}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Calendar className="w-3 h-3" />
                              <span>{post.date}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Clock className="w-3 h-3" />
                              <span>{post.readTime}</span>
                            </div>
                          </div>

                          <h3 className="text-xl font-bold mb-3 font-heading group-hover:text-primary transition-colors flex-grow">
                            {post.title}
                          </h3>

                          <p className="text-muted-foreground mb-4 leading-relaxed flex-grow">
                            {post.excerpt}
                          </p>

                          {post.link ? (
                            <a
                              href={post.link}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <Button className="btn-outline-luxury group w-full">
                                Read More
                                <Calendar className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                              </Button>
                            </a>
                          ) : (
                            <Link to={`/blog#blog-${post.id}`}>
                              <Button className="btn-outline-luxury group w-full">
                                Read More
                                <Calendar className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                              </Button>
                            </Link>
                          )}
                        </div>
                      </div>
                    </article>
                  ))}
              </div>

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
