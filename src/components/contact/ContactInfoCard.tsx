import { motion } from "framer-motion";
import { MapPin, Phone, Mail, Clock } from "lucide-react";

const socialLinks = [
  { name: "Facebook", icon: "f" },
  { name: "YouTube", icon: "▶" },
  { name: "Instagram", icon: "📷" },
  { name: "Pinterest", icon: "P" },
  { name: "Twitter", icon: "𝕏" },
];

const ContactInfoCard = () => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="bg-accent text-accent-foreground rounded-2xl p-8 h-full"
    >
      <div className="space-y-8">
        {/* Address */}
        <div className="flex gap-4">
          <div className="w-10 h-10 bg-cta rounded-full flex items-center justify-center flex-shrink-0">
            <MapPin className="w-5 h-5 text-cta-foreground" />
          </div>
          <div>
            <h3 className="font-semibold mb-2">Address</h3>
            <p className="text-accent-foreground/80 text-sm">
              1234 Furniture Avenue
              <br />
              Los Angeles, CA 90001
              <br />
              United States
            </p>
          </div>
        </div>

        {/* Contact */}
        <div className="flex gap-4">
          <div className="w-10 h-10 bg-cta rounded-full flex items-center justify-center flex-shrink-0">
            <Phone className="w-5 h-5 text-cta-foreground" />
          </div>
          <div>
            <h3 className="font-semibold mb-2">Contact</h3>
            <p className="text-accent-foreground/80 text-sm">
              +1 (555) 123-4567
              <br />
              support@furniva.com
            </p>
          </div>
        </div>

        {/* Open Time */}
        <div className="flex gap-4">
          <div className="w-10 h-10 bg-cta rounded-full flex items-center justify-center flex-shrink-0">
            <Clock className="w-5 h-5 text-cta-foreground" />
          </div>
          <div>
            <h3 className="font-semibold mb-2">Open Time</h3>
            <p className="text-accent-foreground/80 text-sm">
              Monday - Friday: 9:00 AM - 6:00 PM
              <br />
              Saturday - Sunday: 10:00 AM - 4:00 PM
            </p>
          </div>
        </div>

        {/* Social Links */}
        <div>
          <h3 className="font-semibold mb-4">Stay Connected</h3>
          <div className="flex gap-3">
            {socialLinks.map((social) => (
              <a
                key={social.name}
                href="#"
                className="w-10 h-10 bg-cta rounded-full flex items-center justify-center text-cta-foreground hover:bg-cta/80 transition-colors text-sm font-semibold"
                aria-label={social.name}
              >
                {social.icon}
              </a>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ContactInfoCard;
