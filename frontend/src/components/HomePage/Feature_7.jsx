import { motion } from "framer-motion";
import { Activity, AlertTriangle, BellRing, MessageSquareText } from "lucide-react";

const Feature_7 = () => {
  const stats = [
    { icon: Activity, value: "95%", label: "Incidents Resolved", color: "bg-rose-100" },
    { icon: AlertTriangle, value: "1.2K", label: "Safety Reports", color: "bg-gold-100" },
    { icon: BellRing, value: "500+", label: "Active Notices", color: "bg-rose-100" },
    { icon: MessageSquareText, value: "4.8", label: "User Rating", color: "bg-gold-100" }
  ];

  return (
    <section className="relative py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white to-rose-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <motion.div 
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-rose-100 rounded-full mb-6"
          >
            <Activity className="w-5 h-5 text-rose-600" />
            <span className="text-sm font-medium text-rose-700">
              By The Numbers
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-playfair font-bold text-rose-900 mb-4"
          >
            Campus Safety
            <span className="bg-gradient-to-r from-rose-600 to-gold-500 bg-clip-text text-transparent">
              {" "}In Action
            </span>
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              className={`${stat.color} p-6 rounded-xl border border-rose-100 backdrop-blur-lg`}
            >
              <div className="flex items-center gap-4 mb-4">
                <stat.icon className="w-8 h-8 text-rose-600" />
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="text-3xl font-bold bg-gradient-to-r from-rose-600 to-gold-500 bg-clip-text text-transparent"
                >
                  {stat.value}
                </motion.div>
              </div>
              <p className="text-lg font-medium text-rose-900">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Feature_7;