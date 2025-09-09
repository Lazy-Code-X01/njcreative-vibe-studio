import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, User, Search, Tag } from "lucide-react";
import { useState } from "react";

const Blog = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const categories = [
    { id: "all", label: "All Posts" },
    { id: "web-development", label: "Web Development" },
    { id: "design", label: "Design" },
    { id: "marketing", label: "Digital Marketing" },
    { id: "business", label: "Business" },
    { id: "technology", label: "Technology" }
  ];

  const featuredPost = {
    id: 1,
    title: "The Future of Web Development: Trends Shaping 2024",
    excerpt: "Explore the cutting-edge technologies and methodologies that are revolutionizing web development in 2024, from AI integration to advanced frameworks.",
    image: "/api/placeholder/1200/600",
    category: "web-development",
    author: "Michael Chen",
    date: "March 15, 2024",
    readTime: "8 min read",
    featured: true
  };

  const posts = [
    {
      id: 2,
      title: "Creating Memorable Brand Experiences in the Digital Age",
      excerpt: "Learn how to craft brand experiences that resonate with modern consumers and drive long-term loyalty through strategic design and storytelling.",
      image: "/api/placeholder/600/400",
      category: "design",
      author: "Sarah Johnson",
      date: "March 12, 2024",
      readTime: "6 min read"
    },
    {
      id: 3,
      title: "SEO Strategies That Actually Work in 2024",
      excerpt: "Discover proven SEO tactics that deliver real results, from technical optimization to content strategy and user experience improvements.",
      image: "/api/placeholder/600/400",
      category: "marketing",
      author: "David Rodriguez",
      date: "March 10, 2024",
      readTime: "5 min read"
    },
    {
      id: 4,
      title: "Building Scalable SaaS Applications: A Complete Guide",
      excerpt: "A comprehensive guide to architecting and developing SaaS applications that can scale from startup to enterprise level.",
      image: "/api/placeholder/600/400",
      category: "web-development",
      author: "Emily Watson",
      date: "March 8, 2024",
      readTime: "10 min read"
    },
    {
      id: 5,
      title: "The Psychology of User Experience Design",
      excerpt: "Understanding how psychological principles can enhance user experience and drive better engagement in your digital products.",
      image: "/api/placeholder/600/400",
      category: "design", 
      author: "Michael Chen",
      date: "March 5, 2024",
      readTime: "7 min read"
    },
    {
      id: 6,
      title: "Maximizing ROI with Data-Driven Marketing",
      excerpt: "Learn how to leverage analytics and data insights to create marketing campaigns that deliver measurable returns on investment.",
      image: "/api/placeholder/600/400",
      category: "marketing",
      author: "Sarah Johnson",
      date: "March 3, 2024",
      readTime: "6 min read"
    },
    {
      id: 7,
      title: "AI Integration in Modern Business Operations",
      excerpt: "Practical applications of artificial intelligence in business processes and how to implement AI solutions effectively.",
      image: "/api/placeholder/600/400",
      category: "technology",
      author: "David Rodriguez",
      date: "March 1, 2024",
      readTime: "9 min read"
    }
  ];

  const filteredPosts = posts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

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
                Stay ahead of the curve with our latest insights on web development, 
                design trends, marketing strategies, and business growth.
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
                  placeholder="Search articles..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 bg-card border border-border rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary text-foreground placeholder-muted-foreground"
                />
              </div>
              
              {/* Category Filter */}
              <div className="flex flex-wrap justify-center gap-3">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
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
              <h2 className="text-3xl font-bold mb-8 font-heading">Featured Article</h2>
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
                    
                    <p className="text-muted-foreground mb-6 leading-relaxed text-lg">
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
              <h2 className="text-3xl font-bold mb-8 font-heading">Latest Articles</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredPosts.map((post, index) => (
                  <article 
                    key={post.id} 
                    className="group animate-fade-in cursor-pointer"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="glass-card overflow-hidden hover:scale-105 transition-all duration-300 h-full flex flex-col">
                      <div className="relative overflow-hidden">
                        <img 
                          src={post.image} 
                          alt={post.title}
                          className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                        />
                        <div className="absolute top-4 left-4">
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                            post.category === 'web-development' ? 'bg-blue-500/20 text-blue-300' :
                            post.category === 'design' ? 'bg-purple-500/20 text-purple-300' :
                            post.category === 'marketing' ? 'bg-green-500/20 text-green-300' :
                            post.category === 'business' ? 'bg-orange-500/20 text-orange-300' :
                            'bg-red-500/20 text-red-300'
                          }`}>
                            {categories.find(cat => cat.id === post.category)?.label}
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
                        
                        <Button className="btn-outline-luxury group w-full">
                          Read More
                          <Calendar className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </Button>
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
                    Try adjusting your search terms or browse different categories.
                  </p>
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
                <Button className="btn-luxury">
                  Subscribe
                </Button>
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