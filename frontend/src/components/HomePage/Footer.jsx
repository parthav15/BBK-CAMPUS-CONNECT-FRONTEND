import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Phone, Mail, MapPin, Facebook, Twitter, Instagram, Linkedin } from "lucide-react";

const Footer = () => {
  const links = [
    { title: "Quick Links", items: ["Home", "Incidents", "Notices", "Feedback"] },
    { title: "Resources", items: ["Safety Tips", "FAQs", "Contact Support", "Privacy Policy"] },
    { title: "Campus", items: ["About BBK", "Departments", "Events", "Alumni"] }
  ];

  return (
    <footer className="relative bg-rose-50/80 backdrop-blur-lg border-t border-rose-100">
      {/* Decorative Gradients */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div className="absolute top-0 left-0 w-64 h-64 bg-rose-200 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-64 h-64 bg-gold-200 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Newsletter Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div className="flex items-center gap-2">
              <div className="bg-gradient-to-r from-rose-600 to-gold-500 p-2 rounded-lg">
                <Mail className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-2xl font-playfair font-bold text-rose-900">
                Newsletter
              </h3>
            </div>
            <p className="text-rose-700">
              Subscribe to get campus updates and safety alerts
            </p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-4 py-2 bg-white rounded-lg border border-rose-200 focus:ring-2 focus:ring-rose-500"
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                className="px-4 py-2 bg-gradient-to-r from-rose-600 to-gold-500 text-white rounded-lg hover:from-rose-700 hover:to-gold-600 transition-all"
              >
                Subscribe
              </motion.button>
            </div>
          </motion.div>

          {/* Footer Links */}
          {links.map((section, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="space-y-4"
            >
              <h4 className="text-lg font-semibold text-rose-900">
                {section.title}
              </h4>
              <ul className="space-y-2">
                {section.items.map((item, i) => (
                  <li key={i}>
                    <Link
                      to={`/${item.toLowerCase().replace(' ', '-')}`}
                      className="text-rose-700 hover:text-rose-600 transition-colors"
                    >
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Contact Info & Socials */}
        <div className="border-t border-rose-100 pt-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Contact Information */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="space-y-4"
            >
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-rose-600" />
                <span className="text-rose-700">+91 12345 67890</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-rose-600" />
                <span className="text-rose-700">support@bbkcampusconnect.in</span>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="w-5 h-5 text-rose-600" />
                <span className="text-rose-700">BBK DAV College, Ludhiana, Punjab</span>
              </div>
            </motion.div>

            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="flex md:justify-end gap-4"
            >
              <motion.a
                whileHover={{ y: -5 }}
                className="p-2 bg-rose-100 text-rose-700 rounded-full hover:bg-rose-200 transition-colors"
                href="https://facebook.com" target="_blank" rel="noopener noreferrer"
              >
                <Facebook className="w-5 h-5" />
              </motion.a>
              <motion.a
                whileHover={{ y: -5 }}
                className="p-2 bg-rose-100 text-rose-700 rounded-full hover:bg-rose-200 transition-colors"
                href="https://twitter.com" target="_blank" rel="noopener noreferrer"
              >
                <Twitter className="w-5 h-5" />
              </motion.a>
              <motion.a
                whileHover={{ y: -5 }}
                className="p-2 bg-rose-100 text-rose-700 rounded-full hover:bg-rose-200 transition-colors"
                href="https://instagram.com" target="_blank" rel="noopener noreferrer"
              >
                <Instagram className="w-5 h-5" />
              </motion.a>
              <motion.a
                whileHover={{ y: -5 }}
                className="p-2 bg-rose-100 text-rose-700 rounded-full hover:bg-rose-200 transition-colors"
                href="https://linkedin.com" target="_blank" rel="noopener noreferrer"
              >
                <Linkedin className="w-5 h-5" />
              </motion.a>
            </motion.div>
          </div>

          {/* Copyright */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="mt-8 text-center text-rose-600"
          >
            © {new Date().getFullYear()} BBK DAV Campus Connect. All rights reserved.
          </motion.div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;