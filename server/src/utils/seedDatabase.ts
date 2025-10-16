import BlogCategory from '../models/BlogCategory';
import BlogPost from '../models/BlogPost';

export async function seedDatabase() {
  try {
    // Check if categories already exist
    const existingCategories = await BlogCategory.countDocuments();
    if (existingCategories > 0) {
      console.log('Database already seeded, skipping...');
      return;
    }

    // Create categories
    const categories = await BlogCategory.create([
      {
        name: 'Branding',
        slug: 'branding',
        description: 'Brand identity, logo design, and visual storytelling'
      },
      {
        name: 'Web Development',
        slug: 'web-development',
        description: 'Modern web solutions and digital experiences'
      },
      {
        name: 'Marketing',
        slug: 'marketing',
        description: 'Digital marketing strategies and campaigns'
      },
      {
        name: 'Design Trends',
        slug: 'design-trends',
        description: 'Latest design trends and creative insights'
      },
      {
        name: 'Business Growth',
        slug: 'business-growth',
        description: 'Strategies for scaling your business'
      }
    ]);

    console.log(`✅ Created ${categories.length} categories`);

    // Create sample blog posts
    const posts = await BlogPost.create([
      {
        title: 'The Power of Visual Branding in 2025',
        slug: 'power-of-visual-branding-2025',
        excerpt: 'Discover how strong visual branding can transform your business and create lasting impressions in the digital age.',
        content: `
          <h2>Why Visual Branding Matters</h2>
          <p>In today's competitive marketplace, visual branding is more important than ever. Your brand's visual identity is often the first point of contact with potential customers.</p>
          
          <h3>Key Elements of Strong Visual Branding</h3>
          <ul>
            <li>Consistent color palette across all platforms</li>
            <li>Memorable logo design that tells your story</li>
            <li>Typography that reflects your brand personality</li>
            <li>Cohesive imagery and visual style</li>
          </ul>
          
          <h3>The Impact on Business Growth</h3>
          <p>Companies with strong visual branding see up to 23% more revenue than those without. Your visual identity builds trust, recognition, and emotional connections with your audience.</p>
          
          <p>At NJ Creative Firm, we specialize in creating powerful visual identities that resonate with your target audience and drive business results.</p>
        `,
        featuredImage: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800',
        category: categories[0]._id,
        tags: ['branding', 'design', 'visual identity', 'logo design'],
        published: true,
        readTime: 5,
        date: new Date('2025-01-15')
      },
      {
        title: 'Modern Web Development: Trends to Watch',
        slug: 'modern-web-development-trends',
        excerpt: 'Stay ahead of the curve with these cutting-edge web development trends that are shaping the future of digital experiences.',
        content: `
          <h2>The Evolution of Web Development</h2>
          <p>Web development is constantly evolving, and 2025 brings exciting new possibilities for creating engaging digital experiences.</p>
          
          <h3>Top Trends for 2025</h3>
          <ol>
            <li><strong>AI-Powered Personalization</strong> - Tailoring user experiences based on behavior and preferences</li>
            <li><strong>Progressive Web Apps</strong> - Combining the best of web and mobile apps</li>
            <li><strong>Voice-Activated Interfaces</strong> - Making websites more accessible and user-friendly</li>
            <li><strong>Motion UI</strong> - Engaging users with smooth animations and transitions</li>
          </ol>
          
          <h3>Why It Matters for Your Business</h3>
          <p>Staying current with web development trends ensures your website remains competitive, fast, and engaging. A modern website is essential for converting visitors into customers.</p>
        `,
        featuredImage: 'https://images.unsplash.com/photo-1547658719-da2b51169166?w=800',
        category: categories[1]._id,
        tags: ['web development', 'technology', 'trends', 'digital'],
        published: true,
        readTime: 7,
        date: new Date('2025-01-20')
      },
      {
        title: 'Digital Marketing Strategies That Actually Work',
        slug: 'digital-marketing-strategies-that-work',
        excerpt: 'Cut through the noise with proven digital marketing strategies that deliver real ROI for your business.',
        content: `
          <h2>Beyond the Hype: Real Marketing Results</h2>
          <p>In a world full of marketing gimmicks, these strategies have proven track records of delivering measurable results.</p>
          
          <h3>Proven Strategies</h3>
          <ul>
            <li><strong>Content Marketing</strong> - Building authority through valuable content</li>
            <li><strong>Social Media Engagement</strong> - Creating genuine connections with your audience</li>
            <li><strong>Email Nurturing</strong> - Converting leads through personalized communication</li>
            <li><strong>SEO Optimization</strong> - Getting found by the right people at the right time</li>
          </ul>
          
          <h3>Measuring Success</h3>
          <p>We focus on metrics that matter: conversion rates, customer lifetime value, and return on investment. Every campaign is data-driven and optimized for performance.</p>
        `,
        featuredImage: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800',
        category: categories[2]._id,
        tags: ['marketing', 'strategy', 'roi', 'digital marketing'],
        published: true,
        readTime: 6,
        date: new Date('2025-01-25')
      },
      {
        title: 'Minimalism vs. Maximalism: Finding Your Brand Style',
        slug: 'minimalism-vs-maximalism-brand-style',
        excerpt: 'Explore the debate between minimalist and maximalist design approaches and discover which style suits your brand best.',
        content: `
          <h2>The Great Design Debate</h2>
          <p>Design trends swing between minimalism and maximalism, but the best choice depends on your brand's unique personality and goals.</p>
          
          <h3>Minimalist Design</h3>
          <p><strong>Pros:</strong> Clean, timeless, easy to navigate, focuses on essentials</p>
          <p><strong>Best for:</strong> Tech companies, luxury brands, professional services</p>
          
          <h3>Maximalist Design</h3>
          <p><strong>Pros:</strong> Bold, memorable, expressive, emotionally engaging</p>
          <p><strong>Best for:</strong> Creative agencies, fashion brands, entertainment</p>
          
          <h3>The Hybrid Approach</h3>
          <p>Many successful brands blend both approaches, using minimalism for usability while incorporating maximalist elements for personality and impact.</p>
        `,
        featuredImage: 'https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=800',
        category: categories[3]._id,
        tags: ['design', 'trends', 'minimalism', 'branding'],
        published: true,
        readTime: 4,
        date: new Date('2025-02-01')
      },
      {
        title: 'Scaling Your Business: From Startup to Success',
        slug: 'scaling-business-startup-to-success',
        excerpt: 'Learn the essential strategies for scaling your business sustainably while maintaining quality and culture.',
        content: `
          <h2>The Art of Sustainable Growth</h2>
          <p>Scaling isn't just about growing faster—it's about growing smarter. Here's how to do it right.</p>
          
          <h3>Key Growth Strategies</h3>
          <ol>
            <li><strong>Build Systems First</strong> - Create processes that work without you</li>
            <li><strong>Invest in Your Team</strong> - Hire people smarter than you</li>
            <li><strong>Focus on Customer Success</strong> - Happy customers become your best salespeople</li>
            <li><strong>Leverage Technology</strong> - Automate what you can, optimize what you can't</li>
          </ol>
          
          <h3>Common Pitfalls to Avoid</h3>
          <p>Growing too fast, neglecting company culture, and losing sight of your core values are common mistakes. We help businesses scale thoughtfully and sustainably.</p>
        `,
        featuredImage: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=800',
        category: categories[4]._id,
        tags: ['business', 'growth', 'scaling', 'entrepreneurship'],
        published: true,
        readTime: 8,
        date: new Date('2025-02-05')
      },
      {
        title: 'The Psychology of Color in Brand Design',
        slug: 'psychology-of-color-brand-design',
        excerpt: 'Understanding how colors influence emotions and decisions can give your brand a powerful competitive advantage.',
        content: `
          <h2>Color Psychology in Branding</h2>
          <p>Colors aren't just aesthetic choices—they're psychological triggers that influence how people feel about your brand.</p>
          
          <h3>Color Meanings</h3>
          <ul>
            <li><strong>Blue</strong> - Trust, reliability, professionalism (banks, tech companies)</li>
            <li><strong>Red</strong> - Energy, passion, urgency (food, entertainment)</li>
            <li><strong>Green</strong> - Growth, health, sustainability (eco-brands, wellness)</li>
            <li><strong>Yellow</strong> - Optimism, creativity, warmth (creative industries)</li>
            <li><strong>Purple</strong> - Luxury, creativity, wisdom (premium brands)</li>
          </ul>
          
          <h3>Choosing Your Brand Colors</h3>
          <p>Consider your target audience, industry standards, and the emotions you want to evoke. The right color palette can increase brand recognition by up to 80%.</p>
        `,
        featuredImage: 'https://images.unsplash.com/photo-1541411438265-4cb4687110f2?w=800',
        category: categories[0]._id,
        tags: ['branding', 'color theory', 'psychology', 'design'],
        published: true,
        readTime: 5,
        date: new Date('2025-02-10')
      }
    ]);

    console.log(`✅ Created ${posts.length} blog posts`);
    console.log('🎉 Database seeding completed successfully!');

  } catch (error) {
    console.error('❌ Error seeding database:', error);
    throw error;
  }
}
