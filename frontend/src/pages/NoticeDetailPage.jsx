import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Clock, User, AlertCircle, File, Download, Pin, ArrowLeft, Building2, Globe, Mail, Phone, Calendar, ShieldAlert, RefreshCw } from 'lucide-react';
import { BASE_URL } from '../config';
import Navbar from '../components/HomePage/Navbar';
import Footer from '../components/HomePage/Footer';

const priorityStyles = {
    HIGH: 'bg-rose-100 text-rose-800',
    MEDIUM: 'bg-amber-100 text-amber-800',
    LOW: 'bg-gray-100 text-gray-800'
};

const NoticeDetailPage = () => {
    const { slug } = useParams();
    const [notice, setNotice] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchNotice = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    window.location.href = '/login';
                    return;
                }

                const formData = new FormData();
                formData.append('slug', slug);

                const response = await fetch(`${BASE_URL}notice/get_specific_notice/`, {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${token}`
                    },
                    body: formData
                });

                const data = await response.json();
                
                if (!response.ok) throw new Error(data.message || 'Failed to fetch notice');
                
                setNotice(data.notices);
                setLoading(false);
            } catch (error) {
                setError(error.message);
                setLoading(false);
            }
        };

        fetchNotice();
    }, [slug]);

    if (loading) {
        return (
            <div className="min-h-screen bg-rose-50 p-8 flex items-center justify-center">
                <div className="text-rose-600 animate-pulse">
                    <RefreshCw className="w-12 h-12 animate-spin" />
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-rose-50 p-8 flex flex-col items-center justify-center">
                <div className="bg-rose-100 p-6 rounded-xl mb-4">
                    <ShieldAlert className="w-12 h-12 text-rose-600" />
                </div>
                <h2 className="text-2xl font-semibold text-rose-900 mb-2">Error Loading Notice</h2>
                <p className="text-rose-700 mb-4">{error}</p>
                <Link to="/" className="text-rose-600 hover:text-rose-700 flex items-center gap-2">
                    <ArrowLeft className="w-4 h-4" />
                    Return to Home
                </Link>
            </div>
        );
    }

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="min-h-screen bg-gradient-to-b from-white to-rose-50"
        >
            <Navbar />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <Link 
                    to="/notice-board" 
                    className="mb-8 inline-flex items-center text-rose-600 hover:text-rose-700 transition-colors"
                >
                    <ArrowLeft className="w-5 h-5 mr-2" />
                    Back to Notices
                </Link>

                {/* Notice Header */}
                <div className="bg-white rounded-2xl p-8 shadow-lg mb-8 border border-rose-100">
                    <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
                        <div className="flex items-center gap-3">
                            {notice.is_pinned && (
                                <Pin className="w-6 h-6 text-rose-600 rotate-45" />
                            )}
                            <h1 className="text-3xl font-playfair font-bold text-rose-900">
                                {notice.title}
                            </h1>
                        </div>
                        <div className="flex items-center gap-4">
                            <span className={`px-3 py-1 text-sm font-medium rounded-full ${priorityStyles[notice.priority]}`}>
                                {notice.priority} Priority
                            </span>
                            <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                                {notice.status}
                            </span>
                        </div>
                    </div>

                    {/* Meta Information */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-rose-700 mb-8">
                        <div className="flex items-center gap-3">
                            <User className="w-5 h-5 text-rose-600" />
                            <div>
                                <p className="text-sm font-medium">Posted By</p>
                                <p className="font-semibold">
                                    {notice.posted_by.first_name} {notice.posted_by.last_name}
                                </p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <Calendar className="w-5 h-5 text-rose-600" />
                            <div>
                                <p className="text-sm font-medium">Posted Date</p>
                                <p className="font-semibold">
                                    {new Date(notice.created_at).toLocaleDateString('en-US', {
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric'
                                    })}
                                </p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <Clock className="w-5 h-5 text-rose-600" />
                            <div>
                                <p className="text-sm font-medium">Last Updated</p>
                                <p className="font-semibold">
                                    {new Date(notice.updated_at).toLocaleDateString('en-US', {
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric'
                                    })}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Notice Description */}
                    <div className="prose prose-rose max-w-none mb-8">
                        <h3 className="text-rose-900 font-semibold mb-4">Detailed Description</h3>
                        <p className="text-rose-700 leading-relaxed">
                            {notice.description}
                        </p>
                    </div>

                    {/* Attachments */}
                    {notice.file_attachment && (
                        <div className="border-t border-rose-100 pt-8">
                            <h3 className="text-rose-900 font-semibold mb-4 flex items-center gap-2">
                                <File className="w-5 h-5" />
                                Attachments
                            </h3>
                            <a
                                href={`${BASE_URL}${notice.file_attachment}`}
                                download
                                className="inline-flex items-center bg-rose-50 hover:bg-rose-100 px-6 py-3 rounded-lg transition-colors"
                            >
                                <Download className="w-5 h-5 mr-3 text-rose-600" />
                                <span className="font-medium text-rose-700">
                                    Download {notice.file_attachment.split('/').pop()}
                                </span>
                            </a>
                        </div>
                    )}
                </div>

                {/* Campus Information */}
                <div className="bg-white rounded-2xl p-8 shadow-lg border border-rose-100">
                    <h2 className="text-2xl font-playfair font-bold text-rose-900 mb-8 flex items-center gap-3">
                        <Building2 className="w-6 h-6 text-rose-600" />
                        {notice.campus.name}
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Campus Image */}
                        <div className="relative rounded-xl overflow-hidden bg-rose-50 aspect-video">
                            {notice.campus.image ? (
                                <img 
                                    src={`${BASE_URL}${notice.campus.image}`}
                                    alt={notice.campus.name}
                                    className="object-cover w-full h-full"
                                    loading="lazy"
                                />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center text-rose-200">
                                    <Building2 className="w-16 h-16" />
                                </div>
                            )}
                        </div>

                        {/* Campus Details */}
                        <div className="grid grid-cols-1 gap-6">
                            <div className="space-y-2">
                                <p className="text-sm font-medium text-rose-600 flex items-center gap-2">
                                    <Globe className="w-4 h-4" />
                                    Established
                                </p>
                                <p className="text-rose-700 font-semibold">
                                    {notice.campus.established_year}
                                </p>
                            </div>

                            <div className="space-y-2">
                                <p className="text-sm font-medium text-rose-600 flex items-center gap-2">
                                    <Mail className="w-4 h-4" />
                                    Campus Email
                                </p>
                                <p className="text-rose-700 font-semibold">
                                    {notice.campus.head_email}
                                </p>
                            </div>

                            <div className="space-y-2">
                                <p className="text-sm font-medium text-rose-600 flex items-center gap-2">
                                    <Phone className="w-4 h-4" />
                                    Contact Number
                                </p>
                                <p className="text-rose-700 font-semibold">
                                    {notice.campus.head_phone}
                                </p>
                            </div>

                            <div className="space-y-2">
                                <p className="text-sm font-medium text-rose-600 flex items-center gap-2">
                                    <Pin className="w-4 h-4" />
                                    Address
                                </p>
                                <p className="text-rose-700 font-semibold">
                                    {notice.campus.address}, {notice.campus.city}<br/>
                                    {notice.campus.state}, {notice.campus.country}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </motion.div>
    );
};

export default NoticeDetailPage;