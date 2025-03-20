import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

const Feature_1 = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  };

  return (
    <section className="relative py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white to-rose-50 overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 opacity-10">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
          className="absolute -top-32 -left-32 w-64 h-64 bg-gradient-to-r from-rose-200 to-gold-100 rounded-full blur-3xl opacity-50"
        />
        <motion.div
          animate={{ x: [-100, 100, -100] }}
          transition={{ duration: 15, repeat: Infinity }}
          className="absolute top-1/4 right-0 w-48 h-48 bg-gradient-to-b from-rose-100 to-gold-50 rounded-full blur-2xl opacity-30"
        />
      </div>

      <div className="max-w-7xl mx-auto relative">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
        >
          {/* Left Column - Description */}
          <motion.div variants={itemVariants} className="space-y-6">
            <motion.div
              variants={itemVariants}
              className="inline-flex items-center gap-2 px-4 py-2 bg-rose-100 rounded-full"
            >
              <Sparkles className="w-5 h-5 text-rose-600" />
              <span className="text-sm font-medium text-rose-700">
                Campus Safety Reinvented
              </span>
            </motion.div>

            <motion.h2
              variants={itemVariants}
              className="text-4xl md:text-5xl font-playfair font-bold text-rose-900"
            >
              Transforming Campus Security Through{" "}
              <span className="bg-gradient-to-r from-rose-600 to-gold-500 bg-clip-text text-transparent">
                Digital Innovation
              </span>
            </motion.h2>

            <motion.p
              variants={itemVariants}
              className="text-lg text-rose-800 leading-relaxed"
            >
              BBK Campus Connect revolutionizes campus safety with real-time incident reporting,
              instant notifications, and community-driven solutions. Our platform bridges the gap
              between students, faculty, and administration through cutting-edge technology and
              intuitive design.
            </motion.p>
          </motion.div>

          {/* Right Column - Project Highlight */}
          <motion.div
            variants={itemVariants}
            className="relative flex justify-center items-center min-h-[400px]"
          >
            <div className="relative z-10 w-full max-w-lg">
              <div className="absolute inset-0 bg-gradient-to-br from-rose-600/10 to-gold-500/10 rounded-3xl blur-xl" />

              <div className="relative bg-white/80 backdrop-blur-lg rounded-3xl p-8 shadow-2xl border border-rose-100">
                <div className="space-y-6">
                  <div className="inline-block bg-rose-100 px-4 py-2 rounded-full">
                    <span className="text-sm font-medium text-rose-700">
                      Project Name
                    </span>
                  </div>

                  <motion.div
                    animate={{ y: [-5, 5, -5] }}
                    transition={{ duration: 4, repeat: Infinity }}
                    className="text-6xl md:text-7xl font-playfair font-bold text-transparent bg-clip-text bg-gradient-to-r from-rose-600 to-gold-500"
                  >
                    BBK
                    <span className="block mt-2">Campus</span>
                    <span className="block">Connect</span>
                  </motion.div>
                </div>
              </div>
            </div>

            {/* Floating Particles */}
            <div className="absolute inset-0">
              {[...Array(15)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-2 h-2 bg-rose-400 rounded-full"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                  }}
                  animate={{
                    scale: [0.8, 1.2, 0.8],
                    opacity: [0.4, 0.8, 0.4],
                  }}
                  transition={{
                    duration: 2 + Math.random() * 2,
                    repeat: Infinity,
                  }}
                />
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Feature_1;