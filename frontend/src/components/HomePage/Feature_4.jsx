import { motion } from "framer-motion";
import { Star, Quote, Heart } from "lucide-react";

const Feature_4 = () => {
  const testimonials = [
    {
      name: "Ananya Sharma",
      role: "Computer Science Student",
      text: "BBK Connect transformed how we handle campus safety. Reporting incidents is now effortless, and the instant notifications keep everyone informed.",
      rating: 5,
      avatar: "bg-gradient-to-r from-rose-400 to-gold-400"
    },
    {
      name: "Rajesh Khanna",
      role: "College Administrator",
      text: "The notice board feature has streamlined our communication process. Real-time updates ensure important information reaches students immediately.",
      rating: 5,
      avatar: "bg-gradient-to-r from-gold-400 to-rose-400"
    },
    {
      name: "Priya Verma",
      role: "MBA Student",
      text: "Love the user-friendly interface! The feedback system actually gets responses from administration - it's revolutionized student engagement.",
      rating: 4,
      avatar: "bg-gradient-to-r from-rose-500 to-gold-500"
    }
  ];

  return (
    <section className="relative py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-rose-50 to-white overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute inset-0 opacity-15">
        <div className="absolute top-20 left-20 w-64 h-64 bg-rose-100 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-20 w-64 h-64 bg-gold-100 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto relative">
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.div 
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-rose-100 rounded-full mb-6"
          >
            <Heart className="w-5 h-5 text-rose-600" />
            <span className="text-sm font-medium text-rose-700">
              Community Voices
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-playfair font-bold text-rose-900 mb-4"
          >
            What Our <span className="bg-gradient-to-r from-rose-600 to-gold-500 bg-clip-text text-transparent">Users Say</span>
          </motion.h2>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -10 }}
              className="relative bg-white/80 backdrop-blur-lg rounded-xl p-8 shadow-lg border border-rose-100 hover:shadow-xl transition-all"
            >
              {/* Quote Icon */}
              <Quote className="absolute top-4 right-4 w-8 h-8 text-rose-200" />

              {/* User Avatar */}
              <div className={`w-16 h-16 rounded-full ${testimonial.avatar} mb-6`} />

              {/* Rating Stars */}
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-gold-400 text-gold-400" />
                ))}
              </div>

              {/* Testimonial Text */}
              <p className="text-rose-700 mb-6 leading-relaxed">
                "{testimonial.text}"
              </p>

              {/* User Info */}
              <div className="border-t border-rose-100 pt-4">
                <h3 className="font-semibold text-rose-900">{testimonial.name}</h3>
                <p className="text-sm text-rose-600">{testimonial.role}</p>
              </div>

              {/* Hover Effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-rose-50/30 to-gold-50/30 opacity-0 hover:opacity-100 rounded-xl transition-opacity -z-10" />
            </motion.div>
          ))}
        </div>

        {/* Floating Quotes */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute text-rose-100 font-playfair font-bold text-xl"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                rotate: Math.random() * 20 - 10
              }}
              animate={{
                y: [0, -20, 0],
                opacity: [0.2, 0.5, 0.2]
              }}
              transition={{
                duration: 5 + Math.random() * 5,
                repeat: Infinity
              }}
            >
              “
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Feature_4;