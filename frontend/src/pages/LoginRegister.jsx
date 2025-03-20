import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import { KeyIcon, UserCircleIcon, MapPin, School, BellIcon } from 'lucide-react';
import Navbar from '../components/HomePage/Navbar';
import Footer from '../components/HomePage/Footer';
import { BASE_URL } from '../config';

const LoginRegister = () => {
    const navigate = useNavigate();
    const [isLogin, setIsLogin] = useState(true);
    const [campuses, setCampuses] = useState([]);
    const [selectedCampus, setSelectedCampus] = useState(null);
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        first_name: '',
        last_name: '',
        phone_number: '',
        campus_id: ''
    });
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCampuses = async () => {
            try {
                const response = await fetch(`${BASE_URL}campus/campus_list/`);
                const data = await response.json();
                if (data.success) {
                    setCampuses(data.campus_list);
                } else {
                    throw new Error(data.message);
                }
            } catch (error) {
                toast.error('Failed to load campuses');
            }
        };
        fetchCampuses();
    }, []);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) navigate("/", { replace: true });
    }, [navigate]);

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const toggleForm = () => {
        setIsLogin(!isLogin);
        setFormData({
            email: '',
            password: '',
            first_name: '',
            last_name: '',
            phone_number: '',
            campus_id: ''
        });
        setSelectedCampus(null);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        const formPayload = new FormData();
        if (!isLogin) {
            formPayload.append('campus_id', selectedCampus);
            formPayload.append('first_name', formData.first_name);
            formPayload.append('last_name', formData.last_name);
            formPayload.append('phone_number', formData.phone_number);
        }
        formPayload.append('email', formData.email);
        formPayload.append('password', formData.password);

        try {
            const endpoint = isLogin
                ? `${BASE_URL}users/user_login/`
                : `${BASE_URL}users/user_register/`;

            const response = await fetch(endpoint, {
                method: "POST",
                body: formPayload
            });

            const data = await response.json();

            if (!response.ok) throw new Error(data.error || 'Something went wrong');

            if (isLogin) {
                const userResponse = await fetch(`${BASE_URL}users/user_details/`, {
                    headers: {
                        Authorization: `Bearer ${data.token}`,
                    },
                });
                const userData = await userResponse.json();

                localStorage.setItem("token", data.token);
                localStorage.setItem("user", JSON.stringify(userData.user_details));

                toast.success("Logged in successfully!");
                setTimeout(() => navigate("/", { replace: true }), 2000);
            } else {
                toast.success("Registered successfully!");
                setIsLogin(true);
            }
        } catch (error) {
            setError(error.message);
            toast.error(error.message);
        }
    };

    const formVariants = {
        hidden: { opacity: 0, x: 50 },
        visible: { opacity: 1, x: 0 },
        exit: { opacity: 0, x: -50 }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-rose-50 to-white flex flex-col">
            <Navbar />
            <ToastContainer position="top-right" autoClose={2000} theme="colored" />
            <div className='h-20' />

            <div className="flex-grow flex items-center justify-center p-10">
                <AnimatePresence mode='wait'>
                    <motion.div
                        key={isLogin ? 'login' : 'register'}
                        className="w-full max-w-5xl bg-gradient-to-br from-white to-rose-50 backdrop-blur-lg rounded-3xl shadow-2xl p-12 border border-rose-200"
                        variants={formVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        transition={{ duration: 0.6 }}
                    >
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                            {!isLogin && (
                                <div className="space-y-10">
                                    <h2 className="text-3xl font-playfair font-extrabold text-rose-800">
                                        Choose Your Campus
                                    </h2>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 h-[200px] overflow-y-auto scrollbar-thin scrollbar-thumb-rose-300 scrollbar-track-rose-100">
                                        {campuses.map((campus) => (
                                            <motion.div
                                                key={campus.id}
                                                whileHover={{ scale: 1.05 }}
                                                whileTap={{ scale: 0.95 }}
                                                className={`p-5 rounded-xl border-2 cursor-pointer transition-all ${selectedCampus === campus.id
                                                    ? 'border-rose-700 bg-rose-100'
                                                    : 'border-rose-200 hover:border-rose-300'
                                                    }`}
                                                onClick={() => {
                                                    setSelectedCampus(campus.id);
                                                    setFormData({ ...formData, campus: campus.id });
                                                }}
                                            >
                                                <div className="flex items-start gap-5">
                                                    <div className="bg-rose-200 p-3 rounded-lg">
                                                        <School className="w-7 h-7 text-rose-700" />
                                                    </div>
                                                    <div>
                                                        <h3 className="text-lg font-semibold text-rose-800">
                                                            {campus.name}
                                                        </h3>
                                                        <p className="text-sm text-rose-600">
                                                            {campus.city}, {campus.state}
                                                        </p>
                                                    </div>
                                                </div>
                                            </motion.div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            <div className="space-y-10">
                                <h2 className="text-3xl font-playfair font-extrabold bg-gradient-to-r from-rose-700 to-gold-500 bg-clip-text text-transparent">
                                    {isLogin ? 'Welcome Back!' : 'Join Us Today'}
                                </h2>

                                <form onSubmit={handleSubmit} className="space-y-8">
                                    {!isLogin && (
                                        <>
                                            <div className="grid grid-cols-2 gap-8">
                                                <div className="relative">
                                                    <UserCircleIcon className="w-7 h-7 text-rose-700 absolute left-4 top-4" />
                                                    <input
                                                        name="first_name"
                                                        placeholder="First Name"
                                                        value={formData.first_name}
                                                        onChange={handleInputChange}
                                                        className="w-full pl-14 pr-5 py-4 bg-white border border-rose-300 rounded-lg focus:ring-2 focus:ring-rose-600"
                                                    />
                                                </div>
                                                <div className="relative">
                                                    <UserCircleIcon className="w-7 h-7 text-rose-700 absolute left-4 top-4" />
                                                    <input
                                                        name="last_name"
                                                        placeholder="Last Name"
                                                        value={formData.last_name}
                                                        onChange={handleInputChange}
                                                        className="w-full pl-14 pr-5 py-4 bg-white border border-rose-300 rounded-lg focus:ring-2 focus:ring-rose-600"
                                                    />
                                                </div>
                                            </div>
                                            <div className="relative">
                                                <MapPin className="w-7 h-7 text-rose-700 absolute left-4 top-4" />
                                                <input
                                                    type="tel"
                                                    name="phone_number"
                                                    placeholder="Phone Number"
                                                    value={formData.phone_number}
                                                    onChange={handleInputChange}
                                                    className="w-full pl-14 pr-5 py-4 bg-white border border-rose-300 rounded-lg focus:ring-2 focus:ring-rose-600"
                                                />
                                            </div>
                                        </>
                                    )}

                                    <div className="relative">
                                        <BellIcon className="w-7 h-7 text-rose-700 absolute left-4 top-4" />
                                        <input
                                            type="email"
                                            name="email"
                                            placeholder="Email"
                                            value={formData.email}
                                            onChange={handleInputChange}
                                            className="w-full pl-14 pr-5 py-4 bg-white border border-rose-300 rounded-lg focus:ring-2 focus:ring-rose-600"
                                        />
                                    </div>

                                    <div className="relative">
                                        <KeyIcon className="w-7 h-7 text-rose-700 absolute left-4 top-4" />
                                        <input
                                            type="password"
                                            name="password"
                                            placeholder="Password"
                                            value={formData.password}
                                            onChange={handleInputChange}
                                            className="w-full pl-14 pr-5 py-4 bg-white border border-rose-300 rounded-lg focus:ring-2 focus:ring-rose-600"
                                        />
                                    </div>

                                    {error && (
                                        <motion.p
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            className="text-rose-700 text-sm"
                                        >
                                            {error}
                                        </motion.p>
                                    )}

                                    <motion.button
                                        whileHover={{ scale: 1.1 }}
                                        whileTap={{ scale: 0.95 }}
                                        type="submit"
                                        className="w-full py-4 bg-gradient-to-r from-rose-700 to-gold-500 text-white rounded-lg hover:from-rose-800 hover:to-gold-600 transition-all"
                                    >
                                        {isLogin ? 'Sign In' : 'Create Account'}
                                    </motion.button>
                                </form>

                                <p className="text-center text-rose-800">
                                    {isLogin ? "New to Campus Connect?" : "Already have an account?"}
                                    <button
                                        onClick={toggleForm}
                                        className="ml-2 text-rose-700 font-bold hover:text-rose-800"
                                    >
                                        {isLogin ? 'Register Here' : 'Login Here'}
                                    </button>
                                </p>
                            </div>

                            {isLogin && (
                                <div className="space-y-10">
                                    <h2 className="text-3xl font-playfair font-extrabold text-rose-800">
                                        Why Join Us?
                                    </h2>
                                    <ul className="space-y-6">
                                        <li className="flex items-start gap-5">
                                            <div className="bg-rose-200 p-3 rounded-lg">
                                                <School className="w-7 h-7 text-rose-700" />
                                            </div>
                                            <p className="text-rose-700">Access exclusive campus resources and events</p>
                                        </li>
                                        <li className="flex items-start gap-5">
                                            <div className="bg-rose-200 p-3 rounded-lg">
                                                <UserCircleIcon className="w-7 h-7 text-rose-700" />
                                            </div>
                                            <p className="text-rose-700">Connect with students, faculty, and alumni</p>
                                        </li>
                                        <li className="flex items-start gap-5">
                                            <div className="bg-rose-200 p-3 rounded-lg">
                                                <BellIcon className="w-7 h-7 text-rose-700" />
                                            </div>
                                            <p className="text-rose-700">Stay updated on campus news and announcements</p>
                                        </li>
                                    </ul>
                                    <motion.button
                                        whileHover={{ scale: 1.1 }}
                                        whileTap={{ scale: 0.95 }}
                                        className="w-full py-4 bg-gradient-to-r from-rose-700 to-gold-500 text-white rounded-lg hover:from-rose-800 hover:to-gold-600 transition-all"
                                    >
                                        Explore Our Community
                                    </motion.button>
                                </div>
                            )}
                        </div>
                    </motion.div>
                </AnimatePresence>
            </div>
            <Footer />
        </div>
    );
};

export default LoginRegister;