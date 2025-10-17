import { PortfolioProject } from '../models/PortfolioProject';

export async function seedPortfolio() {
  const count = await PortfolioProject.countDocuments();
  if (count > 0) {
    console.log('Portfolio projects already seeded');
    return;
  }

  const projects = [
    {
      title: "E-commerce Revolution",
      slug: "ecommerce-revolution",
      category: "Web Development",
      client: "TechCorp Solutions",
      description: "Modern e-commerce platform with advanced features and seamless user experience. Built with cutting-edge technologies to deliver exceptional performance and scalability.",
      image: "https://images.unsplash.com/photo-1661956602116-aa6865609028?auto=format&fit=crop&w=1200&q=80",
      technologies: ["React", "Node.js", "Stripe", "AWS", "MongoDB", "Redis"],
      results: ["+250% conversion rate", "99.9% uptime", "2M+ monthly users"],
      link: "https://example.com",
      featured: true
    },
    {
      title: "Brand Identity Suite",
      slug: "brand-identity-suite",
      category: "Branding",
      client: "GlobalBrand Inc",
      description: "Complete brand transformation for a Fortune 500 company with global impact. Comprehensive brand guidelines and marketing collateral.",
      image: "https://images.unsplash.com/photo-1634942537034-2531766767d1?auto=format&fit=crop&w=1200&q=80",
      technologies: ["Brand Design", "Guidelines", "Marketing", "Strategy"],
      results: ["+180% brand recognition", "40+ markets launched", "Award-winning design"],
      link: "https://example.com",
      featured: true
    },
    {
      title: "Mobile Banking App",
      slug: "mobile-banking-app",
      category: "Mobile App",
      client: "FinTech Innovations",
      description: "Next-generation mobile banking experience with advanced security features and intuitive design for seamless financial management.",
      image: "https://images.unsplash.com/photo-1563986768494-4dee2763ff3f?auto=format&fit=crop&w=1200&q=80",
      technologies: ["React Native", "Node.js", "PostgreSQL", "AWS", "Plaid API"],
      results: ["4.9★ App Store rating", "1M+ downloads", "Best FinTech App 2024"],
      link: "https://example.com",
      featured: true
    },
    {
      title: "Healthcare Portal",
      slug: "healthcare-portal",
      category: "Web Development",
      client: "MediCare Plus",
      description: "Comprehensive patient management system with telemedicine capabilities, appointment scheduling, and secure health records management.",
      image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1200&q=80",
      technologies: ["Vue.js", "Python", "Django", "PostgreSQL", "WebRTC"],
      results: ["50K+ active patients", "95% satisfaction rate", "HIPAA compliant"],
      link: "https://example.com",
      featured: false
    },
    {
      title: "SaaS Dashboard",
      slug: "saas-dashboard",
      category: "Web Development",
      client: "DataMetrics Co",
      description: "Advanced analytics dashboard for enterprise clients with real-time data visualization and customizable reporting tools.",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80",
      technologies: ["React", "TypeScript", "GraphQL", "D3.js", "Elasticsearch"],
      results: ["+300% data processing speed", "10K+ enterprise users", "Industry leader"],
      link: "https://example.com",
      featured: false
    },
    {
      title: "Restaurant Booking System",
      slug: "restaurant-booking-system",
      category: "Mobile App",
      client: "Foodie Networks",
      description: "Seamless restaurant discovery and booking platform with real-time availability, reviews, and personalized recommendations.",
      image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80",
      technologies: ["Flutter", "Firebase", "Node.js", "MongoDB", "Google Maps API"],
      results: ["5K+ restaurants", "100K+ monthly bookings", "4.8★ rating"],
      link: "https://example.com",
      featured: false
    }
  ];

  await PortfolioProject.insertMany(projects);
  console.log('Portfolio projects seeded successfully');
}
