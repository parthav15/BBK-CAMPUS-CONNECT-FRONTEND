import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock, User, AlertCircle, File, Download, Pin, RefreshCw } from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { BASE_URL } from '../../config';

const priorityStyles = {
    HIGH: 'bg-rose-100 text-rose-800',
    MEDIUM: 'bg-amber-100 text-amber-800',
    LOW: 'bg-gray-100 text-gray-800'
};

const RecentNotices = () => {
    const [notices, setNotices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchNotices = async () => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                window.location.href = '/login';
                return;
            }

            const response = await fetch(`${BASE_URL}notice/get_all_notices/`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            const data = await response.json();
            
            if (!response.ok) throw new Error(data.message || 'Failed to fetch notices');
            
            setNotices(data.notices);
            setLoading(false);
        } catch (error) {
            setError(error.message);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchNotices();
    }, []);

    const NoticeCard = ({ notice }) => (
        <Link 
            to={`/notices/${notice.slug}`} 
            className="block h-full hover:no-underline"
        >
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="h-full bg-white/80 backdrop-blur-lg rounded-xl p-6 border border-rose-100 shadow-sm hover:shadow-md transition-all flex flex-col"
            >
                <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                        {notice.is_pinned && (
                            <Pin className="w-5 h-5 text-rose-600 rotate-45" />
                        )}
                        <h3 className="text-lg font-semibold text-rose-900">
                            {notice.title}
                        </h3>
                    </div>
                    <span className={`px-2.5 py-0.5 text-xs font-medium rounded-full ${priorityStyles[notice.priority]}`}>
                        {notice.priority}
                    </span>
                </div>

                <p className="text-rose-700 mb-4 line-clamp-3 flex-grow">
                    {notice.description}
                </p>

                <div className="mt-auto">
                    <div className="grid grid-cols-2 gap-4 text-sm text-rose-700 mb-4">
                        <div className="flex items-center gap-2">
                            <User className="w-4 h-4 text-rose-500" />
                            <span>{notice.posted_by.first_name} {notice.posted_by.last_name}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4 text-rose-500" />
                            <span>{new Date(notice.created_at).toLocaleDateString()}</span>
                        </div>
                    </div>

                    {notice.file_attachment && (
                        <div className="pt-4 border-t border-rose-100">
                            <div className="inline-flex items-center text-rose-600 hover:text-rose-700 transition-colors">
                                <File className="w-4 h-4 mr-2" />
                                <span className="text-sm font-medium">Download Attachment</span>
                                <Download className="w-4 h-4 ml-2" />
                            </div>
                        </div>
                    )}
                </div>
            </motion.div>
        </Link>
    );

    return (
        <section className="relative py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white to-rose-50">
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
                    <h2 className="text-3xl font-playfair font-bold text-rose-900 mb-4 md:mb-0">
                        Recent Campus Notices
                    </h2>
                    <button
                        onClick={fetchNotices}
                        className="flex items-center gap-2 text-rose-600 hover:text-rose-700 transition-colors"
                    >
                        <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
                        <span className="text-sm font-medium">Refresh Notices</span>
                    </button>
                </div>

                {error && (
                    <div className="bg-rose-50 border-l-4 border-rose-600 p-4 mb-6">
                        <p className="text-rose-700">⚠️ Error loading notices: {error}</p>
                    </div>
                )}

                {loading ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="bg-white/80 backdrop-blur-lg rounded-xl p-6 animate-pulse h-[420px]">
                                <div className="h-4 bg-rose-100 rounded mb-4 w-3/4"></div>
                                <div className="h-3 bg-rose-100 rounded mb-2 w-1/2"></div>
                                <div className="h-3 bg-rose-100 rounded mb-2 w-2/3"></div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <Swiper
                        modules={[Navigation, Pagination]}
                        spaceBetween={30}
                        slidesPerView={1}
                        breakpoints={{
                            640: { slidesPerView: 1 },
                            768: { slidesPerView: 2 },
                            1024: { slidesPerView: 3 }
                        }}
                        navigation
                        pagination={{ clickable: true }}
                        className="!pb-14"
                    >
                        {notices.map((notice) => (
                            <SwiperSlide key={notice.id} className="!h-auto">
                                <NoticeCard notice={notice} />
                            </SwiperSlide>
                        ))}

                        {notices.length === 0 && !error && (
                            <div className="col-span-full text-center py-12">
                                <div className="inline-block p-6 bg-rose-100 rounded-xl mb-4">
                                    <AlertCircle className="w-8 h-8 text-rose-600" />
                                </div>
                                <p className="text-rose-700">No notices available for your campus</p>
                            </div>
                        )}
                    </Swiper>
                )}
            </div>
        </section>
    );
};

export default RecentNotices;