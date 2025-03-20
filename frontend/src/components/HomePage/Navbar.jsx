import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowRightCircle, ChevronDownIcon } from "lucide-react";
import { toast } from "react-toastify";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeLink, setActiveLink] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
      const userString = localStorage.getItem("user");
      const userObj = JSON.parse(userString);
      setUser(userObj);
    }
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setIsLoggedIn(false);
    setUser(null);
    toast.success("Logged out successfully!", {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
    setTimeout(() => (window.location.href = "/"), 2000);
  };

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Incident Reporting", path: "/incident-reporting" },
    { name: "Notice Board", path: "/notice-board" },
    { name: "Feedback", path: "/feedback" },
    { name: "Contact Us", path: "/contact-us" },
  ];

  const menuVariants = {
    open: {
      opacity: 1,
      y: 0,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 },
    },
    closed: { opacity: 0, y: "-100%" },
  };

  const itemVariants = {
    open: { opacity: 1, y: 0 },
    closed: { opacity: 0, y: -20 },
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className="sticky top-0 z-50 bg-rose-50/80 backdrop-blur-md border-b border-rose-100 shadow-sm"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo Section */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex-shrink-0 flex items-center"
          >
            <Link
              to="/"
              className="text-2xl font-bold bg-gradient-to-r from-rose-600 to-gold-500 bg-clip-text text-transparent font-playfair"
            >
              <span className="text-rose-800">BBK</span>
              <span className="text-gray-700"> Campus Connect</span>
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <motion.div
                key={item.name}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  to={item.path}
                  className={`relative px-3 py-2 text-sm font-medium ${activeLink === item.name
                      ? "text-rose-700"
                      : "text-rose-900 hover:text-rose-600"
                    } transition-colors`}
                  onMouseEnter={() => setActiveLink(item.name)}
                  onMouseLeave={() => setActiveLink("")}
                >
                  {item.name}
                  {activeLink === item.name && (
                    <motion.div
                      className="absolute bottom-0 left-0 w-full h-0.5 bg-rose-600"
                      layoutId="underline"
                    />
                  )}
                </Link>
              </motion.div>
            ))}
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              {isLoggedIn ? (
                <div className="relative">
                  <button
                    onClick={toggleMenu}
                    className="flex items-center space-x-2 bg-rose-600 text-white px-4 py-2 rounded-full hover:bg-rose-700 transition-colors"
                  >
                    <span>Hi, {user?.first_name} {user?.last_name}</span>
                    <ChevronDownIcon className="h-4 w-4" />
                  </button>

                  {isMenuOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-rose-100"
                    >
                      <div className="py-1">
                        <Link
                          to="/dashboard"
                          className="block px-4 py-2 text-rose-700 hover:bg-rose-50 hover:text-rose-600"
                        >
                          Dashboard
                        </Link>
                        <button
                          onClick={logout}
                          className="w-full text-left px-4 py-2 text-rose-700 hover:bg-rose-50 hover:text-rose-600"
                        >
                          Logout
                        </button>
                      </div>
                    </motion.div>
                  )}
                </div>
              ) : (
                <Link
                  to="/login-register"
                  className="ml-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-full text-white bg-gradient-to-r from-rose-600 to-gold-500 hover:from-rose-700 hover:to-gold-600 shadow-lg transition-all"
                >
                  Get Started
                  <ArrowRightCircle className="ml-2 h-4 w-4" />
                </Link>
              )}
            </motion.div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-rose-900 hover:text-rose-600 hover:bg-rose-100 focus:outline-none transition-colors"
            >
              {isOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial="closed"
              animate="open"
              exit="closed"
              variants={menuVariants}
              className="md:hidden absolute left-0 right-0 bg-white shadow-lg"
            >
              <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                {navItems.map((item) => (
                  <motion.div
                    key={item.name}
                    variants={itemVariants}
                    whileHover={{ scale: 1.02 }}
                  >
                    <Link
                      to={item.path}
                      className="block px-3 py-2 rounded-md text-base font-medium text-rose-900 hover:bg-rose-50 hover:text-rose-600 transition-colors"
                      onClick={() => setIsOpen(false)}
                    >
                      {item.name}
                    </Link>
                  </motion.div>
                ))}
                <motion.div variants={itemVariants}>
                  <Link
                    to="/login-register"
                    className="w-full block px-3 py-2 mt-2 rounded-md text-base font-medium text-white bg-gradient-to-r from-rose-600 to-gold-500 hover:from-rose-700 hover:to-gold-600 transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    Get Started
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
};

export default Navbar;