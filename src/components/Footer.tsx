import React from "react";
import {
  Mail,
  Phone,
  MapPin,
  Linkedin,
  Instagram,
} from "lucide-react";
import {
  FaThreads,
  FaTiktok,
  FaPinterest,
  FaWhatsapp,
  FaFacebook,
} from "react-icons/fa6";

// --- Types ---
interface LinkItem {
  label: string;
  href: string;
}

interface SocialLink extends LinkItem {
  icon: React.ElementType;
}

const Footer: React.FC = () => {
  const quickLinks: LinkItem[] = [
    { label: "About Us", href: "about" },
    { label: "Services", href: "services" },
    { label: "Portfolio", href: "portfolio" },
    { label: "Blog", href: "blog" },
    { label: "Contact", href: "contact" },
  ];

  const services: LinkItem[] = [
    { label: "Web Development", href: "services/#web-development" },
    { label: "Branding & Design", href: "services/#branding" },
    { label: "Digital Marketing", href: "services/#marketing" },
    { label: "Tech Solutions", href: "services/#tech-solutions" },
    { label: "Video Production", href: "services/#video-production" },
  ];

  const socialLinks: SocialLink[] = [
    {
      icon: FaThreads,
      href: "https://www.threads.com/@nj_creativefirm?igshid=NTc4MTIwNjQ2YQ==",
      label: "Threads",
    },
    {
      icon: Linkedin,
      href: "https://www.linkedin.com/company/nj-creativefirm/",
      label: "LinkedIn",
    },
    {
      icon: Instagram,
      href: "https://www.instagram.com/nj_creativefirm?igsh=ZWdtODVwYXNnZnE0&utm_source=qr",
      label: "Instagram",
    },
    {
      icon: FaTiktok,
      href: "https://www.tiktok.com/@nj_creativefirm?_t=ZS-8zzrTOskTGG&_r=1",
      label: "Tiktok",
    },
    {
      icon: FaPinterest,
      href: "https://pin.it/BCLx4uf73",
      label: "Pinterest",
    },
    {
      icon: FaWhatsapp,
      href: "https://wa.me/2349034964186",
      label: "Whatsapp",
    },
    {
      icon: FaFacebook,
      href: "https://www.facebook.com/share/1RYXxnDbRs/",
      label: "Facebook",
    },
  ];

  return (
    <footer className="bg-card/50 border-t border-border">
      <div className="container mx-auto px-6">
        
        {/* Main Footer Content */}
        <div className="py-16">
          <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-8">
            {/* Company Info */}
            <div className="lg:col-span-2">
              <div className="flex items-center space-x-2 mb-6">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                  <span className="text-primary-foreground font-bold text-xl">
                    NJ
                  </span>
                </div>
                <span className="font-playfair text-2xl font-bold text-foreground">
                  Creative Firm
                </span>
              </div>

              <p className="text-muted-foreground mb-6 leading-relaxed max-w-md">
                At NJ Creative Firm, we believe every brand has a story worth
                telling, and telling it well makes all the difference. We are a
                dynamic branding and creative solutions agency based in Lagos,
                Nigeria.
              </p>

              {/* Contact Info */}
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <Mail className="w-5 h-5 text-secondary" />
                  <span className="text-muted-foreground">
                    info@njcreativefirm.com
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <Phone className="w-5 h-5 text-secondary" />
                  <span className="text-muted-foreground">
                    +234 (903) 496-4186
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <MapPin className="w-5 h-5 text-secondary" />
                  <span className="text-muted-foreground">
                    2 Seaside Estate, Badore, Ajah, Lagos
                  </span>
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-lg font-semibold mb-6 text-foreground">
                Quick Links
              </h4>
              <ul className="space-y-3">
                {quickLinks.map((link, index) => (
                  <li key={index}>
                    <a
                      href={link.href}
                      className="text-muted-foreground hover:text-secondary transition-colors duration-300"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Services */}
            <div>
              <h4 className="text-lg font-semibold mb-6 text-foreground">
                Services
              </h4>
              <ul className="space-y-3">
                {services.map((service, index) => (
                  <li key={index}>
                    <a
                      href={service.href}
                      className="text-muted-foreground hover:text-secondary transition-colors duration-300"
                    >
                      {service.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Newsletter Signup */}
        <div className="py-8 border-t border-border">
          <div className="glass-card p-8 rounded-2xl">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-2xl font-bold mb-4 text-foreground">Stay In The Loop</h3>
                <p className="text-muted-foreground">
                  Get the latest insights on design, development, and digital
                  strategy delivered straight to your inbox.
                </p>
              </div>
              <div>
                <div className="flex flex-col sm:flex-row gap-3">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="flex-1 px-4 py-3 rounded-lg bg-input border border-border focus:ring-2 focus:ring-secondary focus:border-transparent outline-none text-foreground"
                  />
                  <button className="btn-hero bg-primary text-primary-foreground hover:bg-primary/90 px-6 py-3 rounded-lg transition-colors whitespace-nowrap">
                    Subscribe
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar - Restructured for Mobile & Desktop */}
        <div className="py-8 border-t border-border flex flex-col gap-8">
          
          {/* Company Details & Legal Links Tier */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div className="space-y-1 text-sm text-muted-foreground">
              <p><span className="font-semibold text-foreground">Registration No:</span> 8136817 <span className="mx-2">|</span> <span className="font-semibold text-foreground">TIN:</span> 32608398-0001</p>
              <p><span className="font-semibold text-foreground">Bank Details:</span> Wema/Alat – NJ Creative Firm – 0126564974</p>
            </div>
          </div>

          {/* Copyright & Socials Tier */}
          <div className="flex flex-col-reverse md:flex-row justify-between items-center gap-6 pt-6 border-t border-border/50">
            <div className="text-muted-foreground text-sm text-center md:text-left">
              © {new Date().getFullYear()} NJ Creative Firm. All rights reserved.
            </div>

            <div className="flex flex-wrap justify-center gap-3">
              {socialLinks.map((social, index) => {
                const IconComponent = social.icon;
                return (
                  <a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-lg bg-accent hover:bg-secondary flex items-center justify-center text-accent-foreground hover:text-white transition-all duration-300 hover:-translate-y-1"
                    aria-label={social.label}
                  >
                    <IconComponent className="w-5 h-5" />
                  </a>
                );
              })}
            </div>
          </div>

        </div>
      </div>
    </footer>
  );
};

export default Footer;
