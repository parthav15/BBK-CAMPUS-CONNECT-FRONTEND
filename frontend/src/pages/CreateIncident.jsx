import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle, MapPin, TextCursorInput, Image, Video, Upload, ShieldAlert, CheckCircle } from 'lucide-react';
import { BASE_URL } from '../config';
import Navbar from '../components/HomePage/Navbar';
import Footer from '../components/HomePage/Footer';
import { toast, ToastContainer } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const incidentTypes = [
  { value: 'theft', label: 'Theft', icon: <ShieldAlert className="w-5 h-5" /> },
  { value: 'harassment', label: 'Harassment', icon: <ShieldAlert className="w-5 h-5" /> },
  { value: 'accident', label: 'Accident', icon: <ShieldAlert className="w-5 h-5" /> },
  { value: 'fire', label: 'Fire', icon: <ShieldAlert className="w-5 h-5" /> },
  { value: 'vandalism', label: 'Vandalism', icon: <ShieldAlert className="w-5 h-5" /> },
  { value: 'medical', label: 'Medical Emergency', icon: <ShieldAlert className="w-5 h-5" /> },
  { value: 'natural_disaster', label: 'Natural Disaster', icon: <ShieldAlert className="w-5 h-5" /> },
  { value: 'lost_item', label: 'Lost Item', icon: <ShieldAlert className="w-5 h-5" /> },
  { value: 'stolen_item', label: 'Stolen Item', icon: <ShieldAlert className="w-5 h-5" /> },
  { value: 'other', label: 'Other', icon: <ShieldAlert className="w-5 h-5" /> },
];

const FileUpload = ({ files, setFiles }) => {
  const fileInputRef = useRef();
  const [isDragging, setIsDragging] = useState(false);

  const handleFileChange = (newFiles) => {
    const validFiles = Array.from(newFiles).filter(file => 
      file.type.startsWith('image/') || file.type.startsWith('video/')
    );
    setFiles([...files, ...validFiles]);
  };

  return (
    <div 
      className={`border-2 border-dashed rounded-xl p-8 text-center transition-all ${
        isDragging ? 'border-rose-500 bg-rose-50' : 'border-rose-200 hover:border-rose-300'
      }`}
      onDragOver={(e) => {
        e.preventDefault();
        setIsDragging(true);
      }}
      onDragLeave={() => setIsDragging(false)}
      onDrop={(e) => {
        e.preventDefault();
        setIsDragging(false);
        handleFileChange(e.dataTransfer.files);
      }}
      onClick={() => fileInputRef.current.click()}
    >
      <input
        type="file"
        multiple
        accept="image/*,video/*"
        onChange={(e) => handleFileChange(e.target.files)}
        ref={fileInputRef}
        className="hidden"
      />
      <div className="flex flex-col items-center gap-4">
        <div className="p-4 bg-rose-100 rounded-full">
          <Upload className="w-6 h-6 text-rose-600" />
        </div>
        <p className="text-rose-700">
          Drag & drop media files or click to upload<br />
          <span className="text-sm text-rose-500">(Images: JPEG, PNG | Videos: MP4, MOV)</span>
        </p>
      </div>

      {files.length > 0 && (
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-6 grid grid-cols-3 gap-4"
        >
          {files.map((file, index) => (
            <div key={index} className="relative group">
              {file.type.startsWith('image/') ? (
                <img
                  src={URL.createObjectURL(file)}
                  alt={`Preview ${index}`}
                  className="aspect-square object-cover rounded-lg"
                />
              ) : (
                <div className="aspect-square bg-rose-100 rounded-lg flex items-center justify-center">
                  <Video className="w-8 h-8 text-rose-600" />
                </div>
              )}
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setFiles(files.filter((_, i) => i !== index));
                }}
                className="absolute -top-2 -right-2 bg-rose-600 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          ))}
        </motion.div>
      )}
    </div>
  );
};

const CreateIncident = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    incidentType: '',
    location: '',
    mediaFiles: []
  });
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSubmitting(true);

    try {
      const token = localStorage.getItem('token');
      if (!token) throw new Error('Authentication required');

      const formPayload = new FormData();
      formPayload.append('title', formData.title);
      formPayload.append('description', formData.description);
      formPayload.append('incident_type', formData.incidentType);
      formPayload.append('location', formData.location);
      formData.mediaFiles.forEach(file => 
        formPayload.append('media_files', file)
      );

      const response = await fetch(`${BASE_URL}campus/create_incident/`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formPayload
      });

      const data = await response.json();
      
      if (!response.ok) throw new Error(data.message || 'Submission failed');
      
      setSuccess(true);
      toast.success("Incident Reported Successfully. Thanks!");
      setTimeout(() => {
        setSuccess(false);
        navigate('/incident-reporting');
      }, 2000);
      setFormData({
        title: '',
        description: '',
        incidentType: '',
        location: '',
        mediaFiles: []
      });
    } catch (error) {
      setError(error.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-rose-50 to-white">
      <Navbar />
      <ToastContainer position="top-right" autoClose={2000} theme="colored" />
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12"
      >
        <div className="text-center mb-12">
          <div className="inline-block p-4 bg-rose-100 rounded-xl mb-6">
            <AlertTriangle className="w-8 h-8 text-rose-600" />
          </div>
          <h1 className="text-4xl font-playfair font-bold text-rose-900 mb-2">
            Report New Incident
          </h1>
          <p className="text-rose-700">Help maintain campus safety by reporting incidents promptly</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Title Input */}
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-rose-900 font-medium">
              <TextCursorInput className="w-5 h-5" />
              Incident Title
            </label>
            <input
              type="text"
              required
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full px-4 py-3 bg-white border border-rose-200 rounded-lg focus:ring-2 focus:ring-rose-500"
              placeholder="Brief incident summary"
            />
          </div>

          {/* Incident Type */}
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-rose-900 font-medium">
              <ShieldAlert className="w-5 h-5" />
              Incident Type
            </label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {incidentTypes.map((type) => (
                <button
                  key={type.value}
                  type="button"
                  onClick={() => setFormData({ ...formData, incidentType: type.value })}
                  className={`flex items-center gap-2 p-3 rounded-lg border transition-all ${
                    formData.incidentType === type.value
                    ? 'border-rose-500 bg-rose-50'
                    : 'border-rose-200 hover:border-rose-300'
                  }`}
                >
                  {type.icon}
                  <span>{type.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Location */}
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-rose-900 font-medium">
              <MapPin className="w-5 h-5" />
              Location
            </label>
            <input
              type="text"
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              className="w-full px-4 py-3 bg-white border border-rose-200 rounded-lg focus:ring-2 focus:ring-rose-500"
              placeholder="Where did it happen?"
            />
          </div>

          {/* Description */}
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-rose-900 font-medium">
              <TextCursorInput className="w-5 h-5" />
              Detailed Description
            </label>
            <textarea
              required
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={5}
              className="w-full px-4 py-3 bg-white border border-rose-200 rounded-lg focus:ring-2 focus:ring-rose-500"
              placeholder="Provide detailed information about the incident..."
            />
          </div>

          {/* Media Upload */}
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-rose-900 font-medium">
              <Image className="w-5 h-5" />
              Attach Media
            </label>
            <FileUpload 
              files={formData.mediaFiles} 
              setFiles={(files) => setFormData({ ...formData, mediaFiles: files })} 
            />
          </div>

          {/* Form Actions */}
          <div className="pt-8">
            <button
              type="submit"
              disabled={submitting || !formData.title || !formData.description || !formData.incidentType}
              className="w-full py-4 bg-gradient-to-r from-rose-600 to-gold-500 text-white rounded-xl hover:from-rose-700 hover:to-gold-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {submitting ? 'Submitting...' : 'Report Incident'}
            </button>

            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-4 text-rose-600 text-center"
              >
                ⚠️ {error}
              </motion.div>
            )}

            <AnimatePresence>
              {success && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="mt-4 flex items-center justify-center gap-2 text-emerald-600"
                >
                  <CheckCircle className="w-5 h-5" />
                  Incident reported successfully!
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </form>
      </motion.div>

      <Footer />
    </div>
  );
};

export default CreateIncident;