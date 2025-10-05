import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import {
  ArrowRight,
  Code,
  Palette,
  TrendingUp,
  Cog,
  Check,
  Briefcase,
} from 'lucide-react';
import brandingAndDesigning from '../assets/branding-and-designing.jpg';
import digitalMarketing from '../assets/digital-marketing.jpg';
import generalServices from '../assets/general-services.jpg';
import techSolutions from '../assets/tech-solutions.jpg';
import webDevelopment from '../assets/web-development.jpg';

const Services = () => {
  const services = [
    {
      id: 'web-development',
      icon: <Code className="w-12 h-12" />,
      title: 'Web Development',
      subtitle: 'Modern, Responsive, High-Performance',
      description:
        'Custom websites and web applications built with cutting-edge technologies that scale with your business growth.',
      features: [
        'Responsive Design & Development',
        'E-commerce Solutions',
        'Progressive Web Apps (PWA)',
        'API Integration & Development',
        'Performance Optimization',
        'SEO-Ready Architecture',
      ],
      technologies: [
        'React',
        'Next.js',
        'Node.js',
        'TypeScript',
        'Tailwind CSS',
      ],
      startingPrice: '$5,000',
      image: webDevelopment,
    },
    {
      id: 'branding',
      icon: <Palette className="w-12 h-12" />,
      title: 'Branding & Design',
      subtitle: 'Memorable, Strategic, Impactful',
      description:
        'Complete brand identity systems that capture your essence and resonate with your target audience.',
      features: [
        'Brand Strategy & Positioning',
        'Logo & Visual Identity Design',
        'Brand Guidelines & Systems',
        'Marketing Collateral Design',
        'Packaging & Print Design',
        'Digital Asset Creation',
      ],
      technologies: ['Adobe Creative Suite', 'Figma', 'Sketch', 'Principle'],
      startingPrice: '$3,000',
      image: brandingAndDesigning,
    },
    {
      id: 'marketing',
      icon: <TrendingUp className="w-12 h-12" />,
      title: 'Digital Marketing',
      subtitle: 'Data-Driven, Results-Focused',
      description:
        'Strategic digital marketing campaigns that drive engagement, conversions, and sustainable growth.',
      features: [
        'SEO & Content Strategy',
        'Social Media Marketing',
        'Pay-Per-Click Advertising',
        'Email Marketing Automation',
        'Analytics & Reporting',
        'Conversion Optimization',
      ],
      technologies: [
        'Google Analytics',
        'SEMrush',
        'Mailchimp',
        'Facebook Ads',
      ],
      startingPrice: '$2,500/mo',
      image: digitalMarketing,
    },
    {
      id: 'tech-solutions',
      icon: <Cog className="w-12 h-12" />,
      title: 'Tech Solutions',
      subtitle: 'Custom, Scalable, Innovative',
      description:
        'Bespoke technology solutions including mobile apps, automation systems, and enterprise platforms.',
      features: [
        'Mobile App Development',
        'Custom Software Solutions',
        'System Integration',
        'Process Automation',
        'Cloud Solutions',
        'Technical Consulting',
      ],
      technologies: ['React Native', 'Python', 'AWS', 'Docker', 'PostgreSQL'],
      startingPrice: '$10,000',
      image: techSolutions,
    },
    {
      id: 'general-services',
      icon: <Briefcase className="w-12 h-12" />,
      title: 'General Services',
      subtitle: 'Reliable, Versatile, Supportive',
      description:
        'Comprehensive business and operational services designed to keep your organization running smoothly and efficiently, allowing you to focus on growth.',
      features: [
        'Administrative & Virtual Assistance',
        'Business Documentation & Reports',
        'Customer Support Solutions',
        'IT Support & Maintenance',
        'Project Coordination',
        'Training & Onboarding Support',
      ],
      technologies: [
        'Microsoft Office Suite',
        'Google Workspace',
        'Slack',
        'Trello',
        'Zoom',
      ],
      startingPrice: '$1,500',
      image: generalServices,
    },
  ];

  const process = [
    {
      step: '01',
      title: 'Discovery',
      description:
        'We dive deep into your business goals, target audience, and competitive landscape.',
    },
    {
      step: '02',
      title: 'Strategy',
      description:
        'Our team develops a comprehensive strategy tailored to your specific needs and objectives.',
    },
    {
      step: '03',
      title: 'Design',
      description:
        'We create stunning visuals and user experiences that align with your brand identity.',
    },
    {
      step: '04',
      title: 'Development',
      description:
        'Our developers bring the designs to life with clean, scalable, and optimized code.',
    },
    {
      step: '05',
      title: 'Launch',
      description:
        'We ensure a smooth launch with thorough testing and performance optimization.',
    },
    {
      step: '06',
      title: 'Growth',
      description:
        'Post-launch support and continuous optimization to maximize your ROI.',
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <main className="pt-24">
        {/* Hero Section */}
        <section className="py-20 relative overflow-hidden">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-5xl md:text-7xl font-serif font-bold mb-8 leading-tight">
                Premium Digital
                <span className="block gradient-text animate-gradient italic">
                  Services
                </span>
                That Deliver Results
              </h1>
              <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed mb-10">
                From concept to completion, we provide end-to-end digital
                solutions that elevate your brand and drive measurable business
                growth.
              </p>
            </div>
          </div>
        </section>

        {/* Services Grid */}
        <section className="py-20">
          <div className="container mx-auto px-6">
            <div className="space-y-20">
              {services.map((service, index) => (
                <div
                  key={service.id}
                  className={`grid lg:grid-cols-2 gap-12 items-center ${
                    index % 2 === 1 ? 'lg:grid-flow-col-dense' : ''
                  }`}
                >
                  <div className={index % 2 === 1 ? 'lg:col-start-2' : ''}>
                    <div className="glass-card p-8 hover:scale-105 transition-all duration-500">
                      <div className="text-primary mb-6">{service.icon}</div>
                      <span className="text-sm text-muted-foreground tracking-wider uppercase font-medium">
                        {service.subtitle}
                      </span>
                      <h2 className="text-4xl font-serif font-bold mb-4 mt-2">
                        {service.title}
                      </h2>
                      <p className="text-muted-foreground mb-8 leading-relaxed">
                        {service.description}
                      </p>

                      <div className="space-y-3 mb-8">
                        {service.features.map((feature, idx) => (
                          <div
                            key={idx}
                            className="flex items-center space-x-3"
                          >
                            <Check className="w-5 h-5 text-primary flex-shrink-0" />
                            <span className="text-foreground">{feature}</span>
                          </div>
                        ))}
                      </div>

                      <div className="mb-8">
                        <h4 className="font-semibold mb-3">
                          Technologies We Use:
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {service.technologies.map((tech, idx) => (
                            <span
                              key={idx}
                              className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <span className="text-sm text-muted-foreground">
                            Starting at
                          </span>
                          <div className="text-2xl font-bold text-primary">
                            {service.startingPrice}
                          </div>
                        </div>
                        <Button className="btn-luxury group">
                          Get Started
                          <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </Button>
                      </div>
                    </div>
                  </div>

                  <div className={index % 2 === 1 ? 'lg:col-start-1' : ''}>
                    <div className="relative">
                      <img
                        src={service.image}
                        alt={service.title}
                        className="w-full h-80 object-cover rounded-2xl"
                      />
                      <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-2xl" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Process Section */}
        <section className="py-20 bg-card">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-serif font-bold mb-6">
                Our Process
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                A proven methodology that ensures every project delivers
                exceptional results and exceeds your expectations.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {process.map((item, index) => (
                <div key={index} className="relative group">
                  <div className="glass-card p-8 h-full hover:scale-105 transition-all duration-300">
                    <div className="text-6xl font-black text-primary/20 mb-4 font-heading">
                      {item.step}
                    </div>
                    <h3 className="text-2xl font-bold mb-4 font-heading">
                      {item.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {item.description}
                    </p>
                  </div>

                  {index < process.length - 1 && (
                    <div className="hidden lg:block absolute top-1/2 -right-4 w-8 h-0.5 bg-gradient-to-r from-primary to-secondary" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 relative overflow-hidden">
          <div className="container mx-auto px-6 text-center">
            <h2 className="text-4xl md:text-5xl font-serif font-bold mb-8">
              Ready to Start Your Project?
            </h2>
            <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
              Let's discuss your goals and create a custom solution that drives
              results and exceeds your expectations.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="btn-luxury group text-lg px-10 py-5">
                Get Free Consultation
                <ArrowRight className="ml-3 w-5 h-5 group-hover:translate-x-2 transition-transform" />
              </Button>
              <Button className="btn-outline-luxury text-lg px-10 py-5">
                View Our Work
              </Button>
            </div>
          </div>

          {/* Background Elements */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute -top-32 -left-32 w-64 h-64 rounded-full bg-primary/5 blur-3xl" />
            <div className="absolute -bottom-32 -right-32 w-96 h-96 rounded-full bg-secondary/5 blur-3xl" />
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Services;
