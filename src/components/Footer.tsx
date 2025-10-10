import {
  Mail,
  Phone,
  MapPin,
  Twitter,
  Linkedin,
  Instagram,
} from "lucide-react";
import { FaThreads, FaTiktok, FaPinterest, FaWhatsapp } from "react-icons/fa6";

const Footer = () => {
  const quickLinks = [
    { label: "About Us", href: "#about" },
    { label: "Services", href: "#services" },
    { label: "Portfolio", href: "#portfolio" },
    { label: "Blog", href: "#blog" },
    { label: "Contact", href: "#contact" },
  ];

  const services = [
    { label: "Web Development", href: "#" },
    { label: "Branding & Design", href: "#" },
    { label: "Digital Marketing", href: "#" },
    { label: "Tech Solutions", href: "#" },
    { label: "Consultation", href: "#" },
  ];

  const socialLinks = [
    { icon: FaThreads, href: "#", label: "Twitter" },
    { icon: Linkedin, href: "#", label: "LinkedIn" },
    { icon: Instagram, href: "#", label: "Instagram" },
    { icon: FaTiktok, href: "#", label: "Tiktok" },
    { icon: FaPinterest, href: "#", label: "Pinterest" },
    { icon: FaWhatsapp, href: "#", label: "Whatsapp" },
  ];

  return (
    <footer className="bg-card/50 border-t border-border">
      <div className="container mx-auto px-6">
        {/* Main Footer Content */}
        <div className="py-16">
          <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-8">
            {/* Company Info */}
            <div className="lg:col-span-2">
              {/* Logo */}
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
                    Seaside Estate, Ajah, Lagos
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
          <div className="glass-card p-8">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-2xl font-bold mb-4">Stay In The Loop</h3>
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
                  <button className="btn-hero px-6 py-3 whitespace-nowrap">
                    Subscribe
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="py-6 border-t border-border">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            {/* Copyright */}
            <div className="text-muted-foreground text-sm">
              © 2024 NJ Creative Firm. All rights reserved.
            </div>

            {/* Social Links */}
            <a
              className="flex items-center space-x-4"
              target="_blank"
              rel="noopener noreferrer"
            >
              {socialLinks.map((social, index) => {
                const IconComponent = social.icon;
                return (
                  <a
                    key={index}
                    href={social.href}
                    className="w-10 h-10 rounded-lg bg-accent hover:bg-accent-premium flex items-center justify-center text-accent-foreground hover:text-black transition-all duration-300 hover:scale-110"
                    aria-label={social.label}
                  >
                    <IconComponent className="w-5 h-5" />
                  </a>
                );
              })}
            </a>

            {/* Legal Links */}
            <div className="flex items-center space-x-6 text-sm">
              <a
                href="#"
                className="text-muted-foreground hover:text-secondary transition-colors duration-300"
              >
                Privacy Policy
              </a>
              <a
                href="#"
                className="text-muted-foreground hover:text-secondary transition-colors duration-300"
              >
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
