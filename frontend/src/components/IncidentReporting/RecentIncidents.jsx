import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { AlertTriangle, Clock, User, MapPin, ShieldAlert, RefreshCw, Image } from 'lucide-react';
import { useInView } from 'react-intersection-observer';
import { BASE_URL } from '../../config';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const statusStyles = {
    PENDING: 'bg-amber-100 text-amber-800',
    IN_PROGRESS: 'bg-blue-100 text-blue-800',
    RESOLVED: 'bg-emerald-100 text-emerald-800',
    CLOSED: 'bg-gray-100 text-gray-800'
};

const ImageCarousel = ({ mediaFiles }) => {
    const images = mediaFiles.filter(file =>
        file.includes('.jpeg') ||
        file.includes('.jpg') ||
        file.includes('.png') ||
        file.includes('.webp')
    );

    return (
        <div className="relative mb-4 group">
            <Swiper
                modules={[Navigation, Pagination]}
                spaceBetween={10}
                slidesPerView={1}
                navigation
                pagination={{ clickable: true }}
                className="rounded-lg overflow-hidden"
            >
                {images.map((image, index) => (
                    <SwiperSlide key={index}>
                        <motion.div
                            className="relative aspect-video bg-rose-50"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                        >
                            <img
                                src={`${BASE_URL}media/${image}`}
                                alt={`Incident image ${index + 1}`}
                                className="w-full h-full object-cover"
                                loading="lazy"
                            />
                            <div className="absolute bottom-2 right-2 bg-black/50 text-white px-2 py-1 rounded-md text-xs">
                                <Image className="w-4 h-4" />
                            </div>
                        </motion.div>
                    </SwiperSlide>
                ))}
            </Swiper>
            <div className="absolute top-1/2 -translate-y-1/2 w-full flex justify-between px-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button className="swiper-button-prev bg-white/80 p-2 rounded-full shadow-lg hover:bg-white">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                </button>
                <button className="swiper-button-next bg-white/80 p-2 rounded-full shadow-lg hover:bg-white">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                </button>
            </div>
        </div>
    );
};

const IncidentCard = ({ incident }) => {
    const [isHovered, setIsHovered] = useState(false);
    const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

    return (
        <Link
            to={`/incidents/${incident.id}`}
            className="block relative z-20"
        >
            <motion.div
                ref={ref}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4 }}
                onHoverStart={() => setIsHovered(true)}
                onHoverEnd={() => setIsHovered(false)}
                className="relative bg-white/80 backdrop-blur-lg rounded-xl p-6 shadow-sm border border-rose-100 hover:shadow-md transition-all cursor-pointer h-full"
            >
                <AnimatePresence>
                    {isHovered && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="absolute inset-0 bg-gradient-to-br from-rose-50/30 to-white/30 rounded-xl pointer-events-none"
                        />
                    )}
                </AnimatePresence>

                {/* Image Carousel */}
                {incident.media_files.length > 0 && (
                    <ImageCarousel mediaFiles={incident.media_files} />
                )}

                <div className="flex items-start justify-between gap-4 mb-4">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-rose-100 rounded-lg">
                            <AlertTriangle className="w-5 h-5 text-rose-600" />
                        </div>
                        <h3 className="text-lg font-semibold text-rose-900">{incident.title}</h3>
                    </div>
                    <span className={`px-2.5 py-0.5 text-xs font-medium rounded-full ${statusStyles[incident.status]}`}>
                        {incident.status.replace('_', ' ')}
                    </span>
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm text-rose-700">
                    <div className="flex items-center gap-2">
                        <User className="w-4 h-4 text-rose-500" />
                        <span>{incident.reported_by.first_name} {incident.reported_by.last_name}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-rose-500" />
                        <span>{incident.location || 'Main Campus'}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-rose-500" />
                        <span>{new Date(incident.created_at).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <ShieldAlert className="w-4 h-4 text-rose-500" />
                        <span className="capitalize">{incident.incident_type.replace('_', ' ')}</span>
                    </div>
                </div>

                <div className="mt-4 pt-4 border-t border-rose-100">
                    <div className="inline-flex items-center text-rose-600 hover:text-rose-700 transition-colors">
                        <span className="text-sm font-medium">View Details</span>
                        <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                    </div>
                </div>
            </motion.div>
        </Link>
    );
};

const RecentIncidents = () => {
    const [incidents, setIncidents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

    const fetchIncidents = async () => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                window.location.href = '/login';
                return;
            }

            const response = await fetch(`${BASE_URL}campus/get_incidents/`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            const data = await response.json();

            if (!response.ok) throw new Error(data.message || 'Failed to fetch incidents');

            setIncidents(data.incident_list);
            setLoading(false);
        } catch (error) {
            setError(error.message);
            setLoading(false);
        }
    };

    useEffect(() => {
        if (inView) fetchIncidents();
    }, [inView]);

    return (
        <section ref={ref} className="relative py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white to-rose-50">
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
                    <h2 className="text-3xl font-playfair font-bold text-rose-900 mb-4 md:mb-0">
                        Recent Campus Incidents
                    </h2>
                    <button
                        onClick={fetchIncidents}
                        className="flex items-center gap-2 text-rose-600 hover:text-rose-700 transition-colors"
                    >
                        <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
                        <span className="text-sm font-medium">Refresh Incidents</span>
                    </button>
                </div>

                {error && (
                    <div className="bg-rose-50 border-l-4 border-rose-600 p-4 mb-6">
                        <p className="text-rose-700">⚠️ Error loading incidents: {error}</p>
                    </div>
                )}

                {loading ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="bg-white/80 backdrop-blur-lg rounded-xl p-6 animate-pulse">
                                <div className="h-4 bg-rose-100 rounded mb-4 w-3/4"></div>
                                <div className="h-3 bg-rose-100 rounded mb-2 w-1/2"></div>
                                <div className="h-3 bg-rose-100 rounded mb-2 w-2/3"></div>
                                <div className="h-3 bg-rose-100 rounded mb-2 w-1/3"></div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        <AnimatePresence>
                            {incidents.map((incident) => (
                                <IncidentCard key={incident.id} incident={incident} />
                            ))}
                        </AnimatePresence>

                        {incidents.length === 0 && !error && (
                            <div className="col-span-full text-center py-12">
                                <div className="inline-block p-6 bg-rose-100 rounded-xl mb-4">
                                    <ShieldAlert className="w-8 h-8 text-rose-600" />
                                </div>
                                <p className="text-rose-700">No incidents reported in your campus yet</p>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </section>
    );
};

export default RecentIncidents;