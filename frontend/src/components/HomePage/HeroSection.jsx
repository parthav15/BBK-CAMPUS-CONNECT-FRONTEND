import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ShieldAlert, Flower2, ArrowRightCircle } from "lucide-react";

const HeroSection = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  return (
    <section className="relative bg-gradient-to-b from-rose-50 to-white py-20 px-4 sm:px-6 lg:px-8">
      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-full opacity-10">
        <Flower2 className="absolute top-20 left-10% w-24 h-24 text-rose-200" />
        <Flower2 className="absolute bottom-10 right-15% w-24 h-24 text-rose-200 transform rotate-45" />
      </div>

      <div className="max-w-7xl mx-auto">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center"
        >
          {/* Text Content */}
          <motion.div variants={itemVariants} className="relative z-10">
            <motion.h1
              variants={itemVariants}
              className="text-4xl md:text-5xl font-playfair font-bold tracking-tight text-rose-900 mb-6"
            >
              Welcome to{" "}
              <span className="bg-gradient-to-r from-rose-600 to-gold-500 bg-clip-text text-transparent">
                BBK Campus Connect
              </span>
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="text-lg text-rose-800 mb-8 leading-relaxed"
            >
              Your trusted platform for campus safety and community engagement. 
              Report incidents swiftly, stay updated with notices, and help 
              maintain a secure learning environment for everyone.
            </motion.p>

            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Link
                to="/login-register"
                className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-full text-white bg-gradient-to-r from-rose-600 to-gold-500 hover:from-rose-700 hover:to-gold-600 shadow-lg transition-all"
              >
                Get Started
                <ArrowRightCircle className="ml-2 h-5 w-5" />
              </Link>
              
              <Link
                to="/incident-reporting"
                className="inline-flex items-center justify-center px-8 py-3 border border-rose-200 text-base font-medium rounded-full bg-white text-rose-700 hover:bg-rose-50 transition-colors"
              >
                Report Incident
                <ShieldAlert className="ml-2 h-5 w-5" />
              </Link>
            </motion.div>
          </motion.div>

          {/* Image/Illustration Section */}
          <motion.div
            variants={itemVariants}
            className="relative flex justify-center items-center"
          >
            <div className="relative w-full max-w-md aspect-square bg-gradient-to-br from-rose-100 to-rose-50 rounded-3xl shadow-lg p-8">
              <div className="absolute inset-0 border-2 border-rose-100 rounded-3xl" />
              
              {/* Replace this with actual campus image */}
              <div className="w-full h-full rounded-2xl bg-gradient-to-tr from-rose-600/10 to-gold-500/10 flex items-center justify-center">
                <ShieldAlert className="w-32 h-32 text-rose-600 opacity-50" />
              </div>
              
              {/* Decorative Badge */}
              <div className="absolute -bottom-6 -right-6 bg-white px-6 py-3 rounded-full shadow-md border border-rose-100">
                <span className="text-sm font-medium text-rose-700">
                  24/7 Incident Support
                </span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;