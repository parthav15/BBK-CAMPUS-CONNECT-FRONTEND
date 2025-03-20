import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from '../components/HomePage/Navbar';
import Footer from '../components/HomePage/Footer';
import { 
  MapPinIcon,
  EnvelopeIcon,
  PhoneIcon,
  HeartIcon
} from "@heroicons/react/24/outline";

const ContactusPage = () => {
    const navigate = useNavigate();
  
    useEffect(() => {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/login-register');
      }
    }, [navigate]);
    
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      toast.error('Please fill out all fields!');
      return;
    }

    console.log('Contact form submitted:', formData);
    toast.success('Your message has been sent!');
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  const formVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  const infoVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: { opacity: 1, x: 0 }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-rose-50 flex flex-col">
      <Navbar />

      <div className="my-12" />

      <ToastContainer
        position="top-right"
        autoClose={2000}
        toastStyle={{ 
          backgroundColor: '#fff1f2',
          color: '#881337',
          border: '1px solid #ffe4e6'
        }}
        progressStyle={{ background: '#f43f5e' }}
      />

      <div className="flex-grow flex flex-col lg:flex-row items-center justify-center p-8 space-y-8 lg:space-y-0 lg:space-x-12">
        {/* Contact Form */}
        <motion.div
          className="w-full lg:w-1/2 bg-white backdrop-blur-lg rounded-2xl p-8 border border-rose-100 shadow-xl"
          variants={formVariants}
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.5 }}
        >
          <div className="text-center mb-8">
            <div className="inline-block bg-rose-100 p-4 rounded-full mb-6">
              <HeartIcon className="h-12 w-12 text-rose-600 mx-auto" />
            </div>
            <h2 className="text-4xl font-playfair font-bold text-rose-900 mb-3">
              Contact Our Team
            </h2>
            <p className="text-rose-700 max-w-md mx-auto">
              Have questions? We're here to help with your cardiac care needs
            </p>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <div>
                <label className="block text-rose-900 font-medium mb-2">Full Name</label>
                <input
                  type="text"
                  name="name"
                  placeholder="John Doe"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-white border-2 border-rose-100 rounded-xl focus:outline-none focus:border-rose-300 focus:ring-2 focus:ring-rose-100 transition-all text-rose-900 placeholder-rose-300"
                />
              </div>

              <div>
                <label className="block text-rose-900 font-medium mb-2">Email Address</label>
                <input
                  type="email"
                  name="email"
                  placeholder="john@example.com"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-white border-2 border-rose-100 rounded-xl focus:outline-none focus:border-rose-300 focus:ring-2 focus:ring-rose-100 transition-all text-rose-900 placeholder-rose-300"
                />
              </div>

              <div>
                <label className="block text-rose-900 font-medium mb-2">Subject</label>
                <input
                  type="text"
                  name="subject"
                  placeholder="Regarding Cardiac Care"
                  value={formData.subject}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-white border-2 border-rose-100 rounded-xl focus:outline-none focus:border-rose-300 focus:ring-2 focus:ring-rose-100 transition-all text-rose-900 placeholder-rose-300"
                />
              </div>

              <div>
                <label className="block text-rose-900 font-medium mb-2">Message</label>
                <textarea
                  name="message"
                  placeholder="How can we assist you?"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows="4"
                  className="w-full px-4 py-3 bg-white border-2 border-rose-100 rounded-xl focus:outline-none focus:border-rose-300 focus:ring-2 focus:ring-rose-100 transition-all text-rose-900 placeholder-rose-300 resize-none"
                />
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              type="submit"
              className="w-full py-4 bg-rose-600 hover:bg-rose-700 text-white rounded-xl font-semibold text-lg transition-all shadow-lg hover:shadow-rose-200 flex items-center justify-center gap-2"
            >
              <EnvelopeIcon className="w-5 h-5" />
              Send Message
            </motion.button>
          </form>
        </motion.div>

        {/* Contact Information */}
        <motion.div
          className="w-full lg:w-1/2 space-y-6"
          variants={infoVariants}
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.5 }}
        >
          <div className="bg-white backdrop-blur-lg rounded-xl p-8 border border-rose-100 shadow-xl">
            <h3 className="text-2xl font-playfair font-bold text-rose-900 mb-4 flex items-center gap-3">
              <MapPinIcon className="w-8 h-8 text-rose-600" />
              Our Location
            </h3>
            <p className="text-rose-700 leading-relaxed">
              123 Cardiac Care Avenue<br/>
              Health City, HC 12345<br/>
              Punjab, India
            </p>
          </div>

          <div className="bg-white backdrop-blur-lg rounded-xl p-8 border border-rose-100 shadow-xl">
            <h3 className="text-2xl font-playfair font-bold text-rose-900 mb-4 flex items-center gap-3">
              <PhoneIcon className="w-8 h-8 text-rose-600" />
              Contact Details
            </h3>
            <div className="space-y-3 text-rose-700">
              <p className="flex items-center gap-2">
                <span className="font-medium">Emergency:</span> 
                +91 987 654 3210
              </p>
              <p className="flex items-center gap-2">
                <span className="font-medium">General:</span> 
                +91 11 2345 6789
              </p>
              <p className="flex items-center gap-2">
                <span className="font-medium">Fax:</span> 
                +91 11 2345 6790
              </p>
            </div>
          </div>

          <div className="bg-white backdrop-blur-lg rounded-xl p-8 border border-rose-100 shadow-xl">
            <h3 className="text-2xl font-playfair font-bold text-rose-900 mb-4 flex items-center gap-3">
              <EnvelopeIcon className="w-8 h-8 text-rose-600" />
              Email & Hours
            </h3>
            <div className="space-y-3 text-rose-700">
              <p className="flex items-center gap-2">
                <span className="font-medium">Support:</span>
                support@cardiocare.ai
              </p>
              <p className="flex items-center gap-2">
                <span className="font-medium">General:</span>
                info@cardiocare.ai
              </p>
              <p className="flex items-center gap-2">
                <span className="font-medium">Mon-Fri:</span>
                8AM - 8PM IST
              </p>
              <p className="flex items-center gap-2">
                <span className="font-medium">Sat-Sun:</span>
                9AM - 5PM IST
              </p>
            </div>
          </div>
        </motion.div>
      </div>

      <Footer />
    </div>
  );
};

export default ContactusPage;