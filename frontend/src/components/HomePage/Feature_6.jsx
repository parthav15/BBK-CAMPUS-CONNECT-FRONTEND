import { motion } from "framer-motion";
import { AlertTriangle, Lock, LifeBuoy, Activity } from "lucide-react";

const Feature_6 = () => {
    const safetyTips = [
        {
            icon: AlertTriangle,
            title: "Emergency Preparedness",
            tips: ["Know emergency exits", "Save campus security numbers", "Attend safety workshops"]
        },
        {
            icon: Lock,
            title: "Personal Safety",
            tips: ["Use buddy system at night", "Secure personal belongings", "Avoid isolated areas"]
        },
        {
            icon: LifeBuoy,
            title: "First Aid Basics",
            tips: ["Learn CPR techniques", "Locate AED stations", "Know first-aid locations"]
        },
        {
            icon: Activity,
            title: "Health Security",
            tips: ["Report health hazards", "Maintain hygiene", "Use medical alert feature"]
        }
    ];

  return (
    <section className="relative py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-rose-50 to-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <motion.div 
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-rose-100 rounded-full mb-6"
          >
            <Activity className="w-5 h-5 text-rose-600" />
            <span className="text-sm font-medium text-rose-700">
              Safety First
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-playfair font-bold text-rose-900 mb-4"
          >
            Campus Safety
            <span className="bg-gradient-to-r from-rose-600 to-gold-500 bg-clip-text text-transparent">
              {" "}Guidelines
            </span>
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {safetyTips.map((tip, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.05 }}
              className="bg-white/80 backdrop-blur-lg p-6 rounded-xl border border-rose-100 shadow-lg"
            >
              <div className="flex items-center gap-3 mb-4">
                <tip.icon className="w-8 h-8 text-rose-600" />
                <h3 className="text-xl font-semibold text-rose-900">{tip.title}</h3>
              </div>
              <ul className="space-y-2">
                {tip.tips.map((item, i) => (
                  <li key={i} className="flex items-center gap-2 text-rose-700">
                    <div className="w-2 h-2 bg-rose-400 rounded-full" />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Feature_6;