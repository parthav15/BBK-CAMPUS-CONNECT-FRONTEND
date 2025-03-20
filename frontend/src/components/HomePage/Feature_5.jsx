import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, MessageCircleQuestion, ShieldAlert, BellElectric, MailQuestion } from "lucide-react";
import { useState } from "react";

const Feature_5 = () => {
  const [activeIndex, setActiveIndex] = useState(null);
  const [isMessageHovered, setIsMessageHovered] = useState(false);

  const faqs = [
    {
      question: "How do I report an incident?",
      answer: "Use our Incident Reporting form with step-by-step guidance. You'll receive a tracking ID immediately after submission.",
      icon: ShieldAlert,
      color: "bg-rose-100"
    },
    {
      question: "Are my reports anonymous?",
      answer: "You can choose to report anonymously or provide details. All personal information is kept confidential.",
      icon: MailQuestion,
      color: "bg-gold-100"
    },
    {
      question: "How quickly are notices updated?",
      answer: "Notices are posted in real-time by authorized staff and appear instantly on the Notice Board.",
      icon: BellElectric,
      color: "bg-rose-100"
    },
    {
      question: "Can I edit my submitted report?",
      answer: "Yes, you can edit reports within 24 hours using your tracking ID. Contact support for later modifications.",
      icon: MessageCircleQuestion,
      color: "bg-gold-100"
    }
  ];

  return (
    <section className="relative py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white to-rose-50 overflow-hidden">
      {/* Floating Message Icon */}
      <motion.div 
        animate={{ y: [0, -20, 0] }}
        transition={{ duration: 4, repeat: Infinity }}
        className="absolute top-20 right-10% opacity-10"
      >
        <MessageCircleQuestion className="w-48 h-48 text-rose-200" />
      </motion.div>

      <div className="max-w-7xl mx-auto relative">
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.div 
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-rose-100 rounded-full mb-6"
          >
            <MessageCircleQuestion className="w-5 h-5 text-rose-600" />
            <span className="text-sm font-medium text-rose-700">
              Need Help?
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-playfair font-bold text-rose-900 mb-4"
          >
            Frequently Asked{" "}
            <span className="bg-gradient-to-r from-rose-600 to-gold-500 bg-clip-text text-transparent">
              Questions
            </span>
          </motion.h2>
        </div>

        {/* FAQ Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`p-6 rounded-xl ${faq.color} backdrop-blur-lg border border-rose-100 cursor-pointer`}
              onClick={() => setActiveIndex(activeIndex === index ? null : index)}
            >
              <div className="flex items-start gap-4">
                <div className="p-3 bg-white rounded-lg shadow-sm">
                  <faq.icon className="w-6 h-6 text-rose-600" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-rose-900">
                      {faq.question}
                    </h3>
                    <motion.div
                      animate={{ rotate: activeIndex === index ? 180 : 0 }}
                    >
                      <ChevronDown className="w-5 h-5 text-rose-600" />
                    </motion.div>
                  </div>

                  <AnimatePresence>
                    {activeIndex === index && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="overflow-hidden"
                      >
                        <p className="mt-4 text-rose-700 leading-relaxed">
                          {faq.answer}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Interactive Help Prompt */}
        <motion.div 
          className="mt-16 p-6 bg-white/80 backdrop-blur-lg rounded-xl border border-rose-100 max-w-2xl mx-auto text-center"
          whileHover={{ scale: 1.02 }}
          onHoverStart={() => setIsMessageHovered(true)}
          onHoverEnd={() => setIsMessageHovered(false)}
        >
          <motion.div 
            animate={{ scale: isMessageHovered ? 1.2 : 1 }}
            className="inline-block mb-4"
          >
            <MessageCircleQuestion className="w-8 h-8 text-rose-600" />
          </motion.div>
          <h3 className="text-xl font-semibold text-rose-900 mb-2">
            Still have questions?
          </h3>
          <p className="text-rose-700 mb-4">
            Our support team is ready to help you 24/7
          </p>
          <button className="px-6 py-2 bg-gradient-to-r from-rose-600 to-gold-500 text-white rounded-full hover:from-rose-700 hover:to-gold-600 transition-all">
            Contact Support
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default Feature_5;