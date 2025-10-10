import { useState, useEffect } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link, useLocation } from "react-router-dom";

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { label: "Home", path: "/" },
    { label: "About", path: "/about" },
    {
      label: "Services",
      path: "/services",
      dropdown: [
        { label: "Web Development", path: "/services#web-development" },
        { label: "Branding & Design", path: "/services#branding" },
        { label: "Digital Marketing", path: "/services#marketing" },
        { label: "Tech Solutions", path: "/services#tech-solutions" },
        { label: "Services", path: "/services#services" },
        { label: "Printing", path: "/services#printing" },
        { label: "Photography", path: "/services#photography" },
      ],
    },
    { label: "Portfolio", path: "/portfolio" },
    { label: "Blog", path: "/blog" },
    { label: "Contact", path: "/contact" },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-500 ${
        isScrolled ? "glass py-4" : "py-6"
      }`}
    >
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-1 group">
            <div className="relative">
              <img
                src="/uploads/logo.png"
                alt="DJ Creative Firm Logo"
                className="w-12 h-12 object-contain transition-transform duration-300 group-hover:scale-105"
              />
            </div>
            <div className="flex flex-col">
              <span className="font-serif text-2xl font-bold text-foreground group-hover:text-primary transition-colors duration-300">
                Creative Firm
              </span>
              <span className="text-xs text-muted-foreground font-body tracking-wider">
                PREMIUM DIGITAL AGENCY
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1">
            {navItems.map((item) => (
              <div key={item.label} className="relative group">
                {item.dropdown ? (
                  <div
                    className="relative"
                    onMouseEnter={() => setIsServicesOpen(true)}
                    onMouseLeave={() => setIsServicesOpen(false)}
                  >
                    <Link
                      to={item.path}
                      className={`flex items-center px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                        isActive(item.path)
                          ? "text-primary bg-glass-primary"
                          : "text-muted-foreground hover:text-primary hover:bg-glass-luxury"
                      }`}
                    >
                      {item.label}
                      <ChevronDown
                        className={`ml-1 w-4 h-4 transition-transform duration-300 ${
                          isServicesOpen ? "rotate-180" : ""
                        }`}
                      />
                    </Link>

                    {/* Dropdown */}
                    <div
                      className={`absolute top-full left-0 mt-2 w-64 glass-card rounded-2xl p-2 transition-all duration-300 ${
                        isServicesOpen
                          ? "opacity-100 visible translate-y-0"
                          : "opacity-0 invisible -translate-y-2"
                      }`}
                    >
                      {item.dropdown.map((dropdownItem) => (
                        <Link
                          key={dropdownItem.label}
                          to={dropdownItem.path}
                          onClick={(e) => {
                            const id = dropdownItem.path.split("#")[1];
                            const element = document.getElementById(id);
                            if (element) {
                              e.preventDefault();
                              element.scrollIntoView({ behavior: "smooth" });
                              setIsServicesOpen(false);
                            }
                          }}
                          className="block px-4 py-3 text-muted-foreground hover:text-primary hover:bg-glass-luxury rounded-xl transition-all duration-300 font-medium"
                        >
                          {dropdownItem.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                ) : (
                  <Link
                    to={item.path}
                    className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                      isActive(item.path)
                        ? "text-primary bg-glass-primary"
                        : "text-muted-foreground hover:text-primary hover:bg-glass-luxury"
                    }`}
                  >
                    {item.label}
                  </Link>
                )}
              </div>
            ))}
          </div>

          {/* CTA Button */}
          <div className="hidden lg:block">
            <Link to="/contact">
              <Button className="btn-luxury font-semibold">Get Started</Button>
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="lg:hidden p-2 text-foreground hover:text-primary transition-colors duration-300"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          className={`lg:hidden overflow-hidden transition-all duration-500 ${
            isMobileMenuOpen ? "max-h-96 opacity-100 mt-6" : "max-h-0 opacity-0"
          }`}
        >
          <div className="glass-card rounded-2xl p-6">
            <div className="flex flex-col space-y-4">
              {navItems.map((item) => (
                <Link
                  key={item.label}
                  to={item.path}
                  className={`py-3 font-medium transition-all duration-300 ${
                    isActive(item.path)
                      ? "text-primary border-l-2 border-primary pl-4"
                      : "text-muted-foreground hover:text-primary hover:pl-4"
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              <Link to="/contact">
                <Button className="btn-luxury mt-4 font-semibold">
                  Get Started
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
