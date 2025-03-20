import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle, MapPin, Clock, User, ShieldAlert, ArrowLeft, Video, Image, Phone, Mail, Globe, Calendar, AlertCircle, TextCursorInput } from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { BASE_URL } from '../config';
import Navbar from '../components/HomePage/Navbar';
import Footer from '../components/HomePage/Footer';

const statusStyles = {
    PENDING: 'bg-amber-100 text-amber-800',
    IN_PROGRESS: 'bg-blue-100 text-blue-800',
    RESOLVED: 'bg-emerald-100 text-emerald-800',
    CLOSED: 'bg-gray-100 text-gray-800'
};

const IncidentDetailPage = () => {
    const { id } = useParams();
    const [incident, setIncident] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchIncident = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) throw new Error('Authentication required');

                const formData = new FormData();
                formData.append('incident_id', id);

                const response = await fetch(`${BASE_URL}campus/get_specific_incident/`, {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${token}`
                    },
                    body: formData
                });

                const data = await response.json();
                
                if (!response.ok) throw new Error(data.message || 'Failed to fetch incident');
                
                setIncident(data.incident_list);
                setLoading(false);
            } catch (error) {
                setError(error.message);
                setLoading(false);
            }
        };

        fetchIncident();
    }, [id]);

    if (loading) return (
        <div className="min-h-screen bg-gradient-to-b from-rose-50 to-white">
            <Navbar />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="animate-pulse space-y-8">
                    <div className="h-12 bg-rose-100 rounded w-1/4 mb-8"></div>
                    <div className="grid lg:grid-cols-2 gap-12">
                        <div className="space-y-6">
                            <div className="aspect-video bg-rose-100 rounded-xl"></div>
                            <div className="h-4 bg-rose-100 rounded w-3/4"></div>
                            <div className="h-4 bg-rose-100 rounded w-1/2"></div>
                        </div>
                        <div className="space-y-6">
                            <div className="h-64 bg-rose-100 rounded-xl"></div>
                            <div className="h-4 bg-rose-100 rounded w-2/3"></div>
                            <div className="h-4 bg-rose-100 rounded w-1/3"></div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );

    if (error) return (
        <div className="min-h-screen bg-gradient-to-b from-rose-50 to-white">
            <Navbar />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
                <div className="p-6 bg-rose-100 rounded-full inline-block mb-4">
                    <AlertCircle className="w-8 h-8 text-rose-600" />
                </div>
                <h2 className="text-2xl font-semibold text-rose-900 mb-2">Error Loading Incident</h2>
                <p className="text-rose-700 mb-4">{error}</p>
                <button
                    onClick={() => window.location.reload()}
                    className="px-6 py-2 bg-rose-600 text-white rounded-lg hover:bg-rose-700 transition-colors"
                >
                    Try Again
                </button>
            </div>
            <Footer />
        </div>
    );

    return (
        <div className="min-h-screen bg-gradient-to-b from-rose-50 to-white">
            <Navbar />
            
            <motion.main
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12"
            >
                {/* Back Navigation */}
                <motion.div
                    initial={{ x: -20 }}
                    animate={{ x: 0 }}
                    className="mb-8"
                >
                    <Link
                        to="/incident-reporting"
                        className="inline-flex items-center text-rose-600 hover:text-rose-700 transition-colors"
                    >
                        <ArrowLeft className="w-5 h-5 mr-2" />
                        Back to Incidents
                    </Link>
                </motion.div>

                {/* Incident Header */}
                <motion.header
                    initial={{ y: 20 }}
                    animate={{ y: 0 }}
                    className="mb-12"
                >
                    <div className="flex items-start justify-between mb-6">
                        <h1 className="text-4xl font-playfair font-bold text-rose-900">
                            {incident.title}
                        </h1>
                        <span className={`px-3 py-1 text-sm font-medium rounded-full ${statusStyles[incident.status]}`}>
                            {incident.status.replace('_', ' ')}
                        </span>
                    </div>
                    <div className="flex items-center gap-4 text-rose-700">
                        <div className="flex items-center gap-2">
                            <Clock className="w-5 h-5" />
                            <span>
                                Reported {new Date(incident.created_at).toLocaleDateString()}
                            </span>
                        </div>
                        <div className="flex items-center gap-2">
                            <MapPin className="w-5 h-5" />
                            <span>{incident.location}</span>
                        </div>
                    </div>
                </motion.header>

                {/* Main Content Grid */}
                <div className="grid lg:grid-cols-2 gap-12">
                    {/* Left Column */}
                    <div className="space-y-12">
                        {/* Media Gallery */}
                        {incident.media_files.length > 0 && (
                            <motion.section
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="bg-white rounded-2xl shadow-sm border border-rose-100 overflow-hidden"
                            >
                                <Swiper
                                    modules={[Navigation, Pagination]}
                                    spaceBetween={10}
                                    navigation
                                    pagination={{ clickable: true }}
                                    className="aspect-video"
                                >
                                    {incident.media_files.map((media, index) => (
                                        <SwiperSlide key={index}>
                                            {media.includes('.mp4') || media.includes('.mov') ? (
                                                <div className="relative h-full bg-rose-50">
                                                    <video
                                                        className="w-full h-full object-cover"
                                                        controls
                                                        src={`${BASE_URL}media/${media}`}
                                                    />
                                                    <div className="absolute bottom-4 right-4 bg-black/50 text-white px-3 py-1 rounded-md text-sm">
                                                        <Video className="w-5 h-5 inline-block mr-2" />
                                                        Video Evidence
                                                    </div>
                                                </div>
                                            ) : (
                                                <div className="relative h-full">
                                                    <img
                                                        src={`${BASE_URL}media/${media}`}
                                                        alt={`Incident evidence ${index + 1}`}
                                                        className="w-full h-full object-cover"
                                                    />
                                                    <div className="absolute bottom-4 right-4 bg-black/50 text-white px-3 py-1 rounded-md text-sm">
                                                        <Image className="w-5 h-5 inline-block mr-2" />
                                                        Photo Evidence
                                                    </div>
                                                </div>
                                            )}
                                        </SwiperSlide>
                                    ))}
                                </Swiper>
                            </motion.section>
                        )}

                        {/* Incident Description */}
                        <motion.section
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="space-y-6"
                        >
                            <h2 className="text-2xl font-semibold text-rose-900 flex items-center gap-3">
                                <TextCursorInput className="w-6 h-6 text-rose-600" />
                                Incident Details
                            </h2>
                            <p className="text-rose-700 leading-relaxed">
                                {incident.description}
                            </p>
                        </motion.section>

                        {/* Reporter Information */}
                        <motion.section
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-white rounded-2xl p-6 shadow-sm border border-rose-100"
                        >
                            <h2 className="text-2xl font-semibold text-rose-900 mb-4 flex items-center gap-3">
                                <User className="w-6 h-6 text-rose-600" />
                                Reporter Information
                            </h2>
                            <div className="grid grid-cols-2 gap-4 text-rose-700">
                                <div>
                                    <p className="font-medium">Name</p>
                                    <p>{incident.reported_by.first_name} {incident.reported_by.last_name}</p>
                                </div>
                                <div>
                                    <p className="font-medium">Contact</p>
                                    <p>{incident.reported_by.phone}</p>
                                </div>
                                <div>
                                    <p className="font-medium">Email</p>
                                    <p>{incident.reported_by.email}</p>
                                </div>
                            </div>
                        </motion.section>
                    </div>

                    {/* Right Column */}
                    <div className="space-y-12">
                        {/* Campus Information */}
                        <motion.section
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="bg-white rounded-2xl p-6 shadow-sm border border-rose-100"
                        >
                            <h2 className="text-2xl font-semibold text-rose-900 mb-4 flex items-center gap-3">
                                <Globe className="w-6 h-6 text-rose-600" />
                                Campus Details
                            </h2>
                            {incident.campus.image && (
                                <img
                                    src={`${BASE_URL}${incident.campus.image}`}
                                    alt={incident.campus.name}
                                    className="w-full h-48 object-cover rounded-lg mb-4"
                                />
                            )}
                            <div className="grid grid-cols-2 gap-4 text-rose-700">
                                <div>
                                    <p className="font-medium">Name</p>
                                    <p>{incident.campus.name}</p>
                                </div>
                                <div>
                                    <p className="font-medium">Established</p>
                                    <p>{incident.campus.established_year}</p>
                                </div>
                                <div>
                                    <p className="font-medium">Location</p>
                                    <p>{incident.campus.city}, {incident.campus.state}</p>
                                </div>
                                <div>
                                    <p className="font-medium">Website</p>
                                    <a
                                        href={incident.campus.website}
                                        className="text-rose-600 hover:underline"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        {incident.campus.website}
                                    </a>
                                </div>
                            </div>
                        </motion.section>

                        {/* Campus Leadership */}
                        <motion.section
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="bg-white rounded-2xl p-6 shadow-sm border border-rose-100"
                        >
                            <h2 className="text-2xl font-semibold text-rose-900 mb-4 flex items-center gap-3">
                                <ShieldAlert className="w-6 h-6 text-rose-600" />
                                Campus Leadership
                            </h2>
                            <div className="space-y-4 text-rose-700">
                                <div>
                                    <p className="font-medium">Campus Head</p>
                                    <p>{incident.campus.head_name}</p>
                                </div>
                                <div>
                                    <p className="font-medium">Contact</p>
                                    <div className="flex items-center gap-2">
                                        <Phone className="w-5 h-5" />
                                        <span>{incident.campus.head_phone}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Mail className="w-5 h-5" />
                                        <span>{incident.campus.head_email}</span>
                                    </div>
                                </div>
                            </div>
                        </motion.section>

                        {/* Incident Timeline */}
                        <motion.section
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="bg-white rounded-2xl p-6 shadow-sm border border-rose-100"
                        >
                            <h2 className="text-2xl font-semibold text-rose-900 mb-4 flex items-center gap-3">
                                <Calendar className="w-6 h-6 text-rose-600" />
                                Incident Timeline
                            </h2>
                            <div className="relative pl-8 border-l-2 border-rose-100">
                                <div className="absolute w-4 h-4 bg-rose-600 rounded-full -left-[9px] top-0"></div>
                                <div className="mb-8">
                                    <p className="font-medium text-rose-900">Reported</p>
                                    <p className="text-rose-700">
                                        {new Date(incident.created_at).toLocaleString()}
                                    </p>
                                </div>
                                <div className="absolute w-4 h-4 bg-rose-600 rounded-full -left-[9px] bottom-0"></div>
                                <div>
                                    <p className="font-medium text-rose-900">Last Updated</p>
                                    <p className="text-rose-700">
                                        {new Date(incident.updated_at).toLocaleString()}
                                    </p>
                                </div>
                            </div>
                        </motion.section>
                    </div>
                </div>
            </motion.main>

            <Footer />
        </div>
    );
};

export default IncidentDetailPage;