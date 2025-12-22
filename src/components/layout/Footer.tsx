import { motion } from "framer-motion";
import { Facebook, Twitter, Instagram, Linkedin, MapPin, Phone, Mail } from "lucide-react";

const footerLinks = {
  company: [
    { name: "About Us", href: "/about" },
    { name: "Our Team", href: "/team" },
    { name: "Careers", href: "/careers" },
    { name: "Press", href: "/press" },
  ],
  customerServices: [
    { name: "Help Center", href: "/help" },
    { name: "Track Order", href: "/track" },
    { name: "Returns", href: "/returns" },
    { name: "Shipping Info", href: "/shipping" },
  ],
  ourInformation: [
    { name: "Privacy Policy", href: "/privacy" },
    { name: "Terms & Conditions", href: "/terms" },
    { name: "FAQs", href: "/faqs" },
    { name: "Blog", href: "/blog" },
  ],
};

const socialLinks = [
  { icon: Facebook, href: "#" },
  { icon: Twitter, href: "#" },
  { icon: Instagram, href: "#" },
  { icon: Linkedin, href: "#" },
];

export const Footer = () => {
  return (
    <footer className="bg-footer text-footer-foreground py-16">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-2"
          >
            <a href="/" className="text-3xl font-bold text-footer-foreground mb-4 block">
              Furniva
            </a>
            <p className="body-2 text-footer-foreground/70 mb-6 max-w-sm">
              Discover premium furniture that combines style, comfort, and quality.
              Transform your living space with our curated collection.
            </p>
            <div className="flex gap-4">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  whileHover={{ scale: 1.1, y: -2 }}
                  className="w-10 h-10 rounded-full bg-footer-foreground/10 flex items-center justify-center hover:bg-cta transition-colors"
                >
                  <social.icon className="h-5 w-5" />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Company Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <h4 className="text-footer-foreground mb-4">Company</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="body-2 text-footer-foreground/70 hover:text-cta transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Customer Services */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <h4 className="text-footer-foreground mb-4">Customer Services</h4>
            <ul className="space-y-3">
              {footerLinks.customerServices.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="body-2 text-footer-foreground/70 hover:text-cta transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <h4 className="text-footer-foreground mb-4">Contact Info</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-cta flex-shrink-0 mt-0.5" />
                <span className="body-2 text-footer-foreground/70">
                  123 Furniture Street, Design District, NY 10001
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-cta flex-shrink-0" />
                <span className="body-2 text-footer-foreground/70">+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-cta flex-shrink-0" />
                <span className="body-2 text-footer-foreground/70">info@furniva.com</span>
              </li>
            </ul>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="border-t border-footer-foreground/20 mt-12 pt-8 text-center"
        >
          <p className="body-3 text-footer-foreground/60">
            © {new Date().getFullYear()} Furniva. All rights reserved.
          </p>
        </motion.div>
      </div>
    </footer>
  );
};
