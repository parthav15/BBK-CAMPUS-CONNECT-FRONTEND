import { motion } from "framer-motion";
import { AlertCircle, ShieldAlert, Megaphone, CircleAlert } from "lucide-react";
import { Link } from "react-router-dom";

const HeroSection = () => {
  const floatingVariants = {
    float: {
      y: [0, -20, 0],
      transition: {
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  return (
    <section className="relative py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-rose-50 to-white overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 opacity-10">
        <motion.div
          variants={floatingVariants}
          animate="float"
          className="absolute top-20 left-20 w-48 h-48 bg-rose-100 rounded-full blur-3xl"
        />
        <motion.div
          variants={floatingVariants}
          animate="float"
          className="absolute bottom-20 right-20 w-48 h-48 bg-gold-100 rounded-full blur-3xl"
        />
      </div>

      <div className="max-w-7xl mx-auto relative">
        <div className="text-center">
          {/* Animated Alert Icon */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
            className="inline-block mb-8"
          >
            <div className="p-6 bg-rose-100 rounded-2xl shadow-lg">
              <CircleAlert className="w-16 h-16 text-rose-600" strokeWidth={1.5} />
            </div>
          </motion.div>

          {/* Main Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-playfair font-bold text-rose-900 mb-6"
          >
            Report Campus Incidents
            <br />
            <span className="bg-gradient-to-r from-rose-600 to-gold-500 bg-clip-text text-transparent">
              Quickly & Securely
            </span>
          </motion.h1>

          {/* Subheading */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-rose-800 max-w-3xl mx-auto mb-8 leading-relaxed"
          >
            Help maintain campus safety by reporting incidents in real-time. Your report will be
            immediately forwarded to campus authorities while protecting your privacy.
          </motion.p>

          {/* CTA Button */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", delay: 0.4 }}
          >
            <Link to="/create-incident">
              <button className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-rose-600 to-gold-500 text-white rounded-xl hover:from-rose-700 hover:to-gold-600 transition-all shadow-lg">
                <Megaphone className="w-6 h-6" />
                <span className="text-lg font-semibold">Report Incident Now</span>
              </button>
            </Link>
          </motion.div>

          {/* Security Assurance */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="mt-8 flex items-center justify-center gap-2 text-rose-700"
          >
            <ShieldAlert className="w-5 h-5" />
            <span className="text-sm">All reports are encrypted and confidential</span>
          </motion.div>
        </div>

        {/* Floating Incident Types */}
        <div className="hidden lg:block absolute inset-0 pointer-events-none">
          {['Theft', 'Safety', 'Harassment', 'Facility', 'Cyberbullying', 'Discrimination', 'Drugs', 'Assault', 'Threat', 'Property Damage'].map((type, index) => (
            <motion.div
              key={index}
              className="absolute text-sm font-medium px-4 py-2 bg-white/80 backdrop-blur-lg rounded-full border border-rose-100 shadow-sm"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`
              }}
              animate={{
                y: [0, -20, 0],
                rotate: [0, -5, 5, 0],
                scale: [1, 1.1, 1]
              }}
              transition={{
                duration: 4 + Math.random() * 4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              {type}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;