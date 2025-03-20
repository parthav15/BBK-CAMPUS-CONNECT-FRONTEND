import { motion } from "framer-motion";
import { Megaphone, Bell, ClipboardList, Mailbox, Sparkles } from "lucide-react";

const Feature_3 = () => {
  const features = [
    {
      icon: Megaphone,
      title: "Instant Announcements",
      description: "Important notices posted directly by authorized staff members",
      color: "bg-rose-100"
    },
    {
      icon: Bell,
      title: "Real-time Alerts",
      description: "Push notifications & email alerts for urgent notices",
      color: "bg-gold-100"
    },
    {
      icon: ClipboardList,
      title: "Organized Archives",
      description: "Categorized notices with advanced search functionality",
      color: "bg-rose-100"
    },
    {
      icon: Mailbox,
      title: "Direct Communication",
      description: "Reply to notices or request clarification instantly",
      color: "bg-gold-100"
    }
  ];

  const sampleNotice = {
    title: "Semester Schedule Update",
    date: "2024-03-15",
    author: "Academic Office",
    content: "Revised timetable for final year students now available. Check portal for details.",
    urgent: true
  };

  return (
    <section className="relative py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white to-rose-50">
      {/* Decorative Elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10% w-48 h-48 bg-rose-100 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-20% w-48 h-48 bg-gold-100 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.div 
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-rose-100 rounded-full mb-6"
          >
            <Sparkles className="w-5 h-5 text-rose-600" />
            <span className="text-sm font-medium text-rose-700">
              Live Notice Updates
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-playfair font-bold text-rose-900 mb-4"
          >
            Campus Notice Board <br />
            <span className="bg-gradient-to-r from-rose-600 to-gold-500 bg-clip-text text-transparent">
              Reimagined
            </span>
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Features List */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`p-6 rounded-xl ${feature.color} backdrop-blur-lg border border-rose-100`}
              >
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-white rounded-lg shadow-sm">
                    <feature.icon className="w-6 h-6 text-rose-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-rose-900 mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-rose-700 text-sm leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Interactive Notice Preview */}
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            className="relative bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl p-8 border border-rose-100"
          >
            {/* Notification Badge */}
            <div className="absolute -top-3 -right-3 flex items-center gap-1 px-3 py-1 bg-rose-600 text-white rounded-full text-sm">
              <Bell className="w-4 h-4" />
              <span>New Notice!</span>
            </div>

            {/* Notice Header */}
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-rose-100 rounded-lg">
                <Megaphone className="w-6 h-6 text-rose-600" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-rose-900">
                  {sampleNotice.title}
                </h3>
                <p className="text-sm text-rose-500">
                  {sampleNotice.date} • {sampleNotice.author}
                </p>
              </div>
            </div>

            {/* Notice Content */}
            <div className="mb-6">
              <p className="text-rose-700 leading-relaxed">
                {sampleNotice.content}
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3">
              <button className="px-4 py-2 bg-rose-100 text-rose-700 rounded-lg hover:bg-rose-200 transition-colors">
                Mark as Read
              </button>
              <button className="px-4 py-2 bg-gold-100 text-rose-700 rounded-lg hover:bg-gold-200 transition-colors">
                Save Notice
              </button>
            </div>

            {/* Pinned Notices List */}
            <div className="mt-8 pt-6 border-t border-rose-100">
              <h4 className="text-sm font-semibold text-rose-600 mb-3">
                Recent Notices
              </h4>
              <div className="space-y-2">
                {["Sports Fest Update", "Library Timings Change", "Scholarship Deadline"].map((notice, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ x: 5 }}
                    className="flex items-center gap-2 p-2 hover:bg-rose-50 rounded-lg cursor-pointer"
                  >
                    <div className="w-2 h-2 bg-rose-400 rounded-full" />
                    <span className="text-sm text-rose-700">{notice}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Feature_3;