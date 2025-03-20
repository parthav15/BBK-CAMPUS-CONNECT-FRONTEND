import { motion } from "framer-motion";
import { ShieldCheck, BellRing, MessagesSquare, Rocket } from "lucide-react";

const Feature_2 = () => {
  const features = [
    {
      icon: ShieldCheck,
      title: "Instant Incident Response",
      description: "24/7 monitoring with immediate alerts to campus authorities"
    },
    {
      icon: BellRing,
      title: "Real-time Notifications",
      description: "Get instant updates about campus emergencies and notices"
    },
    {
      icon: MessagesSquare,
      title: "Community Support",
      description: "Collaborative platform for student-faculty communication"
    },
    {
      icon: Rocket,
      title: "Modern Platform",
      description: "AI-powered insights for proactive campus safety measures"
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  return (
    <section className="relative py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-rose-50 to-white">
      {/* Decorative Elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-64 h-64 bg-gradient-to-r from-rose-200 to-gold-100 rounded-full blur-3xl opacity-30" />
        <div className="absolute bottom-0 right-0 w-64 h-64 bg-gradient-to-b from-gold-100 to-rose-200 rounded-full blur-3xl opacity-30" />
      </div>

      <div className="max-w-7xl mx-auto relative">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {/* Section Header */}
          <motion.div 
            variants={itemVariants}
            className="text-center mb-16"
          >
            <motion.div
              className="inline-flex items-center gap-2 px-4 py-2 bg-rose-100 rounded-full mb-6"
            >
              <ShieldCheck className="w-5 h-5 text-rose-600" />
              <span className="text-sm font-medium text-rose-700">
                Trusted by 5000+ Students
              </span>
            </motion.div>

            <motion.h2
              variants={itemVariants}
              className="text-4xl md:text-5xl font-playfair font-bold text-rose-900 mb-4"
            >
              Why Students Choose 
              <span className="bg-gradient-to-r from-rose-600 to-gold-500 bg-clip-text text-transparent">
                {" "}BBK Connect?
              </span>
            </motion.h2>
          </motion.div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ y: -10 }}
                className="group relative bg-white/80 backdrop-blur-lg rounded-xl p-6 shadow-lg border border-rose-100 hover:shadow-xl transition-all"
              >
                {/* Hover Effect Background */}
                <div className="absolute inset-0 bg-gradient-to-br from-rose-50/50 to-gold-50/50 opacity-0 group-hover:opacity-100 rounded-xl transition-opacity" />
                
                <div className="relative z-10">
                  <div className="w-12 h-12 mb-4 flex items-center justify-center bg-rose-100 rounded-lg">
                    <feature.icon className="w-6 h-6 text-rose-600" />
                  </div>
                  
                  <h3 className="text-xl font-semibold text-rose-900 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-rose-700 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Floating Particles */}
          <div className="absolute inset-0 pointer-events-none">
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1.5 h-1.5 bg-rose-300 rounded-full"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`
                }}
                animate={{
                  y: [0, -20, 0],
                  opacity: [0.3, 0.8, 0.3]
                }}
                transition={{
                  duration: 3 + Math.random() * 2,
                  repeat: Infinity
                }}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Feature_2;