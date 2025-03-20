import React from 'react';
import Navbar from '../components/HomePage/Navbar';
import HeroSection from '../components/IncidentReporting/HeroSection';
import Footer from '../components/HomePage/Footer';
import RecentIncidents from '../components/IncidentReporting/RecentIncidents';

const IncidentReportingPage = () => {
    return (
        <div>
            <Navbar />
            <HeroSection />
            <RecentIncidents />
            <Footer />
        </div>
    );
};

export default IncidentReportingPage;