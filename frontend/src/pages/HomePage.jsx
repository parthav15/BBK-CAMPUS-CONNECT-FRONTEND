import React from 'react';
import Navbar from '../components/HomePage/Navbar';
import HeroSection from '../components/HomePage/HeroSection';
import Feature_1 from '../components/HomePage/Feature_1';
import Feature_2 from '../components/HomePage/Feature_2';
import Feature_3 from '../components/HomePage/Feature_3';
import Feature_4 from '../components/HomePage/Feature_4';
// import ContactSection from '../components/HomePage/ContactUs';
import Footer from '../components/HomePage/Footer';
import Feature_5 from '../components/HomePage/Feature_5';
import Feature_6 from '../components/HomePage/Feature_6';
import Feature_7 from '../components/HomePage/Feature_7';

function HomePage() {
  return (
    <>
    <Navbar />
    <HeroSection />
    <Feature_1 />
    <Feature_2 />
    <Feature_3 />
    <Feature_4 />
    <Feature_5 />
    <Feature_6 />
    <Feature_7 />
    {/* <ContactSection /> */}
    <Footer />
    </>
  );
}

export default HomePage;

