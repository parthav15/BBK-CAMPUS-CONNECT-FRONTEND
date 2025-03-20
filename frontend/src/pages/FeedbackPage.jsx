import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from '../components/HomePage/Navbar';
import Footer from '../components/HomePage/Footer';
import { BASE_URL } from '../config';
import { HeartIcon, StarIcon } from '@heroicons/react/24/solid';

const FeedbackPage = () => {
  const navigate = useNavigate();
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  // useEffect(() => {
  //   const token = localStorage.getItem('token');
  //   if (!token) {
  //     navigate('/login-register');
  //   }
  // }, [navigate]);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.message || rating === 0) {
      toast.error('Please fill out all fields and provide a rating!');
      return;
    }

    const payload = {
      ...formData,
      rating: rating
    };

    const token = localStorage.getItem('token');
    
    fetch(`${BASE_URL}feedback/add_feedback/`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          toast.success('Thank you for your valuable feedback!');
          setFormData({ name: '', email: '', message: '' });
          setRating(0);
        } else {
          toast.error(data.message || 'Submission failed. Please try again.');
        }
      })
      .catch((error) => {
        console.error('Error:', error);
        toast.error('An error occurred. Please try again.');
      });
  };

  const formVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-rose-50 flex flex-col">
      <Navbar />

      <motion.div 
        className="flex-grow flex items-center justify-center p-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
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

        <motion.div
          className="w-full max-w-2xl bg-white backdrop-blur-lg rounded-2xl p-8 border border-rose-100 shadow-xl"
          variants={formVariants}
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.5 }}
        >
          <div className="text-center mb-8">
            <div className="relative inline-block mb-6">
              <HeartIcon className="h-16 w-16 text-rose-600 mx-auto" />
              <div className="absolute -top-2 -right-2 bg-rose-100 rounded-full p-2">
                <StarIcon className="h-6 w-6 text-rose-600" />
              </div>
            </div>
            <h2 className="text-4xl font-playfair font-bold text-rose-900 mb-3">
              Share Your Feedback
            </h2>
            <p className="text-rose-700 max-w-md mx-auto">
              Your insights help us create better experiences for our community
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
                <label className="block text-rose-900 font-medium mb-2">Your Feedback</label>
                <textarea
                  name="message"
                  placeholder="Share your thoughts..."
                  value={formData.message}
                  onChange={handleInputChange}
                  rows="4"
                  className="w-full px-4 py-3 bg-white border-2 border-rose-100 rounded-xl focus:outline-none focus:border-rose-300 focus:ring-2 focus:ring-rose-100 transition-all text-rose-900 placeholder-rose-300 resize-none"
                />
              </div>

              <div className="pt-4">
                <label className="block text-rose-900 font-medium mb-4 text-center">
                  How would you rate your experience?
                </label>
                <div className="flex justify-center space-x-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      type="button"
                      key={star}
                      onMouseEnter={() => setHoverRating(star)}
                      onMouseLeave={() => setHoverRating(0)}
                      onClick={() => setRating(star)}
                      className="p-2 transform transition-all duration-200 hover:scale-110"
                    >
                      <StarIcon
                        className={`h-10 w-10 ${
                          star <= (hoverRating || rating)
                            ? 'text-rose-500 fill-current'
                            : 'text-rose-200 fill-current'
                        }`}
                      />
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              type="submit"
              className="w-full py-4 bg-rose-600 hover:bg-rose-700 text-white rounded-xl font-semibold text-lg transition-all shadow-lg hover:shadow-rose-200 flex items-center justify-center gap-2"
            >
              <HeartIcon className="w-5 h-5" />
              Submit Feedback
            </motion.button>
          </form>
        </motion.div>
      </motion.div>

      <Footer />
    </div>
  );
};

export default FeedbackPage;