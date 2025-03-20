import { motion } from "framer-motion";
import { User, Mail, MessageCircle, Phone, Send } from "lucide-react";

const ContactUs = () => {
  return (
    <section className="relative py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white to-rose-50">
      {/* Decorative Elements */}
      <div className="relative inset-0 opacity-10">
        <div className="relative top-10 left-10 w-48 h-48 bg-rose-100 rounded-full blur-3xl" />
        <div className="relative bottom-10 right-10 w-48 h-48 bg-gold-100 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto relative">
        <div className="text-center mb-16">
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-rose-100 rounded-full mb-6"
          >
            <MessageCircle className="w-5 h-5 text-rose-600" />
            <span className="text-sm font-medium text-rose-700">
              Get In Touch
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-playfair font-bold text-rose-900 mb-4"
          >
            Contact <span className="bg-gradient-to-r from-rose-600 to-gold-500 bg-clip-text text-transparent">Our Team</span>
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="bg-white/80 backdrop-blur-lg p-8 rounded-2xl shadow-xl border border-rose-100"
          >
            <form className="space-y-6">
              <div className="space-y-4">
                {/* Name Input */}
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-rose-500" />
                  <input
                    type="text"
                    placeholder="Your Name"
                    className="w-full pl-10 pr-4 py-3 bg-rose-50/50 rounded-lg border border-rose-200 focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                  />
                </div>

                {/* Email Input */}
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-rose-500" />
                  <input
                    type="email"
                    placeholder="Your Email"
                    className="w-full pl-10 pr-4 py-3 bg-rose-50/50 rounded-lg border border-rose-200 focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                  />
                </div>

                {/* Message Textarea */}
                <div className="relative">
                  <MessageCircle className="absolute left-3 top-4 w-5 h-5 text-rose-500" />
                  <textarea
                    placeholder="Your Message"
                    rows="4"
                    className="w-full pl-10 pr-4 py-3 bg-rose-50/50 rounded-lg border border-rose-200 focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                  ></textarea>
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-rose-600 to-gold-500 text-white rounded-lg hover:from-rose-700 hover:to-gold-600 transition-all"
              >
                <Send className="w-5 h-5" />
                Send Message
              </motion.button>
            </form>
          </motion.div>

          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="space-y-8 text-center lg:text-left"
          >
            <div className="space-y-4">
              <div className="inline-flex items-center gap-3 p-4 bg-rose-100 rounded-xl">
                <Phone className="w-6 h-6 text-rose-600" />
                <div>
                  <h3 className="text-lg font-semibold text-rose-900">Emergency Hotline</h3>
                  <p className="text-rose-700">+91 12345 67890</p>
                </div>
              </div>

              <div className="inline-flex items-center gap-3 p-4 bg-gold-100 rounded-xl">
                <Mail className="w-6 h-6 text-rose-600" />
                <div>
                  <h3 className="text-lg font-semibold text-rose-900">General Support</h3>
                  <p className="text-rose-700">support@bbkcampusconnect.in</p>
                </div>
              </div>

              <div className="inline-flex items-center gap-3 p-4 bg-rose-100 rounded-xl">
                <User className="w-6 h-6 text-rose-600" />
                <div>
                  <h3 className="text-lg font-semibold text-rose-900">Campus Address</h3>
                  <p className="text-rose-700">BBK DAV College, Civil Lines, Ludhiana, Punjab</p>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex justify-center lg:justify-start gap-4">
              {['Facebook', 'Twitter', 'Instagram', 'LinkedIn'].map((platform, index) => (
                <motion.a
                  key={index}
                  whileHover={{ y: -5 }}
                  className="p-2 bg-rose-100 text-rose-700 rounded-full hover:bg-rose-200 transition-colors"
                  href="#"
                >
                  <span className="sr-only">{platform}</span>
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                    {/* Add social media icons here */}
                  </svg>
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactUs;
