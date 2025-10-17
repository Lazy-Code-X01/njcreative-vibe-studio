import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Mail, Phone, MapPin, Clock, Send, MessageCircle, CheckCircle2, AlertCircle } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import SEO from "@/components/SEO";
import { FaSpinner } from "react-icons/fa6";
import { contactFormSchema, type ContactFormData } from "@/lib/validations/contact";
import { contactApi } from "@/lib/contactApi";
import { z } from "zod";

const Contact = () => {
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Partial<Record<keyof ContactFormData, string>>>({});
  const [formData, setFormData] = useState<ContactFormData>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    companyName: "",
    helpMessage: "",
    selectedServices: [],
    dateTime: "",
    companyLogo: null,
    signature: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, type, value } = e.target;
    const files = (e.target as HTMLInputElement).files;

    if (type === "file" && files) {
      setFormData((prev) => ({
        ...prev,
        [name]: files[0],
      }));
    } else if (type === "checkbox") {
      const checkbox = e.target as HTMLInputElement;
      setFormData((prev) => ({
        ...prev,
        selectedServices: checkbox.checked
          ? [...prev.selectedServices, value]
          : prev.selectedServices.filter((service) => service !== value),
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const validateField = (name: keyof ContactFormData, value: any) => {
    try {
      const fieldSchema = contactFormSchema.shape[name];
      fieldSchema.parse(value);
      setErrors(prev => ({ ...prev, [name]: undefined }));
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        setErrors(prev => ({ ...prev, [name]: error.errors[0].message }));
      }
      return false;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    try {
      // Validate all fields
      const validatedData = contactFormSchema.parse(formData);
      setLoading(true);

      const formDataToSend = new FormData();
      Object.entries(validatedData).forEach(([key, value]) => {
        if (key === "selectedServices") {
          formDataToSend.append(key, JSON.stringify(value));
        } else if (value instanceof File) {
          formDataToSend.append(key, value);
        } else if (value !== null && value !== undefined && value !== "") {
          formDataToSend.append(key, String(value));
        }
      });

      await contactApi.submitContactForm(formDataToSend);
      
      setSubmitted(true);
      toast.success(
        "Thank you! Your enquiry has been submitted successfully. We'll get back to you within 24-48 hours.",
        { duration: 6000 }
      );

      // Reset form
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        address: "",
        companyName: "",
        helpMessage: "",
        selectedServices: [],
        dateTime: "",
        companyLogo: null,
        signature: "",
      });

      // Reset file input
      const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement;
      if (fileInput) fileInput.value = '';

      // Scroll to top smoothly
      window.scrollTo({ top: 0, behavior: 'smooth' });

    } catch (error) {
      if (error instanceof z.ZodError) {
        const fieldErrors: Partial<Record<keyof ContactFormData, string>> = {};
        error.errors.forEach((err) => {
          if (err.path[0]) {
            fieldErrors[err.path[0] as keyof ContactFormData] = err.message;
          }
        });
        setErrors(fieldErrors);
        toast.error("Please correct the errors in the form before submitting.");
      } else {
        console.error("Error submitting form:", error);
        toast.error(
          error instanceof Error ? error.message : "Failed to submit form. Please try again or contact us directly.",
          { duration: 5000 }
        );
      }
    } finally {
      setLoading(false);
    }
  };

  const contactInfo = [
    {
      icon: <Mail className="w-6 h-6" />,
      title: "Email Us",
      details: ["projects@njcreativefirm.com"],
      action: "Send Email",
    },
    {
      icon: <Phone className="w-6 h-6" />,
      title: "Call Us",
      details: ["+234 903 496 4186"],
      action: "Call Now",
    },
    {
      icon: <MapPin className="w-6 h-6" />,
      title: "Visit Us",
      details: ["Seaside Estate, Ajah, Lagos", "Nigeria"],
      action: "Get Directions",
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: "Business Hours",
      details: [
        "Monday - Friday: 9:00 AM - 6:00 PM",
        "Saturday: 10:00 AM - 4:00 PM",
      ],
      action: "Schedule Call",
    },
  ];

  const services = [
    "Web Development",
    "Branding & Design",
    "Digital Marketing",
    "Tech Solutions",
    "E-commerce",
    "Mobile App Development",
    "SEO & Analytics",
    "Other",
  ];

  const budgetRanges = [
    "Under $5,000",
    "$5,000 - $10,000",
    "$10,000 - $25,000",
    "$25,000 - $50,000",
    "$50,000 - $100,000",
    "$100,000+",
  ];

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="Contact Us"
        description="Get in touch with NJ Creative Firm for premium digital solutions. Let's discuss your project and create something extraordinary together."
        keywords="contact us, project consultation, digital agency contact, Lagos"
      />
      <Navigation />

      <main className="pt-24">
        {/* Hero Section */}
        <section className="py-20 relative overflow-hidden">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto text-center">
              {submitted && (
                <div className="mb-8 p-6 bg-green-500/10 border border-green-500/20 rounded-2xl animate-fade-in">
                  <div className="flex items-center justify-center gap-3 mb-3">
                    <CheckCircle2 className="w-8 h-8 text-green-500" />
                    <h2 className="text-2xl font-bold text-green-500">Enquiry Submitted!</h2>
                  </div>
                  <p className="text-muted-foreground">
                    We've received your project details and will respond within 24-48 hours.
                  </p>
                </div>
              )}
              <h1 className="text-5xl md:text-7xl font-serif font-bold mb-8 leading-tight">
                Let's Create
                <span className="block gradient-text animate-gradient italic">
                  Something
                </span>
                Extraordinary
              </h1>
              <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed mb-10">
                Ready to transform your digital presence? Get in touch with our
                team and let's discuss how we can bring your vision to life.
              </p>
            </div>
          </div>
        </section>

        {/* Contact Methods */}
        <section className="pb-16">
          <div className="container mx-auto px-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
              {contactInfo.map((info, index) => (
                <div
                  key={index}
                  className="glass-card p-6 text-center hover:scale-105 transition-all duration-300 group"
                >
                  <div className="text-primary mb-4 flex justify-center group-hover:scale-110 transition-transform">
                    {info.icon}
                  </div>
                  <h3 className="font-bold text-lg mb-3 font-heading">
                    {info.title}
                  </h3>
                  <div className="space-y-1 mb-4">
                    {info.details.map((detail, idx) => (
                      <p key={idx} className="text-muted-foreground text-sm">
                        {detail}
                      </p>
                    ))}
                  </div>
                  <Button className="btn-outline-luxury text-sm">
                    {info.action}
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Form & Map */}
        <section className="pb-20">
          <div className="container mx-auto px-6">
            <div className="grid lg:grid-cols-2 gap-12 max-w-7xl mx-auto">
              {/* Contact Form */}
              <div>
                <h2 className="text-4xl font-serif font-bold mb-8">
                  Start Your Project
                </h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        First Name *
                      </label>
                      <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        onBlur={() => validateField('firstName', formData.firstName)}
                        required
                        className={`w-full px-4 py-3 bg-card border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary text-foreground transition-colors ${
                          errors.firstName ? 'border-red-500 focus:ring-red-500' : 'border-border'
                        }`}
                        placeholder="John"
                      />
                      {errors.firstName && (
                        <p className="mt-1 text-sm text-red-500 flex items-center gap-1">
                          <AlertCircle className="w-3 h-3" />
                          {errors.firstName}
                        </p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Last Name *
                      </label>
                      <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        onBlur={() => validateField('lastName', formData.lastName)}
                        required
                        className={`w-full px-4 py-3 bg-card border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary text-foreground transition-colors ${
                          errors.lastName ? 'border-red-500 focus:ring-red-500' : 'border-border'
                        }`}
                        placeholder="Doe"
                      />
                      {errors.lastName && (
                        <p className="mt-1 text-sm text-red-500 flex items-center gap-1">
                          <AlertCircle className="w-3 h-3" />
                          {errors.lastName}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        onBlur={() => validateField('email', formData.email)}
                        required
                        className={`w-full px-4 py-3 bg-card border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary text-foreground transition-colors ${
                          errors.email ? 'border-red-500 focus:ring-red-500' : 'border-border'
                        }`}
                        placeholder="john@company.com"
                      />
                      {errors.email && (
                        <p className="mt-1 text-sm text-red-500 flex items-center gap-1">
                          <AlertCircle className="w-3 h-3" />
                          {errors.email}
                        </p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        onBlur={() => validateField('phone', formData.phone)}
                        required
                        className={`w-full px-4 py-3 bg-card border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary text-foreground transition-colors ${
                          errors.phone ? 'border-red-500 focus:ring-red-500' : 'border-border'
                        }`}
                        placeholder="+234 903 496 4186"
                      />
                      {errors.phone && (
                        <p className="mt-1 text-sm text-red-500 flex items-center gap-1">
                          <AlertCircle className="w-3 h-3" />
                          {errors.phone}
                        </p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Address
                    </label>
                    <input
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-card border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary text-foreground"
                      placeholder="Your Address"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Company Name *
                    </label>
                    <input
                      type="text"
                      name="companyName"
                      value={formData.companyName}
                      onChange={handleInputChange}
                      onBlur={() => validateField('companyName', formData.companyName)}
                      required
                      className={`w-full px-4 py-3 bg-card border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary text-foreground transition-colors ${
                        errors.companyName ? 'border-red-500 focus:ring-red-500' : 'border-border'
                      }`}
                      placeholder="Your Company"
                    />
                    {errors.companyName && (
                      <p className="mt-1 text-sm text-red-500 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        {errors.companyName}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      How can we help you? *
                    </label>
                    <textarea
                      name="helpMessage"
                      value={formData.helpMessage}
                      onChange={handleInputChange}
                      onBlur={() => validateField('helpMessage', formData.helpMessage)}
                      required
                      rows={4}
                      className={`w-full px-4 py-3 bg-card border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary text-foreground resize-none transition-colors ${
                        errors.helpMessage ? 'border-red-500 focus:ring-red-500' : 'border-border'
                      }`}
                      placeholder="Tell us about your project goals, timeline, and any specific requirements..."
                    />
                    <div className="flex justify-between mt-1">
                      {errors.helpMessage ? (
                        <p className="text-sm text-red-500 flex items-center gap-1">
                          <AlertCircle className="w-3 h-3" />
                          {errors.helpMessage}
                        </p>
                      ) : (
                        <p className="text-xs text-muted-foreground">
                          {formData.helpMessage.length}/2000 characters
                        </p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Select Services Required *
                    </label>
                    <div className={`grid grid-cols-2 gap-4 p-4 rounded-xl border transition-colors ${
                      errors.selectedServices ? 'border-red-500 bg-red-500/5' : 'border-border'
                    }`}>
                      {services.map((service) => (
                        <div
                          key={service}
                          className="flex items-center space-x-2"
                        >
                          <input
                            type="checkbox"
                            id={`service-${service}`}
                            name="selectedServices"
                            value={service}
                            checked={formData.selectedServices.includes(service)}
                            onChange={handleInputChange}
                            className="w-4 h-4 rounded border-border text-primary focus:ring-primary cursor-pointer"
                          />
                          <label htmlFor={`service-${service}`} className="text-sm cursor-pointer">
                            {service}
                          </label>
                        </div>
                      ))}
                    </div>
                    {errors.selectedServices && (
                      <p className="mt-1 text-sm text-red-500 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        {errors.selectedServices}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Preferred Date and Time
                    </label>
                    <input
                      type="datetime-local"
                      name="dateTime"
                      value={formData.dateTime}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-card border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary text-foreground"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Company Logo (Optional)
                    </label>
                    <input
                      type="file"
                      name="companyLogo"
                      onChange={handleInputChange}
                      accept="image/jpeg,image/png,image/webp,image/svg+xml"
                      className={`w-full px-4 py-3 bg-card border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary text-foreground transition-colors ${
                        errors.companyLogo ? 'border-red-500 focus:ring-red-500' : 'border-border'
                      }`}
                    />
                    <p className="mt-1 text-xs text-muted-foreground">
                      Accepted formats: JPEG, PNG, WebP, SVG (Max 5MB)
                    </p>
                    {errors.companyLogo && (
                      <p className="mt-1 text-sm text-red-500 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        {errors.companyLogo}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Signature
                    </label>
                    <input
                      type="text"
                      name="signature"
                      value={formData.signature}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-card border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary text-foreground"
                      placeholder="Type your full name as signature"
                    />
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4">
                    <Button
                      type="submit"
                      className="btn-luxury group flex-1"
                      disabled={loading}
                    >
                      <span className="flex items-center justify-center">
                        {loading ? (
                          <>
                            <FaSpinner className="w-4 h-4 animate-spin mr-2" />
                            Sending...
                          </>
                        ) : (
                          <>
                            Send Message
                            <Send className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                          </>
                        )}
                      </span>
                    </Button>
                    <Button type="button" className="btn-outline-luxury flex-1">
                      <MessageCircle className="mr-2 w-4 h-4" />
                      Schedule Call
                    </Button>
                  </div>
                </form>
              </div>

              {/* Map & Info */}
              <div className="space-y-8">
                <div>
                  <h3 className="text-2xl font-bold mb-6 font-heading">
                    Our Location
                  </h3>
                  <div className="glass-card p-6 mb-6">
                    <div className="aspect-w-16 aspect-h-12 mb-4">
                      <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.9663095343008!2d-74.00425878428698!3d40.74844684379132!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c259bf5c1654f3%3A0xc80f9cfce5383d5d!2sNew%20York%2C%20NY%2010001%2C%20USA!5e0!3m2!1sen!2sus!4v1640995200000!5m2!1sen!2sus"
                        width="100%"
                        height="300"
                        style={{ border: 0, borderRadius: "12px" }}
                        allowFullScreen
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                      />
                    </div>
                    <div className="text-center">
                      <h4 className="font-bold mb-2">NJ Creative Firm HQ</h4>
                      <p className="text-muted-foreground text-sm mb-4">
                        Seaside Estate, Ajah, Lagos
                        <br />
                        Nigeria
                      </p>
                      <Button className="btn-outline-luxury text-sm">
                        Get Directions
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Quick Contact Options */}
                <div className="glass-card p-6">
                  <h3 className="text-xl font-bold mb-4 font-heading">
                    Prefer Direct Contact?
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3 p-3 rounded-xl hover:bg-muted/10 transition-colors cursor-pointer">
                      <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                        <Phone className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium">Call us directly</p>
                        <p className="text-sm text-muted-foreground">
                          +234 903 496 4186
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-3 p-3 rounded-xl hover:bg-muted/10 transition-colors cursor-pointer">
                      <div className="w-10 h-10 bg-secondary/10 rounded-full flex items-center justify-center">
                        <Mail className="w-5 h-5 text-secondary" />
                      </div>
                      <div>
                        <p className="font-medium">Email us</p>
                        <p className="text-sm text-muted-foreground">
                          projects@njcreativefirm.com
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-3 p-3 rounded-xl hover:bg-muted/10 transition-colors cursor-pointer">
                      <div className="w-10 h-10 bg-accent-premium/10 rounded-full flex items-center justify-center">
                        <MessageCircle className="w-5 h-5 text-accent-premium" />
                      </div>
                      <div>
                        <p className="font-medium">WhatsApp</p>
                        <p className="text-sm text-muted-foreground">
                          +234 903 496 4186
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-20 bg-card">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-4xl md:text-5xl font-serif font-bold mb-6">
                  Frequently Asked Questions
                </h2>
                <p className="text-xl text-muted-foreground">
                  Quick answers to common questions about our services and
                  process.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div>
                    <h3 className="font-bold mb-2">
                      What is your typical project timeline?
                    </h3>
                    <p className="text-muted-foreground text-sm">
                      Project timelines vary based on scope, but most websites
                      take 4-8 weeks, while larger applications can take 3-6
                      months.
                    </p>
                  </div>

                  <div>
                    <h3 className="font-bold mb-2">
                      Do you work with startups?
                    </h3>
                    <p className="text-muted-foreground text-sm">
                      Absolutely! We love working with startups and offer
                      flexible packages to fit different budgets and growth
                      stages.
                    </p>
                  </div>

                  <div>
                    <h3 className="font-bold mb-2">
                      What's included in ongoing support?
                    </h3>
                    <p className="text-muted-foreground text-sm">
                      Our support includes hosting, security updates,
                      performance monitoring, content updates, and technical
                      assistance.
                    </p>
                  </div>
                </div>

                <div className="space-y-6">
                  <div>
                    <h3 className="font-bold mb-2">
                      Can you help with existing projects?
                    </h3>
                    <p className="text-muted-foreground text-sm">
                      Yes! We offer project rescue services, redesigns,
                      performance optimization, and ongoing development for
                      existing projects.
                    </p>
                  </div>

                  <div>
                    <h3 className="font-bold mb-2">Do you provide training?</h3>
                    <p className="text-muted-foreground text-sm">
                      We provide comprehensive training on content management,
                      basic updates, and best practices for your team.
                    </p>
                  </div>

                  <div>
                    <h3 className="font-bold mb-2">
                      What payment methods do you accept?
                    </h3>
                    <p className="text-muted-foreground text-sm">
                      We accept all major credit cards, bank transfers, and
                      offer flexible payment plans for larger projects.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Contact;
